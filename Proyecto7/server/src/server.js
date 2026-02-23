import app from "./app.js";
import { connectDB } from "./config/db.js";
import { assertEnv, ENV } from "./config/env.js";

async function bootstrap() {
  assertEnv();
  await connectDB();
  app.listen(ENV.PORT, () => {
    console.log(`🚀 Server running on port ${ENV.PORT}`);
  });
}

bootstrap().catch((err) => {
  console.error("fallido", err);
  process.exit(1);
});