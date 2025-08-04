const express = require("express");
const router = express.Router();
const {
  registrarEquipo,
  obtenerEquipos,
  actualizarEquipo,
  eliminarEquipo,
} = require("../controllers/team.controller");

router.post("/", registrarEquipo);
router.get("/", obtenerEquipos);
router.put("/:id", actualizarEquipo);
router.delete("/:id", eliminarEquipo);

module.exports = router;
