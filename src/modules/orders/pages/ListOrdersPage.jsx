import { useEffect, useState, useMemo } from "react";
import Card from "../../shared/components/Card";
import { listOrders } from "../services/listServices";
import { useNavigate } from "react-router-dom"; 

// Traduce el código numérico de estado a texto
const getStatusText = (status) => {
  if (status === 0) return "Pendiente";
  if (status === 1) return "Procesando";
  if (status === 2) return "Enviado";
  if (status === 3) return "Entregado";
  if (status === 4) return "Cancelado";
  return status;
};

// Opciones para el combo de estado
const statusOptions = [
  { value: "", label: "Estado de Orden" },
  { value: "0", label: "Pendiente" },
  { value: "1", label: "Procesando" },
  { value: "2", label: "Enviado" },
  { value: "3", label: "Entregado" },
  { value: "4", label: "Cancelado" },
];

function ListOrdersPage() {
  // órdenes que vienen del backend
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // filtros
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  // paginación
  const [page, setPage] = useState(1);
  const pageSize = 5;

  // carga inicial de órdenes
  useEffect(() => {
    loadOrders();
  }, []);

  const navigate = useNavigate();


  const loadOrders = async () => {
    try {
      const { data, error } = await listOrders();

      if (error) {
        console.error("Error cargando órdenes:", error);
        return;
      }

      // Aceptamos array directo o data.items
      const rawOrders = Array.isArray(data)
        ? data
        : data && Array.isArray(data.items)
        ? data.items
        : [];

      setOrders(rawOrders);
    } catch (err) {
      console.error("Error inesperado cargando órdenes:", err);
    } finally {
      setLoading(false);
    }
  };

  // aplica búsqueda + filtro de estado
  const filteredOrders = useMemo(() => {
    let result = [...orders];

    if (search.trim() !== "") {
      const term = search.trim().toLowerCase();
      result = result.filter((o) => {
        const name = (o.customerName || "").toLowerCase();
        const id = (o.customerId || "").toLowerCase();
        return name.includes(term) || id.includes(term);
      });
    }

    if (statusFilter !== "") {
      const statusNum = Number(statusFilter);
      result = result.filter((o) => o.status === statusNum);
    }

    return result;
  }, [orders, search, statusFilter]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredOrders.length / pageSize)
  );

  // si cambia el filtro, vuelvo a la página 1
  useEffect(() => {
    setPage(1);
  }, [search, statusFilter]);

  const pagedOrders = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filteredOrders.slice(start, start + pageSize);
  }, [filteredOrders, page]);

  const handlePrev = () => {
    setPage((prev) => (prev > 1 ? prev - 1 : prev));
  };

  const handleNext = () => {
    setPage((prev) => (prev < totalPages ? prev + 1 : prev));
  };

  return (
    <Card>
      {/* Título + filtros como en el mockup */}
      <div className="flex flex-col gap-4">
        <h1 className="text-xl font-semibold">Órdenes</h1>

        <div className="flex flex-wrap gap-2 items-center">
          <input
            type="text"
            placeholder="Buscar"
            className="border rounded px-3 py-2 flex-1 min-w-[180px]"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <button
            type="button"
            className="px-4 py-2 rounded bg-purple-200 border border-purple-300"
          >
            🔍
          </button>

          <select
            className="border rounded px-3 py-2 min-w-[160px]"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            {statusOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Lista de tarjetas de órdenes */}
      <div className="mt-4 flex flex-col gap-3">
        {loading && <p>Cargando...</p>}

        {!loading && pagedOrders.length === 0 && (
          <p>No hay órdenes.</p>
        )}

        {!loading &&
          pagedOrders.map((order) => (
            <div
              key={order.id}
              className="flex items-center justify-between border rounded-lg px-4 py-3 bg-white shadow-sm"
            >
              <div>
                {/* id cortito + nombre de cliente
                    - Usa customerName que viene del back
                    - Si por alguna razón viene null, muestra el customerId como fallback
                */}
                <div className="font-semibold">
                  #{order.id.slice(0, 8)} –{" "}
                  {order.customerName || order.customerId}
                </div>

                <div className="text-sm text-gray-600">
                  {getStatusText(order.status)}
                </div>
              </div>

              <button
               type="button"
               className="px-4 py-2 rounded-lg bg-purple-200 border border-purple-300 text-sm font-medium"
               onClick={() => navigate(`/admin/orders/${order.id}`)}
              >
               Ver
               </button>

            </div>
          ))}
      </div>

      {/* Paginación */}
      {!loading && filteredOrders.length > 0 && (
        <div className="mt-4 flex items-center justify-center gap-4 text-sm">
          <button
            type="button"
            onClick={handlePrev}
            disabled={page === 1}
            className="disabled:text-gray-400"
          >
            ← Previous
          </button>

          <span>
            {page} / {totalPages}
          </span>

          <button
            type="button"
            onClick={handleNext}
            disabled={page === totalPages}
            className="disabled:text-gray-400"
          >
            Next →
          </button>
        </div>
      )}
    </Card>
  );
}

export default ListOrdersPage;


