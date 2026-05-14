import Link from "next/link"
import type { Route } from "next"

import { BestTimes } from "@/components/creators/BestTimes"
import { HookDistribution } from "@/components/creators/HookDistribution"
import { PerformanceChart } from "@/components/creators/PerformanceChart"
import { MOCK_CREATORS_FULL } from "@/lib/mock-data"
import { formatNumber, formatPercent } from "@/lib/utils"

interface CreatorProfilePageProps {
  params: Promise<{ handle: string }>
}

export default async function CreatorProfilePage({ params }: CreatorProfilePageProps) {
  const { handle } = await params
  const creator = MOCK_CREATORS_FULL.find((item) => item.handle === handle)

  if (!creator) {
    return (
      <div className="ml-[240px] min-h-screen p-6">
        <p className="font-mono text-sm text-[var(--text-muted)]">Creator not found.</p>
      </div>
    )
  }

  const related = MOCK_CREATORS_FULL.filter(
    (item) => item.handle !== creator.handle && item.creatorType === creator.creatorType
  ).slice(0, 3)

  return (
    <div className="ml-[240px] min-h-screen p-6">
      <Link
        href={"/creators" as Route}
        className="font-mono text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)]"
      >
        ← Creators / @{creator.handle}
      </Link>

      <section className="mt-4 rounded-lg border border-[var(--border-dim)] bg-[var(--bg-surface)] p-5">
        <div className="flex items-center gap-4">
          <div
            className="flex h-16 w-16 items-center justify-center rounded-full font-mono text-lg text-white"
            style={{ backgroundColor: creator.avatarColor }}
          >
            {creator.initials}
          </div>
          <div>
            <p className="font-display text-2xl text-[var(--text-primary)]">{creator.displayName}</p>
            <p className="font-mono text-xs text-[var(--text-dim)]">@{creator.handle}</p>
            <span className="mt-1 inline-block rounded border border-[var(--accent)] bg-[var(--accent-dim)] px-2 py-0.5 font-mono text-[10px] text-[var(--accent-text)]">
              {creator.creatorType}
            </span>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-4">
          <ProfileStat label="Followers" value={formatNumber(creator.followers)} />
          <ProfileStat label="Total Reels" value={formatNumber(creator.totalReels)} />
          <ProfileStat label="Avg Likes" value={formatNumber(creator.avgLikes)} />
          <ProfileStat label="Avg Eng%" value={formatPercent(creator.avgEngagement)} />
        </div>
      </section>

      <div className="mt-4">
        <PerformanceChart
          data={creator.recentLikes}
          average={creator.avgLikes}
          creatorName={creator.displayName}
          height={280}
        />
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        <HookDistribution data={creator.hookDistribution} />
        <BestTimes bestPostingDay={creator.bestPostingDay} bestPostingHour={creator.bestPostingHour} />
        <section className="rounded-lg border border-[var(--border-dim)] bg-[var(--bg-surface)] p-4">
          <p className="mb-3 font-mono text-[9px] uppercase tracking-[0.15em] text-[var(--text-dim)]">
            Related creators
          </p>
          <div className="space-y-2">
            {related.map((item) => (
              <Link
                key={item.handle}
                href={`/creators/${item.handle}` as Route}
                className="block rounded border border-[var(--border-dim)] bg-[var(--bg-raised)] p-3 hover:border-[var(--border-mid)]"
              >
                <p className="text-sm text-[var(--text-primary)]">{item.displayName}</p>
                <p className="font-mono text-[10px] text-[var(--text-dim)]">@{item.handle}</p>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

function ProfileStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded border border-[var(--border-dim)] bg-[var(--bg-raised)] p-3">
      <p className="font-mono text-[10px] text-[var(--text-dim)]">{label}</p>
      <p className="mt-1 font-mono text-lg text-[var(--accent)]">{value}</p>
    </div>
  )
}
