import { GoogleGenerativeAI } from "@google/generative-ai";
import { AuditResult } from "@/lib/audit-engine";
import { AuditFormState } from "@/types/audit";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function generateAuditSummary(
  result: AuditResult,
  formState: AuditFormState
): Promise<string> {
  try {
    if (!process.env.GEMINI_API_KEY) {
      return getFallbackSummary(result, formState);
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
      You are an expert SaaS financial auditor. Summarize this AI Stack Audit for a team of ${formState.teamSize} people primarily focused on ${formState.useCase}.
      
      Data:
      - Current monthly spend: $${result.totalCurrentMonthlySpend}
      - Monthly savings: $${result.totalMonthlySavings}
      - Annual savings: $${result.totalAnnualSavings}
      - Optimization score: ${result.optimizationScore}/100
      - Recommendations found: ${result.recommendations.length}
      
      Generate a professional, concise ~100 word personalized summary.
      Do not use bullet points or extra formatting. Just an engaging narrative paragraph emphasizing the specific financial impact, identifying general areas of waste, and explaining how well-optimized their setup is based on their team size and use case.
      Do not hallucinate fake numbers, use ONLY the numbers provided.
    `;

    const response = await model.generateContent(prompt);
    return response.response.text();
  } catch (error) {
    console.error("AI Summary generation failed:", error);
    return getFallbackSummary(result, formState);
  }
}

function getFallbackSummary(result: AuditResult, formState: AuditFormState): string {
  if (result.isOptimized) {
    return `Your ${formState.teamSize}-person team's AI stack is highly optimized for ${formState.useCase}. With a total monthly spend of $${result.totalCurrentMonthlySpend.toLocaleString()}, you are operating at peak financial efficiency. Keep up the great work managing your SaaS subscriptions!`;
  }
  
  return `We analyzed your ${formState.teamSize}-person team's AI stack, primarily used for ${formState.useCase}. You are currently spending $${result.totalCurrentMonthlySpend.toLocaleString()} monthly. We found ${result.recommendations.length} optimization opportunities that could save you $${result.totalAnnualSavings.toLocaleString()} annually. Implementing these changes will improve your optimization score to 100/100 while maintaining all operational capabilities.`;
}
