"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { GlowButton } from "./GlowButton";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when clicking a link
  const handleNavClick = () => {
    setMobileMenuOpen(false);
  };

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
      role="banner"
    >
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl flex items-center justify-between">
        {/* Logo */}
        <Link 
          href="/" 
          className="flex items-center gap-2 group relative z-10"
          aria-label="StackSpend - Home"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-[0_0_15px_rgba(124,58,237,0.5)]">
            <span className="text-white font-bold text-lg leading-none">S</span>
          </div>
          <span className="text-xl font-bold tracking-tight text-foreground hidden sm:inline">
            Stack<span className="text-muted-foreground transition-colors group-hover:text-foreground">Spend</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav 
          className="hidden md:flex items-center gap-8"
          role="navigation"
          aria-label="Main navigation"
        >
          <a 
            href="/#how-it-works" 
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50 rounded px-2 py-1"
          >
            How it works
          </a>
          <a 
            href="/#pricing-logic" 
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50 rounded px-2 py-1"
          >
            Pricing Logic
          </a>
        </nav>

        {/* CTA & Mobile Menu Toggle */}
        <div className="flex items-center gap-4">
          <Link href="/audit">
            <GlowButton 
              size="sm" 
              className="font-semibold hidden sm:flex"
              aria-label="Start free AI audit"
            >
              Run Audit
            </GlowButton>
          </Link>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-card/50 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.nav
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="md:hidden border-t border-border/50 bg-background/95 backdrop-blur-md"
          role="navigation"
          aria-label="Mobile navigation"
        >
          <div className="container mx-auto px-4 py-4 space-y-3">
            <a
              href="/#how-it-works"
              onClick={handleNavClick}
              className="block text-sm font-medium text-muted-foreground hover:text-foreground transition-colors px-2 py-2 rounded focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              How it works
            </a>
            <a
              href="/#pricing-logic"
              onClick={handleNavClick}
              className="block text-sm font-medium text-muted-foreground hover:text-foreground transition-colors px-2 py-2 rounded focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              Pricing Logic
            </a>
            <Link href="/audit" onClick={handleNavClick} className="block">
              <GlowButton size="sm" className="w-full font-semibold">
                Run Audit
              </GlowButton>
            </Link>
          </div>
        </motion.nav>
      )}
    </motion.header>
  );
}
