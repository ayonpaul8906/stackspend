import nodemailer from "nodemailer";
import { AuditResult } from "../audit-engine";

interface SendAuditParams {
  email: string;
  auditId: string;
  result: AuditResult;
}

// Create a nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function sendAuditEmail({ email, auditId, result }: SendAuditParams) {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.warn("EMAIL_USER or EMAIL_PASS not found. Skipping actual email delivery.");
    return { success: true, mocked: true };
  }

  // Fallback if URL is not configured
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  const publicUrl = `${appUrl}/results/${auditId}`;
  
  const highSavings = result.totalAnnualSavings > 6000;
  
  const htmlContent = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
      <h1 style="color: #0F172A; font-size: 24px; font-weight: 700; margin-bottom: 24px;">Your StackSpend Audit Report</h1>
      
      <p style="font-size: 16px;">We've successfully generated your custom AI stack audit.</p>
      
      <div style="background-color: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 8px; padding: 20px; margin: 24px 0;">
        <h2 style="font-size: 18px; margin-top: 0; color: #0F172A;">Audit Summary</h2>
        <ul style="list-style: none; padding: 0; margin: 0;">
          <li style="margin-bottom: 8px;"><strong>Optimization Score:</strong> ${result.optimizationScore}/100</li>
          <li style="margin-bottom: 8px;"><strong>Current Monthly Spend:</strong> $${result.totalCurrentMonthlySpend.toLocaleString()}</li>
          <li style="margin-bottom: 8px;"><strong>Total Monthly Savings:</strong> <span style="color: #10B981;">$${result.totalMonthlySavings.toLocaleString()}</span></li>
          <li style="margin-bottom: 0;"><strong>Total Annual Savings:</strong> <span style="color: #10B981;">$${result.totalAnnualSavings.toLocaleString()}</span></li>
        </ul>
      </div>

      <p style="font-size: 16px; font-style: italic; color: #475569; border-left: 4px solid #E2E8F0; padding-left: 16px; margin: 24px 0;">
        "${result.aiSummary || 'Your AI stack appears highly optimized based on your current team constraints.'}"
      </p>

      <div style="text-align: center; margin: 32px 0;">
        <a href="${publicUrl}" style="background-color: #0F172A; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 6px; font-weight: 600; display: inline-block;">View Full Interactive Report</a>
      </div>

      ${highSavings ? `
        <p style="font-size: 16px; color: #333; margin-top: 32px; padding: 16px; background-color: #FFFBEB; border: 1px solid #FDE68A; border-radius: 6px;">
          <strong>Next Steps:</strong> Your stack shows significant optimization potential. Credex may reach out to help you execute these changes seamlessly and securely.
        </p>
      ` : ""}
      
      <p style="font-size: 14px; color: #64748B; margin-top: 48px; text-align: center; border-top: 1px solid #E2E8F0; padding-top: 24px;">
        Sent by StackSpend — Stop Overspending on AI Tools.
      </p>
    </div>
  `;

  try {
    const info = await transporter.sendMail({
      from: `"StackSpend Audit" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: `Your StackSpend Audit: $${result.totalAnnualSavings.toLocaleString()} in identified savings`,
      html: htmlContent,
    });

    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("Failed to send email:", error);
    throw error;
  }
}
