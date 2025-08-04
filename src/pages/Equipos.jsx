import React, { useEffect, useState } from "react";
import {
  obtenerEquipos,
  registrarEquipo,
  eliminarEquipo,
  actualizarEquipo,
} from "../services/teamService";
import { getUsuarioDesdeToken } from "../utils/auth";

const Equipos = () => {
  const [equipos, setEquipos] = useState([]);
  const [editandoId, setEditandoId] = useState(null);

  const [formData, setFormData] = useState({
    nombre_equipo: "", // ✅ corregido
    deporte: "",
    subnivel: "",
    genero: "",
  });

  const usuario = getUsuarioDesdeToken();

  const fetchEquipos = async () => {
    const data = await obtenerEquipos();
    setEquipos(data);
  };

  useEffect(() => {
    fetchEquipos();
  }, []);

  const handleDelete = async (id) => {
    if (confirm("¿Estás seguro de eliminar este equipo?")) {
      await eliminarEquipo(id);
      fetchEquipos();
    }
  };

  const handleEdit = (equipo) => {
    setEditandoId(equipo.id);
    setFormData(equipo); // ya contiene nombre_equipo, etc.
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editandoId) {
      await actualizarEquipo(editandoId, formData);
    } else {
      await registrarEquipo(formData);
    }

    setFormData({
      nombre_equipo: "", // ✅ también aquí
      deporte: "",
      subnivel: "",
      genero: "",
    });
    setEditandoId(null);
    fetchEquipos();
  };

  return (
    <div className="h-full bg-gradient-to-b from-white to-blue-50 flex items-center justify-center px-6">
      <div className="max-w-3xl w-full p-4">
        <h2 className="text-2xl font-bold text-blue-700 mb-4 text-center">
          📋 Equipos Registrados
        </h2>

        {usuario?.rol === "admin" && (
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 text-left"
          >
            <input
              type="text"
              name="nombre_equipo" // ✅ corregido
              placeholder="Nombre del equipo"
              value={formData.nombre_equipo}
              onChange={handleChange}
              required
              className="border rounded px-3 py-2"
            />

            <select
              name="deporte"
              value={formData.deporte}
              onChange={handleChange}
              required
              className="border rounded px-3 py-2"
            >
              <option value="">Deporte</option>
              <option value="futbol">Fútbol</option>
              <option value="baloncesto">Baloncesto</option>
            </select>

            <select
              name="subnivel"
              value={formData.subnivel}
              onChange={handleChange}
              required
              className="border rounded px-3 py-2"
            >
              <option value="">Subnivel</option>
              <option value="inicial">Inicial</option>
              <option value="preparatoria">Preparatoria</option>
              <option value="elemental">Elemental</option>
              <option value="media">Media</option>
              <option value="superior">Superior</option>
              <option value="bachillerato">Bachillerato</option>
            </select>

            <select
              name="genero"
              value={formData.genero}
              onChange={handleChange}
              required
              className="border rounded px-3 py-2"
            >
              <option value="">Género</option>
              <option value="masculino">Masculino</option>
              <option value="femenino">Femenino</option>
            </select>

            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 col-span-full"
            >
              {editandoId ? "Actualizar" : "Registrar"}
            </button>
          </form>
        )}

        {/* Lista de equipos */}
        <ul className="space-y-2 text-left">
          {equipos.map((equipo) => (
            <li
              key={equipo.id}
              className="flex justify-between items-center border-b py-2"
            >
              <span>
                {equipo.nombre_equipo} - {equipo.deporte} - {equipo.subnivel} -{" "}
                {equipo.genero}
              </span>

              {usuario?.rol === "admin" && (
                <div className="space-x-2">
                  <button
                    onClick={() => handleEdit(equipo)}
                    className="text-yellow-600 hover:underline"
                  >
                    ✏️
                  </button>
                  <button
                    onClick={() => handleDelete(equipo.id)}
                    className="text-red-600 hover:underline"
                  >
                    🗑️
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Equipos;
