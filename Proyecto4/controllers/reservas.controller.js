const db = require("../data/reservas.db");
const { overlapsRange } = require("../utils/date");
const { normalize, validateCreateBody, validateFiltersQuery, isPositiveInt } = require("../utils/validate");

// POST /api/reservas
function crearReserva(req, res) {
  const error = validateCreateBody(req.body);
  if (error) return res.status(400).json({ ok: false, message: error });

  const {
    hotel,
    tipo_habitacion,
    num_huespedes,
    fecha_inicio,
    fecha_fin,
    estado = "confirmada",
    nombre_huesped = null,
    email = null,
  } = req.body;

  const now = new Date().toISOString();
  const nueva = {
    id: db.generateId(),
    hotel,
    tipo_habitacion,
    num_huespedes: Number(num_huespedes),
    fecha_inicio,
    fecha_fin,
    estado,
    nombre_huesped,
    email,
    createdAt: now,
    updatedAt: now,
  };

  db.create(nueva);
  return res.status(201).json({ ok: true, data: nueva });
}

// GET /api/reservas (con filtros por query)
function listarReservas(req, res) {
  const error = validateFiltersQuery(req.query);
  if (error) return res.status(400).json({ ok: false, message: error });

  const { hotel, tipo_habitacion, estado, num_huespedes, fecha_inicio, fecha_fin } = req.query;

  let result = [...db.getAll()];

  if (hotel) {
    const h = normalize(hotel);
    result = result.filter((r) => normalize(r.hotel) === h);
  }

  if (tipo_habitacion) {
    const t = normalize(tipo_habitacion);
    result = result.filter((r) => normalize(r.tipo_habitacion) === t);
  }

  if (estado) {
    const e = normalize(estado);
    result = result.filter((r) => normalize(r.estado) === e);
  }

  if (num_huespedes != null) {
    const n = Number(num_huespedes);
    result = result.filter((r) => Number(r.num_huespedes) === n);
  }

  if (fecha_inicio && fecha_fin) {
    result = result.filter((r) => overlapsRange(r.fecha_inicio, r.fecha_fin, fecha_inicio, fecha_fin));
  }

  return res.json({ ok: true, total: result.length, data: result });
}

// GET /api/reservas/:id
function obtenerReserva(req, res) {
  const { id } = req.params;
  const reserva = db.findById(id);
  if (!reserva) return res.status(404).json({ ok: false, message: `No existe reserva con id ${id}` });
  return res.json({ ok: true, data: reserva });
}

// PUT /api/reservas/:id
function actualizarReserva(req, res) {
  const { id } = req.params;
  const current = db.findById(id);
  if (!current) return res.status(404).json({ ok: false, message: `No existe reserva con id ${id}` });

  // validación parcial (si viene num_huespedes)
  if (req.body.num_huespedes != null && !isPositiveInt(req.body.num_huespedes)) {
    return res.status(400).json({ ok: false, message: "num_huespedes debe ser un entero > 0" });
  }

  // Reusar validador de rango si cambian fechas:
  const fecha_inicio = req.body.fecha_inicio ?? current.fecha_inicio;
  const fecha_fin = req.body.fecha_fin ?? current.fecha_fin;
  const fakeQuery = { ...req.query, fecha_inicio, fecha_fin };

  // OJO: validateFiltersQuery exige ambas si existe una; acá siempre mandamos ambas
  const error = validateFiltersQuery(fakeQuery);
  if (error) return res.status(400).json({ ok: false, message: error });

  const updated = {
    ...current,
    ...req.body,
    num_huespedes: req.body.num_huespedes != null ? Number(req.body.num_huespedes) : current.num_huespedes,
    fecha_inicio,
    fecha_fin,
    updatedAt: new Date().toISOString(),
  };

  db.updateById(id, updated);
  return res.json({ ok: true, data: updated });
}

// DELETE /api/reservas/:id
function eliminarReserva(req, res) {
  const { id } = req.params;
  const deleted = db.deleteById(id);
  if (!deleted) return res.status(404).json({ ok: false, message: `No existe reserva con id ${id}` });
  return res.json({ ok: true, message: "Reserva eliminada", data: deleted });
}

module.exports = {
  crearReserva,
  listarReservas,
  obtenerReserva,
  actualizarReserva,
  eliminarReserva,
};