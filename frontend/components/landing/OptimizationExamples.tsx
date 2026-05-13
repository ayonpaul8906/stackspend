"use client";

import React from "react";
import { motion } from "framer-motion";
import { SectionWrapper } from "../shared/SectionWrapper";

const BEFORE = [
  { tool: "ChatGPT Team", seats: 9, cost: 270, status: "active" },
  { tool: "Claude Pro", seats: 9, cost: 180, status: "active" },
  { tool: "Cursor Business", seats: 9, cost: 360, status: "active" },
  { tool: "GitHub Copilot", seats: 9, cost: 189, status: "active" },
  { tool: "OpenAI API", seats: null, cost: 481, status: "active" },
];

const AFTER = [
  { tool: "ChatGPT Team", seats: 6, cost: 180, action: "Reduce to 6 active seats", flag: "seats" },
  { tool: "Claude Pro", seats: null, cost: 0, action: "Cancel — overlap with ChatGPT", flag: "cancel" },
  { tool: "Cursor Business", seats: 5, cost: 200, action: "Reduce to 5 active seats", flag: "seats" },
  { tool: "GitHub Copilot", seats: null, cost: 0, action: "Cancel — Cursor includes AI", flag: "cancel" },
  { tool: "OpenAI API", seats: null, cost: 240, action: "Set monthly budget cap $240", flag: "cap" },
];

export function OptimizationExamples() {
  const beforeTotal = BEFORE.reduce((s, i) => s + i.cost, 0);
  const afterTotal = AFTER.reduce((s, i) => s + i.cost, 0);
  const savings = beforeTotal - afterTotal;
  const annualSavings = savings * 12;

  return (
    <SectionWrapper
      id="optimization-examples"
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
            Optimization Example
          </p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-zinc-100 leading-[1.1]">
            9-person engineering team.
          </h2>
          <p className="mt-4 text-zinc-400 text-lg">
            Audit identified{" "}
            <span className="text-emerald-400 font-semibold">
              ${savings.toLocaleString()}/mo
            </span>{" "}
            in recoverable spend.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Before */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-xl border border-white/[0.07] overflow-hidden"
          >
            <div className="px-5 py-4 border-b border-white/[0.06] flex items-center justify-between bg-white/[0.01]">
              <span className="text-xs font-mono tracking-widest uppercase text-zinc-500">
                Before Audit
              </span>
              <span className="text-base font-semibold tabular-nums text-zinc-300">
                ${beforeTotal.toLocaleString()}<span className="text-zinc-500 text-xs font-normal">/mo</span>
              </span>
            </div>
            <div className="divide-y divide-white/[0.04]">
              {BEFORE.map((row) => (
                <div
                  key={row.tool}
                  className="flex items-center justify-between px-5 py-3.5 bg-[#0a0a0a]"
                >
                  <div>
                    <p className="text-sm font-medium text-zinc-300">{row.tool}</p>
                    {row.seats && (
                      <p className="text-xs text-zinc-600 mt-0.5">
                        {row.seats} seats
                      </p>
                    )}
                  </div>
                  <span className="text-sm tabular-nums text-zinc-400">
                    ${row.cost}/mo
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* After */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="rounded-xl border border-white/[0.07] overflow-hidden"
          >
            <div className="px-5 py-4 border-b border-white/[0.06] flex items-center justify-between bg-white/[0.01]">
              <span className="text-xs font-mono tracking-widest uppercase text-zinc-500">
                After Optimization
              </span>
              <span className="text-base font-semibold tabular-nums text-emerald-400">
                ${afterTotal.toLocaleString()}<span className="text-zinc-500 text-xs font-normal font-sans">/mo</span>
              </span>
            </div>
            <div className="divide-y divide-white/[0.04]">
              {AFTER.map((row) => (
                <div
                  key={row.tool}
                  className="flex items-start justify-between px-5 py-3.5 bg-[#0a0a0a]"
                >
                  <div className="flex-1 mr-4">
                    <p
                      className={`text-sm font-medium ${
                        row.flag === "cancel" ? "line-through text-zinc-600" : "text-zinc-300"
                      }`}
                    >
                      {row.tool}
                    </p>
                    <p
                      className={`text-xs mt-0.5 ${
                        row.flag === "cancel"
                          ? "text-red-500/70"
                          : row.flag === "cap"
                          ? "text-amber-500/70"
                          : "text-emerald-500/70"
                      }`}
                    >
                      {row.action}
                    </p>
                  </div>
                  <span
                    className={`text-sm tabular-nums flex-shrink-0 ${
                      row.cost === 0 ? "text-zinc-600 line-through" : "text-zinc-400"
                    }`}
                  >
                    {row.cost === 0 ? "Cancelled" : `$${row.cost}/mo`}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Summary Row */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-6 grid grid-cols-3 gap-4"
        >
          {[
            { label: "Monthly savings", value: `$${savings.toLocaleString()}` },
            { label: "Annual savings", value: `$${annualSavings.toLocaleString()}` },
            { label: "Reduction", value: `${Math.round((savings / beforeTotal) * 100)}%` },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-lg border border-white/[0.06] bg-white/[0.01] px-5 py-4 text-center"
            >
              <p className="text-2xl font-bold tabular-nums text-emerald-400">
                {stat.value}
              </p>
              <p className="text-xs text-zinc-500 mt-1">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
