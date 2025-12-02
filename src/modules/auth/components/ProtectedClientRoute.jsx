import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

function ProtectedClientRoute({ children }) {
  const { user } = useAuth();

  // Si NO hay usuario → fuera
  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
}

export default ProtectedClientRoute;
