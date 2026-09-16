"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { ArrowDown, Github, Linkedin, ArrowUpRight } from "lucide-react";

// Dynamically import Three.js scene with ssr: false for smooth client-only rendering
const InteractiveHeroScene = dynamic(() => import("../3d/InteractiveHeroScene"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-8 h-8 rounded-full border border-[#00f0ff] border-t-transparent animate-spin" />
    </div>
  ),
});

export default function Hero() {
  return (
    <section id="top" className="relative min-h-[90vh] flex flex-col justify-between pt-32 pb-12 overflow-hidden cyber-grid-bg">
      {/* Subtle Cyberpunk Ambient Glows */}
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-[#fcee0a]/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute top-1/3 -right-48 w-96 h-96 bg-[#00f0ff]/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[600px] h-32 bg-[#ff003c]/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Main Grid */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center flex-1 my-auto">
        {/* Left Column: Minimal Bio & Headline */}
        <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
          {/* Status Chip */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-lg glass-panel w-fit border border-[#fcee0a]/30 shadow-[0_0_15px_rgba(252,238,10,0.15)]"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#fcee0a] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#fcee0a]" />
            </span>
            <span className="text-xs font-mono text-[#fcee0a] font-bold tracking-wider uppercase">
              SYS.ONLINE // Open for Opportunities
            </span>
          </motion.div>

          {/* Headline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-2"
          >
            <h1 className="text-4xl sm:text-6xl font-light tracking-tight text-white leading-[1.1]">
              Hi, I&apos;m{" "}
              <span className="font-bold text-[#fcee0a] hover:text-white glitch-hover transition-colors inline-block cursor-default tracking-wide drop-shadow-[0_0_18px_rgba(252,238,10,0.35)]">
                Abhinav Kataria
              </span>.
            </h1>
            <h2 className="text-xl sm:text-3xl font-normal text-zinc-300 tracking-tight">
              Full-stack developer building real-time systems &amp; clean web apps.
            </h2>
          </motion.div>

          {/* Minimal Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-sm sm:text-base text-zinc-300 max-w-xl leading-relaxed font-sans"
          >
            Computer Science student at <span className="text-[#fcee0a] font-semibold">BIT Mesra</span>. I like building fast, reliable backends, interactive maps, and responsive user interfaces.
          </motion.p>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap items-center gap-4 pt-2"
          >
            <a
              href="#work"
              className="px-6 py-3 rounded-xl bg-[#fcee0a] hover:bg-white text-black font-bold text-xs sm:text-sm font-mono flex items-center gap-2 transition-all transform hover:scale-105 active:scale-95 shadow-[0_0_25px_rgba(252,238,10,0.45)] border border-[#fcee0a]"
            >
              <span>EXPLORE WORK</span>
              <ArrowDown className="w-4 h-4 stroke-[2.5]" />
            </a>

            <a
              href="https://github.com/realcyclopse"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-xl glass-panel glass-panel-hover text-zinc-300 hover:text-[#fcee0a] border border-white/10 hover:border-[#fcee0a]/40 transition-colors"
              aria-label="GitHub Profile"
            >
              <Github className="w-5 h-5" />
            </a>

            <a
              href="https://linkedin.com/in/realcyclopse"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-xl glass-panel glass-panel-hover text-zinc-300 hover:text-[#00f0ff] border border-white/10 hover:border-[#00f0ff]/40 transition-colors"
              aria-label="LinkedIn Profile"
            >
              <Linkedin className="w-5 h-5" />
            </a>
          </motion.div>
        </div>

        {/* Right Column: 3D Interactive WebGL Stage */}
        <div className="lg:col-span-5 h-[360px] sm:h-[460px] lg:h-[520px] relative flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="w-full h-full relative"
          >
            <InteractiveHeroScene />
          </motion.div>
        </div>
      </div>

      {/* Kinetic Infinite Marquee */}
      <div className="relative w-full overflow-hidden border-y border-[#fcee0a]/20 py-3 bg-[#08090d]/90 backdrop-blur-md mt-12">
        <div className="animate-marquee whitespace-nowrap flex items-center text-xs font-mono tracking-widest text-zinc-400 uppercase select-none">
          <span className="mx-6 text-[#fcee0a] font-bold">ABHINAV KATARIA</span>
          <span className="text-[#00f0ff]">//</span>
          <span className="mx-6">FULL-STACK DEVELOPER</span>
          <span className="text-[#ff003c]">//</span>
          <span className="mx-6">REAL-TIME SYSTEMS</span>
          <span className="text-[#00f0ff]">//</span>
          <span className="mx-6 text-white">BIT MESRA &apos;27</span>
          <span className="text-[#fcee0a]">//</span>
          <span className="mx-6">REACT &amp; FASTAPI</span>
          <span className="text-[#00f0ff]">//</span>
          <span className="mx-6">NODE.JS &amp; TYPESCRIPT</span>
          <span className="text-[#ff003c]">//</span>
          {/* Duplicate set for seamless loop */}
          <span className="mx-6 text-[#fcee0a] font-bold">ABHINAV KATARIA</span>
          <span className="text-[#00f0ff]">//</span>
          <span className="mx-6">FULL-STACK DEVELOPER</span>
          <span className="text-[#ff003c]">//</span>
          <span className="mx-6">REAL-TIME SYSTEMS</span>
          <span className="text-[#00f0ff]">//</span>
          <span className="mx-6 text-white">BIT MESRA &apos;27</span>
          <span className="text-[#fcee0a]">//</span>
          <span className="mx-6">REACT &amp; FASTAPI</span>
          <span className="text-[#00f0ff]">//</span>
          <span className="mx-6">NODE.JS &amp; TYPESCRIPT</span>
          <span className="text-[#ff003c]">//</span>
        </div>
      </div>
    </section>
  );
}
