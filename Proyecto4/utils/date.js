function isValidISODate(dateStr) {
  return typeof dateStr === "string" && /^\d{4}-\d{2}-\d{2}$/.test(dateStr);
}

function isStartAfterEnd(start, end) {
  return new Date(start) > new Date(end);
}

// solape: la reserva se cruza con el rango buscado
function overlapsRange(reservaStart, reservaEnd, queryStart, queryEnd) {
  const aStart = new Date(reservaStart);
  const aEnd = new Date(reservaEnd);
  const bStart = new Date(queryStart);
  const bEnd = new Date(queryEnd);
  return aStart <= bEnd && bStart <= aEnd;
}

module.exports = {
  isValidISODate,
  isStartAfterEnd,
  overlapsRange,
};