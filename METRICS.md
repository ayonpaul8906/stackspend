# METRICS

## North Star Metric

### Qualified Consultation Intent Rate

The primary North Star metric for StackSpend is:

> Percentage of completed audits that result in either:
>
> * consultation booking intent
> * qualified lead capture
> * high-intent follow-up actions

Examples:

* clicking the “Talk to Credex” CTA
* submitting contact information after viewing savings
* requesting a deeper optimization review

This metric was chosen because StackSpend is fundamentally a B2B lead-generation and trust-building product, not a high-frequency consumer application.

The product succeeds when:

1. users trust the audit enough to complete it
2. meaningful optimization opportunities are identified
3. that trust converts into a financial conversation

Daily Active Users (DAU) would be a poor metric because AI spend audits are naturally infrequent workflows. Most companies would realistically use the tool quarterly, during budgeting cycles, or while reviewing software spend.

---

# Input Metrics

## 1. Audit Completion Rate

Measures:

* onboarding clarity
* form usability
* perceived trust
* friction in the audit flow

A low completion rate would likely indicate:

* excessive form complexity
* poor UX
* unclear value proposition

This is the first funnel health indicator.

---

## 2. Public Report Share Rate

Measures:

* perceived report value
* screenshot-worthiness
* viral potential
* social distribution quality

The shareable public report is intentionally designed as the product’s built-in acquisition loop. High share rates suggest the audit output feels valuable enough to distribute publicly.

---

## 3. High-Savings Audit Percentage

Measures:

* effectiveness of targeting
* quality of optimization logic
* business opportunity density

If very few audits generate meaningful savings opportunities, the product may not create enough urgency to drive consultation intent.

This metric directly impacts monetization potential.

---

# Initial Instrumentation Priorities

The first analytics events I would instrument are:

* audit_started
* audit_completed
* report_shared
* email_captured
* consultation_cta_clicked
* high_savings_detected

These events provide visibility into:

* funnel dropoff
* report virality
* conversion quality
* lead generation efficiency

---

# Pivot Threshold

I would seriously reconsider positioning or targeting if:

* fewer than 5% of completed audits lead to consultation intent
  OR
* fewer than 15% of audits identify meaningful savings opportunities

after acquiring a meaningful sample of users.

That would suggest either:

* the optimization logic is not valuable enough
* the target audience is wrong
* the audit experience is not building sufficient trust.
