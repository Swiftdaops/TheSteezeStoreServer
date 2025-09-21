import { config } from "../config/env.js";

export const requireAdmin = (req, res, next) => {
  const key = req.header("x-api-key");
  if (!key || key !== config.adminApiKey) {
    return res.status(401).json({ ok:false, error: "Unauthorized" });
  }
  next();
};
