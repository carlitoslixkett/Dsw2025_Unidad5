import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const { signin } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validaciones
    if (!username.trim()) {
      setErrorMsg("El usuario es obligatorio");
      return;
    }

    if (!password.trim()) {
      setErrorMsg("La contraseña es obligatoria");
      return;
    }

    // Login
    const { error } = await signin(username, password);

    if (error) {
      setErrorMsg("Usuario o contraseña incorrectos");
      return;
    }

    // Recuperamos datos del usuario recién guardados
    const savedUser = JSON.parse(localStorage.getItem("user"));

    // 🔥 Redirección según su rol
    if (savedUser?.role === "admin") {
      navigate("/admin/home");
    } else {
      navigate("/");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">

      <div>
        <label className="font-medium">Usuario:</label>
        <input
          type="text"
          className="w-full border rounded px-3 py-2 bg-blue-50"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>

      <div>
        <label className="font-medium">Contraseña:</label>
        <input
          type="password"
          className="w-full border rounded px-3 py-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      {errorMsg && (
        <p className="text-red-500 text-sm">{errorMsg}</p>
      )}

      <button
        type="submit"
        className="w-full bg-purple-400 hover:bg-purple-500 text-white py-2 rounded"
      >
        Iniciar Sesión
      </button>

      <button
        type="button"
        onClick={() => navigate("/signup")}
        className="w-full bg-gray-200 hover:bg-gray-300 py-2 rounded"
      >
        Registrar Usuario
      </button>
    </form>
  );
}

export default LoginForm;
