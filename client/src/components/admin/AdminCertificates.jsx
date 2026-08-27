import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  fetchCertificates,
  createAdminCertificate,
  updateAdminCertificate,
  deleteAdminCertificate,
  uploadAdminFile,
} from "../../services/api";

const emptyForm = {
  title: "",
  issuer: "",
  fileUrl: "",
  imageUrl: "",
  dateEarned: "",
  credentialId: "",
};

const AdminCertificates = () => {
  const [items, setItems] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  const load = () =>
    fetchCertificates()
      .then(setItems)
      .catch((e) => toast.error(e.message));
  useEffect(() => {
    load();
  }, []);

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const startEdit = (c) => {
    setEditing(c._id);
    setForm({
      title: c.title,
      issuer: c.issuer || "",
      fileUrl: c.fileUrl || "",
      imageUrl: c.imageUrl || "",
      dateEarned: c.dateEarned ? String(c.dateEarned).slice(0, 10) : "",
      credentialId: c.credentialId || "",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const reset = () => {
    setEditing(null);
    setForm(emptyForm);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const onUpload = async (e, type) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const folder = type === "image"
        ? "seka-portfolio/certificates/images"
        : "seka-portfolio/certificates/files";
      const r = await uploadAdminFile(file, folder);
      if (type === "image") set("imageUrl", r.url);
      else set("fileUrl", r.url);
      toast.success("Uploaded.");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setUploading(false);
    }
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.fileUrl.trim()) {
      toast.error("Title and certificate file are required.");
      return;
    }
    const payload = { ...form, dateEarned: form.dateEarned || null };
    setLoading(true);
    try {
      if (editing) {
        await updateAdminCertificate(editing, payload);
        toast.success("Certificate updated.");
      } else {
        await createAdminCertificate(payload);
        toast.success("Certificate created.");
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
    if (!window.confirm("Delete this certificate?")) return;
    try {
      await deleteAdminCertificate(id);
      toast.success("Deleted.");
      load();
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold">Certificates</h1>
          <p className="mt-1 text-sm text-portfolio-subtext">
            Manage certificates &amp; credentials.
          </p>
        </div>
        {editing && (
          <button type="button" onClick={reset} className="rounded-full border border-portfolio-border px-4 py-2 text-sm font-semibold text-portfolio-subtext">
            + New
          </button>
        )}
      </div>

      <form onSubmit={submit} className="mt-6 space-y-4 rounded-3xl border border-portfolio-border bg-portfolio-surface/60 p-5">
        <div className="grid gap-4 md:grid-cols-2">
          <label className="block">
            <span className="text-sm font-semibold">Title</span>
            <input value={form.title} onChange={(e) => set("title", e.target.value)} className="focus-ring mt-1 w-full rounded-2xl border border-portfolio-border bg-portfolio-bg px-4 py-3" />
          </label>
          <label className="block">
            <span className="text-sm font-semibold">Issuer</span>
            <input value={form.issuer} onChange={(e) => set("issuer", e.target.value)} className="focus-ring mt-1 w-full rounded-2xl border border-portfolio-border bg-portfolio-bg px-4 py-3" />
          </label>
          <label className="block">
            <span className="text-sm font-semibold">Credential ID</span>
            <input value={form.credentialId} onChange={(e) => set("credentialId", e.target.value)} className="focus-ring mt-1 w-full rounded-2xl border border-portfolio-border bg-portfolio-bg px-4 py-3" />
          </label>
          <label className="block">
            <span className="text-sm font-semibold">Date Earned</span>
            <input type="date" value={form.dateEarned} onChange={(e) => set("dateEarned", e.target.value)} className="focus-ring mt-1 w-full rounded-2xl border border-portfolio-border bg-portfolio-bg px-4 py-3" />
          </label>
          <label className="block">
            <span className="text-sm font-semibold">Upload certificate file (PDF)</span>
            <input type="file" accept=".pdf,image/*" onChange={(e) => onUpload(e, "file")} />
            <span className="mt-1 block text-xs text-portfolio-subtext">{uploading ? "Uploading..." : form.fileUrl || "No file"}</span>
          </label>
          <label className="block">
            <span className="text-sm font-semibold">Upload preview image (optional)</span>
            <input type="file" accept="image/*" onChange={(e) => onUpload(e, "image")} />
            <span className="mt-1 block text-xs text-portfolio-subtext">{form.imageUrl || "No image"}</span>
          </label>
        </div>
        <button type="submit" disabled={loading} className="rounded-full bg-portfolio-gold px-6 py-2 font-bold text-portfolio-bg transition hover:bg-portfolio-gold-light disabled:opacity-60">
          {loading ? "Saving..." : editing ? "Update" : "Create"}
        </button>
      </form>

      <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {items.map((c) => (
          <div key={c._id} className="rounded-3xl border border-portfolio-border bg-portfolio-surface/60 p-4">
            {c.imageUrl && <img src={c.imageUrl} alt={c.title} className="h-32 w-full rounded-2xl object-cover" />}
            <h3 className="mt-3 font-display font-bold">{c.title}</h3>
            <p className="text-xs text-portfolio-subtext">{c.issuer}</p>
            <div className="mt-3 flex gap-2">
              <button type="button" onClick={() => startEdit(c)} className="rounded-full border border-portfolio-border px-4 py-1.5 text-sm font-semibold hover:text-portfolio-text">Edit</button>
              <button type="button" onClick={() => remove(c._id)} className="rounded-full border border-red-500/50 px-4 py-1.5 text-sm font-semibold text-red-300 hover:bg-red-500/10">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default AdminCertificates;