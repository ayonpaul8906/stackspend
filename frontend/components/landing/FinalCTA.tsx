"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function FinalCTA() {
  return (
    <section className="w-full border-t border-white/[0.06] py-32 lg:py-40">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs font-medium tracking-[0.2em] uppercase text-zinc-500 mb-8">
            Get started
          </p>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-zinc-100 leading-[1.05] mb-6">
            Your AI stack probably grew faster than your visibility into it.
          </h2>
          <p className="text-lg text-zinc-400 max-w-xl mx-auto mb-12 leading-relaxed">
            Most teams find significant savings within the first audit. No integrations required.
          </p>

          <Link href="/audit">
            <motion.button
              whileHover={{ opacity: 0.9 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-lg bg-zinc-100 text-zinc-900 text-base font-semibold transition-all duration-200 hover:bg-white"
            >
              Run Free Audit
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </Link>

          <p className="mt-5 text-xs text-zinc-600">
            No account required · Takes 90 seconds · Deterministic output
          </p>
        </motion.div>
      </div>
    </section>
  );
}
