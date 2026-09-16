"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Briefcase, Lock, ShieldCheck, ArrowUp, Sparkles, CheckCircle2 } from "lucide-react";

interface ChatScenario {
  id: string;
  tabLabel: string;
  query: string;
  piiNote: string;
  response: string;
  source: string;
}

const scenarios: ChatScenario[] = [
  {
    id: "leave",
    tabLabel: "HRMS Leave",
    query: "Can you pull the Q3 leave policy and my remaining balance?",
    piiNote: "PII Shield: Employee ID & Auth verified (RBAC allowlist)",
    response:
      "Your Q3 balance is 8 days remaining. Annual leave rollover guidelines can be reviewed directly in HRMS Portal Section 4.",
    source: "Resolved via Internal SQL Knowledge Base • 0 Model Tokens",
  },
  {
    id: "reimbursement",
    tabLabel: "LMS Claims",
    query: "Where do I submit equipment reimbursement receipts?",
    piiNote: "PII Shield: Financial account numbers redacted fail-closed",
    response:
      "Submit receipts under LMS Finance > Claims before the 25th of each month. Standard hardware approval takes 2 business days.",
    source: "Resolved via Policy Engine • PII Sanitized Before LLM",
  },
  {
    id: "security",
    tabLabel: "IT Access",
    query: "Who is the point of contact for IT security provisioning?",
    piiNote: "PII Shield: Role-based contact query sanitized",
    response:
      "IT Provisioning and security access requests are handled by the Enterprise Infrastructure desk (ticket queue #INFRA-IT).",
    source: "Resolved via Relational Enterprise Cache • Zero Token Leakage",
  },
];

export default function ExperienceSection() {
  const [scenarioIndex, setScenarioIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setScenarioIndex((prev) => (prev + 1) % scenarios.length);
    }, 6500);

    return () => clearInterval(timer);
  }, [isPaused]);

  const current = scenarios[scenarioIndex];

  return (
    <section id="experience" className="py-24 px-4 sm:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="mb-12 pb-6 border-b border-[#fcee0a]/20">
        <div className="flex items-center gap-2 text-xs font-mono text-[#fcee0a] uppercase tracking-wider mb-2 font-bold">
          <Briefcase className="w-3.5 h-3.5" />
          <span>02 // Work Experience</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-light tracking-tight text-white uppercase">
          Jakson Limited <span className="text-[#fcee0a] font-normal text-2xl sm:text-3xl">// IT Intern</span>
        </h2>
        <p className="text-xs sm:text-sm font-mono text-zinc-400 mt-1">
          Summer 2026 // Enterprise AI &amp; Backend Systems
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Clear, concise description of what was built */}
        <div className="lg:col-span-5 space-y-5">
          <p className="text-sm sm:text-base text-zinc-300 leading-relaxed font-sans">
            During my internship at <strong className="text-white font-medium">Jakson Limited</strong>, I built an enterprise AI chatbot backend designed to automate Q&amp;A across internal employee portals like HRMS and LMS.
          </p>

          <p className="text-sm sm:text-base text-zinc-400 leading-relaxed font-sans">
            The goal was providing instant answers while ensuring employee PII (personally identifiable information) never leaked to external models. I engineered a deterministic request pipeline in FastAPI that verifies permissions and scrubs sensitive data before generation. Standard company questions are resolved directly from relational SQL databases to eliminate unnecessary LLM costs.
          </p>

          <div className="pt-2">
            <div className="flex items-center gap-2 text-xs font-mono text-zinc-300 border-l-2 border-[#fcee0a] pl-3 py-1 bg-[#fcee0a]/5 rounded-r-md">
              <CheckCircle2 className="w-4 h-4 text-[#fcee0a]" />
              <span>Full backend verified with 69 unit tests across 14 modules.</span>
            </div>
          </div>
        </div>

        {/* Right Column: Premium Cyberpunk / macOS Chatbot Terminal */}
        <div className="lg:col-span-7">
          <div
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            className="h-[430px] rounded-xl overflow-hidden glass-panel border border-white/15 shadow-[0_25px_70px_rgba(0,0,0,0.9)] bg-[#0a0c12] flex flex-col justify-between select-none"
          >
            {/* Window Titlebar */}
            <div className="px-4 py-3 bg-[#11131a] border-b border-white/10 flex items-center justify-between backdrop-blur-md shrink-0">
              {/* Terminal status dots */}
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#ff003c] border border-[#ff003c]/40 inline-block shadow-[0_0_6px_#ff003c]" />
                <span className="w-3 h-3 rounded-full bg-[#fcee0a] border border-[#fcee0a]/40 inline-block shadow-[0_0_6px_#fcee0a]" />
                <span className="w-3 h-3 rounded-full bg-[#00f0ff] border border-[#00f0ff]/40 inline-block shadow-[0_0_6px_#00f0ff]" />
              </div>

              {/* Titlebar text */}
              <div className="text-[11px] sm:text-xs font-mono text-zinc-300 font-semibold flex items-center gap-1.5 uppercase tracking-wider">
                <Lock className="w-3 h-3 text-[#fcee0a]" />
                <span>Jakson Assistant // Secure AI Gateway</span>
              </div>

              {/* Security Pill */}
              <div className="flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded-md bg-cyan-950/60 text-[#00f0ff] border border-[#00f0ff]/40 font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00f0ff] animate-pulse" />
                <span className="hidden sm:inline">PII SHIELD: ACTIVE</span>
              </div>
            </div>

            {/* Scenario Quick Selector Tabs */}
            <div className="px-4 py-2 bg-[#0d0f17] border-b border-white/5 flex items-center gap-2 overflow-x-auto shrink-0 scrollbar-none">
              {scenarios.map((s, idx) => (
                <button
                  key={s.id}
                  onClick={() => setScenarioIndex(idx)}
                  className={`text-[11px] font-mono px-3 py-1 rounded-md transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer uppercase tracking-wider ${
                    scenarioIndex === idx
                      ? "bg-[#fcee0a] text-black font-bold shadow-[0_0_12px_rgba(252,238,10,0.4)]"
                      : "text-zinc-400 hover:text-zinc-200 hover:bg-white/5 border border-transparent"
                  }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${scenarioIndex === idx ? "bg-black" : "bg-zinc-600"}`} />
                  <span>{s.tabLabel}</span>
                </button>
              ))}
            </div>

            {/* Chat Body - strictly fixed flex area with smooth crossfade */}
            <div className="p-5 sm:p-6 flex-1 flex flex-col justify-center overflow-hidden font-sans">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.id}
                  initial={{ opacity: 0, y: 8, filter: "blur(4px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -8, filter: "blur(4px)" }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="space-y-3"
                >
                  {/* User Message */}
                  <div className="flex justify-end">
                    <div className="max-w-md px-4 py-2.5 rounded-xl rounded-tr-sm bg-gradient-to-r from-[#fcee0a] to-[#ffd000] text-black text-xs sm:text-sm shadow-[0_0_15px_rgba(252,238,10,0.25)] font-bold leading-relaxed">
                      {current.query}
                    </div>
                  </div>

                  {/* PII Shield Intercept Tag */}
                  <div className="flex justify-center">
                    <span className="inline-flex items-center gap-1.5 text-[10px] font-mono px-2.5 py-1 rounded-md bg-cyan-950/60 text-[#00f0ff] border border-[#00f0ff]/40 font-bold">
                      <ShieldCheck className="w-3 h-3 text-[#00f0ff]" />
                      {current.piiNote}
                    </span>
                  </div>

                  {/* Assistant Response */}
                  <div className="flex justify-start">
                    <div className="max-w-lg space-y-1">
                      <div className="px-4 py-3 rounded-xl rounded-tl-sm bg-[#131622] border border-white/10 text-zinc-200 text-xs sm:text-sm leading-relaxed shadow-lg">
                        {current.response}
                      </div>
                      <div className="text-[10px] font-mono text-[#fcee0a]/80 pl-2 font-medium">
                        {current.source}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* macOS Style Input Bar Simulation */}
            <div className="p-4 bg-[#0d0f17] border-t border-white/5 shrink-0">
              <div className="flex items-center justify-between px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-xs text-zinc-400 font-mono">
                <span className="truncate">Ask internal knowledge base (HRMS, LMS, Policy)...</span>
                <div className="w-6 h-6 rounded-md bg-[#fcee0a] flex items-center justify-center text-black shrink-0 shadow-[0_0_10px_rgba(252,238,10,0.4)] ml-2">
                  <ArrowUp className="w-3.5 h-3.5 stroke-[2.5]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
