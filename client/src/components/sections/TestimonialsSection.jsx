import { Quote } from "lucide-react";
import { useSite } from "../context/SiteContext";

const TestimonialsSection = () => {
  const { testimonials } = useSite();
  const has = Array.isArray(testimonials) && testimonials.length > 0;
  return (
    <section className="bg-portfolio-bg py-24" id="testimonials">
      <div className="section-shell">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.28em] text-portfolio-gold">
            Testimonials
          </p>
          <h2 className="mt-3 font-display text-4xl font-bold text-portfolio-text md:text-5xl">
            What people say.
          </h2>
        </div>
        {!has ? (
          <p className="mt-12 rounded-3xl border border-dashed border-portfolio-border bg-portfolio-surface/40 p-10 text-center text-portfolio-subtext">
            Client testimonials will appear here once they are added from the
            admin dashboard.
          </p>
        ) : (
        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {testimonials.map((t, i) => (
            <figure
              key={t._id || i}
              className="rounded-3xl border border-portfolio-border bg-portfolio-surface/70 p-6"
            >
              <Quote className="text-portfolio-gold" size={22} />
              <blockquote className="mt-4 text-sm leading-7 text-portfolio-subtext">
                “{t.message}”
              </blockquote>
              <figcaption className="mt-5 flex items-center gap-3">
                {t.photoUrl && (
                  <img
                    src={t.photoUrl}
                    alt={t.name}
                    className="h-11 w-11 rounded-full object-cover"
                  />
                )}
                <div>
                  <p className="font-display font-bold text-portfolio-text">
                    {t.name}
                  </p>
                  <p className="text-xs text-portfolio-muted">
                    {t.role}
                    {t.company && ` · ${t.company}`}
                  </p>
                  <p className="text-xs text-portfolio-gold-light">
                    {"★".repeat(t.rating || 0)}
                  </p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
        )}
      </div>
    </section>
  );
};
export default TestimonialsSection;