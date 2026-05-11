# StackSpend

StackSpend is an AI subscription audit platform that helps startups and teams identify overspending across tools like ChatGPT, Claude, Cursor, GitHub Copilot, Gemini, and AI APIs.

Users can analyze their AI stack, detect duplicate subscriptions, optimize seat allocation, and estimate monthly + annual savings through a premium shareable audit experience.

---

# Features Implemented

* Premium landing page
* Interactive AI stack builder
* Dynamic pricing-driven plan selection
* Deterministic audit engine
* Savings calculation system
* Recommendation engine
* Firebase audit persistence
* Public shareable report URLs
* AI audit summaries
* Lead capture flow
* Transactional email delivery
* Copy-link sharing UX
* Local storage persistence
* Responsive premium UI
* Complete pricing coverage for required AI vendors
* Automated audit engine test suite
* GitHub Actions CI pipeline
* Deterministic financial validation coverage

---

# Tech Stack

* Next.js 15
* TypeScript
* Tailwind CSS
* shadcn/ui
* Framer Motion
* React Hook Form
* Zod
* Firebase Firestore
* Nodemailer
* Vitest
* GitHub Actions

---

# Product Philosophy

StackSpend intentionally uses deterministic recommendation logic instead of AI-generated financial decisions.

AI is reserved only for narrative summaries, while pricing calculations and optimization logic remain:

* explainable
* rule-based
* financially defensible

---

# Current Status

Completed:

* Day 1 → Branding + UI system
* Day 2 → Audit engine + interactive audit flow
* Day 3 → Development paused due to university examination
* Day 4 → Firebase persistence, public reports, email delivery

---

# Planned Features

* Dynamic Open Graph image generation
* PDF report export
* Advanced optimization scoring
* Benchmark comparisons
* Additional pricing vendors

---

# Screenshot
| **Landing Page** | **Audit Page** | **Result Page** |
|:------------:|:------------:|:------------:|
| ![Landing Page](https://github.com/user-attachments/assets/bcec4e73-e4f2-4d1f-8cf4-94ac297a3feb) | ![Audit Page](https://github.com/user-attachments/assets/9d5110b5-b946-4410-808a-e0b123f11ae3) | ![Result Page](https://github.com/user-attachments/assets/354d3635-e1b4-465f-8871-add5e9904708) |

# Local Development

```bash
npm install
npm run dev
```
