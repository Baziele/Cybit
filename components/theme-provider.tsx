"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"

type Theme = "dark" | "light" | "system"

type AccentColor = {
  name: string
  value: string
  light: string
  dark: string
}

const accentColors: AccentColor[] = [
  { name: "Blue", value: "blue", light: "221.2 83.2% 53.3%", dark: "217.2 91.2% 59.8%" },
  { name: "Purple", value: "purple", light: "262.1 83.3% 57.8%", dark: "263.4 70% 50.4%" },
  { name: "Green", value: "green", light: "142.1 76.2% 36.3%", dark: "142.1 70.6% 45.3%" },
  { name: "Orange", value: "orange", light: "24.6 95% 53.1%", dark: "20.5 90.2% 48.2%" },
  { name: "Red", value: "red", light: "0 84.2% 60.2%", dark: "0 72.2% 50.6%" },
  { name: "Pink", value: "pink", light: "322.2 84% 60.5%", dark: "316.7 75.8% 47.6%" },
  { name: "Cyan", value: "cyan", light: "188.7 85.7% 53.3%", dark: "188.7 85.7% 53.3%" },
  { name: "Yellow", value: "yellow", light: "47.9 95.8% 53.1%", dark: "47.9 95.8% 53.1%" },
]

type ThemeProviderProps = {
  children: React.ReactNode
  defaultTheme?: Theme
  defaultAccentColor?: string
  storageKey?: string
  accentStorageKey?: string
}

type ThemeProviderState = {
  theme: Theme
  accentColor: AccentColor
  setTheme: (theme: Theme) => void
  setAccentColor: (color: AccentColor) => void
  accentColors: AccentColor[]
}

const initialState: ThemeProviderState = {
  theme: "system",
  accentColor: accentColors[0],
  setTheme: () => null,
  setAccentColor: () => null,
  accentColors,
}

const ThemeProviderContext = createContext<ThemeProviderState>(initialState)

export function ThemeProvider({
  children,
  defaultTheme = "system",
  defaultAccentColor = "blue",
  storageKey = "cybit-ui-theme",
  accentStorageKey = "cybit-ui-accent",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(() => (localStorage?.getItem(storageKey) as Theme) || defaultTheme)
  const [accentColor, setAccentColor] = useState<AccentColor>(() => {
    const stored = localStorage?.getItem(accentStorageKey)
    return (
      accentColors.find((color) => color.value === stored) ||
      accentColors.find((color) => color.value === defaultAccentColor) ||
      accentColors[0]
    )
  })

  useEffect(() => {
    const root = window.document.documentElement

    root.classList.remove("light", "dark")

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"

      root.classList.add(systemTheme)
      return
    }

    root.classList.add(theme)
  }, [theme])

  useEffect(() => {
    const root = window.document.documentElement
    const isDark = theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches)

    // Set CSS custom properties for accent color
    root.style.setProperty("--primary", isDark ? accentColor.dark : accentColor.light)
    root.style.setProperty("--primary-foreground", isDark ? "222.2 84% 4.9%" : "210 40% 98%")

    // Store accent color preference
    localStorage?.setItem(accentStorageKey, accentColor.value)
  }, [accentColor, theme, accentStorageKey])

  const value = {
    theme,
    accentColor,
    setTheme: (theme: Theme) => {
      localStorage?.setItem(storageKey, theme)
      setTheme(theme)
    },
    setAccentColor: (color: AccentColor) => {
      setAccentColor(color)
    },
    accentColors,
  }

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext)

  if (context === undefined) throw new Error("useTheme must be used within a ThemeProvider")

  return context
}
