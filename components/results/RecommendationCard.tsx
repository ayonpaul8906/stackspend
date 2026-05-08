"use client";

import React from "react";
import { motion } from "framer-motion";
import { GlassCard } from "../shared/GlassCard";
import { AuditRecommendation } from "@/lib/audit-engine";
import { ArrowRight, CheckCircle, AlertTriangle, XCircle, ArrowDownCircle, Layers } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  recommendation: AuditRecommendation;
  index: number;
}

export function RecommendationCard({ recommendation, index }: Props) {
  const { tool, currentPlan, recommendedPlan, action, severity, monthlySavings, reasoning } = recommendation;

  // Visuals based on severity
  const getSeverityStyles = () => {
    switch (severity) {
      case "high_savings":
        return "bg-emerald-500/10 text-emerald-500 border-emerald-500/20";
      case "moderate_savings":
        return "bg-amber-500/10 text-amber-500 border-amber-500/20";
      case "optimized":
        return "bg-primary/10 text-primary border-primary/20";
      case "duplicate_spend":
        return "bg-destructive/10 text-destructive border-destructive/20";
      case "team_overkill":
        return "bg-secondary/10 text-secondary border-secondary/20";
      default:
        return "bg-muted text-muted-foreground border-border";
    }
  };

  const getSeverityLabel = () => {
    switch (severity) {
      case "high_savings": return "High Savings";
      case "moderate_savings": return "Moderate Savings";
      case "optimized": return "Optimized";
      case "duplicate_spend": return "Duplicate Spend";
      case "team_overkill": return "Team Overkill";
      default: return "Info";
    }
  };

  const getActionIcon = () => {
    switch (action) {
      case "keep": return <CheckCircle className="w-5 h-5 text-primary" />;
      case "downgrade": return <ArrowDownCircle className="w-5 h-5 text-secondary" />;
      case "remove": return <XCircle className="w-5 h-5 text-destructive" />;
      case "consolidate": return <Layers className="w-5 h-5 text-amber-500" />;
      case "replace": return <ArrowRight className="w-5 h-5 text-emerald-500" />;
      default: return <AlertTriangle className="w-5 h-5 text-muted-foreground" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <GlassCard className="p-6 overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          
          <div className="flex-1 space-y-4">
            <div className="flex items-center gap-3">
              {getActionIcon()}
              <h3 className="text-xl font-bold text-foreground">{tool}</h3>
              <span className={cn("px-2.5 py-1 rounded-full text-xs font-semibold border", getSeverityStyles())}>
                {getSeverityLabel()}
              </span>
            </div>

            <div className="flex items-center gap-4 text-sm font-medium">
              <div className="bg-background/50 border border-border px-3 py-1.5 rounded-md text-muted-foreground">
                Current: {currentPlan || "Custom"}
              </div>
              {recommendedPlan && (
                <>
                  <ArrowRight className="w-4 h-4 text-muted-foreground" />
                  <div className="bg-primary/10 border border-primary/20 px-3 py-1.5 rounded-md text-primary">
                    Recommended: {recommendedPlan}
                  </div>
                </>
              )}
            </div>

            <p className="text-muted-foreground leading-relaxed max-w-2xl">
              {reasoning}
            </p>
          </div>

          <div className="shrink-0 flex flex-col md:items-end justify-center pt-4 md:pt-0 border-t md:border-t-0 md:border-l border-border md:pl-6 min-w-[150px]">
            {monthlySavings > 0 ? (
              <>
                <p className="text-sm font-medium text-emerald-500 mb-1">Monthly Savings</p>
                <p className="text-3xl font-bold tracking-tight text-foreground">${monthlySavings.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground mt-1">${(monthlySavings * 12).toLocaleString()}/year</p>
              </>
            ) : (
              <>
                <p className="text-sm font-medium text-primary mb-1">Status</p>
                <p className="text-2xl font-bold tracking-tight text-foreground">Optimal</p>
              </>
            )}
          </div>
          
        </div>
      </GlassCard>
    </motion.div>
  );
}
