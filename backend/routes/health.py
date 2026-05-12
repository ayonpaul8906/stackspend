"""
routes/health.py
----------------
Health-check endpoint.
Used by load balancers, uptime monitors, and CI smoke tests.
"""

from flask import Blueprint
from utils.responses import success

health_bp = Blueprint("health", __name__)


@health_bp.get("/health")
def health_check():
    """GET /health — lightweight liveness probe."""
    return success(data={"status": "ok"}, message="StackSpend backend is running.")
