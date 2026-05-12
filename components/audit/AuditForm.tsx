"use client";

import React from "react";
import { useForm, FormProvider, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { AuditFormValues, auditSchema } from "./audit-schema";
import { useFormPersistence } from "./use-form-persistence";
import { TeamInfo } from "./TeamInfo";
import { ToolCard } from "./ToolCard";
import { EmptyState } from "./EmptyState";
import { AuditSidebar } from "./AuditSidebar";
import { GlowButton } from "../shared/GlowButton";
import { Plus, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { runAuditEngine } from "@/lib/audit-engine";

export function AuditForm() {
  const router = useRouter();
  const form = useForm<AuditFormValues>({
    resolver: zodResolver(auditSchema),
    defaultValues: {
      teamSize: 1,
      useCase: "mixed",
      tools: [],
    },
  });

  const { control, handleSubmit } = form;
  const isHydrated = useFormPersistence(form, "stackspend-audit-form");

  const { fields, append, remove } = useFieldArray({
    control,
    name: "tools",
  });

  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const onSubmit = async (data: AuditFormValues) => {
    setIsSubmitting(true);
    try {
      // Run deterministic rules — all financial logic stays here
      const result = runAuditEngine(data);
      
      // Generate unique ID before AI call so backend can persist the summary
      const auditId = crypto.randomUUID();
      
      // Request AI narrative summary from Flask backend (via secure server action)
      // Passes pre-calculated outputs only — no financial logic sent to AI
      const { generateSummaryAction } = await import("@/app/actions/audit");
      const aiSummary = await generateSummaryAction(result, data, auditId);
      
      // Save full audit + summary to Firestore
      const { saveAuditToFirestore } = await import("@/lib/firebase/firestore");
      await saveAuditToFirestore(data, result, aiSummary, auditId);
      
      // Navigate to public shareable URL
      router.push(`/results/${auditId}`);
    } catch (error) {
      console.error("Failed to submit audit:", error);
      setIsSubmitting(false);
    }
  };

  const addTool = () => {
    append({
      id: Math.random().toString(36).substr(2, 9),
      tool: "",
      plan: "",
      monthlySpend: 0,
      seats: 1,
    });
  };

  // Don't render complex dynamic UI until hydrated to prevent hydration mismatch
  if (!isHydrated) return null;

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col lg:flex-row gap-8 lg:gap-12 relative">
        
        {/* Main Form Area */}
        <div className="flex-1 space-y-12 min-w-0">
          
          <section>
            <div className="mb-4">
              <h2 className="text-2xl font-bold text-foreground">1. Organization Details</h2>
              <p className="text-muted-foreground">Tell us about your team to help benchmark your spend.</p>
            </div>
            <TeamInfo />
          </section>

          <section>
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-foreground">2. Current AI Stack</h2>
                <p className="text-muted-foreground">Add all the AI subscriptions your team is paying for.</p>
              </div>
              {fields.length > 0 && (
                <button
                  type="button"
                  onClick={addTool}
                  className="hidden md:flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                >
                  <Plus className="w-4 h-4" /> Add Another
                </button>
              )}
            </div>

            <div className="space-y-4">
              <AnimatePresence initial={false}>
                {fields.length === 0 ? (
                  <EmptyState key="empty" onAddTool={addTool} />
                ) : (
                  fields.map((field, index) => (
                    <ToolCard
                      key={field.id}
                      index={index}
                      onRemove={() => remove(index)}
                    />
                  ))
                )}
              </AnimatePresence>

              {fields.length > 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="pt-4 flex justify-center md:hidden"
                >
                  <GlowButton type="button" variant="outline" onClick={addTool} className="w-full">
                    <Plus className="w-4 h-4 mr-2" /> Add Another Tool
                  </GlowButton>
                </motion.div>
              )}
            </div>
          </section>

          <div className="pt-8 border-t border-border flex justify-end">
            <GlowButton 
              type="submit" 
              size="lg" 
              disabled={fields.length === 0 || isSubmitting}
              className="w-full sm:w-auto"
            >
              {isSubmitting ? "Analyzing Stack..." : "Generate Audit Report"}
              {!isSubmitting && <ArrowRight className="w-5 h-5 ml-2" />}
            </GlowButton>
          </div>
        </div>

        {/* Sidebar Sticky Area */}
        <div className="w-full lg:w-80 xl:w-96 order-first lg:order-last shrink-0">
          <AuditSidebar />
        </div>

      </form>
    </FormProvider>
  );
}
