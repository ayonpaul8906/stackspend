# Testing Strategy & Scenarios

This document outlines the testing architecture and critical test cases for StackSpend. The focus is on ensuring the deterministic audit engine remains reliable, financially defensible, and free from AI-generated hallucinations.

## Core Testing Principles

1. **Deterministic Outcomes:** The audit engine must produce the exact same recommendations and savings calculations for identical inputs.
2. **Financial Accuracy:** All math (monthly/annual savings, optimization scores) must be precise. 
3. **Graceful Failures:** Missing pricing data or unusual inputs must safely fallback without crashing the engine.

## Critical Test Scenarios

### 1. Audit Engine Rules

**Rule A: ChatGPT Business Seat Optimization**
- **Input:** ChatGPT Business plan, 1-2 seats.
- **Expected Output:** Recommend downgrade to ChatGPT Plus. Calculate savings of $5/mo per seat.
- **Action Type:** `downgrade`
- **Severity:** `team_overkill`

**Rule B: Claude Team Minimum Seat Optimization**
- **Input:** Claude Team plan, 2 active seats.
- **Expected Output:** Recommend downgrade to Claude Pro. Flag the wasted spend resulting from the 5-seat minimum requirement.
- **Action Type:** `downgrade`
- **Severity:** `team_overkill`

**Rule C: Overlapping Tool Consolidation**
- **Input:** ChatGPT Plus, Claude Pro, and Gemini Advanced all assigned to overlapping "mixed" or "writing" use cases.
- **Expected Output:** Recommend keeping the primary tool and consolidating/removing the others. Calculate savings equal to the total cost of removed tools.
- **Action Type:** `consolidate`
- **Severity:** `duplicate_spend`

**Rule D: Expensive Plan / Low Seat Count Flag**
- **Input:** Any tool with a spend-to-seat ratio > $30/mo for a tiny team (< 3 seats).
- **Expected Output:** Flag for review, recommend standardizing on individual plans ($20/mo).
- **Action Type:** `downgrade`
- **Severity:** `moderate_savings`

**Rule E: Fully Optimized Stack**
- **Input:** Appropriate plan and seat count matching team size (e.g., ChatGPT Plus, 1 seat, $20/mo).
- **Expected Output:** No action required, state "keep".
- **Action Type:** `keep`
- **Severity:** `optimized`

### 2. Frontend & UX Testing
- **Hydration & Persistence:** Verify that `localStorage` safely restores the `AuditFormValues` on page refresh without Next.js hydration mismatch errors (`useFormPersistence` hook).
- **Dynamic Plan Loading:** Verify that selecting a vendor in the tool dropdown successfully populates the dependent plan selector dynamically from `pricingDatabase`.
- **Result Navigation:** Ensure the `Generate Audit Report` action appropriately stores the engine's output and routes seamlessly to `/results`.

### 3. Future Automated Test Implementation
- Implement unit tests for `runAuditEngine` and `generateRecommendations` using **Vitest** or **Jest**.
- Implement E2E flows using **Playwright** or **Cypress** to verify the complete user journey from Landing Page -> Audit Builder -> Results Page.

### 4. Backend & Persistence Testing

- Verify Firebase audit documents are created successfully after report generation.
- Verify lead capture documents are stored correctly in Firestore.
- Verify public reports render correctly using dynamic route IDs.
- Verify transactional email requests return successful API responses.
- Verify invalid audit IDs gracefully show a “Report Not Found” state.

### 5. Planned CI Coverage

Planned GitHub Actions workflow:
- lint checks
- TypeScript checks
- audit-engine unit tests
- route validation tests
