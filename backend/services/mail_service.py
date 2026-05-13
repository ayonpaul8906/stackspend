"""
services/mail_service.py
------------------------
Transactional email delivery via Gmail SMTP (nodemailer-compatible pattern).
Secrets are never exposed to the frontend — all mail logic runs server-side.
"""

import logging
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from typing import Any

from config import get_config

logger = logging.getLogger(__name__)
_config = get_config()


def _build_html_email(
    email: str,
    audit_id: str,
    audit_data: dict[str, Any],
) -> str:
    """Build the HTML email body for an audit report delivery."""
    app_url = _config.APP_URL
    public_url = f"{app_url}/results/{audit_id}"

    total_monthly_savings = audit_data.get("totalMonthlySavings", 0)
    total_annual_savings = audit_data.get("totalAnnualSavings", 0)
    total_monthly_spend = audit_data.get("totalCurrentMonthlySpend", 0)
    optimization_score = audit_data.get("optimizationScore", 0)
    ai_summary = audit_data.get("aiSummary", "Your AI stack has been successfully audited.")

    high_savings = total_annual_savings > 6000

    upsell_block = (
        """
        <div style="margin-top:24px;padding:16px;background-color:#FFFBEB;
                    border:1px solid #FDE68A;border-radius:6px;">
          <strong>Next Steps:</strong> Your stack shows significant optimisation potential.
          Credex may reach out to help you execute these changes seamlessly and securely.
        </div>
        """
        if high_savings
        else ""
    )

    return f"""
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>Your StackSpend Audit Report</title></head>
<body style="margin:0;padding:0;background-color:#F8FAFC;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#F8FAFC;padding:40px 0;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">

        <!-- Header -->
        <tr><td style="background:linear-gradient(135deg,#0F172A 0%,#1E293B 100%);padding:32px 40px;">
          <h1 style="margin:0;font-size:22px;font-weight:700;color:#ffffff;letter-spacing:-0.5px;">
            StackSpend Audit Report
          </h1>
          <p style="margin:8px 0 0;font-size:14px;color:#94A3B8;">Stop Overspending on AI Tools</p>
        </td></tr>

        <!-- Body -->
        <tr><td style="padding:40px;">

          <p style="font-size:16px;color:#334155;line-height:1.7;margin:0 0 24px;">
            Your custom AI stack audit is ready. Here's what we found:
          </p>

          <!-- AI Summary -->
          <div style="background:#F1F5F9;border-left:4px solid #6366F1;border-radius:0 8px 8px 0;
                      padding:20px 24px;margin:0 0 32px;">
            <p style="margin:0;font-size:15px;color:#475569;font-style:italic;line-height:1.7;">
              &ldquo;{ai_summary}&rdquo;
            </p>
          </div>

          <!-- Metrics -->
          <table width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 32px;">
            <tr>
              <td width="33%" style="padding:16px;background:#F8FAFC;border-radius:8px;text-align:center;">
                <div style="font-size:22px;font-weight:700;color:#0F172A;">
                  ${total_monthly_spend:,.0f}
                </div>
                <div style="font-size:12px;color:#64748B;margin-top:4px;">Monthly Spend</div>
              </td>
              <td width="4%" style="padding:0;"></td>
              <td width="33%" style="padding:16px;background:#ECFDF5;border-radius:8px;text-align:center;">
                <div style="font-size:22px;font-weight:700;color:#10B981;">
                  ${total_monthly_savings:,.0f}
                </div>
                <div style="font-size:12px;color:#64748B;margin-top:4px;">Monthly Savings</div>
              </td>
              <td width="4%" style="padding:0;"></td>
              <td width="26%" style="padding:16px;background:#EFF6FF;border-radius:8px;text-align:center;">
                <div style="font-size:22px;font-weight:700;color:#3B82F6;">{optimization_score}</div>
                <div style="font-size:12px;color:#64748B;margin-top:4px;">Score / 100</div>
              </td>
            </tr>
          </table>

          <div style="background:#ECFDF5;border:1px solid #A7F3D0;border-radius:8px;padding:20px 24px;margin:0 0 32px;text-align:center;">
            <div style="font-size:13px;color:#059669;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:8px;">
              Total Annual Savings Identified
            </div>
            <div style="font-size:36px;font-weight:800;color:#047857;">${total_annual_savings:,.0f}</div>
          </div>

          <!-- CTA -->
          <div style="text-align:center;margin:32px 0;">
            <a href="{public_url}"
               style="display:inline-block;background:#0F172A;color:#ffffff;text-decoration:none;
                      padding:14px 32px;border-radius:8px;font-weight:600;font-size:15px;
                      letter-spacing:-0.3px;">
              View Full Interactive Report →
            </a>
          </div>

          {upsell_block}

        </td></tr>

        <!-- Footer -->
        <tr><td style="background:#F1F5F9;padding:24px 40px;text-align:center;">
          <p style="margin:0;font-size:13px;color:#94A3B8;">
            Sent by <strong>StackSpend</strong> &mdash; AI spend intelligence for modern teams.
          </p>
          <p style="margin:8px 0 0;font-size:12px;color:#CBD5E1;">
            Audit ID: {audit_id}
          </p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>
"""


def send_audit_email(
    email: str,
    audit_id: str,
    audit_data: dict[str, Any],
) -> dict[str, Any]:
    """
    Send a transactional audit report email via Gmail SMTP.

    Parameters
    ----------
    email      : Recipient email address (validated upstream).
    audit_id   : The audit document ID (used to build the public URL).
    audit_data : Full audit result dict from Firestore.

    Returns
    -------
    dict with 'success' bool and optional 'mocked' bool or error string.
    """
    if not _config.MAIL_USERNAME or not _config.MAIL_PASSWORD:
        logger.warning("Email credentials not configured. Skipping delivery for %s.", email)
        return {"success": True, "mocked": True, "reason": "credentials_not_configured"}

    total_annual_savings = audit_data.get("totalAnnualSavings", 0)
    subject = (
        f"Your StackSpend Audit: ${total_annual_savings:,.0f} in identified savings"
        if total_annual_savings > 0
        else "Your StackSpend Audit Report is Ready"
    )

    html_body = _build_html_email(email, audit_id, audit_data)

    msg = MIMEMultipart("alternative")
    msg["Subject"] = subject
    msg["From"] = f"{_config.MAIL_DEFAULT_SENDER_NAME} <{_config.MAIL_USERNAME}>"
    msg["To"] = email
    msg.attach(MIMEText(html_body, "html"))

    try:
        with smtplib.SMTP(_config.MAIL_SERVER, _config.MAIL_PORT,timeout=30) as server:
            server.ehlo()
            if _config.MAIL_USE_TLS:
                server.starttls()
                server.ehlo()
            server.login(_config.MAIL_USERNAME, _config.MAIL_PASSWORD)
            server.sendmail(_config.MAIL_USERNAME, email, msg.as_string())

        logger.info("Audit email sent successfully to %s (audit_id=%s).", email, audit_id)
        return {"success": True}

    except smtplib.SMTPAuthenticationError:
        logger.error("SMTP authentication failed. Check MAIL_USERNAME / MAIL_PASSWORD.")
        raise RuntimeError("Email authentication failed. Please contact support.")
    except smtplib.SMTPException as exc:
        logger.exception("SMTP error while sending to %s.", email)
        raise RuntimeError(f"Email delivery failed: {exc}") from exc
