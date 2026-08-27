import { useState } from "react";
import { Briefcase, Send } from "lucide-react";
import toast from "react-hot-toast";
import { submitHireRequest, uploadPublicFile } from "../../services/api";
import FileUpload from "../ui/FileUpload";

const projectTypes = [
  "New Website / Landing Page",
  "Web Application",
  "Mobile App",
  "FinTech Platform",
  "API / Backend System",
  "Dashboard & Analytics",
  "UI/UX Design",
  "Maintenance & Support",
  "Other",
];
const budgets = [
  "Under 500,000 FRW",
  "500,000 – 2,000,000 FRW",
  "2,000,000 – 6,500,000 FRW",
  "6,500,000+ FRW",
  "Let's discuss",
];

const empty = {
  name: "",
  email: "",
  projectType: projectTypes[0],
  project: "",
  description: "",
  budget: budgets[4],
  attachmentUrl: "",
};

const HireMeSection = () => {
  const [form, setForm] = useState(empty);
  const [sending, setSending] = useState(false);
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.description.trim()) {
      toast.error("Name, email, and description are required.");
      return;
    }
    setSending(true);
    try {
      const r = await submitHireRequest(form);
      toast.success(r.message || "Request received!");
      setForm(empty);
    } catch (err) {
      toast.error(err.message || "Unable to send request.");
    } finally {
      setSending(false);
    }
  };

  const fields =
    "focus-ring mt-2 w-full rounded-2xl border border-portfolio-border bg-portfolio-bg px-4 py-3 text-portfolio-text";

  return (
    <section id="hire" className="relative overflow-hidden bg-portfolio-bg py-24">
        <svg
          aria-hidden="true"
          className="pointer-events-none absolute -top-8 right-0 hidden h-40 w-40 text-portfolio-gold/20 md:block"
          viewBox="0 0 100 100"
          fill="none"
        >
          <circle cx="50" cy="50" r="46" stroke="currentColor" strokeWidth="1.5" strokeDasharray="6 8" />
          <circle cx="50" cy="50" r="30" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 6" />
          <path d="M35 55 L47 40 L55 50 L67 32" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M60 32 h7 v7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      {/* Decorative background SVG — golden circuit / connection lines */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.07]"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="hire-circuit" width="120" height="120" patternUnits="userSpaceOnUse">
            <path
              d="M0 60 H40 L60 40 H120 M60 40 V0 M60 40 V80 M0 100 H30 L50 120 M90 120 L110 100 H120 M20 0 V20 L40 40"
              fill="none"
              stroke="#F59E0B"
              strokeWidth="1.5"
            />
            <circle cx="60" cy="40" r="3.5" fill="#F59E0B" />
            <circle cx="40" cy="60" r="2.5" fill="#F59E0B" />
            <circle cx="90" cy="120" r="3" fill="#F59E0B" />
            <circle cx="20" cy="20" r="2.5" fill="#F59E0B" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hire-circuit)" />
      </svg>
      <div className="section-shell relative z-10">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.28em] text-portfolio-gold">
            <Briefcase size={16} className="mr-2 inline" /> Hire Me
          </p>
          <h2 className="mt-3 font-display text-4xl font-bold text-portfolio-text md:text-5xl">
            Have a project in mind? Let's build it.
          </h2>
          <p className="mt-5 text-lg leading-8 text-portfolio-subtext">
            Tell me which project you need help with. Attach a brief, spec, or
            anything that explains your idea — I read every request personally.
          </p>
        </div>
        <form
          onSubmit={submit}
          className="mx-auto mt-12 max-w-3xl rounded-3xl border border-portfolio-border bg-portfolio-surface/80 p-6 shadow-glow md:p-8"
        >
          <div className="grid gap-5 md:grid-cols-2">
            <label className="block">
              <span className="text-sm font-semibold text-portfolio-text">Name</span>
              <input className={fields} value={form.name} onChange={(e) => set("name", e.target.value)} placeholder="Your name" />
            </label>
            <label className="block">
              <span className="text-sm font-semibold text-portfolio-text">Email</span>
              <input type="email" className={fields} value={form.email} onChange={(e) => set("email", e.target.value)} placeholder="you@example.com" />
            </label>
            <label className="block">
              <span className="text-sm font-semibold text-portfolio-text">Project type</span>
              <select className={fields} value={form.projectType} onChange={(e) => set("projectType", e.target.value)}>
                {projectTypes.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </label>
            <label className="block">
              <span className="text-sm font-semibold text-portfolio-text">
                Which project do you need help with?
              </span>
              <input className={fields} value={form.project} onChange={(e) => set("project", e.target.value)} placeholder="e.g. A banking dashboard for my company" />
            </label>
            <label className="block">
              <span className="text-sm font-semibold text-portfolio-text">Budget</span>
              <select className={fields} value={form.budget} onChange={(e) => set("budget", e.target.value)}>
                {budgets.map((b) => (
                  <option key={b}>{b}</option>
                ))}
              </select>
            </label>
            <label className="block md:col-span-2">
              <span className="text-sm font-semibold text-portfolio-text">Describe the project</span>
              <textarea
                className={`${fields} min-h-32`}
                value={form.description}
                onChange={(e) => set("description", e.target.value)}
                placeholder="Goals, users, timeline, anything important..."
              />
            </label>
            <div className="md:col-span-2">
              <span className="text-sm font-semibold text-portfolio-text">
                Attachment (optional — brief, spec, screenshots)
              </span>
              <div className="mt-2">
                <FileUpload
                  label="Drag & drop or click to attach a file"
                  hint="PDF, Word, images — max 15MB"
                  preview="file"
                  folder="seka-portfolio/hire"
                  uploadFn={uploadPublicFile}
                  value={form.attachmentUrl}
                  onChange={(url) => set("attachmentUrl", url)}
                />
              </div>
            </div>
          </div>
          <button
            type="submit"
            disabled={sending}
            className="focus-ring mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-portfolio-gold px-6 py-3 font-bold text-portfolio-bg transition hover:bg-portfolio-gold-light disabled:opacity-60"
          >
            {sending ? "Sending..." : "Send Project Request"} <Send size={18} />
          </button>
        </form>
      </div>
    </section>
  );
};

export default HireMeSection;