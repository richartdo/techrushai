"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useSyncExternalStore } from "react";

const storageKey = "techrushai-theme";

export function ThemeToggle() {
  const isDark = useSyncExternalStore(
    (notify) => {
      window.addEventListener("storage", notify);
      window.addEventListener("techrushai-theme-change", notify);
      return () => {
        window.removeEventListener("storage", notify);
        window.removeEventListener("techrushai-theme-change", notify);
      };
    },
    () => window.localStorage.getItem(storageKey) !== "light",
    () => true,
  );

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  function toggleTheme() {
    const nextDark = !isDark;
    window.localStorage.setItem(storageKey, nextDark ? "dark" : "light");
    window.dispatchEvent(new Event("techrushai-theme-change"));
  }

  return <button className="theme-toggle" type="button" onClick={toggleTheme} aria-label={`Switch to ${isDark ? "light" : "dark"} mode`} title={`Switch to ${isDark ? "light" : "dark"} mode`}>
    {isDark ? <Sun size={18} aria-hidden="true" /> : <Moon size={18} aria-hidden="true" />}
    <span>{isDark ? "Light mode" : "Dark mode"}</span>
  </button>;
}
