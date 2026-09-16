"use client";

import { motion } from "framer-motion";
import { Terminal, Trophy, Award } from "lucide-react";

const skillCategories = [
  {
    name: "Languages",
    items: ["C++", "Python", "TypeScript", "JavaScript", "Java", "SQL"],
    accent: "#fcee0a",
  },
  {
    name: "Backend",
    items: ["FastAPI", "Node.js", "Express", "Socket.IO", "REST APIs"],
    accent: "#00f0ff",
  },
  {
    name: "AI & Systems",
    items: ["PII Redaction", "sentence-transformers", "RAG", "Embeddings"],
    accent: "#ff003c",
  },
  {
    name: "Frontend",
    items: ["React 18", "Next.js", "Mapbox GL", "Tailwind CSS"],
    accent: "#fcee0a",
  },
  {
    name: "Data & Tools",
    items: ["MongoDB", "PostgreSQL", "Redis", "Git", "pytest"],
    accent: "#00f0ff",
  },
];

export default function SkillsBento() {
  return (
    <section id="stats" className="py-24 px-4 sm:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="mb-12 pb-6 border-b border-[#fcee0a]/20">
        <div className="flex items-center gap-2 text-xs font-mono text-[#fcee0a] uppercase tracking-wider mb-2 font-bold">
          <Terminal className="w-3.5 h-3.5" />
          <span>03 // Technical Stack &amp; Fundamentals</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-light tracking-tight text-white uppercase">
          Skills &amp; <span className="font-bold text-[#fcee0a]">Problem Solving</span>
        </h2>
      </div>

      {/* Bento Top: 2 Balanced Cards */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-8">
        {/* Card 1: Competitive Programming */}
        <motion.div
          whileHover={{ scale: 1.01 }}
          transition={{ duration: 0.2 }}
          className="md:col-span-7 p-6 sm:p-8 rounded-xl glass-panel border border-white/10 hover:border-[#fcee0a]/60 transition-colors flex flex-col justify-between space-y-6"
        >
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-xs font-mono text-[#fcee0a] font-bold uppercase tracking-wider">
                <Trophy className="w-4 h-4 text-[#fcee0a]" />
                <span>Competitive Programming</span>
              </span>
              <span className="text-xs font-mono text-zinc-400 bg-white/5 px-2 py-0.5 rounded border border-white/10">C++</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-semibold text-white tracking-tight">
              500+ Problems Solved
            </h3>
            <p className="text-sm text-zinc-300 leading-relaxed font-sans">
              Practicing data structures and algorithms in C++ with an active rating of 1780+ on LeetCode.
            </p>
          </div>

          <div className="pt-4 border-t border-white/10">
            <div className="flex items-baseline gap-3">
              <span className="text-3xl sm:text-4xl font-mono font-bold text-[#fcee0a] drop-shadow-[0_0_12px_rgba(252,238,10,0.3)]">1780+</span>
              <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider">LeetCode Rating</span>
            </div>
          </div>
        </motion.div>

        {/* Card 2: Leadership & Community */}
        <motion.div
          whileHover={{ scale: 1.01 }}
          transition={{ duration: 0.2 }}
          className="md:col-span-5 p-6 sm:p-8 rounded-xl glass-panel border border-white/10 hover:border-[#00f0ff]/60 transition-colors flex flex-col justify-between space-y-6"
        >
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono text-[#00f0ff] font-bold uppercase tracking-wider">
              <Award className="w-4 h-4" />
              <span>Community &amp; Leadership</span>
            </div>

            <h3 className="text-2xl font-semibold text-white tracking-tight">
              Technical Lead @ IEEE
            </h3>
            <p className="text-sm text-zinc-300 leading-relaxed font-sans">
              Technical Lead at IEEE Student Chapter and member of Google Developer Student Club (GDSC), BIT Mesra.
            </p>
          </div>

          <div className="space-y-2 pt-4 border-t border-white/10">
            <div className="flex items-center justify-between text-xs font-mono text-zinc-300">
              <span>IEEE Student Chapter</span>
              <span className="text-[#fcee0a] font-bold uppercase">Tech Lead</span>
            </div>
            <div className="flex items-center justify-between text-xs font-mono text-zinc-300">
              <span>Google Developer Student Club</span>
              <span className="text-[#00f0ff] font-bold uppercase">Member</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bento Bottom: Tech Stack in a SINGLE ROW (5 Columns on Desktop) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {skillCategories.map((category) => (
          <div
            key={category.name}
            className="p-5 rounded-xl glass-panel border border-white/10 space-y-3 flex flex-col justify-between hover:border-white/20 transition-colors"
          >
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-mono uppercase tracking-wider text-white font-bold">
                {category.name}
              </h4>
              <div
                className="w-2 h-2 rounded-full shadow-[0_0_6px_currentColor]"
                style={{ backgroundColor: category.accent, color: category.accent }}
              />
            </div>

            <div className="flex flex-wrap gap-1.5 pt-1">
              {category.items.map((item) => (
                <span
                  key={item}
                  className="text-[11px] font-mono px-2 py-1 rounded-md bg-black/40 text-zinc-300 border border-white/5"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
