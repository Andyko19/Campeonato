import { useEffect, useState } from "react";
import { obtenerEquipos } from "../../services/teamService";

const MatchForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    equipo_local_id: "",
    equipo_visitante_id: "",
    goles_local: "",
    goles_visitante: "",
    fecha: "",
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
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      equipo_local_id: parseInt(formData.equipo_local_id),
      equipo_visitante_id: parseInt(formData.equipo_visitante_id),
      goles_local: parseInt(formData.goles_local),
      goles_visitante: parseInt(formData.goles_visitante),
      fecha: formData.fecha || new Date().toISOString().split("T")[0],
    };

    console.log("Enviando:", payload); // 👈 Míralo en consola

    onSubmit(payload);

    setFormData({
      equipo_local_id: "",
      equipo_visitante_id: "",
      goles_local: "",
      goles_visitante: "",
      fecha: "",
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Registrar resultado de partido</h2>

      <label>Equipo Local:</label>
      <select
        name="equipo_local_id"
        value={formData.equipo_local_id}
        onChange={handleChange}
        required
      >
        <option value="">Seleccione equipo local</option>
        {equipos.map((equipo) => (
          <option key={equipo.id} value={equipo.id}>
            {equipo.nombre_equipo}
          </option>
        ))}
      </select>

      <label>Equipo Visitante:</label>
      <select
        name="equipo_visitante_id"
        value={formData.equipo_visitante_id}
        onChange={handleChange}
        required
      >
        <option value="">Seleccione equipo visitante</option>
        {equipos.map((equipo) => (
          <option key={equipo.id} value={equipo.id}>
            {equipo.nombre_equipo}
          </option>
        ))}
      </select>

      <label>Goles Equipo Local:</label>
      <input
        type="number"
        name="goles_local"
        value={formData.goles_local}
        onChange={handleChange}
        required
      />

      <label>Goles Equipo Visitante:</label>
      <input
        type="number"
        name="goles_visitante"
        value={formData.goles_visitante}
        onChange={handleChange}
        required
      />

      <label>Fecha del partido:</label>
      <input
        type="date"
        name="fecha"
        value={formData.fecha}
        onChange={handleChange}
        required
      />

      <button type="submit">Registrar resultado</button>
    </form>
  );
};

export default MatchForm;
