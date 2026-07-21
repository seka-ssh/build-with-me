import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { trackPageView } from "../services/api";
const id = () => {
  const k = "sekaPortfolioSessionId";
  const e = sessionStorage.getItem(k);
  if (e) return e;
  const v = crypto.randomUUID
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random()}`;
  sessionStorage.setItem(k, v);
  return v;
};
const usePageTracking = () => {
  const loc = useLocation();
  useEffect(() => {
    const m = loc.pathname.match(/^\/projects\/([^/]+)/);
    trackPageView({
      route: loc.pathname,
      projectSlug: m ? m[1] : null,
      sessionId: id(),
    }).catch(() => undefined);
  }, [loc.pathname]);
};
export default usePageTracking;
