# StackSpend

StackSpend is an AI subscription audit platform that helps teams identify unnecessary AI tooling spend across ChatGPT, Claude, Cursor, Gemini, GitHub Copilot, and API providers.

Users can analyze their AI stack, detect overlapping subscriptions, optimize plan allocation, and estimate monthly + annual savings through deterministic recommendation logic and shareable audit reports.

---

# Live Demo

Deployed URL:

---

# Core Features

* Interactive AI spend audit builder
* Deterministic audit engine
* Pricing-driven recommendation system
* AI-generated narrative summaries
* Firebase audit persistence
* Public shareable report URLs
* Transactional email delivery
* Responsive mobile-first UI
* Automated audit engine tests
* GitHub Actions CI workflow

---

# Supported Vendors

* ChatGPT
* Claude
* Cursor
* GitHub Copilot
* Gemini
* OpenAI API
* Windsurf

---

# Product Philosophy

StackSpend intentionally avoids using AI for:

* pricing calculations
* optimization decisions
* financial recommendations

All financial logic is deterministic and rule-based to ensure:

* explainability
* predictable outputs
* finance-readable reasoning
* trustworthy recommendations

LLMs are used only for concise narrative summaries.

---

# Tech Stack

## Frontend

* Next.js 15
* TypeScript
* Tailwind CSS
* shadcn/ui
* Framer Motion
* React Hook Form
* Zod

---

## Backend

* Flask
* Gemini API
* Firebase Firestore
* Nodemailer

---

## Reliability & Tooling

* Vitest
* GitHub Actions CI

---

# Screenshots

| Landing Page                                                                                | Audit Builder                                                                             | Results Page                                                                                |
| ------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| ![Landing](https://github.com/user-attachments/assets/bcec4e73-e4f2-4d1f-8cf4-94ac297a3feb) | ![Audit](https://github.com/user-attachments/assets/9d5110b5-b946-4410-808a-e0b123f11ae3) | ![Results](https://github.com/user-attachments/assets/354d3635-e1b4-465f-8871-add5e9904708) |

---

# Local Development

## Frontend

```bash
npm install
npm run dev
```

---

## Backend

```bash
cd backend
pip install -r requirements.txt
python app.py
```

---

# Environment Variables

Frontend:

* NEXT_PUBLIC_FIREBASE_API_KEY
* NEXT_PUBLIC_FIREBASE_PROJECT_ID

Backend:

* GEMINI_API_KEY
* MAIL_USERNAME
* MAIL_PASSWORD
* FIREBASE_CREDENTIALS

---

# Decisions & Tradeoffs

## 1. Deterministic Financial Logic Over AI Recommendations

Financial optimization logic was intentionally implemented using deterministic rules instead of LLM reasoning to improve explainability and reduce hallucination risk.

---

## 2. No Login Required Before Value Delivery

Users can generate audits without authentication to reduce friction and improve completion rates.

---

## 3. Flask Backend Instead of Serverless-Only APIs

Sensitive integrations like Gemini summaries and transactional email delivery were isolated into a dedicated Flask backend for cleaner architecture and credential security.

---

## 4. Firebase for Rapid Persistence

Firestore was chosen for rapid iteration speed, flexible document structures, and simplified deployment during MVP development.

---

## 5. Public Shareable Reports

Public report URLs were prioritized because report sharing acts as the product’s built-in viral acquisition loop.

---

# Current Status

Completed:

* audit engine
* Firebase persistence
* Flask backend integration
* AI summaries
* transactional email delivery
* public reports
* CI workflow
* automated tests
* production polish

Planned:

* PDF exports
* benchmarking mode
* referral system
* expanded vendor coverage

---

# Testing

```bash
npm run test
```

Current automated coverage:

* audit engine logic
* deterministic savings calculations
* invalid input handling
* optimization scoring
* duplicate tooling detection

---

# Deployment

The application is designed for:

* Vercel (frontend)
* Render / Railway (Flask backend)
* Firebase Firestore

Production deployment notes are documented in:

* DEPLOYMENT.md
* PRODUCTION_POLISH.md
