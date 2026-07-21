import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import PageTransition from "../components/layout/PageTransition";
import StatusBadge from "../components/ui/StatusBadge";
import FinancialLineChart from "../components/charts/FinancialLineChart";
import { useProjects } from "../components/context/ProjectContext";
import { formatDate, projectDuration } from "../utils/formatters";
const ProjectDetailPage = () => {
  const { slug } = useParams();
  const { state } = useProjects();
  const p = state.projects.find((x) => x.slug === slug);
  if (!p)
    return (
      <PageTransition>
        <section className="min-h-screen bg-portfolio-bg pt-32">
          <div className="section-shell">
            <h1 className="font-display text-4xl font-bold text-portfolio-text">
              Project not found.
            </h1>
            <Link
              to="/projects"
              className="mt-6 inline-flex text-portfolio-gold"
            >
              Back to projects
            </Link>
          </div>
        </section>
      </PageTransition>
    );
  return (
    <PageTransition>
      <Helmet>
        <title>{p.title} | Seka Shalom</title>
        <meta name="description" content={p.tagline} />
      </Helmet>
      <section className="min-h-screen bg-portfolio-bg pt-32 pb-24">
        <div className="section-shell">
          <Link
            to="/projects"
            className="focus-ring inline-flex items-center gap-2 rounded-full border border-portfolio-border px-4 py-2 text-sm font-semibold text-portfolio-subtext transition hover:border-portfolio-gold hover:text-portfolio-gold"
          >
            <ArrowLeft size={18} /> Back to projects
          </Link>
          <div className="mt-8 grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <StatusBadge status={p.status} />
              <h1 className="mt-5 font-display text-4xl font-bold text-portfolio-text md:text-6xl">
                {p.title}
              </h1>
              <p className="mt-5 text-xl leading-8 text-portfolio-subtext">
                {p.tagline}
              </p>
              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                {[
                  ["Started", formatDate(p.startDate)],
                  ["Completed", formatDate(p.completionDate)],
                  ["Duration", projectDuration(p.startDate, p.completionDate)],
                ].map(([a, b]) => (
                  <div
                    key={a}
                    className="rounded-2xl border border-portfolio-border bg-portfolio-surface/70 p-4"
                  >
                    <p className="text-xs text-portfolio-muted">{a}</p>
                    <p className="mt-1 font-semibold text-portfolio-text">
                      {b}
                    </p>
                  </div>
                ))}
              </div>
              <p className="mt-8 leading-8 text-portfolio-subtext">
                {p.description}
              </p>
            </div>
            <img
              src={p.thumbnailUrl}
              alt={p.title}
              className="h-full min-h-80 rounded-3xl border border-portfolio-border object-cover shadow-glow"
            />
          </div>
          <div className="mt-12 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <aside className="space-y-6">
              <div className="rounded-3xl border border-portfolio-border bg-portfolio-surface/70 p-6">
                <h2 className="font-display text-xl font-bold text-portfolio-text">
                  Financial Metrics
                </h2>
                <div className="mt-5 grid gap-3">
                  {Object.entries(p.financialMetrics).map(([k, v]) => (
                    <div key={k} className="rounded-2xl bg-portfolio-bg/60 p-4">
                      <p className="text-xs uppercase tracking-[0.22em] text-portfolio-muted">
                        {k.replace(/([A-Z])/g, " $1")}
                      </p>
                      <p className="mt-1 font-semibold text-portfolio-text">
                        {v}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-3xl border border-portfolio-border bg-portfolio-surface/70 p-6">
                <h2 className="font-display text-xl font-bold text-portfolio-text">
                  Stack
                </h2>
                <div className="mt-5 flex flex-wrap gap-2">
                  {p.techStack.map((t) => (
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
            <div className="space-y-8">
              <div className="rounded-3xl border border-portfolio-border bg-portfolio-surface/70 p-6">
                <h2 className="font-display text-xl font-bold text-portfolio-text">
                  Features
                </h2>
                <div className="mt-5 grid gap-3 md:grid-cols-2">
                  {p.features.map((f) => (
                    <div
                      key={f}
                      className="rounded-2xl border border-portfolio-border bg-portfolio-bg/60 p-4 text-sm text-portfolio-subtext"
                    >
                      {f}
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-3xl border border-portfolio-border bg-portfolio-surface/70 p-6">
                <FinancialLineChart project={p} />
              </div>
              <div className="flex flex-wrap gap-3">
                {p.liveUrl && (
                  <a
                    href={p.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="focus-ring inline-flex items-center gap-2 rounded-full bg-portfolio-gold px-5 py-3 font-bold text-portfolio-bg"
                  >
                    Live Demo <ExternalLink size={18} />
                  </a>
                )}
                {p.githubUrl && (
                  <a
                    href={p.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="focus-ring inline-flex items-center gap-2 rounded-full border border-portfolio-border px-5 py-3 font-bold text-portfolio-text"
                  >
                    GitHub <Github size={18} />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
};
export default ProjectDetailPage;
