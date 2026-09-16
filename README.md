# Abhinav Kataria — Interactive Portfolio

> **Live Deployment**: [https://realcyclopse.github.io/Portfolio/](https://realcyclopse.github.io/Portfolio/)

Interactive personal portfolio built with Next.js 14, Three.js (React Three Fiber), Tailwind CSS, and Framer Motion, styled with a Cyberpunk 2077 aesthetic.

---

## ⚡ Tech Stack & Architecture

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router, Static HTML Export)
- **3D Graphics & WebGL**: [Three.js](https://threejs.org/), [@react-three/fiber](https://docs.pmnd.rs/react-three-fiber), [@react-three/drei](https://github.com/pmndrs/drei)
- **Animation & Physics**: [Framer Motion](https://www.framer.com/motion/), [Lenis Smooth Scroll](https://github.com/darkroomengineering/lenis)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/), Chakra Petch & JetBrains Mono typography
- **Deployment**: Automatic deployment to [GitHub Pages](https://pages.github.com/) via GitHub Actions

---

## 🚀 Key Features

- **Interactive 3D Cyber Core**: Luminous fluid WebGL cyber sphere with orbiting wireframe toruses, cursor-reactive perspective tilting, and smooth mathematical damping.
- **Continuous Global Starfield**: 2,600 multi-colored stars spanning the entire webpage continuously with scroll parallax.
- **Continuous Spaceship Laser Trail**: A compact cyberpunk stealth ship that descends continuously from top to bottom, swaying gently in a cosmic S-curve behind UI components.
- **Enterprise Experience Showcase**: Interactive macOS / Netrunner styled terminal simulator demonstrating PII-safe AI gateway request flows with zero layout shifts.
- **Optimized Static Delivery**: Zero server dependencies, subpath-aware asset routing, and responsive typography across all screen viewports.

---

## 💻 Local Development

```bash
# Clone the repository
git clone https://github.com/realcyclopse/Portfolio.git

# Install dependencies
npm install

# Start local development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

---

## 📦 Building for Production / GitHub Pages

```bash
npm run build
```

This generates a static export in the `./out` directory ready for deployment to GitHub Pages.
