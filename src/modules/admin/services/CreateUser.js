// src/modules/admin/services/createUser.js
import { instance } from "../../shared/api/axiosInstance";

export const createUser = async (data) => {
  try {
    // Si elige Admin → usamos register-admin
    if (data.role === "Admin") {
      const response = await instance.post("/auth/register-admin", {
        username: data.username,
        email: data.email,
        password: data.password
      });

      return { ok: true, data: response.data };
    }

    // Si elige Cliente → usamos register
    const response = await instance.post("/auth/register", {
      username: data.username,
      email: data.email,
      phoneNumber: data.phoneNumber,
      password: data.password
    });

    return { ok: true, data: response.data };
  } catch (error) {
    return {
      ok: false,
      error: error.response?.data || "Error desconocido"
    };
  }
};
