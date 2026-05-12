"""
utils/validators.py
-------------------
Input validation helpers for incoming API requests.
All frontend input is treated as untrusted.
"""

import re
from typing import Any

EMAIL_REGEX = re.compile(r"^[^\s@]+@[^\s@]+\.[^\s@]+$")


class ValidationError(Exception):
    """Raised when request data fails validation."""

    def __init__(self, message: str, field: str | None = None):
        super().__init__(message)
        self.message = message
        self.field = field


def validate_email(email: Any) -> str:
    """Validate and return a normalised email address."""
    if not isinstance(email, str) or not email.strip():
        raise ValidationError("Email address is required.", field="email")
    email = email.strip().lower()
    if not EMAIL_REGEX.match(email):
        raise ValidationError("Invalid email address format.", field="email")
    return email


def validate_required_string(value: Any, field_name: str, max_length: int = 500) -> str:
    """Validate that a field is a non-empty string within a reasonable length."""
    if not isinstance(value, str) or not value.strip():
        raise ValidationError(f"'{field_name}' is required.", field=field_name)
    stripped = value.strip()
    if len(stripped) > max_length:
        raise ValidationError(
            f"'{field_name}' must not exceed {max_length} characters.", field=field_name
        )
    return stripped


def validate_positive_number(value: Any, field_name: str) -> float:
    """Validate that a value is a non-negative number."""
    if value is None:
        raise ValidationError(f"'{field_name}' is required.", field=field_name)
    try:
        num = float(value)
    except (TypeError, ValueError):
        raise ValidationError(f"'{field_name}' must be a number.", field=field_name)
    if num < 0:
        raise ValidationError(f"'{field_name}' must be 0 or greater.", field=field_name)
    return num


def validate_tools_list(tools: Any) -> list[dict]:
    """Validate the list of tools from the audit form state."""
    if not isinstance(tools, list) or len(tools) == 0:
        raise ValidationError("'tools' must be a non-empty list.", field="tools")

    validated: list[dict] = []
    for i, item in enumerate(tools):
        if not isinstance(item, dict):
            raise ValidationError(f"Tool at index {i} must be an object.", field="tools")
        tool_name = item.get("tool", "")
        if not tool_name or not isinstance(tool_name, str):
            raise ValidationError(f"Tool at index {i} is missing a 'tool' name.", field="tools")
        validated.append(item)

    return validated


def validate_summary_request(body: dict) -> dict:
    """
    Validate the POST /api/generate-summary request body.
    Returns a clean, validated dict ready for the service layer.
    """
    tools = validate_tools_list(body.get("tools"))

    spend = validate_positive_number(body.get("totalCurrentMonthlySpend", 0), "totalCurrentMonthlySpend")
    savings = validate_positive_number(body.get("totalAnnualSavings", 0), "totalAnnualSavings")
    team_size = validate_positive_number(body.get("teamSize", 1), "teamSize")

    use_case = body.get("useCase", "mixed")
    if use_case not in ("coding", "writing", "research", "data", "mixed"):
        use_case = "mixed"

    recommendations = body.get("recommendations", [])
    if not isinstance(recommendations, list):
        recommendations = []

    return {
        "tools": tools,
        "totalCurrentMonthlySpend": spend,
        "totalAnnualSavings": savings,
        "teamSize": int(team_size),
        "useCase": use_case,
        "recommendations": recommendations,
    }


def validate_email_request(body: dict) -> dict:
    """
    Validate the POST /api/send-email request body.
    Returns a clean, validated dict ready for the service layer.
    """
    email = validate_email(body.get("email"))
    audit_id = validate_required_string(body.get("auditId", ""), "auditId", max_length=128)

    name = body.get("name", "")
    if isinstance(name, str):
        name = name.strip()[:128]
    else:
        name = ""

    role = body.get("role", "")
    if isinstance(role, str):
        role = role.strip()[:128]
    else:
        role = ""

    return {
        "email": email,
        "auditId": audit_id,
        "name": name,
        "role": role,
    }
