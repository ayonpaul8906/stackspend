"""
services/firebase_service.py
-----------------------------
Firebase Admin SDK integration for server-side Firestore operations.
Handles lead capture, audit metadata persistence, and report fetching.
"""

import json
import logging
import os
from typing import Any

import firebase_admin
from firebase_admin import credentials, firestore

from config import get_config

logger = logging.getLogger(__name__)
_config = get_config()

# ── Singleton initialisation ──────────────────────────────────────────────────
_db: Any = None  # google.cloud.firestore.Client | None


def _init_firebase() -> Any:
    """
    Initialise Firebase Admin SDK once per process.
    Supports two credential modes:
      1. FIREBASE_CREDENTIALS_PATH  — path to a service-account JSON file
      2. FIREBASE_CREDENTIALS_JSON  — the raw JSON string (for Docker/CI secrets)

    Falls back gracefully if credentials are not configured.
    """
    global _db

    if _db is not None:
        return _db

    if firebase_admin._apps:  # already initialised by another import
        _db = firestore.client()
        return _db

    cred_path = _config.FIREBASE_CREDENTIALS_PATH
    cred_json = _config.FIREBASE_CREDENTIALS_JSON

    try:
        if cred_path and os.path.isfile(cred_path):
            cred = credentials.Certificate(cred_path)
        elif cred_json:
            cred_dict = json.loads(cred_json)
            cred = credentials.Certificate(cred_dict)
        else:
            logger.warning(
                "Firebase credentials not configured. "
                "Set FIREBASE_CREDENTIALS_PATH or FIREBASE_CREDENTIALS_JSON."
            )
            return None

        firebase_admin.initialize_app(cred, {"projectId": _config.FIREBASE_PROJECT_ID})
        _db = firestore.client()
        logger.info("Firebase Admin SDK initialised successfully.")
        return _db

    except Exception:
        logger.exception("Firebase Admin SDK initialisation failed.")
        return None


# ── Public helpers ────────────────────────────────────────────────────────────

def save_lead(audit_id: str, email: str, name: str = "", role: str = "") -> str | None:
    """
    Persist a lead capture record to the 'leads' Firestore collection.

    Returns the generated document ID, or None on failure.
    """
    db = _init_firebase()
    if not db:
        logger.warning("Firebase unavailable — lead not saved (audit_id=%s).", audit_id)
        return None

    try:
        doc_ref = db.collection("leads").document()
        doc_ref.set(
            {
                "auditId": audit_id,
                "email": email,
                "name": name,
                "role": role,
                "createdAt": firestore.SERVER_TIMESTAMP,
            }
        )
        logger.info("Lead saved: %s for audit %s", doc_ref.id, audit_id)
        return doc_ref.id
    except Exception:
        logger.exception("Failed to save lead for audit_id=%s.", audit_id)
        return None


def save_audit_metadata(audit_id: str, metadata: dict[str, Any]) -> bool:
    """
    Persist or update server-generated audit metadata (e.g. AI summary).
    Merges into the existing 'audits' document rather than overwriting it.
    """
    db = _init_firebase()
    if not db:
        logger.warning("Firebase unavailable — metadata not saved (audit_id=%s).", audit_id)
        return False

    try:
        doc_ref = db.collection("audits").document(audit_id)
        doc_ref.set(metadata, merge=True)
        logger.info("Audit metadata saved for audit_id=%s.", audit_id)
        return True
    except Exception:
        logger.exception("Failed to save audit metadata for audit_id=%s.", audit_id)
        return False


def get_audit(audit_id: str) -> dict[str, Any] | None:
    """
    Fetch a stored audit document from Firestore by its ID.
    Returns a plain dict, or None if not found or on error.
    """
    db = _init_firebase()
    if not db:
        logger.warning("Firebase unavailable — cannot fetch audit_id=%s.", audit_id)
        return None

    try:
        doc_ref = db.collection("audits").document(audit_id)
        snapshot = doc_ref.get()
        if not snapshot.exists:
            logger.info("Audit not found in Firestore: audit_id=%s.", audit_id)
            return None
        data = snapshot.to_dict()
        data["id"] = audit_id
        return data
    except Exception:
        logger.exception("Failed to fetch audit_id=%s from Firestore.", audit_id)
        return None
