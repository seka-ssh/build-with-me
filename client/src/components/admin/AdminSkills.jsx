import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { Plus, Pencil, Trash2 } from "lucide-react";
import {
  fetchSkills,
  createAdminSkill,
  updateAdminSkill,
  deleteAdminSkill,
} from "../../services/api";

const LEVELS = ["Expert", "Advanced", "Intermediate", "Beginner"];
const ICONS = [
  "Code2", "Database", "GitBranch", "KeyRound", "Layers", "Lock",
  "Network", "ServerCog", "Sparkles", "WalletCards", "BarChart3", "Globe",
];

const emptyForm = { group: "", name: "", level: "Advanced", description: "", icon: "Code2", order: 0 };

const AdminSkills = () => {
  const [items, setItems] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(false);

  const load = () =>
    fetchSkills()
      .then(setItems)
      .catch((e) => toast.error(e.message));
  useEffect(() => {
    load();
  }, []);

  const groups = useMemo(
    () => [...new Set(items.map((s) => s.group).filter(Boolean))],
    [items],
  );
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const startEdit = (s) => {
    setEditing(s._id);
    setForm({
      group: s.group,
      name: s.name,
      level: s.level || "Advanced",
      description: s.description || "",
      icon: s.icon || "Code2",
      order: s.order || 0,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const reset = () => {
    setEditing(null);
    setForm(emptyForm);
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!form.group.trim() || !form.name.trim()) {
      toast.error("Group and skill name are required.");
      return;
    }
    setLoading(true);
    try {
      const payload = { ...form, order: Number(form.order || 0) };
      if (editing) {
        await updateAdminSkill(editing, payload);
        toast.success("Skill updated.");
      } else {
        await createAdminSkill(payload);
        toast.success("Skill added.");
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
    if (!window.confirm("Delete this skill?")) return;
    try {
      await deleteAdminSkill(id);
      toast.success("Skill deleted.");
      load();
    } catch (err) {
      toast.error(err.message);
    }
  };

  const fields =
    "focus-ring mt-1 w-full rounded-2xl border border-portfolio-border bg-portfolio-bg px-4 py-3";

  return (
    <div>
      <h1 className="font-display text-2xl font-bold">Skills</h1>
      <p className="mt-1 text-sm text-portfolio-subtext">
        Add, edit, or remove skills. They appear in the public Skills section.
      </p>
      <form
        onSubmit={submit}
        className="mt-6 rounded-3xl border border-portfolio-border bg-portfolio-surface/60 p-6"
      >
        <div className="grid gap-4 md:grid-cols-3">
          <label className="block">
            <span className="text-sm font-semibold">Group</span>
            <input
              list="skill-groups"
              value={form.group}
              onChange={(e) => set("group", e.target.value)}
              className={fields}
              placeholder="e.g. Frontend"
            />
            <datalist id="skill-groups">
              {groups.map((g) => (
                <option key={g} value={g} />
              ))}
            </datalist>
          </label>
          <label className="block">
            <span className="text-sm font-semibold">Skill name</span>
            <input value={form.name} onChange={(e) => set("name", e.target.value)} className={fields} placeholder="e.g. React" />
          </label>
          <label className="block">
            <span className="text-sm font-semibold">Level</span>
            <select value={form.level} onChange={(e) => set("level", e.target.value)} className={fields}>
              {LEVELS.map((l) => (
                <option key={l}>{l}</option>
              ))}
            </select>
          </label>
          <label className="block md:col-span-2">
            <span className="text-sm font-semibold">Description</span>
            <input value={form.description} onChange={(e) => set("description", e.target.value)} className={fields} placeholder="Shown on hover" />
          </label>
          <label className="block">
            <span className="text-sm font-semibold">Icon</span>
            <select value={form.icon} onChange={(e) => set("icon", e.target.value)} className={fields}>
              {ICONS.map((i) => (
                <option key={i}>{i}</option>
              ))}
            </select>
          </label>
        </div>
        <div className="mt-4 flex items-center gap-3">
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center gap-2 rounded-full bg-portfolio-gold px-6 py-2.5 font-bold text-portfolio-bg transition hover:bg-portfolio-gold-light disabled:opacity-60"
          >
            <Plus size={16} /> {editing ? "Update Skill" : "Add Skill"}
          </button>
          {editing && (
            <button
              type="button"
              onClick={reset}
              className="rounded-full border border-portfolio-border px-4 py-2 text-sm font-semibold text-portfolio-subtext"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
      <div className="mt-8 space-y-8">
        {items.length === 0 && (
          <p className="text-sm text-portfolio-subtext">
            No skills yet — add your first one above.
          </p>
        )}
        {groups.map((g) => (
          <div key={g}>
            <h2 className="font-display text-lg font-bold text-portfolio-text">{g}</h2>
            <div className="mt-3 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
              {items
                .filter((s) => s.group === g)
                .map((s) => (
                  <div
                    key={s._id}
                    className="rounded-2xl border border-portfolio-border bg-portfolio-surface/60 p-4"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="font-display font-bold">{s.name}</h3>
                        <p className="text-xs text-portfolio-gold">{s.level}</p>
                      </div>
                      <div className="flex gap-1">
                        <button
                          type="button"
                          aria-label="Edit skill"
                          onClick={() => startEdit(s)}
                          className="rounded-full border border-portfolio-border p-2 text-portfolio-subtext hover:text-portfolio-gold"
                        >
                          <Pencil size={14} />
                        </button>
                        <button
                          type="button"
                          aria-label="Delete skill"
                          onClick={() => remove(s._id)}
                          className="rounded-full border border-red-500/50 p-2 text-red-300 hover:bg-red-500/10"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                    {s.description && (
                      <p className="mt-2 line-clamp-2 text-xs text-portfolio-subtext">
                        {s.description}
                      </p>
                    )}
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminSkills;