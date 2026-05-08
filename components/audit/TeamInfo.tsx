"use client";

import React from "react";
import { useFormContext } from "react-hook-form";
import { AuditFormValues } from "./audit-schema";
import { GlassCard } from "../shared/GlassCard";
import { Users, Briefcase } from "lucide-react";
import { cn } from "@/lib/utils";

const useCases = [
  { id: "coding", label: "Coding" },
  { id: "writing", label: "Writing" },
  { id: "research", label: "Research" },
  { id: "data", label: "Data Analysis" },
  { id: "mixed", label: "Mixed / General" },
];

export function TeamInfo() {
  const { register, watch, setValue } = useFormContext<AuditFormValues>();
  const currentUseCase = watch("useCase");

  return (
    <GlassCard className="p-6 mb-8 border-primary/20">
      <div className="flex flex-col md:flex-row gap-8">
        
        {/* Team Size */}
        <div className="flex-1 space-y-4">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold text-foreground">Team Size</h3>
          </div>
          <p className="text-sm text-muted-foreground">
            How many people are in your organization?
          </p>
          <div className="relative">
            <input
              type="number"
              min="1"
              className="w-full bg-background border border-border rounded-lg h-11 px-4 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              placeholder="e.g. 15"
              {...register("teamSize", { valueAsNumber: true })}
            />
          </div>
        </div>

        {/* Primary Use Case */}
        <div className="flex-1 space-y-4">
          <div className="flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-secondary" />
            <h3 className="text-lg font-semibold text-foreground">Primary Use Case</h3>
          </div>
          <p className="text-sm text-muted-foreground">
            What is your team&apos;s main AI workload?
          </p>
          <div className="flex flex-wrap gap-2">
            {useCases.map((uc) => (
              <button
                key={uc.id}
                type="button"
                onClick={() => setValue("useCase", uc.id as AuditFormValues["useCase"], { shouldValidate: true, shouldDirty: true })}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 border",
                  currentUseCase === uc.id
                    ? "bg-primary/20 border-primary text-primary shadow-[0_0_10px_rgba(124,58,237,0.2)]"
                    : "bg-background/50 border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"
                )}
              >
                {uc.label}
              </button>
            ))}
          </div>
        </div>

      </div>
    </GlassCard>
  );
}
