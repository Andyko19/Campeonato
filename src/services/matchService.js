import api from "./api";

export const obtenerTablaPosiciones = async (filtros = {}) => {
  // Limpiar filtros vacíos
  const filtrosLimpios = Object.fromEntries(
    Object.entries(filtros).filter(([_, v]) => v !== "")
  );

  const query = new URLSearchParams(filtrosLimpios).toString();

  try {
    const response = await api.get(`/partidos/tabla?${query}`);
    return response.data;
  } catch (error) {
    console.error("Error obteniendo tabla de posiciones:", error);
    throw error;
  }
};

export const registrarPartido = async (data) => {
  try {
    const response = await api.post("/partidos", data);
    return response.data;
  } catch (error) {
    console.error("Error registrando partido:", error);
    throw error;
  }
};

export const obtenerPartidos = async () => {
  try {
    const response = await api.get("/partidos");
    return response.data;
  } catch (error) {
    console.error("Error obteniendo los partidos:", error);
    throw error;
  }
};

export const actualizarPartido = async (id, data) => {
  try {
    const res = await api.put(`/partidos/${id}`, data);
    return res.data;
  } catch (error) {
    console.error("Error al actualizar el partido:", error);
    throw error;
  }
};

export const eliminarPartido = async (id) => {
  try {
    const res = await api.delete(`/partidos/${id}`);
    return res.data;
  } catch (error) {
    console.error("Error al eliminar el partido:", error);
    throw error;
  }
};
