const express = require("express");
const router = express.Router();
const {
  registrarPartido,
  obtenerPartidos,
  calcularTablaPosiciones,
  actualizarPartido,
  eliminarPartido,
} = require("../controllers/match.controller");

router.post("/", registrarPartido);
router.get("/", obtenerPartidos);
router.get("/tabla", calcularTablaPosiciones);
router.put("/:id", actualizarPartido);
router.delete("/:id", eliminarPartido);

module.exports = router;
