import api from "./api";

export const registrarEquipo = async (data) => {
  try {
    const response = await api.post("/equipos", data);
    return response.data;
  } catch (error) {
    console.error("Error registrando equipo:", error);
    throw error;
  }
};
export const obtenerEquipos = async () => {
  try {
    const response = await api.get("/equipos");
    return response.data;
  } catch (error) {
    console.error("Error al obtener equipos:", error);
    throw error;
  }
};
export const actualizarEquipo = async (id, data) => {
  try {
    const res = await api.put(`/equipos/${id}`, data);
    return res.data;
  } catch (error) {
    console.error("Error al actualizar equipos:", error);
    throw error;
  }
};
export const eliminarEquipo = async (id) => {
  try {
    const res = await api.delete(`/equipos/${id}`);
    return res.data;
  } catch (error) {
    console.error("Error al eliminar equipo:", error);
    throw error;
  }
};
