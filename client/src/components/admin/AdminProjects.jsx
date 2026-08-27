import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  fetchProjects,
  createAdminProject,
  updateAdminProject,
  deleteAdminProject,
  uploadAdminFile,
} from "../../services/api";
import FileUpload from "../ui/FileUpload";

const emptyForm = {
  title: "",
  tagline: "",
  description: "",
  category: "FinTech",
  projectType: "",
  status: "Pending",
  completionPercentage: 0,
  techStack: "",
  features: "",
  liveUrl: "",
  githubUrl: "",
  thumbnailUrl: "",
  isFeatured: false,
};

const AdminProjects = () => {
  const [projects, setProjects] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(false);

  const load = () =>
    fetchProjects()
      .then(setProjects)
      .catch((e) => toast.error(e.message));

  useEffect(() => {
    load();
  }, []);

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const startEdit = (p) => {
    setEditing(p._id);
    setForm({
      title: p.title,
      tagline: p.tagline,
      description: p.description,
      category: p.category,
      projectType: p.projectType || "",
      status: p.status,
      completionPercentage: p.completionPercentage,
      techStack: (p.techStack || []).join(", "),
      features: (p.features || []).join("\n"),
      liveUrl: p.liveUrl || "",
      githubUrl: p.githubUrl || "",
      thumbnailUrl: p.thumbnailUrl || "",
      isFeatured: p.isFeatured || false,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const reset = () => {
    setEditing(null);
    setForm(emptyForm);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.tagline.trim()) {
      toast.error("Title and tagline are required.");
      return;
    }
    const payload = {
      ...form,
      completionPercentage: Number(form.completionPercentage || 0),
      isFeatured: Boolean(form.isFeatured),
      techStack: form.techStack
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      features: form.features
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean),
    };
    setLoading(true);
    try {
      if (editing) {
        await updateAdminProject(editing, payload);
        toast.success("Project updated.");
      } else {
        await createAdminProject(payload);
        toast.success("Project created.");
      }
      reset();
      load();
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const remove = async (id) => {
    if (!window.confirm("Delete this project?")) return;
    try {
      await deleteAdminProject(id);
      toast.success("Project deleted.");
      load();
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold">Projects</h1>
          <p className="mt-1 text-sm text-portfolio-subtext">
            Manage your projects.
          </p>
        </div>
        {editing && (
          <button
            type="button"
            onClick={reset}
            className="rounded-full border border-portfolio-border px-4 py-2 text-sm font-semibold text-portfolio-subtext hover:text-portfolio-text"
          >
            + New Project
          </button>
        )}
      </div>      <form
        onSubmit={submit}
        className="mt-6 space-y-4 rounded-3xl border border-portfolio-border bg-portfolio-surface/60 p-5"
      >
        <div className="grid gap-4 md:grid-cols-2">
          <div className="md:col-span-2">
            <label className="block">
              <span className="text-sm font-semibold">Title</span>
              <input value={form.title} onChange={(e) => set("title", e.target.value)} className="focus-ring mt-1 w-full rounded-2xl border border-portfolio-border bg-portfolio-bg px-4 py-3" placeholder="Project title" />
            </label>
          </div>
          <label className="block">
            <span className="text-sm font-semibold">Tagline</span>
            <input value={form.tagline} onChange={(e) => set("tagline", e.target.value)} className="focus-ring mt-1 w-full rounded-2xl border border-portfolio-border bg-portfolio-bg px-4 py-3" placeholder="Short one-liner" />
          </label>
          <label className="block">
            <span className="text-sm font-semibold">Category</span>
            <input value={form.category} onChange={(e) => set("category", e.target.value)} className="focus-ring mt-1 w-full rounded-2xl border border-portfolio-border bg-portfolio-bg px-4 py-3" />
          </label>
          <label className="block">
            <span className="text-sm font-semibold">Project type</span>
            <input value={form.projectType} onChange={(e) => set("projectType", e.target.value)} className="focus-ring mt-1 w-full rounded-2xl border border-portfolio-border bg-portfolio-bg px-4 py-3" placeholder="e.g. Banking Platform, Dashboard, Mobile App" />
          </label>
          <label className="block">
            <span className="text-sm font-semibold">Status</span>
            <select value={form.status} onChange={(e) => set("status", e.target.value)} className="focus-ring mt-1 w-full rounded-2xl border border-portfolio-border bg-portfolio-bg px-4 py-3">
              <option>Finished</option>
              <option>In-Progress</option>
              <option>Pending</option>
            </select>
          </label>
          <label className="block">
            <span className="text-sm font-semibold">Completion % ({form.completionPercentage})</span>
            <input type="range" min="0" max="100" value={form.completionPercentage} onChange={(e) => set("completionPercentage", e.target.value)} className="mt-3 w-full" />
          </label>
          <label className="block md:col-span-2">
            <span className="text-sm font-semibold">Description</span>
            <textarea value={form.description} onChange={(e) => set("description", e.target.value)} rows="3" className="focus-ring mt-1 w-full rounded-2xl border border-portfolio-border bg-portfolio-bg px-4 py-3" />
          </label>
          <label className="block">
            <span className="text-sm font-semibold">Tech Stack (comma separated)</span>
            <input value={form.techStack} onChange={(e) => set("techStack", e.target.value)} className="focus-ring mt-1 w-full rounded-2xl border border-portfolio-border bg-portfolio-bg px-4 py-3" placeholder="React, Node.js, MongoDB" />
          </label>
          <label className="block">
            <span className="text-sm font-semibold">Live URL</span>
            <input value={form.liveUrl} onChange={(e) => set("liveUrl", e.target.value)} className="focus-ring mt-1 w-full rounded-2xl border border-portfolio-border bg-portfolio-bg px-4 py-3" />
          </label>
          <label className="block">
            <span className="text-sm font-semibold">GitHub URL</span>
            <input value={form.githubUrl} onChange={(e) => set("githubUrl", e.target.value)} className="focus-ring mt-1 w-full rounded-2xl border border-portfolio-border bg-portfolio-bg px-4 py-3" />
          </label>
          <label className="block">
            <span className="text-sm font-semibold">Upload thumbnail image</span>
            <FileUpload
              label="Drag & drop or click to upload project image"
              hint="JPG/PNG/SVG — shown on the roadmap card & modal"
              folder="seka-portfolio/projects"
              uploadFn={uploadAdminFile}
              value={form.thumbnailUrl}
              onChange={(url) => set("thumbnailUrl", url)}
            />
            <span className="mt-1 block text-xs text-portfolio-subtext">This image appears on the roadmap card and project modal.</span>
          </label>
          <label className="flex items-center gap-2 md:col-span-2">
            <input type="checkbox" checked={form.isFeatured} onChange={(e) => set("isFeatured", e.target.checked)} className="h-5 w-5" />
            <span className="text-sm font-semibold">Featured project</span>
          </label>
        </div>
        <button type="submit" disabled={loading} className="rounded-full bg-portfolio-gold px-6 py-2 font-bold text-portfolio-bg transition hover:bg-portfolio-gold-light disabled:opacity-60">
          {loading ? "Saving..." : editing ? "Update Project" : "Create Project"}
        </button>
      </form>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {projects.map((p) => (
          <div key={p._id} className="rounded-3xl border border-portfolio-border bg-portfolio-surface/60 p-4">
            {p.thumbnailUrl && <img src={p.thumbnailUrl} alt={p.title} className="h-32 w-full rounded-2xl object-cover" />}
            <h3 className="mt-3 font-display font-bold">{p.title}</h3>
            <p className="mt-1 text-xs text-portfolio-subtext">{p.category} � {p.status}</p>
            <div className="mt-3 flex gap-2">
              <button type="button" onClick={() => startEdit(p)} className="rounded-full border border-portfolio-border px-4 py-1.5 text-sm font-semibold text-portfolio-subtext hover:text-portfolio-text">Edit</button>
              <button type="button" onClick={() => remove(p._id)} className="rounded-full border border-red-500/50 px-4 py-1.5 text-sm font-semibold text-red-300 hover:bg-red-500/10">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default AdminProjects;
