# AI Tool Pricing Data

This document tracks the current pricing structures for the AI tools supported by StackSpend. The data is implemented deterministically in the `data/pricing/` directory.

## Data Architecture

Pricing is managed via the `PricingPlan` TypeScript interface:
- **ID & Vendor:** Unique identifiers (e.g., `chatgpt-plus`, `OpenAI`).
- **Plan Type:** `free`, `individual`, `team`, `business`, `enterprise`, `api`.
- **Monthly Price:** Baseline cost per seat.
- **Seat Requirements:** Minimum and recommended seat counts.
- **Use Cases:** Evaluated against team workflows (e.g., `coding`, `writing`, `research`, `mixed`).

## Implemented Vendors

### OpenAI (ChatGPT)
- **ChatGPT Free:** $0/mo (Basic access)
- **ChatGPT Plus:** $20/mo (Individual, 1-2 seats recommended)
- **ChatGPT Business:** $25/mo (Team, 2+ seats required)

### Anthropic (Claude)
- **Claude Free:** $0/mo (Basic access)
- **Claude Pro:** $20/mo (Individual, 1-2 seats recommended)
- **Claude Team:** $30/mo (Team, 5+ seats required)

## Planned Vendor Expansion

The following tools will be mapped and added to the pricing database configuration files in upcoming iterations:

- **Cursor:** Pro ($20/mo), Business ($40/mo)
- **GitHub Copilot:** Individual ($10/mo), Business ($19/mo), Enterprise ($39/mo)
- **Gemini:** Advanced ($20/mo), Business ($30/mo)
- **API Models:** OpenAI API, Anthropic API (requires a different schema for usage-based estimates rather than seat-based fixed pricing)
- **Windsurf:** Pro ($15/mo)
