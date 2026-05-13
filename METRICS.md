# METRICS

## North Star Metric

### Qualified Lead Intent Rate

The primary North Star metric for StackSpend is:

> Percentage of completed audits that result in a high-intent post-audit action.

In the current product, those actions are:

* submitting an email in the lead capture form
* copying or sharing the public report link
* clicking the high-savings "Talk to Credex" CTA

This metric fits the app as it exists today: StackSpend is a B2B trust-building and lead-generation product, not a high-frequency consumer app.

The product succeeds when:

1. users trust the audit enough to complete it
2. the deterministic engine surfaces meaningful savings opportunities
3. that trust converts into a lead, share, or sales conversation

Daily Active Users (DAU) would be a poor metric because AI spend audits are naturally infrequent workflows. Most companies would realistically use the tool quarterly, during budgeting cycles, or while reviewing software spend.

---

# Actual Product Flow

The current implementation works like this:

1. a user fills out the audit form with organization details and current AI tools
2. the frontend runs deterministic recommendation logic locally
3. the app requests an AI-written summary using the precomputed audit result
4. the full audit is saved to Firestore
5. the user is redirected to a public shareable report page
6. the report page exposes copy-link/share actions and a lead capture form

That means the metrics should focus on audit completion, public report engagement, and lead capture rather than any checkout-style funnel.

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
* public link copying and sharing behavior
* distribution quality

The shareable public report is the product’s built-in acquisition loop. High share rates suggest the audit output feels valuable enough to distribute publicly.

---

## 3. High-Savings Audit Percentage

Measures:

* effectiveness of targeting
* quality of optimization logic
* business opportunity density

If very few audits generate meaningful savings opportunities, the product may not create enough urgency to drive lead capture or sales intent.

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

* fewer than 5% of completed audits lead to lead intent
  OR
* fewer than 15% of audits identify meaningful savings opportunities

after acquiring a meaningful sample of users.

That would suggest either:

* the optimization logic is not valuable enough
* the target audience is wrong
* the audit experience is not building sufficient trust.
