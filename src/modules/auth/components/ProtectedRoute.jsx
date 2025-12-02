import { useAuth } from "../context/AuthProvider";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, role }) {
  const { user, isAuthenticated, loading } = useAuth();

  if (loading) return null;

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  // Si el rol no coincide, lo enviamos a su página correspondiente
  if (role && user.role !== role.toLowerCase()) {
    return <Navigate to="/" replace />;
  }

  return children;
}
