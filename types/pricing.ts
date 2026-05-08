export type PlanType =
  | "free"
  | "individual"
  | "team"
  | "business"
  | "enterprise"
  | "api";

export type UseCase =
  | "coding"
  | "writing"
  | "research"
  | "data"
  | "mixed";

export interface PricingPlan {
  id: string;
  name: string;
  vendor: string;

  type: PlanType;

  monthlyPrice: number;

  minimumSeats?: number;

  recommendedTeamSize?: {
    min: number;
    max?: number;
  };

  useCases: UseCase[];

  features: string[];

  officialUrl: string;

  verifiedAt: string;
}