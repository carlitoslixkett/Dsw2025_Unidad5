import axios from "axios";

export const instance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: false,
});

// Interceptor para agregar token
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (!config.headers) {
      config.headers = {};
    }

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);
