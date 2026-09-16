"use client";

import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sphere, Torus } from "@react-three/drei";
import * as THREE from "three";


interface CyberCoreProps {
  isHoveredRef: React.MutableRefObject<boolean>;
}

function CyberCore({ isHoveredRef }: CyberCoreProps) {
  const tiltGroupRef = useRef<THREE.Group>(null!);
  const spinGroupRef = useRef<THREE.Group>(null!);
  const meshRef = useRef<THREE.Mesh>(null!);
  const materialRef = useRef<any>(null!);
  const outerRingRef = useRef<THREE.Mesh>(null!);
  const innerRingRef = useRef<THREE.Mesh>(null!);

  // Cyberpunk 2077 Palette: Electric Yellow #fcee0a, Neon Cyan #00f0ff, Crimson Red #ff003c
  const idleColor = useRef(new THREE.Color("#fcee0a"));      // Electric Cyberpunk Yellow
  const hoverColor = useRef(new THREE.Color("#00f0ff"));     // Neon Cyan
  const idleEmissive = useRef(new THREE.Color("#d97706"));  // Amber Glow
  const hoverEmissive = useRef(new THREE.Color("#0284c7")); // Cyan Glow

  // Smooth interpolation registers (pure 60/120fps Three.js, zero React re-renders)
  const hoverProgress = useRef(0);
  const smoothPointer = useRef(new THREE.Vector2(0, 0));

  useFrame((state, delta) => {
    // Protect against frame drops or tab unfocus
    const dt = Math.min(delta, 0.08);
    const time = state.clock.getElapsedTime();

    // 1. Smooth, damp-based hover progress (0 = idle yellow, 1 = active cyan)
    const targetHover = isHoveredRef.current ? 1 : 0;
    hoverProgress.current = THREE.MathUtils.damp(
      hoverProgress.current,
      targetHover,
      4.5,
      dt
    );

    // 2. Liquid-smooth mouse tilt damping (eliminates raw pointer stutter)
    const targetX = isHoveredRef.current ? state.pointer.x : 0;
    const targetY = isHoveredRef.current ? state.pointer.y : 0;
    smoothPointer.current.x = THREE.MathUtils.damp(
      smoothPointer.current.x,
      targetX,
      3.8,
      dt
    );
    smoothPointer.current.y = THREE.MathUtils.damp(
      smoothPointer.current.y,
      targetY,
      3.8,
      dt
    );

    // Tilt group follows the smoothed pointer with elegant inertia
    if (tiltGroupRef.current) {
      tiltGroupRef.current.rotation.x = -smoothPointer.current.y * 0.45;
      tiltGroupRef.current.rotation.y = smoothPointer.current.x * 0.45;
    }

    // Spin group provides continuous, steady auto-rotation (never fights with tilt)
    if (spinGroupRef.current) {
      spinGroupRef.current.rotation.y += dt * 0.32;
      spinGroupRef.current.rotation.x += dt * 0.12;
    }

    // Orbiting Rings: steady delta rotation, zero raw pointer jumps
    if (outerRingRef.current) {
      outerRingRef.current.rotation.x += dt * 0.38;
      outerRingRef.current.rotation.y += dt * 0.28;
    }

    if (innerRingRef.current) {
      innerRingRef.current.rotation.z += dt * 0.32;
      innerRingRef.current.rotation.x += dt * 0.22;
    }

    // Dynamic scale scaling smoothly with hover
    if (meshRef.current) {
      const targetScale = THREE.MathUtils.lerp(1.18, 1.34, hoverProgress.current);
      meshRef.current.scale.setScalar(
        THREE.MathUtils.damp(meshRef.current.scale.x, targetScale, 4.5, dt)
      );
    }

    // Material transitions: 100% frame-by-frame mathematical interpolation
    if (materialRef.current) {
      materialRef.current.color.lerpColors(
        idleColor.current,
        hoverColor.current,
        hoverProgress.current
      );
      materialRef.current.emissive.lerpColors(
        idleEmissive.current,
        hoverEmissive.current,
        hoverProgress.current
      );

      // Subtle organic breathing pulse
      const pulse = Math.sin(time * 2.2) * 0.15;
      materialRef.current.emissiveIntensity =
        THREE.MathUtils.lerp(1.1, 1.7, hoverProgress.current) + pulse;

      materialRef.current.distort = THREE.MathUtils.lerp(
        0.40,
        0.52,
        hoverProgress.current
      );
    }
  });

  return (
    <Float speed={1.6} rotationIntensity={0.35} floatIntensity={0.25}>
      <group ref={tiltGroupRef}>
        <group ref={spinGroupRef}>
          {/* Continuous luminous fluid cyber sphere (raycasting bypassed for silky 120fps) */}
          <Sphere ref={meshRef} args={[0.95, 64, 64]} raycast={() => null}>
            <MeshDistortMaterial
              ref={materialRef}
              color="#fcee0a"
              emissive="#d97706"
              emissiveIntensity={1.1}
              roughness={0.24}
              metalness={0.2}
              distort={0.4}
              speed={3.0}
            />
          </Sphere>

          {/* Ambient Orbiting Ring 1 (Cyberpunk Yellow) */}
          <Torus
            ref={outerRingRef}
            args={[1.45, 0.025, 16, 100]}
            raycast={() => null}
          >
            <meshStandardMaterial
              color="#fcee0a"
              emissive="#fcee0a"
              emissiveIntensity={1.8}
              wireframe
            />
          </Torus>

          {/* Ambient Orbiting Ring 2 (Neon Cyan) */}
          <Torus
            ref={innerRingRef}
            args={[1.72, 0.02, 16, 100]}
            rotation={[Math.PI / 3, Math.PI / 4, 0]}
            raycast={() => null}
          >
            <meshStandardMaterial
              color="#00f0ff"
              emissive="#00f0ff"
              emissiveIntensity={1.5}
              wireframe
            />
          </Torus>
        </group>
      </group>
    </Float>
  );
}

export default function InteractiveHeroScene() {
  const isHoveredRef = useRef(false);

  return (
    <div
      className="w-full h-full relative select-none cursor-grab active:cursor-grabbing"
      onPointerEnter={() => {
        isHoveredRef.current = true;
      }}
      onPointerLeave={() => {
        isHoveredRef.current = false;
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 6.8], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <ambientLight intensity={1.4} />
        {/* Cyberpunk 2077 Lighting: Yellow + Red + Cyan */}
        <pointLight position={[10, 10, 10]} intensity={4.0} color="#fcee0a" />
        <pointLight position={[-10, -10, -10]} intensity={3.5} color="#ff003c" />
        <pointLight position={[0, 0, 6]} intensity={2.5} color="#00f0ff" />
        <directionalLight position={[0, 6, 6]} intensity={2.0} color="#ffffff" />

        <CyberCore isHoveredRef={isHoveredRef} />
      </Canvas>
    </div>
  );
}
