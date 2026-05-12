"""
app.py
------
StackSpend Flask backend — application entry point.

Initialises Flask, CORS, rate limiting, error handlers, and registers
all route blueprints. Follows production-grade patterns throughout.
"""

import logging
import os

from flask import Flask, jsonify
from flask_cors import CORS
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address

from config import get_config
from routes.health import health_bp
from routes.summary import summary_bp
from routes.email import email_bp
from utils.responses import error as api_error, rate_limited

# ── Logging ───────────────────────────────────────────────────────────────────
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s  %(levelname)-8s  %(name)s — %(message)s",
    datefmt="%Y-%m-%d %H:%M:%S",
)
logger = logging.getLogger(__name__)


def create_app() -> Flask:
    """Application factory — creates and configures the Flask app."""
    cfg = get_config()
    app = Flask(__name__)
    app.config.from_object(cfg)

    # ── CORS ──────────────────────────────────────────────────────────────────
    CORS(
        app,
        origins=cfg.CORS_ORIGINS,
        supports_credentials=False,
        methods=["GET", "POST", "OPTIONS"],
        allow_headers=["Content-Type", "Authorization"],
    )

    # ── Rate Limiting ─────────────────────────────────────────────────────────
    limiter = Limiter(
        key_func=get_remote_address,
        app=app,
        default_limits=[cfg.RATELIMIT_DEFAULT],
        storage_uri=cfg.RATELIMIT_STORAGE_URL,
        headers_enabled=cfg.RATELIMIT_HEADERS_ENABLED,
    )

    # Apply tighter limits to expensive / sensitive endpoints
    limiter.limit("10 per minute;50 per hour")(summary_bp)
    limiter.limit("5 per minute;20 per hour")(email_bp)

    # ── Blueprints ────────────────────────────────────────────────────────────
    app.register_blueprint(health_bp)
    app.register_blueprint(summary_bp)
    app.register_blueprint(email_bp)

    # ── Centralised Error Handlers ────────────────────────────────────────────
    @app.errorhandler(400)
    def bad_request(e):
        return api_error("Bad request.", status=400, code="BAD_REQUEST")

    @app.errorhandler(404)
    def not_found(e):
        return api_error("Endpoint not found.", status=404, code="NOT_FOUND")

    @app.errorhandler(405)
    def method_not_allowed(e):
        return api_error("Method not allowed.", status=405, code="METHOD_NOT_ALLOWED")

    @app.errorhandler(429)
    def too_many_requests(e):
        return rate_limited()

    @app.errorhandler(500)
    def internal_error(e):
        logger.exception("Unhandled server error: %s", e)
        return api_error(
            "An unexpected server error occurred. Please try again.",
            status=500,
            code="INTERNAL_ERROR",
        )

    logger.info(
        "StackSpend backend started | env=%s | origins=%s",
        os.getenv("FLASK_ENV", "development"),
        cfg.CORS_ORIGINS,
    )

    return app


app = create_app()

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=int(os.getenv("PORT", "5000")), debug=get_config().DEBUG)
