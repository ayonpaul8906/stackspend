"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { GlowButton } from "../shared/GlowButton";

interface EmptyStateProps {
  onAddTool: () => void;
}

export function EmptyState({ onAddTool }: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col items-center justify-center py-16 px-4 text-center border border-dashed border-primary/20 rounded-2xl bg-card/20 backdrop-blur-sm"
    >
      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6 relative">
        <div className="absolute inset-0 rounded-full bg-primary/20 blur-xl animate-pulse" />
        <Sparkles className="w-8 h-8 text-primary relative z-10" />
      </div>
      
      <h3 className="text-2xl font-bold text-foreground mb-3">
        Start building your AI stack
      </h3>
      
      <p className="text-muted-foreground max-w-md mx-auto mb-8">
        Add the AI tools your team is currently paying for. We&apos;ll analyze your usage and identify potential savings instantly.
      </p>
      
      <GlowButton onClick={onAddTool} size="lg">
        Add Your First Tool
      </GlowButton>
    </motion.div>
  );
}
