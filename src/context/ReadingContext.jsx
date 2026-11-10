import {
  createContext,
  use,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react"
import readingPlanData from "virtual:reading-plan"

export const isWeekend = (date) => {
  const day = date.getDay()
  return day === 0 || day === 6
}

const getIsoWeek = (date) => {
  const d = new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
  )
  const dayNum = d.getUTCDay() || 7
  d.setUTCDate(d.getUTCDate() + 4 - dayNum)
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1))
  return Math.ceil(((d - yearStart) / 86400000 + 1) / 7)
}

const addDays = (date, days) => {
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
  return (getIsoWeek(date) - 1) * 5 + date.getDay()
}

export const ACCENT_COLORS = {
  gray: {
    label: "Dark Gray",
    main: "#37474f",
    light: "#62727b",
    dark: "#102027",
  },
  blue: {
    label: "Blue",
    main: "#1976d2",
    light: "#42a5f5",
    dark: "#1565c0",
  },
  rust: {
    label: "Rust",
    main: "#a0522d",
    light: "#c17953",
    dark: "#7c3b1b",
  },
  maroon: {
    label: "Maroon",
    main: "#7b1e26",
    light: "#a3464c",
    dark: "#530b12",
  },
}

const ReadingContext = createContext()

export function ReadingProvider({ children }) {
  const [loadedDay, setLoadedDay] = useState(() => new Date())
  const [showConfig, setShowConfig] = useState(false)
  const [planTimeframe, setPlanTimeframe] = useState(
    () => localStorage.getItem("readDaily-planType") || "1"
  )
  const [themeMode, setThemeMode] = useState(
    () => localStorage.getItem("readDaily-themeMode") || "system"
  )
  const [accentColor, setAccentColor] = useState(() => {
    const saved = localStorage.getItem("readDaily-accentColor")
    return saved && ACCENT_COLORS[saved] ? saved : "gray"
  })
  const [systemPrefersDark, setSystemPrefersDark] = useState(
    () => window.matchMedia("(prefers-color-scheme: dark)").matches
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

  useEffect(() => {
    const palette = ACCENT_COLORS[accentColor] || ACCENT_COLORS.gray
    const rootStyle = document.documentElement.style
    rootStyle.setProperty("--accent-color", palette.main)
    rootStyle.setProperty("--accent-light", palette.light)
    rootStyle.setProperty("--accent-dark", palette.dark)
    const metaThemeColor = document.querySelector('meta[name="theme-color"]')
    if (metaThemeColor) {
      metaThemeColor.setAttribute("content", palette.main)
    }
  }, [accentColor])

  const data = useMemo(() => {
    const day = readingDay(loadedDay)
    return day ? readingPlanData[day] || {} : {}
  }, [loadedDay])

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

  const updateAccentColor = useCallback((colorKey) => {
    if (ACCENT_COLORS[colorKey]) {
      localStorage.setItem("readDaily-accentColor", colorKey)
      setAccentColor(colorKey)
    }
  }, [])

  const value = useMemo(
    () => ({
      data,
      loadedDay,
      prevDay,
      nextDay,
      planTimeframe,
      loadPlanType,
      showConfig,
      setShowConfig,
      themeMode,
      updateThemeMode,
      accentColor,
      updateAccentColor,
    }),
    [
      data,
      loadedDay,
      prevDay,
      nextDay,
      planTimeframe,
      loadPlanType,
      showConfig,
      themeMode,
      updateThemeMode,
      accentColor,
      updateAccentColor,
    ]
  )

  return <ReadingContext value={value}>{children}</ReadingContext>
}

export const useReading = () => use(ReadingContext)
