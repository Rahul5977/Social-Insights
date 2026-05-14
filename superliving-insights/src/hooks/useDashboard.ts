"use client"

import { useState } from "react"

import type { TimeWindow } from "@/lib/types"

export function useDashboard() {
  const [timeWindow, setTimeWindow] = useState<TimeWindow>("24h")
  const [activeTopic, setActiveTopic] = useState<string>("t1")
  const [showToast, setShowToast] = useState(false)

  const triggerToast = () => {
    setShowToast(true)
    window.setTimeout(() => {
      setShowToast(false)
    }, 3000)
  }

  return {
    timeWindow,
    setTimeWindow,
    activeTopic,
    setActiveTopic,
    showToast,
    triggerToast,
  }
}
