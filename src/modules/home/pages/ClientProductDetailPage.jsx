import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ClientHeader from "../../shared/components/ClientHeader";
import { instance } from "../../shared/api/axiosInstance";

function ClientProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError("");
        const { data } = await instance.get(`/api/products/${id}`);
        setProduct(data);
      } catch (err) {
        console.error(err);
        setError("No se pudo cargar el producto.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const addToCart = () => {
    if (!product || product.stockQuantity <= 0) return;

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
    alert("Producto agregado al carrito.");
  };

  const handleBack = () => {
    // si querés que SIEMPRE vuelva al home, cambiá por: navigate("/");
    navigate(-1);
  };

  const hasStock = product?.stockQuantity > 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <ClientHeader />

      <div className="max-w-3xl mx-auto p-4">
        {loading && <p>Cargando producto...</p>}
        {!loading && error && <p className="text-red-600">{error}</p>}

        {!loading && !error && product && (
          <div className="bg-white rounded-lg shadow p-6 border">
            <div className="flex justify-between items-start mb-4">
              <h1 className="text-2xl font-semibold">
                {product.name}
              </h1>

              <button
                type="button"
                className="px-4 py-2 rounded-lg border hover:bg-gray-100"
                onClick={handleBack}
              >
                ← Volver
              </button>
            </div>

            {/* Imagen dummy */}
            <div className="w-full h-48 bg-gray-200 rounded mb-4" />

            <p className="text-xl font-bold mb-2">
              ${product.currentUnitPrice}
            </p>

            <p className="mb-2 text-gray-700">
              <span className="font-semibold">Descripción: </span>
              {product.description || "Sin descripción."}
            </p>

           {/* <p className="mb-4 text-gray-700">
              <span className="font-semibold">Stock: </span>
              {product.stockQuantity} 
            </p> */}
            <p className="mb-4 text-gray-700">
              <span className="font-semibold">Stock: </span>
              {product.stockQuantity} 
            </p>

            <button
              type="button"
              disabled={!hasStock}
              onClick={addToCart}
              className={`w-full py-2 rounded-md text-white font-medium ${
                hasStock
                  ? "bg-purple-600 hover:bg-purple-700"
                  : "bg-gray-300 cursor-not-allowed text-gray-600"
              }`}
            >
              {hasStock ? "Agregar al carrito" : "Sin stock"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ClientProductDetailPage;
