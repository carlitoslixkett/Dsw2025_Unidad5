import { useNavigate } from "react-router-dom";

export default function UserCreatedSuccess() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center gap-6 mt-20">
      
      <h1 className="text-3xl font-bold text-green-600">
        ✔ Usuario creado con éxito
      </h1>

      <p className="text-gray-600 text-lg">
        El usuario ha sido registrado correctamente.
      </p>

      <div className="flex gap-4">
        <button
          onClick={() => navigate("/admin/create-user")}
          className="px-6 py-3 bg-purple-500 text-white rounded-md hover:bg-purple-600"
        >
          Crear otro usuario
        </button>

        <button
          onClick={() => navigate("/admin/home")}
          className="px-6 py-3 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
        >
          Volver al Panel
        </button>
      </div>
    </div>
  );
}
