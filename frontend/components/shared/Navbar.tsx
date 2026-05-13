// Navbar.tsx
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Menu, X, ArrowRight } from "lucide-react";

const NAV_LINKS = [
  { label: "How it works", href: "/#how-it-works" },
  { label: "The Problem", href: "/#the-problem" },
  { label: "Examples", href: "/#optimization-examples" },
  { label: "Logic", href: "/#pricing-logic" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Only show full nav on the landing page
  const isLanding = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = () => setMobileMenuOpen(false);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b",
        scrolled
          ? "bg-[#050505]/90 backdrop-blur-md border-white/[0.07] py-3"
          : "bg-transparent border-transparent py-5"
      )}
      role="banner"
    >
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl flex items-center justify-between">
        {/* Logo — always visible */}
        <Link
          href="/"
          className="flex items-center gap-2.5 group flex-shrink-0"
          aria-label="StackSpend - Home"
        >
          <div className="relative w-8 h-8 overflow-hidden rounded-md transition-colors">
            <Image
              src="/logo.png"
              alt="StackSpend"
              fill
              sizes="28px"
              className="object-cover"
              priority
            />
          </div>
          <span className="text-sm font-semibold tracking-tight text-zinc-200 hidden sm:inline">
            Stack<span className="text-green-300 group-hover:text-green-400 transition-color">Spend</span>
          </span>
        </Link>

        {/* Desktop Navigation — only on landing */}
        {isLanding && (
          <nav
            className="hidden md:flex items-center gap-6"
            role="navigation"
            aria-label="Main navigation"
          >
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-zinc-500 hover:text-zinc-200 transition-colors duration-150 focus:outline-none whitespace-nowrap"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        )}

        {/* Right side */}
        <div className="flex items-center gap-3">
          {/* Run Audit CTA — only on landing */}
          {isLanding && (
            <Link href="/audit" className="hidden sm:block">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-zinc-100 text-zinc-900 text-sm font-semibold transition-all duration-200 hover:bg-white cursor-pointer"
                aria-label="Start free AI audit"
              >
                Run Audit
                <ArrowRight className="w-3.5 h-3.5" />
              </motion.button>
            </Link>
          )}

          {/* On non-landing pages, show a subtle "Back to home" or nothing */}
          {!isLanding && (
            <Link
              href="/"
              className="text-sm text-zinc-500 hover:text-zinc-300 transition-colors hidden sm:inline"
            >
              ← Home
            </Link>
          )}

          {/* Mobile menu button — only on landing */}
          {isLanding && (
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-zinc-500 hover:text-zinc-300 hover:bg-white/[0.05] transition-colors focus:outline-none"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          )}
        </div>
      </div>

      {/* Mobile Menu — only on landing */}
      {isLanding && mobileMenuOpen && (
        <motion.nav
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          className="md:hidden border-t border-white/[0.06] bg-[#050505]/95 backdrop-blur-md"
          role="navigation"
          aria-label="Mobile navigation"
        >
          <div className="container mx-auto px-4 py-5 space-y-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={handleNavClick}
                className="block text-sm font-medium text-zinc-500 hover:text-zinc-200 transition-colors px-3 py-2.5 rounded-lg hover:bg-white/[0.04]"
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-2">
              <Link href="/audit" onClick={handleNavClick}>
                <button className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg bg-zinc-100 text-zinc-900 text-sm font-semibold hover:bg-white transition-colors">
                  Run Free Audit
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </Link>
            </div>
          </div>
        </motion.nav>
      )}
    </motion.header>
  );
}
