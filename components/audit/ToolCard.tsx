"use client";

import React, { useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { useFormContext } from "react-hook-form";
import { AuditFormValues } from "./audit-schema";
import { GlassCard } from "../shared/GlassCard";
import { tools as availableTools } from "@/data/tools";
import { pricingDatabase } from "@/data/pricing";
import { Trash2, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface ToolCardProps {
  index: number;
  onRemove: () => void;
}

export function ToolCard({ index, onRemove }: ToolCardProps) {
  const { register, watch, setValue, formState: { errors } } = useFormContext<AuditFormValues>();
  
  const selectedTool = watch(`tools.${index}.tool`);
  const selectedPlanId = watch(`tools.${index}.plan`);
  const seats = watch(`tools.${index}.seats`);
  
  // Get matching plans for the selected tool
  const matchingPlans = useMemo(() => {
    if (!selectedTool) return [];
    const normalizedTool = selectedTool.toLowerCase().replace(/\s+/g, '');
    return pricingDatabase.filter(p => 
      p.id.includes(normalizedTool) || 
      p.name.toLowerCase().includes(selectedTool.toLowerCase()) ||
      p.vendor.toLowerCase().includes(selectedTool.toLowerCase())
    );
  }, [selectedTool]);

  // Handle plan change to auto-update spend
  const handlePlanChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const planId = e.target.value;
    setValue(`tools.${index}.plan`, planId, { shouldValidate: true });
    
    const plan = matchingPlans.find(p => p.id === planId);
    if (plan) {
      const minSeats = plan.minimumSeats || 1;
      const currentSeats = seats || 1;
      const actualSeats = Math.max(minSeats, currentSeats);
      
      setValue(`tools.${index}.seats`, actualSeats, { shouldValidate: true });
      setValue(`tools.${index}.monthlySpend`, actualSeats * plan.monthlyPrice, { shouldValidate: true });
    }
  };

  // Recalculate spend if seats change and plan is known
  useEffect(() => {
    if (selectedPlanId && seats) {
      const plan = matchingPlans.find(p => p.id === selectedPlanId);
      if (plan) {
        setValue(`tools.${index}.monthlySpend`, seats * plan.monthlyPrice, { shouldValidate: true });
      }
    }
  }, [seats, selectedPlanId, matchingPlans, setValue, index]);

  const toolError = errors.tools?.[index]?.tool?.message;
  const planError = errors.tools?.[index]?.plan?.message;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
      transition={{ duration: 0.4, type: "spring", bounce: 0.4 }}
    >
      <GlassCard className="p-6 relative group overflow-visible z-10 border-border/50 hover:border-primary/30">
        <button
          type="button"
          onClick={onRemove}
          className="absolute -right-3 -top-3 w-8 h-8 bg-destructive/10 text-destructive rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-destructive hover:text-white"
        >
          <Trash2 className="w-4 h-4" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Tool Selector */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">Select AI Tool</label>
            <div className="relative">
              <select
                className={cn(
                  "w-full appearance-none bg-background/50 border rounded-lg h-11 px-4 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all",
                  toolError ? "border-destructive focus:ring-destructive/50" : "border-border"
                )}
                {...register(`tools.${index}.tool`, {
                  onChange: () => {
                    // Reset plan when tool changes
                    setValue(`tools.${index}.plan`, "");
                    setValue(`tools.${index}.monthlySpend`, 0);
                  }
                })}
              >
                <option value="">Choose a tool...</option>
                {availableTools.map(t => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
            </div>
          </div>

          {/* Plan Selector */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">Subscription Plan</label>
            <div className="relative">
              <select
                disabled={!selectedTool || matchingPlans.length === 0}
                className={cn(
                  "w-full appearance-none bg-background/50 border rounded-lg h-11 px-4 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed",
                  planError ? "border-destructive focus:ring-destructive/50" : "border-border"
                )}
                value={selectedPlanId || ""}
                onChange={handlePlanChange}
              >
                <option value="">{matchingPlans.length > 0 ? "Choose a plan..." : "Select tool first"}</option>
                {matchingPlans.map(p => (
                  <option key={p.id} value={p.id}>
                    {p.name} (${p.monthlyPrice}/mo)
                  </option>
                ))}
                <option value="custom">Custom / Other</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
            </div>
          </div>

          {/* Seats Input */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">Number of Seats</label>
            <input
              type="number"
              min="1"
              className="w-full bg-background/50 border border-border rounded-lg h-11 px-4 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              {...register(`tools.${index}.seats`, { valueAsNumber: true })}
            />
          </div>

          {/* Monthly Spend Input */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">Monthly Spend ($)</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
              <input
                type="number"
                min="0"
                step="0.01"
                className="w-full bg-background/50 border border-border rounded-lg h-11 pl-8 pr-4 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                {...register(`tools.${index}.monthlySpend`, { valueAsNumber: true })}
              />
            </div>
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );
}
