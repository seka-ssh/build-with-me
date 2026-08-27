import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Lock, LogIn } from "lucide-react";
import toast from "react-hot-toast";
import { adminLogin } from "../services/api";
import PageTransition from "../components/layout/PageTransition";

const AdminLoginPage = () => {
  const nav = useNavigate();
  const [email, setEmail] = useState("sekashalom74@gmail.com");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const r = await adminLogin({ email, password });
      localStorage.setItem("sekaAdminToken", r.token);
      toast.success("Logged in as admin.");
      nav("/admin");
    } catch (err) {
      toast.error(err.message || "Login failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageTransition>
      <Helmet>
        <title>Admin Login | SEKA Shalom</title>
      </Helmet>
      <section className="flex min-h-screen items-center justify-center bg-portfolio-bg px-4 pt-24 pb-16">
        <div className="w-full max-w-md rounded-3xl border border-portfolio-gold/30 bg-portfolio-surface/80 p-8 shadow-glow">
          <div className="flex items-center justify-center gap-2 text-portfolio-gold">
            <Lock size={26} />
            <h1 className="font-display text-2xl font-extrabold text-portfolio-text">
              Admin Login
            </h1>
          </div>
          <p className="mt-2 text-center text-sm text-portfolio-subtext">
            Restricted area. Authorized personnel only.
          </p>
          <form onSubmit={submit} className="mt-8 space-y-5">
            <label className="block">
              <span className="text-sm font-semibold text-portfolio-text">
                Email
              </span>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="focus-ring mt-2 w-full rounded-2xl border border-portfolio-border bg-portfolio-bg px-4 py-3 text-portfolio-text"
                placeholder="admin@example.com"
              />
            </label>
            <label className="block">
              <span className="text-sm font-semibold text-portfolio-text">
                Password
              </span>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="focus-ring mt-2 w-full rounded-2xl border border-portfolio-border bg-portfolio-bg px-4 py-3 text-portfolio-text"
                placeholder="••••••••"
              />
            </label>
            <button
              type="submit"
              disabled={loading}
              className="focus-ring inline-flex w-full items-center justify-center gap-2 rounded-full bg-portfolio-gold px-6 py-3 font-bold text-portfolio-bg transition hover:bg-portfolio-gold-light disabled:opacity-60"
            >
              {loading ? "Signing in..." : "Sign In"} <LogIn size={18} />
            </button>
          </form>
        </div>
      </section>
    </PageTransition>
  );
};
export default AdminLoginPage;