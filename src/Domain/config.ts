import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

export const config = {
  PORT: process.env.PORT || 8000,
  JWT_SECRET: process.env.JWT_SECRET || "",
  REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET || "",
  CLIENT_DOMAIN: process.env.CLIENT_DOMAIN || "http://localhost:8000",
  SMTP_HOST: process.env.SMTP_HOST || "",
  SMTP_SECRET_KEY: process.env.SMTP_SECRET_KEY || "",
  DB_PORT: process.env.DB_PORT || 3306,
  DB_HOST: process.env.DB_HOST || "",
  DB_USERNAME: process.env.DB_USERNAME || "",
  DB_PASSWORD: process.env.DB_PASSWORD || "",
  DB_SCHEMA: process.env.DB_SCHEMA || "",
};
