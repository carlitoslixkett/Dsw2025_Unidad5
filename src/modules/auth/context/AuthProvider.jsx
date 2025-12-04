// src/modules/auth/context/AuthProvider.jsx
import { jwtDecode } from "jwt-decode";
import React, { createContext, useEffect, useState, useContext } from "react";
import { login as loginService } from "../services/login";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // 👉 Función reutilizable para armar userData desde un token
  const buildUserFromToken = (jwt) => {
    const decoded = jwtDecode(jwt);
    console.log("TOKEN DECODIFICADO =>", decoded);

    const possibleRole =
      decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] ||
      decoded["role"] ||
      decoded["Role"] ||
      decoded["roles"];

    const possibleUser =
      decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"] ||
      decoded["name"] ||
      decoded["sub"];

    const possibleEmail =
      decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"];

    const userId =
      decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"] ||
      decoded["nameid"] ||
      decoded["sub"];

    return {
      id: userId,
      username: possibleUser,
      role: possibleRole?.toLowerCase(),
      email: possibleEmail || "No disponible",
    };
  };

  // 🔄 Cargar sesión guardada SOLO si el token es válido
  useEffect(() => {
    const savedToken = localStorage.getItem("token");

    if (savedToken) {
      try {
        const decoded = jwtDecode(savedToken);
        const now = Date.now() / 1000;

        // Validar expiración del token
        if (decoded.exp && decoded.exp > now) {
          const userData = buildUserFromToken(savedToken);

          setToken(savedToken);
          setUser(userData);
          setIsAuthenticated(true);

          // opcional: actualizar "user" en localStorage con el nuevo formato
          localStorage.setItem("user", JSON.stringify(userData));
        } else {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
        }
      } catch (err) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }
    }

    setLoading(false);
  }, []);

  const signin = async (username, password) => {
    const { token, error } = await loginService(username, password);
    if (error) return { error };

    // 👇 usamos la misma función para construir el user
    const userData = buildUserFromToken(token);

    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userData));

    setToken(token);
    setUser(userData);
    setIsAuthenticated(true);

    return { error: null };
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{ user, token, isAuthenticated, loading, signin, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook
export function useAuth() {
  return useContext(AuthContext);
}
