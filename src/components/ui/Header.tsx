"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, FileText, Sparkles, Menu, X, Mail } from "lucide-react";
import confetti from "canvas-confetti";

import { openContactModal } from "@/components/ui/ContactModal";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const triggerCelebration = () => {
    confetti({
      particleCount: 60,
      spread: 60,
      origin: { y: 0.15 },
      colors: ["#fcee0a", "#00f0ff", "#ff003c"],
    });
  };

  const handleLetsTalk = () => {
    triggerCelebration();
    openContactModal();
  };

  const navLinks = [
    { name: "01 // WORK", href: "#work" },
    { name: "02 // EXPERIENCE", href: "#experience" },
    { name: "03 // STACK", href: "#stats" },
    { name: "04 // ABOUT", href: "#about" },
    { name: "05 // CONTACT", href: "#contact" },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-8 py-5 pointer-events-none">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Brand Logo */}
          <motion.a
            href="#top"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="pointer-events-auto flex items-center gap-2 px-4 py-2 rounded-xl glass-panel glass-panel-hover border border-white/10 hover:border-[#fcee0a]/60 glitch-hover"
          >
            <span className="w-2 h-2 rounded-full bg-[#fcee0a] animate-pulse shadow-[0_0_8px_#fcee0a]" />
            <span className="font-mono text-xs sm:text-sm font-bold tracking-wider text-white uppercase">
              realcyclopse<span className="text-[#fcee0a]">.</span>
            </span>
          </motion.a>

          {/* Desktop Center Nav */}
          <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="hidden md:flex pointer-events-auto items-center gap-1 p-1.5 rounded-xl glass-panel border border-white/10"
          >
            {navLinks.slice(0, 4).map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="px-4 py-1.5 rounded-lg text-xs font-mono text-zinc-300 hover:text-[#fcee0a] hover:bg-white/5 transition-colors font-medium tracking-wider"
              >
                {item.name}
              </a>
            ))}
          </motion.nav>

          {/* Right Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="pointer-events-auto flex items-center gap-2"
          >
            <Link
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl glass-panel glass-panel-hover text-xs font-mono text-zinc-200 hover:text-[#fcee0a] border border-white/10 hover:border-[#fcee0a]/40"
            >
              <FileText className="w-3.5 h-3.5 text-[#fcee0a]" />
              <span className="hidden sm:inline font-medium">RESUME</span>
            </Link>

            <button
              onClick={handleLetsTalk}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#fcee0a] hover:bg-white text-black font-bold text-xs font-mono transition-all transform hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(252,238,10,0.5)] border border-[#fcee0a]"
            >
              <Mail className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>LET&apos;S TALK</span>
              <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-full glass-panel text-white border border-white/10"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </motion.div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-4 top-20 z-40 p-6 rounded-3xl glass-panel border border-white/15 md:hidden space-y-4 shadow-2xl bg-[#0e1017]/95 backdrop-blur-2xl"
          >
            <div className="flex flex-col space-y-2">
              {navLinks.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-3 rounded-xl text-sm font-mono text-zinc-200 hover:bg-white/10 transition-colors flex items-center justify-between"
                >
                  <span>{item.name}</span>
                  <ArrowUpRight className="w-4 h-4 text-[#00f0ff]" />
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
