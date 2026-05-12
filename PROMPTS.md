# PROMPTS

## Overview

StackSpend uses Gemini exclusively for generating concise narrative summaries of deterministic audit outputs.

The AI layer is intentionally restricted to:

* user-facing explanations
* concise audit summaries
* narrative communication

The AI system does NOT:

* calculate savings
* generate recommendations
* perform pricing logic
* decide optimizations

All financial reasoning originates from the deterministic TypeScript audit engine.

This separation was intentionally designed to:

* prevent hallucinated financial outputs
* improve explainability
* maintain deterministic recommendation consistency
* keep audit outputs financially defensible

---

# Gemini Service Architecture

## File

```text
backend/services/gemini_service.py
```

Responsibilities:

* initialize Gemini client
* generate narrative summaries
* fallback safely if AI fails
* keep outputs concise and deterministic

The service receives pre-calculated deterministic audit results and only narrates them.

---

# System Prompt

## File

```text
backend/utils/prompts.py
```

## Current System Instruction

```text
You are generating a concise AI tooling audit summary.

Use ONLY the provided deterministic audit outputs.

Do NOT:
- invent pricing
- generate new recommendations
- fabricate savings numbers
- exaggerate optimization opportunities
- mention unsupported tooling

Keep the tone:
- professional
- financially rational
- concise
- trustworthy

The summary should sound like an operator or finance reviewer explaining optimization opportunities to a startup team.
```

---

# Runtime Prompt Inputs

The runtime prompt receives:

* selected AI tools
* subscription plans
* team size
* use case
* current monthly spend
* annual savings
* deterministic recommendations

These values are generated entirely from the deterministic audit engine before reaching Gemini.

---

# Gemini Generation Configuration

Current configuration:

```python
temperature=0.3
max_output_tokens=300
top_p=0.85
```

Reasoning:

* low temperature improves factual consistency
* capped token count prevents verbose responses
* reduced creativity minimizes hallucination risk

The goal is:

* concise
* trustworthy
* financially grounded summaries

rather than creative writing.

---

# Example Runtime Payload

```json
{
  "teamSize": 5,
  "useCase": "coding",
  "totalCurrentMonthlySpend": 420,
  "totalAnnualSavings": 2160,
  "tools": [
    "ChatGPT Plus",
    "Claude Team",
    "Cursor Pro"
  ],
  "recommendations": [
    "Downgrade Claude Team",
    "Remove overlapping tooling"
  ]
}
```

---

# Example Expected Output

```text
Your current AI tooling stack appears moderately optimized for a 5-person engineering workflow. The audit identified overlapping spend across conversational AI tools and unnecessary team-tier subscriptions. Implementing the recommended changes could significantly reduce annual tooling costs while preserving similar operational capabilities.
```

---

# Fallback Summary Strategy

If Gemini generation fails due to:

* API outage
* invalid response
* rate limiting
* missing API keys
* provider errors

the backend automatically falls back to deterministic summary generation.

## Fallback Characteristics

Fallback summaries are:

* non-AI
* deterministic
* safe
* concise
* generated from audit metadata only

This ensures the application remains fully functional even during AI provider failures.

---

# Email Prompting Strategy

Transactional emails use:

* deterministic metrics
* backend-generated summaries
* structured HTML templates

The email layer intentionally avoids additional AI prompting to preserve:

* consistency
* predictability
* deliverability

---

# Why AI Was Intentionally Limited

This project handles financial optimization recommendations.

Using LLMs directly for:

* pricing calculations
* optimization logic
* savings generation

would introduce:

* hallucination risk
* inconsistent outputs
* poor explainability
* unreliable recommendations

For this reason:

* deterministic logic handles all financial reasoning
* Gemini is restricted to narrative communication only

This architecture significantly improves:

* reliability
* trustworthiness
* recommendation consistency
* finance-readability