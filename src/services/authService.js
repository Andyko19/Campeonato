import api from "./api";

export const login = async (email, password) => {
  try {
    const res = await api.post("/auth/login", { email, password });
    return res.data;
  } catch (error) {
    throw error.response?.data?.mensaje || "Error de conexión";
  }
};
export const registrarUsuario = async (email, password, rol = "usuario") => {
  try {
    const res = await api.post("/auth/register", { email, password, rol });
    return res.data;
  } catch (error) {
    throw error.response?.data?.mensaje || "Error al registrar usuario";
  }
};
