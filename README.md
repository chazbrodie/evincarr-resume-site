# evincarr-resume-site

Personal resume site for Evin Carr — deployed at [evincarr.com](https://evincarr.com).

Built with Next.js 16, React 19, Tailwind 4, and TypeScript. Hosted on Vercel.

## Layout

- **`public/resume.html`** — the actual visible page. A self-contained HTML/CSS/JS file with the resume data inlined. `app/page.tsx` just iframes this.
- **`app/resume-data.ts`** — TypeScript copy of the same resume data. Source of truth for the chat API only (the visible site reads from `public/resume.html`'s inline copy). Keep these two in sync.
- **`app/api/chat/route.ts`** — Anthropic-backed chat API (rate-limited, origin-checked, prompt-injection hardened). Live at `/api/chat`. See note below.
- **`app/layout.tsx`** — page metadata and OpenGraph description.
- **`app/opengraph-image.tsx`** — generates the 1200×630 social-share card (dynamic Next.js image).
- **`public/headshot.jpg`** — headshot used by the resume header and OG card.

## Chat API: plumbing on, UI off

The `/api/chat` endpoint is **fully deployed and reachable** (used by the rate-limit, origin, and prompt-injection logic in `app/api/chat/route.ts`), but the **visible chatbot widget was intentionally removed** from `public/resume.html`. There is no longer a "Start a conversation" CTA, chat panel, suggested questions, or `localStorage` chat state on the page.

The endpoint stays in place so the chat UI can be restored later from git history without rewiring the backend.

When you update the resume:

1. Edit `public/resume.html` (the visible page) **and** `app/resume-data.ts` (used by the chat API system prompt). Both should match.
2. Update `app/layout.tsx` description if the title/positioning changed.
3. Update `app/opengraph-image.tsx` alt text and tagline if the title changed.
4. Update the "Verified Background Context" block in `app/api/chat/route.ts` so the chat AI doesn't quote stale bullets.

## Local dev

```bash
pnpm install
pnpm dev          # http://localhost:3000
pnpm build
pnpm exec tsc --noEmit   # typecheck
```

The chat API needs `ANTHROPIC_API_KEY` in `.env.local` to work locally.

## Deploy

Pushes to any branch → Vercel preview deployment. Merge to `main` → production at evincarr.com.
