const express = require("express");
const router = express.Router();
const {
  registrarJugador,
  obtenerJugadores,
  actualizarJugador,
  eliminarJugador,
  registrarJugadoresMasivo,
} = require("../controllers/player.controller");

router.post("/", registrarJugador);
router.get("/", obtenerJugadores);
router.put("/:id", actualizarJugador);
router.delete("/:id", eliminarJugador);
router.post("/masivo", registrarJugadoresMasivo);

module.exports = router;
