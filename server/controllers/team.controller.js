const pool = require("../config/db");

// Registrar un nuevo equipo
const registrarEquipo = async (req, res) => {
  const { nombre_equipo, deporte, subnivel, genero } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO equipos (nombre_equipo, deporte, subnivel, genero) 
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [nombre_equipo, deporte, subnivel, genero]
    );

    res.status(201).json({
      mensaje: "✅ Equipo registrado correctamente",
      equipo: result.rows[0],
    });
  } catch (error) {
    console.error("Error al registrar equipo:", error);
    res.status(500).json({ mensaje: "❌ Error al registrar equipo" });
  }
};

// Obtener todos los equipos
const obtenerEquipos = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM equipos ORDER BY id ASC");
    res.json(result.rows);
  } catch (error) {
    console.error("Error al obtener equipos:", error);
    res.status(500).json({ mensaje: "❌ Error al obtener equipos" });
  }
};

// Actualizar un equipo
const actualizarEquipo = async (req, res) => {
  const id = parseInt(req.params.id);
  const { nombre_equipo, deporte, subnivel, genero } = req.body;

  try {
    const result = await pool.query(
      `UPDATE equipos 
       SET nombre_equipo = $1, deporte = $2, subnivel = $3, genero = $4 
       WHERE id = $5 
       RETURNING *`,
      [nombre_equipo, deporte, subnivel, genero, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ mensaje: "❌ Equipo no encontrado" });
    }

    res.json({ mensaje: "✅ Equipo actualizado", equipo: result.rows[0] });
  } catch (error) {
    console.error("Error al actualizar equipo:", error);
    res.status(500).json({ mensaje: "❌ Error al actualizar equipo" });
  }
};

// Eliminar equipo
const eliminarEquipo = async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    const result = await pool.query(
      "DELETE FROM equipos WHERE id = $1 RETURNING *",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ mensaje: "❌ Equipo no encontrado" });
    }

    res.json({ mensaje: "✅ Equipo eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar equipo:", error);
    res.status(500).json({ mensaje: "❌ Error al eliminar equipo" });
  }
};

module.exports = {
  registrarEquipo,
  obtenerEquipos,
  actualizarEquipo,
  eliminarEquipo,
};
