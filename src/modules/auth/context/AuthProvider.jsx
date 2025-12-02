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

  // Cargar sesión guardada
  // Cargar sesión guardada SOLO si el token es válido
useEffect(() => {
  const savedToken = localStorage.getItem("token");
  const savedUser = localStorage.getItem("user");

  if (savedToken && savedUser) {
    try {
      const decoded = jwtDecode(savedToken);
      const now = Date.now() / 1000;

      // Validar expiración del token
      if (decoded.exp && decoded.exp > now) {
        setToken(savedToken);
        setUser(JSON.parse(savedUser));
        setIsAuthenticated(true);
      } else {
        // Token expirado → limpiar todo
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }
    } catch (err) {
      // Token corrupto o inválido → limpiar
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
  }

  setLoading(false);
}, []);

  // LOGIN
 const signin = async (username, password) => {
  const { token, error } = await loginService(username, password);
  if (error) return { error };

  // 🔥 DECODIFICAR EL JWT
  const decoded = jwtDecode(token);

  console.log("DEBUG FULL TOKEN DECODED =>", decoded);

  // 🔥 CAPTURAR EL ROL DESDE EL CLAIM REAL
  const possibleRole =
    decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] ||
    decoded["role"] ||
    decoded["Role"] ||
    decoded["roles"];

  // 🔥 CAPTURAR EL USUARIO
  const possibleUser =
    decoded["sub"] ||
    decoded["name"] ||
    decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];

  const userData = {
    username: possibleUser,
    role: possibleRole?.toLowerCase(), // "Admin" -> "admin"
  };

  console.log("ROL DETECTADO:", possibleRole);
  console.log("ROL NORMALIZADO:", userData.role);

  // GUARDAR
  localStorage.setItem("token", token);
  localStorage.setItem("user", JSON.stringify(userData));

  setToken(token);
  setUser(userData);
  setIsAuthenticated(true);

  return { error: null };
};


  // LOGOUT
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated,
        loading,
        signin,
        logout,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
