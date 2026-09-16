"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, ExternalLink, Copy, Check, Sparkles, Send } from "lucide-react";
import confetti from "canvas-confetti";

export function openContactModal() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("open-contact-modal"));
  }
}

export default function ContactModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };

    window.addEventListener("open-contact-modal", handleOpen);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("open-contact-modal", handleOpen);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const email = "rishu2300@gmail.com";
  const subject = "Project Opportunity // Inquiry - Abhinav Kataria";
  const body = "Hi Abhinav,\n\nI came across your portfolio and wanted to reach out regarding ";

  const encodedSubject = encodeURIComponent(subject);
  const encodedBody = encodeURIComponent(body);

  const emailServices = [
    {
      name: "Gmail (Web)",
      description: "Opens Google Gmail in a new tab with pre-filled message",
      href: `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${encodedSubject}&body=${encodedBody}`,
      target: "_blank",
      color: "#ff003c",
      bgHover: "hover:border-[#ff003c]/60 hover:bg-[#ff003c]/10",
      iconColor: "text-[#ff003c]",
      badge: "POPULAR",
    },
    {
      name: "Default Mail App",
      description: "Apple Mail, Windows Mail, Thunderbird, or mobile mail app",
      href: `mailto:${email}?subject=${encodedSubject}&body=${encodedBody}`,
      target: "_self",
      color: "#00f0ff",
      bgHover: "hover:border-[#00f0ff]/60 hover:bg-[#00f0ff]/10",
      iconColor: "text-[#00f0ff]",
      badge: "SYSTEM",
    },
    {
      name: "Outlook / Hotmail",
      description: "Opens Microsoft Outlook web compose in a new tab",
      href: `https://outlook.live.com/mail/0/deeplink/compose?to=${email}&subject=${encodedSubject}&body=${encodedBody}`,
      target: "_blank",
      color: "#0284c7",
      bgHover: "hover:border-[#0284c7]/60 hover:bg-[#0284c7]/10",
      iconColor: "text-[#38bdf8]",
      badge: "WEB",
    },
    {
      name: "Yahoo Mail",
      description: "Opens Yahoo Mail web compose in a new tab",
      href: `https://compose.mail.yahoo.com/?to=${email}&subj=${encodedSubject}&body=${encodedBody}`,
      target: "_blank",
      color: "#a855f7",
      bgHover: "hover:border-[#a855f7]/60 hover:bg-[#a855f7]/10",
      iconColor: "text-[#c084fc]",
      badge: "WEB",
    },
  ];

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 },
      colors: ["#fcee0a", "#00f0ff", "#ff003c"],
    });
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[999999] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Dialog Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 15 }}
            transition={{ type: "spring", damping: 25, stiffness: 350 }}
            className="relative w-full max-w-lg rounded-2xl glass-panel border border-[#fcee0a]/40 bg-[#080a0f]/95 p-6 sm:p-8 shadow-[0_0_60px_rgba(252,238,10,0.15)] z-10 space-y-6"
          >
            {/* Header */}
            <div className="flex items-start justify-between border-b border-white/10 pb-4">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-2 text-xs font-mono text-[#fcee0a] uppercase tracking-wider font-bold">
                  <Send className="w-3.5 h-3.5" />
                  <span>SYS.CONNECT // Compose Email</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-light tracking-tight text-white">
                  Send an email to <span className="font-bold text-[#fcee0a]">{email}</span>
                </h3>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Email Service Options */}
            <div className="space-y-2.5">
              <div className="text-xs font-mono text-zinc-400 uppercase tracking-wider">
                Select your preferred email service:
              </div>

              <div className="grid grid-cols-1 gap-2.5">
                {emailServices.map((service) => (
                  <a
                    key={service.name}
                    href={service.href}
                    target={service.target}
                    rel={service.target === "_blank" ? "noopener noreferrer" : undefined}
                    onClick={() => {
                      if (service.target === "_blank") {
                        setTimeout(() => setIsOpen(false), 500);
                      }
                    }}
                    className={`flex items-center justify-between p-3.5 rounded-xl border border-white/10 bg-white/[0.03] transition-all group ${service.bgHover}`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg bg-black/40 border border-white/10 ${service.iconColor}`}>
                        <Mail className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-white group-hover:text-white flex items-center gap-2">
                          <span>{service.name}</span>
                          <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-white/10 text-zinc-300 font-normal">
                            {service.badge}
                          </span>
                        </div>
                        <div className="text-xs text-zinc-400 font-sans">
                          {service.description}
                        </div>
                      </div>
                    </div>

                    <ExternalLink className="w-4 h-4 text-zinc-500 group-hover:text-white transition-colors shrink-0 ml-2" />
                  </a>
                ))}
              </div>
            </div>

            {/* Direct Copy Action */}
            <div className="pt-2 border-t border-white/10 flex items-center justify-between gap-4">
              <div className="text-xs font-mono text-zinc-400 truncate">
                Or copy address directly:
              </div>

              <button
                onClick={handleCopy}
                className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-[#fcee0a]/10 hover:bg-[#fcee0a]/20 border border-[#fcee0a]/40 text-[#fcee0a] text-xs font-mono font-semibold transition-all shrink-0 active:scale-95"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>COPIED!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>COPY EMAIL</span>
                  </>
                )}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
