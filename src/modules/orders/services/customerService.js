export const fetchCustomersByIds = async (ids) => {
  if (!ids || ids.length === 0) return [];

  const queryString = ids.map(id => `ids=${id}`).join("&");

  const response = await fetch(`/api/customers/byids?${queryString}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("token")}`,
    },
  });

  if (!response.ok) {
    return []; // si el endpoint todavía no existe, no se rompe el front
  }

  const data = await response.json();
  return data; // debería ser un array de { id, name } o { id, userName }
};
