/**
 * lib/services/backendApi.ts
 * --------------------------
 * Typed client for the Flask backend API.
 * All calls go through this module — never fetch the backend directly from components.
 *
 * Environment variable:
 *   NEXT_PUBLIC_BACKEND_URL  — Flask backend base URL (default: http://localhost:5000)
 */

const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL?.replace(/\/$/, "") || "http://localhost:5000";

// ── Types ────────────────────────────────────────────────────────────────────

export interface SummaryRequest {
  tools: Array<{
    tool: string;
    plan: string;
    monthlySpend: number;
    seats: number;
  }>;
  totalCurrentMonthlySpend: number;
  totalAnnualSavings: number;
  teamSize: number;
  useCase: "coding" | "writing" | "research" | "data" | "mixed";
  recommendations: Array<{
    tool: string;
    action: string;
    monthlySavings: number;
    annualSavings: number;
    reasoning: string;
  }>;
  auditId?: string; // optional — if provided, the backend saves the summary to Firestore
}

export interface SummaryResponse {
  summary: string;
  aiPowered: boolean;
}

export interface EmailRequest {
  email: string;
  auditId: string;
  name?: string;
  role?: string;
  honey?: string; // honeypot — always leave empty
}

export interface EmailResponse {
  mocked?: boolean;
}

export class BackendApiError extends Error {
  constructor(
    public readonly message: string,
    public readonly status: number,
    public readonly code?: string
  ) {
    super(message);
    this.name = "BackendApiError";
  }
}

// ── Internal helpers ──────────────────────────────────────────────────────────

async function post<T>(path: string, body: unknown): Promise<T> {
  let res: Response;

  try {
    res = await fetch(`${BACKEND_URL}${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  } catch {
    throw new BackendApiError(
      "Unable to reach the StackSpend backend. Please try again.",
      0,
      "NETWORK_ERROR"
    );
  }

  const json = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new BackendApiError(
      json?.error || "An unexpected error occurred.",
      res.status,
      json?.code
    );
  }

  return json.data as T;
}

// ── Public API ────────────────────────────────────────────────────────────────

/**
 * Call POST /api/generate-summary on the Flask backend.
 * Returns the AI-generated (or fallback) summary string and whether AI was used.
 */
export async function generateSummary(req: SummaryRequest): Promise<SummaryResponse> {
  return post<SummaryResponse>("/api/generate-summary", req);
}

/**
 * Call POST /api/send-email on the Flask backend.
 * Returns delivery confirmation.
 */
export async function sendAuditReportEmail(req: EmailRequest): Promise<EmailResponse> {
  return post<EmailResponse>("/api/send-email", req);
}

/**
 * Health-check — returns true if the backend is reachable.
 */
export async function checkBackendHealth(): Promise<boolean> {
  try {
    const res = await fetch(`${BACKEND_URL}/health`, { method: "GET" });
    return res.ok;
  } catch {
    return false;
  }
}
