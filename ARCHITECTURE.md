# ARCHITECTURE

## Overview

StackSpend is a full-stack AI subscription audit platform that helps teams identify unnecessary AI tooling spend, optimize subscription allocation, and estimate monthly + annual savings using deterministic recommendation logic.

The system intentionally separates:

* deterministic financial calculations
* AI-generated narrative summaries

This ensures recommendations remain explainable, predictable, and financially defensible.

---

# System Architecture

```text
Frontend (Next.js)
│
├── Landing Page
├── Audit Builder
├── Deterministic Audit Engine
├── Public Report Pages
├── Share UX
└── Frontend State Management
        │
        ▼
Backend (Flask API)
│
├── Gemini Summary Generation
├── Transactional Email Services
├── Backend Validation
├── Rate Limiting
└── Firebase Admin Integration
        │
        ▼
Infrastructure Services
│
├── Firebase Firestore
├── Gemini API
└── SMTP / Nodemailer
```

---

# Tech Stack

## Frontend

* Next.js 15 App Router
* TypeScript
* Tailwind CSS
* shadcn/ui
* Framer Motion
* React Hook Form
* Zod

---

## Backend

* Flask
* Python
* Firebase Admin SDK
* Flask-CORS
* Flask-Limiter
* python-dotenv

---

## Infrastructure & Services

* Firebase Firestore
* Gemini API
* Nodemailer
* GitHub Actions CI

---

# Current System Flow

```text
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
Flask Summary Generation API
↓
Public Report Rendering
↓
Lead Capture
↓
Transactional Email Delivery
↓
Shareable Public URL
```

---

# Pricing Architecture

Pricing data is stored as normalized TypeScript configuration objects inside:

```text
src/data/pricing/
```

This architecture enables:

* dynamic plan rendering
* centralized pricing management
* deterministic calculations
* reusable financial logic
* scalable vendor support

Each pricing entry includes:

* vendor
* plan name
* pricing structure
* use cases
* features
* verification date
* official pricing source URL

Enterprise plans with custom pricing are intentionally represented separately due to unavailable public pricing.

---

# Audit Engine Philosophy

The audit engine intentionally avoids using AI for:

* pricing calculations
* financial optimization logic
* savings generation
* recommendation decisions

Instead, recommendations are:

* deterministic
* rule-based
* explainable
* financially defensible

This ensures:

* predictable outputs
* transparent recommendation logic
* finance-readable reasoning
* trustworthy savings calculations

AI is reserved only for concise narrative summaries.

---

# AI System Philosophy

Gemini is used exclusively for:

* personalized audit summaries
* concise user-facing explanations

The model receives:

* deterministic recommendation outputs
* spend calculations
* team information
* selected tooling

The model is explicitly instructed NOT to:

* invent pricing
* fabricate recommendations
* generate savings numbers
* hallucinate financial logic

Fallback summaries are returned if AI generation fails.

---

# Persistence Layer

Firebase Firestore stores:

* audit reports
* optimization recommendations
* lead capture submissions
* shareable report metadata

Public reports are accessible using unique shareable URLs while excluding sensitive lead information.

---

# Backend Responsibilities

The Flask backend handles:

* AI summary generation
* transactional email delivery
* request validation
* backend error handling
* rate limiting
* Firebase secure operations

Sensitive integrations and API credentials are intentionally isolated from the frontend layer.

---

# Reliability & CI

The project includes:

* automated audit engine testing using Vitest
* deterministic financial validation tests
* GitHub Actions CI workflow
* frontend error boundaries
* graceful fallback handling
* production-safe environment management

CI automatically runs:

* lint checks
* audit engine tests

on every push and pull request.

---

# Production Hardening

The application includes:

* accessibility improvements
* Lighthouse optimization
* loading skeletons
* graceful error states
* mobile responsiveness optimization
* dynamic Open Graph metadata
* deployment verification documentation

Target Lighthouse scores:

* Performance ≥ 85
* Accessibility ≥ 90
* Best Practices ≥ 90

---

# Future Scalability

If scaled to 10k+ audits/day:

* move audit execution to dedicated backend workers
* add Redis-based rate limiting
* cache pricing configuration aggressively
* optimize Firestore indexing
* queue email delivery jobs
* generate async OG images
* add analytics instrumentation
* separate AI summary generation into async processing
