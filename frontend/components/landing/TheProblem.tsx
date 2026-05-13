"use client";

import React from "react";
import { motion } from "framer-motion";
import { SectionWrapper } from "../shared/SectionWrapper";

const problems = [
  {
    number: "01",
    title: "Engineers expense tools independently",
    body: "No central procurement. Each team member signs up for what they need — ChatGPT, Cursor, Gemini — without visibility into what others already pay for.",
  },
  {
    number: "02",
    title: "Subscriptions overlap silently",
    body: "Claude Pro + OpenAI API both doing summarization. Cursor + Copilot running in the same editor. Duplicated capability, duplicated spend.",
  },
  {
    number: "03",
    title: "Seat counts drift from reality",
    body: "Team shrinks, roles change, but subscription seats stay the same. Idle licenses compound quietly into hundreds of dollars per quarter.",
  },
  {
    number: "04",
    title: "API spend has no circuit breaker",
    body: "Token usage spikes during experiments and stays elevated. No alerts, no baseline, no escalation path. The bill just grows.",
  },
];

export function TheProblem() {
  return (
    <SectionWrapper id="the-problem" className="py-24 lg:py-32 border-t border-white/[0.06]">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <p className="text-xs font-medium tracking-[0.2em] uppercase text-zinc-500 mb-5">
            The Problem
          </p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-zinc-100 leading-[1.1] max-w-2xl">
            AI tooling spend outpaces the visibility into it.
          </h2>
          <p className="mt-5 text-lg text-zinc-400 max-w-xl leading-relaxed">
            Startups adopt AI tools fast — but finance and engineering stay disconnected. The result is fragmented spend no one owns.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-px bg-white/[0.06] rounded-xl overflow-hidden border border-white/[0.06]">
          {problems.map((p, i) => (
            <motion.div
              key={p.number}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="bg-[#090909] p-8 hover:bg-white/[0.02] transition-colors duration-200 group"
            >
              <span className="text-xs font-mono font-semibold text-zinc-600 group-hover:text-zinc-500 transition-colors">
                {p.number}
              </span>
              <h3 className="mt-3 text-base font-semibold text-zinc-200 leading-snug">
                {p.title}
              </h3>
              <p className="mt-2 text-sm text-zinc-500 leading-relaxed">
                {p.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
