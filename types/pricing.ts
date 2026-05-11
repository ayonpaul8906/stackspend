export type PlanType =
  | "free"
  | "individual"
  | "team"
  | "business"
  | "enterprise"
  | "api"
  | "api-model"
  | "realtime-api"
  | "speech-to-text-api"
  | "image-api"
  | "api-feature"
  | "education"
  | "power-user";

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

  pricingModel?: string;

  monthlyPrice: number | null;
  introductoryMonthlyPrice?: number;
  introductoryDurationMonths?: number;
  trialPrice?: number;
  trialDurationMonths?: number;
  currency?: string;

  pricing?: {
    inputPer1MTokens?: number;
    cachedInputPer1MTokens?: number;
    outputPer1MTokens?: number;
    textInputPer1MTokens?: number;
    textCachedInputPer1MTokens?: number;
    textOutputPer1MTokens?: number;
    audioInputPer1MTokens?: number;
    audioCachedInputPer1MTokens?: number;
    audioOutputPer1MTokens?: number;
    imageInputPer1MTokens?: number;
    imageCachedInputPer1MTokens?: number;
    imageOutputPer1MTokens?: number;
    perMinute?: number;
    perSecond?: number;
    currency?: string;
  };

  minimumSeats?: number | null;

  recommendedTeamSize?: {
    min: number;
    max?: number;
  };

  useCases: string[];

  features: string[];

  officialUrl: string;

  verifiedAt: string;
}