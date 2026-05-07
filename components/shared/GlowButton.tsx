"use client";

import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlowButtonProps extends HTMLMotionProps<"button"> {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function GlowButton({
  children,
  variant = "primary",
  size = "md",
  className,
  ...props
}: GlowButtonProps) {
  const baseStyles = "relative inline-flex items-center justify-center font-medium transition-colors rounded-xl overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50";
  
  const variants = {
    primary: "bg-primary text-primary-foreground hover:bg-primary/90",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/90",
    outline: "border border-primary/20 bg-background/50 backdrop-blur-sm text-foreground hover:bg-primary/10",
  };

  const sizes = {
    sm: "h-9 px-4 text-sm",
    md: "h-11 px-8 text-base",
    lg: "h-14 px-10 text-lg",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {/* Glow effect for primary/secondary variants */}
      {variant !== "outline" && (
        <div className="absolute inset-0 -z-10 rounded-xl blur-md bg-white/20 opacity-0 transition-opacity hover:opacity-100" />
      )}
      
      {/* Shimmer effect */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] hover:animate-[shimmer_2s_infinite]" />
      
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </motion.button>
  );
}
