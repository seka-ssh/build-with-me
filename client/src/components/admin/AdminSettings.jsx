import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Save, KeyRound, ExternalLink } from "lucide-react";
import {
  fetchSiteSettings,
  updateSiteSettings,
  uploadAdminFile,
  changeAdminPassword,
} from "../../services/api";
import FileUpload from "../ui/FileUpload";

const AdminSettings = () => {
  const [form, setForm] = useState({
    name: "SEKA Shalom",
    title: "",
    bio: "",
    profileImage: "",
    aboutTitle: "",
    aboutText: "",
    aboutImage: "",
    education: "",
    location: "",
    email: "",
    phonePrimary: "",
    phoneSecondary: "",
    github: "",
    linkedin: "",
    twitter: "",
    instagram: "",
    cvUrl: "",
    domain: "",
    projectsCount: 0,
    yearsExperience: 0,
    countriesServed: 0,
    clientsServed: 0,
    usersServed: "",
    transactions: "",
    availability: "",
    announcementText: "",
    announcementLink: "",
    announcementActive: false,
  });
  const [loading, setLoading] = useState(false);
  const [pw, setPw] = useState({ currentPassword: "", newPassword: "" });
  const [pwLoading, setPwLoading] = useState(false);

  useEffect(() => {
    fetchSiteSettings()
      .then((s) => setForm((f) => ({ ...f, ...s })))
      .catch((e) => toast.error(e.message));
  }, []);

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateSiteSettings(form);
      toast.success("Settings saved.");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fields = "focus-ring mt-1 w-full rounded-2xl border border-portfolio-border bg-portfolio-bg px-4 py-3";

  const submitPw = async (e) => {
    e.preventDefault();
    if (!pw.newPassword || String(pw.newPassword).length < 6) {
      toast.error("New password must be at least 6 characters.");
      return;
    }
    setPwLoading(true);
    try {
      await changeAdminPassword(pw);
      toast.success("Password updated. Use it next time you log in.");
      setPw({ currentPassword: "", newPassword: "" });
    } catch (err) {
      toast.error(err.message);
    } finally {
      setPwLoading(false);
    }
  };

  return (
    <div>
      <h1 className="font-display text-2xl font-bold">Site Settings</h1>
      <p className="mt-1 text-sm text-portfolio-subtext">
        Edit public identity, links, and CV.
      </p>

      <form onSubmit={submit} className="mt-6 space-y-5 rounded-3xl border border-portfolio-border bg-portfolio-surface/60 p-6">
        <div className="grid gap-4 md:grid-cols-2">
          <label className="block">
            <span className="text-sm font-semibold">Name</span>
            <input value={form.name} onChange={(e) => set("name", e.target.value)} className={fields} />
          </label>
          <label className="block">
            <span className="text-sm font-semibold">Job Title</span>
            <input value={form.title} onChange={(e) => set("title", e.target.value)} className={fields} />
          </label>
          <label className="block md:col-span-2">
            <span className="text-sm font-semibold">Bio</span>
            <textarea value={form.bio} onChange={(e) => set("bio", e.target.value)} rows="4" className={fields} />
          </label>
          <div className="rounded-2xl border border-portfolio-gold/30 bg-portfolio-gold/5 p-4 md:col-span-2">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-sm font-bold">📢 Visitor announcement banner</span>
              <label className="flex cursor-pointer items-center gap-2 text-xs font-semibold text-portfolio-text">
                <input
                  type="checkbox"
                  checked={form.announcementActive}
                  onChange={(e) => set("announcementActive", e.target.checked)}
                  className="h-5 w-5"
                />
                Show to visitors
              </label>
            </div>
            <p className="mt-1 text-xs text-portfolio-muted">
              Appears at the top of your site for every visitor — e.g. "I'm available for new projects!"
            </p>
            <input
              value={form.announcementText}
              onChange={(e) => set("announcementText", e.target.value)}
              className={fields}
              placeholder="Announcement text (e.g. I'm available for new projects — let's build yours!)"
            />
            <input
              value={form.announcementLink}
              onChange={(e) => set("announcementLink", e.target.value)}
              className={`${fields} mt-2`}
              placeholder="Optional link (e.g. https://your-link.com)"
            />
          </div>
          <div className="block md:col-span-2">
            <span className="text-sm font-semibold">Profile Photo</span>
            <div className="mt-2">
              <FileUpload
                label="Drag & drop or click to upload your photo"
                hint="JPG or PNG — appears in the hero & about sections"
                folder="seka-portfolio/profile"
                uploadFn={uploadAdminFile}
                value={form.profileImage}
                onChange={(url) => set("profileImage", url)}
              />
            </div>
          </div>
          <label className="block">
            <span className="text-sm font-semibold">Email</span>
            <input value={form.email} onChange={(e) => set("email", e.target.value)} className={fields} />
          </label>
          <label className="block">
            <span className="text-sm font-semibold">Phone number 1</span>
            <input value={form.phonePrimary} onChange={(e) => set("phonePrimary", e.target.value)} className={fields} placeholder="e.g. +250 788 212 710" />
          </label>
          <label className="block">
            <span className="text-sm font-semibold">Phone number 2 (optional)</span>
            <input value={form.phoneSecondary} onChange={(e) => set("phoneSecondary", e.target.value)} className={fields} placeholder="e.g. +250 728 212 710" />
          </label>
          <label className="block">
            <span className="text-sm font-semibold">Domain</span>
            <input value={form.domain} onChange={(e) => set("domain", e.target.value)} className={fields} placeholder="https://yourdomain.com" />
          </label>
          <label className="block">
            <span className="text-sm font-semibold">GitHub</span>
            <input value={form.github} onChange={(e) => set("github", e.target.value)} className={fields} placeholder="https://github.com/seka-ssh" />
          </label>
          <label className="block">
            <span className="text-sm font-semibold">LinkedIn</span>
            <input value={form.linkedin} onChange={(e) => set("linkedin", e.target.value)} className={fields} placeholder="https://linkedin.com/in/seka-shalom-653047394" />
          </label>
          <label className="block">
            <span className="text-sm font-semibold">Twitter / X</span>
            <input value={form.twitter} onChange={(e) => set("twitter", e.target.value)} className={fields} />
          </label>
          <label className="block">
            <span className="text-sm font-semibold">Instagram</span>
            <input value={form.instagram} onChange={(e) => set("instagram", e.target.value)} className={fields} placeholder="https://instagram.com/iam_cybedevs" />
          </label>
          <div className="block md:col-span-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold">CV (PDF)</span>
              {form.cvUrl && (
                <a
                  href={form.cvUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-portfolio-gold hover:underline"
                >
                  <ExternalLink size={12} /> View current CV
                </a>
              )}
            </div>
            <div className="mt-2">
              <FileUpload
                label="Drag & drop or click to upload your CV"
                hint="PDF only — served at /cv and via Download/View CV buttons"
                accept=".pdf"
                preview="file"
                folder="seka-portfolio/cv"
                uploadFn={uploadAdminFile}
                value={form.cvUrl}
                onChange={(url) => set("cvUrl", url)}
              />
            </div>
          </div>
        </div>
        <h2 className="mt-2 font-display text-lg font-bold text-portfolio-text">
          About Section (public)
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          <label className="block">
            <span className="text-sm font-semibold">About heading</span>
            <input value={form.aboutTitle} onChange={(e) => set("aboutTitle", e.target.value)} className={fields} placeholder="e.g. I am a developer who ships." />
          </label>
          <label className="block">
            <span className="text-sm font-semibold">Education</span>
            <input value={form.education} onChange={(e) => set("education", e.target.value)} className={fields} placeholder="e.g. BSc Computer Science — UR" />
          </label>
          <label className="block">
            <span className="text-sm font-semibold">Location</span>
            <input value={form.location} onChange={(e) => set("location", e.target.value)} className={fields} placeholder="e.g. Kigali, Rwanda" />
          </label>
          <label className="block">
            <span className="text-sm font-semibold">Availability status</span>
            <input value={form.availability} onChange={(e) => set("availability", e.target.value)} className={fields} placeholder="e.g. Available for freelance" />
          </label>
          <div className="block md:col-span-2">
            <span className="text-sm font-semibold">About text (blank line = new paragraph)</span>
            <textarea
              value={form.aboutText}
              onChange={(e) => set("aboutText", e.target.value)}
              rows="5"
              className={fields}
              placeholder="Tell visitors who you are, what you studied, and what you build..."
            />
          </div>
          <div className="block md:col-span-2">
            <span className="text-sm font-semibold">About image (optional — falls back to profile photo)</span>
            <div className="mt-2">
              <FileUpload
                label="Drag & drop or click to upload an about image"
                hint="Portrait works best (4:5)"
                folder="seka-portfolio/about"
                uploadFn={uploadAdminFile}
                value={form.aboutImage}
                onChange={(url) => set("aboutImage", url)}
              />
            </div>
          </div>
        </div>

        <h2 className="mt-2 font-display text-lg font-bold text-portfolio-text">
          Stats (years, countries, users... all yours to set)
        </h2>
        <div className="grid gap-4 md:grid-cols-3">
          <label className="block">
            <span className="text-sm font-semibold">Projects completed</span>
            <input type="number" min="0" value={form.projectsCount} onChange={(e) => set("projectsCount", e.target.value)} className={fields} />
          </label>
          <label className="block">
            <span className="text-sm font-semibold">Years of experience</span>
            <input type="number" min="0" value={form.yearsExperience} onChange={(e) => set("yearsExperience", e.target.value)} className={fields} />
          </label>
          <label className="block">
            <span className="text-sm font-semibold">Countries served</span>
            <input type="number" min="0" value={form.countriesServed} onChange={(e) => set("countriesServed", e.target.value)} className={fields} />
          </label>
          <label className="block">
            <span className="text-sm font-semibold">Clients served</span>
            <input type="number" min="0" value={form.clientsServed} onChange={(e) => set("clientsServed", e.target.value)} className={fields} />
          </label>
          <label className="block">
            <span className="text-sm font-semibold">Users served</span>
            <input value={form.usersServed} onChange={(e) => set("usersServed", e.target.value)} className={fields} placeholder="e.g. 40,000" />
          </label>
          <label className="block">
            <span className="text-sm font-semibold">Transactions processed</span>
            <input value={form.transactions} onChange={(e) => set("transactions", e.target.value)} className={fields} placeholder="e.g. 9M+" />
          </label>
        </div>

        <button type="submit" disabled={loading} className="inline-flex items-center gap-2 rounded-full bg-portfolio-gold px-6 py-2.5 font-bold text-portfolio-bg transition hover:bg-portfolio-gold-light disabled:opacity-60">
          <Save size={18} /> {loading ? "Saving..." : "Save Settings"}
        </button>
      </form>

      <form onSubmit={submitPw} className="mt-6 space-y-4 rounded-3xl border border-portfolio-border bg-portfolio-surface/60 p-6">
        <div className="flex items-center gap-2">
          <KeyRound className="text-portfolio-gold" size={20} />
          <h2 className="font-display text-lg font-bold">Change Password</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <label className="block">
            <span className="text-sm font-semibold">Current Password</span>
            <input type="password" value={pw.currentPassword} onChange={(e) => setPw({ ...pw, currentPassword: e.target.value })} className={fields} />
          </label>
          <label className="block">
            <span className="text-sm font-semibold">New Password</span>
            <input type="password" value={pw.newPassword} onChange={(e) => setPw({ ...pw, newPassword: e.target.value })} className={fields} />
          </label>
        </div>
        <button type="submit" disabled={pwLoading} className="rounded-full border border-portfolio-gold/50 px-6 py-2.5 font-bold text-portfolio-gold transition hover:bg-portfolio-gold hover:text-portfolio-bg disabled:opacity-60">
          {pwLoading ? "Updating..." : "Update Password"}
        </button>
      </form>
    </div>
  );
};
export default AdminSettings;