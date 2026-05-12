"use client";

import { motion } from "framer-motion";

export function MetricSkeleton() {
  return (
    <div className="space-y-3">
      <div className="h-4 w-24 bg-muted rounded-md animate-pulse" />
      <div className="h-10 w-32 bg-muted rounded-md animate-pulse" />
      <div className="h-3 w-20 bg-muted/50 rounded-md animate-pulse" />
    </div>
  );
}

export function RecommendationSkeleton() {
  return (
    <div className="space-y-4 p-6 bg-card/40 rounded-2xl border border-border/50">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="h-6 w-40 bg-muted rounded-md animate-pulse mb-2" />
          <div className="h-4 w-full bg-muted/50 rounded-md animate-pulse mb-1" />
          <div className="h-4 w-2/3 bg-muted/50 rounded-md animate-pulse" />
        </div>
        <div className="h-8 w-20 bg-muted rounded-md animate-pulse" />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="h-4 w-full bg-muted/50 rounded-md animate-pulse" />
        <div className="h-4 w-full bg-muted/50 rounded-md animate-pulse" />
      </div>
    </div>
  );
}

export function ResultsPageSkeleton() {
  return (
    <div className="space-y-16 animate-pulse">
      {/* Header */}
      <div className="mb-12 space-y-4">
        <div className="h-8 w-1/3 bg-muted rounded-md" />
        <div className="h-4 w-1/4 bg-muted/50 rounded-md" />
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[...Array(3)].map((_, i) => (
          <MetricSkeleton key={i} />
        ))}
      </div>

      {/* AI Summary */}
      <div className="p-6 bg-card/40 rounded-2xl space-y-3">
        <div className="h-4 w-16 bg-muted rounded-md" />
        <div className="space-y-2">
          <div className="h-4 w-full bg-muted/50 rounded-md" />
          <div className="h-4 w-full bg-muted/50 rounded-md" />
          <div className="h-4 w-2/3 bg-muted/50 rounded-md" />
        </div>
      </div>

      {/* Recommendations */}
      <div className="space-y-6">
        <div className="h-6 w-40 bg-muted rounded-md" />
        {[...Array(3)].map((_, i) => (
          <RecommendationSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}

export function FormSkeleton() {
  return (
    <div className="space-y-8">
      {/* Section title */}
      <div>
        <div className="h-6 w-1/4 bg-muted rounded-md mb-2 animate-pulse" />
        <div className="h-4 w-1/3 bg-muted/50 rounded-md animate-pulse" />
      </div>

      {/* Form fields */}
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="space-y-2">
            <div className="h-4 w-1/4 bg-muted rounded-md animate-pulse" />
            <div className="h-10 w-full bg-muted/50 rounded-md animate-pulse" />
          </div>
        ))}
      </div>

      {/* Button */}
      <div className="h-12 w-32 bg-muted rounded-md animate-pulse" />
    </div>
  );
}
