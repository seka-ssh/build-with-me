import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import RoadmapNode from "../ui/RoadmapNode";
import ProjectModal from "../ui/ProjectModal";
import { useProjects } from "../context/ProjectContext";
const ProjectRoadmap = () => {
  const ref = useRef(null);
  const { state, dispatch } = useProjects();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 75%", "end 55%"],
  });
  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const open = (p) => dispatch({ type: "SELECT_PROJECT", payload: p });
  const close = () => dispatch({ type: "CLEAR_PROJECT" });
  return (
    <section
      id="roadmap"
      ref={ref}
      className="relative overflow-hidden bg-portfolio-bg py-24"
    >
      <div className="absolute inset-0 bg-grid bg-[size:28px_28px] opacity-25" />
      <div className="section-shell relative z-10">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.28em] text-portfolio-gold">
            Gamified Roadmap
          </p>
          <h2 className="mt-3 font-display text-4xl font-bold text-portfolio-text md:text-5xl">
            Fourteen systems, one product journey.
          </h2>
          <p className="mt-5 text-lg leading-8 text-portfolio-subtext">
            Finished projects glow, in-progress systems pulse, and pending
            concepts stay locked until launch.
          </p>
        </div>
        <div className="relative mt-16">
          <svg
            className="pointer-events-none absolute left-1/2 top-0 hidden h-full w-40 -translate-x-1/2 md:block"
            preserveAspectRatio="none"
            viewBox="0 0 160 1800"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="roadmap-gradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#F59E0B" />
                <stop offset="55%" stopColor="#D97706" />
                <stop offset="100%" stopColor="#6B7280" />
              </linearGradient>
            </defs>
            <motion.path
              d="M80 0 C20 130 140 180 80 310 C20 440 140 490 80 620 C20 750 140 800 80 930 C20 1060 140 1110 80 1240 C20 1370 140 1420 80 1550 C40 1640 120 1700 80 1800"
              fill="none"
              stroke="url(#roadmap-gradient)"
              strokeWidth="4"
              strokeDasharray="12 14"
              style={{ pathLength }}
            />
          </svg>
          {state.projects.map((p, i) => (
            <RoadmapNode key={p.slug} project={p} index={i} onOpen={open} />
          ))}
        </div>
      </div>
      {state.selectedProject && (
        <ProjectModal project={state.selectedProject} onClose={close} />
      )}
    </section>
  );
};
export default ProjectRoadmap;
