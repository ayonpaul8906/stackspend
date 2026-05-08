"use client";

import React from "react";
import { motion } from "framer-motion";
import { SectionWrapper } from "../shared/SectionWrapper";
import { GlowButton } from "../shared/GlowButton";
import { MetricCard } from "../shared/MetricCard";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function Hero() {
  return (
    <SectionWrapper className="pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
      <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-8">
        
        {/* Text Content */}
        <div className="flex-1 flex flex-col items-start text-left z-10 w-full max-w-3xl">

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground leading-[1.1] mb-6"
          >
            Stop Overspending on <br className="hidden md:block" />
            <span className="text-gradient">AI Tools</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-muted-foreground mb-8 max-w-2xl leading-relaxed"
          >
            Audit your ChatGPT, Claude, Cursor, and API spend in under 60 seconds. Identify duplicate subscriptions, unused seats, and optimize your team&apos;s usage.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
          >
            <Link href="/audit">
            <GlowButton size="lg" className="w-full sm:w-auto text-lg">
              Run Free Audit
              <ArrowRight className="w-5 h-5 ml-2" />
            </GlowButton>
            </Link>
            <Link href="/sample-report">
            <GlowButton variant="outline" size="lg" className="w-full sm:w-auto text-lg">
              View Sample Report
            </GlowButton>
            </Link>
          </motion.div>
        </div>

        {/* Visual / Interactive Element */}
        <div className="flex-1 w-full max-w-lg lg:max-w-none relative z-10">
          <div className="relative w-full aspect-square md:aspect-auto md:h-[600px] flex items-center justify-center">
            {/* Background Glows for visual */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/20 rounded-full blur-[80px]" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-secondary/20 rounded-full blur-[60px] translate-x-10 -translate-y-10" />
            
            <div className="relative w-full max-w-md mx-auto grid gap-4">
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.2, type: "spring" }}
              >
                <MetricCard
                  title="Average Annual Savings"
                  value="$2,300"
                  trend="18% of total spend"
                  trendUp={false}
                  delay={0.2}
                  className="shadow-xl shadow-primary/5"
                />
              </motion.div>
              
              <div className="grid grid-cols-2 gap-4">
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.4, type: "spring" }}
                >
                  <MetricCard
                    title="Idle ChatGPT Seats"
                    value="14"
                    trend="Cancel 5"
                    trendUp={false}
                    delay={0.4}
                  />
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.6, type: "spring" }}
                >
                  <MetricCard
                    title="OpenAI API Usage"
                    value="$842/mo"
                    trend="Normal"
                    trendUp={true}
                    delay={0.6}
                  />
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
