# PRICING_DATA

All pricing data in StackSpend is sourced directly from official vendor pricing pages and normalized into reusable TypeScript pricing configuration objects.

Pricing information is periodically verified and updated to reflect current public pricing.

---

# OpenAI — ChatGPT

Source:  
https://openai.com/chatgpt/pricing/

## Plans

| Plan | Pricing |
|---|---|
| ChatGPT Free | $0/month |
| ChatGPT Plus | $20/month |
| ChatGPT Pro | $200/month |
| ChatGPT Business | $30/user/month ($25/user/month annually) |
| ChatGPT Enterprise | Custom pricing |

## Notes

* ChatGPT Business was previously branded as ChatGPT Team.
* Enterprise pricing is not publicly disclosed.
* Pricing may vary by country, taxes, and billing region.

---

# Anthropic — Claude

Source:  
https://claude.com/pricing

## Individual Plans

| Plan | Pricing |
|---|---|
| Claude Free | $0/month |
| Claude Pro | $20/month ($17/month annual effective pricing) |
| Claude Max 5x | $100/month |
| Claude Max 20x | $200/month |

## Team & Enterprise Plans

| Plan | Pricing |
|---|---|
| Claude Team Standard | $25/user/month annually ($30/user/month monthly billing) |
| Claude Team Premium | $100/user/month annually ($125/user/month monthly billing) |
| Claude Enterprise | Custom pricing |

## Education

Claude Education is available for universities and institutions through custom pricing and sales-assisted onboarding.

---

# Cursor

Source:  
https://cursor.com/pricing

## Plans

| Plan | Pricing |
|---|---|
| Cursor Hobby | $0/month |
| Cursor Pro | $20/month |
| Cursor Pro+ | $60/month |
| Cursor Ultra | $200/month |
| Cursor Teams | $40/user/month |
| Cursor Enterprise | Custom pricing |

## Additional Products

| Product | Pricing |
|---|---|
| Cursor Bugbot Pro | $40/month |
| Cursor Bugbot Teams | $40/user/month |
| Cursor Bugbot Enterprise | Custom pricing |

## Notes

* Cursor pricing includes access to multiple AI providers depending on plan limits.
* Enterprise plans include advanced security, RBAC, audit logs, and account management features.

---

# GitHub Copilot

Source:  
https://github.com/features/copilot/plans

## Plans

| Plan | Pricing |
|---|---|
| GitHub Copilot Free | $0/month |
| GitHub Copilot Pro | $10/month |
| GitHub Copilot Pro+ | $39/month |
| GitHub Copilot Business | $19/user/month |
| GitHub Copilot Enterprise | $39/user/month |
| GitHub Copilot Student | Free for verified students |

## Notes

* GitHub Copilot Student requires GitHub Student Developer Pack verification.
* Enterprise plans include organization-wide governance and security controls.

---

# Google Gemini / Google AI

Source:  
https://gemini.google/in/subscriptions/

## Plans (India Pricing)

| Plan | Pricing |
|---|---|
| Google AI Free | Free |
| Google AI Plus | ₹399/month (₹199 introductory pricing) |
| Google AI Pro | ₹1950/month |
| Google AI Ultra | ₹24500/month |

## Notes

* Pricing shown is based on India regional pricing.
* Features and pricing may vary by country and billing region.
* Google AI subscriptions include Gemini app features and bundled Google services/storage.

---

# Windsurf

Source:  
https://windsurf.com/pricing

## Plans

| Plan | Pricing |
|---|---|
| Windsurf Free | $0/month |
| Windsurf Pro | $20/month |
| Windsurf Max | $200/month |
| Windsurf Teams | $40/user/month |
| Windsurf Enterprise | Custom pricing |

## Notes

* Windsurf pricing uses usage-based AI allocation limits.
* Enterprise plans include SSO, RBAC, analytics, and deployment controls.

---

# OpenAI API

Source:  
https://openai.com/api/pricing/

## API Pricing Models

### GPT-5.5 API

| Type | Pricing |
|---|---|
| Input | $5 / 1M tokens |
| Cached Input | $0.50 / 1M tokens |
| Output | $30 / 1M tokens |

### GPT-5.4 API

| Type | Pricing |
|---|---|
| Input | $2.50 / 1M tokens |
| Cached Input | $0.25 / 1M tokens |
| Output | $15 / 1M tokens |

### GPT-5.4 Mini API

| Type | Pricing |
|---|---|
| Input | $0.75 / 1M tokens |
| Cached Input | $0.075 / 1M tokens |
| Output | $4.50 / 1M tokens |

## Additional APIs

* GPT Realtime API
* GPT Realtime Translate API
* GPT Realtime Whisper API
* GPT Image API
* Batch Processing API
* Priority Processing API

## Notes

OpenAI API pricing varies depending on:

* token usage
* cached token usage
* audio processing
* image generation
* realtime processing
* model family
* priority processing tier

Batch API pricing provides discounted asynchronous processing rates.

---

# Pricing Architecture Notes

Pricing data is intentionally stored as normalized TypeScript configuration objects inside:

```txt
src/data/pricing/
```

## Architecture Goals

* deterministic audit logic
* centralized pricing management
* dynamic pricing rendering
* scalable vendor support
* reusable financial calculations
* vendor comparison support
* future API synchronization support

## Enterprise Pricing

Enterprise plans with custom pricing are intentionally represented separately because exact public pricing is unavailable.

## Data Verification Policy

Pricing entries should always be verified against official vendor pricing pages before release updates.