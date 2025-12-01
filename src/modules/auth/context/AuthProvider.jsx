// src/modules/auth/context/AuthProvider.jsx
import { jwtDecode } from "jwt-decode";

import React, { createContext, useEffect, useState } from "react";
import { login as loginService } from "../services/login";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // guarda {id, username, role}
  const [token, setToken] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // 🔄 RESTAURAR SESIÓN AL INICIAR
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");

    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
      setIsAuthenticated(true);
    }

    setLoading(false);
  }, []);

  const signin = async (username, password) => {

  const { token, error } = await loginService(username, password);

  if (error) return { error };

  // Decodificar token para obtener el rol y el usuario
const decoded = jwtDecode(token);

const role =
  decoded["role"] ||
  decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

const userName =
  decoded["sub"] ||
  decoded["name"] ||
  decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];

const userData = {
  username: userName,
  role: role?.toLowerCase(),  // 🔥 NORMALIZAMOS EL ROL SIEMPRE
};


  // Guardar token + usuario en localStorage
  localStorage.setItem("token", token);
  localStorage.setItem("user", JSON.stringify(userData));

  // Guardar en estado global
  setToken(token);
  setUser(userData);
  setIsAuthenticated(true);

console.log("🔹 Token recibido:", token);
console.log("🔹 Decoded:", decoded);
console.log("🔹 Rol procesado:", role?.toLowerCase());

  return { error: null };
};


  // 🔓 LOGOUT
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
