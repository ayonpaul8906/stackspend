# Architecture

## Stack

### Frontend

* Next.js 15 App Router
* TypeScript
* Tailwind CSS
* shadcn/ui
* Framer Motion

### Form + Validation

* React Hook Form
* Zod

### Backend

* Firebase Firestore
* Nodemailer

### AI

* Gemini API (planned for narrative summaries only)

---

# Current System Flow

User Input
↓
Dynamic Audit Builder
↓
Pricing Configuration Layer
↓
Deterministic Audit Engine
↓
Savings Calculations
↓
Recommendation Generator
↓
Firebase Audit Persistence
↓
Dynamic Public Report URL
↓
Lead Capture
↓
Transactional Email Delivery
↓
Results Rendering

---

# Pricing Architecture

Pricing data is stored as normalized configuration objects inside:

src/data/pricing/

This architecture enables:

* dynamic plan rendering
* scalable vendor support
* deterministic calculations
* centralized pricing management
* reusable pricing logic

---

# Audit Engine Philosophy

The audit engine intentionally avoids using AI for financial calculations.

Recommendations are:

* deterministic
* rule-based
* explainable
* financially defensible

This ensures:

* predictable outputs
* transparent savings logic
* trustworthy recommendations

AI is reserved only for personalized narrative summaries.

---

# Persistence Layer

Firebase Firestore stores:

* audit reports
* optimization recommendations
* lead capture submissions

Public audit reports are accessible using unique shareable URLs while excluding sensitive lead information.

---

# Email Delivery

Transactional email delivery is implemented using Nodemailer.

This approach was chosen because:

* lightweight integration
* rapid MVP setup
* full template control
* reduced external dependency friction during development

---

# Future Scalability

If scaled to 10k+ audits/day:

* move audit execution to server-side jobs
* cache pricing configuration
* add Redis-based rate limiting
* optimize Firestore indexing
* generate async OG images
* queue email delivery jobs

# Reliability & CI

The project includes:
- automated audit engine testing using Vitest
- deterministic financial validation tests
- GitHub Actions CI workflow

CI automatically runs:
- lint checks
- audit engine tests

on every push and pull request to ensure reliability and prevent regression issues.