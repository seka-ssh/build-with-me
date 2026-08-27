import { motion } from "framer-motion";
import { GraduationCap, MapPin, BadgeCheck } from "lucide-react";
import { useSite } from "../context/SiteContext";

const AboutSection = () => {
  const { settings } = useSite();
  const name = settings.name || "SEKA Shalom";
  const aboutText =
    settings.aboutText ||
    `I am ${name}, a full-stack developer focused on building reliable, scalable products — from polished React interfaces to secure Node.js APIs and well-modelled databases. I study constantly and hold myself to production-grade standards on every project.`;
  const paragraphs = aboutText
    .split(/\n+/)
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <section id="about" className="bg-portfolio-bg py-24">
      <div className="section-shell grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <motion.div
          initial={{ opacity: 0, x: -32 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="relative"
        >
          {settings.aboutImage || settings.profileImage ? (
            <img
              src={settings.aboutImage || settings.profileImage}
              alt={name}
              className="aspect-[4/5] w-full max-w-md rounded-[2rem] border border-portfolio-gold/30 object-cover shadow-glow"
            />
          ) : (
            <div className="flex aspect-[4/5] w-full max-w-md items-center justify-center rounded-[2rem] border border-portfolio-gold/30 bg-portfolio-surface/60 shadow-glow">
              <GraduationCap size={72} className="text-portfolio-gold/60" />
            </div>
          )}
          {settings.yearsExperience > 0 && (
            <div className="absolute -bottom-6 -right-2 rounded-2xl border border-portfolio-gold/40 bg-portfolio-bg/95 px-6 py-4 shadow-glow sm:right-6">
              <p className="font-display text-3xl font-extrabold text-portfolio-gold-light">
                {settings.yearsExperience}+
              </p>
              <p className="text-xs font-semibold uppercase tracking-wider text-portfolio-muted">
                Years of experience
              </p>
            </div>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 32 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-sm font-bold uppercase tracking-[0.28em] text-portfolio-gold">
            About Me
          </p>
          <h2 className="mt-3 font-display text-4xl font-bold text-portfolio-text md:text-5xl">
            {settings.aboutTitle || `I am a developer who ships.`}
          </h2>
          <div className="mt-6 space-y-4 text-lg leading-8 text-portfolio-subtext">
            {paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {settings.education && (
              <div className="flex items-start gap-3 rounded-2xl border border-portfolio-border bg-portfolio-surface/70 p-4">
                <GraduationCap className="mt-0.5 shrink-0 text-portfolio-gold" size={20} />
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-portfolio-muted">
                    Education
                  </p>
                  <p className="mt-1 text-sm font-semibold text-portfolio-text">
                    {settings.education}
                  </p>
                </div>
              </div>
            )}
            {settings.location && (
              <div className="flex items-start gap-3 rounded-2xl border border-portfolio-border bg-portfolio-surface/70 p-4">
                <MapPin className="mt-0.5 shrink-0 text-portfolio-gold" size={20} />
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-portfolio-muted">
                    Location
                  </p>
                  <p className="mt-1 text-sm font-semibold text-portfolio-text">
                    {settings.location}
                  </p>
                </div>
              </div>
            )}
            {settings.availability && (
              <div className="flex items-start gap-3 rounded-2xl border border-portfolio-border bg-portfolio-surface/70 p-4">
                <BadgeCheck className="mt-0.5 shrink-0 text-portfolio-gold" size={20} />
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-portfolio-muted">
                    Status
                  </p>
                  <p className="mt-1 text-sm font-semibold text-portfolio-text">
                    {settings.availability}
                  </p>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;