import { PricingPlan } from "@/types/pricing";

export const githubCopilotPlans: PricingPlan[] = [
  {
    id: "github-copilot-free",
    name: "GitHub Copilot Free",
    vendor: "GitHub",
    type: "personal",
    monthlyPrice: 0,
    minimumSeats: 1,
    recommendedTeamSize: {
      min: 1,
    },
    useCases: [
      "learning",
      "casual-coding",
      "trying-copilot",
    ],
    features: [
      "50-chat-or-agent-requests",
      "2000-code-completions",
      "copilot-cli",
      "basic-model-access",
      "vscode-support",
      "jetbrains-support",
      "xcode-support",
      "github-mobile-support",
    ],
    officialUrl: "https://github.com/features/copilot/plans",
    verifiedAt: "2026-05-11",
  },

  {
    id: "github-copilot-pro",
    name: "GitHub Copilot Pro",
    vendor: "GitHub",
    type: "personal",
    monthlyPrice: 10,
    minimumSeats: 1,
    recommendedTeamSize: {
      min: 1,
    },
    useCases: [
      "daily-development",
      "professional-coding",
      "ai-assisted-programming",
    ],
    features: [
      "copilot-cloud-agent",
      "copilot-code-review",
      "claude-and-codex-access",
      "300-premium-requests",
      "unlimited-gpt-5-mini-chat",
      "unlimited-inline-suggestions",
      "access-to-openai-anthropic-google-models",
    ],
    officialUrl: "https://github.com/features/copilot/plans",
    verifiedAt: "2026-05-11",
  },

  {
    id: "github-copilot-pro-plus",
    name: "GitHub Copilot Pro+",
    vendor: "GitHub",
    type: "power-user",
    monthlyPrice: 39,
    minimumSeats: 1,
    recommendedTeamSize: {
      min: 1,
    },
    useCases: [
      "advanced-development",
      "heavy-ai-coding",
      "agentic-development-workflows",
    ],
    features: [
      "everything-in-pro",
      "1500-premium-requests",
      "access-to-all-models",
      "claude-opus-access",
      "github-spark-access",
      "higher-model-limits",
    ],
    officialUrl: "https://github.com/features/copilot/plans",
    verifiedAt: "2026-05-11",
  },

  {
    id: "github-copilot-business",
    name: "GitHub Copilot Business",
    vendor: "GitHub",
    type: "business",
    monthlyPrice: 19,
    minimumSeats: 1,
    recommendedTeamSize: {
      min: 2,
    },
    useCases: [
      "engineering-teams",
      "team-development",
      "organization-wide-ai-coding",
    ],
    features: [
      "organization-management",
      "policy-management",
      "centralized-billing",
      "enterprise-grade-security",
      "model-access-controls",
      "copilot-for-teams",
    ],
    officialUrl: "https://github.com/features/copilot/plans",
    verifiedAt: "2026-05-11",
  },

  {
    id: "github-copilot-enterprise",
    name: "GitHub Copilot Enterprise",
    vendor: "GitHub",
    type: "enterprise",
    monthlyPrice: 39,
    minimumSeats: 1,
    recommendedTeamSize: {
      min: 50,
    },
    useCases: [
      "large-organizations",
      "enterprise-development",
      "enterprise-ai-governance",
    ],
    features: [
      "everything-in-business",
      "organization-knowledge-access",
      "github-native-ai-search",
      "enterprise-policy-controls",
      "advanced-security-and-governance",
      "enterprise-support",
    ],
    officialUrl: "https://github.com/features/copilot/plans",
    verifiedAt: "2026-05-11",
  },

  {
    id: "github-copilot-student",
    name: "GitHub Copilot Student",
    vendor: "GitHub",
    type: "education",
    monthlyPrice: 0,
    minimumSeats: 1,
    recommendedTeamSize: {
      min: 1,
    },
    useCases: [
      "students",
      "learning",
      "academic-development",
    ],
    features: [
      "copilot-pro-features",
      "free-for-verified-students",
      "premium-model-access",
      "coding-assistance",
    ],
    officialUrl: "https://github.com/features/copilot/plans",
    verifiedAt: "2026-05-11",
  },
];
