import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ExternalLink, Github, X } from "lucide-react";
import StatusBadge from "./StatusBadge";
import FinancialLineChart from "../charts/FinancialLineChart";
const ProjectModal = ({ project, onClose }) => {
  useEffect(() => {
    const f = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", f);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", f);
      document.body.style.overflow = "";
    };
  }, [onClose]);
  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
        >
          <motion.article
            className="max-h-[92vh] w-full max-w-5xl overflow-y-auto rounded-3xl border border-portfolio-gold/30 bg-portfolio-bg p-6 shadow-glow md:p-8"
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 20 }}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <StatusBadge status={project.status} />
                <h2 className="mt-4 font-display text-3xl font-bold text-portfolio-text md:text-4xl">
                  {project.title}
                </h2>
                <p className="mt-3 max-w-3xl text-portfolio-subtext">
                  {project.tagline}
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="focus-ring rounded-full border border-portfolio-border p-2 text-portfolio-subtext transition hover:border-portfolio-gold hover:text-portfolio-text"
                aria-label="Close modal"
              >
                <X size={22} />
              </button>
            </div>
            <div className="mt-8 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
              <div>
                <img
                  src={project.thumbnailUrl}
                  alt={`${project.title} dashboard preview`}
                  className="h-56 w-full rounded-2xl border border-portfolio-border object-cover"
                />
                <h3 className="mt-6 font-display text-xl font-semibold text-portfolio-text">
                  Overview
                </h3>
                <p className="mt-3 leading-7 text-portfolio-subtext">
                  {project.description}
                </p>
                <h3 className="mt-6 font-display text-xl font-semibold text-portfolio-text">
                  Engineering Challenge
                </h3>
                <p className="mt-3 leading-7 text-portfolio-subtext">
                  {project.challenges}
                </p>
              </div>
              <aside className="space-y-6">
                <div className="rounded-2xl border border-portfolio-border bg-portfolio-surface/70 p-5">
                  <h3 className="font-display text-lg font-semibold text-portfolio-text">
                    Financial Metrics
                  </h3>
                  <div className="mt-4 grid gap-3">
                    {Object.entries(project.financialMetrics).map(([k, v]) => (
                      <div
                        key={k}
                        className="rounded-xl bg-portfolio-bg/70 p-4"
                      >
                        <p className="text-xs uppercase tracking-[0.2em] text-portfolio-muted">
                          {k.replace(/([A-Z])/g, " $1")}
                        </p>
                        <p className="mt-1 font-semibold text-portfolio-text">
                          {v}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="rounded-2xl border border-portfolio-border bg-portfolio-surface/70 p-5">
                  <h3 className="font-display text-lg font-semibold text-portfolio-text">
                    Tech Stack
                  </h3>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.techStack.map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-portfolio-gold/20 bg-portfolio-gold/10 px-3 py-1 text-xs text-portfolio-gold-light"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </aside>
            </div>
            <div className="mt-8 rounded-2xl border border-portfolio-border bg-portfolio-surface/60 p-5">
              <FinancialLineChart project={project} />
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="focus-ring inline-flex items-center gap-2 rounded-full bg-portfolio-gold px-5 py-3 font-semibold text-portfolio-bg"
                >
                  Live Demo <ExternalLink size={18} />
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="focus-ring inline-flex items-center gap-2 rounded-full border border-portfolio-border px-5 py-3 font-semibold text-portfolio-text"
                >
                  GitHub <Github size={18} />
                </a>
              )}
            </div>
          </motion.article>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
export default ProjectModal;
