// src/modules/admin/components/Header.jsx
import React from 'react';
import { Bars3Icon, UserCircleIcon } from '@heroicons/react/24/outline';
import useAuth from '../../auth/hook/useAuth';  

function Header({ onMenuClick }) {
  const { user } = useAuth();
  const userName = user?.username || "Administrador";

  return (
    <header className="bg-white shadow-md p-4 flex justify-between items-center sticky top-0 z-10">

      {/* Botón Menú (Mobile) */}
      <button 
        className="text-gray-500 lg:hidden focus:outline-none hover:text-gray-700 transition"
        onClick={onMenuClick}
      >
        <Bars3Icon className="h-7 w-7" />
      </button>

      {/* Título */}
      <h1 className="text-xl font-semibold text-gray-800 hidden lg:block">
        Panel de Control
      </h1>

      {/* Usuario Logueado */}
      <div className="flex items-center space-x-3">
        <UserCircleIcon className="h-8 w-8 text-gray-500" />
        <span className="text-gray-700 font-medium hidden sm:block">
          {userName}
        </span>
      </div>

    </header>
  );
}

export default Header;
