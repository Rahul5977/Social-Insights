import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { config } from "dotenv";
import { sql } from "drizzle-orm";
import { db } from "./db/index.js";
import { reels, hashtags, creators, ingestionJobs } from "./db/schema.js";

config();

const app = new Hono();

// ─── Health check 
// Verifies server is up AND Postgres is reachable.
// This is the only endpoint you need for Checkpoint 1.

app.get("/health", async (c) => {
  try {
    await db.execute(sql`SELECT 1`);
    return c.json({
      status: "ok",
      db: "connected",
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    console.error("Health check failed:", err);
    return c.json(
      { status: "error", db: "disconnected" },
      500
    );
  }
});

// ─── Schema check 
// Verifies all tables exist and are empty (as expected at Checkpoint 1).
// Remove or protect this route before going to production.

app.get("/debug/schema", async (c) => {
  const [
    reelCount,
    hashtagCount,
    creatorCount,
    jobCount,
  ] = await Promise.all([
    db.select({ count: sql<number>`count(*)` }).from(reels),
    db.select({ count: sql<number>`count(*)` }).from(hashtags),
    db.select({ count: sql<number>`count(*)` }).from(creators),
    db.select({ count: sql<number>`count(*)` }).from(ingestionJobs),
  ]);

  return c.json({
    tables: {
      reels: Number(reelCount[0].count),
      hashtags: Number(hashtagCount[0].count),
      creators: Number(creatorCount[0].count),
      ingestion_jobs: Number(jobCount[0].count),
    },
    note: "All zeros is correct at Checkpoint 1. Data arrives at Checkpoint 2.",
  });
});

// ─── Start server 

const port = Number(process.env.PORT ?? 4001);

console.log(`[superliving-backend] starting on http://localhost:${port}`);

serve({
  fetch: app.fetch,
  port,
});