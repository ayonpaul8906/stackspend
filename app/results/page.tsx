"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AuditResult } from "@/lib/audit-engine";
import { Navbar } from "@/components/shared/Navbar";
import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { RecommendationCard } from "@/components/results/RecommendationCard";
import { MetricCard } from "@/components/shared/MetricCard";
import { ShieldCheck, ArrowRight, Wallet, Activity } from "lucide-react";
import { GlowButton } from "@/components/shared/GlowButton";
import { motion } from "framer-motion";

export default function ResultsPage() {
  const router = useRouter();
  const [result, setResult] = useState<AuditResult | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("stackspend-audit-result");
      if (stored) {
        setTimeout(() => setResult(JSON.parse(stored)), 0);
      } else {
        router.push("/audit");
      }
    } catch {
      router.push("/audit");
    } finally {
      setIsLoading(false);
    }
  }, [router]);

  if (isLoading) return null;
  if (!result) return null;

  return (
    <main className="flex min-h-screen flex-col">
      <Navbar />
      
      <div className="pt-24 lg:pt-32 pb-20">
        <SectionWrapper>
          
          {/* HERO SECTION */}
          <div className="mb-16 text-center max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-2xl mb-6">
                <Activity className="w-8 h-8 text-primary" />
              </div>
              <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-foreground mb-6">
                Your Stack <span className="text-gradient">Audit</span>
              </h1>
              
              {result.isOptimized ? (
                <p className="text-xl text-emerald-500 font-medium">
                  Your AI stack appears cost-efficient for your current team structure.
                </p>
              ) : (
                <p className="text-xl text-muted-foreground">
                  We found multiple optimization opportunities. Reallocating your spend can significantly improve efficiency.
                </p>
              )}
            </motion.div>
          </div>

          {/* METRICS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <MetricCard
              title="Total Monthly Savings"
              value={`$${result.totalMonthlySavings.toLocaleString()}`}
              trendUp={true}
              trend="Immediate impact"
              icon={<Wallet />}
              delay={0.1}
            />
            <MetricCard
              title="Total Annual Savings"
              value={`$${result.totalAnnualSavings.toLocaleString()}`}
              trendUp={true}
              trend="Yearly cashflow"
              icon={<Wallet />}
              delay={0.2}
            />
            <MetricCard
              title="Optimization Score"
              value={`${result.optimizationScore}/100`}
              trendUp={result.optimizationScore > 80}
              trend={result.optimizationScore > 80 ? "Excellent" : "Needs Work"}
              icon={<ShieldCheck />}
              delay={0.3}
            />
          </div>

          {/* TOOL BREAKDOWN SECTION */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-6">Tool Breakdown & Recommendations</h2>
            
            <div className="space-y-6">
              {result.recommendations.map((rec, index) => (
                <RecommendationCard 
                  key={`${rec.tool}-${index}`} 
                  recommendation={rec} 
                  index={index} 
                />
              ))}
            </div>
          </div>

          {/* CTA */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col items-center justify-center p-12 text-center rounded-3xl border border-primary/20 bg-gradient-to-b from-primary/5 to-transparent"
          >
            <h3 className="text-3xl font-bold text-foreground mb-4">Ready to optimize?</h3>
            <p className="text-muted-foreground max-w-md mx-auto mb-8">
              Share this report with your finance team to initiate these subscription changes.
            </p>
            <div className="flex items-center gap-4">
              <GlowButton size="lg">
                Share Report
                <ArrowRight className="w-5 h-5 ml-2" />
              </GlowButton>
            </div>
          </motion.div>

        </SectionWrapper>
      </div>
    </main>
  );
}
