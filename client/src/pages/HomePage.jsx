import { Helmet } from "react-helmet-async";
import ContactSection from "../components/sections/ContactSection";
import HeroSection from "../components/sections/HeroSection";
import ProjectRoadmap from "../components/sections/ProjectRoadmap";
import SkillsMatrix from "../components/sections/SkillsMatrix";
import StatsCounter from "../components/sections/StatsCounter";
import PageTransition from "../components/layout/PageTransition";
const HomePage = () => (
  <PageTransition>
    <Helmet>
      <title>
        Seka Shalom | Full-Stack Engineer · FinTech Systems · Africa & Beyond
      </title>
    </Helmet>
    <HeroSection />
    <SkillsMatrix />
    <ProjectRoadmap />
    <StatsCounter />
    <ContactSection />
  </PageTransition>
);
export default HomePage;
