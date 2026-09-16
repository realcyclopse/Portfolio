"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Github, Code2, Lock, Radio } from "lucide-react";

export default function ProjectsSection() {
  return (
    <section id="work" className="py-24 px-4 sm:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-[#fcee0a]/20 gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#fcee0a] uppercase tracking-wider mb-2 font-bold">
            <Code2 className="w-3.5 h-3.5" />
            <span>01 // Selected Work</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-light tracking-tight text-white uppercase">
            Featured <span className="font-bold text-[#fcee0a]">Projects</span>
          </h2>
        </div>
      </div>

      {/* Projects List */}
      <div className="space-y-6">
        {/* Project 1: NexRoute */}
        <motion.div
          whileHover={{ scale: 1.015 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          onClick={() => window.open("https://nexrouted.vercel.app", "_blank")}
          className="group relative p-6 sm:p-8 rounded-xl glass-panel border border-white/10 hover:border-[#00f0ff]/70 transition-colors cursor-pointer"
        >
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-3 flex-1">
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-xs font-mono font-bold text-[#00f0ff]">01</span>
                <span className="inline-flex items-center gap-1.5 text-xs font-mono px-2.5 py-0.5 rounded-md bg-cyan-950/60 text-[#00f0ff] border border-[#00f0ff]/40 font-medium">
                  <Radio className="w-3 h-3 text-[#00f0ff] animate-pulse" />
                  Real-Time Platform
                </span>
                <span className="inline-flex items-center gap-1 text-xs font-mono font-bold text-[#fcee0a] tracking-wide animate-pulse bg-yellow-950/60 px-3 py-0.5 rounded-md border border-[#fcee0a]/50 shadow-[0_0_12px_rgba(252,238,10,0.3)]">
                  (ITS LIVE CHECK IT OUT!)
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-semibold text-white group-hover:text-[#00f0ff] glitch-hover transition-colors flex items-center gap-3">
                NexRoute
                <ArrowUpRight className="w-5 h-5 text-zinc-400 group-hover:text-[#00f0ff] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform stroke-[2.5]" />
              </h3>

              <p className="text-sm text-zinc-300 max-w-2xl leading-relaxed font-sans">
                A real-time delivery partner allocation platform. Uses a weighted scoring model over H3 spatial indexing to match orders to riders with live WebSocket simulation and dynamic routing.
              </p>

              <div className="flex flex-wrap gap-2 pt-2">
                {["React 18", "Node.js", "Express", "Socket.IO", "Mapbox GL", "MongoDB", "H3 Indexing"].map((tag) => (
                  <span
                    key={tag}
                    className="text-[11px] font-mono px-2.5 py-1 rounded-md bg-white/5 text-zinc-300 border border-white/10 group-hover:border-[#00f0ff]/30 transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* GitHub Source Button */}
            <div className="flex items-center lg:self-end">
              <a
                href="https://github.com/realcyclopse/NexRoute-Delivery-Allocation-Engine"
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => {
                  e.stopPropagation();
                }}
                className="flex items-center gap-2 px-4 py-2 rounded-lg glass-panel hover:bg-white/15 text-white text-xs font-mono transition-colors border border-white/10 hover:border-[#00f0ff]/60"
              >
                <Github className="w-4 h-4 text-[#00f0ff]" />
                <span className="font-semibold">Source Code</span>
                <ArrowUpRight className="w-3 h-3 text-zinc-400 stroke-[2.5]" />
              </a>
            </div>
          </div>
        </motion.div>

        {/* Project 2: Enterprise AI Chatbot Engine */}
        <motion.div
          whileHover={{ scale: 1.015 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="group relative p-6 sm:p-8 rounded-xl glass-panel border border-white/10 hover:border-[#ff003c]/70 transition-colors"
        >
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-3 flex-1">
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-xs font-mono font-bold text-[#ff003c]">02</span>
                <span className="inline-flex items-center gap-1.5 text-xs font-mono px-2.5 py-0.5 rounded-md bg-red-950/60 text-[#ff003c] border border-[#ff003c]/40 font-medium">
                  Internship Project • Jakson Group
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-semibold text-white group-hover:text-[#ff003c] glitch-hover transition-colors flex items-center gap-3">
                Enterprise AI Chatbot Engine
              </h3>

              <p className="text-sm text-zinc-300 max-w-2xl leading-relaxed font-sans">
                An internal enterprise AI chatbot providing secure, authenticated Q&amp;A across corporate employee portals (HRMS, LMS) with strict zero-PII leakage guarantees before querying external LLMs.
              </p>

              <div className="flex flex-wrap gap-2 pt-2">
                {["FastAPI", "Python", "sentence-transformers", "SQL", "pyodbc", "Uvicorn", "PII Redaction"].map((tag) => (
                  <span
                    key={tag}
                    className="text-[11px] font-mono px-2.5 py-1 rounded-md bg-white/5 text-zinc-300 border border-white/10 group-hover:border-[#ff003c]/30 transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Internal Project Badge (No public source button) */}
            <div className="flex items-center lg:self-end">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-red-950/40 text-zinc-300 text-xs font-mono border border-[#ff003c]/30">
                <Lock className="w-3.5 h-3.5 text-[#ff003c]" />
                <span className="font-semibold">Internal System</span>
              </span>
            </div>
          </div>
        </motion.div>

        {/* Project 3: AI Interviewer */}
        <motion.div
          whileHover={{ scale: 1.015 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          onClick={() => window.open("https://github.com/realcyclopse/Ai-interviewer", "_blank")}
          className="group relative p-6 sm:p-8 rounded-xl glass-panel border border-white/10 hover:border-[#fcee0a]/70 transition-colors cursor-pointer"
        >
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-3 flex-1">
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-xs font-mono font-bold text-[#fcee0a]">03</span>
                <span className="inline-flex items-center gap-1.5 text-xs font-mono px-2.5 py-0.5 rounded-md bg-yellow-950/60 text-[#fcee0a] border border-[#fcee0a]/40 font-medium">
                  AI Evaluation
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-semibold text-white group-hover:text-[#fcee0a] glitch-hover transition-colors flex items-center gap-3">
                AI Interviewer
                <ArrowUpRight className="w-5 h-5 text-zinc-400 group-hover:text-[#fcee0a] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform stroke-[2.5]" />
              </h3>

              <p className="text-sm text-zinc-300 max-w-2xl leading-relaxed font-sans">
                A conversational AI interview assessment agent that evaluates candidate technical answers in real time, grades response quality against rubric standards, and generates diagnostic feedback.
              </p>

              <div className="flex flex-wrap gap-2 pt-2">
                {["Python", "FastAPI", "LLM Evaluation", "Prompt Engineering", "NLP"].map((tag) => (
                  <span
                    key={tag}
                    className="text-[11px] font-mono px-2.5 py-1 rounded-md bg-white/5 text-zinc-300 border border-white/10 group-hover:border-[#fcee0a]/30 transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* GitHub Source Button */}
            <div className="flex items-center lg:self-end">
              <a
                href="https://github.com/realcyclopse/Ai-interviewer"
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex items-center gap-2 px-4 py-2 rounded-lg glass-panel hover:bg-white/15 text-white text-xs font-mono transition-colors border border-white/10 hover:border-[#fcee0a]/60"
              >
                <Github className="w-4 h-4 text-[#fcee0a]" />
                <span className="font-semibold">Source Code</span>
                <ArrowUpRight className="w-3 h-3 text-zinc-400 stroke-[2.5]" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
