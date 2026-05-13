"use client";

import React from "react";
import { motion } from "framer-motion";
import { SectionWrapper } from "../shared/SectionWrapper";

const steps = [
  {
    step: "01",
    title: "Add your AI stack",
    body: "Enter your tools and team size. No integrations, no API keys. Input takes under 90 seconds.",
    label: "Input",
  },
  {
    step: "02",
    title: "Analyze duplicate spend",
    body: "Our deterministic engine cross-references tools, seat counts, and overlapping capabilities against your stated usage.",
    label: "Analysis",
  },
  {
    step: "03",
    title: "Generate optimization report",
    body: "Receive a line-item report with specific cancellation and consolidation recommendations, with projected annual savings.",
    label: "Output",
  },
];

export function HowItWorks() {
  return (
    <SectionWrapper
      id="how-it-works"
      className="py-24 lg:py-32 border-t border-white/[0.06]"
    >
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <p className="text-xs font-medium tracking-[0.2em] uppercase text-zinc-500 mb-5">
            How It Works
          </p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-zinc-100 leading-[1.1]">
            Three steps to a clear picture.
          </h2>
        </motion.div>

        <div className="relative">
          {/* Connector line */}
          <div className="hidden md:block absolute top-7 left-[3.25rem] right-0 h-px bg-white/[0.06]" />

          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((s, i) => (
              <motion.div
                key={s.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative group"
              >
                <div className="flex items-center gap-4 mb-5">
                  <div className="flex-shrink-0 w-7 h-7 rounded-full bg-[#0d0d0d] border border-white/[0.1] flex items-center justify-center relative z-10">
                    <span className="text-[10px] font-mono font-bold text-zinc-400">
                      {s.step}
                    </span>
                  </div>
                  <span className="text-[10px] font-medium tracking-widest uppercase text-zinc-600 group-hover:text-zinc-500 transition-colors">
                    {s.label}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-zinc-200 mb-2 leading-snug">
                  {s.title}
                </h3>
                <p className="text-sm text-zinc-500 leading-relaxed">{s.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
