import { Navigate, useLocation } from "react-router-dom";
const ProtectedRoute = ({ children }) => {
  const loc = useLocation();
  const token = localStorage.getItem("sekaAdminToken");
  if (!token) return <Navigate to="/admin/login" state={{ from: loc }} replace />;
  return children;
};
export default ProtectedRoute;