import { AuditFormState } from "@/types/audit";
import { AuditResult } from "./types";
import { generateRecommendations } from "./rules";

export function runAuditEngine(state: AuditFormState): AuditResult {
  const recommendations = generateRecommendations(state);

  const totalCurrentMonthlySpend = recommendations.reduce((acc, r) => acc + r.currentMonthlySpend, 0);
  const totalOptimizedMonthlySpend = recommendations.reduce((acc, r) => acc + r.optimizedMonthlySpend, 0);
  const totalMonthlySavings = recommendations.reduce((acc, r) => acc + r.monthlySavings, 0);
  const totalAnnualSavings = totalMonthlySavings * 12;

  // Optimization score calculation (0-100)
  // If savings are 0, score is 100. If savings are 50% of spend, score is 50.
  let optimizationScore = 100;
  if (totalCurrentMonthlySpend > 0) {
    const savingsRatio = totalMonthlySavings / totalCurrentMonthlySpend;
    optimizationScore = Math.max(0, Math.round(100 - (savingsRatio * 100)));
  }

  // If monthly savings is less than 5% of total spend or under $20, we consider it highly optimized
  const isOptimized = totalMonthlySavings < 20 || (totalMonthlySavings / totalCurrentMonthlySpend) < 0.05;

  // Sort recommendations: highest savings first
  recommendations.sort((a, b) => b.monthlySavings - a.monthlySavings);

  return {
    totalCurrentMonthlySpend,
    totalOptimizedMonthlySpend,
    totalMonthlySavings,
    totalAnnualSavings,
    optimizationScore,
    recommendations,
    isOptimized
  };
}
