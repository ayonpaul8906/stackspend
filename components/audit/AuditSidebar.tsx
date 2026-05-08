"use client";

import React from "react";
import { useFormContext } from "react-hook-form";
import { AuditFormValues } from "./audit-schema";
import { GlassCard } from "../shared/GlassCard";
import { Calculator, TrendingDown, LayoutList } from "lucide-react";
import { motion } from "framer-motion";

export function AuditSidebar() {
  const { watch } = useFormContext<AuditFormValues>();
  const tools = watch("tools") || [];

  const totalMonthlySpend = tools.reduce((acc, tool) => acc + (Number(tool.monthlySpend) || 0), 0);
  const totalAnnualSpend = totalMonthlySpend * 12;

  return (
    <div className="sticky top-24 space-y-6">
      <GlassCard className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-primary/10 rounded-lg text-primary">
            <Calculator className="w-5 h-5" />
          </div>
          <h2 className="text-lg font-semibold text-foreground">Stack Summary</h2>
        </div>

        <div className="space-y-6">
          {/* Monthly Spend */}
          <div>
            <p className="text-sm text-muted-foreground mb-1">Estimated Monthly Spend</p>
            <motion.div 
              key={totalMonthlySpend}
              initial={{ scale: 1.05, color: "var(--primary)" }}
              animate={{ scale: 1, color: "var(--foreground)" }}
              className="text-4xl font-bold tracking-tight"
            >
              ${totalMonthlySpend.toLocaleString()}
            </motion.div>
          </div>

          {/* Annual Spend */}
          <div className="pt-4 border-t border-border">
            <p className="text-sm text-muted-foreground mb-1">Estimated Annual Spend</p>
            <div className="text-2xl font-semibold text-foreground/80">
              ${totalAnnualSpend.toLocaleString()}
            </div>
          </div>

          {/* Tools Count */}
          <div className="pt-4 border-t border-border flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <LayoutList className="w-4 h-4" />
              <span>Tools in Stack</span>
            </div>
            <span className="font-medium text-foreground">{tools.length}</span>
          </div>
        </div>
      </GlassCard>

      <GlassCard className="p-6 bg-secondary/5 border-secondary/20">
        <div className="flex items-start gap-4">
          <div className="p-2 bg-secondary/10 rounded-lg text-secondary mt-1">
            <TrendingDown className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-medium text-foreground mb-1">Savings Engine Ready</h3>
            <p className="text-sm text-muted-foreground">
              Add your tools to see instant optimization recommendations and potential savings.
            </p>
          </div>
        </div>
      </GlassCard>
    </div>
  );
}
