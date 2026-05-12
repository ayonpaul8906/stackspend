"use client";

import { motion } from "framer-motion";
import { GlowButton } from "./GlowButton";
import Link from "next/link";
import { AlertCircle } from "lucide-react";

interface NotFoundStateProps {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
}

export function NotFoundState({
  title = "Report Not Found",
  description = "We couldn't find the audit report you're looking for. It may have been deleted or the link might be incorrect.",
  icon = <AlertCircle className="w-16 h-16" />,
}: NotFoundStateProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-20">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-md"
      >
        {/* Icon */}
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="flex justify-center mb-6 text-muted-foreground/60"
        >
          {icon}
        </motion.div>

        {/* Title */}
        <h1 className="text-4xl font-bold text-foreground mb-4">{title}</h1>

        {/* Description */}
        <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
          {description}
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/">
            <GlowButton size="lg" className="w-full sm:w-auto">
              Back to Home
            </GlowButton>
          </Link>
          <Link href="/audit">
            <GlowButton variant="outline" size="lg" className="w-full sm:w-auto">
              Run New Audit
            </GlowButton>
          </Link>
        </div>

        {/* Decorative elements */}
        <div className="mt-16 space-y-2">
          <p className="text-xs text-muted-foreground/50">
            If you believe this is an error, please try again or contact support.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
