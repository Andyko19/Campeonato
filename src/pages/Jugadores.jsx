import React, { useEffect, useState } from "react";
import {
  obtenerJugadores,
  registrarJugador,
  actualizarJugador,
  eliminarJugador,
} from "../services/playerService";
import { obtenerEquipos } from "../services/teamService";
import { getUsuarioDesdeToken } from "../utils/auth";

const Jugadores = () => {
  const [jugadores, setJugadores] = useState([]);
  const [equipos, setEquipos] = useState([]);
  const [editandoId, setEditandoId] = useState(null);
  const [formData, setFormData] = useState({
    nombre_jugador: "",
    deporte: "",
    genero: "",
    subnivel: "",
    equipo_id: "",
    habilitado: true,
    amonestado: false,
  });

  const usuario = getUsuarioDesdeToken();
  const puedeEditar = usuario?.rol === "admin" || usuario?.rol === "usuario";

  const fetchData = async () => {
    const jugadoresData = await obtenerJugadores();
    const equiposData = await obtenerEquipos();
    setJugadores(jugadoresData);
    setEquipos(equiposData);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    if (confirm("¿Eliminar este jugador?")) {
      await eliminarJugador(id);
      fetchData();
    }
  };

  const handleEdit = (jugador) => {
    setEditandoId(jugador.id);
    setFormData(jugador);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      ...formData,
      equipo_id: parseInt(formData.equipo_id),
    };

    if (editandoId) {
      await actualizarJugador(editandoId, data);
    } else {
      await registrarJugador(data);
    }

    setFormData({
      nombre_jugador: "",
      deporte: "",
      genero: "",
      subnivel: "",
      equipo_id: "",
      habilitado: true,
      amonestado: false,
    });
    setEditandoId(null);
    fetchData();
  };

  return (
    <div className="h-full bg-gradient-to-b from-white to-blue-50 flex items-center justify-center px-6 text-center">
      <div className="max-w-5xl mx-auto px-4 py-6">
        <h2 className="text-2xl font-bold mb-4 text-blue-700">
          👤 Jugadores registrados
        </h2>

        {/* Formulario para admin/usuario */}
        {puedeEditar && (
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6"
          >
            <input
              type="text"
              name="nombre_jugador"
              placeholder="Nombre del jugador"
              value={formData.nombre_jugador}
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
              name="equipo_id"
              value={formData.equipo_id}
              onChange={handleChange}
              required
              className="border rounded px-3 py-2"
            >
              <option value="">Equipo</option>
              {equipos.map((eq) => (
                <option key={eq.id} value={eq.id}>
                  {eq.nombre_equipo}
                </option>
              ))}
            </select>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="habilitado"
                checked={formData.habilitado}
                onChange={handleChange}
              />
              Habilitado
            </label>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="amonestado"
                checked={formData.amonestado}
                onChange={handleChange}
              />
              Amonestado
            </label>

            <button
              type="submit"
              className="md:col-span-2 lg:col-span-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              {editandoId ? "Actualizar" : "Registrar"}
            </button>
          </form>
        )}

        {/* Lista */}
        <ul className="space-y-2">
          {jugadores.map((j) => (
            <li
              key={j.id}
              className={`border px-4 py-2 rounded flex justify-between items-center ${
                !j.habilitado
                  ? "bg-red-100"
                  : j.amonestado
                  ? "bg-yellow-100"
                  : ""
              }`}
            >
              <span>
                {j.nombre_jugador} - {j.deporte} - {j.genero} - {j.subnivel} -{" "}
                {equipos.find((eq) => eq.id === j.equipo_id)?.nombre_equipo ||
                  `Equipo #${j.equipo_id}`}
              </span>
              {puedeEditar && (
                <span className="flex gap-2">
                  <button onClick={() => handleEdit(j)}>✏️</button>
                  <button onClick={() => handleDelete(j.id)}>🗑️</button>
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Jugadores;
