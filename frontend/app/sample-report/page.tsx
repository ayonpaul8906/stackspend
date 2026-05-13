"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, AlertCircle } from "lucide-react";

export default function SampleReportPage() {
  const router = useRouter();
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = code.trim();

    if (!trimmed) {
      setError("Please enter a report code.");
      return;
    }

    // Validate format — StackSpend report codes are UUID-style identifiers
    if (!/^[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}$/.test(trimmed)) {
      setError("That doesn't look like a valid report code. Check for extra spaces or characters.");
      return;
    }

    setError("");
    setLoading(true);

    // Navigate to the results page — it will 404 if the ID doesn't exist
    router.push(`/results/${trimmed}`);
  };

  return (
    <main className="flex min-h-screen flex-col bg-[#050505]">
      {/* Minimal nav */}
      <div className="fixed top-0 left-0 right-0 z-50 border-b border-white/6 py-4">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl flex items-center justify-between">
          <a href="/" className="flex items-center gap-2.5 group">
            <div className="relative w-7 h-7 overflow-hidden rounded-md border border-white/10 bg-zinc-900">
              <Image src="/logo.png" alt="StackSpend" fill sizes="28px" className="object-cover" priority />
            </div>
            <span className="text-sm font-semibold text-zinc-200 hidden sm:inline">
              Stack<span className="text-zinc-500">Spend</span>
            </span>
          </a>
          <a href="/" className="text-sm text-zinc-500 hover:text-zinc-300 transition-colors">
            ← Home
          </a>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-1 items-center justify-center px-4 pt-20">
        <div className="w-full max-w-md">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Header */}
            <div className="mb-10 text-center">
              <div className="relative inline-flex w-12 h-12 overflow-hidden rounded-xl border border-white/10 bg-zinc-900 mb-5">
                <Image src="/logo.png" alt="StackSpend" fill sizes="48px" className="object-cover" priority />
              </div>
              <h1 className="text-3xl font-bold tracking-tight text-zinc-100 mb-3">
                View Audit Report
              </h1>
              <p className="text-sm text-zinc-500 leading-relaxed">
                Paste a StackSpend report code to view an existing audit. Report codes are shared by your team or sent via email after your audit.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="report-code"
                  className="block text-xs font-medium text-zinc-500 mb-2 tracking-wide uppercase"
                >
                  Report Code
                </label>
                <input
                  id="report-code"
                  type="text"
                  value={code}
                  onChange={(e) => {
                    setCode(e.target.value);
                    setError("");
                  }}
                  placeholder="e.g. abc123xyz"
                  autoFocus
                  spellCheck={false}
                  autoComplete="off"
                  className={`w-full px-4 py-3.5 rounded-xl bg-zinc-900 border text-zinc-200 text-sm font-mono placeholder:text-zinc-700 focus:outline-none focus:ring-1 transition-all ${
                    error
                      ? "border-red-500/50 focus:ring-red-500/30"
                      : "border-white/9 focus:border-white/20 focus:ring-white/10"
                  }`}
                />
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-1.5 mt-2"
                  >
                      <AlertCircle className="w-3.5 h-3.5 text-red-400 shrink-0" />
                    <p className="text-xs text-red-400">{error}</p>
                  </motion.div>
                )}
              </div>

              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className="w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-xl bg-zinc-100 text-zinc-900 text-sm font-semibold hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-zinc-900/30 border-t-zinc-900 rounded-full animate-spin" />
                    Loading report…
                  </>
                ) : (
                  <>
                    View Report
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </motion.button>
            </form>

            {/* Divider */}
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/6" />
              </div>
              <div className="relative flex justify-center">
                <span className="bg-[#050505] px-3 text-xs text-zinc-600">or</span>
              </div>
            </div>

            {/* Run new audit */}
            <a
              href="/audit"
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl border border-white/9 text-zinc-400 text-sm font-medium hover:border-white/18 hover:text-zinc-200 transition-all"
            >
              Run a new audit instead
              <ArrowRight className="w-3.5 h-3.5" />
            </a>

            <p className="text-center text-xs text-zinc-700 mt-6">
              Report codes expire after 90 days · No account required
            </p>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
