## Day 1 — 2026-05-07

**Hours worked:** 2

**What I did:**
- Finalized the product direction and branding for “StackSpend”
- Chose Next.js 15, TypeScript, Tailwind CSS, shadcn/ui, and Framer Motion as the core stack
- Set up the project architecture and folder structure
- Implemented the initial dark-theme design system
- Built the first version of the landing page hero section
- Designed reusable UI foundations including navbar, metric cards, CTA buttons, and glassmorphism styling
- Focused on creating a premium AI-finance visual identity inspired by Stripe, Linear, and Ramp

**What I learned:**
- Premium spacing, typography hierarchy, and restrained gradients make a much bigger difference than excessive animations.
- The assignment prioritizes believable product thinking and UX clarity over feature quantity.

**Blockers / what I'm stuck on:**
- Need to define deterministic audit rules that feel financially defensible rather than opinion-based.
- Need a clean strategy for normalizing pricing comparisons across subscription and API-based AI tools.

**Plan for tomorrow:**
- Research current pricing data for all required AI tools
- Create PRICING_DATA.md
- Design the audit engine recommendation logic
- Begin implementing structured pricing configuration files


## Day 2 — 2026-05-08

**Hours worked:** 4

**What I did:**

* Built the interactive audit builder flow
* Implemented dynamic AI tool selection with pricing-driven plan options
* Created reusable pricing configuration architecture for ChatGPT, Claude, and future providers
* Added local storage persistence for audit form state
* Designed and implemented the deterministic audit engine structure
* Added recommendation logic for plan downgrades, duplicate tooling, and team-size optimization
* Connected the “Generate Audit Report” flow to the audit engine
* Built the first version of the audit results page with savings calculations and recommendation cards
* Focused heavily on making recommendations financially explainable instead of AI-generated guesses

**What I learned:**

* Deterministic recommendation systems are significantly more trustworthy than fully AI-generated financial suggestions.
* Structuring pricing data as reusable configuration objects made the audit engine much easier to scale.

**Blockers / what I'm stuck on:**

* Need a cleaner strategy for handling API-based pricing comparisons versus subscription-based plans.
* Need to improve recommendation scoring and prioritization logic for overlapping AI tools.

**Plan for tomorrow:**

* Expand pricing coverage for all required vendors
* Add backend persistence with Supabase
* Implement shareable audit URLs
* Begin AI-generated personalized summaries


## Day 3 — 2026-05-09

**Hours worked:** 0

**Reason:**

* Had a university examination and was out of town, so I could not work on the project today.


## Day 4 — 2026-05-10

**Hours worked:** 5

**What I did:**

* Integrated Firebase Firestore persistence for audit reports and lead capture
* Implemented dynamic public audit result pages using unique IDs
* Added shareable report URLs with copy-link functionality
* Connected the “Send Audit to Inbox” flow to a backend email delivery system
* Implemented transactional email delivery using Nodemailer
* Stored captured leads in Firebase with audit references
* Added AI-generated personalized audit summaries with fallback handling
* Improved results page hierarchy, recommendation presentation, and sharing UX
* Added lightweight abuse prevention and improved async error handling

**What I learned:**

* Separating deterministic financial logic from AI-generated narrative summaries creates a significantly more trustworthy user experience.
* Building public sharing and transactional flows makes the product feel much closer to a real SaaS MVP.

**Blockers / what I'm stuck on:**

* Initially attempted to use Resend for transactional email delivery, but encountered integration and configuration issues during development. Switched to Nodemailer to avoid blocking overall product progress and keep the email workflow functional.
* Need more comprehensive automated testing coverage for the audit engine and API routes.

**Plan for tomorrow:**

* Add automated tests for audit calculations and recommendation rules
* Setup GitHub Actions CI workflow
* Expand pricing coverage for remaining vendors
* Improve Lighthouse performance and mobile responsiveness

## Day 5 — 2026-05-11

**Hours worked:** 3.5

**What I did:**

* Added complete pricing coverage for all required AI vendors and subscription plans
* Configured Vitest testing setup for the audit engine
* Implemented automated unit tests for:

  * downgrade recommendations
  * duplicate tooling detection
  * annual savings calculations
  * optimized stack handling
  * invalid input handling
* Added calculation validation tests and edge-case coverage
* Configured GitHub Actions CI workflow to automatically run linting and tests on every push
* Improved audit engine reliability and deterministic validation coverage

**What I learned:**

* Structuring deterministic financial logic into isolated rule-based functions made automated testing significantly easier and more reliable.
* CI pipelines immediately exposed smaller TypeScript and linting inconsistencies that were easy to miss during manual development.

**Blockers / what I'm stuck on:**

* Need additional polish for mobile responsiveness, loading states, and Lighthouse optimization before final submission.
* Some Framer Motion interactions still need optimization for lower-end mobile devices.

**Plan for tomorrow:**

* Improve Lighthouse performance and accessibility
* Add polished error states and loading states
* Refine mobile responsiveness and spacing consistency
* Improve screenshot quality and final UX polish


## Day 6 — 2026-05-12

**Hours worked:** 5

**What I did:**
- Integrated Flask backend APIs with the existing Next.js frontend
- Connected Gemini-powered AI summary generation through backend endpoints
- Moved transactional email delivery logic to backend services
- Added centralized backend validation and graceful fallback handling
- Implemented polished loading skeletons and premium error states
- Improved accessibility across forms, navigation, and interactive components
- Optimized Lighthouse performance through image optimization, caching configuration, and animation refinement
- Improved mobile responsiveness, spacing consistency, and touch interactions
- Added deployment readiness and production verification documentation

**What I learned:**
- Separating sensitive integrations into backend services significantly improved architecture quality and production readiness.
- Small UX improvements like loading states, error handling, and metadata dramatically improve perceived product quality.

**Blockers / what I'm stuck on:**
- The current UI system still feels visually generic despite functional polish. The final major improvement area is refining the visual identity and layout system.

**Plan for tomorrow:**
- Redesign the UI/UX with a more premium and intentional visual system
- Finalize remaining documentation files
- Capture final screenshots and verify deployment readiness


## Day 7 — 2026-05-13

**Hours worked:** 6

**What I did:**
Completed final UI/UX polish, redesigned the landing page with a more premium operator-focused aesthetic inspired by infrastructure tooling platforms like Credex, Linear, and Ramp, and refined the hero section, audit preview, typography, spacing, and floating visuals.

Added and refined landing page sections including:

* trusted tools
* AI spend chaos
* how it works
* optimization examples
* deterministic logic
* final CTA

Also finalized the StackSpend logo, completed deployment, verified backend integrations, tested public audit URLs and email delivery, and finished remaining documentation files and repository cleanup.

**What I learned:**
Small refinements in typography, spacing, hierarchy, and tone significantly improve how trustworthy and production-ready a product feels.

**Blockers / what I'm stuck on:**
Balancing originality with inspiration from infrastructure tooling websites without making the design feel visually copied.