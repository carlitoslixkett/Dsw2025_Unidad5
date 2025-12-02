import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ClientHeader from "../../shared/components/ClientHeader";
import { instance } from "../../shared/api/axiosInstance";
import Card from "../../shared/components/Card";
import Button from "../../shared/components/Button";

function ClientOrderDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const { data } = await instance.get(`/api/orders/${id}`);
        setOrder(data);
      } catch (err) {
        console.error(err);
        setError("No se pudo cargar el pedido.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  const handleBack = () => navigate("/orders");

  return (
    <div className="min-h-screen bg-gray-50">
      <ClientHeader />

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold">Detalle del pedido</h1>
          <Button onClick={handleBack}>Volver a mis pedidos</Button>
        </div>

        {loading && <p>Cargando pedido...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {!loading && !error && order && (
          <Card>
            <h2 className="text-lg font-semibold mb-2">
              Pedido #{order.id}
            </h2>

            <p className="text-sm text-gray-600">
              Fecha: {new Date(order.date).toLocaleString()}
            </p>
            <p className="text-sm text-gray-600">
              Estado:{" "}
              <span className="font-semibold">
                {order.status === 1 ? "Pendiente" : order.status}
              </span>
            </p>
            <p className="text-sm text-gray-600">
              Cliente: {order.customerName}
            </p>

            <div className="mt-4">
              <h3 className="font-medium mb-1">Dirección de envío</h3>
              <p className="text-sm text-gray-700">{order.shippingAddress}</p>
            </div>

            <div className="mt-4">
              <h3 className="font-medium mb-1">Dirección de facturación</h3>
              <p className="text-sm text-gray-700">{order.billingAddress}</p>
            </div>

            {order.notes && (
              <div className="mt-4">
                <h3 className="font-medium mb-1">Notas</h3>
                <p className="text-sm text-gray-700">{order.notes}</p>
              </div>
            )}

            <div className="mt-6">
              <h3 className="font-medium mb-2">Productos</h3>
              <ul className="space-y-1 text-sm text-gray-800">
                {order.orderItems?.map((item) => (
                  <li key={item.id} className="flex justify-between">
                    <span>
                      {item.productName} x{item.quantity}
                    </span>
                    <span>
                      ${item.unitPrice} c/u — $
                      {item.quantity * item.unitPrice}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 text-right font-semibold">
              Total: $
              {order.totalAmount ??
                order.orderItems.reduce(
                  (acc, item) => acc + item.quantity * item.unitPrice,
                  0
                )}
            </div>
          </Card>
        )}
      </main>
    </div>
  );
}

export default ClientOrderDetailPage;
