import { Suspense } from "react"

import ExploreContent from "@/app/explore/ExploreContent"

export default function ExplorePage() {
  return (
    <Suspense
      fallback={
        <div className="ml-[240px] min-h-screen p-6">
          <div className="rounded-lg border border-[var(--border-dim)] bg-[var(--bg-surface)] p-6">
            <p className="font-mono text-sm text-[var(--text-muted)]">Loading explore...</p>
          </div>
        </div>
      }
    >
      <ExploreContent />
    </Suspense>
  )
}
