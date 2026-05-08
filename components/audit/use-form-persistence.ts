"use client";

import { useEffect, useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { AuditFormValues } from "./audit-schema";

export function useFormPersistence(form: UseFormReturn<AuditFormValues>, key: string) {
  const [isHydrated, setIsHydrated] = useState(false);

  // Load from local storage on mount
  useEffect(() => {
    const saved = localStorage.getItem(key);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        form.reset(parsed);
      } catch (e) {
        console.error("Failed to restore form state", e);
      }
    }
    setTimeout(() => setIsHydrated(true), 0);
  }, [form, key]);

  // Save to local storage on change
  useEffect(() => {
    if (!isHydrated) return;
    
    const subscription = form.watch((value) => {
      // Debounce slightly by just writing directly, or use setTimeout if heavy.
      // For simple forms, direct write is fine.
      localStorage.setItem(key, JSON.stringify(value));
    });

    return () => subscription.unsubscribe();
  }, [form, key, isHydrated]);

  return isHydrated;
}
