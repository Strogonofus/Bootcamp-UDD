const express = require("express");
const router = express.Router();

const {
  crearReserva,
  listarReservas,
  obtenerReserva,
  actualizarReserva,
  eliminarReserva,
} = require("../controllers/reservas.controller");

// 10 endpoints: 5 CRUD + 5 filtros (los filtros viven en el mismo GET /)
router.post("/", crearReserva);
router.get("/", listarReservas);          // filtros por query params aquí
router.get("/:id", obtenerReserva);
router.put("/:id", actualizarReserva);
router.delete("/:id", eliminarReserva);

module.exports = router;