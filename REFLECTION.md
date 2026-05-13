# REFLECTION

## 1. The hardest bug I hit this week

The hardest issue I faced was after integrating Firebase for storing public audit reports. The reports were saving correctly most of the time, but sometimes opening a public result URL would break the page with missing or undefined data errors. Initially, I thought Firestore writes were failing, so I spent time checking the database manually and logging responses from the backend. After tracing the full flow step by step, I realized the real problem was inconsistent handling of optional fields between the frontend types and Firebase documents. Some reports didn’t contain every field, but the UI still assumed those values always existed during rendering.

What made this bug frustrating was that it only happened in certain report combinations, so it looked random at first. I fixed it by adding stricter TypeScript checks, safer parsing logic, fallback states, and better null handling across the results page. That bug taught me how important defensive frontend validation becomes once persistence and dynamic routes are involved.

---

## 2. A decision I reversed mid-week

One thing I changed midway was the overall design direction of the product. In the beginning, I made the UI very flashy with glowing effects, gradients, and animated cards because I thought an AI product should look visually impressive. But after building more of the product, it started feeling like a generic AI website instead of something people would actually trust for financial recommendations.

I spent time looking at products like Credex, Ramp, and Linear, and realized their interfaces feel much calmer and cleaner. So I redesigned large parts of the landing page, reduced unnecessary effects, improved spacing, and focused more on typography and structure.

I also changed the email setup from Resend to Nodemailer. I originally planned to use Resend, but I was spending too much time dealing with setup issues and backend flow problems. Since I was already short on time, switching to Nodemailer felt like the more practical decision and helped me finish the email flow much faster.

---

## 3. What I would build in week 2

If I had another week, the biggest thing I’d improve is the API usage audit flow. Right now, the recommendations for subscription-based tools like ChatGPT, Claude, or Cursor feel much more reliable than API spend recommendations because API usage varies heavily between teams. A coding assistant workflow, internal chatbot, or data-processing setup can all consume tokens very differently, but the current audit flow still treats API usage too generally.

I’d build a more detailed API profiling system where users could describe their usage patterns more accurately instead of only entering monthly spend. That would make the optimization suggestions feel much more realistic and useful for technical teams. I’d also improve the reporting side by adding downloadable PDF exports and dynamic Open Graph image generation so public audit links look cleaner and more shareable on social platforms.

## 4. How I used AI tools

I used ChatGPT, GitHub Copilot, Gemini, and Antigravity during development. Most of the time, I used them to speed up repetitive work, fix smaller issues, improve wording in documentation, and refine the UI. ChatGPT helped me structure files like pricing documentation properly, while Copilot was useful for frontend and backend coding suggestions. I used Gemini mainly for generating the StackSpend logo, and Antigravity helped me refine parts of the UI and landing page design.

At the same time, I didn’t blindly trust AI outputs. I avoided using AI for the actual audit logic because I wanted the savings calculations and recommendations to stay deterministic and explainable. One issue I caught was AI-generated code handling Firestore fields incorrectly, which caused report rendering problems. I had to debug the data flow manually and add proper validation checks to fix it.

## 5. Self-rating

**Discipline — 8/10**
Managed to complete the project end-to-end despite balancing exams and university work during the week.

**Code Quality — 7/10**
The structure is fairly clean and modular, but with more time I’d improve scalability and abstraction consistency.

**Design Sense — 8/10**
The final redesign feels much more intentional and trustworthy after moving away from generic AI startup aesthetics.

**Problem Solving — 8/10**
Worked through several frontend, backend, and deployment issues by debugging methodically instead of patching randomly.

**Entrepreneurial Thinking — 7/10**
I think turning the public audit report into a built-in sharing and distribution loop was one of the strongest product decisions.