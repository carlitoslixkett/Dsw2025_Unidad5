// src/modules/admin/components/DashboardLayout.jsx
import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";

function DashboardLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    if (isSidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isSidebarOpen]);

  return (
    <div className="min-h-screen bg-gray-100 flex overflow-x-hidden">
      {/* SIDEBAR */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-30 
          w-64 bg-white border-r shadow-xl
          transform transition-transform duration-300 ease-in-out
          lg:translate-x-0 lg:static lg:shadow-none
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="h-full overflow-y-auto">
          <Sidebar />
        </div>
      </aside>

      {/* OVERLAY MOBILE */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/50 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* CONTENIDO PRINCIPAL */}
      {/* 👇 OJO: acá le sacamos el lg:ml-64 */}
      <div className="flex flex-col flex-1 min-h-screen">
        <Header onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />

        <main className="flex-1 px-6 py-6 overflow-auto">
          {/* usamos TODO el ancho disponible */}
          <div className="w-full">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;


