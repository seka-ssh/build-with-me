import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  LayoutDashboard,
  FolderKanban,
  MessageSquareQuote,
  Award,
  Inbox,
  Settings,
  LogOut,
  Sparkles,
  Briefcase,
} from "lucide-react";
import { fetchAdmin } from "../services/api";
import NotificationBell from "../components/admin/NotificationBell";
import AdminProjects from "../components/admin/AdminProjects";
import AdminTestimonials from "../components/admin/AdminTestimonials";
import AdminCertificates from "../components/admin/AdminCertificates";
import AdminMessages from "../components/admin/AdminMessages";
import AdminSettings from "../components/admin/AdminSettings";
import AdminSkills from "../components/admin/AdminSkills";
import AdminHire from "../components/admin/AdminHire";
import AdminOverview from "../components/admin/AdminOverview";

const tabs = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "projects", label: "Projects", icon: FolderKanban },
  { id: "skills", label: "Skills", icon: Sparkles },
  { id: "testimonials", label: "Testimonials", icon: MessageSquareQuote },
  { id: "certificates", label: "Certificates", icon: Award },
  { id: "messages", label: "Messages", icon: Inbox },
  { id: "hire", label: "Hire Requests", icon: Briefcase },
  { id: "settings", label: "Settings", icon: Settings },
];

const AdminDashboard = () => {
  const nav = useNavigate();
  const [active, setActive] = useState("overview");
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    fetchAdmin()
      .then(setAdmin)
      .catch(() => {
        localStorage.removeItem("sekaAdminToken");
        nav("/admin/login");
      });
  }, [nav]);

  const logout = () => {
    localStorage.removeItem("sekaAdminToken");
    nav("/admin/login");
  };

  return (
    <div className="min-h-screen bg-portfolio-bg text-portfolio-text">
      <Helmet>
        <title>Admin Dashboard | SEKA Shalom</title>
      </Helmet>
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 border-r border-portfolio-border bg-portfolio-surface/50 p-5 lg:block">
        <div className="flex items-center gap-2">
          <LayoutDashboard className="text-portfolio-gold" size={22} />
          <span className="font-display text-lg font-bold">Admin Panel</span>
        </div>
        <nav className="mt-8 space-y-1">
          {tabs.map((t) => {
            const Icon = t.icon;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => setActive(t.id)}
                className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm font-semibold transition ${
                  active === t.id
                    ? "bg-portfolio-gold text-portfolio-bg"
                    : "text-portfolio-subtext hover:bg-portfolio-surface hover:text-portfolio-text"
                }`}
              >
                <Icon size={18} /> {t.label}
              </button>
            );
          })}
        </nav>
        <div className="mt-10 border-t border-portfolio-border pt-4">
          <div className="flex items-center justify-between pr-2">
            <p className="px-2 text-xs text-portfolio-muted">
              {admin?.name || "Admin"}
            </p>
            <NotificationBell onOpenTab={setActive} />
          </div>
          <button
            type="button"
            onClick={logout}
            className="mt-2 flex w-full items-center gap-2 rounded-2xl px-4 py-2 text-sm font-semibold text-portfolio-subtext transition hover:text-portfolio-gold"
          >
            <LogOut size={18} /> Logout
          </button>
        </div>
      </aside>
      <div className="lg:pl-64">
        <div className="sticky top-0 z-20 flex items-center justify-between border-b border-portfolio-border bg-portfolio-bg/90 px-4 py-3 backdrop-blur lg:hidden">
          <span className="font-display font-bold">Admin Panel</span>
          <div className="flex items-center gap-2">
            <NotificationBell onOpenTab={setActive} align="right" />
            <select
              value={active}
              onChange={(e) => setActive(e.target.value)}
              className="max-w-[9.5rem] rounded-2xl border border-portfolio-border bg-portfolio-bg px-2 py-2 text-xs sm:px-3 sm:text-sm"
            >
              {tabs.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.label}
                </option>
              ))}
            </select>
            <button
              type="button"
              onClick={logout}
              className="rounded-2xl border border-portfolio-border p-2 text-portfolio-subtext"
              aria-label="Logout"
            >
              <LogOut size={18} />
            </button>
          </div>
        </div>
        <main className="p-4 md:p-8">
          {active === "overview" && <AdminOverview />}
          {active === "projects" && <AdminProjects />}
          {active === "skills" && <AdminSkills />}
          {active === "testimonials" && <AdminTestimonials />}
          {active === "certificates" && <AdminCertificates />}
          {active === "messages" && <AdminMessages />}
          {active === "hire" && <AdminHire />}
          {active === "settings" && <AdminSettings />}
        </main>
      </div>
    </div>
  );
};
export default AdminDashboard;