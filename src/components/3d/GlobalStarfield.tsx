"use client";

import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * Continuous Full-Page Starfield Background
 * Spans the entire webpage from top to bottom with multi-colored stars and parallax scroll
 */
function StarfieldPoints({ scrollYRef }: { scrollYRef: React.MutableRefObject<number> }) {
  const count = 2600;
  const pointsRef = useRef<THREE.Points>(null!);

  const { positions, colors } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    const cpYellow = new THREE.Color("#fcee0a");
    const cpCyan = new THREE.Color("#00f0ff");
    const cpWhite = new THREE.Color("#ffffff");
    const cpIce = new THREE.Color("#80e5ff");

    for (let i = 0; i < count; i++) {
      // Wide and continuous space distribution across the entire vertical height
      pos[i * 3] = (Math.random() - 0.5) * 48;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 54;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 26 - 4;

      const rand = Math.random();
      let c: THREE.Color;
      if (rand < 0.22) {
        c = cpYellow;
      } else if (rand < 0.38) {
        c = cpCyan;
      } else if (rand < 0.72) {
        c = cpIce;
      } else {
        c = cpWhite;
      }

      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }

    return { positions: pos, colors: col };
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const time = state.clock.getElapsedTime();

    // Subtle cosmic perpetual drift
    pointsRef.current.rotation.y = time * 0.012;
    pointsRef.current.rotation.x = time * 0.006;

    // Smooth vertical scroll parallax across entire page
    const scrollOffset = scrollYRef.current * 0.0028;
    pointsRef.current.position.y = THREE.MathUtils.lerp(
      pointsRef.current.position.y,
      scrollOffset * 0.85,
      0.06
    );
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={colors.length / 3}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.036}
        vertexColors
        transparent
        opacity={0.85}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export default function GlobalStarfield() {
  const scrollYRef = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      scrollYRef.current = window.scrollY || window.pageYOffset || 0;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <ambientLight intensity={1.0} />
        <StarfieldPoints scrollYRef={scrollYRef} />
      </Canvas>
    </div>
  );
}
