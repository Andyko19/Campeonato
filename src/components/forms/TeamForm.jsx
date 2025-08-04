import { useState } from "react";

const TeamForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    nombre_equipo: "",
    deporte: "",
    subnivel: "",
    genero: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData); // envía datos al componente padre (por ahora solo consola)
    setFormData({
      nombre_equipo: "",
      deporte: "",
      subnivel: "",
      genero: "",
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Registrar equipo</h2>

      <label>Nombre del equipo:</label>
      <input
        type="text"
        name="nombre_equipo"
        value={formData.nombre_Equipo}
        onChange={handleChange}
        required
      />

      <label>Deporte:</label>
      <select
        name="deporte"
        value={formData.deporte}
        onChange={handleChange}
        required
      >
        <option value="">Seleccione</option>
        <option value="futbol">Fútbol</option>
        <option value="baloncesto">Baloncesto</option>
      </select>

      <label>Subnivel:</label>
      <select
        name="subnivel"
        value={formData.subnivel}
        onChange={handleChange}
        required
      >
        <option value="">Seleccione</option>
        <option value="inicial">Inicial</option>
        <option value="preparatoria">Preparatoria</option>
        <option value="elemental">Elemental</option>
        <option value="media">Media</option>
        <option value="superior">Superior</option>
        <option value="bachillerato">Bachillerato</option>
      </select>

      <label>Género:</label>
      <select
        name="genero"
        value={formData.genero}
        onChange={handleChange}
        required
      >
        <option value="">Seleccione</option>
        <option value="masculino">Masculino</option>
        <option value="femenino">Femenino</option>
      </select>

      <button type="submit">Registrar equipo</button>
    </form>
  );
};

export default TeamForm;
