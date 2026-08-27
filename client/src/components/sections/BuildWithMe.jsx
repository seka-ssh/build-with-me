import { motion } from "framer-motion";
import {
  Rocket,
  ShieldCheck,
  HeartHandshake,
  Hammer,
  ArrowRight,
  MessagesSquare,
} from "lucide-react";
import { useSite } from "../context/SiteContext";

const perks = [
  {
    icon: Rocket,
    title: "Fast delivery",
    text: "Clean, tested code shipped within agreed timelines.",
  },
  {
    icon: ShieldCheck,
    title: "Production-grade",
    text: "Secure APIs, real databases, zero shortcuts.",
  },
  {
    icon: HeartHandshake,
    title: "Support included",
    text: "I stay available after launch — you're never alone.",
  },
  {
    icon: Hammer,
    title: "Built with me",
    text: "Progress updates at every milestone, no surprises.",
  },
];

/**
 * "Build with me" marketing section:
 * - Proof of what this portfolio demonstrates
 * - Persuasion to hire SEKA for the visitor's own project
 */
const BuildWithMe = () => {
  const { settings } = useSite();
  const scroll = () =>
    document.getElementById("hire")?.scrollIntoView({ behavior: "smooth" });

  return (
    <section className="relative overflow-hidden bg-portfolio-bg py-24">
      <div className="absolute inset-0 bg-grid bg-[size:28px_28px] opacity-20" />
      <div className="section-shell relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="text-sm font-bold uppercase tracking-[0.28em] text-portfolio-gold">
            Build With Me
          </p>
          <h2 className="mt-3 font-display text-4xl font-bold text-portfolio-text md:text-5xl">
            The work is the proof. Your project can be next.
          </h2>
          <p className="mt-5 text-lg leading-8 text-portfolio-subtext">
            Everything you just scrolled through — the roadmap, the systems, the
            numbers — was designed, engineered, and shipped by me. Bring your
            idea and we'll build something just as solid, together.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {perks.map((p, i) => {
            const Icon = p.icon;
            return (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="rounded-3xl border border-portfolio-border bg-portfolio-surface/70 p-6 transition hover:border-portfolio-gold/50 hover:shadow-glow"
              >
                <Icon size={26} className="text-portfolio-gold" />
                <h3 className="mt-4 font-display text-lg font-bold text-portfolio-text">
                  {p.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-portfolio-subtext">
                  {p.text}
                </p>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <button
            type="button"
            onClick={scroll}
            className="focus-ring inline-flex items-center gap-2 rounded-full bg-portfolio-gold px-8 py-4 font-bold text-portfolio-bg transition hover:bg-portfolio-gold-light"
          >
            Start your project <ArrowRight size={18} />
          </button>
          <a
            href={settings.email ? `mailto:${settings.email}` : "/contact"}
            className="focus-ring inline-flex items-center gap-2 rounded-full border border-portfolio-border px-8 py-4 font-bold text-portfolio-text transition hover:border-portfolio-gold hover:text-portfolio-gold"
          >
            Talk to me first <MessagesSquare size={18} />
          </a>
        </motion.div>

        {(settings.projectsCount > 0 || settings.yearsExperience > 0) && (
          <p className="mt-8 text-center text-sm text-portfolio-muted">
            {settings.projectsCount > 0 && `${settings.projectsCount}+ projects built`}
            {settings.projectsCount > 0 && settings.yearsExperience > 0 && " · "}
            {settings.yearsExperience > 0 && `${settings.yearsExperience}+ years of experience`}
            {settings.clientsServed > 0 && ` · ${settings.clientsServed}+ clients served`}
          </p>
        )}
      </div>
    </section>
  );
};

export default BuildWithMe;