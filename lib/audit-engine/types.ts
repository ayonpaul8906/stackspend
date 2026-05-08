export type RecommendationAction =
    | "keep"
    | "downgrade"
    | "remove"
    | "replace"
    | "consolidate";

export type RecommendationSeverity =
    | "high_savings"
    | "moderate_savings"
    | "optimized"
    | "duplicate_spend"
    | "team_overkill";

export interface AuditRecommendation {
    tool: string;
    currentPlan: string;
    recommendedPlan?: string;
    action: RecommendationAction;
    severity: RecommendationSeverity;

    currentMonthlySpend: number;
    optimizedMonthlySpend: number;
    monthlySavings: number;
    annualSavings: number;

    reasoning: string;
    confidence: "low" | "medium" | "high";
}

export interface AuditResult {
    totalCurrentMonthlySpend: number;
    totalOptimizedMonthlySpend: number;
    totalMonthlySavings: number;
    totalAnnualSavings: number;
    optimizationScore: number;
    recommendations: AuditRecommendation[];
    isOptimized: boolean; // True if savings are low
}