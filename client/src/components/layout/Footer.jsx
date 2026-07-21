import { Github, Linkedin, Twitter } from "lucide-react";
const Footer = () => {
  const y = new Date().getFullYear();
  return (
    <footer className="border-t border-portfolio-border bg-portfolio-bg py-10">
      <div className="section-shell flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-display text-lg font-bold text-portfolio-text">
            Seka Shalom
          </p>
          <p className="mt-1 text-sm text-portfolio-subtext">
            Full-stack FinTech systems, enterprise dashboards, and production
            web platforms.
          </p>
        </div>
        <div className="flex items-center gap-3">
          {[
            ["https://github.com/sekashalom", Github, "GitHub"],
            ["https://linkedin.com/in/sekashalom", Linkedin, "LinkedIn"],
            ["https://twitter.com/sekashalom", Twitter, "Twitter/X"],
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
        </div>
      </div>
      <p className="section-shell mt-8 text-xs text-portfolio-muted">
        © {y} Seka Shalom. Built with React, Node.js, MongoDB, Docker, and
        Tailwind CSS.
      </p>
    </footer>
  );
};
export default Footer;
