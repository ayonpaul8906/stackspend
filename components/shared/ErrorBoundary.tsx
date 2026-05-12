"use client";

import React, { ReactNode } from "react";
import { motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";
import { GlowButton } from "./GlowButton";

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: (error: Error, reset: () => void) => ReactNode;
}

export class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  { hasError: boolean; error: Error | null }
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Error caught by boundary:", error, errorInfo);
  }

  resetError = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError && this.state.error) {
      return this.props.fallback ? (
        this.props.fallback(this.state.error, this.resetError)
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="min-h-screen flex items-center justify-center px-4 py-20"
        >
          <div className="text-center max-w-md">
            <div className="flex justify-center mb-6 text-destructive">
              <AlertTriangle className="w-16 h-16" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-4">
              Something Went Wrong
            </h1>
            <p className="text-muted-foreground mb-8">
              An unexpected error occurred. Please try again or contact support.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <GlowButton onClick={this.resetError} size="lg" className="w-full sm:w-auto">
                Try Again
              </GlowButton>
              <GlowButton
                variant="outline"
                size="lg"
                onClick={() => (window.location.href = "/")}
                className="w-full sm:w-auto"
              >
                Go Home
              </GlowButton>
            </div>
          </div>
        </motion.div>
      );
    }

    return this.props.children;
  }
}
