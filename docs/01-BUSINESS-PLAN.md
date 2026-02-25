# ResumeHowl - Business Plan

**Prepared by:** Evin Carr
**Date:** February 2026
**Website:** https://resumehowl.com

---

## 1. Executive Summary

ResumeHowl is an AI-powered SaaS platform that helps job seekers create professional, optimized resumes and personal portfolio sites in minutes. Users sign up, input their experience, and the platform generates polished, ATS-friendly resumes and hosted resume sites — eliminating the need for design skills, expensive resume writers, or complex website builders.

The platform is built on a modern, scalable tech stack (Next.js, Supabase, Vercel, MakerKit) and monetizes through a freemium subscription model with a free tier and a Pro upgrade.

---

## 2. Problem

- **Resume creation is tedious.** Most people struggle with formatting, design, and knowing what to include.
- **ATS systems reject poorly formatted resumes.** Job seekers don't know what applicant tracking systems want.
- **Resume writers are expensive.** Professional services charge $200-$500+ per resume.
- **Portfolio sites require technical skills.** Building a personal site takes time and web development knowledge most people don't have.
- **Existing tools are bloated.** Canva, Indeed, and LinkedIn resume builders are generic and not optimized for results.

---

## 3. Solution

ResumeHowl provides:

1. **AI-Powered Resume Builder** — Users input their info and the AI generates tailored, ATS-optimized resume content with professional formatting.
2. **Hosted Resume Sites** — Each user gets a personal resume website (e.g., resumehowl.com/evincarr or a custom domain).
3. **One-Click Export** — Download as PDF, share a link, or print directly.
4. **Iterative Refinement** — Users can tweak, regenerate sections, and customize until they're happy.

---

## 4. Target Market

### Primary Audience
- **Job seekers** (ages 22-45) actively looking for work
- **Career changers** pivoting to new industries
- **Recent graduates** entering the workforce
- **Freelancers and contractors** who need a quick professional presence

### Secondary Audience
- **Recruiters and career coaches** recommending tools to clients
- **Bootcamp graduates** (dev bootcamps, trade schools) needing portfolio sites
- **Small business owners** who want a professional personal page

### Market Size
- ~6.5 million Americans are actively job searching at any given time
- The online resume builder market is projected to reach $1.9B by 2028
- Resume writing services market exceeds $400M annually

---

## 5. Business Model

### Pricing Tiers

| Feature | Free Tier | Pro Tier |
|---|---|---|
| Price | $0 | $9.99/mo or $79.99/yr |
| Resume builds | 1 | Unlimited |
| Templates | 3 basic | All templates (15+) |
| AI rewrites/optimizations | 3 per month | Unlimited |
| Resume site hosting | No | Yes (custom subdomain) |
| PDF export | Watermarked | Clean, no watermark |
| ATS optimization score | Basic | Detailed with suggestions |
| Priority support | No | Yes |
| Custom domain | No | Yes (Pro annual only) |

### Revenue Streams
1. **Subscriptions** — Primary revenue via monthly/annual Pro plans
2. **One-time purchases** — Single resume generation for $4.99 (future)
3. **Enterprise/Team plans** — Career centers, bootcamps, staffing agencies (future)
4. **Affiliate partnerships** — Job boards, career coaching services (future)

---

## 6. Competitive Landscape

| Competitor | Strengths | Weaknesses | Our Advantage |
|---|---|---|---|
| Canva Resume | Brand recognition, design tools | Generic templates, not ATS-optimized | AI-powered, ATS-focused |
| Resume.io | Clean UI, good templates | Expensive ($24.95/mo), no AI | AI generation, lower price |
| Zety | Strong SEO, large template library | Aggressive upsells, $23.70/mo | Transparent pricing, AI |
| LinkedIn Resume | Built into LinkedIn | Very basic, limited formatting | Full-featured builder + site |
| Novoresume | Good free tier | Limited AI, dated design | Modern AI, resume sites |

### Our Differentiators
- AI-generated content tailored to each user (not just templates)
- Hosted resume sites included (competitors don't offer this)
- Modern, fast UX built on cutting-edge stack
- Affordable Pro tier ($9.99 vs $20-25 competitors)
- Founder-operated with fast iteration

---

## 7. Marketing Strategy

### Phase 1: Launch (Months 1-3)
- **Product Hunt launch** — Day-one visibility
- **Reddit/Twitter/LinkedIn organic posts** — Share building-in-public journey
- **SEO content** — Blog posts targeting "best AI resume builder," "ATS resume tips," etc.
- **Free tier virality** — Watermarked free resumes drive brand awareness

### Phase 2: Growth (Months 3-6)
- **Content marketing** — Resume tips, career advice, interview guides
- **YouTube tutorials** — "How to build a resume in 2 minutes with AI"
- **Partnerships** — Bootcamps, career coaches, university career centers
- **Referral program** — Users get 1 month free Pro for each referral

### Phase 3: Scale (Months 6-12)
- **Paid ads** — Google Ads on "resume builder" keywords, Meta retargeting
- **Enterprise outreach** — Career centers, staffing agencies, HR departments
- **API/white-label** — Let other platforms use ResumeHowl's engine

### Key Channels
- Organic search (SEO)
- Social media (LinkedIn, Twitter/X, Reddit, TikTok)
- Product Hunt / Indie Hackers
- Word of mouth / referrals
- Content marketing (blog, YouTube)

---

## 8. Operations

### Team (Current)
- **Evin Carr** — Founder, product, development, marketing (everything)

### Tools & Infrastructure
- Development: Next.js + MakerKit SaaS boilerplate
- Hosting: Vercel (auto-deploy from GitHub)
- Database & Auth: Supabase
- Email: Resend (transactional emails from hello@resumehowl.com)
- Payments: Stripe (subscription billing)
- AI: Anthropic Claude API / OpenAI API (resume generation)
- Domain & DNS: Managed via registrar + Vercel
- Version Control: GitHub (resumehowl-saas repo)
- AI Development: Claude Code, Codex

### Operational Costs (Estimated Monthly)
| Item | Cost |
|---|---|
| Vercel Pro | $20/mo |
| Supabase Pro | $25/mo |
| Resend | $0-20/mo (scales with usage) |
| Stripe fees | 2.9% + $0.30 per transaction |
| AI API costs | $10-100/mo (scales with usage) |
| Domain renewal | ~$12/yr |
| **Total (low usage)** | **~$80/mo** |
| **Total (moderate usage)** | **~$200/mo** |

---

## 9. Financial Projections

### Year 1 Targets
| Metric | Month 3 | Month 6 | Month 12 |
|---|---|---|---|
| Free users | 500 | 2,000 | 10,000 |
| Pro subscribers | 25 | 150 | 750 |
| MRR | $250 | $1,500 | $7,500 |
| ARR | $3,000 | $18,000 | $90,000 |

### Break-Even Analysis
- Monthly costs at moderate usage: ~$200
- Break-even at: ~20 Pro subscribers ($200/mo)
- Target: Break even by Month 2-3

### Year 2 Goals
- 2,500+ Pro subscribers
- $25,000+ MRR
- Introduce Enterprise tier
- Hire first contractor (content/marketing)

---

## 10. Milestones & Roadmap

### Q1 2026 (Now - March)
- [x] Core platform built and deployed
- [x] Auth, billing, and email configured
- [ ] Fix remaining bugs (Pro upgrade flow, builder errors)
- [ ] Soft launch to friends/family/network
- [ ] Product Hunt launch

### Q2 2026 (April - June)
- [ ] Launch blog with SEO content
- [ ] Add 10+ resume templates
- [ ] Implement referral program
- [ ] Reach 100 Pro subscribers

### Q3 2026 (July - September)
- [ ] Add hosted resume sites feature
- [ ] Implement custom domain support
- [ ] Begin paid advertising
- [ ] Reach 500 Pro subscribers

### Q4 2026 (October - December)
- [ ] Enterprise/team plans
- [ ] API access for partners
- [ ] Reach 1,000 Pro subscribers
- [ ] Evaluate hiring

---

## 11. Risks & Mitigation

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Low conversion (free to Pro) | Medium | High | A/B test pricing, improve Pro value prop |
| AI API costs spike | Medium | Medium | Cache common generations, set usage limits |
| Competition from big players | Medium | Medium | Move fast, niche down, better UX |
| Technical issues / downtime | Low | High | Vercel reliability, Supabase backups, monitoring |
| Founder burnout | Medium | High | Automate ops, hire help early, set boundaries |

---

## 12. Vision

ResumeHowl becomes the go-to platform for AI-powered career documents. Beyond resumes, we expand into cover letters, LinkedIn optimization, portfolio sites, and interview prep — a complete career toolkit powered by AI, at a fraction of the cost of traditional services.

**Mission:** Make professional career materials accessible to everyone, regardless of budget or technical skill.
