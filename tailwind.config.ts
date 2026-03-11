import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0A0A0A",
        secondary: "#111111",
        accent: "#C8A95A",
        "accent-light": "#D4B96E",
        "accent-dark": "#A88B3D",
        muted: "#8A8A8A",
        surface: "#1A1A1A",
      },
      fontFamily: {
        heading: ["var(--font-bebas-neue)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
      },
      backgroundImage: {
        "hero-gradient":
          "linear-gradient(180deg, rgba(10,10,10,0.3) 0%, rgba(10,10,10,0.85) 70%, #0A0A0A 100%)",
        "card-gradient":
          "linear-gradient(135deg, rgba(200,169,90,0.1) 0%, rgba(10,10,10,0) 60%)",
        "gold-gradient":
          "linear-gradient(135deg, #C8A95A 0%, #D4B96E 50%, #A88B3D 100%)",
      },
      animation: {
        "scroll-indicator": "bounce 2s infinite",
        "fade-in": "fadeIn 0.6s ease-out forwards",
        shimmer: "shimmer 2s linear infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
    },
  },
  plugins: [],
};
export default config;