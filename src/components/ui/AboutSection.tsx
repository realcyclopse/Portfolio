"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { GraduationCap, MapPin, Compass } from "lucide-react";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

export default function AboutSection() {
  return (
    <section id="about" className="py-24 px-4 sm:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="mb-12 pb-6 border-b border-[#fcee0a]/20">
        <div className="flex items-center gap-2 text-xs font-mono text-[#fcee0a] uppercase tracking-wider mb-2 font-bold">
          <Compass className="w-3.5 h-3.5" />
          <span>04 // About</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-light tracking-tight text-white uppercase">
          A Little <span className="font-bold text-[#fcee0a]">About Me</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        {/* Left Column: Profile Card */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-5 relative"
        >
          <div className="relative rounded-2xl overflow-hidden glass-panel p-2.5 border border-[#fcee0a]/20 hover:border-[#fcee0a]/70 transition-colors group">
            <div className="relative h-[380px] w-full rounded-xl overflow-hidden">
              <Image
                src={`${basePath}/images/profilepic.jpg`}
                alt="Abhinav Kataria"
                fill
                priority
                className="object-cover object-center grayscale group-hover:grayscale-0 transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              
              <div className="absolute bottom-4 left-4 right-4 p-3.5 rounded-xl glass-panel text-white border border-[#fcee0a]/30">
                <div className="text-sm font-bold tracking-tight glitch-hover">Abhinav Kataria</div>
                <div className="text-xs font-mono text-zinc-300 flex items-center gap-1.5 mt-0.5">
                  <MapPin className="w-3 h-3 text-[#fcee0a]" />
                  <span>BIT Mesra, Ranchi // India</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Natural, human story */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="lg:col-span-7 space-y-5 text-zinc-300 leading-relaxed text-sm sm:text-base font-sans"
        >
          <h3 className="text-2xl sm:text-3xl font-medium text-white tracking-tight">
            I enjoy building software that works reliably and feels good to use.
          </h3>

          <p className="text-zinc-300 leading-relaxed">
            I&apos;m a Computer Science student at <strong className="text-white font-medium">BIT Mesra</strong> (class of 2027). A lot of my time is spent between writing backend services in Python &amp; Node.js, building interactive web interfaces, and solving algorithmic problems in C++.
          </p>

          <p className="text-zinc-300 leading-relaxed">
            I like working on problems that require solid engineering fundamentals—like designing a safe, authenticated internal chatbot during my internship at Jakson Group, or orchestrating real-time WebSocket delivery routes on NexRoute.
          </p>

          <p className="text-zinc-300 leading-relaxed">
            When I&apos;m not coding, I lead tech sessions and workshops at the IEEE Student Chapter and explore new design and frontend ideas.
          </p>

          <div className="pt-2">
            <div className="p-4 rounded-xl glass-panel space-y-1 border border-[#fcee0a]/30 max-w-md bg-[#fcee0a]/5">
              <div className="flex items-center gap-2 text-xs font-mono text-[#fcee0a] font-bold">
                <GraduationCap className="w-4 h-4" />
                <span>B.Tech in Computer Science &amp; Engineering</span>
              </div>
              <div className="text-sm font-medium text-white">BIT Mesra (2023 – 2027)</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
