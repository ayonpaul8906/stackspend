import React from "react";
import { cn } from "@/lib/utils";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  hoverEffect?: boolean;
}

export function GlassCard({
  children,
  className,
  hoverEffect = true,
  ...props
}: GlassCardProps) {
  return (
    <div
      className={cn(
        "glass-panel rounded-2xl relative overflow-hidden transition-all duration-300",
        hoverEffect && "hover:border-primary/30 hover:shadow-[0_8px_32px_-8px_rgba(124,58,237,0.2)] hover:-translate-y-1",
        className
      )}
      {...props}
    >
      {/* Subtle interior glow */}
      <div className="absolute inset-0 pointer-events-none rounded-2xl ring-1 ring-inset ring-white/5" />
      
      {/* Content wrapper to ensure z-index relative to background effects */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
