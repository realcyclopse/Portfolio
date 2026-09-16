import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "#050608",
        surface: "#0d0f14",
        card: "#12141c",
        cyber: {
          yellow: "#fcee0a",
          cyan: "#00f0ff",
          red: "#ff003c",
          dark: "#050608",
          card: "#0d0f14",
          border: "rgba(252, 238, 10, 0.15)",
        },
        accent: {
          yellow: "#fcee0a",
          cyan: "#00f0ff",
          red: "#ff003c",
          purple: "#9d4edd",
          orange: "#ff5e00",
          emerald: "#10b981",
        },
        dennis: {
          bg: "#f1f1f1",
          dark: "#0d0f14",
          border: "rgba(255, 255, 255, 0.08)",
        }
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      animation: {
        "marquee": "marquee 25s linear infinite",
        "marquee-reverse": "marquee-reverse 25s linear infinite",
        "pulse-glow": "pulse-glow 3s ease-in-out infinite",
        "spin-slow": "spin 20s linear infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "marquee-reverse": {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0%)" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.4", transform: "scale(1)" },
          "50%": { opacity: "0.8", transform: "scale(1.08)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
