import SkillBadge from "../ui/SkillBadge";
import TechStackRadar from "../charts/TechStackRadar";
import { useSite } from "../context/SiteContext";

const SkillsMatrix = () => {
  const { skills } = useSite();
  const groups = [...new Set(skills.map((s) => s.group).filter(Boolean))];

  return (
    <section className="bg-portfolio-bg py-24" id="skills">
      <div className="section-shell">
        <div className="max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.28em] text-portfolio-gold">
            Skills Matrix
          </p>
          <h2 className="mt-3 font-display text-4xl font-bold text-portfolio-text md:text-5xl">
            A stack built for serious products.
          </h2>
          <p className="mt-5 text-lg leading-8 text-portfolio-subtext">
            Every skill listed here is managed from my admin dashboard — always
            current, always real.
          </p>
        </div>

        {skills.length === 0 ? (
          <p className="mt-12 rounded-3xl border border-dashed border-portfolio-border bg-portfolio-surface/40 p-10 text-center text-portfolio-subtext">
            Skills will appear here once they are added from the admin panel.
          </p>
        ) : (
          <div className="mt-12 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="grid gap-8 lg:grid-cols-3">
              {groups.map((g) => (
                <div key={g}>
                  <h3 className="mb-4 font-display text-xl font-bold text-portfolio-text">
                    {g}
                  </h3>
                  <div className="space-y-4">
                    {skills
                      .filter((s) => s.group === g)
                      .map((s) => (
                        <SkillBadge
                          key={s._id || s.name}
                          icon={s.icon}
                          name={s.name}
                          level={s.level}
                          description={s.description}
                        />
                      ))}
                  </div>
                </div>
              ))}
            </div>
            <div>
              <h3 className="mb-4 font-display text-xl font-bold text-portfolio-text">
                Engineering Balance
              </h3>
              <TechStackRadar />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default SkillsMatrix;
