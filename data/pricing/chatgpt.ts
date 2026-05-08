import { PricingPlan } from "@/types/pricing";

export const chatgptPlans: PricingPlan[] = [
  {
    id: "chatgpt-free",
    name: "ChatGPT Free",
    vendor: "OpenAI",
    type: "free",
    monthlyPrice: 0,
    useCases: ["writing", "research", "mixed"],
    features: ["basic-access"],
    officialUrl: "https://chatgpt.com/pricing/",
    verifiedAt: "2026-05-07",
  },

  {
    id: "chatgpt-plus",
    name: "ChatGPT Plus",
    vendor: "OpenAI",
    type: "individual",
    monthlyPrice: 20,
    recommendedTeamSize: {
      min: 1,
      max: 2,
    },
    useCases: ["coding", "writing", "research", "mixed"],
    features: [
      "gpt-5-access",
      "file-upload",
      "advanced-tools",
    ],
    officialUrl: "https://chatgpt.com/pricing/",
    verifiedAt: "2026-05-07",
  },

  {
    id: "chatgpt-business",
    name: "ChatGPT Business",
    vendor: "OpenAI",
    type: "business",
    monthlyPrice: 25,
    minimumSeats: 2,
    recommendedTeamSize: {
      min: 3,
    },
    useCases: ["coding", "writing", "research", "mixed"],
    features: [
      "shared-workspace",
      "admin-controls",
      "collaboration",
      "centralized-billing",
    ],
    officialUrl: "https://chatgpt.com/pricing/",
    verifiedAt: "2026-05-07",
  },
];