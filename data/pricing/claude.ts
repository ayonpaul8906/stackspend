import { PricingPlan } from "@/types/pricing";

export const claudePlans: PricingPlan[] = [
  {
    id: "claude-free",
    name: "Claude Free",
    vendor: "Anthropic",
    type: "free",
    monthlyPrice: 0,
    useCases: ["writing", "research"],
    features: ["basic-access"],
    officialUrl: "https://claude.com/pricing",
    verifiedAt: "2026-05-07",
  },

  {
    id: "claude-pro",
    name: "Claude Pro",
    vendor: "Anthropic",
    type: "individual",
    monthlyPrice: 20,
    recommendedTeamSize: {
      min: 1,
      max: 2,
    },
    useCases: ["coding", "writing", "research"],
    features: [
      "higher-usage-limits",
      "priority-access",
      "advanced-models",
    ],
    officialUrl: "https://claude.com/pricing",
    verifiedAt: "2026-05-07",
  },

  {
    id: "claude-team",
    name: "Claude Team",
    vendor: "Anthropic",
    type: "team",
    monthlyPrice: 30,
    minimumSeats: 5,
    recommendedTeamSize: {
      min: 5,
    },
    useCases: ["coding", "writing", "research", "mixed"],
    features: [
      "team-collaboration",
      "centralized-billing",
      "admin-controls",
    ],
    officialUrl: "https://claude.com/pricing",
    verifiedAt: "2026-05-07",
  },
];