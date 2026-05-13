"use server";

import { AuditResult } from "@/lib/audit-engine";
import { AuditFormState } from "@/types/audit";
import { generateSummary, BackendApiError } from "@/lib/services/backendApi";

/**
 * Server action: calls the Flask backend to generate an AI narrative summary.
 *
 * The Flask backend is the only place that holds the GEMINI_API_KEY.
 * This action passes pre-calculated deterministic audit outputs — it does NOT
 * send financial logic to be computed by the AI.
 */
export async function generateSummaryAction(
  result: AuditResult,
  formState: AuditFormState,
  auditId?: string
): Promise<string> {
  try {
    const response = await generateSummary({
      tools: formState.tools.map((t) => ({
        tool: t.tool,
        plan: t.plan,
        monthlySpend: t.monthlySpend,
        seats: t.seats,
      })),
      totalCurrentMonthlySpend: result.totalCurrentMonthlySpend,
      totalAnnualSavings: result.totalAnnualSavings,
      teamSize: formState.teamSize,
      useCase: formState.useCase,
      recommendations: result.recommendations.map((r) => ({
        tool: r.tool,
        action: r.action,
        monthlySavings: r.monthlySavings,
        annualSavings: r.annualSavings,
        reasoning: r.reasoning,
      })),
      auditId, // optional: backend will persist the summary to Firestore if provided
    });

    return response.summary;
  } catch (error) {
    if (error instanceof BackendApiError) {
      console.error("Flask backend error during summary generation:", error.message, error.code);
    } else {
      console.error("Unexpected error during summary generation:", error);
    }

    // Deterministic fallback — never block the audit flow over a summary failure
    const monthlySavings = result.totalMonthlySavings;
    const annualSavings = result.totalAnnualSavings;

    if (annualSavings <= 0) {
      return `Your ${formState.teamSize}-person team's AI stack is running efficiently for ${formState.useCase} workflows. Current subscriptions appear well-matched to your team's needs.`;
    }

    return (
      `We analysed your ${formState.teamSize}-person team's AI stack across ` +
      `${formState.tools.length} tool${formState.tools.length !== 1 ? "s" : ""}. ` +
      `You are currently spending $${result.totalCurrentMonthlySpend.toLocaleString()}/month and ` +
      `we identified $${monthlySavings.toLocaleString()}/month ($${annualSavings.toLocaleString()}/year) ` +
      `in savings through plan right-sizing and subscription consolidation.`
    );
  }
}
