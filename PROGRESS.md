# Build Progress

## Current checkpoint: 2 — Scrape one hashtag

## Done
- docker-compose.yml at repo root
- Postgres 16 + Redis 7 running in Docker
- superliving-backend created with Hono + Drizzle + Zod + Pino
- 5 tables migrated: creators, hashtags, reels, reel_hashtags, ingestion_jobs
- 3 enums: hook_type, creator_type, job_status
- /health returns ok, /debug/schema shows all zeros (correct)
- No seed data — everything discovered from Instagram

## Decisions made
- No topics table — topic is a free-text LLM output on the reels row
- No hashtag pool — hashtags extracted from captions automatically
- Only hardcoded value: BOOTSTRAP_SEARCH_TERMS in scraper config (not in DB)

## Next steps (Checkpoint 2)
- Set up Apify account, get API token
- Write scraper that hits Instagram explore for "health" + "wellness"
- Extract all hashtags from captions
- Write normalizer: upsert creators + reels + reel_hashtags
- India filter: is_india = bio or caption contains India signals
- Verify one complete reel row in DB with correct fields