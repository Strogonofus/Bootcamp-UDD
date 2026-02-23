import express from "express";
import cors from "cors";
import { ENV } from "./config/env.js";
import routes from "./routes/index.js";
import { notFound, errorHandler } from "./middleware/error.middleware.js";
import { setupSwagger } from "./docs/swagger.js";

const app = express();

// Stripe webhook (opcional) requiere raw body SOLO en esa ruta
// app.use("/api/payments/webhook", express.raw({ type: "application/json" }));

app.use(cors({ origin: ENV.CLIENT_URL, credentials: true }));
app.use(express.json());

setupSwagger(app);

app.get("/health", (req, res) => res.json({ ok: true }));

app.use("/api", routes);

app.use(notFound);
app.use(errorHandler);

export default app;