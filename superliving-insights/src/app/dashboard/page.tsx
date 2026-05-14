"use client"

import { ActivityChart } from "@/components/dashboard/ActivityChart"
import { ExplodingNow } from "@/components/dashboard/ExplodingNow"
import { PostingHeatmap } from "@/components/dashboard/PostingHeatmap"
import { RisingHashtags } from "@/components/dashboard/RisingHashtags"
import { TopCreators } from "@/components/dashboard/TopCreators"
import { TopReelsTable } from "@/components/dashboard/TopReelsTable"
import { TrendingAudio } from "@/components/dashboard/TrendingAudio"
import { TrendingTopics } from "@/components/dashboard/TrendingTopics"
import { VelocityChart } from "@/components/dashboard/VelocityChart"
import { TopBar } from "@/components/layout/TopBar"
import { useDashboard } from "@/hooks/useDashboard"
import {
  MOCK_ACTIVITY,
  MOCK_AUDIO,
  MOCK_CREATORS,
  MOCK_HASHTAGS,
  MOCK_HEATMAP,
  MOCK_REELS,
  MOCK_TRENDING_TOPICS,
  MOCK_VELOCITY,
} from "@/lib/mock-data"

export default function DashboardPage() {
  const {
    timeWindow,
    setTimeWindow,
    activeTopic,
    setActiveTopic,
    showToast,
    triggerToast,
  } = useDashboard()

  return (
    <div className="relative ml-[240px] flex min-h-screen flex-col">
      <TopBar
        timeWindow={timeWindow}
        onTimeWindowChange={setTimeWindow}
        onFetchNow={triggerToast}
      />
      <main className="space-y-6 overflow-y-auto px-6 py-5">
        <ExplodingNow topics={MOCK_TRENDING_TOPICS.slice(0, 3)} />
        <TrendingTopics
          topics={MOCK_TRENDING_TOPICS}
          activeTopic={activeTopic}
          setActiveTopic={setActiveTopic}
        />

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-[65%_35%]">
          <TopReelsTable reels={MOCK_REELS} />
          <RisingHashtags hashtags={MOCK_HASHTAGS} />
        </div>

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
          <VelocityChart data={MOCK_VELOCITY} />
          <TopCreators creators={MOCK_CREATORS} />
          <TrendingAudio tracks={MOCK_AUDIO} />
        </div>

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-[60%_40%]">
          <PostingHeatmap matrix={MOCK_HEATMAP} />
          <ActivityChart data={MOCK_ACTIVITY} />
        </div>
      </main>

      {showToast ? (
        <div className="fixed bottom-5 right-5 w-[280px] rounded-lg border border-[var(--border-dim)] bg-[var(--bg-raised)] p-4">
          <p className="font-display text-sm text-[var(--text-primary)]">Fetch triggered</p>
          <p className="mt-1 font-mono text-[11px] text-[var(--text-muted)]">
            Mock refresh started for {timeWindow} window.
          </p>
        </div>
      ) : null}
    </div>
  )
}
