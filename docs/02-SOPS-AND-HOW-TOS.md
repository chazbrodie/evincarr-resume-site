# ResumeHowl - SOPs & How-To Guides

**Last Updated:** February 2026

---

## Table of Contents

1. [Daily Operations](#1-daily-operations)
2. [Deployment & Releases](#2-deployment--releases)
3. [User Support](#3-user-support)
4. [Monitoring & Incident Response](#4-monitoring--incident-response)
5. [Email System Management](#5-email-system-management)
6. [Authentication & User Management](#6-authentication--user-management)
7. [Billing & Subscriptions](#7-billing--subscriptions)
8. [Database Management](#8-database-management)
9. [Domain & DNS Management](#9-domain--dns-management)
10. [Content Updates](#10-content-updates)
11. [Development Workflow](#11-development-workflow)
12. [Security Procedures](#12-security-procedures)

---

## 1. Daily Operations

### Morning Check (5-10 minutes)

1. **Check Vercel dashboard** — Verify latest deployment is healthy (green status)
   - URL: https://vercel.com/dashboard
   - Look for: Failed builds, error spikes, unusual traffic

2. **Check Supabase dashboard** — Verify database is healthy
   - URL: https://supabase.com/dashboard
   - Look for: API request failures, auth errors, storage usage

3. **Check Resend dashboard** — Verify emails are delivering
   - URL: https://resend.com/emails
   - Look for: Bounces, delivery failures, spam complaints

4. **Check Stripe dashboard** — Review new subscriptions and payments
   - URL: https://dashboard.stripe.com
   - Look for: Failed payments, disputes, new subscribers

5. **Check GitHub** — Review any open issues or PRs
   - URL: https://github.com (resumehowl-saas repo)

### Weekly Review (30 minutes, every Monday)

1. Review key metrics:
   - New signups this week
   - Free-to-Pro conversion rate
   - Churn (cancelled subscriptions)
   - Revenue (MRR)
   - Most popular features/templates
2. Review and respond to any user feedback
3. Prioritize bug fixes and feature requests for the week
4. Update roadmap if needed

---

## 2. Deployment & Releases

### How Deployments Work

ResumeHowl auto-deploys from GitHub. When you push to `main`, Vercel automatically builds and deploys.

### Standard Deployment Process

```
Step 1: Make changes locally
Step 2: Test locally (npm run dev, check in browser)
Step 3: Commit changes
         git add <specific-files>
         git commit -m "Description of changes"
Step 4: Push to main
         git push origin main
Step 5: Monitor Vercel dashboard for successful deployment
Step 6: Test the live site after deployment completes (~1-2 min)
```

### How to Roll Back a Bad Deployment

1. Go to Vercel Dashboard → Deployments
2. Find the last known good deployment
3. Click the three dots (⋯) → "Promote to Production"
4. This instantly switches production to that build
5. Then fix the issue in code and push a proper fix

### How to Deploy a Hotfix

```
Step 1: Identify the issue
Step 2: Fix it in code
Step 3: Test locally
Step 4: git add <files> && git commit -m "Hotfix: description" && git push origin main
Step 5: Watch Vercel for successful deploy
Step 6: Verify fix on live site
```

### Environment Variables

Environment variables are managed in Vercel (Settings → Environment Variables). **Never commit secrets to GitHub.**

To add/update an env variable:
1. Go to Vercel → Project Settings → Environment Variables
2. Add or edit the variable
3. Check the boxes for which environments it applies to (Production, Preview, Development)
4. Save
5. Redeploy for changes to take effect (Deployments → latest → Redeploy)

Current env variables:
- `RESEND_API_KEY` — Resend API key for sending emails
- `FROM_EMAIL` — Sender address (ResumeHowl <hello@resumehowl.com>)
- `NEXT_PUBLIC_SUPABASE_URL` — Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` — Supabase anonymous key
- `SUPABASE_SERVICE_ROLE_KEY` — Supabase admin key (server-side only)
- `STRIPE_SECRET_KEY` — Stripe secret key
- `STRIPE_WEBHOOK_SECRET` — Stripe webhook signing secret
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` — Stripe public key

---

## 3. User Support

### Handling User Issues

**Priority Levels:**
- **P0 (Critical):** Site is down, users can't sign in, payments broken → Fix immediately
- **P1 (High):** Feature broken for many users, emails not sending → Fix within 24 hours
- **P2 (Medium):** UI bug, minor feature issue → Fix within 1 week
- **P3 (Low):** Enhancement request, nice-to-have → Add to backlog

### Common User Issues & Solutions

**"I can't sign up / stuck on confirmation screen"**
- Check if Supabase "Confirm email" is ON or OFF
- If OFF, users should be redirected immediately (patched in signup flow)
- If ON, check Resend logs for the confirmation email delivery

**"I didn't get my email"**
- Check Resend dashboard → Emails/Logs
- Look for the user's email address
- Check status: Sent, Delivered, Bounced, or Failed
- If bounced: User's email provider rejected it — ask them to check spam or use a different email

**"My payment failed / I can't upgrade to Pro"**
- Check Stripe dashboard → Payments
- Look for the failed payment and the decline reason
- Common reasons: Insufficient funds, card expired, bank decline
- Ask user to update their payment method

**"My resume won't generate"**
- Check Vercel function logs for errors
- Check AI API status (Anthropic/OpenAI status pages)
- May be an API rate limit or credit issue

---

## 4. Monitoring & Incident Response

### What to Monitor

| Service | What to Check | URL |
|---|---|---|
| Vercel | Build status, function errors, response times | vercel.com/dashboard |
| Supabase | API health, auth errors, database size | supabase.com/dashboard |
| Resend | Email delivery rates, bounces | resend.com/emails |
| Stripe | Payment failures, disputes | dashboard.stripe.com |
| Site | Uptime, page load speed | resumehowl.com |

### Incident Response Process

```
1. IDENTIFY — What's broken? Who's affected?
2. COMMUNICATE — If site-wide, post on social media that you're aware
3. DIAGNOSE — Check Vercel logs, Supabase logs, Stripe logs
4. FIX — Apply the fix or roll back
5. VERIFY — Test the fix on production
6. DOCUMENT — Note what happened and how you fixed it
```

---

## 5. Email System Management

### Current Setup
- **Provider:** Resend
- **Sending domain:** resumehowl.com (verified)
- **From address:** ResumeHowl <hello@resumehowl.com>
- **API Key env var:** RESEND_API_KEY (in Vercel)

### How to Check Email Delivery

1. Go to https://resend.com/emails
2. Search for the recipient's email or filter by date
3. Check the status column:
   - **Sent** — Email sent to recipient's mail server
   - **Delivered** — Confirmed delivered
   - **Bounced** — Rejected by recipient's mail server
   - **Complained** — Marked as spam

### How to Send a Test Email

1. Sign up for a new account on resumehowl.com with a test email
2. Check Resend logs for the outgoing email
3. Verify it arrives in the test inbox

### How to Update the From Address

1. Go to Vercel → Project Settings → Environment Variables
2. Update `FROM_EMAIL` to the new value (format: `Name <email@domain.com>`)
3. Make sure the sending domain is verified in Resend
4. Redeploy

### Email Types (Current & Planned)
- Welcome email (on signup)
- Password reset
- First resume generation notification
- Subscription confirmation
- Payment receipt
- Subscription renewal reminder (planned)
- Weekly tips / engagement emails (planned)

---

## 6. Authentication & User Management

### Current Setup
- **Provider:** Supabase Auth (via MakerKit components)
- **Sign-up methods:** Email + password
- **Email confirmation:** Currently OFF (instant access on signup)

### How to Toggle Email Confirmation

1. Go to Supabase Dashboard → Authentication → Providers
2. Find Email provider settings
3. Toggle "Confirm email" ON or OFF
4. Save

**If ON:** Users must click a confirmation link in their email before accessing the app.
**If OFF:** Users get instant access after signing up (current setting).

### How to View/Manage Users

1. Go to Supabase Dashboard → Authentication → Users
2. You can see all registered users, their email, sign-up date, and status
3. To delete a user: Click on them → Delete user
4. To reset a user's password: They use the "Forgot password" flow, or you can manually trigger a password reset from Supabase

### How to Ban/Block a User

1. Go to Supabase Dashboard → Authentication → Users
2. Find the user
3. Click on them → Ban user
4. They will no longer be able to sign in

---

## 7. Billing & Subscriptions

### Current Setup
- **Provider:** Stripe
- **Plans:** Free (no charge) and Pro ($9.99/mo or $79.99/yr — adjust as needed)
- **Webhooks:** Stripe sends events to your app to sync subscription status

### How to Check a User's Subscription Status

1. Go to Stripe Dashboard → Customers
2. Search by email
3. View their subscription status (active, cancelled, past_due)

### How to Manually Cancel a Subscription

1. Go to Stripe Dashboard → Subscriptions
2. Find the subscription
3. Click Cancel → Choose to cancel immediately or at end of period

### How to Issue a Refund

1. Go to Stripe Dashboard → Payments
2. Find the payment
3. Click Refund → Enter amount (full or partial)
4. Confirm

### How to Update Pricing

1. Go to Stripe Dashboard → Products
2. Edit the Pro product
3. Update the price
4. **Important:** Existing subscribers keep their current price. New subscribers get the new price.
5. Update any pricing displayed in the app code and redeploy

### How to Handle Failed Payments

Stripe automatically retries failed payments (Smart Retries). You can also:
1. Go to Stripe Dashboard → Revenue Recovery
2. See which invoices are past due
3. Stripe will email users automatically to update their payment method
4. After X failed retries, the subscription is cancelled automatically

---

## 8. Database Management

### Current Setup
- **Provider:** Supabase (PostgreSQL)
- **Dashboard:** https://supabase.com/dashboard

### How to View Data

1. Go to Supabase Dashboard → Table Editor
2. Browse tables (users, resumes, subscriptions, etc.)
3. Use filters to find specific records

### How to Run a Query

1. Go to Supabase Dashboard → SQL Editor
2. Write your SQL query
3. Click Run

### Backup

- Supabase Pro plan includes daily automatic backups
- You can also manually export data from the Table Editor
- For critical changes, take a manual backup first (SQL Editor → export)

### How to Check Database Size

1. Go to Supabase Dashboard → Settings → Database
2. View current usage and limits

---

## 9. Domain & DNS Management

### Current Setup
- **Domain:** resumehowl.com
- **DNS:** Managed through your domain registrar
- **Hosting:** Vercel (domain pointed to Vercel)
- **Email DNS:** SPF, DKIM, and DMARC records configured for Resend

### How to Verify DNS is Working

1. Visit https://resumehowl.com — should load your site
2. Check email DNS: Go to Resend → Domains → resumehowl.com → check all records show "Verified"

### How to Add a New DNS Record

1. Log into your domain registrar
2. Go to DNS settings for resumehowl.com
3. Add the required record (A, CNAME, TXT, MX, etc.)
4. Save and wait for propagation (usually 5 min - 48 hours)

---

## 10. Content Updates

### How to Update the Landing Page

1. Edit the relevant page files in the codebase (resumehowl-saas repo)
2. Test locally with `npm run dev`
3. Commit and push to main
4. Vercel auto-deploys

### How to Add a New Resume Template

1. Create the template component in the templates directory
2. Add it to the template selection list
3. Set permissions (free or Pro-only)
4. Test locally
5. Commit and push

### How to Update Pricing Display

1. Update the pricing section in the landing page and any in-app pricing displays
2. Make sure it matches your Stripe product pricing
3. Test locally
4. Commit and push

---

## 11. Development Workflow

### Local Development Setup

```
1. Clone the repo:
   git clone <repo-url>
   cd resumehowl-saas

2. Install dependencies:
   npm install (or pnpm install)

3. Set up environment variables:
   Copy .env.example to .env.local
   Fill in all required values

4. Start the dev server:
   npm run dev

5. Open http://localhost:3000
```

### Branching Strategy (Current)

- `main` — Production branch. Pushes here auto-deploy.
- Feature branches — Create a branch for bigger features, merge to main when ready.

### Code Changes Workflow

```
1. Pull latest: git pull origin main
2. Make changes
3. Test locally: npm run dev
4. Commit: git add <files> && git commit -m "Description"
5. Push: git push origin main
6. Monitor deployment in Vercel
7. Test on live site
```

### Using AI Assistants for Development

- **Claude Code** — Use for complex features, debugging, architecture decisions. Has full codebase context.
- **Codex** — Use for larger multi-file changes, background tasks. Good for when Claude Code credits run out.
- **Best practice:** Give context from previous sessions (like the transcript you shared). The AI doesn't remember between sessions.

---

## 12. Security Procedures

### Credentials Management

- **Never commit API keys, secrets, or credentials to GitHub**
- All secrets go in Vercel Environment Variables
- Rotate API keys if you suspect they've been compromised
- Use Supabase Row Level Security (RLS) to protect user data

### How to Rotate an API Key

1. Go to the service's dashboard (Resend, Stripe, Supabase)
2. Generate a new API key
3. Update the key in Vercel Environment Variables
4. Redeploy
5. Verify the app still works
6. Delete/revoke the old key

### User Data

- User data is stored in Supabase with RLS policies
- Users can only access their own data
- Admin access is via Supabase dashboard only (password-protected)
- Payment data is handled entirely by Stripe (PCI compliant) — we never store card numbers
