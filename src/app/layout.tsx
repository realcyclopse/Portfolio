import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { Chakra_Petch, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/ui/SmoothScroll";
import Preloader from "@/components/ui/Preloader";
import MagneticCursor from "@/components/ui/MagneticCursor";
import Header from "@/components/ui/Header";

const GlobalStarfield = dynamic(
  () => import("@/components/3d/GlobalStarfield"),
  { ssr: false }
);

import ContinuousSpaceshipTrail from "@/components/ui/ContinuousSpaceshipTrail";

const chakra = Chakra_Petch({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-sans",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

export const metadata: Metadata = {
  title: "Abhinav Kataria — Full-Stack Developer & AI Systems Architect",
  description:
    "Portfolio of Abhinav Kataria (realcyclopse). Final-year CSE student at BIT Mesra building PII-safe AI gateways, real-time spatial platforms, and high-craft interactive systems.",
  keywords: [
    "Abhinav Kataria",
    "realcyclopse",
    "Full-Stack Developer",
    "AI Systems",
    "BIT Mesra",
    "FastAPI",
    "React",
    "Next.js",
    "Three.js",
  ],
  authors: [{ name: "Abhinav Kataria", url: "https://github.com/realcyclopse" }],
  icons: {
    icon: [
      { url: `${basePath}/icon.svg`, type: "image/svg+xml" },
      { url: `${basePath}/favicon.ico`, sizes: "any" },
    ],
    shortcut: `${basePath}/icon.svg`,
    apple: `${basePath}/apple-touch-icon.png`,
  },
  openGraph: {
    title: "Abhinav Kataria — Full-Stack Developer & AI Systems Architect",
    description: "Final-year CSE student at BIT Mesra building deterministic AI pipelines and real-time distributed platforms.",
    images: [`${basePath}/images/profilepic.jpg`],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${chakra.variable} ${jetbrainsMono.variable} dark scroll-smooth`}>
      <body className="bg-[#050608] text-zinc-100 antialiased selection:bg-[#fcee0a] selection:text-black font-sans relative">
        <Preloader />
        <MagneticCursor />
        {/* Continuous Starfield across the entire page (Layer 0, z-0) */}
        <GlobalStarfield />
        {/* Continuous Trail & Spaceship (Layer 1, z-[1] BEHIND cards & text) */}
        <ContinuousSpaceshipTrail />
        <SmoothScroll>
          <Header />
          {/* Website content & interactive cards in front (Layer 2, z-10) */}
          <main className="relative z-10">{children}</main>
        </SmoothScroll>
      </body>
    </html>
  );
}
