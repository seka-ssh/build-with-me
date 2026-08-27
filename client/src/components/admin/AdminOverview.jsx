import { useEffect, useState } from "react";
import { BarChart3, Inbox, FolderKanban, Users, Award, Briefcase } from "lucide-react";
import {
  fetchViewStats,
  fetchMessages,
  fetchProjects,
  fetchTestimonials,
  fetchCertificates,
  fetchHireRequests,
} from "../../services/api";

const AdminOverview = () => {
  const [stats, setStats] = useState({
    views: 0,
    sessions: 0,
    messages: 0,
    projects: 0,
    testimonials: 0,
    certificates: 0,
    hire: 0,
  });

  useEffect(() => {
    Promise.allSettled([
      fetchViewStats(),
      fetchMessages(),
      fetchProjects(),
      fetchTestimonials(),
      fetchCertificates(),
      fetchHireRequests(),
    ]).then(([v, m, p, t, c, h]) => {
      const views = v.status === "fulfilled" ? v.value : null;
      setStats({
        views: views?.totalViews || 0,
        sessions: views?.uniqueSessions || 0,
        messages: m.status === "fulfilled" ? m.value.length : 0,
        projects: p.status === "fulfilled" && Array.isArray(p.value) ? p.value.length : 0,
        testimonials: t.status === "fulfilled" && Array.isArray(t.value) ? t.value.length : 0,
        certificates: c.status === "fulfilled" && Array.isArray(c.value) ? c.value.length : 0,
        hire: h.status === "fulfilled" && Array.isArray(h.value) ? h.value.length : 0,
      });
    });
  }, []);

  const cards = [
    {
      label: "Site Views",
      value: stats.views,
      icon: BarChart3,
      sub: `${stats.sessions} unique sessions`,
    },
    { label: "Contact Messages", value: stats.messages, icon: Inbox },
    { label: "Hire Requests", value: stats.hire, icon: Briefcase },
    { label: "Projects", value: stats.projects, icon: FolderKanban },
    {
      label: "Testimonials",
      value: stats.testimonials,
      icon: Users,
    },
    {
      label: "Certificates",
      value: stats.certificates,
      icon: Award,
    },
  ];

  return (
    <div>
      <h1 className="font-display text-2xl font-bold">Overview</h1>
      <p className="mt-1 text-sm text-portfolio-subtext">
        A quick snapshot of your website.
      </p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((c) => {
          const Icon = c.icon;
          return (
            <div
              key={c.label}
              className="rounded-2xl border border-portfolio-border bg-portfolio-surface/60 p-5"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-portfolio-subtext">
                  {c.label}
                </span>
                <Icon className="text-portfolio-gold" size={20} />
              </div>
              <p className="mt-2 font-display text-3xl font-extrabold">
                {c.value}
              </p>
              {c.sub && (
                <p className="mt-1 text-xs text-portfolio-muted">{c.sub}</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default AdminOverview;