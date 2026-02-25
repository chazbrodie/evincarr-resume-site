# ResumeHowl - Pre-Launch & Launch Checklist

**Last Updated:** February 2026

Use this checklist to track everything that needs to be done before and during launch.

---

## Pre-Launch: Technical

### Authentication & User Flow
- [ ] Sign-up flow works end-to-end (new user → account created → redirected to app)
- [ ] Sign-in flow works (existing user → enters credentials → redirected to app)
- [ ] Password reset flow works (forgot password → email sent → reset link → new password)
- [ ] Sign-out works from all pages (builder, account settings, etc.)
- [ ] "Confirm email" setting is intentional (ON or OFF — decide and stick with it)
- [ ] Test with multiple email providers (Gmail, Outlook, Yahoo, iCloud)

### Resume Builder
- [ ] Builder loads correctly for new users
- [ ] Users can input their info and generate a resume
- [ ] AI generation produces quality output
- [ ] Generated resume displays correctly
- [ ] PDF export works and looks clean
- [ ] Multiple templates work correctly
- [ ] Free tier limitations work (limited builds, watermark, etc.)
- [ ] Pro tier unlocks all features correctly

### Billing & Subscriptions
- [ ] "Upgrade to Pro" button works (no 401 errors)
- [ ] Stripe checkout flow completes successfully
- [ ] After payment, user's account is upgraded to Pro
- [ ] Pro features are unlocked immediately after payment
- [ ] Subscription shows correctly in account settings
- [ ] Cancel subscription flow works
- [ ] Stripe webhooks are connected and working
- [ ] Test with Stripe test cards (4242 4242 4242 4242)

### Email
- [ ] Resend domain is verified (SPF, DKIM, DMARC all green)
- [ ] Welcome email sends on signup (if applicable)
- [ ] Password reset email sends and link works
- [ ] Emails arrive in inbox (not spam)
- [ ] FROM_EMAIL is set to `ResumeHowl <hello@resumehowl.com>`
- [ ] Email templates look professional

### Account & Settings
- [ ] "Account" / "My Account" menu works in builder
- [ ] Account settings page loads
- [ ] Users can update their profile info
- [ ] Users can change their password
- [ ] Billing section shows subscription status
- [ ] "My Resumes" shows past resumes

### Performance & Reliability
- [ ] Site loads in under 3 seconds
- [ ] Site works on mobile (responsive design)
- [ ] Site works in Chrome, Safari, Firefox, Edge
- [ ] No console errors on key pages
- [ ] API routes respond correctly
- [ ] Error pages (404, 500) look presentable

### Security
- [ ] All API keys are in Vercel env vars (not in code)
- [ ] Supabase RLS policies are enabled
- [ ] No sensitive data exposed in client-side code
- [ ] HTTPS is working (no mixed content warnings)
- [ ] Cookie consent banner works

---

## Pre-Launch: Content & Design

### Landing Page
- [ ] Clear headline explaining what ResumeHowl does
- [ ] Feature highlights / value proposition
- [ ] Pricing section with Free vs Pro comparison
- [ ] Call-to-action buttons (Sign Up, Try Free, etc.)
- [ ] Social proof (testimonials, stats — even if aspirational at launch)
- [ ] Footer with links (Privacy Policy, Terms of Service, Contact)

### Legal Pages
- [ ] Privacy Policy page exists and is accurate
- [ ] Terms of Service page exists and is accurate
- [ ] Cookie Policy (or included in Privacy Policy)
- [ ] Cookie consent banner links to policy

### SEO
- [ ] Page titles are set and descriptive
- [ ] Meta descriptions are written for key pages
- [ ] Open Graph tags for social sharing (title, description, image)
- [ ] Favicon is set
- [ ] sitemap.xml is generated
- [ ] robots.txt is configured

### Branding
- [ ] Logo is on the site
- [ ] Consistent colors throughout
- [ ] Professional look and feel
- [ ] No placeholder or Lorem Ipsum text anywhere

---

## Pre-Launch: Business

### Accounts & Services
- [ ] Domain is registered and DNS is configured
- [ ] Vercel account is set up and project is connected
- [ ] Supabase project is created and configured
- [ ] Stripe account is set up (out of test mode for launch)
- [ ] Resend account is set up and domain verified
- [ ] Anthropic API account has credits
- [ ] GitHub repo is organized

### Finances
- [ ] Stripe is in live mode (not test mode) for launch
- [ ] Bank account connected to Stripe for payouts
- [ ] Understand Stripe fee structure (2.9% + $0.30)
- [ ] Monthly cost budget established

### Analytics (Set Up Before Launch)
- [ ] Google Analytics or Vercel Analytics installed
- [ ] Track key events: signups, Pro conversions, resume generations
- [ ] Set up basic conversion funnel tracking

---

## Launch Day

### Soft Launch (Friends & Family)
- [ ] Share with 10-20 trusted people
- [ ] Collect feedback on signup flow, builder, and overall experience
- [ ] Fix any critical bugs found
- [ ] Get 3-5 testimonials or quotes

### Public Launch
- [ ] Post on Product Hunt
- [ ] Post on LinkedIn (personal + company page)
- [ ] Post on Twitter/X
- [ ] Post on relevant Reddit communities (r/resumes, r/jobs, r/SaaS, r/indiehackers)
- [ ] Post on Indie Hackers
- [ ] Email personal network

### Post-Launch (First 48 Hours)
- [ ] Monitor Vercel for errors and performance
- [ ] Monitor Supabase for auth issues
- [ ] Monitor Stripe for payment issues
- [ ] Monitor Resend for email delivery
- [ ] Respond to all user feedback quickly
- [ ] Fix any bugs that come up immediately
- [ ] Track signup numbers and conversion rates

---

## Post-Launch: First Week

- [ ] Send thank-you messages to early users
- [ ] Publish a "launch story" blog post
- [ ] Analyze first-week metrics (signups, conversions, retention)
- [ ] Identify top 3 user-requested features
- [ ] Plan first feature update
- [ ] Set up recurring weekly review cadence

---

## Post-Launch: First Month

- [ ] Reach break-even (20+ Pro subscribers)
- [ ] Publish 2-3 SEO blog posts
- [ ] Set up email drip campaign for new users
- [ ] Add at least 3 new resume templates
- [ ] Implement referral program
- [ ] Review and optimize conversion funnel
