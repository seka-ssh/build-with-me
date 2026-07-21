import { motion } from "framer-motion";
import { ArrowRight, Download, ShieldCheck } from "lucide-react";
import TypewriterEffect from "../ui/TypewriterEffect";
const phrases = [
  "FinTech Solutions Engineer",
  "Full-Stack JavaScript Developer",
  "Banking Systems Architect",
  "MongoDB & Node.js Specialist",
];
const stats = [
  "14 Projects Built",
  "5+ Years Experience",
  "8 Live Deployments",
  "4 Countries Served",
];
const HeroSection = () => {
  const scroll = () =>
    document.getElementById("roadmap")?.scrollIntoView({ behavior: "smooth" });
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-mesh pt-24">
      <div className="absolute inset-0 bg-grid bg-[size:32px_32px] opacity-40 animate-floatGrid" />
      <div className="section-shell relative z-10 grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-portfolio-gold/30 bg-portfolio-gold/10 px-4 py-2 text-sm font-semibold text-portfolio-gold-light">
            <ShieldCheck size={18} /> Enterprise-grade portfolio platform
          </div>
          <h1 className="mt-8 font-display text-5xl font-extrabold tracking-tight text-portfolio-text sm:text-6xl lg:text-7xl">
            Seka Shalom
            <span className="mt-4 block h-1.5 w-36 rounded-full bg-gradient-to-r from-portfolio-gold to-portfolio-gold-light" />
          </h1>
          <p className="mt-7 font-display text-2xl font-semibold text-portfolio-text md:text-3xl">
            <TypewriterEffect phrases={phrases} />
          </p>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-portfolio-subtext">
            I design and build FinTech platforms, banking dashboards, enterprise
            automation systems, and high-performance full-stack products for
            African and international teams.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <button
              type="button"
              onClick={scroll}
              className="focus-ring inline-flex items-center gap-2 rounded-full bg-portfolio-gold px-6 py-3 font-bold text-portfolio-bg transition hover:bg-portfolio-gold-light"
            >
              View My Work <ArrowRight size={18} />
            </button>
            <a
              href="/cv.pdf"
              download
              className="focus-ring inline-flex items-center gap-2 rounded-full border border-portfolio-border px-6 py-3 font-bold text-portfolio-text transition hover:border-portfolio-gold hover:text-portfolio-gold"
            >
              Download CV <Download size={18} />
            </a>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {stats.map((s, i) => (
              <motion.div
                key={s}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.08 }}
                className="rounded-2xl border border-portfolio-border bg-portfolio-surface/70 p-4 text-sm font-semibold text-portfolio-text"
              >
                {s}
              </motion.div>
            ))}
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.75, delay: 0.15 }}
          className="relative hidden lg:block"
        >
          <div className="rounded-[2rem] border border-portfolio-gold/30 bg-portfolio-surface/70 p-6 shadow-glow backdrop-blur">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-portfolio-success" />
              <span className="h-3 w-3 rounded-full bg-portfolio-gold" />
              <span className="h-3 w-3 rounded-full bg-portfolio-muted" />
            </div>
            <div className="mt-8 space-y-4">
              {[
                "API latency: 185ms",
                "Ledger consistency: 100%",
                "Portfolio uptime: 99.98%",
                "Projects shipped: 14",
              ].map((x) => (
                <div
                  key={x}
                  className="rounded-2xl border border-portfolio-border bg-portfolio-bg/70 p-5 font-mono text-sm text-portfolio-gold-light"
                >
                  {x}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
export default HeroSection;
