import {
    pgTable,
    uuid,
    text,
    integer,
    numeric,
    boolean,
    timestamp,
    jsonb,
    primaryKey,
    pgEnum,
    index,
  } from "drizzle-orm/pg-core";
  
  // ─── Enums ───
  // These are strict — LLM output that doesn't match gets stored as 'unknown'
  
  export const hookTypeEnum = pgEnum("hook_type", [
    "myth_bust",           // "Doctors don't want you to know this"
    "result_first",        // shows transformation before explaining
    "stop_doing",          // "Stop doing X immediately"
    "social_taana",        // social pressure / judgment hook (Indian context)
    "emotional_confession", // personal story / vulnerability
    "visual_object",       // hooks with a prop or visual
    "comparison",          // before/after or A vs B
    "unknown",             // fallback when LLM output doesn't match
  ]);
  
  export const creatorTypeEnum = pgEnum("creator_type", [
    "doctor",
    "influencer",
    "brand",
    "unknown",
  ]);
  
  export const jobStatusEnum = pgEnum("job_status", [
    "queued",
    "running",
    "done",
    "failed",
  ]);
  
  // ─── creators 
  // One row per Instagram account. Upserted on every scrape run.
  // is_india is a heuristic — bio/caption contains "India"/"+91"/Hindi words
  
  export const creators = pgTable(
    "creators",
    {
      id: uuid("id").primaryKey().defaultRandom(),
      igOwnerId: text("ig_owner_id").notNull().unique(),
      handle: text("handle").notNull().unique(),
      displayName: text("display_name"),
      bio: text("bio"),
      followers: integer("followers").default(0),
      creatorType: creatorTypeEnum("creator_type").default("unknown"),
      isIndia: boolean("is_india").default(false),
      updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
    },
    (t) => [
      index("idx_creators_is_india").on(t.isIndia),
      index("idx_creators_type").on(t.creatorType),
    ]
  );
  
  // ─── hashtags 
  // Discovered automatically from reel captions. Never manually inserted.
  // first_seen_at tells you when this hashtag first appeared in a scraped reel.
  // last_seen_at updated every time a reel with this tag is scraped.
  
  export const hashtags = pgTable(
    "hashtags",
    {
      id: uuid("id").primaryKey().defaultRandom(),
      name: text("name").notNull().unique(),
      firstSeenAt: timestamp("first_seen_at", { withTimezone: true }).defaultNow(),
      lastSeenAt: timestamp("last_seen_at", { withTimezone: true }).defaultNow(),
    },
    (t) => [
      index("idx_hashtags_last_seen").on(t.lastSeenAt),
    ]
  );
  
  // ─── reels ───
  // Core table. One row per Instagram reel.
  // short_code is the unique Instagram identifier (the part after /reel/).
  // hook_type and topic are filled in LATER by the LLM tagger — they start NULL.
  // engagement_rate = (likes + comments) / views — computed by metrics worker.
  
  export const reels = pgTable(
    "reels",
    {
      id: uuid("id").primaryKey().defaultRandom(),
      shortCode: text("short_code").notNull().unique(),
      creatorId: uuid("creator_id")
        .references(() => creators.id, { onDelete: "set null" }),
      caption: text("caption"),
      likes: integer("likes").default(0),
      comments: integer("comments").default(0),
      views: integer("views").default(0),
      engagementRate: numeric("engagement_rate", {
        precision: 6,
        scale: 4,
      }).default("0"),
      hookType: hookTypeEnum("hook_type"),     // NULL until LLM tags it
      topic: text("topic"),                    // NULL until LLM tags it — free text
      theme: text("theme"),                    // NULL until LLM tags it — free text
      postedAt: timestamp("posted_at", { withTimezone: true }),
      scrapedAt: timestamp("scraped_at", { withTimezone: true }).defaultNow(),
      musicId: text("music_id"),
      musicName: text("music_name"),
      thumbnailUrl: text("thumbnail_url"),
    },
    (t) => [
      index("idx_reels_scraped_at").on(t.scrapedAt),
      index("idx_reels_posted_at").on(t.postedAt),
      index("idx_reels_likes").on(t.likes),
      index("idx_reels_creator_id").on(t.creatorId),
      index("idx_reels_topic").on(t.topic),
      index("idx_reels_hook_type").on(t.hookType),
    ]
  );
  
  // ─── reel_hashtags ────────────────────────────────────────────────────────────
  // Junction table linking reels to hashtags (M:N).
  // One reel typically has 5-20 hashtags in its caption.
  // This is how "trending hashtags" queries work:
  //   COUNT(reel_id) GROUP BY hashtag_id WHERE scraped_at > window
  
  export const reelHashtags = pgTable(
    "reel_hashtags",
    {
      reelId: uuid("reel_id")
        .notNull()
        .references(() => reels.id, { onDelete: "cascade" }),
      hashtagId: uuid("hashtag_id")
        .notNull()
        .references(() => hashtags.id, { onDelete: "cascade" }),
    },
    (t) => [
      primaryKey({ columns: [t.reelId, t.hashtagId] }),
      index("idx_rh_hashtag_id").on(t.hashtagId),
      index("idx_rh_reel_id").on(t.reelId),
    ]
  );
  
  // ─── ingestion_jobs ───────────────────────────────────────────────────────────
  // One row per "Fetch Now" click.
  // counts JSONB tracks progress: { scraped: 234, normalized: 230, tagged: 180 }
  // Frontend polls GET /api/fetch/:id and reads status + counts to show progress.
  
  export const ingestionJobs = pgTable("ingestion_jobs", {
    id: uuid("id").primaryKey().defaultRandom(),
    status: jobStatusEnum("status").notNull().default("queued"),
    window: text("window").notNull().default("24h"),
    limit: integer("limit").default(500),
    startedAt: timestamp("started_at", { withTimezone: true }).defaultNow(),
    finishedAt: timestamp("finished_at", { withTimezone: true }),
    counts: jsonb("counts").$type<{
      scraped?: number;
      normalized?: number;
      tagged?: number;
      newHashtags?: number;
    }>().default({}),
  });