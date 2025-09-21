import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import morgan from "morgan";
import rateLimit from "express-rate-limit";

import routes from "./routes/index.js";                      // src/routes/index.js
import { errorHandler } from "./middlewares/errorHandler.js"; // src/middlewares/errorHandler.js
import { config } from "./config/env.js";                    // src/config/env.js

export const createApp = () => {
  const app = express();

  app.use(express.json());
  app.use(helmet());
  app.use(compression());
  app.use(morgan("dev"));

  const allowed = config.allowedOrigins || [];
  if (allowed.length) {
    app.use(cors({
      origin: (origin, cb) => {
        if (!origin) return cb(null, true);
        if (allowed.includes(origin)) return cb(null, true);
        cb(new Error("Not allowed by CORS"));
      },
      credentials: true
    }));
  } else {
    app.use(cors());
  }

  app.use("/api", rateLimit({ windowMs: 60_000, max: 300 }));
  app.use("/api", routes);

  app.get("/health", (req, res) => res.json({ ok: true, status: "healthy" }));

  app.use(errorHandler);
  return app;
};
ssh-keygen -t ed25519 -C "tobepersonnalmail@gmail.com"
