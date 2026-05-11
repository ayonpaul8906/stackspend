import { db } from "./client";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { AuditResult } from "@/lib/audit-engine";
import { AuditFormState } from "@/types/audit";

export interface StoredAudit extends AuditResult {
  id: string;
  formState: AuditFormState;
  aiSummary: string;
  createdAt: unknown;
}

export async function saveAuditToFirestore(
  formState: AuditFormState,
  auditResult: AuditResult,
  aiSummary: string,
  id: string
): Promise<string> {
  if (!db) {
    console.warn("Firebase is not configured! Check your .env variables.");
    // Fallback for local testing without Firebase
    const { fallbackSaveAudit } = await import("./fallback");
    await fallbackSaveAudit(id, { ...auditResult, formState, aiSummary });
    return id;
  }

  const auditRef = doc(db, "audits", id);
  
  try {
    await setDoc(auditRef, {
      ...auditResult,
      formState,
      aiSummary,
      createdAt: serverTimestamp(),
    });
  } catch (error) {
    const errMsg = error instanceof Error ? error.message : "";
    console.warn("Firebase write failed (likely missing permissions). Falling back to local storage.", errMsg);
    const { fallbackSaveAudit } = await import("./fallback");
    await fallbackSaveAudit(id, { ...auditResult, formState, aiSummary });
  }
  
  return id;
}

// Helper to parse Firestore REST API response
function parseFirestoreValue(value: unknown): unknown {
  if (!value || typeof value !== "object") return value;
  
  const valObj = value as Record<string, unknown>;
  
  if ("stringValue" in valObj) return valObj.stringValue;
  if ("integerValue" in valObj) return parseInt(valObj.integerValue as string, 10);
  if ("doubleValue" in valObj) return parseFloat(valObj.doubleValue as string);
  if ("booleanValue" in valObj) return valObj.booleanValue;
  if ("arrayValue" in valObj) {
    const arrVal = valObj.arrayValue as Record<string, unknown[]>;
    return (arrVal.values || []).map(parseFirestoreValue);
  }
  if ("mapValue" in valObj) {
    const obj: Record<string, unknown> = {};
    const mapVal = valObj.mapValue as Record<string, Record<string, unknown>>;
    const fields = mapVal.fields || {};
    for (const key in fields) {
      obj[key] = parseFirestoreValue(fields[key]);
    }
    return obj;
  }
  if ("nullValue" in valObj) return null;
  return value;
}

export async function getAuditFromFirestore(id: string): Promise<StoredAudit | null> {
  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
  if (!projectId) {
    const { fallbackGetAudit } = await import("./fallback");
    return fallbackGetAudit(id);
  }

  try {
    // Use Firestore REST API to completely bypass Next.js Node.js gRPC/WebSocket connection drops
    const url = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/audits/${id}`;
    const res = await fetch(url, { next: { revalidate: 60 } });
    
    if (!res.ok) {
      if (res.status === 404) return null;
      throw new Error(`Firestore REST API returned ${res.status}`);
    }

    const data = await res.json();
    if (!data || !data.fields) return null;

    // Parse the REST response into our StoredAudit structure
    const parsedData: Record<string, unknown> = {};
    for (const key in data.fields) {
      parsedData[key] = parseFirestoreValue(data.fields[key]);
    }

    return {
      id,
      ...parsedData
    } as StoredAudit;
  } catch (error) {
    const errMsg = error instanceof Error ? error.message : "";
    console.warn("Firestore REST fetch failed. Fetching from fallback local storage.", errMsg);
    const { fallbackGetAudit } = await import("./fallback");
    return fallbackGetAudit(id);
  }
}

export async function saveLead(auditId: string, email: string, name?: string, role?: string) {
  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
  if (!projectId) {
    console.warn("Firebase not configured. Lead not saved.");
    return "mock-lead-id";
  }

  try {
    // Use Firestore REST API to bypass Next.js Node.js gRPC hangs
    const url = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/leads`;
    
    const body = {
      fields: {
        auditId: { stringValue: auditId },
        email: { stringValue: email },
        name: { stringValue: name || "" },
        role: { stringValue: role || "" },
        createdAt: { timestampValue: new Date().toISOString() }
      }
    };

    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });

    if (!res.ok) {
      throw new Error(`REST API returned ${res.status}`);
    }

    const data = await res.json();
    // The response includes the generated name like projects/.../documents/leads/someId
    const parts = data.name ? data.name.split('/') : [];
    return parts[parts.length - 1] || "mock-lead-id";
  } catch (error) {
    const errMsg = error instanceof Error ? error.message : "";
    console.warn("Firebase write failed for lead via REST. Returning mock ID.", errMsg);
    return "mock-lead-id";
  }
}
