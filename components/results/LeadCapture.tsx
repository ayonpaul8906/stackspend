"use client";

import React, { useState } from "react";
import { GlassCard } from "../shared/GlassCard";
import { GlowButton } from "../shared/GlowButton";
import { Send, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

interface Props {
  auditId: string;
  totalSavings: number;
}

export function LeadCapture({ auditId, totalSavings }: Props) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [honey, setHoney] = useState(""); // Honeypot for simple bot protection
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // If honeypot is filled, simulate success silently to fool bots (or aggressive autofill)
    if (honey) {
      setStatus("success");
      toast.success("Audit delivered successfully!");
      return;
    }
    
    setStatus("loading");
    try {
      const res = await fetch("/api/send-audit-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ auditId, email, name, role, honey }),
      });
      
      const data = await res.json();
      
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to submit request.");
      }
      
      setStatus("success");
      setEmail("");
      setName("");
      setRole("");
      toast.success("Audit delivered successfully!");
    } catch (error) {
      setStatus("error");
      const message = error instanceof Error ? error.message : "Something went wrong. Please try again.";
      toast.error(message);
    }
  };

  const highSavings = totalSavings > 6000;

  if (status === "success") {
    return (
      <GlassCard className="p-10 text-center flex flex-col items-center justify-center bg-primary/5 border-primary/20">
        <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center mb-4">
          <CheckCircle2 className="w-8 h-8 text-emerald-500" />
        </div>
        <h3 className="text-2xl font-bold text-foreground mb-2">Audit Delivered</h3>
        <p className="text-muted-foreground">We&apos;ve sent the complete report to your inbox. You&apos;ll hear from us shortly.</p>
      </GlassCard>
    );
  }

  return (
    <GlassCard className="p-8 lg:p-10 relative overflow-hidden group border-primary/20 bg-gradient-to-b from-card to-primary/5">
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />

      <div className="relative z-10 max-w-xl mx-auto text-center mb-8">
        <h3 className="text-3xl font-bold text-foreground mb-4">
          {highSavings ? "Talk to Credex" : "Get notified when new optimizations apply"}
        </h3>
        <p className="text-lg text-muted-foreground">
          {highSavings 
            ? "Your stack shows significant optimization potential. Let our experts help you execute these changes seamlessly."
            : "The AI landscape moves fast. Drop your email to get this audit delivered and stay updated on new cost-saving opportunities."}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="relative z-10 max-w-md mx-auto space-y-4">
        {/* Honeypot field - hidden from users but visible to bots */}
        <input
          type="text"
          name="bot_trap_field"
          value={honey}
          onChange={(e) => setHoney(e.target.value)}
          className="opacity-0 absolute -left-[9999px] top-0"
          tabIndex={-1}
          autoComplete="off"
        />

        <div>
          <input
            type="email"
            required
            placeholder="Work Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-background/80 border border-border rounded-xl h-12 px-4 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all backdrop-blur-sm"
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Company (optional)"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-background/80 border border-border rounded-xl h-12 px-4 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all backdrop-blur-sm"
          />
          <input
            type="text"
            placeholder="Role (optional)"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full bg-background/80 border border-border rounded-xl h-12 px-4 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all backdrop-blur-sm"
          />
        </div>

        {status === "error" && (
          <p className="text-sm text-destructive text-center">Something went wrong. Please try again.</p>
        )}

        <GlowButton
          type="submit"
          className="w-full h-12 mt-2"
          disabled={status === "loading"}
        >
          {status === "loading" ? "Saving..." : "Send Audit to Inbox"}
          {!status && <Send className="w-4 h-4 ml-2" />}
        </GlowButton>
      </form>
    </GlassCard>
  );
}
