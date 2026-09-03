"use client"

import { useSyncExternalStore } from "react"
import { MoonIcon, SunIcon } from "lucide-react"
import { useTheme } from "next-themes"

const subscribe = () => () => {}
const getClientSnapshot = () => true
const getServerSnapshot = () => false

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const mounted = useSyncExternalStore(
    subscribe,
    getClientSnapshot,
    getServerSnapshot,
  )

  const isDark = theme === "dark"

  return (
    <button
      type="button"
      aria-label={mounted ? `Switch to ${isDark ? "light" : "dark"} mode` : "Toggle theme"}
      title={mounted ? `Switch to ${isDark ? "light" : "dark"} mode` : "Toggle theme"}
      disabled={!mounted}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-zinc-600 transition hover:bg-zinc-100 hover:text-zinc-950 disabled:cursor-default disabled:opacity-70 dark:text-white/65 dark:hover:bg-white/10 dark:hover:text-white"
    >
      {mounted ? (
        isDark ? <SunIcon className="h-4 w-4" aria-hidden="true" /> : <MoonIcon className="h-4 w-4" aria-hidden="true" />
      ) : null}
    </button>
  )
}
