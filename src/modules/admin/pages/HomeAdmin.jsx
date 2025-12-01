import React from "react";
import { useNavigate } from "react-router-dom";

export default function HomeAdmin() {
  const navigate = useNavigate();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Panel de Administración</h1>

      <div className="grid sm:grid-cols-3 gap-6">

        {/* Productos */}
        <div
          className="p-6 bg-white shadow rounded cursor-pointer hover:bg-gray-100 transition"
          onClick={() => navigate("/admin/products")}
        >
          <h2 className="text-xl font-semibold mb-2">Productos</h2>
          <p>Gestionar creación, edición y listado de productos.</p>
        </div>

        {/* Órdenes */}
        <div
          className="p-6 bg-white shadow rounded cursor-pointer hover:bg-gray-100 transition"
          onClick={() => navigate("/admin/orders")}
        >
          <h2 className="text-xl font-semibold mb-2">Órdenes</h2>
          <p>Revisar y administrar órdenes de compra.</p>
        </div>

        {/* Usuarios */}
        <div
          className="p-6 bg-white shadow rounded cursor-pointer hover:bg-gray-100 transition"
          onClick={() => navigate("/admin/create-user")}
        >
          <h2 className="text-xl font-semibold mb-2">Usuarios</h2>
          <p>Registrar nuevos administradores o clientes.</p>
        </div>

      </div>
    </div>
  );
}
