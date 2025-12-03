import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/context/AuthProvider";
import { FaUserCircle } from "react-icons/fa";
import { IoChevronDownSharp } from "react-icons/io5";
import { useState } from "react";

function ClientHeader() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [openMenu, setOpenMenu] = useState(false);

  const handleLogout = () => {
  logout();
 };


  return (
    <header className="w-full bg-white shadow-sm py-3 mb-4">
      <div className="max-w-6xl mx-auto flex justify-between items-center px-4">

        {/* Logo */}
        <Link to="/" className="text-xl font-semibold text-purple-600">
          E-COMMERCE
        </Link>

        {/* Search bar */}
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Buscar productos..."
            className="border px-3 py-2 rounded-md w-60"
          />
          <button className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700">
            Buscar
          </button>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-6 relative">

          {/* Cart */}
          <Link to="/cart" className="text-gray-700 hover:text-purple-600">
            🛒 Carrito
          </Link>

          {/* If user NOT logged in */}
          {!user ? (
            <button
              onClick={() => navigate("/login")}
              className="text-gray-700 hover:text-purple-600"
            >
              Iniciar Sesión
            </button>
          ) : (
            <div className="relative">
              {/* Trigger */}
              <button
                onClick={() => setOpenMenu(!openMenu)}
                className="flex items-center gap-1 text-gray-700 hover:text-purple-600"
              >
                <FaUserCircle size={22} />
                <span>{user.username}</span>
                <IoChevronDownSharp />
              </button>

              {/* Dropdown menu */}
              {openMenu && (
                <div className="absolute right-0 mt-2 bg-white shadow-lg border rounded-md w-40 py-2 animate-fade">
                  


                  <button
                    onClick={() => {
                      setOpenMenu(false);
                      navigate("/orders");
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    Mis Pedidos
                  </button>

                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100"
                  >
                    Cerrar sesión
                  </button>
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </header>
  );
}

export default ClientHeader;
