export interface AuditToolInput {
  id: string;

  tool: string;

  plan: string;

  monthlySpend: number;

  seats: number;
}

export interface AuditFormState {
  teamSize: number;

  useCase:
    | "coding"
    | "writing"
    | "research"
    | "data"
    | "mixed";

  tools: AuditToolInput[];
}