import React from "react";
import { cn } from "@/lib/utils";

interface GradientBadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function GradientBadge({ children, className, ...props }: GradientBadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-medium text-primary backdrop-blur-md",
        "relative overflow-hidden",
        className
      )}
      {...props}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10 opacity-50" />
      <span className="relative z-10">{children}</span>
    </div>
  );
}
