// src/modules/admin/components/Sidebar.jsx
import React from 'react';
import { UserPlusIcon } from '@heroicons/react/24/outline';
import { NavLink } from 'react-router-dom';
import { HomeIcon, ShoppingBagIcon, ArchiveBoxIcon, ArrowLeftEndOnRectangleIcon } from '@heroicons/react/24/outline';
import useAuth from '../../auth/hook/useAuth'; 

const navigation = [
  { name: 'Inicio', href: '/admin/home', icon: HomeIcon },
  { name: 'Productos', href: '/admin/products', icon: ShoppingBagIcon },
  { name: 'Órdenes', href: '/admin/orders', icon: ArchiveBoxIcon },
  { name: 'Crear Usuario',href: '/admin/create-user',icon: UserPlusIcon,},

];

function Sidebar() {
  const { logout } = useAuth(); // Obtenemos la función de cerrar sesión

  return (
    <div className="flex flex-col h-full bg-white border-r">
      {/* Logo/Título */}
      <div className="flex items-center justify-center h-20 border-b p-4">
        <span className="text-xl font-extrabold text-purple-700 tracking-wider">
          E-COMMERCE ADMIN
        </span>
      </div>

      {/* Enlaces de Navegación */}
      <nav className="flex-1 px-2 py-4 space-y-2">
        {navigation.map((item) => (
          <NavLink
            key={item.name}
            to={item.href}
            // Tailwind CSS para manejar el estado activo y pasivo de la ruta
            className={({ isActive }) =>
              `flex items-center p-3 rounded-lg transition duration-200 
               ${isActive 
                 ? 'bg-purple-100 text-purple-700 font-semibold' 
                 : 'text-gray-600 hover:bg-gray-100 hover:text-gray-800'
               }`
            }
          >
            <item.icon className="h-6 w-6 mr-3" aria-hidden="true" />
            {item.name}
          </NavLink>
        ))}
      </nav>

      {/* Cerrar Sesión (al final del Sidebar) */}
      <div className="p-4 border-t">
        <button
          onClick={logout}
          className="flex items-center p-3 w-full rounded-lg text-red-600 hover:bg-red-50 transition duration-200"
        >
          <ArrowLeftEndOnRectangleIcon className="h-6 w-6 mr-3" aria-hidden="true" />
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
}

export default Sidebar;