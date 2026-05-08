"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { GlowButton } from "./GlowButton";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b",
        scrolled 
          ? "bg-background/80 backdrop-blur-md border-border/50 py-4 shadow-sm" 
          : "bg-transparent border-transparent py-6"
      )}
    >
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group relative z-10">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-[0_0_15px_rgba(124,58,237,0.5)]">
            <span className="text-white font-bold text-lg leading-none">S</span>
          </div>
          <span className="text-xl font-bold tracking-tight text-foreground">
            Stack<span className="text-muted-foreground transition-colors group-hover:text-foreground">Spend</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <Link href="#how-it-works" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            How it works
          </Link>
          <Link href="#pricing-logic" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Pricing Logic
          </Link>
        </nav>

        {/* CTAs */}
        <Link href="/audit">
        <div className="flex items-center gap-4">
          <GlowButton size="sm" className="font-semibold">
            Run Audit
          </GlowButton>
        </div>
        </Link>
      </div>
    </motion.header>
  );
}
