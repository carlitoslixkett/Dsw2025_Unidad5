// src/modules/admin/pages/CreateUserPage.jsx
import { useForm } from "react-hook-form";
import { createUser } from "../services/CreateUser.js";
import { useState } from "react";

function CreateUserPage() {
  const { register, handleSubmit, reset } = useForm();
  const [message, setMessage] = useState("");
  const [type, setType] = useState(""); // success | error

  const onSubmit = async (data) => {
    const response = await createUser(data);

    if (!response.ok) {
      setType("error");
      setMessage(
        response.error?.message ||
          response.error ||
          "Error al crear usuario"
      );
      return;
    }

    setType("success");
    setMessage("Usuario creado exitosamente");

    reset(); // limpia el formulario
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-8 rounded-xl shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Crear Usuario
      </h1>

      {message && (
        <div
          className={`p-3 mb-4 text-white rounded ${
            type === "success" ? "bg-green-500" : "bg-red-500"
          }`}
        >
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        {/* Usuario */}
        <div>
          <label className="font-medium">Usuario:</label>
          <input
            {...register("username", { required: true })}
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Email */}
        <div>
          <label className="font-medium">Email:</label>
          <input
            {...register("email", { required: true })}
            type="email"
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Contraseña */}
        <div>
          <label className="font-medium">Contraseña:</label>
          <input
            {...register("password", { required: true })}
            type="password"
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Teléfono (solo para cliente) */}
        <div>
          <label className="font-medium">Teléfono (solo cliente):</label>
          <input
            {...register("phoneNumber")}
            type="text"
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Selector de Rol */}
        <div>
          <label className="font-medium">Rol:</label>
          <select {...register("role", { required: true })} className="w-full p-2 border rounded">
            <option value="">Seleccione un rol</option>
            <option value="Client">Cliente</option>
            <option value="Admin">Administrador</option>
          </select>
        </div>

        <button
          type="submit"
          className="bg-purple-600 text-white p-2 rounded hover:bg-purple-700 transition"
        >
          Crear Usuario
        </button>
      </form>
    </div>
  );
}

export default CreateUserPage;
