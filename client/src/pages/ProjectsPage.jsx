import { Search } from "lucide-react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import PageTransition from "../components/layout/PageTransition";
import StatusBadge from "../components/ui/StatusBadge";
import useProjectFilter from "../hooks/useProjectFilter";
import { useProjects } from "../components/context/ProjectContext";

const statusFilters = ["All", "Finished", "In-Progress", "Pending"];
const ProjectCategories = [
  "All",
  "FinTech",
  "Banking",
  "Web App",
  "Dashboard",
  "E-Commerce",
  "Mobile",
  "Other",
];
const ProjectsPage = () => {
  const { state } = useProjects();
  const loading = state.loading;
  const error = state.error;
  const {
    status,
    setStatus,
    category,
    setCategory,
    search,
    setSearch,
    filteredProjects,
  } = useProjectFilter(state.projects);
  return (
    <PageTransition>
      <Helmet>
        <title>Projects | Seka Shalom — Full-Stack Engineer</title>
      </Helmet>
      <section className="min-h-screen bg-portfolio-bg pt-32 pb-24">
        <div className="section-shell">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.28em] text-portfolio-gold">
              Projects
            </p>
            <h1 className="mt-3 font-display text-4xl font-bold text-portfolio-text md:text-6xl">
              FinTech, banking, management, and analytics systems.
            </h1>
          </div>
          <div className="mt-10 grid gap-4 rounded-3xl border border-portfolio-border bg-portfolio-surface/70 p-4 md:grid-cols-[1fr_220px_220px]">
            <label className="relative">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-portfolio-muted"
                size={18}
              />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="focus-ring w-full rounded-2xl border border-portfolio-border bg-portfolio-bg py-3 pl-11 pr-4 text-portfolio-text"
                placeholder="Search by title, tagline, or tech stack"
              />
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="focus-ring rounded-2xl border border-portfolio-border bg-portfolio-bg px-4 py-3 text-portfolio-text"
            >
              {statusFilters.map((x) => (
                <option key={x}>{x}</option>
              ))}
            </select>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="focus-ring rounded-2xl border border-portfolio-border bg-portfolio-bg px-4 py-3 text-portfolio-text"
            >
              {ProjectCategories.map((x) => (
                <option key={x}>{x}</option>
              ))}
            </select>
          </div>
          {loading ? (
            <p className="mt-10 text-portfolio-subtext">Loading projects…</p>
          ) : error ? (
            <p className="mt-10 rounded-3xl border border-red-400/40 bg-red-500/10 p-6 text-red-200">
              {error}
            </p>
          ) : filteredProjects.length === 0 ? (
            <p className="mt-10 rounded-3xl border border-dashed border-portfolio-border bg-portfolio-surface/40 p-10 text-center text-portfolio-subtext">
              No projects match your filters yet. Projects are managed from the
              admin dashboard.
            </p>
          ) : (
            <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {filteredProjects.map((p) => (
                <Link
                  key={p._id || p.slug}
                  to={`/projects/${p.slug}`}
                  className="group rounded-3xl border border-portfolio-border bg-portfolio-surface/75 p-5 transition hover:-translate-y-1 hover:border-portfolio-gold/60 hover:shadow-glow"
                >
                  {p.thumbnailUrl ? (
                    <img
                      src={p.thumbnailUrl}
                      alt={p.title}
                      className="h-44 w-full rounded-2xl object-cover"
                    />
                  ) : (
                    <div className="flex h-44 w-full items-center justify-center rounded-2xl border border-portfolio-border bg-portfolio-bg text-4xl font-black text-portfolio-gold/40">
                      {p.title?.charAt(0) || "★"}
                    </div>
                  )}
                <div className="mt-5 flex items-center justify-between gap-3">
                  <span className="text-sm font-semibold text-portfolio-gold">
                    {p.category}
                  </span>
                  <StatusBadge status={p.status} />
                </div>
                <h2 className="mt-4 font-display text-xl font-bold text-portfolio-text group-hover:text-portfolio-gold-light">
                  {p.title}
                </h2>
                <p className="mt-3 line-clamp-3 text-sm leading-6 text-portfolio-subtext">
                  {p.tagline}
                </p>
                <div className="mt-5 h-2 overflow-hidden rounded-full bg-portfolio-border">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-portfolio-gold to-portfolio-gold-light"
                    style={{ width: `${p.completionPercentage}%` }}
                  />
                </div>
              </Link>
            ))}
          </div>
          )}
        </div>
      </section>
    </PageTransition>
  );
};
export default ProjectsPage;
