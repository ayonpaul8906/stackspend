import { NextResponse } from "next/server";
import { saveLead, getAuditFromFirestore } from "@/lib/firebase/firestore";
import { sendAuditEmail } from "@/lib/email/sendAuditEmail";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { auditId, email, name, role, honey } = body;

    // Lightweight honeypot abuse protection
    if (honey) {
      // Act like it succeeded to fool automated bots
      return NextResponse.json({ success: true, message: "Lead captured successfully" });
    }

    if (!email || !auditId) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Basic server-side email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: "Invalid email format" },
        { status: 400 }
      );
    }

    // 1. Save lead securely to Firestore
    await saveLead(auditId, email, name, role);

    // 2. Fetch the full audit data to populate the email template
    const auditResult = await getAuditFromFirestore(auditId);
    if (!auditResult) {
      return NextResponse.json(
        { success: false, error: "Associated audit not found" },
        { status: 404 }
      );
    }

    // 3. Fire off the transactional email via Resend
    await sendAuditEmail({
      email,
      auditId,
      result: auditResult,
    });

    return NextResponse.json({ success: true, message: "Audit delivered successfully" });
  } catch (error) {
    console.error("Email API Route Error:", error);
    const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred while sending the email.";
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}
