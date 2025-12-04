import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { instance } from "../../shared/api/axiosInstance";

function SignupForm() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: ""
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (form.password !== form.confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    try {
      await instance.post("/api/Auth/register", {
        username: form.username,
        email: form.email,
        password: form.password,
        phoneNumber: form.phoneNumber,
      });

      // Mensaje de éxito
      setSuccess("Cuenta creada con éxito. ");

      // Redirección automática
      setTimeout(() => {
        navigate("/login");
      }, 1500);

    } catch (err) {
      console.error("ERROR REGISTRO:", err);

      // PRIORIDAD 1: mensaje directo en "detail"
      const detail = err.response?.data?.detail;

      // PRIORIDAD 2: errores del modelo de Identity (array)
      const identityErrors = err.response?.data?.errors;
      let identityMessage = "";

      if (identityErrors && typeof identityErrors === "object") {
        identityMessage = Object.values(identityErrors)
          .flat()
          .join(" ");
      }

      // PRIORIDAD 3: fallback
      const fallback = "Error al registrar usuario. Verifica los datos ingresados.";

      // Elegimos el mensaje más útil
      const finalMessage = detail || identityMessage || fallback;

      setError(finalMessage);
    }

  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">

      {/* Mensajes */}
      {error && (
        <p className="text-red-600 font-medium text-center">{error}</p>
      )}

      {success && (
        <p className="text-green-600 font-medium text-center">{success}</p>
      )}

      {/* Usuario */}
      <div>
        <label className="block font-medium mb-1">Usuario:</label>
        <input
          name="username"
          className="w-full px-3 py-2 border rounded-md bg-gray-100"
          value={form.username}
          onChange={handleChange}
          required
        />
      </div>

      {/* Email */}
      <div>
        <label className="block font-medium mb-1">Email:</label>
        <input
          name="email"
          type="email"
          className="w-full px-3 py-2 border rounded-md bg-gray-100"
          value={form.email}
          onChange={handleChange}
          required
        />
      </div>

      {/* Contraseña */}
      <div>
        <label className="block font-medium mb-1">Contraseña:</label>
        <input
          name="password"
          type="password"
          className="w-full px-3 py-2 border rounded-md bg-gray-100"
          value={form.password}
          onChange={handleChange}
          required
        />
      </div>

      {/* Confirmar */}
      <div>
        <label className="block font-medium mb-1">Confirmar contraseña:</label>
        <input
          name="confirmPassword"
          type="password"
          className="w-full px-3 py-2 border rounded-md bg-gray-100"
          value={form.confirmPassword}
          onChange={handleChange}
          required
        />
      </div>

      {/* Teléfono */}
      <div>
        <label className="block font-medium mb-1">Teléfono:</label>
        <input
          name="phoneNumber"
          className="w-full px-3 py-2 border rounded-md bg-gray-100"
          value={form.phoneNumber}
          onChange={handleChange}
          required
        />
      </div>

      {/* Botones */}
      <button
        type="submit"
        className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition"
      >
        Crear Cuenta
      </button>

      <button
        type="button"
        onClick={() => navigate("/login")}
        className="w-full bg-gray-200 py-2 rounded-md hover:bg-gray-300 transition"
      >
        Volver al inicio
      </button>
    </form>
  );
}

export default SignupForm;
