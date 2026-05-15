import { drizzle } from "drizzle-orm/node-postgres";
import pkg from "pg";
import { config } from "dotenv";
import * as schema from "./schema.js";

config();

const { Pool } = pkg;

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set in .env");
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 10,                // max 10 concurrent connections
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

// test the connection on startup
pool.on("error", (err) => {
  console.error("Postgres pool error:", err);
});

export const db = drizzle(pool, { schema });
export type DB = typeof db;