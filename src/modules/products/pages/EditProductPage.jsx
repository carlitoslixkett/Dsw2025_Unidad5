// src/modules/products/pages/EditProductPage.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Card from "../../shared/components/Card";
import { getProductById, updateProduct, toggleProductStatus } from "../services/list";

function EditProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      sku: "",
      internalCode: "",
      name: "",
      description: "",
      currentUnitPrice: "",
      stockQuantity: "",
    },
  });

    const [product, setProduct] = useState(null);

  const handleToggleStatus = async () => {
    try {
      await toggleProductStatus(id);
      alert("Estado actualizado correctamente.");

      const { data } = await getProductById(id);
      setProduct(data);

      reset({
        sku: data.sku,
        internalCode: data.internalCode,
        name: data.name,
        description: data.description ?? "",
        currentUnitPrice: data.currentUnitPrice,
        stockQuantity: data.stockQuantity,
      });

    } catch (error) {
      console.error("Error al cambiar estado", error);
      alert("No se pudo cambiar el estado del producto.");
    }
  };

  // 1) Cargar datos del producto y rellenar el form
useEffect(() => {
  const load = async () => {
    try {
      const { data } = await getProductById(id);

      setProduct(data);   // 👈 IMPORTANTE

      reset({
        sku: data.sku,
        internalCode: data.internalCode,
        name: data.name,
        description: data.description ?? "",
        currentUnitPrice: data.currentUnitPrice,
        stockQuantity: data.stockQuantity,
      });
    } catch (err) {
      console.error("Error cargando producto para editar", err);
      alert("No se pudo cargar el producto.");
      navigate("/admin/products");
    }
  };

  load();
}, [id, reset, navigate]);


  // 2) Enviar cambios al backend
  const onSubmit = async (formData) => {
    try {
      await updateProduct(id, {
        sku: formData.sku,
        internalCode: formData.internalCode,
        name: formData.name,
        description: formData.description,
        currentUnitPrice: Number(formData.currentUnitPrice),
        stockQuantity: Number(formData.stockQuantity),
      });

      alert("Producto actualizado correctamente");
      navigate(`/admin/products/${id}`); // volver al detalle
    } catch (err) {
      console.error("Error actualizando producto", err);
      alert("Ocurrió un error al actualizar el producto");
    }
  };

  const handleCancel = () => {
    navigate(`/admin/products/${id}`);
  };

  return (
    <Card>
      <h1 className="text-xl font-semibold mb-4">Editar producto</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* SKU */}
        <div>
          <label className="block text-sm font-medium mb-1">SKU</label>
          <input
            type="text"
            className="w-full border rounded-lg px-3 py-2"
            {...register("sku", { required: "El SKU es obligatorio" })}
          />
          {errors.sku && (
            <p className="text-red-500 text-sm mt-1">
              {errors.sku.message}
            </p>
          )}
        </div>

        {/* Código interno */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Código interno
          </label>
          <input
            type="text"
            className="w-full border rounded-lg px-3 py-2"
            {...register("internalCode", {
              required: "El código interno es obligatorio",
            })}
          />
          {errors.internalCode && (
            <p className="text-red-500 text-sm mt-1">
              {errors.internalCode.message}
            </p>
          )}
        </div>

        {/* Nombre */}
        <div>
          <label className="block text-sm font-medium mb-1">Nombre</label>
          <input
            type="text"
            className="w-full border rounded-lg px-3 py-2"
            {...register("name", { required: "El nombre es obligatorio" })}
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">
              {errors.name.message}
            </p>
          )}
        </div>

        {/* Descripción */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Descripción
          </label>
          <textarea
            className="w-full border rounded-lg px-3 py-2"
            rows={3}
            {...register("description")}
          />
        </div>

        {/* Precio */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Precio actual
          </label>
          <input
            type="number"
            step="0.01"
            className="w-full border rounded-lg px-3 py-2"
            {...register("currentUnitPrice", {
              required: "El precio es obligatorio",
              min: { value: 0.01, message: "Debe ser mayor a 0" },
            })}
          />
          {errors.currentUnitPrice && (
            <p className="text-red-500 text-sm mt-1">
              {errors.currentUnitPrice.message}
            </p>
          )}
        </div>

        {/* Stock */}
        <div>
          <label className="block text-sm font-medium mb-1">Stock</label>
          <input
            type="number"
            className="w-full border rounded-lg px-3 py-2"
            {...register("stockQuantity", {
              required: "El stock es obligatorio",
              min: { value: 0, message: "No puede ser negativo" },
            })}
          />
          {errors.stockQuantity && (
            <p className="text-red-500 text-sm mt-1">
              {errors.stockQuantity.message}
            </p>
          )}
        </div>

{/* Botones */}
<div className="flex flex-col gap-4 mt-6">

  {/* Botón activar / desactivar */}
  <button
    type="button"
    className={`px-4 py-2 rounded-lg border ${
      product?.isActive
        ? "bg-red-500 text-white"
        : "bg-green-500 text-white"
    }`}
    onClick={handleToggleStatus}
  >
    {product?.isActive ? "Desactivar producto" : "Activar producto"}
  </button>

  <div className="flex gap-2 justify-end">
    <button
      type="button"
      className="px-4 py-2 rounded-lg border"
      onClick={handleCancel}
    >
      Cancelar
    </button>

    <button
      type="submit"
      disabled={isSubmitting}
      className="px-4 py-2 rounded-lg border bg-purple-500 text-white disabled:opacity-60"
    >
      {isSubmitting ? "Guardando..." : "Guardar cambios"}
    </button>
  </div>
</div>

      </form>
    </Card>
  );
}

export default EditProductPage;


