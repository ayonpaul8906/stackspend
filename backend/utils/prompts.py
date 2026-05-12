"""
utils/prompts.py
----------------
Production-quality prompt engineering for the Gemini summary generation.

ARCHITECTURE RULE (HARD):
  The LLM must ONLY produce a narrative summary of deterministic outputs.
  It must NOT invent savings figures, pricing, or recommendations.
  All financial data is passed to the prompt as verified ground truth.
"""

from typing import Any


# ── Fallback summary (used when Gemini is unavailable) ───────────────────────

def build_fallback_summary(
    total_annual_savings: float,
    total_monthly_spend: float,
    tool_count: int,
    team_size: int,
) -> str:
    """
    Rule-based fallback summary used when the Gemini API is unavailable.
    Deterministic, no AI involved.
    """
    if total_annual_savings <= 0:
        return (
            f"Your AI stack of {tool_count} tool{'s' if tool_count != 1 else ''} "
            f"is running efficiently for a team of {team_size}. "
            "Current subscriptions appear well-matched to your team's needs — "
            "no significant optimisation opportunities were identified."
        )

    monthly_savings = total_annual_savings / 12
    return (
        f"Based on your team's current AI spend of ${total_monthly_spend:,.0f}/month "
        f"across {tool_count} tool{'s' if tool_count != 1 else ''}, "
        f"StackSpend identified ${monthly_savings:,.0f}/month (${total_annual_savings:,.0f}/year) "
        "in potential savings through plan right-sizing and subscription consolidation. "
        "The recommended actions below are specific to your stack and team size."
    )


# ── System prompt ─────────────────────────────────────────────────────────────

SYSTEM_PROMPT = """You are the StackSpend Audit Summariser — a financially literate assistant that writes concise, professional narrative summaries of AI software spend audits.

STRICT RULES — NEVER VIOLATE THESE:
1. You MUST NOT invent, estimate, or modify any financial figures. Every dollar amount you mention must come verbatim from the provided audit data.
2. You MUST NOT create, infer, or suggest recommendations beyond what is listed in the provided recommendations array.
3. You MUST NOT reference tools, plans, or products that are not in the provided tools list.
4. You MUST NOT use speculative language ("could", "might", "may save") about figures — the figures provided are already calculated and confirmed.
5. Keep the summary between 2 and 4 sentences. Do not use bullet points, headers, or markdown.
6. Tone: financially rational, professional, trustworthy, and concise. Write as if advising a CFO.
7. If the savings are $0, acknowledge the stack is well-optimised. Do not fabricate savings.
8. Refer to the company or team generically (e.g. "your team", "your organisation") — never invent a company name.

OUTPUT FORMAT:
Return ONLY the plain-text summary paragraph. No preamble, no sign-off, no quotes."""


def build_summary_prompt(
    tools: list[dict[str, Any]],
    total_monthly_spend: float,
    total_annual_savings: float,
    team_size: int,
    use_case: str,
    recommendations: list[dict[str, Any]],
) -> str:
    """
    Build the user-turn prompt for Gemini.
    All values are sourced from the deterministic audit engine output.
    """
    tool_lines = []
    for t in tools:
        name = t.get("tool", "Unknown")
        plan = t.get("plan", "Unknown")
        spend = t.get("monthlySpend", 0)
        seats = t.get("seats", 1)
        tool_lines.append(f"  • {name} ({plan}) — {seats} seat(s), ${spend:.2f}/month")

    tools_text = "\n".join(tool_lines) if tool_lines else "  • No tools provided"

    rec_lines = []
    for r in recommendations:
        action = r.get("action", "keep").upper()
        tool = r.get("tool", "")
        monthly = r.get("monthlySavings", 0)
        annual = r.get("annualSavings", 0)
        reasoning = r.get("reasoning", "")
        rec_lines.append(
            f"  • [{action}] {tool} — save ${monthly:.2f}/month (${annual:.2f}/year). Reason: {reasoning}"
        )

    recs_text = "\n".join(rec_lines) if rec_lines else "  • No optimisation actions required — stack is well-sized."

    monthly_savings = total_annual_savings / 12

    prompt = f"""You are summarising the following verified audit output. Do NOT add, remove, or change any figures.

AUDIT DATA (verified, deterministic):
  Team size: {team_size} person(s)
  Primary use case: {use_case}
  Total monthly AI spend: ${total_monthly_spend:,.2f}
  Identified monthly savings: ${monthly_savings:,.2f}
  Identified annual savings: ${total_annual_savings:,.2f}

TOOLS AUDITED:
{tools_text}

RECOMMENDATIONS (pre-calculated by the audit engine):
{recs_text}

Write a 2–4 sentence professional narrative summary of these audit results. Use only the figures and facts above. Do not invent anything."""

    return prompt
