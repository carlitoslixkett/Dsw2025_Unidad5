// src/modules/auth/hook/useAuth.js
import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";

export default function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth debe usarse dentro de AuthProvider");
  }

  return context;
}
