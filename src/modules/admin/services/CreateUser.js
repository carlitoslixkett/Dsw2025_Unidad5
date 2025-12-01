import { instance } from "../../shared/api/axiosInstance";

export const createUser = async (data) => {
  try {
    // ADMIN → usar endpoint correcto
    if (data.role === "Admin") {
      const response = await instance.post("/api/Auth/register-admin", {
        username: data.username,
        email: data.email,
        password: data.password
      });

      return { ok: true, data: response.data };
    }

    // CLIENTE → usar endpoint correcto
    const response = await instance.post("/api/Auth/register", {
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
