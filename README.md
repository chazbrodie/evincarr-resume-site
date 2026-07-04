# evincarr-resume-site

Personal resume site for Evin Carr — deployed at [evincarr.com](https://evincarr.com).

Built with Next.js 16, React 19, Tailwind 4, and TypeScript. Hosted on Vercel.

## Layout

- **`public/resume.html`** — the actual visible page. A self-contained HTML/CSS/JS file with the resume data inlined. `app/page.tsx` just iframes this.
- **`app/layout.tsx`** — page metadata and OpenGraph description.
- **`app/opengraph-image.tsx`** — generates the 1200×630 social-share card (dynamic Next.js image).
- **`public/headshot.jpg`** — headshot used by the resume header and OG card.

When you update the resume:

1. Edit `public/resume.html` (the visible page).
2. Update `app/layout.tsx` description if the title/positioning changed.
3. Update `app/opengraph-image.tsx` alt text and tagline if the title changed.

## Local dev

```bash
pnpm install
pnpm dev          # http://localhost:3000
pnpm build
pnpm exec tsc --noEmit   # typecheck
```

## Deploy

Pushes to any branch → Vercel preview deployment. Merge to `main` → production at evincarr.com.
