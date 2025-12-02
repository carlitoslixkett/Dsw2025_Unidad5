import { instance } from '../../shared/api/axiosInstance';

// Servicio para /api/products/admin (paginado)
export const listProducts = async (
  search = null,
  status = null,
  pageNumber = 1,
  pageSize = 20
) => {
  const params = {};

  // solo mandamos filtros reales, no "null" como string
  if (search !== null && search !== undefined && search !== "") {
    params.search = search;
  }

  // en tu back el status esperado es "enabled" / "disabled"
  // nosotros mandaremos exactamente esos valores si hace falta
  if (status === "enabled" || status === "disabled") {
    params.status = status;
  }

  params.pageNumber = pageNumber;
  params.pageSize = pageSize;

  const queryString = new URLSearchParams(params).toString();
  const url = queryString
    ? `api/products/admin?${queryString}`
    : `api/products/admin`;

  const response = await instance.get(url);

  // response.data = { items: [...], total: n }
  return { data: response.data, error: null };
};

// Traer 1 producto por Id
export const getProductById = async (id) => {
  const response = await instance.get(`api/products/${id}`);
  // el back devuelve un único producto (ResponseProductModel)
  return { data: response.data, error: null };
};
