const pool = require("../config/db");

const registrarPartido = async (req, res) => {
  try {
    const {
      equipo_local_id,
      equipo_visitante_id,
      goles_local,
      goles_visitante,
      fecha,
    } = req.body;

    if (
      !equipo_local_id ||
      !equipo_visitante_id ||
      goles_local === undefined ||
      goles_visitante === undefined ||
      !fecha
    ) {
      return res.status(400).json({ mensaje: "Faltan datos requeridos" });
    }

    const result = await pool.query(
      `INSERT INTO partidos (
        equipo_local_id, equipo_visitante_id, goles_local, goles_visitante, fecha
      ) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [
        equipo_local_id,
        equipo_visitante_id,
        goles_local,
        goles_visitante,
        fecha,
      ]
    );

    res.status(201).json({
      mensaje: "Partido registrado",
      partido: result.rows[0],
    });
  } catch (error) {
    console.error("Error al registrar partido:", error);
    res.status(500).json({ mensaje: "Error en el servidor" });
  }
};

// 📌 Obtener todos los partidos
const obtenerPartidos = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM partidos");
    res.json(result.rows);
  } catch (error) {
    console.error("Error al obtener partidos:", error);
    res.status(500).json({ mensaje: "Error en el servidor" });
  }
};

// 📌 Actualizar partido
const actualizarPartido = async (req, res) => {
  const id = parseInt(req.params.id);
  const {
    equipo_local_id,
    equipo_visitante_id,
    goles_local,
    goles_visitante,
    fecha,
  } = req.body;

  try {
    const result = await pool.query(
      `UPDATE partidos SET 
        equipo_local_id = $1,
        equipo_visitante_id = $2,
        goles_local = $3,
        goles_visitante = $4,
        fecha = $5
      WHERE id = $6 RETURNING *`,
      [
        equipo_local_id,
        equipo_visitante_id,
        goles_local,
        goles_visitante,
        fecha,
        id,
      ]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ mensaje: "Partido no encontrado" });
    }

    res.json({ mensaje: "Partido actualizado", partido: result.rows[0] });
  } catch (error) {
    console.error("Error al actualizar partido:", error);
    res.status(500).json({ mensaje: "Error en el servidor" });
  }
};

// 📌 Eliminar partido
const eliminarPartido = async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    const result = await pool.query("DELETE FROM partidos WHERE id = $1", [id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ mensaje: "Partido no encontrado" });
    }

    res.json({ mensaje: "Partido eliminado" });
  } catch (error) {
    console.error("Error al eliminar partido:", error);
    res.status(500).json({ mensaje: "Error en el servidor" });
  }
};

// 📌 Calcular tabla de posiciones
const calcularTablaPosiciones = async (req, res) => {
  const { deporte, genero, subnivel } = req.query;

  try {
    const partidosQuery = `
      SELECT p.*, 
             el.nombre_equipo AS nombre_local, 
             ev.nombre_equipo AS nombre_visitante
      FROM partidos p
      JOIN equipos el ON p.equipo_local_id = el.id
      JOIN equipos ev ON p.equipo_visitante_id = ev.id
      WHERE 
        ($1::text IS NULL OR el.deporte = $1) AND
        ($2::text IS NULL OR el.genero = $2) AND
        ($3::text IS NULL OR el.subnivel = $3)
    `;

    const result = await pool.query(partidosQuery, [
      deporte || null,
      genero || null,
      subnivel || null,
    ]);

    const partidos = result.rows;
    const tabla = {};

    partidos.forEach((p) => {
      const {
        equipo_local_id,
        equipo_visitante_id,
        goles_local,
        goles_visitante,
        nombre_local,
        nombre_visitante,
      } = p;

      // Inicializar equipos
      const iniciarEquipo = (id, nombre) => {
        if (!tabla[id]) {
          tabla[id] = {
            id,
            nombreEquipo: nombre,
            puntos: 0,
            jugados: 0,
            ganados: 0,
            empatados: 0,
            perdidos: 0,
            gf: 0,
            gc: 0,
          };
        }
      };

      iniciarEquipo(equipo_local_id, nombre_local);
      iniciarEquipo(equipo_visitante_id, nombre_visitante);

      const local = tabla[equipo_local_id];
      const visitante = tabla[equipo_visitante_id];

      local.jugados++;
      visitante.jugados++;

      local.gf += goles_local;
      local.gc += goles_visitante;
      visitante.gf += goles_visitante;
      visitante.gc += goles_local;

      if (goles_local > goles_visitante) {
        local.puntos += 3;
        local.ganados++;
        visitante.perdidos++;
      } else if (goles_local < goles_visitante) {
        visitante.puntos += 3;
        visitante.ganados++;
        local.perdidos++;
      } else {
        local.puntos++;
        visitante.puntos++;
        local.empatados++;
        visitante.empatados++;
      }
    });

    const tablaFinal = Object.values(tabla).map((e) => ({
      nombreEquipo: e.nombreEquipo,
      puntos: e.puntos,
      jugados: e.jugados,
      ganados: e.ganados,
      empatados: e.empatados,
      perdidos: e.perdidos,
      gf: e.gf,
      gc: e.gc,
      diferencia: e.gf - e.gc,
    }));
    tablaFinal.sort(
      (a, b) => b.puntos - a.puntos || b.diferencia - a.diferencia
    );

    res.json(tablaFinal);
  } catch (error) {
    console.error("Error al calcular tabla:", error);
    res.status(500).json({ mensaje: "Error en el servidor" });
  }
};

module.exports = {
  registrarPartido,
  obtenerPartidos,
  actualizarPartido,
  eliminarPartido,
  calcularTablaPosiciones,
};
