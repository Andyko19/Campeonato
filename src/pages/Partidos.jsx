import React, { useEffect, useState } from "react";
import {
  registrarPartido,
  obtenerPartidos,
  actualizarPartido,
  eliminarPartido,
} from "../services/matchService";
import { obtenerEquipos } from "../services/teamService";

const Partidos = () => {
  const [partidos, setPartidos] = useState([]);
  const [equipos, setEquipos] = useState([]);
  const [editandoId, setEditandoId] = useState(null);

  const [formData, setFormData] = useState({
    equipo_local_id: "",
    equipo_visitante_id: "",
    goles_local: "",
    goles_visitante: "",
    fecha: "",
  });

  const fetchData = async () => {
    const partidosData = await obtenerPartidos();
    const equiposData = await obtenerEquipos();
    setPartidos(partidosData);
    setEquipos(equiposData);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    if (confirm("¿Eliminar este partido?")) {
      await eliminarPartido(id);
      fetchData();
    }
  };

  const handleEdit = (partido) => {
    setEditandoId(partido.id);
    setFormData({
      equipo_local_id: partido.equipo_local_id,
      equipo_visitante_id: partido.equipo_visitante_id,
      goles_local: partido.goles_local,
      goles_visitante: partido.goles_visitante,
      fecha: partido.fecha,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      equipo_local_id: parseInt(formData.equipo_local_id),
      equipo_visitante_id: parseInt(formData.equipo_visitante_id),
      goles_local: parseInt(formData.goles_local),
      goles_visitante: parseInt(formData.goles_visitante),
      fecha: formData.fecha || new Date().toISOString().split("T")[0],
    };

    if (editandoId) {
      await actualizarPartido(editandoId, data);
    } else {
      await registrarPartido(data);
    }

    setEditandoId(null);
    setFormData({
      equipo_local_id: "",
      equipo_visitante_id: "",
      goles_local: "",
      goles_visitante: "",
      fecha: "",
    });
    fetchData();
  };

  const nombreEquipo = (id) => {
    const eq = equipos.find((e) => e.id === id);
    return eq ? eq.nombre_equipo : `#${id}`;
  };

  return (
    <div className="h-full bg-gradient-to-b from-white to-blue-50 flex items-center justify-center px-6 text-center">
      <div className="max-w-4xl mx-auto px-4 py-6">
        <h2 className="text-3xl font-bold text-blue-700 text-center mb-6">
          ⚽ Registro de Partidos
        </h2>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6"
        >
          <select
            name="equipo_local_id"
            value={formData.equipo_local_id}
            onChange={handleChange}
            required
            className="border rounded px-3 py-2"
          >
            <option value="">Equipo Local</option>
            {equipos.map((e) => (
              <option key={e.id} value={e.id}>
                {e.nombre_equipo}
              </option>
            ))}
          </select>

          <input
            type="number"
            name="goles_local"
            placeholder="Goles Local"
            value={formData.goles_local}
            onChange={handleChange}
            required
            className="border rounded px-3 py-2"
          />

          <select
            name="equipo_visitante_id"
            value={formData.equipo_visitante_id}
            onChange={handleChange}
            required
            className="border rounded px-3 py-2"
          >
            <option value="">Equipo Visitante</option>
            {equipos.map((e) => (
              <option key={e.id} value={e.id}>
                {e.nombre_equipo}
              </option>
            ))}
          </select>

          <input
            type="number"
            name="goles_visitante"
            placeholder="Goles Visitante"
            value={formData.goles_visitante}
            onChange={handleChange}
            required
            className="border rounded px-3 py-2"
          />

          <input
            type="date"
            name="fecha"
            value={formData.fecha}
            onChange={handleChange}
            required
            className="border rounded px-3 py-2"
          />

          <button
            type="submit"
            className="md:col-span-2 lg:col-span-3 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            {editandoId ? "Actualizar" : "Registrar"}
          </button>
        </form>

        <div className="mt-6 space-y-3">
          {partidos.map((p) => (
            <div
              key={p.id}
              className="bg-white shadow-md border rounded p-4 flex justify-between items-center"
            >
              <span className="text-gray-700 text-sm">
                <strong>{nombreEquipo(p.equipo_local_id)}</strong>{" "}
                {p.goles_local} - {p.goles_visitante}{" "}
                <strong>{nombreEquipo(p.equipo_visitante_id)}</strong> |{" "}
                {new Date(p.fecha).toLocaleDateString()}
              </span>
              <div className="space-x-2">
                <button
                  onClick={() => handleEdit(p)}
                  className="text-blue-600 hover:underline text-sm"
                >
                  ✏️ Editar
                </button>
                <button
                  onClick={() => handleDelete(p.id)}
                  className="text-red-600 hover:underline text-sm"
                >
                  🗑️ Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Partidos;
