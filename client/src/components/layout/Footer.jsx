import { Link } from "react-router-dom";
import { Github, Linkedin, Instagram, Lock } from "lucide-react";
import { useSite } from "../context/SiteContext";
const Footer = () => {
  const { settings } = useSite();
  const y = new Date().getFullYear();
  const name = settings.name || "SEKA Shalom";
  return (
    <footer className="border-t border-portfolio-border bg-portfolio-bg py-10">
      <div className="section-shell flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-display text-lg font-bold text-portfolio-text">
            {name}
          </p>
          <p className="mt-1 text-sm text-portfolio-subtext">
            Full-stack developer — web, fintech & enterprise platforms.
          </p>
          {(settings.phonePrimary || settings.phoneSecondary) && (
            <p className="mt-1 text-sm text-portfolio-subtext">
              {settings.phonePrimary}
              {settings.phoneSecondary ? ` · ${settings.phoneSecondary}` : ""}
            </p>
          )}
        </div>
        <div className="flex items-center gap-3">
          {[
            [settings.github || "https://github.com/seka-ssh", Github, "GitHub"],
            [
              settings.linkedin ||
                "https://www.linkedin.com/in/seka-shalom-653047394",
              Linkedin,
              "LinkedIn",
            ],
            [
              settings.instagram || "https://www.instagram.com/iamcybedevs",
              Instagram,
              "Instagram",
            ],
          ].map(([href, Icon, label]) => (
            <a
              key={label}
              className="focus-ring rounded-full border border-portfolio-border p-3 text-portfolio-subtext transition hover:border-portfolio-gold hover:text-portfolio-gold"
              href={href}
              target="_blank"
              rel="noreferrer"
              aria-label={label}
            >
              <Icon size={18} />
            </a>
          ))}
          <Link
            to="/admin"
            className="focus-ring inline-flex items-center gap-1.5 rounded-full border border-portfolio-border px-3 py-2 text-xs font-semibold text-portfolio-subtext transition hover:border-portfolio-gold hover:text-portfolio-gold"
            aria-label="Admin login"
          >
            <Lock size={14} /> Admin
          </Link>
        </div>
      </div>
      <p className="section-shell mt-8 text-xs text-portfolio-muted">
        © {y} Seka Shalom. Built with React, Node.js, MongoDB, and
        Tailwind CSS.
      </p>
    </footer>
  );
};
export default Footer;
