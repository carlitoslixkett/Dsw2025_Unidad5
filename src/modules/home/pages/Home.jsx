import { useEffect, useState } from "react";
import ClientHeader from "../../shared/components/ClientHeader";
import { instance } from "../../shared/api/axiosInstance";
import { useSearchParams, useNavigate } from "react-router-dom";

function Home() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(6);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get("search") || "";

  const navigate = useNavigate();

const goToDetail = (id) => {
  navigate(`/products/${id}`);
};

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await instance.get(
          `/api/products?pageNumber=${page}&pageSize=${pageSize}&search=${searchTerm}`
        );

        if (response.status === 204) {
          setProducts([]);
          setTotalPages(1);
        } else {
          setProducts(response.data.items);
          setTotalPages(response.data.totalPages);
        }
      } catch (err) {
        setError("No se pudieron cargar los productos.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [page, searchTerm]); // IMPORTANTE: actualizar en cada cambio de página

  // Carrito
  const addToCart = (product) => {
    // seguridad extra por si llega algo sin stock
    if (product.stockQuantity === 0) {
      return;
    }

    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existing = cart.find((item) => item.id === product.id);

    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        unitPrice: product.currentUnitPrice,
        quantity: 1,
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <ClientHeader />

      <div className="max-w-6xl mx-auto p-4">
        <h1 className="text-2xl font-semibold mb-4">Productos</h1>

        {loading && <p>Cargando productos...</p>}
        {!loading && error && <p className="text-red-600">{error}</p>}

        {/* No hay resultados PERO sí hay un término de búsqueda */}
        {!loading && !error && products.length === 0 && searchTerm && (
          <p className="text-red-600">
            No se encontraron productos que coincidan con:{" "}
            <strong>{searchTerm}</strong>
          </p>
        )}

        {/* No hay productos y NO se está buscando nada */}
        {!loading && !error && products.length === 0 && !searchTerm && (
          <p>No hay productos disponibles.</p>
        )}

        {/* GRID DE PRODUCTOS */}
        {!loading && !error && products.length > 0 && (
          <>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((p) => {
            const hasStock = (p.stockQuantity ?? 0) > 0;

            return (
              <div
                key={p.id}
                onClick={() => goToDetail(p.id)}
                className="bg-white shadow-sm p-4 rounded-lg border hover:shadow-md transition cursor-pointer"
              >
                <div className="h-32 bg-gray-200 rounded mb-3" />
                <h2 className="text-lg font-medium">{p.name}</h2>
                <p className="text-gray-600">$ {p.currentUnitPrice}</p>
                <p className="text-sm text-gray-500 mb-3">
                 {/* Stock: {p.stockQuantity}*/}
                </p>

                {hasStock ? (
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // 🛑 que no dispare el click de la card
                      addToCart(p);
                    }}
                    className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-500"
                  >
                    Agregar al carrito
                  </button>
                ) : (
                  <button
                    disabled
                    onClick={(e) => e.stopPropagation()}
                    className="w-full bg-gray-200 text-gray-500 py-2 rounded-md cursor-not-allowed"
                  >
                    Sin stock
                  </button>
                )}
              </div>
            );
          })}
        </div>


            {/*  PAGINACIÓN — FUERA DEL MAP */}
            <div className="flex items-center justify-center gap-4 mt-6">
              <button
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
                className={`px-4 py-2 rounded-md border ${
                  page === 1
                    ? "bg-gray-200"
                    : "bg-white hover:bg-gray-100"
                }`}
              >
                Anterior
              </button>

              <span className="text-gray-700">
                Página {page} de {totalPages}
              </span>

              <button
                disabled={page === totalPages}
                onClick={() => setPage(page + 1)}
                className={`px-4 py-2 rounded-md border ${
                  page === totalPages
                    ? "bg-gray-200"
                    : "bg-white hover:bg-gray-100"
                }`}
              >
                Siguiente
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Home;
