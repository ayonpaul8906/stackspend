# TESTS

## Test Stack

* Vitest
* TypeScript
* GitHub Actions CI

---

# Run Tests

Run all automated tests:

```bash
npm run test
```

Run tests in watch mode:

```bash
npm run test:watch
```

Run lint checks:

```bash
npm run lint
```

---

# Automated Audit Engine Tests

All audit engine tests are implemented using Vitest and currently pass.

## Test File

```text
tests/audit-engine/audit-engine.test.ts
```

---

# Implemented Automated Tests

## 1. ChatGPT Business Downgrade Detection

### Covers

* Detecting overpayment on ChatGPT Business plans with low seat counts
* Recommending downgrade to ChatGPT Plus
* Monthly savings calculation accuracy

### Run

```bash
npm run test
```

---

## 2. Claude Team Minimum Seat Optimization

### Covers

* Detecting wasted spend caused by Claude Team minimum seat requirements
* Recommendation generation
* Deterministic savings calculations

### Run

```bash
npm run test
```

---

## 3. Duplicate Tool Consolidation Detection

### Covers

* Detecting overlapping spend across:

  * ChatGPT
  * Claude
  * Gemini
* Consolidation recommendation logic
* Duplicate tooling savings calculations

### Run

```bash
npm run test
```

---

## 4. Optimized Stack Detection

### Covers

* Correct handling of already-optimized software stacks
* Preventing fake savings recommendations
* Returning `keep` recommendations correctly

### Run

```bash
npm run test
```

---

## 5. Monthly Savings Calculation Validation

### Covers

* Deterministic monthly savings calculations
* Financial accuracy validation
* Floating-point consistency checks

### Run

```bash
npm run test
```

---

## 6. Annual Savings Calculation Validation

### Covers

* Annualized savings calculations
* Correct multiplication from monthly totals
* Financial consistency validation

### Run

```bash
npm run test
```

---

## 7. Optimization Score Validation

### Covers

* Optimization score generation
* Score range validation
* Recommendation weighting consistency

### Run

```bash
npm run test
```

---

## 8. Zero Savings Edge Case Handling

### Covers

* Preventing negative savings outputs
* Correct handling of optimized accounts
* Stable recommendation behavior

### Run

```bash
npm run test
```

---

## 9. Missing Pricing Data Handling

### Covers

* Graceful failure handling for incomplete pricing data
* Safe fallback behavior
* Validation error handling

### Run

```bash
npm run test
```

---

## 10. Invalid Audit Payload Handling

### Covers

* Malformed audit payload rejection
* Invalid seat count handling
* Defensive validation logic

### Run

```bash
npm run test
```

---

# Current Passing Coverage

## Passing Automated Tests

* 10 passing audit engine tests

## Primary Coverage Areas

* deterministic recommendation logic
* financial calculations
* optimization scoring
* duplicate tooling detection
* downgrade recommendations
* validation handling
* graceful failure behavior

---

# Frontend Manual QA

The following frontend flows were manually verified:

* audit form persistence
* localStorage hydration safety
* responsive layouts
* dynamic pricing rendering
* report generation flow
* public report routing
* loading states
* error states

---

# Backend Manual QA

The following backend flows were manually verified:

* Flask API connectivity
* Gemini summary generation
* Firebase persistence
* transactional email delivery
* fallback summary handling
* invalid request handling

---

# GitHub Actions CI

## Workflow File

```text
.github/workflows/ci.yml
```

---

# CI Workflow Behavior

GitHub Actions automatically runs on:

* push to `main`
* pull requests targeting `main`

The workflow executes:

1. dependency installation
2. lint checks
3. TypeScript validation
4. automated audit engine tests

---

# Expected CI Result

The latest commit must show:

* ✅ lint passing
* ✅ tests passing
* ✅ GitHub Actions workflow green

---

# Reliability Philosophy

StackSpend intentionally avoids AI-generated financial recommendations.

The audit engine uses:

* deterministic recommendation logic
* normalized pricing data
* rule-based calculations

AI is restricted to:

* narrative summaries only

This architecture improves:

* explainability
* reliability
* financial trustworthiness
