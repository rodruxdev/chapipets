import mysql2 from "mysql2";
import { configValues } from "../config.js";

const poolCreator = mysql2.createPool({
  host: configValues.host,
  user: configValues.user,
  database: configValues.database,
  password: configValues.password,
  waitForConnections: true,
  connectionLimit: 10,
  maxIdle: 10,
  idleTimeout: 60000,
  queueLimit: 0,
});

export const pool = poolCreator.promise();
