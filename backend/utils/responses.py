"""
utils/responses.py
------------------
Standardised JSON response helpers.
All API responses pass through these helpers so the shape is always consistent
and stack traces are never exposed to the frontend.
"""

from flask import jsonify
from typing import Any


def success(data: Any = None, message: str = "ok", status: int = 200):
    """Return a successful API response."""
    payload = {"success": True, "message": message}
    if data is not None:
        payload["data"] = data
    return jsonify(payload), status


def error(message: str, status: int = 400, code: str | None = None):
    """Return a clean, frontend-safe error response.

    Stack traces and internal details must NEVER be included here.
    """
    payload: dict[str, Any] = {"success": False, "error": message}
    if code:
        payload["code"] = code
    return jsonify(payload), status


def not_found(resource: str = "Resource"):
    return error(f"{resource} not found.", status=404, code="NOT_FOUND")


def server_error(message: str = "An unexpected error occurred. Please try again."):
    return error(message, status=500, code="INTERNAL_ERROR")


def rate_limited():
    return error(
        "Too many requests. Please wait a moment before trying again.",
        status=429,
        code="RATE_LIMITED",
    )
