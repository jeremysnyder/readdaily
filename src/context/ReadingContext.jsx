import React, {
  createContext,
  use,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react"
import readingPlanData from "virtual:reading-plan"

export const isWeekend = (date) => {
  const day = (date instanceof Date ? date : new Date(date)).getDay()
  return day === 0 || day === 6
}

export const getIsoWeek = (date) => {
  const d = new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
  )
  const dayNum = d.getUTCDay() || 7
  d.setUTCDate(d.getUTCDate() + 4 - dayNum)
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1))
  return Math.ceil(((d - yearStart) / 86400000 + 1) / 7)
}

export const addDays = (date, days) => {
  const next = new Date(date)
  next.setDate(next.getDate() + days)
  return next
}

export const formatTitleDate = (date) =>
  new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    month: "long",
    day: "numeric",
  }).format(date)

const readingDay = (date) => {
  if (isWeekend(date)) return null
  const readingsPerWeek = 5
  const week = getIsoWeek(date) - 1 // Week should be zero based for math
  return week * readingsPerWeek + date.getDay()
}

export const ReadingContext = createContext()

export function ReadingProvider({ children }) {
  const [loadedDay, setLoadedDay] = useState(() => new Date())
  const [loading, setLoading] = useState(false)
  const [showConfig, setShowConfig] = useState(false)
  const [planTimeframe, setPlanTimeframe] = useState(
    () => localStorage.getItem("readDaily-planType") || "1"
  )
  const [themeMode, setThemeMode] = useState(
    () => localStorage.getItem("readDaily-themeMode") || "system"
  )
  const [systemPrefersDark, setSystemPrefersDark] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
  )

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
    const handleChange = (e) => setSystemPrefersDark(e.matches)
    mediaQuery.addEventListener("change", handleChange)
    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [])

  const resolvedTheme =
    themeMode === "system" ? (systemPrefersDark ? "dark" : "light") : themeMode

  useEffect(() => {
    document.documentElement.dataset.theme = resolvedTheme
  }, [resolvedTheme])

  const data = useMemo(() => {
    const day = readingDay(loadedDay)
    const dayReadings = day ? readingPlanData[String(day)] || {} : {}
    return { date: loadedDay, ...dayReadings }
  }, [loadedDay])

  const changeDay = useCallback((day) => {
    setLoadedDay(day instanceof Date ? new Date(day) : new Date(day))
  }, [])

  const prevDay = useCallback(() => {
    setLoadedDay((prev) => addDays(prev, -1))
  }, [])

  const nextDay = useCallback(() => {
    setLoadedDay((prev) => addDays(prev, 1))
  }, [])

  const loadPlanType = useCallback((payload) => {
    localStorage.setItem("readDaily-planType", payload)
    setPlanTimeframe(payload)
  }, [])

  const updateThemeMode = useCallback((mode) => {
    localStorage.setItem("readDaily-themeMode", mode)
    setThemeMode(mode)
  }, [])

  const value = useMemo(
    () => ({
      data,
      loading,
      setLoading,
      loadedDay,
      changeDay,
      prevDay,
      nextDay,
      planTimeframe,
      loadPlanType,
      showConfig,
      setShowConfig,
      themeMode,
      resolvedTheme,
      updateThemeMode,
    }),
    [
      data,
      loading,
      loadedDay,
      changeDay,
      prevDay,
      nextDay,
      planTimeframe,
      loadPlanType,
      showConfig,
      themeMode,
      resolvedTheme,
      updateThemeMode,
    ]
  )

  return <ReadingContext value={value}>{children}</ReadingContext>
}

export const useReading = () => use(ReadingContext)
