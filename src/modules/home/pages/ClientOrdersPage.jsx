import { useEffect, useState } from "react";
import ClientHeader from "../../shared/components/ClientHeader";
import { instance } from "../../shared/api/axiosInstance";
import { useAuth } from "../../auth/context/AuthProvider";
import Card from "../../shared/components/Card";
import Button from "../../shared/components/Button";
import { useNavigate } from "react-router-dom";

function ClientOrdersPage() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return; // aún no cargó el usuario

    const fetchOrders = async () => {
      try {
        setLoading(true);

        const { data } = await instance.get("/api/orders");

        // 👇 FILTRAMOS POR NOMBRE DEL CLIENTE
        const myOrders = data.filter(
          (order) => order.customerName === user.username
        );

        setOrders(myOrders);
      } catch (err) {
        console.error(err);
        setError("No se pudieron cargar tus pedidos.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

  return (
    <div className="min-h-screen bg-gray-50">
      <ClientHeader />

      <main className="max-w-5xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-semibold mb-6">Mis pedidos</h1>

        {loading && <p>Cargando tus pedidos...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {!loading && !error && orders.length === 0 && (
          <p>No tenés pedidos todavía.</p>
        )}

        <div className="space-y-4">
          {orders.map((order) => (
            <Card key={order.id}>
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Pedido #{order.id}</p>
                  <p className="text-sm text-gray-500">
                    {/* 👇 usamos date en lugar de createdAt */}
                    Fecha: {new Date(order.date).toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-500">
                    Estado:{" "}
                    <span className="font-semibold">
                      {order.status === 1 ? "Pendiente" : order.status}
                    </span>
                  </p>
                  <p className="text-sm text-gray-500">
                    {/* si tenés totalAmount en el back, usalo; si no, calculamos */}
                    Total: $
                    {order.totalAmount ??
                      order.orderItems.reduce(
                        (acc, item) => acc + item.quantity * item.unitPrice,
                        0
                      )}
                  </p>
                </div>

                <Button onClick={() => navigate(`/orders/${order.id}`)}>
                 Ver detalle
                </Button>

              </div>

              {/* 👇 usamos orderItems en vez de items */}
              {order.orderItems && order.orderItems.length > 0 && (
                <ul className="mt-3 text-sm text-gray-700 list-disc list-inside">
                  {order.orderItems.map((item) => (
                    <li key={item.id}>
                      {item.productName} x{item.quantity} — ${item.unitPrice}
                    </li>
                  ))}
                </ul>
              )}
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}

export default ClientOrdersPage;

