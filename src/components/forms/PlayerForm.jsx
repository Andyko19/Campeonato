import { useEffect, useState } from "react";
import { obtenerEquipos } from "../../services/teamService";

const PlayerForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    nombre_jugador: "",
    deporte: "",
    genero: "",
    subnivel: "",
    equipo_id: "",
    habilitado: true,
    amonestado: false,
  });

  const [equipos, setEquipos] = useState([]);

  useEffect(() => {
    const fetchEquipos = async () => {
      try {
        const data = await obtenerEquipos();
        setEquipos(data);
      } catch (error) {
        console.error("Error al cargar equipos:", error);
      }
    };
    fetchEquipos();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      equipo_id: parseInt(formData.equipo_id),
    });

    setFormData({
      nombre_jugador: "",
      deporte: "",
      genero: "",
      subnivel: "",
      equipo_id: "",
      habilitado: true,
      amonestado: false,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 text-left max-w-md mx-auto"
    >
      <h2 className="text-xl font-bold text-blue-700 text-center">
        Registrar jugador
      </h2>

      <div>
        <label className="block">Nombre del jugador:</label>
        <input
          type="text"
          name="nombre_jugador"
          value={formData.nombre_jugador}
          onChange={handleChange}
          required
          className="w-full border px-3 py-2 rounded"
        />
      </div>

      <div>
        <label className="block">Deporte:</label>
        <select
          name="deporte"
          value={formData.deporte}
          onChange={handleChange}
          required
          className="w-full border px-3 py-2 rounded"
        >
          <option value="">Seleccione</option>
          <option value="futbol">Fútbol</option>
          <option value="baloncesto">Baloncesto</option>
        </select>
      </div>

      <div>
        <label className="block">Subnivel:</label>
        <select
          name="subnivel"
          value={formData.subnivel}
          onChange={handleChange}
          required
          className="w-full border px-3 py-2 rounded"
        >
          <option value="">Seleccione</option>
          <option value="inicial">Inicial</option>
          <option value="preparatoria">Preparatoria</option>
          <option value="elemental">Elemental</option>
          <option value="media">Media</option>
          <option value="superior">Superior</option>
          <option value="bachillerato">Bachillerato</option>
        </select>
      </div>

      <div>
        <label className="block">Género:</label>
        <select
          name="genero"
          value={formData.genero}
          onChange={handleChange}
          required
          className="w-full border px-3 py-2 rounded"
        >
          <option value="">Seleccione</option>
          <option value="masculino">Masculino</option>
          <option value="femenino">Femenino</option>
        </select>
      </div>

      <div>
        <label className="block">Equipo:</label>
        <select
          name="equipo_id"
          value={formData.equipo_id}
          onChange={handleChange}
          required
          className="w-full border px-3 py-2 rounded"
        >
          <option value="">Seleccione un equipo</option>
          {equipos.map((equipo) => (
            <option key={equipo.id} value={equipo.id}>
              {equipo.nombre_equipo}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center gap-3">
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
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
      >
        Registrar jugador
      </button>
    </form>
  );
};

export default PlayerForm;
