import { CheckCircle2, Lock, Zap } from "lucide-react";
import { motion } from "framer-motion";
import StatusBadge from "./StatusBadge";
const card = {
  Finished:
    "border-portfolio-gold/70 bg-portfolio-surface shadow-glow opacity-100",
  "In-Progress":
    "border-portfolio-amber/80 bg-portfolio-surface/90 opacity-90 animate-pulseBorder",
  Pending:
    "border-portfolio-muted/40 bg-portfolio-surface/40 opacity-60 blur-[1px] pointer-events-none",
};
const dot = {
  Finished: "bg-portfolio-success text-portfolio-bg shadow-successGlow",
  "In-Progress": "bg-portfolio-amber text-portfolio-bg animate-pulseBorder",
  Pending: "bg-portfolio-muted text-portfolio-bg",
};
const RoadmapNode = ({ project, index, onOpen }) => {
  const left = index % 2 === 0,
    can = project.status !== "Pending",
    Icon =
      project.status === "Finished"
        ? CheckCircle2
        : project.status === "Pending"
          ? Lock
          : Zap;
  return (
    <div className="relative grid gap-6 py-8 md:grid-cols-[1fr_72px_1fr] md:items-center">
      <div
        className={`${left ? "md:col-start-1" : "md:col-start-3"} order-2 md:order-none`}
      >
        <motion.button
          type="button"
          disabled={!can}
          onClick={() => can && onOpen(project)}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.55, delay: index * 0.03 }}
          className={`focus-ring relative w-full overflow-hidden rounded-3xl border p-6 text-left transition ${card[project.status]} ${can ? "hover:-translate-y-1" : ""}`}
        >
          {project.status === "Pending" && (
            <div className="absolute inset-0 z-10 flex items-center justify-center bg-portfolio-bg/25">
              <span className="rounded-full border border-portfolio-muted bg-portfolio-bg/80 px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-portfolio-subtext">
                Coming Soon
              </span>
            </div>
          )}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="text-sm font-semibold text-portfolio-gold">
              Project {String(index + 1).padStart(2, "0")}
            </span>
            <StatusBadge status={project.status} />
          </div>
          <h3 className="mt-4 font-display text-2xl font-bold text-portfolio-text">
            {project.title}
          </h3>
          <p className="mt-3 text-sm leading-6 text-portfolio-subtext">
            {project.tagline}
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {project.techStack.slice(0, 5).map((t) => (
              <span
                key={t}
                className="rounded-full border border-portfolio-border bg-portfolio-bg/60 px-3 py-1 text-xs text-portfolio-subtext"
              >
                {t}
              </span>
            ))}
          </div>
          {project.status === "In-Progress" && (
            <div className="mt-5">
              <div className="mb-2 flex justify-between text-xs text-portfolio-subtext">
                <span>Completion</span>
                <span>{project.completionPercentage}%</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-portfolio-border">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-portfolio-amber to-portfolio-gold-light"
                  style={{ width: `${project.completionPercentage}%` }}
                />
              </div>
            </div>
          )}
        </motion.button>
      </div>
      <div className="order-1 flex justify-center md:col-start-2 md:order-none">
        <div
          className={`z-20 flex h-12 w-12 items-center justify-center rounded-full border-4 border-portfolio-bg ${dot[project.status]}`}
        >
          <Icon size={22} />
        </div>
      </div>
      <div
        className={`${left ? "md:col-start-3" : "md:col-start-1 md:row-start-1"} hidden md:block`}
      />
    </div>
  );
};
export default RoadmapNode;
