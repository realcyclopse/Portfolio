"use client";

import { useEffect, useState, useRef, useMemo } from "react";

export default function ContinuousSpaceshipTrail() {
  const [docHeight, setDocHeight] = useState(5000);
  const [winWidth, setWinWidth] = useState(1400);
  const [winHeight, setWinHeight] = useState(900);
  const [smoothScrollY, setSmoothScrollY] = useState(0);

  const targetScrollY = useRef(0);
  const currentScrollY = useRef(0);
  const rafId = useRef<number | null>(null);

  // Measure document dimensions on mount and resize
  useEffect(() => {
    const updateDimensions = () => {
      const h = Math.max(
        document.documentElement.scrollHeight,
        document.body.scrollHeight,
        window.innerHeight * 3
      );
      setDocHeight(h);
      setWinWidth(window.innerWidth);
      setWinHeight(window.innerHeight);
    };

    updateDimensions();
    // Re-check after layout settles
    const timeout = setTimeout(updateDimensions, 600);

    window.addEventListener("resize", updateDimensions);
    return () => {
      clearTimeout(timeout);
      window.removeEventListener("resize", updateDimensions);
    };
  }, []);

  // Smooth scroll interpolation for 60fps buttery movement
  useEffect(() => {
    const onScroll = () => {
      targetScrollY.current = window.scrollY || window.pageYOffset || 0;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    targetScrollY.current = window.scrollY || window.pageYOffset || 0;
    currentScrollY.current = targetScrollY.current;

    const loop = () => {
      // Smooth physical dampening (lerp)
      const diff = targetScrollY.current - currentScrollY.current;
      currentScrollY.current += diff * 0.085;
      setSmoothScrollY(currentScrollY.current);
      rafId.current = requestAnimationFrame(loop);
    };

    rafId.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  // Compute scroll progress (0 at very top, 1 at bottom of page)
  const maxScroll = Math.max(1, docHeight - winHeight);
  const progress = Math.min(1, Math.max(0, smoothScrollY / maxScroll));

  // Ship Y coordinate: descends continuously from top of page down to bottom
  const startY = 140;
  const endY = docHeight - 140;
  const shipY = startY + progress * (endY - startY);

  // Swaying formula: Toned-down, gentle and graceful S-curve across the page
  const isMobile = winWidth < 768;
  const amplitude = isMobile ? winWidth * 0.18 : Math.min(winWidth * 0.20, 260);
  const centerX = winWidth / 2;
  const swayFrequency = Math.PI * 2.4; // Toned down: gentle, elegant drift instead of frantic zig-zag

  const getXAtY = (y: number) => {
    const norm = (y - startY) / (endY - startY);
    // Gentle sine wave swaying smoothly across page
    return centerX + Math.sin(norm * swayFrequency) * amplitude;
  };

  const shipX = getXAtY(shipY);

  // Compute flight angle (tangent) so the spaceship always points in direction of travel
  const deltaSample = 8;
  const prevX = getXAtY(Math.max(startY, shipY - deltaSample));
  const nextX = getXAtY(Math.min(endY, shipY + deltaSample));
  const dx = nextX - prevX;
  const dy = deltaSample * 2;
  // Angle in degrees: 0 deg is pointing straight down (+Y)
  const shipAngle = Math.atan2(dx, dy) * (180 / Math.PI);

  // Generate continuous trail SVG path from startY down to current shipY
  const trailPathData = useMemo(() => {
    const step = 24;
    const points: string[] = [];

    for (let y = startY; y <= shipY; y += step) {
      const x = getXAtY(y);
      points.push(`${points.length === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`);
    }

    // Always connect exactly to the current ship position
    points.push(`L ${shipX.toFixed(1)} ${shipY.toFixed(1)}`);

    return points.join(" ");
  }, [shipY, shipX, docHeight, winWidth]);

  return (
    <div
      className="absolute inset-x-0 top-0 pointer-events-none z-[1] overflow-hidden select-none"
      style={{ height: `${docHeight}px` }}
    >
      <svg
        className="w-full h-full pointer-events-none overflow-visible"
        style={{ height: `${docHeight}px` }}
      >
        <defs>
          {/* Neon Glow Filters */}
          <filter id="laser-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id="intense-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="6" result="blur1" />
            <feGaussianBlur stdDeviation="2" result="blur2" />
            <feMerge>
              <feMergeNode in="blur1" />
              <feMergeNode in="blur2" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Continuous Trail Gradient: Cyberpunk Yellow to Neon Cyan */}
          <linearGradient id="trail-grad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#fcee0a" stopOpacity="0.85" />
            <stop offset="50%" stopColor="#00f0ff" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#fcee0a" stopOpacity="1" />
          </linearGradient>

          <linearGradient id="glow-grad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#fcee0a" stopOpacity="0.3" />
            <stop offset="50%" stopColor="#00f0ff" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#00f0ff" stopOpacity="0.5" />
          </linearGradient>
        </defs>

        {/* 1. Outer Translucent Neon Glow Trail (Over the cards, breaking the 4th wall) */}
        <path
          d={trailPathData}
          fill="none"
          stroke="url(#glow-grad)"
          strokeWidth={isMobile ? "6" : "8"}
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#laser-glow)"
          opacity="0.65"
        />

        {/* 2. Core High-Voltage Laser Plasma Trail */}
        <path
          d={trailPathData}
          fill="none"
          stroke="url(#trail-grad)"
          strokeWidth={isMobile ? "2.2" : "2.8"}
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#laser-glow)"
          opacity="0.95"
        />

        {/* 3. The Small Cyberpunk Spaceship sitting at the tip of the trail */}
        <g
          transform={`translate(${shipX}, ${shipY}) rotate(${-shipAngle})`}
          filter="url(#intense-glow)"
        >
          {/* Engine Plasma Thruster Flames (Blazing behind the ship) */}
          <g transform="translate(0, -18)">
            {/* Left Engine Flame */}
            <path
              d="M -6 0 Q -9 -14 -6 -24 Q -3 -14 -6 0 Z"
              fill="#00f0ff"
              opacity="0.85"
            >
              <animate
                attributeName="d"
                values="
                  M -6 0 Q -9 -14 -6 -24 Q -3 -14 -6 0 Z;
                  M -6 0 Q -10 -18 -6 -30 Q -2 -18 -6 0 Z;
                  M -6 0 Q -9 -14 -6 -24 Q -3 -14 -6 0 Z
                "
                dur="0.16s"
                repeatCount="indefinite"
              />
            </path>
            {/* Left Inner Yellow Core Flame */}
            <path
              d="M -6 0 Q -7.5 -8 -6 -15 Q -4.5 -8 -6 0 Z"
              fill="#fcee0a"
              opacity="0.95"
            />

            {/* Right Engine Flame */}
            <path
              d="M 6 0 Q 3 -14 6 -24 Q 9 -14 6 0 Z"
              fill="#00f0ff"
              opacity="0.85"
            >
              <animate
                attributeName="d"
                values="
                  M 6 0 Q 3 -14 6 -24 Q 9 -14 6 0 Z;
                  M 6 0 Q 2 -18 6 -30 Q 10 -18 6 0 Z;
                  M 6 0 Q 3 -14 6 -24 Q 9 -14 6 0 Z
                "
                dur="0.16s"
                repeatCount="indefinite"
              />
            </path>
            {/* Right Inner Yellow Core Flame */}
            <path
              d="M 6 0 Q 4.5 -8 6 -15 Q 7.5 -8 6 0 Z"
              fill="#fcee0a"
              opacity="0.95"
            />
          </g>

          {/* Spaceship Main Hull: Sharp Cyberpunk Yellow stealth fighter */}
          {/* Main Swept Delta Wings */}
          <polygon
            points="0,18 -22,-8 -20,-14 -6,-10 0,-14 6,-10 20,-14 22,-8"
            fill="#fcee0a"
            stroke="#1a1c24"
            strokeWidth="1.2"
          />

          {/* Carbon Fiber Wing Inset Panels */}
          <polygon
            points="0,12 -16,-6 -14,-10 0,-7"
            fill="#12141c"
            opacity="0.8"
          />
          <polygon
            points="0,12 16,-6 14,-10 0,-7"
            fill="#12141c"
            opacity="0.8"
          />

          {/* Wing Leading Edge Neon Strips */}
          <line
            x1="0"
            y1="18"
            x2="-22"
            y2="-8"
            stroke="#00f0ff"
            strokeWidth="1.6"
          />
          <line
            x1="0"
            y1="18"
            x2="22"
            y2="-8"
            stroke="#00f0ff"
            strokeWidth="1.6"
          />

          {/* Wingtip Navigation Strobes (Port: Red, Starboard: Cyan) */}
          <circle cx="-22" cy="-8" r="2" fill="#ff003c" />
          <circle cx="22" cy="-8" r="2" fill="#00f0ff" />

          {/* Forward Canards (Small stabilizer fins near nose) */}
          <polygon
            points="0,14 -9,6 -8,3 0,8"
            fill="#fcee0a"
          />
          <polygon
            points="0,14 9,6 8,3 0,8"
            fill="#fcee0a"
          />

          {/* Twin Canted Tail Fins */}
          <polygon
            points="-7,-8 -10,-18 -6,-16 -5,-8"
            fill="#161924"
            stroke="#fcee0a"
            strokeWidth="0.8"
          />
          <polygon
            points="7,-8 10,-18 6,-16 5,-8"
            fill="#161924"
            stroke="#fcee0a"
            strokeWidth="0.8"
          />

          {/* Central Fuselage Body */}
          <polygon
            points="0,22 -6,-12 0,-16 6,-12"
            fill="#fcee0a"
            stroke="#161822"
            strokeWidth="1.2"
          />

          {/* High-Glow Cyan Crystalline Cockpit Visor */}
          <polygon
            points="0,16 -3,4 0,0 3,4"
            fill="#00f0ff"
            filter="url(#laser-glow)"
          />
          <polygon
            points="0,14 -1.8,5 0,2 1.8,5"
            fill="#ffffff"
          />

          {/* Twin Engine Afterburner Exhaust Rings */}
          <ellipse cx="-6" cy="-14" rx="2.5" ry="1.5" fill="#00f0ff" />
          <ellipse cx="6" cy="-14" rx="2.5" ry="1.5" fill="#00f0ff" />

          {/* Nose Tip Sensor Glow */}
          <circle cx="0" cy="22" r="1.5" fill="#ffffff" />
        </g>
      </svg>
    </div>
  );
}
