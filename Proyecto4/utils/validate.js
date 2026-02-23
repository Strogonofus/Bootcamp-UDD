const { isValidISODate, isStartAfterEnd } = require("./date");

function normalize(str) {
  return String(str || "").trim().toLowerCase();
}

function isPositiveInt(value) {
  const n = Number(value);
  return Number.isInteger(n) && n > 0;
}

// valida body para crear
function validateCreateBody(body) {
  const required = ["hotel", "tipo_habitacion", "num_huespedes", "fecha_inicio", "fecha_fin"];
  for (const key of required) {
    if (body[key] == null || body[key] === "") {
      return `Falta campo obligatorio: ${key}`;
    }
  }

  if (!isPositiveInt(body.num_huespedes)) {
    return "num_huespedes debe ser un entero > 0";
  }

  if (!isValidISODate(body.fecha_inicio) || !isValidISODate(body.fecha_fin)) {
    return "fecha_inicio y fecha_fin deben ser YYYY-MM-DD";
  }

  if (isStartAfterEnd(body.fecha_inicio, body.fecha_fin)) {
    return "fecha_inicio no puede ser mayor que fecha_fin";
  }

  return null; // OK
}

// valida query para filtros
function validateFiltersQuery(query) {
  const { fecha_inicio, fecha_fin, num_huespedes } = query;

  if ((fecha_inicio && !fecha_fin) || (!fecha_inicio && fecha_fin)) {
    return "Para filtrar por rango de fechas debes enviar fecha_inicio y fecha_fin";
  }

  if (fecha_inicio && fecha_fin) {
    if (!isValidISODate(fecha_inicio) || !isValidISODate(fecha_fin)) {
      return "fecha_inicio/fecha_fin deben ser YYYY-MM-DD";
    }
    if (isStartAfterEnd(fecha_inicio, fecha_fin)) {
      return "fecha_inicio no puede ser mayor que fecha_fin";
    }
  }

  if (num_huespedes != null) {
    const n = Number(num_huespedes);
    if (!Number.isFinite(n) || n <= 0) return "num_huespedes en query debe ser un número > 0";
  }

  return null; // OK
}

module.exports = {
  normalize,
  isPositiveInt,
  validateCreateBody,
  validateFiltersQuery,
};