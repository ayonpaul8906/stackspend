"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Activity, Zap } from "lucide-react";
import Link from "next/link";

/**
 * BRAND ICONS - High fidelity paths
 */
const ToolIcon = ({ tool, className }: { tool: string; className?: string }) => {
  const icons: Record<string, React.ReactNode> = {
    openai: (
      <img src="/OpenAI.png" alt="claude" className="w-14 h-14 " />
    ),
    claude: (      
      <img src="/Claude.png" alt="claude" className="w-14 h-14" />
    ),
    cursor: (
      <img src="/cursor.png" alt="claude" className="w-14 h-14" />
    ),
    gemini: (
      <img src="/Gemini.png" alt="claude" className="w-14 h-14" />
    ),
  };
  return <>{icons[tool] || null}</>;
};

const floatingTools = [
  { tool: "openai", label: "GPT-4o", pos: "top-[18%] left-[15%]", delay: 0 },
  { tool: "claude", label: "Claude 3.5", pos: "top-[28%] right-[14%]", delay: 1.5 },
  { tool: "cursor", label: "Cursor IDE", pos: "bottom-[35%] left-[12%]", delay: 3 },
  { tool: "gemini", label: "Gemini Pro", pos: "bottom-[32%] right-[12%]", delay: 4.5 },
];

const marqueeItems = [
  "NO-INTEGRATION AUDIT",
  "DETERMINISTIC SPEND ANALYSIS",
  "IDLE SEAT DETECTION",
  "SUBSCRIPTION OVERLAP IDENTIFICATION",
  "90-SECOND ANALYSIS ENGINE",
  "STACKSPEND INTELLIGENCE V2.4",
];

export function Hero() {
  return (
    <section className="w-full min-h-screen flex flex-col justify-between pt-32 pb-0 relative bg-[#050505] overflow-hidden">
      
      {/* 1. PREMIUM GRADIENT GRID SYSTEM */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Subtle Diagonal Mesh */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_-20%,rgba(16,185,129,0.1),transparent_80%)]" />
        
        {/* The "Blueprint" Grid - Visible but fades toward edges */}
        <div 
          className="absolute inset-0 opacity-[0.2]" 
          style={{ 
            backgroundImage: `linear-gradient(to right, rgba(16, 185, 129, 0.51) 1px, transparent 1px), linear-gradient(to bottom, rgba(16, 185, 129, 0.51) 1px, transparent 1px)`,    
            backgroundSize: '100px 100px',
            maskImage: 'radial-gradient(circle at center, black 30%, transparent 90%)',
            WebkitMaskImage: 'radial-gradient(circle at center, black 30%, transparent 90%)'
          }}  
        />
        
        {/* Top Highlight Beam */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[2px] bg-gradient-to-r from-transparent via-primary/40 to-transparent blur-[1px]" />
      </div>

      {/* 2. FLOATING ASSETS - High Contrast */}
      {floatingTools.map(({ tool, label, pos, delay }) => (
        <motion.div
          key={tool}
          className={`absolute ${pos} z-10 hidden xl:flex flex-col items-center gap-3 group`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay }}
            className=" rounded-2xl bg-gradient-to-br from-white/10 via-transparent to-white/5 shadow-2xl"
          >
            <div className="rounded-2xl bg-[#080808] border border-white/[0.03] transition-all duration-500 group-hover:border-primary/20 shadow-inner">
              <ToolIcon tool={tool} className="w-6 h-6 text-zinc-500 group-hover:text-primary transition-colors" />
            </div>
          </motion.div>
        </motion.div>
      ))}

      {/* 3. CORE INTERFACE */}
      <div className="container mx-auto px-6 relative z-20 text-center flex-1 flex flex-col justify-center">

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl font-bold tracking-tight text-white leading-[1.05] mb-6"
        >
          AI spend optimization <br />
          <span className="text-zinc-600 font-medium">for engineering teams.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-lg text-zinc-500 mb-14 max-w-lg mx-auto leading-relaxed"
        >
          Audit ChatGPT, Claude, and API spend. Identify cost leaks 
          and redundant tools in under 90 seconds.
        </motion.p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <Link href="/audit">
            <motion.button 
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="h-14 px-10 rounded-xl bg-primary text-primary-foreground font-black text-xs uppercase tracking-widest transition-all shadow-[0_10px_40px_-10px_rgba(16,185,129,0.3)] flex items-center gap-3 cursor-pointer"
            >
              Start Free Audit
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </Link>
          <Link href="/sample-report">
            <button className="h-14 px-10 rounded-xl bg-white/[0.02] border border-white/10 text-zinc-400 font-bold text-xs uppercase tracking-widest hover:bg-white/[0.05] hover:text-white transition-all cursor-pointer">
              View Report
            </button>
          </Link>
        </div>

        {/* METRICS ROW */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-3 gap-20 border-t border-white/[0.05] pt-16 max-w-2xl mx-auto w-full">
          {[
            { label: "Avg. Savings", val: "$12.4k" },
            { label: "Audit Latency", val: "88.2s" },
            { label: "Accuracy", val: "100%" },
          ].map((stat, i) => (
            <div key={i} className="flex flex-col gap-1 items-center md:items-start">
              <span className="text-2xl font-semibold text-white tabular-nums">{stat.val}</span>
              <span className="text-[8px] uppercase tracking-[0.3em] font-bold text-zinc-700">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 4. TICKER CAROUSEL - FINTECH STYLE */}
      <div className="w-full border-t border-white/[0.05] bg-[#050505] py-10 mt-10 relative overflow-hidden group">
        <div className="flex w-fit animate-marquee grayscale opacity-30 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-1000">
          {[...marqueeItems, ...marqueeItems].map((item, idx) => (
            <div key={idx} className="flex items-center gap-6 px-16 whitespace-nowrap">
              <div className="w-1 h-1 rounded-full bg-primary" />
              <span className="text-[10px] font-bold text-zinc-100 uppercase tracking-[0.4em] italic">
                {item}
              </span>
            </div>
          ))}
        </div>
        
        {/* Edge Blur */}
        <div className="absolute inset-y-0 left-0 w-64 bg-gradient-to-r from-[#050505] via-[#050505]/80 to-transparent z-10" />
        <div className="absolute inset-y-0 right-0 w-64 bg-gradient-to-l from-[#050505] via-[#050505]/80 to-transparent z-10" />
      </div>

      <style jsx global>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 45s linear infinite;
        }
      `}</style>
    </section>
  );
}