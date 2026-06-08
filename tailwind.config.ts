// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      colors: {
        neu: {
          yellow: "#FFD60A",
          pink: "#FF6B9D",
          blue: "#4361EE",
          green: "#06D6A0",
          "dark-bg": "#0D0D0D",
          "dark-surface": "#1A1A1A",
          "neon-green": "#39FF14",
          "neon-yellow": "#F5FF00",
        },
      },
      // Shadows tetap bisa didefinisikan di sini untuk dipakai
      // lewat class Tailwind (shadow-neu, shadow-neu-lg, dst.)
      boxShadow: {
        "neu-sm": "2px 2px 0px 0px rgba(0,0,0,1)",
        neu: "4px 4px 0px 0px rgba(0,0,0,1)",
        "neu-md": "6px 6px 0px 0px rgba(0,0,0,1)",
        "neu-lg": "8px 8px 0px 0px rgba(0,0,0,1)",
        "neu-pressed": "0px 0px 0px 0px rgba(0,0,0,1)",
      },
      keyframes: {
        wiggle: {
          "0%, 100%": { transform: "rotate(-1deg)" },
          "50%": { transform: "rotate(1deg)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
      animation: {
        wiggle: "wiggle 0.5s ease-in-out",
        float: "float 3s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
