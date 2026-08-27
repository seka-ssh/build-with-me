import { motion } from "framer-motion";
import { ArrowRight, Download, Eye, ShieldCheck } from "lucide-react";
import TypewriterEffect from "../ui/TypewriterEffect";
import { useSite } from "../context/SiteContext";
const phrases = [
  "FinTech Solutions Engineer",
  "Full-Stack JavaScript Developer",
  "Banking Systems Architect",
  "MongoDB & Node.js Specialist",
];
const HeroSection = () => {
  const { settings } = useSite();
  const scroll = () =>
    document.getElementById("roadmap")?.scrollIntoView({ behavior: "smooth" });
  const name = settings.name || "SEKA Shalom";
  const cvHref = settings.cvUrl || "";
  const heroStats = [
    { n: `${settings.projectsCount || 0}`, l: "Projects Built" },
    { n: `${settings.yearsExperience || 0}+`, l: "Years Experience" },
    { n: `${settings.clientsServed || 0}+`, l: "Clients Served" },
    { n: `${settings.countriesServed || 0}`, l: "Countries Served" },
  ];
  const miniStats = [
    ["Projects", `${settings.projectsCount || 0}+`],
    ["Experience", `${settings.yearsExperience || 0}+ yrs`],
    ["Countries", `${settings.countriesServed || 0}`],
    ["Users", settings.usersServed ? `${settings.usersServed}+` : "—"],
  ];
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
          {settings.profileImage && (
            <img
              src={settings.profileImage}
              alt={name}
              className="mt-8 aspect-square w-56 rounded-3xl border border-portfolio-gold/30 object-cover shadow-glow lg:hidden"
            />
          )}
          <h1 className="mt-8 font-display text-5xl font-extrabold tracking-tight text-portfolio-text sm:text-6xl lg:text-7xl">
            {name}
            <span className="mt-4 block h-1.5 w-36 rounded-full bg-gradient-to-r from-portfolio-gold to-portfolio-gold-light" />
          </h1>
          <p className="mt-7 font-display text-2xl font-semibold text-portfolio-text md:text-3xl">
            <TypewriterEffect phrases={phrases} />
          </p>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-portfolio-subtext">
            {settings.bio ||
              `I design and build FinTech platforms, banking dashboards, enterprise
            automation systems, and high-performance full-stack products for
            African and international teams.`}
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <button
              type="button"
              onClick={scroll}
              className="focus-ring inline-flex items-center gap-2 rounded-full bg-portfolio-gold px-6 py-3 font-bold text-portfolio-bg transition hover:bg-portfolio-gold-light"
            >
              View My Work <ArrowRight size={18} />
            </button>
            {settings.cvUrl && (
              <>
                <a
                  href={cvHref}
                  download={cvHref.startsWith("http") ? `${name.replace(/\s+/g, "-")}-CV.pdf` : undefined}
                  className="focus-ring inline-flex items-center gap-2 rounded-full border border-portfolio-border px-6 py-3 font-bold text-portfolio-text transition hover:border-portfolio-gold hover:text-portfolio-gold"
                >
                  Download CV <Download size={18} />
                </a>
                <a
                  href={cvHref}
                  target="_blank"
                  rel="noreferrer"
                  className="focus-ring inline-flex items-center gap-2 rounded-full border border-portfolio-border px-6 py-3 font-bold text-portfolio-text transition hover:border-portfolio-gold hover:text-portfolio-gold"
                >
                  View CV <Eye size={18} />
                </a>
              </>
            )}
          </div>
          <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {heroStats.map((s, i) => (
              <motion.div
                key={s.l}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.08 }}
                className="rounded-2xl border border-portfolio-border bg-portfolio-surface/70 p-4 text-sm font-semibold text-portfolio-text"
              >
                <span className="font-display text-lg font-extrabold text-portfolio-gold-light">
                  {s.n}
                </span>{" "}
                {s.l}
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
            {settings.profileImage ? (
              <img
                src={settings.profileImage}
                alt={name}
                className="mt-8 aspect-square w-full rounded-3xl border border-portfolio-gold/30 object-cover"
              />
            ) : (
              <div className="mt-8 space-y-4">
                {[
                  `API latency: 185ms`,
                  `Ledger consistency: 100%`,
                  `Systems shipped: ${settings.projectsCount || "10+"}`,
                  `Clients served: ${settings.clientsServed || "8+"}`,
                ].map((x) => (
                  <div
                    key={x}
                    className="rounded-2xl border border-portfolio-border bg-portfolio-bg/70 p-5 font-mono text-sm text-portfolio-gold-light"
                  >
                    {x}
                  </div>
                ))}
              </div>
            )}
            {settings.profileImage && (
              <div className="mt-6 grid grid-cols-2 gap-3">
                {miniStats.map(([a, b]) => (
                  <div
                    key={a}
                    className="rounded-2xl border border-portfolio-border bg-portfolio-bg/60 px-3 py-2 text-center"
                  >
                    <p className="font-display text-lg font-extrabold text-portfolio-gold-light">
                      {b}
                    </p>
                    <p className="text-xs text-portfolio-muted">{a}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
export default HeroSection;
