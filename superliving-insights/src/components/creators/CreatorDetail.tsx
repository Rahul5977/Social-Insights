"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import type { Route } from "next"

import { BestTimes } from "@/components/creators/BestTimes"
import { HookDistribution } from "@/components/creators/HookDistribution"
import { PerformanceChart } from "@/components/creators/PerformanceChart"
import type { CreatorFull } from "@/lib/types"
import { formatNumber, formatPercent } from "@/lib/utils"

interface CreatorDetailProps {
  creator: CreatorFull
  compareList: string[]
  onToggleCompare: (handle: string) => void
}

type Tab = "overview" | "hooks" | "times"

export function CreatorDetail({ creator, compareList, onToggleCompare }: CreatorDetailProps) {
  const [tab, setTab] = useState<Tab>("overview")
  const inCompare = compareList.includes(creator.handle)
  const topHook = useMemo(
    () =>
      creator.hookDistribution.reduce((best, item) => (item.percent > best.percent ? item : best)),
    [creator.hookDistribution]
  )

  return (
    <section className="flex-1 overflow-y-auto p-4">
      <div className="rounded-lg border border-[var(--border-dim)] bg-[var(--bg-surface)] p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div
              className="flex h-14 w-14 items-center justify-center rounded-full font-mono text-sm text-white"
              style={{ backgroundColor: creator.avatarColor }}
            >
              {creator.initials}
            </div>
            <div>
              <p className="font-display text-xl text-[var(--text-primary)]">{creator.displayName}</p>
              <p className="font-mono text-[11px] text-[var(--text-dim)]">@{creator.handle}</p>
              <p className="mt-1 text-xs text-[var(--text-muted)]">{creator.bio}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => onToggleCompare(creator.handle)}
              className="rounded border border-[var(--border-dim)] px-3 py-1.5 font-mono text-xs text-[var(--text-muted)]"
            >
              {inCompare ? "Remove from compare" : "Add to compare"}
            </button>
            <Link
              href={`/creators/${creator.handle}` as Route}
              className="rounded border border-[var(--accent)] px-3 py-1.5 font-mono text-xs text-[var(--accent)] hover:bg-[var(--accent-dim)]"
            >
              Open full profile
            </Link>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3 lg:grid-cols-4">
          <Stat label="Followers" value={formatNumber(creator.followers)} />
          <Stat label="Avg Likes" value={formatNumber(creator.avgLikes)} />
          <Stat label="Avg Eng%" value={formatPercent(creator.avgEngagement)} />
          <Stat label="Top Hook" value={topHook.hookType} />
        </div>

        <div className="mt-4 flex gap-1">
          {(["overview", "hooks", "times"] as Tab[]).map((item) => (
            <button
              key={item}
              onClick={() => setTab(item)}
              className={[
                "rounded-sm px-3 py-1 font-mono text-xs",
                tab === item
                  ? "bg-[var(--accent)] text-white"
                  : "border border-[var(--border-dim)] text-[var(--text-muted)]",
              ].join(" ")}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="mt-4 space-y-4">
          {tab === "overview" ? (
            <>
              <PerformanceChart
                data={creator.recentLikes}
                average={creator.avgLikes}
                creatorName={creator.displayName}
              />
              <div className="grid gap-4 lg:grid-cols-2">
                <HookDistribution data={creator.hookDistribution} />
                <BestTimes
                  bestPostingDay={creator.bestPostingDay}
                  bestPostingHour={creator.bestPostingHour}
                />
              </div>
            </>
          ) : null}
          {tab === "hooks" ? <HookDistribution data={creator.hookDistribution} /> : null}
          {tab === "times" ? (
            <BestTimes bestPostingDay={creator.bestPostingDay} bestPostingHour={creator.bestPostingHour} />
          ) : null}
        </div>
      </div>
    </section>
  )
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded border border-[var(--border-dim)] bg-[var(--bg-raised)] p-3">
      <p className="font-mono text-[10px] text-[var(--text-dim)]">{label}</p>
      <p className="mt-1 font-mono text-lg text-[var(--accent)]">{value}</p>
    </div>
  )
}
