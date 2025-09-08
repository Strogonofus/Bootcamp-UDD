class Encuesta {
  constructor(pregunta, opciones) {
    this.pregunta = pregunta;
    this.opciones = opciones;
    this.votos = new Array(opciones.length).fill(0);
  }
  preguntar() {
    const respuesta = prompt(
      `${this.pregunta}\nOpciones: ${this.opciones.join(", ")}`
    );

    const indice = this.opciones.findIndex(
      (op) => op.toLowerCase() === respuesta.toLowerCase()
    );

    if (indice !== -1) {
      this.votos[indice] += 1;
      alert(`¡Gracias! Registrado tu voto por "${this.opciones[indice]}"`);
    } else {
      alert("Opción no válida 😕");
    }
  }

  resultados() {
    return this.opciones
      .map((op, i) => `${op}: ${this.votos[i]} votos`)
      .join("\n");
  }
}

const encuestas = [
  new Encuesta("¿Cuál es tu comida favorita?", [
    "Pizza",
    "Sushi",
    "Hamburguesa",
  ]),
  new Encuesta("¿Qué lenguaje prefieres?", ["JavaScript", "Python", "C++"]),
  new Encuesta("¿Qué deporte practicas?", ["Fútbol", "Basketball", "Tenis"]),
  new Encuesta("¿Qué sistema operativo usas?", ["Windows", "Linux", "MacOS"]),
  new Encuesta("¿Qué red social usas más?", [
    "Instagram",
    "TikTok",
    "Facebook",
  ]),
  new Encuesta("¿Prefieres día o noche?", ["Día", "Noche"]),
  new Encuesta("¿Bebida favorita?", ["Agua", "Café", "Té"]),
  new Encuesta("¿Viajarías al espacio?", ["Sí", "No"]),
];

encuestas.forEach((encuesta) => {
  encuesta.preguntar();
  console.log("Resultados de la encuesta:\n" + encuesta.resultados());
});
