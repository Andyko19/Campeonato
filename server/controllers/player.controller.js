const pool = require("../config/db");

// Crear jugador
const registrarJugador = async (req, res) => {
  const { nombre_jugador, deporte, genero, subnivel, equipo_id } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO jugadores (nombre_jugador, deporte, genero, subnivel, equipo_id)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [nombre_jugador, deporte, genero, subnivel, equipo_id]
    );

    res.status(201).json({
      mensaje: "Jugador registrado correctamente",
      jugador: result.rows[0],
    });
  } catch (error) {
    console.error("Error al registrar jugador:", error);
    res.status(500).json({ mensaje: "Error interno al registrar jugador" });
  }
};

// Obtener todos los jugadores
const obtenerJugadores = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM jugadores");
    res.json(result.rows);
  } catch (error) {
    console.error("Error al obtener jugadores:", error);
    res.status(500).json({ mensaje: "Error interno al obtener jugadores" });
  }
};

// Actualizar jugador
const actualizarJugador = async (req, res) => {
  const id = parseInt(req.params.id);
  const {
    nombre_jugador,
    deporte,
    genero,
    subnivel,
    equipo_id,
    habilitado,
    amonestado,
  } = req.body;

  try {
    const result = await pool.query(
      `UPDATE jugadores
       SET nombre_jugador = $1,
           deporte = $2,
           genero = $3,
           subnivel = $4,
           equipo_id = $5,
           habilitado = $6,
           amonestado = $7
       WHERE id = $8
       RETURNING *`,
      [
        nombre_jugador,
        deporte,
        genero,
        subnivel,
        equipo_id,
        habilitado,
        amonestado,
        id,
      ]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ mensaje: "Jugador no encontrado" });
    }

    res.json({ mensaje: "Jugador actualizado", jugador: result.rows[0] });
  } catch (error) {
    console.error("Error al actualizar jugador:", error);
    res.status(500).json({ mensaje: "Error interno al actualizar jugador" });
  }
};

// Eliminar jugador
const eliminarJugador = async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    const result = await pool.query(
      "DELETE FROM jugadores WHERE id = $1 RETURNING *",
      [id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ mensaje: "Jugador no encontrado" });
    }

    res.json({ mensaje: "Jugador eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar jugador:", error);
    res.status(500).json({ mensaje: "Error interno al eliminar jugador" });
  }
};
const registrarJugadoresMasivo = async (req, res) => {
  const jugadores = req.body;

  try {
    for (const jugador of jugadores) {
      const { nombre_jugador, deporte, genero, subnivel, nombre_equipo } =
        jugador;

      if (!nombre_jugador || !deporte || !genero || !subnivel || !nombre_equipo)
        continue;

      // Buscar equipo correspondiente
      const equipoResult = await pool.query(
        `SELECT id FROM equipos WHERE nombre_equipo = $1 AND genero = $2 AND subnivel = $3 AND deporte = $4`,
        [nombre_equipo, genero, subnivel, deporte]
      );

      if (equipoResult.rows.length === 0) {
        console.warn(
          `No se encontró el equipo: ${nombre_equipo} / ${genero} / ${subnivel} / ${deporte}`
        );
        continue;
      }

      const equipo_id = equipoResult.rows[0].id;

      // Insertar jugador
      await pool.query(
        `INSERT INTO jugadores (nombre_jugador, deporte, genero, subnivel, equipo_id)
         VALUES ($1, $2, $3, $4, $5)`,
        [nombre_jugador, deporte, genero, subnivel, equipo_id]
      );
    }

    res.json({ mensaje: "Jugadores cargados correctamente" });
  } catch (error) {
    console.error("Error al cargar jugadores masivamente:", error);
    res.status(500).json({ mensaje: "Error interno" });
  }
};

module.exports = {
  registrarJugador,
  obtenerJugadores,
  actualizarJugador,
  eliminarJugador,
  registrarJugadoresMasivo,
};
