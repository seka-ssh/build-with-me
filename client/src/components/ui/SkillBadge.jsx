import {
  Code2,
  Database,
  GitBranch,
  KeyRound,
  Layers,
  Lock,
  Network,
  ServerCog,
  Sparkles,
  WalletCards,
  BarChart3,
  Globe,
} from "lucide-react";
const iconMap = {
  Code2,
  Database,
  GitBranch,
  KeyRound,
  Layers,
  Lock,
  Network,
  ServerCog,
  Sparkles,
  WalletCards,
  BarChart3,
  Globe,
};
const widths = {
  Expert: "w-[96%]",
  Advanced: "w-[84%]",
  Intermediate: "w-[68%]",
  Beginner: "w-[45%]",
};
const SkillBadge = ({ icon, name, level, description }) => {
  const Icon = (icon && iconMap[icon]) || Code2;
  const w = widths[level] || widths.Advanced;
  return (
    <article className="group relative overflow-hidden rounded-2xl border border-portfolio-border bg-portfolio-surface/80 p-5 transition hover:-translate-y-1 hover:border-portfolio-gold/60 hover:shadow-glow">
      <div className="flex items-start gap-4">
        <div className="rounded-2xl bg-portfolio-gold/10 p-3 text-portfolio-gold">
          <Icon size={22} />
        </div>
        <div>
          <h4 className="font-display text-base font-semibold text-portfolio-text">
            {name}
          </h4>
          <p className="mt-1 text-sm text-portfolio-subtext">{level}</p>
        </div>
      </div>
      <div className="mt-4 h-2 rounded-full bg-portfolio-border">
        <div
          className={`h-full rounded-full bg-gradient-to-r from-portfolio-gold to-portfolio-gold-light ${w}`}
        />
      </div>
      <p className="pointer-events-none absolute inset-x-4 bottom-4 translate-y-4 rounded-xl border border-portfolio-gold/20 bg-portfolio-bg/95 p-3 text-xs text-portfolio-subtext opacity-0 shadow-xl transition group-hover:translate-y-0 group-hover:opacity-100">
        {description}
      </p>
    </article>
  );
};
export default SkillBadge;
