import dotenv from "dotenv";
dotenv.config();

const required = (key) => {
  if (!process.env[key]) throw new Error(`Missing env: ${key}`);
  return process.env[key];
};

export const config = {
  port: process.env.PORT || 4000,
  nodeEnv: process.env.NODE_ENV || "development",
  mongoUri: required("MONGODB_URI"),
  adminApiKey: required("ADMIN_API_KEY"),
  whatsappNumber: required("WHATSAPP_NUMBER"),
  allowedOrigins: (process.env.ALLOWED_ORIGINS || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean),
};
