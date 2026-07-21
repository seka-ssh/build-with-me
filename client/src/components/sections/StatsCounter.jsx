import AnimatedCounter from "../ui/AnimatedCounter";
const stats = [
  { value: 14, suffix: "", label: "Projects" },
  { value: 40000, suffix: "+", label: "Users Served" },
  { value: 9, suffix: "M+", label: "Transactions Processed" },
  { value: 99, suffix: ".98% Uptime", label: "Reliability" },
];
const StatsCounter = () => (
  <section className="bg-portfolio-bg py-24">
    <div className="section-shell">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-sm font-bold uppercase tracking-[0.28em] text-portfolio-gold">
          Measured Impact
        </p>
        <h2 className="mt-3 font-display text-4xl font-bold text-portfolio-text md:text-5xl">
          Built for numbers that matter.
        </h2>
      </div>
      <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <AnimatedCounter key={s.label} {...s} />
        ))}
      </div>
    </div>
  </section>
);
export default StatsCounter;
