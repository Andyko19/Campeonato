import { jwtDecode } from "jwt-decode";

export const isAuthenticated = () => {
  return !!localStorage.getItem("token");
};

export const getUsuarioDesdeToken = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const usuario = jwtDecode(token);
    return usuario;
  } catch (error) {
    console.error("Token inválido:", error);
    return null;
  }
};
