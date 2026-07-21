import { useEffect, useState } from "react";
import { BarChart3 } from "lucide-react";
import { fetchViewStats } from "../../services/api";
const AnalyticsBadge = () => {
  const [stats, setStats] = useState(null);
  const admin =
    new URLSearchParams(window.location.search).get("admin") === "true" ||
    localStorage.getItem("sekaAdminMode") === "true";
  useEffect(() => {
    if (!admin) return undefined;
    fetchViewStats()
      .then(setStats)
      .catch(() => undefined);
    const t = setInterval(
      () =>
        fetchViewStats()
          .then(setStats)
          .catch(() => undefined),
      30000,
    );
    return () => clearInterval(t);
  }, [admin]);
  if (!admin || !stats) return null;
  return (
    <div className="fixed bottom-4 right-4 z-40 rounded-2xl border border-portfolio-gold/30 bg-portfolio-bg/90 px-4 py-3 text-sm text-portfolio-text shadow-glow backdrop-blur">
      <div className="flex items-center gap-2 font-semibold">
        <BarChart3 size={18} className="text-portfolio-gold" />
        {stats.totalViews} portfolio views
      </div>
      <p className="mt-1 text-xs text-portfolio-subtext">
        {stats.uniqueSessions} unique sessions
      </p>
    </div>
  );
};
export default AnalyticsBadge;
