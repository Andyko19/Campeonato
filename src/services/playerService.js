import api from "./api";

export const registrarJugador = async (data) => {
  try {
    const response = await api.post("/jugadores", data);
    return response.data;
  } catch (error) {
    console.error("Error registrando jugador:", error);
    throw error;
  }
};
export const obtenerJugadores = async () => {
  try {
    const response = await api.get("/jugadores");
    return response.data;
  } catch (error) {
    console.error("Error obteniendo jugadores:", error);
    throw error;
  }
};
export const actualizarJugador = async (id, data) => {
  try {
    const res = await api.put(`/jugadores/${id}`, data);
    return res.data;
  } catch (error) {
    console.error("Error al actualizar jugadores:", error);
    throw error;
  }
};
export const eliminarJugador = async (id) => {
  try {
    const res = await api.delete(`/jugadores/${id}`);
    return res.data;
  } catch (error) {
    console.error("Error al eliminar jugadores:", error);
    throw error;
  }
};
export const registrarJugadoresMasivo = async (jugadores) => {
  const response = await api.post("/jugadores/masivo", jugadores);
  return response.data;
};
