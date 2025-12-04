import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../auth/context/AuthProvider";
import { FaUserCircle, FaBars } from "react-icons/fa";
import { IoChevronDownSharp } from "react-icons/io5";
import { useState, useEffect } from "react";

function ClientHeader() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [openUserMenu, setOpenUserMenu] = useState(false);      // dropdown usuario (desktop)
  const [openMobileMenu, setOpenMobileMenu] = useState(false);  // menú hamburguesa (mobile)
  const [searchTerm, setSearchTerm] = useState("");             // texto del buscador

  // Sincronizar el input con lo que haya en ?search= de la URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setSearchTerm(params.get("search") || "");
  }, [location.search]);

  const handleLogout = () => {
    logout();
    setOpenUserMenu(false);
    setOpenMobileMenu(false);
    navigate("/");
  };

  // 🔍 se ejecuta en cada cambio de texto
  const handleChangeSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    const params = new URLSearchParams(location.search);

    if (value.trim()) {
      params.set("search", value.trim());
    } else {
      params.delete("search");
    }

    navigate({
      pathname: "/",           // siempre buscamos en el Home
      search: params.toString()
    });
  };

  return (
    <header className="w-full bg-white shadow-sm py-3 mb-4">
      <div className="max-w-6xl mx-auto px-4">
        {/* FILA SUPERIOR: logo + menú derecha / hamburguesa */}
        <div className="flex items-center justify-between gap-3">
          {/* Logo */}
          <Link
            to="/"
            className="text-xl font-semibold text-purple-600 whitespace-nowrap"
          >
            E-COMMERCE
          </Link>

          {/* MENÚ DERECHA (solo DESKTOP / TABLET) */}
          <div className="hidden md:flex items-center gap-6 relative">
            {/* Carrito */}
            <Link
              to="/cart"
              className="text-gray-700 hover:text-purple-600"
            >
              🛒 Carrito
            </Link>

            {/* Si NO está logueado */}
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
                  onClick={() => setOpenUserMenu(!openUserMenu)}
                  className="flex items-center gap-1 text-gray-700 hover:text-purple-600"
                >
                  <FaUserCircle size={22} />
                  <span>{user.username}</span>
                  <IoChevronDownSharp />
                </button>

                {/* Dropdown usuario (desktop) */}
              {openUserMenu && (
                <div className="absolute right-0 mt-2 bg-white shadow-lg border rounded-md w-40 py-2 z-20">
                  <button
                    onClick={() => {
                      setOpenUserMenu(false);
                      navigate("/profile");
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    Mi Cuenta
                  </button>

                  <button
                    onClick={() => {
                      setOpenUserMenu(false);
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

          {/* BOTÓN HAMBURGUESA (solo MOBILE) */}
          <button
            type="button"
            className="md:hidden p-2 rounded-md border border-gray-200 text-gray-700"
            onClick={() => setOpenMobileMenu(!openMobileMenu)}
          >
            <FaBars size={18} />
          </button>
        </div>

        {/* BARRA DE BÚSQUEDA (debajo, ocupa todo el ancho en mobile) */}
        <div className="mt-3">
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Buscar productos..."
              className="border px-3 py-2 rounded-md w-full md:w-60"
              value={searchTerm}
              onChange={handleChangeSearch}   
            />

          </div>
        </div>
      </div>

      {/* MENÚ MOBILE DESPLEGABLE (debajo del header) */}
      {openMobileMenu && (
        <nav className="md:hidden border-t mt-2 bg-white">
          <ul className="flex flex-col">
            <li>
              <Link
                to="/cart"
                className="block px-4 py-3 hover:bg-gray-100"
                onClick={() => setOpenMobileMenu(false)}
              >
                🛒 Carrito
              </Link>
            </li>

            {!user ? (
              <li>
                <button
                  onClick={() => {
                    setOpenMobileMenu(false);
                    navigate("/login");
                  }}
                  className="w-full text-left px-4 py-3 hover:bg-gray-100"
                >
                  Iniciar Sesión
                </button>
              </li>
            ) : (
              <>
                <li>
                  <button
                    onClick={() => {
                      setOpenMobileMenu(false);
                      navigate("/orders");
                    }}
                    className="w-full text-left px-4 py-3 hover:bg-gray-100"
                  >
                    Mis Pedidos
                  </button>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-3 text-red-500 hover:bg-gray-100"
                  >
                    Cerrar sesión
                  </button>
                </li>
              </>
            )}
          </ul>
        </nav>
      )}
    </header>
  );
}

export default ClientHeader;

