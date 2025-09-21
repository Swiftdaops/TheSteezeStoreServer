import { createApp } from "./app.js";
import { connectDB } from "./config/db.js";
import { config } from "./config/env.js";

const bootstrap = async () => {
  await connectDB();
  const app = createApp();
  app.listen(config.port, () => {
    console.log(`🚀 Server running on http://localhost:${config.port}`);
  });
};

bootstrap().catch((e) => {
  console.error("Fatal:", e);
  process.exit(1);
});
