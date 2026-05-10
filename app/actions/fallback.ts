"use server";

import fs from "fs";
import path from "path";

const getFallbackPath = () => path.join(process.cwd(), ".next", "fallback_db.json");

export async function serverFallbackSave(id: string, data: any) {
  try {
    const dbPath = getFallbackPath();
    let db: Record<string, any> = {};
    if (fs.existsSync(dbPath)) {
      db = JSON.parse(fs.readFileSync(dbPath, "utf-8"));
    }
    db[id] = data;
    fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
  } catch (error) {
    console.error("Fallback save failed", error);
  }
}

export async function serverFallbackGet(id: string) {
  try {
    const dbPath = getFallbackPath();
    if (fs.existsSync(dbPath)) {
      const db = JSON.parse(fs.readFileSync(dbPath, "utf-8"));
      return db[id] || null;
    }
  } catch (error) {
    console.error("Fallback get failed", error);
  }
  return null;
}
