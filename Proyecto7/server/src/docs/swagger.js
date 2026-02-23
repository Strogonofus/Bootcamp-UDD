import swaggerUi from "swagger-ui-express";

export function setupSwagger(app) {
  const doc = {
    openapi: "3.0.0",
    info: { title: "Ecommerce API", version: "1.0.0" },
    paths: {
      "/api/health": { get: { responses: { 200: { description: "OK" } } } },
    },
  };

  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(doc));
}