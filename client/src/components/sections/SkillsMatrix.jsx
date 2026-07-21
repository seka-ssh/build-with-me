import {
  Code2,
  Database,
  GitBranch,
  KeyRound,
  Layers,
  Lock,
  Network,
  ServerCog,
  Sparkles,
  WalletCards,
} from "lucide-react";
import SkillBadge from "../ui/SkillBadge";
import TechStackRadar from "../charts/TechStackRadar";
const groups = [
  {
    title: "Languages & Runtimes",
    skills: [
      {
        icon: Code2,
        name: "JavaScript (ES2024)",
        level: "Expert",
        description:
          "Modern JavaScript for client-side apps, APIs, async workflows, and clean architecture.",
      },
      {
        icon: ServerCog,
        name: "Node.js",
        level: "Expert",
        description:
          "Production Express APIs, background jobs, authentication, logging, and performance tuning.",
      },
      {
        icon: Sparkles,
        name: "Python Basics",
        level: "Intermediate",
        description:
          "Automation scripts, data workflows, and ML microservice integration patterns.",
      },
    ],
  },
  {
    title: "Frameworks & Libraries",
    skills: [
      {
        icon: Layers,
        name: "React",
        level: "Expert",
        description:
          "Component systems, hooks, routing, form validation, animation, and state management.",
      },
      {
        icon: Network,
        name: "Express.js",
        level: "Expert",
        description:
          "Secure REST APIs, middleware pipelines, validation, and scalable route organization.",
      },
      {
        icon: Sparkles,
        name: "Tailwind + Framer Motion",
        level: "Advanced",
        description:
          "Fast design systems, responsive layouts, page transitions, and scroll-linked UI motion.",
      },
    ],
  },
  {
    title: "Databases, DevOps & Tools",
    skills: [
      {
        icon: Database,
        name: "MongoDB + Mongoose",
        level: "Expert",
        description:
          "Schema design, indexes, aggregation, seed scripts, and production-safe models.",
      },
      {
        icon: WalletCards,
        name: "Stripe, WebSockets, REST APIs",
        level: "Advanced",
        description:
          "Payment workflows, live dashboards, event-driven updates, and third-party integrations.",
      },
      {
        icon: GitBranch,
        name: "Docker, GitHub Actions, PM2, Nginx",
        level: "Advanced",
        description:
          "Containerized deployment, CI/CD, process management, and reverse proxy setup.",
      },
      {
        icon: KeyRound,
        name: "JWT, Redis, Security",
        level: "Advanced",
        description:
          "Token authentication, rate limiting, caching patterns, and hardening.",
      },
      {
        icon: Lock,
        name: "Role-Based Access Control",
        level: "Advanced",
        description:
          "Admin portals, audit trails, permission scopes, and secure workflows.",
      },
    ],
  },
];
const SkillsMatrix = () => (
  <section className="bg-portfolio-bg py-24" id="skills">
    <div className="section-shell">
      <div className="max-w-3xl">
        <p className="text-sm font-bold uppercase tracking-[0.28em] text-portfolio-gold">
          Skills Matrix
        </p>
        <h2 className="mt-3 font-display text-4xl font-bold text-portfolio-text md:text-5xl">
          A stack built for finance-grade products.
        </h2>
        <p className="mt-5 text-lg leading-8 text-portfolio-subtext">
          From polished React interfaces to secure Node.js APIs and deployment
          pipelines, every layer supports serious business workflows.
        </p>
      </div>
      <div className="mt-12 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="grid gap-8 lg:grid-cols-3">
          {groups.map((g) => (
            <div key={g.title}>
              <h3 className="mb-4 font-display text-xl font-bold text-portfolio-text">
                {g.title}
              </h3>
              <div className="space-y-4">
                {g.skills.map((s) => (
                  <SkillBadge key={s.name} {...s} />
                ))}
              </div>
            </div>
          ))}
        </div>
        <div>
          <h3 className="mb-4 font-display text-xl font-bold text-portfolio-text">
            Engineering Balance
          </h3>
          <TechStackRadar />
        </div>
      </div>
    </div>
  </section>
);
export default SkillsMatrix;
