import { useEffect, useState } from "react";
import ClientHeader from "../../shared/components/ClientHeader";

function CartPage() {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);

    const newTotal = savedCart.reduce(
      (acc, item) => acc + item.unitPrice * item.quantity,
      0
    );
    setTotal(newTotal);
  }, []);

  const increase = (id) => {
    const updated = cart.map((item) =>
      item.id === id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );

    updateCart(updated);
  };

  const decrease = (id) => {
    const updated = cart
      .map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity - 1) }
          : item
      )
      .filter((item) => item.quantity > 0);

    updateCart(updated);
  };

  const removeItem = (id) => {
    const updated = cart.filter((item) => item.id !== id);
    updateCart(updated);
  };

  const updateCart = (updated) => {
    localStorage.setItem("cart", JSON.stringify(updated));
    setCart(updated);

    const newTotal = updated.reduce(
      (acc, item) => acc + item.unitPrice * item.quantity,
      0
    );

    setTotal(newTotal);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <ClientHeader />

      <div className="max-w-4xl mx-auto p-4">
        <h1 className="text-2xl font-semibold mb-4">Carrito de compras</h1>

        {cart.length === 0 ? (
          <p>Tu carrito está vacío.</p>
        ) : (
          <>
            <div className="space-y-4">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="bg-white p-4 rounded-md shadow-sm border flex justify-between items-center"
                >
                  <div>
                    <h2 className="text-lg font-semibold">{item.name}</h2>
                    <p className="text-gray-500">$ {item.unitPrice}</p>
                  </div>

                  {/* Cantidades */}
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => decrease(item.id)}
                      className="px-3 py-1 border rounded-md"
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => increase(item.id)}
                      className="px-3 py-1 border rounded-md"
                    >
                      +
                    </button>
                  </div>

                  {/* Eliminar */}
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-red-500 hover:underline"
                  >
                    Eliminar
                  </button>
                </div>
              ))}
            </div>

            {/* TOTAL */}
            <div className="text-right mt-6">
              <h2 className="text-xl font-semibold">
                Total: $ {total.toFixed(2)}
              </h2>

              <button
                className="mt-3 bg-purple-600 text-white px-6 py-2 rounded-md hover:bg-purple-500"
              >
                Finalizar compra
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default CartPage;
