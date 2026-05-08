import { z } from "zod";

export const auditToolSchema = z.object({
  id: z.string(),
  tool: z.string().min(1, "Tool is required"),
  plan: z.string().min(1, "Plan is required"),
  monthlySpend: z.number().min(0, "Spend must be positive"),
  seats: z.number().min(1, "Seats must be at least 1"),
});

export const auditSchema = z.object({
  teamSize: z.number().min(1, "Team size must be at least 1"),
  useCase: z.enum(["coding", "writing", "research", "data", "mixed"]),
  tools: z.array(auditToolSchema),
});

export type AuditFormValues = z.infer<typeof auditSchema>;
