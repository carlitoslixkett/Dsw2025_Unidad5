import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Bars3Icon,
  XMarkIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";

function ClientHeader({ showMenu = false }) {
  const [openMenu, setOpenMenu] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  // Para que el input muestre lo que venga por ?search=
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setSearchTerm(params.get("search") || "");
  }, [location.search]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();

    const params = new URLSearchParams(location.search);

    if (searchTerm.trim()) {
      params.set("search", searchTerm.trim());
    } else {
      params.delete("search");
    }

    navigate({
      pathname: "/",
      search: params.toString(),
    });

    if (showMenu) {
      setOpenMenu(false);
    }
  };

  return (
    <header className="bg-transparent">
      <div className="mx-auto px-3 pt-3 pb-2">
        {/* Contenedor tipo tarjeta (como en la maqueta) */}
        <div className="bg-white rounded-2xl shadow-sm border border-purple-100 px-3 py-2 flex items-center gap-3">
          {/* Logo / texto */}
          <Link
            to="/"
            className="text-sm font-bold leading-tight text-purple-700"
          >
            E-
            <br />
            COMMERCE
          </Link>

          {/* Buscador */}
          <form onSubmit={handleSearchSubmit} className="flex-1 relative">
            <MagnifyingGlassIcon className="h-4 w-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar productos"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-xl border border-gray-200 bg-gray-50 pl-8 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-purple-400"
            />
          </form>

          {/* Botón hamburguesa SOLO si showMenu = true */}
          {showMenu && (
            <button
              type="button"
              className="p-2 rounded-md border border-gray-200 bg-white text-gray-700 flex items-center justify-center lg:hidden"
              onClick={() => setOpenMenu(!openMenu)}
            >
              {openMenu ? (
                <XMarkIcon className="h-5 w-5" />
              ) : (
                <Bars3Icon className="h-5 w-5" />
              )}
            </button>
          )}
        </div>
      </div>

      {/* Menú desplegable mobile (solo si showMenu y está abierto) */}
      {showMenu && openMenu && (
        <nav className="bg-white border-t border-gray-200 lg:hidden">
          <ul className="flex flex-col">
            <li>
              <Link
                to="/cart"
                className="block px-4 py-3 hover:bg-gray-100"
                onClick={() => setOpenMenu(false)}
              >
                Carrito
              </Link>
            </li>
            <li>
              <Link
                to="/orders"
                className="block px-4 py-3 hover:bg-gray-100"
                onClick={() => setOpenMenu(false)}
              >
                Mis pedidos
              </Link>
            </li>
            <li>
              <Link
                to="/profile"
                className="block px-4 py-3 hover:bg-gray-100"
                onClick={() => setOpenMenu(false)}
              >
                Perfil
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}

export default ClientHeader;

