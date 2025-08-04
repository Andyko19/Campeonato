import React, { useEffect, useState } from "react";
import { obtenerEquipos } from "../services/teamService";
import { obtenerJugadores } from "../services/playerService";

const PlayersByTeam = () => {
  const [equipos, setEquipos] = useState([]);
  const [jugadores, setJugadores] = useState([]);
  const [equipoSeleccionado, setEquipoSeleccionado] = useState("");
  const [deporte, setDeporte] = useState("");
  const [genero, setGenero] = useState("");
  const [subnivel, setSubnivel] = useState("");
  const [busqueda, setBusqueda] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const equiposData = await obtenerEquipos();
        setEquipos(equiposData);
        const jugadoresData = await obtenerJugadores();
        setJugadores(jugadoresData);
      } catch (error) {
        console.error("Error cargando datos:", error);
      }
    };
    fetchData();
  }, []);

  const limpiarFiltros = () => {
    setEquipoSeleccionado("");
    setDeporte("");
    setGenero("");
    setSubnivel("");
    setBusqueda("");
  };

  const obtenerNombreEquipo = (id) => {
    const equipo = equipos.find((e) => e.id === id);
    return equipo ? equipo.nombre_equipo : `#${id}`;
  };

  const jugadoresFiltrados = jugadores.filter((j) => {
    const matchEquipo = equipoSeleccionado
      ? j.equipo_id === parseInt(equipoSeleccionado)
      : true;
    const matchDeporte = deporte ? j.deporte === deporte : true;
    const matchGenero = genero ? j.genero === genero : true;
    const matchSubnivel = subnivel ? j.subnivel === subnivel : true;
    const matchBusqueda = busqueda
      ? j.nombre_jugador.toLowerCase().includes(busqueda.toLowerCase())
      : true;

    return (
      matchEquipo &&
      matchDeporte &&
      matchGenero &&
      matchSubnivel &&
      matchBusqueda
    );
  });

  return (
    <div className="h-full bg-gradient-to-b from-white to-blue-50 flex items-center justify-center px-6 text-center">
      <div className="max-w-6xl mx-auto px-4 py-6">
        <h2 className="text-3xl font-bold text-blue-700 text-center mb-6">
          👥 Jugadores por equipo
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
          <select
            value={equipoSeleccionado}
            onChange={(e) => setEquipoSeleccionado(e.target.value)}
            className="border rounded px-3 py-2"
          >
            <option value="">-- Todos los equipos --</option>
            {equipos.map((equipo) => (
              <option key={equipo.id} value={equipo.id}>
                {equipo.nombre_equipo}
              </option>
            ))}
          </select>

          <select
            value={deporte}
            onChange={(e) => setDeporte(e.target.value)}
            className="border rounded px-3 py-2"
          >
            <option value="">-- Todos los deportes --</option>
            <option value="futbol">Fútbol</option>
            <option value="baloncesto">Baloncesto</option>
          </select>

          <select
            value={genero}
            onChange={(e) => setGenero(e.target.value)}
            className="border rounded px-3 py-2"
          >
            <option value="">-- Todos los géneros --</option>
            <option value="masculino">Masculino</option>
            <option value="femenino">Femenino</option>
          </select>

          <select
            value={subnivel}
            onChange={(e) => setSubnivel(e.target.value)}
            className="border rounded px-3 py-2"
          >
            <option value="">-- Todos los subniveles --</option>
            <option value="inicial">Inicial</option>
            <option value="preparatoria">Preparatoria</option>
            <option value="elemental">Elemental</option>
            <option value="media">Media</option>
            <option value="superior">Superior</option>
            <option value="bachillerato">Bachillerato</option>
          </select>

          <input
            type="text"
            placeholder="Buscar jugador..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="border rounded px-3 py-2 col-span-1 sm:col-span-2"
          />
        </div>

        <div className="text-center mb-6">
          <button
            onClick={limpiarFiltros}
            className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
          >
            🔄 Limpiar filtros
          </button>
        </div>

        <hr className="mb-6" />

        {jugadoresFiltrados.length === 0 ? (
          <p className="text-center text-gray-600">
            ❌ No hay jugadores con los filtros seleccionados.
          </p>
        ) : (
          <ul className="space-y-2">
            {jugadoresFiltrados.map((jugador) => (
              <li
                key={jugador.id}
                className="border p-3 rounded shadow-sm bg-white hover:shadow-md transition"
              >
                <strong>{jugador.nombre_jugador}</strong> -{" "}
                {obtenerNombreEquipo(jugador.equipo_id)} - {jugador.deporte} -{" "}
                {jugador.genero} - {jugador.subnivel}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default PlayersByTeam;
