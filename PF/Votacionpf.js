const preguntas = [
  { p: "¿Cuál es tu comida favorita?", op: ["Pizza", "Sushi", "Hamburguesa"] },
  { p: "¿Qué lenguaje prefieres?", op: ["JavaScript", "Python", "C++"] },
  { p: "¿Qué deporte practicas?", op: ["Fútbol", "Basketball", "Tenis"] },
  { p: "¿Qué sistema operativo usas?", op: ["Windows", "Linux", "MacOS"] },
  { p: "¿Qué red social usas más?", op: ["Instagram", "TikTok", "Facebook"] },
  { p: "¿Prefieres día o noche?", op: ["Día", "Noche"] },
  { p: "¿Bebida favorita?", op: ["Agua", "Café", "Té"] },
  { p: "¿Viajarías al espacio?", op: ["Sí", "No"] },
];

const crearEncuesta = (pregunta) => ({
  ...pregunta,
  votos: Array(pregunta.op.length).fill(0),
});

const votar = (encuesta, respuesta) => {
  const idx = encuesta.op.findIndex(
    (op) => op.toLowerCase() === respuesta.toLowerCase().trim()
  );
  return idx !== -1
    ? { ...encuesta, votos: encuesta.votos.map((v, i) => (i === idx ? v + 1 : v)) }
    : encuesta;
};

const mostrarResultados = (encuestas) =>
  encuestas.forEach((e, i) => {
    console.log(`\n${i + 1}. ${e.p}`);
    e.op.forEach((op, j) => console.log(`   ${op}: ${e.votos[j]} votos`));
  });

let encuestas = preguntas.map(crearEncuesta);

encuestas = encuestas.map((encuesta) => {
  const opcionesTexto = encuesta.op.join(", ");
  const respuesta = prompt(`${encuesta.p}\nOpciones: ${opcionesTexto}`);
  return votar(encuesta, respuesta);
});

console.log("Los Resultados de la encuesta son:");
mostrarResultados(encuestas);