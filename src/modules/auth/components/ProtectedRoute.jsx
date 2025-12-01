import { Navigate } from "react-router-dom";
import useAuth from "../hook/useAuth";

export default function ProtectedRoute({ role, children }) {
  const { isAuthenticated, user, loading } = useAuth();

  // ⏳ Mientras AuthProvider carga datos
  if (loading) return <div>Cargando...</div>;

  // ⛔ No autenticado → Login
  if (!isAuthenticated) return <Navigate to="/login" />;

  // ⛔ No tiene el rol → Home cliente
if (role && user?.role?.toLowerCase() !== role.toLowerCase()) {
    console.log("ROL NO COINCIDE → Redirigiendo", user.role, "vs", role);
    return <Navigate to="/" />;
}

console.log("🔍 ProtectedRoute → user.role:", user?.role);
console.log("🔍 ProtectedRoute → rol requerido:", role);

  // 🎉 Todo OK → Renderiza contenido
  return children;
}
