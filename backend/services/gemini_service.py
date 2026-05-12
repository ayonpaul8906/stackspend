"""
services/gemini_service.py
--------------------------
Gemini API integration for AI summary generation.

ARCHITECTURE RULE (HARD):
  This service ONLY generates narrative text summaries.
  All financial logic, savings calculations, and recommendations
  come from the deterministic audit engine on the frontend (TypeScript).
  This service receives those pre-calculated values and narrates them.
"""

import logging
from typing import Any

import google.generativeai as genai

from config import get_config
from utils.prompts import SYSTEM_PROMPT, build_summary_prompt, build_fallback_summary

logger = logging.getLogger(__name__)
_config = get_config()


def _get_client() -> genai.GenerativeModel | None:
    """Initialise and return the Gemini client, or None if not configured."""
    if not _config.GEMINI_API_KEY:
        logger.warning("GEMINI_API_KEY is not set. AI summaries will use fallback.")
        return None

    try:
        genai.configure(api_key=_config.GEMINI_API_KEY)
        model = genai.GenerativeModel(
            model_name=_config.GEMINI_MODEL,
            system_instruction=SYSTEM_PROMPT,
            generation_config=genai.GenerationConfig(
                temperature=0.3,        # Low temperature for factual, consistent output
                max_output_tokens=300,  # Keep summaries concise
                top_p=0.85,
            ),
        )
        return model
    except Exception:
        logger.exception("Failed to initialise Gemini client.")
        return None


def generate_audit_summary(validated_data: dict[str, Any]) -> dict[str, Any]:
    """
    Generate a concise AI narrative summary of a deterministic audit result.

    Parameters
    ----------
    validated_data : dict
        Pre-validated request data from the summary route.
        All financial figures originate from the deterministic audit engine.

    Returns
    -------
    dict with keys:
        summary   : str  — the generated or fallback summary text
        ai_powered: bool — True if Gemini generated the text, False if fallback
    """
    tools: list[dict] = validated_data["tools"]
    spend: float = validated_data["totalCurrentMonthlySpend"]
    annual_savings: float = validated_data["totalAnnualSavings"]
    team_size: int = validated_data["teamSize"]
    use_case: str = validated_data["useCase"]
    recommendations: list[dict] = validated_data["recommendations"]

    # ── Try Gemini ────────────────────────────────────────────────────────────
    model = _get_client()
    if model:
        try:
            prompt = build_summary_prompt(
                tools=tools,
                total_monthly_spend=spend,
                total_annual_savings=annual_savings,
                team_size=team_size,
                use_case=use_case,
                recommendations=recommendations,
            )
            response = model.generate_content(prompt)
            summary_text = response.text.strip()

            # Safety guard: if Gemini returned an empty response, fall back
            if summary_text:
                logger.info("Gemini summary generated successfully.")
                return {"summary": summary_text, "ai_powered": True}

        except Exception:
            logger.exception("Gemini API call failed. Falling back to deterministic summary.")

    # ── Fallback: deterministic rule-based summary ────────────────────────────
    logger.info("Using deterministic fallback summary.")
    fallback = build_fallback_summary(
        total_annual_savings=annual_savings,
        total_monthly_spend=spend,
        tool_count=len(tools),
        team_size=team_size,
    )
    return {"summary": fallback, "ai_powered": False}
