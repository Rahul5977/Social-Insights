CREATE TYPE "public"."creator_type" AS ENUM('doctor', 'influencer', 'brand', 'unknown');--> statement-breakpoint
CREATE TYPE "public"."hook_type" AS ENUM('myth_bust', 'result_first', 'stop_doing', 'social_taana', 'emotional_confession', 'visual_object', 'comparison', 'unknown');--> statement-breakpoint
CREATE TYPE "public"."job_status" AS ENUM('queued', 'running', 'done', 'failed');--> statement-breakpoint
CREATE TABLE "creators" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"ig_owner_id" text NOT NULL,
	"handle" text NOT NULL,
	"display_name" text,
	"bio" text,
	"followers" integer DEFAULT 0,
	"creator_type" "creator_type" DEFAULT 'unknown',
	"is_india" boolean DEFAULT false,
	"updated_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "creators_ig_owner_id_unique" UNIQUE("ig_owner_id"),
	CONSTRAINT "creators_handle_unique" UNIQUE("handle")
);
--> statement-breakpoint
CREATE TABLE "hashtags" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"first_seen_at" timestamp with time zone DEFAULT now(),
	"last_seen_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "hashtags_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "ingestion_jobs" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"status" "job_status" DEFAULT 'queued' NOT NULL,
	"window" text DEFAULT '24h' NOT NULL,
	"limit" integer DEFAULT 500,
	"started_at" timestamp with time zone DEFAULT now(),
	"finished_at" timestamp with time zone,
	"counts" jsonb DEFAULT '{}'::jsonb
);
--> statement-breakpoint
CREATE TABLE "reel_hashtags" (
	"reel_id" uuid NOT NULL,
	"hashtag_id" uuid NOT NULL,
	CONSTRAINT "reel_hashtags_reel_id_hashtag_id_pk" PRIMARY KEY("reel_id","hashtag_id")
);
--> statement-breakpoint
CREATE TABLE "reels" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"short_code" text NOT NULL,
	"creator_id" uuid,
	"caption" text,
	"likes" integer DEFAULT 0,
	"comments" integer DEFAULT 0,
	"views" integer DEFAULT 0,
	"engagement_rate" numeric(6, 4) DEFAULT '0',
	"hook_type" "hook_type",
	"topic" text,
	"theme" text,
	"posted_at" timestamp with time zone,
	"scraped_at" timestamp with time zone DEFAULT now(),
	"music_id" text,
	"music_name" text,
	"thumbnail_url" text,
	CONSTRAINT "reels_short_code_unique" UNIQUE("short_code")
);
--> statement-breakpoint
ALTER TABLE "reel_hashtags" ADD CONSTRAINT "reel_hashtags_reel_id_reels_id_fk" FOREIGN KEY ("reel_id") REFERENCES "public"."reels"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "reel_hashtags" ADD CONSTRAINT "reel_hashtags_hashtag_id_hashtags_id_fk" FOREIGN KEY ("hashtag_id") REFERENCES "public"."hashtags"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "reels" ADD CONSTRAINT "reels_creator_id_creators_id_fk" FOREIGN KEY ("creator_id") REFERENCES "public"."creators"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "idx_creators_is_india" ON "creators" USING btree ("is_india");--> statement-breakpoint
CREATE INDEX "idx_creators_type" ON "creators" USING btree ("creator_type");--> statement-breakpoint
CREATE INDEX "idx_hashtags_last_seen" ON "hashtags" USING btree ("last_seen_at");--> statement-breakpoint
CREATE INDEX "idx_rh_hashtag_id" ON "reel_hashtags" USING btree ("hashtag_id");--> statement-breakpoint
CREATE INDEX "idx_rh_reel_id" ON "reel_hashtags" USING btree ("reel_id");--> statement-breakpoint
CREATE INDEX "idx_reels_scraped_at" ON "reels" USING btree ("scraped_at");--> statement-breakpoint
CREATE INDEX "idx_reels_posted_at" ON "reels" USING btree ("posted_at");--> statement-breakpoint
CREATE INDEX "idx_reels_likes" ON "reels" USING btree ("likes");--> statement-breakpoint
CREATE INDEX "idx_reels_creator_id" ON "reels" USING btree ("creator_id");--> statement-breakpoint
CREATE INDEX "idx_reels_topic" ON "reels" USING btree ("topic");--> statement-breakpoint
CREATE INDEX "idx_reels_hook_type" ON "reels" USING btree ("hook_type");