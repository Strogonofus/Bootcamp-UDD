const express = require("express");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
app.use(express.json());

const reservasRoutes = require("./routes/reservas.routes");
app.use("/api/reservas", reservasRoutes);

app.get("/", (req, res) => {
  res.json({ ok: true, message: "API Reservas Hotel" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor en http://localhost:${PORT}`));