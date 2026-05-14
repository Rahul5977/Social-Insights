"use client"

interface PaginationProps {
  page: number
  totalPages: number
  onPageChange: (page: number) => void
}

export function Pagination({ page, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null

  return (
    <div className="flex items-center justify-between rounded-lg border border-[var(--border-dim)] bg-[var(--bg-surface)] px-3 py-2">
      <p className="font-mono text-[11px] text-[var(--text-dim)]">
        Page {page} of {totalPages}
      </p>
      <div className="flex items-center gap-2">
        <button
          onClick={() => onPageChange(Math.max(1, page - 1))}
          disabled={page <= 1}
          className="rounded border border-[var(--border-dim)] px-2 py-1 font-mono text-[11px] text-[var(--text-muted)] disabled:opacity-40"
        >
          Prev
        </button>
        <button
          onClick={() => onPageChange(Math.min(totalPages, page + 1))}
          disabled={page >= totalPages}
          className="rounded border border-[var(--border-dim)] px-2 py-1 font-mono text-[11px] text-[var(--text-muted)] disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </div>
  )
}
