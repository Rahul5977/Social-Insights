import { Suspense } from "react"

import HashtagsContent from "@/app/hashtags/HashtagsContent"

export default function HashtagsPage() {
  return (
    <Suspense
      fallback={
        <div className="ml-[240px] min-h-screen p-6">
          <div className="rounded-lg border border-[var(--border-dim)] bg-[var(--bg-surface)] p-6">
            <p className="font-mono text-sm text-[var(--text-muted)]">Loading hashtags...</p>
          </div>
        </div>
      }
    >
      <HashtagsContent />
    </Suspense>
  )
}
