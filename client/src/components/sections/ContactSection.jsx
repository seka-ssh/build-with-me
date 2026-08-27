import { yupResolver } from "@hookform/resolvers/yup";
import { Github, Linkedin, Instagram, Mail, Send, Phone } from "lucide-react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as yup from "yup";
import { sendContactMessage } from "../../services/api";
import { useSite } from "../context/SiteContext";
const schema = yup.object({
  name: yup.string().required("Name is required").min(2, "Name is too short"),
  email: yup
    .string()
    .required("Email is required")
    .email("Use a valid email address"),
  subject: yup.string().required("Select a subject"),
  message: yup
    .string()
    .required("Message is required")
    .min(20, "Message must be at least 20 characters"),
});
const ContactSection = () => {
  const { settings } = useSite();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      subject: "Project Inquiry",
      message: "",
    },
  });
  const submit = async (v) => {
    try {
      const r = await sendContactMessage(v);
      toast.success(
        r.message ||
          "Your message has been received. I'll respond within 24 hours.",
      );
      reset();
    } catch (e) {
      toast.error(e.message || "Unable to send message.");
    }
  };
  return (
    <section id="contact" className="bg-portfolio-bg py-24">
      <div className="section-shell grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.28em] text-portfolio-gold">
            Contact
          </p>
          <h2 className="mt-3 font-display text-4xl font-bold text-portfolio-text md:text-5xl">
            Let’s discuss the next serious build.
          </h2>
          <p className="mt-5 text-lg leading-8 text-portfolio-subtext">
            Use the form for project inquiries, partnerships, speaking
            invitations, or architecture reviews.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            {[
              [`mailto:${settings.email || "sekashalom74@gmail.com"}`, Mail, "Email"],
              [`tel:${(settings.phonePrimary || "0788212710").replace(/\s/g, "")}`, null, settings.phonePrimary || "0788212710"],
              [`tel:${(settings.phoneSecondary || "0728212710").replace(/\s/g, "")}`, null, settings.phoneSecondary || "0728212710"],
              [settings.github || "https://github.com/seka-ssh", Github, "GitHub"],
              [
                settings.linkedin || "https://www.linkedin.com/in/seka-shalom-653047394",
                Linkedin,
                "LinkedIn",
              ],
              ...(settings.instagram
                ? [[settings.instagram, Instagram, "Instagram"]]
                : []),
            ].map(([href, Icon, label]) => (
              <a
                key={label}
                className="focus-ring inline-flex items-center gap-2 rounded-full border border-portfolio-border px-4 py-2 text-portfolio-subtext transition hover:border-portfolio-gold hover:text-portfolio-gold"
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noreferrer" : undefined}
              >
                {Icon && <Icon size={18} />}
                {label}
              </a>
            ))}
          </div>
        </div>
        <form
          onSubmit={handleSubmit(submit)}
          className="rounded-3xl border border-portfolio-border bg-portfolio-surface/80 p-6 shadow-glow md:p-8"
        >
          <div className="grid gap-5 md:grid-cols-2">
            <label className="block">
              <span className="text-sm font-semibold text-portfolio-text">
                Name
              </span>
              <input
                className="focus-ring mt-2 w-full rounded-2xl border border-portfolio-border bg-portfolio-bg px-4 py-3 text-portfolio-text"
                {...register("name")}
                placeholder="Your name"
              />
              {errors.name && (
                <span className="mt-2 block text-sm text-red-300">
                  {errors.name.message}
                </span>
              )}
            </label>
            <label className="block">
              <span className="text-sm font-semibold text-portfolio-text">
                Email
              </span>
              <input
                className="focus-ring mt-2 w-full rounded-2xl border border-portfolio-border bg-portfolio-bg px-4 py-3 text-portfolio-text"
                {...register("email")}
                placeholder="you@example.com"
              />
              {errors.email && (
                <span className="mt-2 block text-sm text-red-300">
                  {errors.email.message}
                </span>
              )}
            </label>
          </div>
          <label className="mt-5 block">
            <span className="text-sm font-semibold text-portfolio-text">
              Subject
            </span>
            <select
              className="focus-ring mt-2 w-full rounded-2xl border border-portfolio-border bg-portfolio-bg px-4 py-3 text-portfolio-text"
              {...register("subject")}
            >
              <option>General</option>
              <option>Project Inquiry</option>
              <option>Partnership</option>
            <option>Speaking</option>
            </select>
          </label>
          <label className="mt-5 block">
            <span className="text-sm font-semibold text-portfolio-text">
              Message
            </span>
            <textarea
              className="focus-ring mt-2 min-h-40 w-full rounded-2xl border border-portfolio-border bg-portfolio-bg px-4 py-3 text-portfolio-text"
              {...register("message")}
              placeholder="Tell me about the product, deadline, users, and business goal."
            />
            {errors.message && (
              <span className="mt-2 block text-sm text-red-300">
                {errors.message.message}
              </span>
            )}
          </label>
          <button
            type="submit"
            disabled={isSubmitting}
            className="focus-ring mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-portfolio-gold px-6 py-3 font-bold text-portfolio-bg transition hover:bg-portfolio-gold-light disabled:opacity-60"
          >
            {isSubmitting ? "Sending..." : "Send Message"} <Send size={18} />
          </button>
        </form>
      </div>
    </section>
  );
};
export default ContactSection;
