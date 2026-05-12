"""
routes/summary.py
-----------------
POST /api/generate-summary

Receives deterministic audit outputs from the Next.js frontend,
calls the Gemini service to generate a narrative summary,
and optionally persists the summary back to Firestore.

ARCHITECTURE RULE:
  No financial logic lives here.
  Savings, recommendations, and pricing are calculated on the frontend.
  This endpoint only generates a text summary of those pre-calculated values.
"""

import logging

from flask import Blueprint, request

from services.gemini_service import generate_audit_summary
from services.firebase_service import save_audit_metadata
from utils.validators import validate_summary_request, ValidationError
from utils.responses import success, error, server_error

logger = logging.getLogger(__name__)
summary_bp = Blueprint("summary", __name__)


@summary_bp.post("/api/generate-summary")
def generate_summary():
    """
    POST /api/generate-summary

    Body (JSON):
    {
        "tools": [...],
        "totalCurrentMonthlySpend": 120.00,
        "totalAnnualSavings": 480.00,
        "teamSize": 3,
        "useCase": "coding",
        "recommendations": [...],
        "auditId": "optional-firestore-doc-id"
    }
    """
    body = request.get_json(silent=True)
    if not body:
        return error("Request body must be valid JSON.", status=400, code="INVALID_JSON")

    # ── Validate ──────────────────────────────────────────────────────────────
    try:
        validated = validate_summary_request(body)
    except ValidationError as exc:
        return error(exc.message, status=400, code="VALIDATION_ERROR")

    # ── Generate summary ──────────────────────────────────────────────────────
    try:
        result = generate_audit_summary(validated)
    except Exception:
        logger.exception("Unexpected error during summary generation.")
        return server_error()

    summary_text = result["summary"]
    ai_powered = result["ai_powered"]

    # ── Optionally persist the AI summary back to Firestore ───────────────────
    audit_id: str | None = body.get("auditId")
    if audit_id and isinstance(audit_id, str) and audit_id.strip():
        try:
            save_audit_metadata(
                audit_id.strip(),
                {"aiSummary": summary_text, "aiSummaryPowered": ai_powered},
            )
        except Exception:
            # Non-fatal — we still return the summary even if Firestore write fails
            logger.warning("Failed to persist AI summary to Firestore for audit_id=%s.", audit_id)

    return success(
        data={"summary": summary_text, "aiPowered": ai_powered},
        message="Summary generated successfully.",
    )
