import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { instance } from "../../shared/api/axiosInstance";
import { jwtDecode } from "jwt-decode";

export default function CheckoutPage() {
  const navigate = useNavigate();

  const [shippingAddress, setShippingAddress] = useState("");
  const [billingAddress, setBillingAddress] = useState("");
  const [cart, setCart] = useState([]);

  // Cargar carrito
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(stored);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (cart.length === 0) {
      alert("Tu carrito está vacío");
      return;
    }

    // OBTENER EL ID REAL DESDE EL TOKEN
    const token = localStorage.getItem("token");
    const decoded = jwtDecode(token);

    const customerId =
      decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];

    console.log("Customer ID usado:", customerId);

    // Preparar orderItems
    const orderItems = cart.map((item) => ({
      quantity: item.quantity,
      productId: item.id,
    }));

    const payload = {
      customerId,
      shippingAddress,
      billingAddress,
      orderItems,
    };

    console.log("Payload enviado:", payload);

    try {
      const response = await instance.post("/api/orders", payload);

      console.log("Orden creada:", response.data);

      localStorage.removeItem("cart");

      alert("¡Compra realizada con éxito!");
      navigate("/orders");

    } catch (error) {
      console.error("Error al crear la orden:", error);
      alert("Error al procesar la compra");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-start py-10">
      <div className="bg-white shadow-md p-6 rounded-lg w-full max-w-lg">
        <h1 className="text-2xl font-semibold mb-4">Datos de la Compra</h1>

        <form onSubmit={handleSubmit} className="space-y-4">

          <div>
            <label className="font-medium">Dirección de envío:</label>
            <input
              type="text"
              required
              className="w-full border px-3 py-2 rounded"
              value={shippingAddress}
              onChange={(e) => setShippingAddress(e.target.value)}
            />
          </div>

          <div>
            <label className="font-medium">Dirección de facturación:</label>
            <input
              type="text"
              required
              className="w-full border px-3 py-2 rounded"
              value={billingAddress}
              onChange={(e) => setBillingAddress(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700"
          >
            Confirmar compra
          </button>
        </form>
      </div>
    </div>
  );
}
