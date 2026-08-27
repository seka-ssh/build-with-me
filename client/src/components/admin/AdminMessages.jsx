import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Mail, MailOpen, Trash2, Send } from "lucide-react";
import {
  fetchMessages,
  markMessageRead,
  deleteMessage,
  replyToMessage,
} from "../../services/api";

const AdminMessages = () => {
  const [messages, setMessages] = useState([]);
  const [open, setOpen] = useState(null);
  const [loading, setLoading] = useState(false);
  const [reply, setReply] = useState("");
  const [sending, setSending] = useState(false);

  const load = () =>
    fetchMessages()
      .then(setMessages)
      .catch((e) => toast.error(e.message));
  useEffect(() => {
    load();
  }, []);

  const mark = async (id) => {
    try {
      await markMessageRead(id);
      load();
      if (open?._id === id) setOpen({ ...open, read: true });
    } catch (e) {
      toast.error(e.message);
    }
  };

  const remove = async (id) => {
    if (!window.confirm("Delete this message?")) return;
    setLoading(true);
    try {
      await deleteMessage(id);
      if (open?._id === id) setOpen(null);
      toast.success("Deleted.");
      load();
    } catch (e) {
      toast.error(e.message);
    } finally {
      setLoading(false);
    }
  };

  const sendReply = async () => {
    if (!reply.trim()) {
      toast.error("Write a reply first.");
      return;
    }
    setSending(true);
    try {
      const r = await replyToMessage(open._id, reply);
      r.delivered ? toast.success(r.message) : toast.error(r.message);
      setReply("");
    } catch (e) {
      toast.error(e.message);
    } finally {
      setSending(false);
    }
  };

  const fmt = (d) =>
    d ? new Date(d).toLocaleString() : "";

  return (
    <div>
      <h1 className="font-display text-2xl font-bold">Messages</h1>
      <p className="mt-1 text-sm text-portfolio-subtext">
        Contact form submissions.
      </p>

      <div className="mt-6 grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="space-y-3">
          {messages.length === 0 && (
            <p className="text-sm text-portfolio-subtext">No messages yet.</p>
          )}
          {messages.map((m) => (
            <button
              key={m._id}
              type="button"
              onClick={() => setOpen(m)}
              className={`flex w-full items-start gap-3 rounded-2xl border p-4 text-left transition ${
                open?._id === m._id
                  ? "border-portfolio-gold/60 bg-portfolio-surface"
                  : "border-portfolio-border bg-portfolio-surface/50 hover:border-portfolio-gold/40"
              }`}
            >
              <div className="mt-1">
                {m.read ? (
                  <MailOpen className="text-portfolio-subtext" size={18} />
                ) : (
                  <Mail className="text-portfolio-gold" size={18} />
                )}
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-semibold">{m.name}</span>
                  {!m.read && (
                    <span className="rounded-full bg-portfolio-gold px-2 py-0.5 text-[10px] font-bold text-portfolio-bg">
                      NEW
                    </span>
                  )}
                </div>
                <p className="truncate text-sm text-portfolio-subtext">{m.subject}</p>
                <p className="text-xs text-portfolio-muted">{fmt(m.createdAt)}</p>
              </div>
            </button>
          ))}
        </div>

        <div className="rounded-3xl border border-portfolio-border bg-portfolio-surface/60 p-5">
          {!open ? (
            <p className="text-sm text-portfolio-subtext">
              Select a message to view details.
            </p>
          ) : (
            <div>
              <div className="flex items-center justify-between">
                <h3 className="font-display text-xl font-bold">{open.name}</h3>
              </div>
              <p className="mt-1 text-sm text-portfolio-gold">{open.email}</p>
              <p className="mt-1 text-xs text-portfolio-muted">
                {open.subject} · {fmt(open.createdAt)}
              </p>
              <div className="mt-4 rounded-2xl bg-portfolio-bg p-4 text-sm leading-6">
                {open.message}
              </div>

              <div className="mt-4 rounded-2xl border border-portfolio-border bg-portfolio-bg p-4">
                <p className="text-xs font-bold uppercase tracking-wider text-portfolio-muted">
                  Reply by email
                </p>
                <textarea
                  value={reply}
                  onChange={(e) => setReply(e.target.value)}
                  rows="4"
                  placeholder={`Hi ${open.name}, thank you for reaching out...`}
                  className="focus-ring mt-2 w-full rounded-2xl border border-portfolio-border bg-portfolio-surface/60 px-4 py-3 text-sm"
                />
                <div className="mt-3 flex flex-wrap gap-2">
                  <button
                    type="button"
                    disabled={sending}
                    onClick={sendReply}
                    className="inline-flex items-center gap-2 rounded-full bg-portfolio-gold px-5 py-2 text-sm font-bold text-portfolio-bg transition hover:bg-portfolio-gold-light disabled:opacity-60"
                  >
                    <Send size={14} /> {sending ? "Sending..." : "Send Reply"}
                  </button>
                  {!open.read && (
                    <button
                      type="button"
                      onClick={() => mark(open._id)}
                      className="rounded-full border border-portfolio-border px-4 py-2 text-sm font-semibold text-portfolio-subtext hover:text-portfolio-text"
                    >
                      Mark as read
                    </button>
                  )}
                  <button
                    type="button"
                    disabled={loading}
                    onClick={() => remove(open._id)}
                    className="inline-flex items-center gap-2 rounded-full border border-red-500/50 px-4 py-2 text-sm font-semibold text-red-300 hover:bg-red-500/10 disabled:opacity-60"
                  >
                    <Trash2 size={14} /> Delete
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default AdminMessages;