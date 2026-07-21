import { Link, NavLink } from "react-router-dom";
import { Download, Menu, X } from "lucide-react";
import { useState } from "react";

const links = [
  { to: "/", label: "Home" },
  { to: "/projects", label: "Projects" },
  { to: "/contact", label: "Contact" },
];
const Navbar = () => {
  const [open, setOpen] = useState(false);
  const nav = ({ isActive }) =>
    `rounded-full px-4 py-2 text-sm font-semibold transition ${isActive ? "bg-portfolio-gold text-portfolio-bg" : "text-portfolio-subtext hover:text-portfolio-text"}`;
  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-portfolio-border/70 bg-portfolio-bg/80 backdrop-blur-xl">
      <nav className="section-shell flex h-20 items-center justify-between">
        <Link
          to="/"
          className="font-display text-xl font-extrabold tracking-tight text-portfolio-text"
        >
        
          Seka<span className="text-portfolio-gold">Shalom</span>
        </Link>
        <div className="hidden items-center gap-2 md:flex">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} className={nav}>
              {l.label}
            </NavLink>
          ))}
          <a
            href="/cv.pdf"
            download
            className="focus-ring ml-2 inline-flex items-center gap-2 rounded-full border border-portfolio-gold/50 px-4 py-2 text-sm font-semibold text-portfolio-gold transition hover:bg-portfolio-gold hover:text-portfolio-bg"
          >
            <Download size={16} /> CV
          </a>
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
              <NavLink
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className={nav}
              >
                {l.label}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};
export default Navbar;
