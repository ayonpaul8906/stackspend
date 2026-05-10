"use server";

import { generateAuditSummary } from "@/lib/ai";
import { AuditResult } from "@/lib/audit-engine";
import { AuditFormState } from "@/types/audit";

export async function generateSummaryAction(result: AuditResult, formState: AuditFormState) {
  try {
    const summary = await generateAuditSummary(result, formState);
    return summary;
  } catch (error) {
    console.error("Server action failed to generate summary:", error);
    throw new Error("Failed to generate summary");
  }
}
