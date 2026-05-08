import { AuditFormState } from "@/types/audit";
import { AuditRecommendation } from "./types";

export function generateRecommendations(state: AuditFormState): AuditRecommendation[] {
  const recommendations: AuditRecommendation[] = [];
  const tools = state.tools;

  // Track if we have overlapping writing/research tools
  const writingTools = tools.filter(t => 
    ["ChatGPT", "Claude", "Gemini", "chatgpt-plus", "chatgpt-business", "claude-pro", "claude-team"].some(k => t.tool.toLowerCase().includes(k.toLowerCase()) || t.plan.toLowerCase().includes(k.toLowerCase()))
  );

  // Rule C: Multiple overlapping writing/research tools
  if (writingTools.length >= 2 && ["writing", "research", "mixed"].includes(state.useCase)) {
    // Recommend removing the more expensive or less prominent one
    // We'll keep the first one, recommend removing others
    for (let i = 1; i < writingTools.length; i++) {
      const target = writingTools[i];
      recommendations.push({
        tool: target.tool,
        currentPlan: target.plan,
        action: "consolidate",
        severity: "duplicate_spend",
        currentMonthlySpend: target.monthlySpend,
        optimizedMonthlySpend: 0,
        monthlySavings: target.monthlySpend,
        annualSavings: target.monthlySpend * 12,
        reasoning: "Multiple overlapping conversational AI tools detected. Consolidating to a single primary provider significantly reduces redundant spend without affecting team capabilities.",
        confidence: "high"
      });
    }
  }

  // Iterate over each tool for specific rules
  for (const tool of tools) {
    // Skip if we already recommended consolidating this tool
    if (recommendations.some(r => r.tool === tool.tool && r.action === "consolidate")) {
      continue;
    }

    const toolNameLower = tool.tool.toLowerCase();
    const planIdLower = tool.plan.toLowerCase();
    
    // Rule A: ChatGPT Business with <= 2 seats -> Recommend Plus
    if (toolNameLower.includes("chatgpt") && planIdLower.includes("business") && tool.seats <= 2) {
      const optimizedSpend = tool.seats * 20; // Plus is $20
      recommendations.push({
        tool: tool.tool,
        currentPlan: tool.plan,
        recommendedPlan: "chatgpt-plus",
        action: "downgrade",
        severity: "team_overkill",
        currentMonthlySpend: tool.monthlySpend,
        optimizedMonthlySpend: optimizedSpend,
        monthlySavings: tool.monthlySpend - optimizedSpend,
        annualSavings: (tool.monthlySpend - optimizedSpend) * 12,
        reasoning: "Business collaboration features appear underutilized for a team of this size. Switching to individual Plus accounts provides similar operational value at a lower cost.",
        confidence: "high"
      });
      continue;
    }

    // Rule B: Claude Team with < 5 seats -> Recommend Pro
    if (toolNameLower.includes("claude") && planIdLower.includes("team") && tool.seats < 5) {
      const optimizedSpend = tool.seats * 20; // Pro is $20
      recommendations.push({
        tool: tool.tool,
        currentPlan: tool.plan,
        recommendedPlan: "claude-pro",
        action: "downgrade",
        severity: "team_overkill",
        currentMonthlySpend: tool.monthlySpend,
        optimizedMonthlySpend: optimizedSpend,
        monthlySavings: tool.monthlySpend - optimizedSpend,
        annualSavings: (tool.monthlySpend - optimizedSpend) * 12,
        reasoning: "Claude Team requires a 5-seat minimum, meaning you are paying for unused seats. Switching to individual Claude Pro accounts optimizes this spend.",
        confidence: "high"
      });
      continue;
    }

    // Rule D: Unused expensive team plans
    // Generic check for high spend per seat ratio if team size is small
    if (tool.monthlySpend / tool.seats > 30 && tool.seats < 3) {
      recommendations.push({
        tool: tool.tool,
        currentPlan: tool.plan,
        action: "downgrade",
        severity: "moderate_savings",
        currentMonthlySpend: tool.monthlySpend,
        optimizedMonthlySpend: tool.seats * 20,
        monthlySavings: tool.monthlySpend - (tool.seats * 20),
        annualSavings: (tool.monthlySpend - (tool.seats * 20)) * 12,
        reasoning: "Current plan cost is unusually high for the number of active seats. Moving to an individual or lower-tier plan reduces overhead.",
        confidence: "medium"
      });
      continue;
    }

    // Rule E: Already optimized stack
    recommendations.push({
      tool: tool.tool,
      currentPlan: tool.plan,
      action: "keep",
      severity: "optimized",
      currentMonthlySpend: tool.monthlySpend,
      optimizedMonthlySpend: tool.monthlySpend,
      monthlySavings: 0,
      annualSavings: 0,
      reasoning: "This subscription appears correctly sized for your team and use case.",
      confidence: "high"
    });
  }

  return recommendations;
}