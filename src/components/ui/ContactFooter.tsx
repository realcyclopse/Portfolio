"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight, Copy, Check, Mail, MapPin, Github, Linkedin, Terminal, Sparkles } from "lucide-react";
import confetti from "canvas-confetti";
import { openContactModal } from "@/components/ui/ContactModal";

export default function ContactFooter() {
  const [time, setTime] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-IN", {
          timeZone: "Asia/Kolkata",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        })
      );
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleAction = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.8 },
      colors: ["#fcee0a", "#00f0ff", "#ff003c"],
    });
    openContactModal();
  };

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText("rishu2300@gmail.com");
    setCopied(true);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.8 },
      colors: ["#fcee0a", "#00f0ff", "#ff003c"],
    });
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <footer id="contact" className="relative pt-20 pb-12 bg-[#040507] text-white overflow-hidden border-t border-[#fcee0a]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-16">
        {/* Main Call to Action */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-12 border-b border-white/10">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono text-[#fcee0a] uppercase tracking-wider font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>05 // Get in Touch</span>
            </div>
            <h2 className="text-4xl sm:text-6xl font-light tracking-tight uppercase">
              Have an opportunity or project? <br />
              <span className="font-bold text-[#fcee0a] glitch-hover inline-block">
                Let&apos;s connect.
              </span>
            </h2>
          </div>

          {/* Giant Magnetic Circular Contact Button (Cyberpunk 2077 Yellow) */}
          <div className="flex items-center">
            <button
              onClick={handleAction}
              className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-full bg-[#fcee0a] hover:bg-white text-black font-extrabold flex flex-col items-center justify-center p-4 hover:scale-105 active:scale-95 transition-all shadow-[0_0_50px_rgba(252,238,10,0.5)] group border-2 border-[#fcee0a]"
            >
              <ArrowUpRight className="w-8 h-8 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform stroke-[2.5]" />
              <span className="text-sm sm:text-base font-mono tracking-widest mt-1 font-bold">
                CONTACT
              </span>
            </button>
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-2">
          {/* Column 1: Direct Email */}
          <div className="space-y-3">
            <div className="text-xs font-mono text-zinc-400 uppercase tracking-wider font-semibold">
              Direct Email
            </div>
            <div>
              <button
                onClick={handleAction}
                className="flex items-center gap-2 text-sm font-mono text-zinc-200 hover:text-[#fcee0a] transition-colors group cursor-pointer"
              >
                <Mail className="w-4 h-4 text-[#fcee0a]" />
                <span className="font-medium underline-offset-4 group-hover:underline">rishu2300@gmail.com</span>
                <span
                  onClick={handleCopyEmail}
                  title="Copy email to clipboard"
                  className="p-1 hover:text-white transition-colors"
                >
                  {copied ? (
                    <Check className="w-3.5 h-3.5 text-[#fcee0a]" />
                  ) : (
                    <Copy className="w-3.5 h-3.5 text-zinc-500" />
                  )}
                </span>
              </button>
            </div>
          </div>

          {/* Column 2: Local Time & Location */}
          <div className="space-y-3">
            <div className="text-xs font-mono text-zinc-400 uppercase tracking-wider font-semibold">
              Location &amp; Time
            </div>
            <div className="space-y-1 text-sm font-mono text-zinc-300">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#00f0ff]" />
                <span>BIT Mesra, Ranchi // India</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-zinc-400 pl-6">
                <span className="w-2 h-2 rounded-full bg-[#fcee0a] animate-pulse" />
                <span>{time || "Loading time..."} IST</span>
              </div>
            </div>
          </div>

          {/* Column 3: Social Links */}
          <div className="space-y-3">
            <div className="text-xs font-mono text-zinc-400 uppercase tracking-wider font-semibold">
              Links
            </div>
            <div className="flex flex-wrap gap-2.5">
              {[
                { name: "GitHub", href: "https://github.com/realcyclopse", icon: Github },
                { name: "LinkedIn", href: "https://linkedin.com/in/realcyclopse", icon: Linkedin },
                { name: "LeetCode", href: "https://leetcode.com/u/realcyclopse", icon: Terminal },
              ].map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg glass-panel glass-panel-hover text-xs font-mono text-zinc-300 hover:text-[#fcee0a] border border-white/10 hover:border-[#fcee0a]/50 transition-colors"
                >
                  <link.icon className="w-3.5 h-3.5" />
                  <span>{link.name}</span>
                  <ArrowUpRight className="w-3 h-3 text-zinc-400 stroke-[2.5]" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between pt-8 border-t border-white/5 text-xs font-mono text-zinc-500 gap-4">
          <div>
            © {new Date().getFullYear()} Abhinav Kataria.
          </div>
          <div className="flex items-center gap-4">
            <a href="#top" className="hover:text-zinc-300 transition-colors">
              Back to Top ↑
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
