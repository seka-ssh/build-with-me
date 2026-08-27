import { Helmet } from "react-helmet-async";
import ContactSection from "../components/sections/ContactSection";
import HeroSection from "../components/sections/HeroSection";
import ProjectRoadmap from "../components/sections/ProjectRoadmap";
import SkillsMatrix from "../components/sections/SkillsMatrix";
import StatsCounter from "../components/sections/StatsCounter";
import TestimonialsSection from "../components/sections/TestimonialsSection";
import CertificatesSection from "../components/sections/CertificatesSection";
import AboutSection from "../components/sections/AboutSection";
import BuildWithMe from "../components/sections/BuildWithMe";
import HireMeSection from "../components/sections/HireMeSection";
import PageTransition from "../components/layout/PageTransition";

const HomePage = () => (
  <PageTransition>
    <Helmet>
      <title>
        SEKA Shalom | Full-Stack Engineer · FinTech Systems · Africa & Beyond
      </title>
    </Helmet>
    <HeroSection />
    <AboutSection />
    <SkillsMatrix />
    <ProjectRoadmap />
    <StatsCounter />
    <TestimonialsSection />
    <CertificatesSection />
    <BuildWithMe />
    <HireMeSection />
    <ContactSection />
  </PageTransition>
);
export default HomePage;
