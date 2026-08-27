import { Link, useLocation, useNavigate } from "react-router-dom";
import { Download, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useSite } from "../context/SiteContext";

const scrollToHash = (id, tries = 0) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth" });
  else if (tries < 12) setTimeout(() => scrollToHash(id, tries + 1), 80);
};

const links = [
  { to: "/", label: "Home", exact: true },
  { to: "/#about", label: "About", hash: "about" },
  { to: "/projects", label: "Projects" },
  { to: "/#skills", label: "Skills", hash: "skills" },
  { to: "/#hire", label: "Hire Me", hash: "hire" },
  { to: "/contact", label: "Contact" },
];
const Navbar = () => {
  const { settings } = useSite();
  const [open, setOpen] = useState(false);
  const { pathname, hash } = useLocation();
  const navigate = useNavigate();
  const brand = settings.name || "SEKA Shalom";
  const splitAt = brand.indexOf(" ");
  const first = splitAt === -1 ? brand : brand.slice(0, splitAt);
  const last = splitAt === -1 ? "" : brand.slice(splitAt + 1);
  const cvHref = settings.cvUrl;

  // Landing on "/" with a hash (e.g. from /projects) → scroll to the section
  useEffect(() => {
    if (pathname === "/" && hash) scrollToHash(hash.slice(1));
  }, [pathname, hash]);

  // Only ONE link can be active at a time (fixes the "all gold" bug)
  const isActive = (l) => {
    if (l.hash) return pathname === "/" && hash === `#${l.hash}`;
    if (l.exact) return pathname === "/" && !hash;
    return pathname.startsWith(l.to);
  };
  // Hash links (About / Skills / Hire Me) work from ANY page: on another
  // route we navigate home with the hash first, then smooth-scroll.
  const go = (l) => (e) => {
    setOpen(false);
    if (!l.hash) return;
    e.preventDefault();
    if (pathname !== "/") navigate(`/#${l.hash}`);
    else scrollToHash(l.hash);
  };
  const nav = (l) =>
    `rounded-full px-4 py-2 text-sm font-semibold transition ${
      isActive(l)
        ? "bg-portfolio-gold text-portfolio-bg"
        : "text-portfolio-subtext hover:text-portfolio-text"
    }`;
  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-portfolio-border/70 bg-portfolio-bg/80 backdrop-blur-xl">
      <nav className="section-shell flex h-20 items-center justify-between">
        <Link
          to="/"
          className="font-display text-xl font-extrabold tracking-tight text-portfolio-text"
        >
          {first}
          {last && <span className="text-portfolio-gold">{last}</span>}
        </Link>
        <div className="hidden items-center gap-2 md:flex">
          {links.map((l) => (
            <Link key={l.to} to={l.to} onClick={go(l)} className={nav(l)}>
              {l.label}
            </Link>
          ))}
          {cvHref && (
            <a
              href={cvHref}
              download={cvHref.startsWith("http") ? "SEKA-Shalom-CV.pdf" : undefined}
              className="focus-ring ml-2 inline-flex items-center gap-2 rounded-full border border-portfolio-gold/50 px-4 py-2 text-sm font-semibold text-portfolio-gold transition hover:bg-portfolio-gold hover:text-portfolio-bg"
            >
              <Download size={16} /> CV
            </a>
          )}
        </div>
        <button
          type="button"
          className="focus-ring rounded-full border border-portfolio-border p-2 text-portfolio-text md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle navigation"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>
      {open && (
        <div className="border-t border-portfolio-border bg-portfolio-bg px-4 py-4 md:hidden">
          <div className="flex flex-col gap-2">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={go(l)}
                className={nav(l)}
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};
export default Navbar;
