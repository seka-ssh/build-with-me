import AnimatedCounter from "../ui/AnimatedCounter";
import { useSite } from "../context/SiteContext";

const StatsCounter = () => {
  const { settings } = useSite();

  const stats = [
    {
      value: Number(settings.projectsCount) || 0,
      suffix: "+",
      label: "Projects Completed",
    },
    {
      value: Number(settings.yearsExperience) || 0,
      suffix: "+",
      label: "Years of Experience",
    },
    {
      value: Number(settings.countriesServed) || 0,
      suffix: "",
      label: "Countries Served",
    },
    {
      value: Number(settings.clientsServed) || 0,
      suffix: "+",
      label: "Clients Served",
    },
    {
      value: Number(settings.usersServed) || 0,
      suffix: "+",
      label: "Users Served",
    },
    {
      value: Number(settings.transactions) || 0,
      suffix: "+",
      label: "Transactions Processed",
    },
  ].filter((s) => s.value > 0);

  return (
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
        {stats.length === 0 ? (
          <p className="mt-12 text-center text-portfolio-subtext">
            Stats will appear here once they are set in the admin panel.
          </p>
        ) : (
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {stats.map((s) => (
              <AnimatedCounter key={s.label} {...s} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default StatsCounter;
