# ResumeHowl - Tech Stack Rundown

**Last Updated:** February 2026

This document covers every tool and service in the ResumeHowl stack: what it is, what we use it for, the URL, and how to use it for our purposes.

---

## Core Application

### 1. Next.js

| | |
|---|---|
| **What it is** | React-based web framework for building full-stack web applications |
| **URL** | https://nextjs.org |
| **What we use it for** | The entire ResumeHowl web application — frontend UI, API routes, server-side rendering, routing |
| **Version** | 16.x |
| **How to use it** | Next.js is the foundation of the app. All pages live in the `app/` directory. API routes are in `app/api/`. Run `npm run dev` locally to start the dev server. The `next build` command creates the production build. You rarely interact with Next.js directly — you just write React components and API routes, and Next.js handles the rest. |
| **Key files** | `next.config.ts`, `app/layout.tsx`, `app/page.tsx` |
| **Docs** | https://nextjs.org/docs |

---

### 2. React

| | |
|---|---|
| **What it is** | JavaScript UI library for building component-based user interfaces |
| **URL** | https://react.dev |
| **What we use it for** | All UI components — buttons, forms, layouts, the resume builder, navigation, etc. |
| **Version** | 19.x |
| **How to use it** | Every page and UI element is a React component. Components are `.tsx` files. React handles rendering the UI and updating it when data changes. If you know basic HTML/CSS, React components will look familiar — they're like HTML with JavaScript logic built in. |
| **Docs** | https://react.dev/learn |

---

### 3. TypeScript

| | |
|---|---|
| **What it is** | Typed superset of JavaScript that catches errors at build time |
| **URL** | https://www.typescriptlang.org |
| **What we use it for** | All application code is written in TypeScript for type safety and better developer experience |
| **How to use it** | Files end in `.ts` (logic) or `.tsx` (UI components). TypeScript adds type annotations to JavaScript. The AI assistants handle TypeScript fluently — you don't need to be an expert. |
| **Docs** | https://www.typescriptlang.org/docs |

---

### 4. Tailwind CSS

| | |
|---|---|
| **What it is** | Utility-first CSS framework for styling web applications |
| **URL** | https://tailwindcss.com |
| **What we use it for** | All styling and design — layout, colors, spacing, responsive design, animations |
| **Version** | 4.x |
| **How to use it** | Instead of writing separate CSS files, you add utility classes directly to HTML elements. For example, `className="bg-blue-500 text-white p-4 rounded"` gives you a blue box with white text, padding, and rounded corners. Tailwind makes it fast to style things without writing custom CSS. |
| **Key files** | `app/globals.css`, `tailwind.config.ts` (if present) |
| **Docs** | https://tailwindcss.com/docs |

---

## SaaS Framework

### 5. MakerKit

| | |
|---|---|
| **What it is** | SaaS boilerplate/starter kit built on Next.js, Supabase, and Stripe |
| **URL** | https://makerkit.dev |
| **What we use it for** | Authentication components (sign-up, sign-in, password reset), billing integration, user management, cookie consent, and SaaS infrastructure patterns |
| **How to use it** | MakerKit provides pre-built components and packages under `@kit/` namespace (e.g., `@kit/auth`, `@kit/supabase`). The auth flows (sign-up, sign-in, sign-out) use MakerKit's components. We customize them as needed. The `packages/` directory contains MakerKit's modular packages. |
| **Key packages** | `@kit/auth`, `@kit/supabase`, `@kit/billing`, `@kit/ui` |
| **Docs** | https://makerkit.dev/docs |

---

## Hosting & Deployment

### 6. Vercel

| | |
|---|---|
| **What it is** | Cloud platform for deploying and hosting web applications (made by the creators of Next.js) |
| **URL** | https://vercel.com |
| **What we use it for** | Hosting the production site (resumehowl.com), auto-deploying from GitHub, managing environment variables, edge functions, serverless API routes |
| **How to use it** | Vercel is connected to the GitHub repo. Every push to `main` triggers an automatic deployment. You manage environment variables, domains, and deployments through the Vercel dashboard. Preview deployments are created for pull requests. |
| **Dashboard** | https://vercel.com/dashboard |
| **Key tasks** | Monitor deployments, manage env vars, check function logs, roll back bad deploys |
| **Docs** | https://vercel.com/docs |

---

### 7. GitHub

| | |
|---|---|
| **What it is** | Code hosting and version control platform |
| **URL** | https://github.com |
| **What we use it for** | Storing the source code (resumehowl-saas repo), version control (git), collaboration, issue tracking, triggering Vercel deployments |
| **How to use it** | All code changes go through git. Push to `main` to deploy. Use branches for bigger features. GitHub also hosts issues for bug tracking and feature requests. Claude Code and Codex both connect to GitHub to read and modify code. |
| **Repo** | github.com (your account) / resumehowl-saas |
| **Key commands** | `git add`, `git commit`, `git push`, `git pull` |

---

## Database & Authentication

### 8. Supabase

| | |
|---|---|
| **What it is** | Open-source Firebase alternative providing PostgreSQL database, authentication, storage, and real-time subscriptions |
| **URL** | https://supabase.com |
| **What we use it for** | **Database** — Stores all user data, resumes, settings, subscription status. **Authentication** — Handles user sign-up, sign-in, password reset, session management. **Storage** — Can store uploaded files (resume PDFs, profile photos). |
| **How to use it** | Access the Supabase dashboard to manage users, view data, run SQL queries, and configure auth settings. The app connects via `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` environment variables. |
| **Dashboard** | https://supabase.com/dashboard |
| **Key tasks** | Manage users (Authentication → Users), view/edit data (Table Editor), configure auth providers, check API usage |
| **Auth settings** | Authentication → Providers → Email → "Confirm email" toggle (currently OFF) |
| **Docs** | https://supabase.com/docs |

---

## Email

### 9. Resend

| | |
|---|---|
| **What it is** | Modern email API for sending transactional emails |
| **URL** | https://resend.com |
| **What we use it for** | Sending all transactional emails — welcome emails, password resets, subscription confirmations, resume generation notifications |
| **How to use it** | Resend sends emails via API. The app uses the `RESEND_API_KEY` to authenticate. Emails are sent from `hello@resumehowl.com` (configured via `FROM_EMAIL` env var). The domain `resumehowl.com` is verified in Resend with SPF/DKIM/DMARC records. |
| **Dashboard** | https://resend.com |
| **Key tasks** | Monitor email delivery (Emails/Logs), check bounce rates, verify domain DNS records, manage API keys |
| **API key name** | resumehowl-prod |
| **Docs** | https://resend.com/docs |

---

## Payments & Billing

### 10. Stripe

| | |
|---|---|
| **What it is** | Payment processing platform for online businesses |
| **URL** | https://stripe.com |
| **What we use it for** | Processing Pro subscription payments, managing billing cycles, handling upgrades/downgrades/cancellations, issuing refunds, subscription webhooks |
| **How to use it** | Stripe handles all payment processing. Users enter their card info in a Stripe-hosted checkout or embedded form. Stripe sends webhook events to our app to update subscription status in Supabase. You manage products, pricing, customers, and payments through the Stripe dashboard. |
| **Dashboard** | https://dashboard.stripe.com |
| **Key tasks** | View payments, manage subscriptions, handle refunds, check failed payments, update pricing |
| **Env vars** | `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` |
| **Docs** | https://stripe.com/docs |

---

## AI / Resume Generation

### 11. Anthropic (Claude API)

| | |
|---|---|
| **What it is** | AI company providing the Claude language model API |
| **URL** | https://anthropic.com |
| **What we use it for** | Powering the AI resume generation — taking user input and generating professional, ATS-optimized resume content, cover letters, and summary text |
| **How to use it** | The app sends user resume data to the Claude API, which returns polished, professional text. The API is called from server-side routes (not exposed to the browser). API usage is billed per token (input + output). |
| **Console** | https://console.anthropic.com |
| **Key tasks** | Monitor API usage and costs, manage API keys, check rate limits |
| **Docs** | https://docs.anthropic.com |

---

## AI Development Tools

### 12. Claude Code

| | |
|---|---|
| **What it is** | Anthropic's AI coding assistant (CLI and web interface) |
| **URL** | https://claude.ai/code |
| **What we use it for** | Building features, debugging, architecture decisions, code review, creating documentation. Has full codebase context and can read/edit files directly. |
| **How to use it** | Start a session, select the resumehowl-saas repo, and describe what you need. Claude Code can read files, make edits, run commands, and push to GitHub. Best for complex features and debugging. Give context from previous sessions when starting new ones. |
| **Tips** | Be specific about what you want. Share error messages and screenshots. Reference previous conversation transcripts for continuity. |

---

### 13. OpenAI Codex

| | |
|---|---|
| **What it is** | OpenAI's AI coding agent |
| **URL** | https://chatgpt.com (Codex feature) |
| **What we use it for** | Backup AI coding assistant when Claude Code credits run out. Good for larger multi-file changes and background tasks. |
| **How to use it** | Select the repo, describe the task, and Codex works on it. It creates commits and can push to branches. Good for parallelizing work — have Codex handle one task while you work on another. |

---

## Domain & DNS

### 14. Domain Registrar

| | |
|---|---|
| **What it is** | Where the resumehowl.com domain is registered and DNS is managed |
| **What we use it for** | Domain ownership, DNS records (A records pointing to Vercel, MX/TXT records for email via Resend) |
| **How to use it** | Log into the registrar dashboard to manage DNS records. Key records: A/CNAME records pointing to Vercel for the website, SPF/DKIM/DMARC TXT records for email authentication through Resend. |
| **Key DNS records** | Vercel hosting records, Resend email authentication records (SPF, DKIM, DMARC) |

---

## Summary Table

| # | Tool | Category | URL | Purpose |
|---|---|---|---|---|
| 1 | Next.js | Framework | nextjs.org | Web app framework |
| 2 | React | UI Library | react.dev | UI components |
| 3 | TypeScript | Language | typescriptlang.org | Type-safe code |
| 4 | Tailwind CSS | Styling | tailwindcss.com | CSS framework |
| 5 | MakerKit | SaaS Kit | makerkit.dev | Auth, billing, SaaS boilerplate |
| 6 | Vercel | Hosting | vercel.com | Deploy & host the app |
| 7 | GitHub | Code | github.com | Version control & code storage |
| 8 | Supabase | DB & Auth | supabase.com | Database, auth, storage |
| 9 | Resend | Email | resend.com | Transactional emails |
| 10 | Stripe | Payments | stripe.com | Subscriptions & billing |
| 11 | Anthropic | AI API | anthropic.com | Resume generation AI |
| 12 | Claude Code | Dev Tool | claude.ai/code | AI coding assistant |
| 13 | Codex | Dev Tool | chatgpt.com | Backup AI coding assistant |

---

## Monthly Costs Estimate

| Service | Plan | Cost |
|---|---|---|
| Vercel | Pro | $20/mo |
| Supabase | Pro | $25/mo |
| Resend | Free → Starter | $0-20/mo |
| Stripe | Pay-as-you-go | 2.9% + $0.30/txn |
| Anthropic API | Pay-as-you-go | $10-100/mo |
| GitHub | Free | $0 |
| Domain | Annual | ~$12/yr (~$1/mo) |
| Claude Code | Subscription | $20/mo (Max plan varies) |
| **Total** | | **~$80-190/mo** |
