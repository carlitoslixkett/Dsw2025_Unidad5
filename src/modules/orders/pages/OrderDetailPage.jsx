import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; 
import Card from "../../shared/components/Card";
import { getOrderById } from "../services/listServices";
import { instance } from "../../shared/api/axiosInstance";


const getStatusText = (status) => {
  if (status === 0) return "Pendiente";
  if (status === 1) return "Procesando";
  if (status === 2) return "Enviado";
  if (status === 3) return "Entregado";
  if (status === 4) return "Cancelado";
  return status;
};

function OrderDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate(); 
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

const statusMap = {
  0: "Pendiente",
  1: "Procesando",
  2: "Enviado",
  3: "Entregado",
  4: "Cancelado",
};

const handleUpdateStatus = async () => {
  try {

    // Convertimos el número a string, porque el backend lo espera como STRING
    const payload = { newStatus: order.status.toString() };

    console.log("Payload enviado:", payload);

    await instance.put(`/api/orders/${order.id}/status`, payload);

    alert("Estado actualizado con éxito");

  } catch (err) {
    console.error("Error al actualizar estado:", err);
    alert("Error al actualizar estado");
  }
};





  useEffect(() => {
    loadOrder();
  }, []);

  const loadOrder = async () => {
    const { data, error } = await getOrderById(id);
    if (!error) setOrder(data);
    setLoading(false);
  };

  if (loading) return <Card>Cargando...</Card>;
  if (!order) return <Card>No se encontró la orden.</Card>;

  return (
    <Card>

         <div className="flex items-center justify-between mb-4">
    <h1 className="text-xl font-semibold">Detalle de Orden</h1>

    <button
      type="button"
      onClick={() => navigate(-1)}   // vuelve a la página anterior (lista de órdenes)
      className="px-3 py-1 rounded-lg border border-gray-300 text-sm"
    >
      ← Volver
    </button>
  </div>

      <h1 className="text-xl font-semibold mb-4"></h1>

      <div className="flex flex-col gap-2">
        <p><strong>ID:</strong> {order.id}</p>
        <p><strong>Cliente:</strong> {order.customerName}</p>
        <p><strong>Estado:</strong> {getStatusText(order.status)}</p>
        {/* --- CAMBIO DE ESTADO --- */}
<div className="mt-3 p-3 border rounded bg-gray-50">
  <label className="font-medium block mb-1">Cambiar estado:</label>

  <select
    className="border px-3 py-2 rounded w-full"
    value={order.status}
    onChange={(e) => setOrder({ ...order, status: Number(e.target.value) })}
  >
    <option value={0}>Pendiente</option>
    <option value={1}>Procesando</option>
    <option value={2}>Enviado</option>
    <option value={3}>Entregado</option>
    <option value={4}>Cancelado</option>
  </select>

  <button
    onClick={handleUpdateStatus}
    className="mt-3 w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700"
  >
    Guardar estado
  </button>
</div>

        <p><strong>Dirección Envío:</strong> {order.shippingAddress}</p>
        <p><strong>Dirección Facturación:</strong> {order.billingAddress}</p>
        <p><strong>Fecha:</strong> {new Date(order.date).toLocaleString()}</p>

        <h2 className="text-lg mt-4 font-semibold">Items</h2>

{order.orderItems && order.orderItems.length > 0 ? (
  <table className="mt-2 w-full text-sm border">
<thead className="bg-gray-100">
  <tr>
    <th className="border px-2 py-1 text-left">ProductoId</th>
    <th className="border px-2 py-1 text-left">Nombre Producto</th>
    <th className="border px-2 py-1 text-right">Cantidad</th>
    <th className="border px-2 py-1 text-right">Precio</th>
    <th className="border px-2 py-1 text-right">Subtotal</th>
  </tr>
</thead>
<tbody>
  {order.orderItems.map((item) => (
    <tr key={item.id}>
      <td className="border px-2 py-1">{item.productId}</td>
      <td className="border px-2 py-1">
        {item.productName || "—"}
      </td>
      <td className="border px-2 py-1 text-right">{item.quantity}</td>
      <td className="border px-2 py-1 text-right">
        ${item.unitPrice.toFixed ? item.unitPrice.toFixed(2) : item.unitPrice}
      </td>
      <td className="border px-2 py-1 text-right">
        {(item.quantity * item.unitPrice).toFixed
          ? (item.quantity * item.unitPrice).toFixed(2)
          : item.quantity * item.unitPrice}
      </td>
    </tr>
  ))}
</tbody>
  </table>
) : (
  <p>No hay items.</p>
)}
      </div>
    </Card>
  );
}

export default OrderDetailPage;
