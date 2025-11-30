// src/modules/auth/context/AuthProvider.jsx
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

  // 🔐 LOGIN
  const signin = async (username, password) => {
    const { token, user, error } = await loginService(username, password);

    if (error) return { error };

    // Guardar token + usuario
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));

    setToken(token);
    setUser(user);
    setIsAuthenticated(true);

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
