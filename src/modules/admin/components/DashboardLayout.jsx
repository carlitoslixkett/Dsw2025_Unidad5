// src/modules/admin/components/DashboardLayout.jsx (Actualizado)
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar'; 
import Header from './Header'; 

function DashboardLayout() {
  // Estado para manejar si el menú está abierto en móvil
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 flex">
      
      {/* 1. Sidebar */}
      {/* El Sidebar es fijo y ocupa el 100% de la altura */}
      <aside className={`
        fixed inset-y-0 left-0 z-30 
        w-64 transform 
        bg-white 
        shadow-xl lg:shadow-none
        transition-transform duration-300 ease-in-out
        lg:translate-x-0 
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <Sidebar />
      </aside>
      
      {/* 2. Overlay para móvil (cierra el menú al tocar fuera) */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 z-20 bg-black opacity-50 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* 3. Contenido Principal */}
      <div className="flex-1 flex flex-col lg:ml-64">
        
        {/* Header (Recibe la función para abrir el menú en móvil) */}
        <Header onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />
        
        {/* Contenido de la Ruta Anidada */}
        <main className="flex-1 p-4 sm:p-6 md:p-8">
          <Outlet /> 
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;