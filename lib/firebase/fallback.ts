import { serverFallbackSave, serverFallbackGet } from "@/app/actions/fallback";
import { StoredAudit } from "./firestore";

export async function fallbackSaveAudit(id: string, data: Omit<StoredAudit, "id">) {
  await serverFallbackSave(id, data);
}

export async function fallbackGetAudit(id: string): Promise<StoredAudit | null> {
  const data = await serverFallbackGet(id);
  if (data) {
    return {
      id,
      ...data
    };
  }
  return null;
}
