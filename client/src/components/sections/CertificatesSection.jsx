import { Award, ExternalLink, FileText } from "lucide-react";
import { useSite } from "../context/SiteContext";

const CertificatesSection = () => {
  const { certificates } = useSite();
  if (!certificates || certificates.length === 0) return null;
  return (
    <section className="bg-portfolio-bg py-24" id="certificates">
      <div className="section-shell">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.28em] text-portfolio-gold">
            Certificates
          </p>
          <h2 className="mt-3 font-display text-4xl font-bold text-portfolio-text md:text-5xl">
            Credentials & achievements.
          </h2>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {certificates.map((c, i) => (
            <div
              key={c._id || i}
              className="group rounded-3xl border border-portfolio-border bg-portfolio-surface/70 p-6"
            >
              {c.imageUrl && (
                <img
                  src={c.imageUrl}
                  alt={c.title}
                  className="h-36 w-full rounded-2xl object-cover"
                />
              )}
              <div className="mt-4 flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-display font-bold text-portfolio-text">
                    {c.title}
                  </h3>
                  {c.issuer && (
                    <p className="mt-1 text-sm text-portfolio-subtext">
                      {c.issuer}
                    </p>
                  )}
                </div>
                <Award className="shrink-0 text-portfolio-gold" size={22} />
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {c.fileUrl && (
                  <a
                    href={c.fileUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full border border-portfolio-gold/50 px-3 py-1.5 text-xs font-semibold text-portfolio-gold transition hover:bg-portfolio-gold hover:text-portfolio-bg"
                  >
                    <FileText size={14} /> View
                  </a>
                )}
                {c.credentialId && (
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-portfolio-border px-3 py-1.5 text-xs text-portfolio-subtext">
                    <ExternalLink size={14} /> {c.credentialId}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default CertificatesSection;