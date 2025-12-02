import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function ClientHeader() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/?search=${searchTerm}`);
  };

  return (
    <header className="bg-white shadow-sm py-3 mb-6">
      <div className="max-w-6xl mx-auto flex justify-between items-center px-4">
        <Link to="/" className="text-xl font-bold text-purple-600">
          E-COMMERCE
        </Link>

        {/* BUSCADOR */}
        <form onSubmit={handleSearch} className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Buscar productos..."
            className="px-3 py-2 border rounded-md w-64"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <button
            type="submit"
            className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-500"
          >
            Buscar
          </button>
        </form>

        {/* LINKS DERECHA */}
        <div className="flex items-center gap-6 text-gray-700">
          <Link to="/cart" className="flex items-center gap-1 hover:text-purple-600">
            🛒 <span>Carrito</span>
          </Link>

          <Link to="/login" className="hover:text-purple-600">
            Iniciar Sesión
          </Link>
        </div>
      </div>
    </header>
  );
}

export default ClientHeader;

