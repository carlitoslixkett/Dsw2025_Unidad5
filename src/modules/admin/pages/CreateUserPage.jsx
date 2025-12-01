import { useForm } from "react-hook-form";
import { createUser } from "../services/CreateUser";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateUserPage() {
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset
  } = useForm();

  const roleSelected = watch("role");

  const onSubmit = async (data) => {
    const result = await createUser(data);

    if (result.ok) {
      setSuccess(true);   // ← Mostrar pantalla de éxito
      reset();            // Limpiar formulario
    } else {
      alert("Error: " + JSON.stringify(result.error));
    }
  };

  // -------------------
  //    ⚡ PANTALLA ÉXITO
  // -------------------
  if (success) {
    return (
      <div className="flex justify-center w-full mt-10">
        <div className="bg-white shadow-xl p-10 rounded-xl w-full max-w-xl text-center border border-gray-200">

          <h2 className="text-2xl font-bold mb-6 text-green-600">
            ✅ Usuario creado con éxito
          </h2>

          <p className="text-gray-600 mb-8">
            El usuario ha sido registrado correctamente.
          </p>

          <div className="flex flex-col gap-4">

            <button
              className="bg-purple-600 text-white py-2 rounded hover:bg-purple-700 transition"
              onClick={() => setSuccess(false)}
            >
              Crear otro usuario
            </button>

            <button
              className="bg-gray-200 py-2 rounded hover:bg-gray-300 transition"
              onClick={() => navigate("/admin/home")}
            >
              Volver al Panel
            </button>

          </div>
        </div>
      </div>
    );
  }

  // -------------------
  //    ⚡ FORMULARIO
  // -------------------
  return (
    <div className="flex justify-center w-full mt-10">
      <div className="bg-white shadow-xl p-10 rounded-xl w-full max-w-2xl border border-gray-200">

        <h2 className="text-2xl text-center font-bold mb-8">Crear Usuario</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">

          {/* Usuario */}
          <div>
            <label className="font-medium">Usuario:</label>
            <input
              className="border p-2 rounded w-full"
              {...register("username", { required: "El usuario es obligatorio" })}
            />
            {errors.username && (
              <p className="text-red-500 text-sm">{errors.username.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="font-medium">Email:</label>
            <input
              className="border p-2 rounded w-full"
              {...register("email", { required: "El email es obligatorio" })}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          {/* Contraseña */}
          <div>
            <label className="font-medium">Contraseña:</label>
            <input
              type="password"
              className="border p-2 rounded w-full"
              {...register("password", { required: "La contraseña es obligatoria" })}
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          {/* Teléfono (solo cliente) */}
          {roleSelected === "User" && (
            <div>
              <label className="font-medium">Teléfono (solo cliente):</label>
              <input
                className="border p-2 rounded w-full"
                {...register("phoneNumber")}
              />
            </div>
          )}

          {/* Rol */}
          <div>
            <label className="font-medium">Rol:</label>
            <select
              className="border p-2 rounded w-full"
              {...register("role", { required: "Debe seleccionar un rol" })}
            >
              <option value="">Seleccione un rol</option>
              <option value="Admin">Administrador</option>
              <option value="User">Cliente</option>
            </select>
            {errors.role && (
              <p className="text-red-500 text-sm">{errors.role.message}</p>
            )}
          </div>

          {/* Botón */}
          <button
            className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700 transition"
            type="submit"
          >
            Crear Usuario
          </button>
        </form>
      </div>
    </div>
  );
}
