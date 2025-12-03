// src/modules/admin/components/DashboardLayout.jsx
import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";

function DashboardLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Evita que el body se mueva cuando el sidebar móvil está abierto
  useEffect(() => {
    if (isSidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isSidebarOpen]);

  return (
    <div className="min-h-screen bg-gray-100 flex">

      {/* SIDEBAR */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-30 
          w-64 bg-white shadow-xl
          transform transition-transform duration-300 ease-in-out

          lg:translate-x-0 lg:static lg:shadow-none
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="h-full overflow-y-auto">
          <Sidebar />
        </div>
      </aside>

      {/* OVERLAY EN MOBILE */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/50 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* CONTENIDO PRINCIPAL */}
      <div className="flex flex-col flex-1 lg:ml-64 min-h-screen">

        {/* HEADER (botón hamburguesa) */}
        <Header onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />

        {/* CONTENIDO DE LAS RUTAS */}
        <main className="flex-1 p-4 sm:p-6 md:p-8 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;
