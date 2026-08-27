import { useCallback, useEffect, useRef, useState } from "react";
import { Bell, CheckCheck, Trash2, Inbox, Briefcase } from "lucide-react";
import toast from "react-hot-toast";
import {
  fetchNotifications,
  markNotificationRead,
  markAllNotificationsRead,
  deleteNotification,
} from "../../services/api";

/**
 * Live notification bell for the admin dashboard.
 * - Polls the server every 30s for new messages / hire requests
 * - Red badge with unread count
 * - Dropdown with mark-read / mark-all / delete
 * - Clicking an item jumps to the right dashboard tab
 */
const NotificationBell = ({ onOpenTab, align = "left" }) => {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([]);
  const [unread, setUnread] = useState(0);
  const ref = useRef(null);

  const load = useCallback(() => {
    fetchNotifications()
      .then((r) => {
        setItems(r.data || []);
        setUnread(r.unread || 0);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    load();
    const t = setInterval(load, 30000);
    return () => clearInterval(t);
  }, [load]);

  useEffect(() => {
    const close = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  const openItem = (n) => {
    if (!n.read) markNotificationRead(n._id).then(load).catch(() => {});
    if (onOpenTab && n.link) onOpenTab(n.link);
    setOpen(false);
  };

  const fmt = (d) => new Date(d).toLocaleString();

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        aria-label="Notifications"
        onClick={() => setOpen((o) => !o)}
        className="relative rounded-full border border-portfolio-border p-2.5 text-portfolio-subtext transition hover:border-portfolio-gold/60 hover:text-portfolio-gold"
      >
        <Bell size={18} />
        {unread > 0 && (
          <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white">
            {unread > 9 ? "9+" : unread}
          </span>
        )}
      </button>
      {open && (
        <div
          className={`fixed inset-x-3 top-[4.5rem] z-50 rounded-3xl border border-portfolio-border bg-portfolio-surface p-3 shadow-glow sm:absolute sm:inset-x-auto sm:top-auto sm:mt-2 sm:w-[min(20rem,calc(100vw-1.5rem))] ${
            align === "right" ? "sm:right-0" : "sm:left-0"
          }`}
        >
          <div className="flex items-center justify-between px-1 pb-2">
            <p className="text-sm font-bold">Notifications</p>
            {unread > 0 && (
              <button
                type="button"
                onClick={() =>
                  markAllNotificationsRead()
                    .then(load)
                    .catch((e) => toast.error(e.message))
                }
                className="inline-flex items-center gap-1 text-xs font-semibold text-portfolio-gold hover:underline"
              >
                <CheckCheck size={14} /> Mark all read
              </button>
            )}
          </div>
          <div className="max-h-80 space-y-2 overflow-y-auto">
            {items.length === 0 && (
              <p className="px-1 py-6 text-center text-sm text-portfolio-subtext">
                Nothing yet — new messages & hire requests appear here.
              </p>
            )}
            {items.map((n) => (
              <div
                key={n._id}
                className={`rounded-2xl border p-3 ${
                  n.read
                    ? "border-portfolio-border bg-portfolio-bg/40"
                    : "border-portfolio-gold/40 bg-portfolio-gold/5"
                }`}
              >
                <button
                  type="button"
                  onClick={() => openItem(n)}
                  className="w-full text-left"
                >
                  <div className="flex items-center gap-2">
                    {n.type === "hire" ? (
                      <Briefcase size={14} className="shrink-0 text-portfolio-gold" />
                    ) : (
                      <Inbox size={14} className="shrink-0 text-portfolio-gold" />
                    )}
                    <span className="truncate text-sm font-semibold">{n.title}</span>
                    {!n.read && (
                      <span className="ml-auto h-2 w-2 shrink-0 rounded-full bg-portfolio-gold" />
                    )}
                  </div>
                  {n.body && (
                    <p className="mt-1 line-clamp-2 text-xs text-portfolio-subtext">
                      {n.body}
                    </p>
                  )}
                  <p className="mt-1 text-[10px] text-portfolio-muted">
                    {fmt(n.createdAt)}
                  </p>
                </button>
                <div className="mt-2 flex justify-end">
                  <button
                    type="button"
                    aria-label="Delete notification"
                    onClick={() =>
                      deleteNotification(n._id)
                        .then(load)
                        .catch(() => {})
                    }
                    className="rounded-full p-1.5 text-portfolio-muted transition hover:bg-red-500/10 hover:text-red-300"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationBell;