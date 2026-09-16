"use client";

import { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export default function MagneticCursor() {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 28, stiffness: 320, mass: 0.35 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Only activate on devices with fine pointer (mouse/trackpad), not touch screens
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const onMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest("a, button, input, [role='button'], .cursor-pointer") as HTMLElement | null;
      setIsHovered(!!interactive);
    };

    const onMouseLeave = () => setIsVisible(false);

    window.addEventListener("mousemove", onMouseMove);
    document.body.addEventListener("mouseleave", onMouseLeave);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.body.removeEventListener("mouseleave", onMouseLeave);
    };
  }, [mouseX, mouseY, isVisible]);

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[99998] overflow-hidden">
      {/* Outer Magnetic Ring */}
      <motion.div
        style={{
          x: smoothX,
          y: smoothY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isHovered ? 1.4 : 1,
          width: isHovered ? "36px" : "28px",
          height: isHovered ? "36px" : "28px",
          borderRadius: "9999px",
          backgroundColor: isHovered
            ? "rgba(252, 238, 10, 0.1)"
            : "transparent",
          borderColor: isHovered
            ? "rgba(252, 238, 10, 0.8)"
            : "rgba(252, 238, 10, 0.3)",
        }}
        transition={{ type: "spring", stiffness: 450, damping: 30 }}
        className="fixed border backdrop-blur-[2px] shadow-[0_0_15px_rgba(252,238,10,0.2)]"
      />

      {/* Center Precision Dot */}
      <motion.div
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isHovered ? 1.4 : 1,
        }}
        className="fixed w-1.5 h-1.5 rounded-full bg-[#fcee0a] shadow-[0_0_8px_#fcee0a]"
      />
    </div>
  );
}
