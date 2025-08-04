require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3000;
const pool = require("./config/db");

// PRIMERO: Intentar conectar a la base de datos
pool
  .connect()
  .then(() => {
    console.log("✅ Conectado a PostgreSQL");

    // MIDDLEWARES
    app.use(cors());
    app.use(express.json());

    // RUTAS
    app.use("/api/auth", require("./routes/auth.routes"));
    app.use("/api/equipos", require("./routes/team.routes"));
    app.use("/api/jugadores", require("./routes/player.routes"));
    app.use("/api/partidos", require("./routes/match.routes"));

    // Ruta raíz opcional
    app.get("/", (req, res) => {
      res.send("🏆 API del Torneo Escolar funcionando correctamente");
    });

    // Rutas de manejo de errores
    // Ruta no encontrada (404)
    app.use((req, res, next) => {
      res.status(404).json({ mensaje: "Ruta no encontrada" });
    });

    // Manejo de errores general
    app.use((err, req, res, next) => {
      console.error("💥 Error interno:", err);
      res.status(500).json({ mensaje: "Error interno del servidor" });
    });

    // DESPUÉS DE LA CONEXIÓN EXITOSA, INICIAR EL SERVIDOR EXPRESS
    app.listen(PORT, () => {
      console.log(`✅ Servidor backend escuchando en http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Error al conectar a PostgreSQL", err);
  });
