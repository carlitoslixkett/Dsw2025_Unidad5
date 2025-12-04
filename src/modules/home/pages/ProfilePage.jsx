import ClientHeader from "../../shared/components/ClientHeader";
import { useAuth } from "../../auth/context/AuthProvider";
import { useNavigate } from "react-router-dom";

function ProfilePage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  if (!user) {
    // por si alguien entra a /profile sin estar logueado
    return (
      <div className="min-h-screen bg-gray-50">
        <ClientHeader />
        <div className="max-w-xl mx-auto p-4">
          <h1 className="text-2xl font-semibold mb-4">Mi Cuenta</h1>
          <p className="mb-4">
            Para ver la información de tu cuenta necesitás iniciar sesión.
          </p>
          <button
            onClick={() => navigate("/login")}
            className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700"
          >
            Ir a Iniciar Sesión
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <ClientHeader />

      <div className="max-w-2xl mx-auto p-4">
        <h1 className="text-2xl font-semibold mb-6">Mi Cuenta</h1>

        <div className="bg-white shadow-sm rounded-lg border p-6 space-y-4">
          <div>
            <h2 className="text-lg font-medium mb-1">Datos del usuario</h2>
            <p>
              <span className="font-semibold">Usuario:</span>{" "}
              {user.username || "—"}
            </p>
            <p>
              <span className="font-semibold">Email:</span>{" "}
              {user.email || "No disponible"}
            </p>
            {user.role && (
              <p>
                <span className="font-semibold">Rol:</span>{" "}
                {user.role}
              </p>
            )}
          </div>

          <hr />

          <div className="space-y-3">
            <button
              onClick={() => navigate("/orders")}
              className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700"
            >
              Ver mis pedidos
            </button>

            <button
              onClick={handleLogout}
              className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600"
            >
              Cerrar sesión
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
