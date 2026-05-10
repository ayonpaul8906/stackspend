import { db } from "./client";
import { collection, addDoc, doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
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
  } catch (error: any) {
    console.warn("Firebase write failed (likely missing permissions). Falling back to local storage.", error?.message);
    const { fallbackSaveAudit } = await import("./fallback");
    await fallbackSaveAudit(id, { ...auditResult, formState, aiSummary });
  }
  
  return id;
}

// Helper to parse Firestore REST API response
function parseFirestoreValue(value: any): any {
  if (!value) return null;
  if ("stringValue" in value) return value.stringValue;
  if ("integerValue" in value) return parseInt(value.integerValue, 10);
  if ("doubleValue" in value) return parseFloat(value.doubleValue);
  if ("booleanValue" in value) return value.booleanValue;
  if ("arrayValue" in value) return (value.arrayValue.values || []).map(parseFirestoreValue);
  if ("mapValue" in value) {
    const obj: any = {};
    const fields = value.mapValue.fields || {};
    for (const key in fields) {
      obj[key] = parseFirestoreValue(fields[key]);
    }
    return obj;
  }
  if ("nullValue" in value) return null;
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
    const parsedData: any = {};
    for (const key in data.fields) {
      parsedData[key] = parseFirestoreValue(data.fields[key]);
    }

    return {
      id,
      ...parsedData
    } as StoredAudit;
  } catch (error: any) {
    console.warn("Firestore REST fetch failed. Fetching from fallback local storage.", error?.message);
    const { fallbackGetAudit } = await import("./fallback");
    return fallbackGetAudit(id);
  }
}

export async function saveLead(auditId: string, email: string, name?: string, role?: string) {
  if (!db) {
    console.warn("Firebase not configured. Lead not saved.");
    return "mock-lead-id";
  }

  const leadsRef = collection(db, "leads");
  
  try {
    const docRef = await addDoc(leadsRef, {
      auditId,
      email,
      name: name || "",
      role: role || "",
      createdAt: serverTimestamp(),
    });
    return docRef.id;
  } catch (error: any) {
    console.warn("Firebase write failed for lead. Returning mock ID.", error?.message);
    return "mock-lead-id";
  }
}
