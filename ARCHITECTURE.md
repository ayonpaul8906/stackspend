# Architecture

## Stack

### Frontend
- Next.js 15 App Router
- TypeScript
- Tailwind CSS
- shadcn/ui
- Framer Motion

### Form + Validation
- React Hook Form
- Zod

### Planned Backend
- Supabase
- Resend

### AI
- GEMINI API

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
Results Rendering

---

# Pricing Architecture

Pricing data is stored as normalized configuration objects inside:

src/data/pricing/

This allows:
- dynamic plan rendering
- scalable vendor support
- deterministic calculations
- centralized pricing management

---

# Audit Engine Philosophy

The audit engine intentionally avoids using AI for financial calculations.

Recommendations are:
- rule-based
- deterministic
- explainable
- financially defensible

AI is reserved only for personalized narrative summaries later in the product flow.

---

# Future Scalability

If scaled to 10k+ audits/day:

- move audit execution into server-side processing
- cache pricing configuration
- add Redis rate limiting
- use database-backed audit persistence
- generate async OG images