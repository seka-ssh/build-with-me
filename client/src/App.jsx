import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import AnalyticsBadge from "./components/ui/AnalyticsBadge";
import Footer from "./components/layout/Footer";
import Navbar from "./components/layout/Navbar";
import ContactPage from "./pages/ContactPage";
import HomePage from "./pages/HomePage";
import ProjectDetailPage from "./pages/ProjectDetailPage";
import ProjectsPage from "./pages/ProjectsPage";
import usePageTracking from "./hooks/usePageTracking";
const App = () => {
  usePageTracking();
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/projects/:slug" element={<ProjectDetailPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
      <Footer />
      <AnalyticsBadge />
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#111827",
            color: "#F9FAFB",
            border: "1px solid #1F2937",
          },
        }}
      />
    </>
  );
};
export default App;
