import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        "bg-elev": "var(--bg-elev)",
        surface: "var(--surface)",
        "surface-2": "var(--surface-2)",
        line: "var(--border)",
        "line-gold": "var(--border-gold)",
        ink: "var(--text)",
        muted: "var(--text-muted)",
        faint: "var(--text-faint)",
        gold: {
          DEFAULT: "var(--gold)",
          bright: "var(--gold-bright)",
          deep: "var(--gold-deep)",
        },
        sand: "var(--sand)",
        danger: "var(--danger)",
        success: "var(--success)",
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        heraldic: "0.22em",
        wide2: "0.14em",
      },
      maxWidth: {
        shell: "1240px",
      },
      boxShadow: {
        card: "0 1px 0 0 rgba(198,161,91,0.06), 0 18px 40px -24px rgba(0,0,0,0.9)",
        "card-hover": "0 1px 0 0 rgba(198,161,91,0.18), 0 28px 60px -28px rgba(0,0,0,0.95)",
        glow: "0 0 0 1px rgba(198,161,91,0.35), 0 10px 40px -12px rgba(198,161,91,0.28)",
      },
      backgroundImage: {
        "gold-line":
          "linear-gradient(90deg, transparent, var(--gold-deep), var(--gold), var(--gold-deep), transparent)",
        "hero-vignette":
          "radial-gradient(120% 90% at 50% 0%, rgba(198,161,91,0.10), transparent 60%)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.5s ease-out both",
        shimmer: "shimmer 1.5s infinite",
      },
      transitionTimingFunction: {
        "out-soft": "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
