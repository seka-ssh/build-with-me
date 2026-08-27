import { Route, Routes, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import AnalyticsBadge from "./components/ui/AnalyticsBadge";
import AnnouncementBanner from "./components/layout/AnnouncementBanner";
import Footer from "./components/layout/Footer";
import Navbar from "./components/layout/Navbar";
import ContactPage from "./pages/ContactPage";
import HomePage from "./pages/HomePage";
import ProjectDetailPage from "./pages/ProjectDetailPage";
import ProjectsPage from "./pages/ProjectsPage";
import AdminLoginPage from "./pages/AdminLoginPage";
import AdminDashboard from "./pages/AdminDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import usePageTracking from "./hooks/usePageTracking";

const App = () => {
  usePageTracking();
  const { pathname } = useLocation();
  const isAdmin = pathname.startsWith("/admin");
  return (
    <>
      {!isAdmin && <AnnouncementBanner />}
      {!isAdmin && <Navbar />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/projects/:slug" element={<ProjectDetailPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<HomePage />} />
      </Routes>
      {!isAdmin && <Footer />}
      {!isAdmin && <AnalyticsBadge />}
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
