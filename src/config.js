import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: ".env.local" });

export const configValues = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_USER_PASSWORD,
};
