"""
routes/email.py
---------------
POST /api/send-email

Validates the request, saves the lead to Firestore,
fetches the audit report, and delivers the transactional email.
All secrets remain server-side — nothing sensitive is exposed to the frontend.
"""

import logging

from flask import Blueprint, request

from services.firebase_service import save_lead, get_audit
from services.mail_service import send_audit_email
from utils.validators import validate_email_request, ValidationError
from utils.responses import success, error, not_found, server_error

logger = logging.getLogger(__name__)
email_bp = Blueprint("email", __name__)


@email_bp.post("/api/send-email")
def send_email():
    """
    POST /api/send-email

    Body (JSON):
    {
        "email":   "user@example.com",
        "auditId": "abc123",
        "name":    "Jane Doe",     // optional
        "role":    "CTO",          // optional
        "honey":   ""              // honeypot field — must be empty
    }
    """
    body = request.get_json(silent=True)
    if not body:
        return error("Request body must be valid JSON.", status=400, code="INVALID_JSON")

    # ── Honeypot bot protection ───────────────────────────────────────────────
    # Silently succeed if the honeypot field is filled (bots fill all fields)
    if body.get("honey"):
        logger.info("Honeypot triggered — likely bot submission.")
        return success(message="Email delivered successfully.")

    # ── Validate ──────────────────────────────────────────────────────────────
    try:
        validated = validate_email_request(body)
    except ValidationError as exc:
        return error(exc.message, status=400, code="VALIDATION_ERROR")

    email_address = validated["email"]
    audit_id = validated["auditId"]
    name = validated["name"]
    role = validated["role"]

    # ── Save lead to Firestore ────────────────────────────────────────────────
    try:
        lead_id = save_lead(audit_id, email_address, name, role)
        if lead_id:
            logger.info("Lead saved: %s (audit_id=%s).", lead_id, audit_id)
    except Exception:
        # Non-fatal — we continue even if lead capture fails
        logger.warning("Lead capture failed for audit_id=%s.", audit_id)

    # ── Fetch audit from Firestore ────────────────────────────────────────────
    audit_data = get_audit(audit_id)
    if not audit_data:
        return not_found("Audit report")

    # ── Send email ────────────────────────────────────────────────────────────
    try:
        result = send_audit_email(
            email=email_address,
            audit_id=audit_id,
            audit_data=audit_data,
        )
        mocked = result.get("mocked", False)
        if mocked:
            logger.warning("Email delivery skipped (credentials not configured).")

        return success(
            data={"mocked": mocked},
            message="Audit report delivered successfully.",
        )
    except RuntimeError as exc:
        # Known, user-safe errors raised by mail_service
        return error(str(exc), status=502, code="EMAIL_DELIVERY_FAILED")
    except Exception:
        logger.exception("Unexpected error during email delivery for audit_id=%s.", audit_id)
        return server_error("Email delivery failed. Please try again.")
