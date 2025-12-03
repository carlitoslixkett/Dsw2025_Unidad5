import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Card from "../../shared/components/Card";
import { getProductById } from "../services/list";

function ProductDetailPage() {
  // tomamos el :id de la URL
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await getProductById(id);
        setProduct(data);
      } catch (err) {
        console.error("Error cargando producto", err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [id]);

  if (loading) {
    return (
      <Card>
        <p>Cargando producto...</p>
      </Card>
    );
  }

  if (!product) {
    return (
      <Card>
        <p>No se encontró el producto.</p>
        <button
          type="button"
          className="mt-4 px-4 py-2 rounded-lg border"
          onClick={() => navigate(-1)}
        >
          ← Volver
        </button>
      </Card>
    );
  }

    const statusText = product.isActive ? "Activado" : "Desactivado";

  const handleBack = () => navigate(-1);
  const handleEdit = () => navigate(`/admin/products/${id}/edit`);

  return (
    <Card>
      <div className="flex justify-between items-start mb-4">
        <h1 className="text-xl font-semibold">
          {product.sku} - {product.name}
        </h1>

        <div className="flex gap-2">
          <button
            type="button"
            className="px-4 py-2 rounded-lg border"
            onClick={handleBack}
          >
            ← Volver
          </button>

          <button
            type="button"
            className="px-4 py-2 rounded-lg border bg-purple-500 text-white"
            onClick={handleEdit}
          >
            Editar producto
          </button>
        </div>
      </div>


      <p className="mb-2">
        <span className="font-semibold">Código interno:</span>{" "}
        {product.internalCode}
      </p>

      <p className="mb-2">
        <span className="font-semibold">Descripción:</span>{" "}
        {product.description || "Sin descripción"}
      </p>

      <p className="mb-2">
        <span className="font-semibold">Precio actual:</span>{" "}
        ${product.currentUnitPrice}
      </p>

      <p className="mb-2">
        <span className="font-semibold">Stock:</span>{" "}
        {product.stockQuantity}
      </p>

      <p className="mb-2">
        <span className="font-semibold">Estado:</span> {statusText}
      </p>
    </Card>
  );
}

export default ProductDetailPage;
