import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  fetchTestimonials,
  createAdminTestimonial,
  updateAdminTestimonial,
  deleteAdminTestimonial,
  uploadAdminFile,
} from "../../services/api";

const emptyForm = {
  name: "",
  role: "",
  company: "",
  message: "",
  rating: 5,
  photoUrl: "",
  isFeatured: false,
};

const AdminTestimonials = () => {
  const [items, setItems] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  const load = () =>
    fetchTestimonials()
      .then(setItems)
      .catch((e) => toast.error(e.message));
  useEffect(() => {
    load();
  }, []);

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const startEdit = (t) => {
    setEditing(t._id);
    setForm({
      name: t.name,
      role: t.role || "",
      company: t.company || "",
      message: t.message,
      rating: t.rating || 5,
      photoUrl: t.photoUrl || "",
      isFeatured: t.isFeatured || false,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const reset = () => {
    setEditing(null);
    setForm(emptyForm);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const onUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const r = await uploadAdminFile(file, "seka-portfolio/testimonials");
      set("photoUrl", r.url);
      toast.success("Photo uploaded.");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setUploading(false);
    }
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.message.trim()) {
      toast.error("Name and message are required.");
      return;
    }
    const payload = {
      ...form,
      rating: Number(form.rating),
      isFeatured: Boolean(form.isFeatured),
    };
    setLoading(true);
    try {
      if (editing) {
        await updateAdminTestimonial(editing, payload);
        toast.success("Testimonial updated.");
      } else {
        await createAdminTestimonial(payload);
        toast.success("Testimonial created.");
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
    if (!window.confirm("Delete this testimonial?")) return;
    try {
      await deleteAdminTestimonial(id);
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
          <h1 className="font-display text-2xl font-bold">Testimonials</h1>
          <p className="mt-1 text-sm text-portfolio-subtext">
            Manage client testimonials.
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
            <span className="text-sm font-semibold">Name</span>
            <input value={form.name} onChange={(e) => set("name", e.target.value)} className="focus-ring mt-1 w-full rounded-2xl border border-portfolio-border bg-portfolio-bg px-4 py-3" />
          </label>
          <label className="block">
            <span className="text-sm font-semibold">Role</span>
            <input value={form.role} onChange={(e) => set("role", e.target.value)} className="focus-ring mt-1 w-full rounded-2xl border border-portfolio-border bg-portfolio-bg px-4 py-3" />
          </label>
          <label className="block">
            <span className="text-sm font-semibold">Company</span>
            <input value={form.company} onChange={(e) => set("company", e.target.value)} className="focus-ring mt-1 w-full rounded-2xl border border-portfolio-border bg-portfolio-bg px-4 py-3" />
          </label>
          <label className="block">
            <span className="text-sm font-semibold">Rating ({form.rating}/5)</span>
            <input type="range" min="1" max="5" value={form.rating} onChange={(e) => set("rating", e.target.value)} className="mt-3 w-full" />
          </label>
          <label className="block md:col-span-2">
            <span className="text-sm font-semibold">Message</span>
            <textarea value={form.message} onChange={(e) => set("message", e.target.value)} rows="3" className="focus-ring mt-1 w-full rounded-2xl border border-portfolio-border bg-portfolio-bg px-4 py-3" />
          </label>
          <label className="block">
            <span className="text-sm font-semibold">Upload photo</span>
            <input type="file" accept="image/*" onChange={onUpload} />
            <span className="mt-1 block text-xs text-portfolio-subtext">{uploading ? "Uploading..." : form.photoUrl || "No photo"}</span>
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={form.isFeatured} onChange={(e) => set("isFeatured", e.target.checked)} className="h-5 w-5" />
            <span className="text-sm font-semibold">Featured</span>
          </label>
        </div>
        <button type="submit" disabled={loading} className="rounded-full bg-portfolio-gold px-6 py-2 font-bold text-portfolio-bg transition hover:bg-portfolio-gold-light disabled:opacity-60">
          {loading ? "Saving..." : editing ? "Update" : "Create"}
        </button>
      </form>

      <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {items.map((t) => (
          <div key={t._id} className="rounded-3xl border border-portfolio-border bg-portfolio-surface/60 p-4">
            {t.photoUrl && <img src={t.photoUrl} alt={t.name} className="h-16 w-16 rounded-full object-cover" />}
            <h3 className="mt-3 font-display font-bold">{t.name}</h3>
            <p className="text-xs text-portfolio-subtext">{t.role} {t.company && `· ${t.company}`}</p>
            <p className="mt-2 text-sm text-portfolio-subtext">{"★".repeat(t.rating || 0)}</p>
            <p className="mt-2 line-clamp-3 text-sm">{t.message}</p>
            <div className="mt-3 flex gap-2">
              <button type="button" onClick={() => startEdit(t)} className="rounded-full border border-portfolio-border px-4 py-1.5 text-sm font-semibold hover:text-portfolio-text">Edit</button>
              <button type="button" onClick={() => remove(t._id)} className="rounded-full border border-red-500/50 px-4 py-1.5 text-sm font-semibold text-red-300 hover:bg-red-500/10">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default AdminTestimonials;