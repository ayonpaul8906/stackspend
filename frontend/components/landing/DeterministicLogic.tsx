"use client";

import React from "react";
import { motion } from "framer-motion";
import { SectionWrapper } from "../shared/SectionWrapper";

const rules = [
  "Cursor Business already includes AI completion — Copilot is redundant.",
  "Claude Pro and ChatGPT overlap on long-form synthesis. Recommend one.",
  "3 idle seats detected on ChatGPT Team (last active > 30 days).",
  "OpenAI API spend increased 34% vs prior period with no new features shipped.",
];

export function DeterministicLogic() {
  return (
    <SectionWrapper
      id="pricing-logic"
      className="py-24 lg:py-32 border-t border-white/[0.06]"
    >
      <div className="max-w-5xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-xs font-medium tracking-[0.2em] uppercase text-zinc-500 mb-5">
              How Recommendations Work
            </p>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-zinc-100 leading-[1.1] mb-6">
              Deterministic logic.
              <br />
              Not guesswork.
            </h2>
            <p className="text-zinc-400 leading-relaxed mb-5">
              Every recommendation is generated from a rule-based engine, not a language model. Rules are applied against your stack configuration and produce the same output every time — no probabilistic output, no hallucinated suggestions.
            </p>
            <p className="text-zinc-400 leading-relaxed">
              Each finding is explainable. You can see exactly which rule triggered, what data it evaluated, and why the recommendation was made. Financial decisions require auditability — StackSpend is built around that.
            </p>

            <div className="mt-8 flex flex-col gap-3">
              {[
                "Rule-based, not AI-generated",
                "Every output is traceable",
                "No probabilistic spend advice",
              ].map((point) => (
                <div key={point} className="flex items-center gap-3">
                  <div className="w-1 h-1 rounded-full bg-emerald-500 flex-shrink-0" />
                  <span className="text-sm text-zinc-400">{point}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Rule preview panel */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="rounded-xl border border-white/[0.07] overflow-hidden"
          >
            <div className="px-5 py-3.5 border-b border-white/[0.06] bg-white/[0.01] flex items-center gap-3">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
                <div className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
                <div className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
              </div>
              <span className="text-xs font-mono text-zinc-500">
                audit_engine.rules
              </span>
            </div>

            <div className="divide-y divide-white/[0.04] bg-[#0a0a0a]">
              {rules.map((rule, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: 0.2 + i * 0.07 }}
                  className="px-5 py-4 flex gap-3"
                >
                  <span className="text-xs font-mono text-zinc-600 mt-0.5 flex-shrink-0">
                    R{String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="text-sm text-zinc-400 leading-relaxed">{rule}</p>
                </motion.div>
              ))}
            </div>

            <div className="px-5 py-3.5 border-t border-white/[0.06] bg-white/[0.01]">
              <p className="text-xs font-mono text-zinc-600">
                4 rules applied · 0 probabilistic outputs
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </SectionWrapper>
  );
}
