// src/modules/auth/components/ProtectedRoute.jsx

import { Navigate } from "react-router-dom";
import useAuth from "../hook/useAuth";

function ProtectedRoute({ children, role }) {
  const { isAuthenticated, user } = useAuth();

  // Si no inició sesión → al login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Si la ruta requiere un rol específico
  if (role && user?.role !== role) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;
