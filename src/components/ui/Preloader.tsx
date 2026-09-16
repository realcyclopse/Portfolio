"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const words = [
  "Hello",
  "Bonjour",
  "स्वागत हे",
  "Ciao",
  "Olá",
  "Guten Tag",
  "おい",
  "Hallo",
  "Abhinav Kataria"
];

export default function Preloader() {
  const [index, setIndex] = useState(0);
  const [dimension, setDimension] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 1920,
    height: typeof window !== "undefined" ? window.innerHeight : 1080,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setDimension({ width: window.innerWidth, height: window.innerHeight });
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    const interval = setInterval(() => {
      setIndex((prev) => {
        if (prev === words.length - 1) {
          clearInterval(interval);
          setTimeout(() => {
            setIsLoading(false);
          }, 300);
          return prev;
        }
        return prev + 1;
      });
    }, 160);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsLoading(false);
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const initialPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height} Q${dimension.width / 2} ${dimension.height + 300} 0 ${dimension.height}  L0 0`;
  const targetPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height} Q${dimension.width / 2} ${dimension.height} 0 ${dimension.height}  L0 0`;

  const curve = {
    initial: {
      d: initialPath,
      transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] as const }
    },
    exit: {
      d: targetPath,
      transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] as const, delay: 0.25 }
    }
  };

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          initial={{ y: 0 }}
          exit={{ y: "-100vh", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] as const, delay: 0.15 } }}
          className="fixed inset-0 z-[99999] flex items-center justify-center bg-[#040507] text-white"
        >
          <div className="relative z-10 flex flex-col items-center gap-4">
            <div className="flex items-center gap-3 text-3xl sm:text-6xl font-light tracking-tight">
              <span className="inline-block w-3 h-3 rounded-full bg-[#fcee0a] animate-ping shadow-[0_0_12px_#fcee0a]" />
              <motion.span
                key={index}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.12 }}
                className="font-mono text-[#fcee0a] font-bold tracking-wider"
              >
                {words[index]}
              </motion.span>
            </div>
            
            <button
              onClick={() => setIsLoading(false)}
              className="text-[11px] font-mono text-zinc-500 hover:text-[#fcee0a] transition-colors mt-4 tracking-widest uppercase cursor-pointer"
            >
              [SYS.BOOT // Press ESC or Click to Skip]
            </button>
          </div>

          <svg className="absolute top-0 w-full h-[calc(100%+300px)] pointer-events-none fill-[#0d0e13]">
            <motion.path
              variants={curve}
              initial="initial"
              exit="exit"
            />
          </svg>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
