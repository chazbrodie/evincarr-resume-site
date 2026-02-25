# ResumeHowl - Founder's Quick Reference

**Your daily cheat sheet. Bookmark this.**

---

## Key URLs

| What | URL |
|---|---|
| **Live site** | https://resumehowl.com |
| **Vercel dashboard** | https://vercel.com/dashboard |
| **Supabase dashboard** | https://supabase.com/dashboard |
| **Stripe dashboard** | https://dashboard.stripe.com |
| **Resend dashboard** | https://resend.com |
| **Anthropic console** | https://console.anthropic.com |
| **GitHub repo** | github.com / resumehowl-saas |
| **Claude Code** | https://claude.ai/code |

---

## Key Environment Variables (in Vercel)

| Variable | What It Is |
|---|---|
| `RESEND_API_KEY` | Resend email API key (re_...) |
| `FROM_EMAIL` | ResumeHowl <hello@resumehowl.com> |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous/public key |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase admin key (server only) |
| `STRIPE_SECRET_KEY` | Stripe secret key (sk_...) |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook signing secret (whsec_...) |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe publishable key (pk_...) |

---

## Quick Commands

```bash
# Local development
cd ~/Projects/resumehowl-saas
npm run dev                    # Start dev server (localhost:3000)
npm run build                  # Test production build locally

# Deploy to production
git add <files>
git commit -m "Description of changes"
git push origin main           # Auto-deploys via Vercel

# Check deployment status
# → Go to Vercel dashboard → Deployments
```

---

## Quick Fixes

### Site is down
1. Check Vercel dashboard → Deployments
2. If latest deploy failed → click previous good deploy → "Promote to Production"
3. Fix the code issue → push a new commit

### Emails not sending
1. Check Resend dashboard → Emails/Logs
2. Verify RESEND_API_KEY is set in Vercel env vars
3. Verify domain is still verified in Resend → Domains
4. Redeploy if env vars were changed

### Payments not working
1. Check Stripe dashboard → Payments → look for errors
2. Verify Stripe env vars are set in Vercel
3. Check if Stripe is in test mode vs live mode
4. Verify webhook endpoint is active (Stripe → Developers → Webhooks)

### Users can't sign in
1. Check Supabase → Authentication → Users → find the user
2. Check if "Confirm email" setting changed
3. Check Vercel function logs for auth errors

---

## Key Metrics to Track

| Metric | Where to Find It |
|---|---|
| Total users | Supabase → Authentication → Users |
| Pro subscribers | Stripe → Subscriptions (filter: active) |
| MRR | Stripe → Revenue overview |
| Email delivery rate | Resend → Analytics |
| Site traffic | Vercel Analytics (if enabled) or Google Analytics |
| API costs | Anthropic console → Usage |
| Error rate | Vercel → Deployments → Function logs |

---

## Monthly Checklist

- [ ] Review MRR and subscriber count in Stripe
- [ ] Check Anthropic API costs — are they reasonable?
- [ ] Review Supabase database size and usage
- [ ] Check email delivery rates in Resend
- [ ] Review and respond to any user feedback
- [ ] Publish at least 2 blog posts / social media updates
- [ ] Test core flows (signup, build, upgrade) as a new user
- [ ] Back up any critical data
- [ ] Review and update this doc if anything changed

---

## Emergency Contacts / Resources

| Issue | Where to Get Help |
|---|---|
| Vercel down | https://vercel-status.com |
| Supabase issues | https://status.supabase.com |
| Stripe issues | https://status.stripe.com |
| Resend issues | https://resend-status.com |
| Anthropic API issues | https://status.anthropic.com |
| MakerKit docs | https://makerkit.dev/docs |
| Next.js docs | https://nextjs.org/docs |
