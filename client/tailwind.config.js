/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["Sora", "Inter", "sans-serif"],
        body: ["Inter", "sans-serif"],
      },
      colors: {
        portfolio: {
          bg: "#0A0E1A",
          surface: "#111827",
          border: "#1F2937",
          gold: "#F59E0B",
          "gold-light": "#FDE68A",
          amber: "#D97706",
          success: "#10B981",
          muted: "#6B7280",
          text: "#F9FAFB",
          subtext: "#9CA3AF",
        },
      },
      boxShadow: {
        glow: "0 0 35px rgba(245,158,11,.24)",
        successGlow: "0 0 30px rgba(16,185,129,.20)",
      },
      backgroundImage: {
        mesh: "radial-gradient(circle at top left, rgba(245,158,11,.18), transparent 35%), radial-gradient(circle at bottom right, rgba(59,130,246,.16), transparent 34%), linear-gradient(135deg,#0A0E1A 0%,#111827 52%,#0B1220 100%)",
        grid: "linear-gradient(rgba(255,255,255,.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.035) 1px, transparent 1px)",
      },
      keyframes: {
        pulseBorder: {
          "0%,100%": { boxShadow: "0 0 0 0 rgba(217,119,6,.55)" },
          "50%": { boxShadow: "0 0 0 10px rgba(217,119,6,0)" },
        },
        floatGrid: {
          "0%": { transform: "translate3d(0,0,0)" },
          "100%": { transform: "translate3d(-32px,-32px,0)" },
        },
      },
      animation: {
        pulseBorder: "pulseBorder 2.2s ease-in-out infinite",
        floatGrid: "floatGrid 16s linear infinite",
      },
    },
  },
  plugins: [],
};
