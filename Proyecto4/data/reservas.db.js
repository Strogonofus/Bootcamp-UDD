let reservas = [
  {
    id: "12345",
    hotel: "Hotel Paraíso",
    tipo_habitacion: "doble",
    num_huespedes: 3,
    fecha_inicio: "2023-05-15",
    fecha_fin: "2023-05-20",
    estado: "confirmada",
    nombre_huesped: "Juan Pérez",
    email: "juan@example.com",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

function getAll() {
  return reservas;
}

function findById(id) {
  return reservas.find((r) => r.id === id);
}

function create(reserva) {
  reservas.push(reserva);
  return reserva;
}

function updateById(id, updated) {
  const idx = reservas.findIndex((r) => r.id === id);
  if (idx === -1) return null;
  reservas[idx] = updated;
  return reservas[idx];
}

function deleteById(id) {
  const idx = reservas.findIndex((r) => r.id === id);
  if (idx === -1) return null;
  const deleted = reservas.splice(idx, 1)[0];
  return deleted;
}

function generateId() {
  return String(Date.now());
}

module.exports = {
  getAll,
  findById,
  create,
  updateById,
  deleteById,
  generateId,
};