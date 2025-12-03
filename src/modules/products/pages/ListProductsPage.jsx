import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../../shared/components/Card";
import { listProducts } from "../services/list"; 


// Opciones para el combo "Estado de producto"
const statusOptions = [
  { value: "all", label: "Todos" },
  { value: "active", label: "Activados" },
  { value: "inactive", label: "Desactivados" },
];

function ListProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const navigate = useNavigate();

  // ================== Cargar productos del backend ==================
useEffect(() => {
  const load = async () => {
    try {
      const { data } = await listProducts();

      console.log("RESPUESTA /api/products/admin:", data);

      let items = [];

      if (Array.isArray(data)) {
        // Caso más simple: la API devuelve un array directamente
        items = data;
      } else if (data && typeof data === "object") {
        // 1) Intentamos con nombres típicos
        if (Array.isArray(data.items)) {
          items = data.items;
        } else if (Array.isArray(data.Items)) {
          items = data.Items;
        } else if (Array.isArray(data.products)) {
          items = data.products;
        } else if (Array.isArray(data.data)) {
          items = data.data;
        } else {
          // 2) Si nada de eso existe, buscamos la primera propiedad que sea un array
          const firstArrayProp = Object.values(data).find((v) =>
            Array.isArray(v)
          );

          if (firstArrayProp) {
            items = firstArrayProp;
          }
        }
      }

      console.log("PRODUCTOS DETECTADOS:", items);

      setProducts(items || []);
    } catch (err) {
      console.error("Error cargando productos", err);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  load();
}, []);


  // ================== Filtro por texto + estado ==================
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Buscar por texto (SKU / código / nombre)
    if (search.trim() !== "") {
      const term = search.trim().toLowerCase();

      result = result.filter((p) => {
        // 👇 AJUSTÁ ESTOS CAMPOS A LOS NOMBRES REALES DE TU API
        const sku = (p.sku || p.code || "").toString().toLowerCase();
        const name = (p.name || p.productName || "").toLowerCase();
        return sku.includes(term) || name.includes(term);
      });
    }

    // Filtro por estado (activo / desactivado)
    if (statusFilter === "active") {
      result = result.filter((p) => p.isActive === true);
    } else if (statusFilter === "inactive") {
      result = result.filter((p) => p.isActive === false);
    }

    return result;
  }, [products, search, statusFilter]);

  // ================== Paginación ==================
  const totalPages = Math.max(
    1,
    Math.ceil(filteredProducts.length / pageSize)
  );

  // si cambia búsqueda, estado o páginaSize, volvemos a la página 1
  useEffect(() => {
    setPage(1);
  }, [search, statusFilter, pageSize]);

  const pagedProducts = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filteredProducts.slice(start, start + pageSize);
  }, [filteredProducts, page, pageSize]);

  const handlePrev = () => {
    setPage((prev) => (prev > 1 ? prev - 1 : prev));
  };

  const handleNext = () => {
    setPage((prev) => (prev < totalPages ? prev + 1 : prev));
  };

  // ================== Render ==================
  return (
    <Card>
      {/* Header: título + buscador + filtros + botón Crear */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Productos</h1>

          <button
            type="button"
            className="px-4 py-2 rounded-lg bg-purple-200 border border-purple-300 text-sm font-medium"
            onClick={() => navigate("/admin/products/create")}
          >
            Crear Producto
          </button>
        </div>

        <div className="flex flex-wrap gap-2 items-center">
          {/* input Buscar */}
          <input
            type="text"
            placeholder="Buscar"
            className="border rounded px-3 py-2 flex-1 min-w-[180px]"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />



          {/* combo Estado de producto */}
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

      {/* Lista de tarjetas */}
      <div className="mt-4 flex flex-col gap-3">
        {loading && <p>Cargando...</p>}

        {!loading && pagedProducts.length === 0 && (
          <p>No hay productos.</p>
        )}

        {!loading &&
          pagedProducts.map((product) => {
            // 👇 AJUSTÁ ESTOS CAMPOS A LOS NOMBRES REALES DE TU MODELO
            const sku = product.sku || product.code || product.id;
            const name = product.name || product.productName || "";
            const stock = product.stockQuantity ?? product.stock ?? 0;
            const price = product.currentUnitPrice ?? product.price ?? 0;
            const isActive = product.isActive ?? product.active ?? false;

            return (
              <div
                key={product.id}
                className="flex items-center justify-between border rounded-lg px-4 py-3 bg-white shadow-sm"
              >
                <div>
                  {/* primera línea: SKU - Nombre */}
                  <div className="font-semibold">
                    {sku} - {name}
                  </div>

                  {/* segunda línea: Stock - Estado */}
                  <div className="text-sm text-gray-600">
                    Stock: {stock} -{" "}
                    {isActive ? "Activado" : "Desactivado"} - ${price}
                  </div>
                </div>

                {/* botón Ver (por ahora solo loguea, luego podés navegar a detalle) */}
              <button
               type="button"
               className="px-4 py-2 rounded-lg bg-purple-200 border border-purple-300 text-sm font-medium"
              onClick={() => {
              navigate(`/admin/products/${product.id}`);
              }}
              >
              Ver
              </button>
              </div>
            );
          })}
      </div>

      {/* Paginación abajo, como en el mockup */}
      {!loading && filteredProducts.length > 0 && (
        <div className="mt-4 flex items-center justify-center gap-4 text-sm">
          <button
            type="button"
            onClick={handlePrev}
            disabled={page === 1}
            className="disabled:text-gray-400"
          >
            Atras
          </button>

          <span>
            {page} / {totalPages} Siguiente
          </span>

          <select
            className="border rounded px-2 py-1"
            value={pageSize}
            onChange={(e) => setPageSize(Number(e.target.value))}
          >
            {[5, 10, 20].map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </div>
      )}
    </Card>
  );
}

export default ListProductsPage;

