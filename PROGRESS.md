# Build Progress

## Current checkpoint: 1 — Foundation

## Done
- Frontend with mock data complete
- LLD designed (8 diagrams)
- Cursor rules files created

## In progress
- Postgres + Redis setup
- Initial schema migration

## Blocked on
- (nothing yet)

## Next steps
- Write migration: 001_creators_reels_hashtags.sql
- Write migration: 002_topics_rollups.sql
- Write migration: 003_jobs_pool.sql
- Seed script: 6 topics + 40 seed hashtags
- Verify schema with `psql \dt` and one test insert

## Decisions log
- 2026-05-15: Picked Hono over FastAPI (TS everywhere, simpler deploy)
- 2026-05-15: Picked Drizzle over Prisma (lighter, better SQL escape hatch)
- 2026-05-15: Picked R2 over S3 (cheaper egress for thumbnail serving)

## Open questions
- Do we need a separate `comments` table or is `first_comment` on reels enough?
- Apify rate limits — check with their support before scaling to 40 tags