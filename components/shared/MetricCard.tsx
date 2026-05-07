"use client";

import React from "react";
import { motion } from "framer-motion";
import { GlassCard } from "./GlassCard";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  title: string;
  value: string;
  trend?: string;
  trendUp?: boolean;
  icon?: React.ReactNode;
  className?: string;
  delay?: number;
}

export function MetricCard({
  title,
  value,
  trend,
  trendUp = true,
  icon,
  className,
  delay = 0,
}: MetricCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
    >
      <GlassCard className={cn("p-6 flex flex-col gap-4", className)}>
        <div className="flex justify-between items-start">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          {icon && (
            <div className="p-2 rounded-lg bg-primary/10 text-primary">
              {icon}
            </div>
          )}
        </div>
        
        <div>
          <h3 className="text-3xl font-bold tracking-tight text-foreground">{value}</h3>
          {trend && (
            <p className={cn(
              "text-sm font-medium mt-2 flex items-center gap-1",
              trendUp ? "text-emerald-500" : "text-destructive"
            )}>
              {trendUp ? "↑" : "↓"} {trend}
            </p>
          )}
        </div>
      </GlassCard>
    </motion.div>
  );
}
