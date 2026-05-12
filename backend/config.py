"""
config.py
---------
Centralised configuration for the StackSpend Flask backend.
All secrets are loaded from environment variables via python-dotenv.
No secrets are ever hardcoded here.
"""

import os
from dotenv import load_dotenv

load_dotenv()


class Config:
    # ── General ──────────────────────────────────────────────────────────────
    DEBUG: bool = os.getenv("FLASK_DEBUG", "false").lower() == "true"
    TESTING: bool = False

    # ── Security ─────────────────────────────────────────────────────────────
    SECRET_KEY: str = os.getenv("FLASK_SECRET_KEY", os.urandom(32).hex())

    # ── CORS ─────────────────────────────────────────────────────────────────
    # Comma-separated list of allowed origins
    CORS_ORIGINS: list[str] = [
        origin.strip()
        for origin in os.getenv(
            "CORS_ORIGINS",
            "http://localhost:3000,http://127.0.0.1:3000"
        ).split(",")
        if origin.strip()
    ]

    # ── Rate Limiting ─────────────────────────────────────────────────────────
    RATELIMIT_DEFAULT: str = "200 per day;50 per hour"
    RATELIMIT_STORAGE_URL: str = os.getenv("RATELIMIT_STORAGE_URL", "memory://")
    RATELIMIT_HEADERS_ENABLED: bool = True

    # ── Gemini ────────────────────────────────────────────────────────────────
    GEMINI_API_KEY: str = os.getenv("GEMINI_API_KEY", "")
    GEMINI_MODEL: str = os.getenv("GEMINI_MODEL", "gemini-1.5-flash")

    # ── Firebase Admin ────────────────────────────────────────────────────────
    # Either a file path to the service-account JSON, or the raw JSON string
    FIREBASE_CREDENTIALS_PATH: str = os.getenv("FIREBASE_CREDENTIALS_PATH", "")
    FIREBASE_CREDENTIALS_JSON: str = os.getenv("FIREBASE_CREDENTIALS_JSON", "")
    FIREBASE_PROJECT_ID: str = os.getenv("FIREBASE_PROJECT_ID", "stackspend-2a280")

    # ── Email (Gmail SMTP via App Password) ───────────────────────────────────
    MAIL_SERVER: str = os.getenv("MAIL_SERVER", "smtp.gmail.com")
    MAIL_PORT: int = int(os.getenv("MAIL_PORT", "587"))
    MAIL_USE_TLS: bool = os.getenv("MAIL_USE_TLS", "true").lower() == "true"
    MAIL_USERNAME: str = os.getenv("MAIL_USERNAME", "")
    MAIL_PASSWORD: str = os.getenv("MAIL_PASSWORD", "")
    MAIL_DEFAULT_SENDER_NAME: str = os.getenv("MAIL_DEFAULT_SENDER_NAME", "StackSpend Audit")

    # ── App URL (for building public report links in emails) ──────────────────
    APP_URL: str = os.getenv("APP_URL", "http://localhost:3000")


class DevelopmentConfig(Config):
    DEBUG = True


class ProductionConfig(Config):
    DEBUG = False


def get_config() -> Config:
    env = os.getenv("FLASK_ENV", "development").lower()
    return ProductionConfig() if env == "production" else DevelopmentConfig()
