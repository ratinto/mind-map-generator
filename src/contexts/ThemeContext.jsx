import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

const ThemeContext = createContext({
  theme: "system",
  isDark: false,
  setTheme: () => {},
  toggleTheme: () => {},
});

function getSystemPrefersDark() {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") return false;
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

function applyDocumentClass(isDark) {
  const root = document.documentElement;
  if (!root) return;
  if (isDark) {
    root.classList.add("dark");
  } else {
    root.classList.remove("dark");
  }
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    try {
      const stored = localStorage.getItem("theme");
      return stored === "light" || stored === "dark" ? stored : "system";
    } catch {
      return "system";
    }
  });

  const isDark = useMemo(() => {
    if (theme === "light") return false;
    if (theme === "dark") return true;
    return getSystemPrefersDark();
  }, [theme]);

  useEffect(() => {
    applyDocumentClass(isDark);
    try {
      if (theme === "system") {
        localStorage.removeItem("theme");
      } else {
        localStorage.setItem("theme", theme);
      }
    } catch {}
  }, [theme, isDark]);

  useEffect(() => {
    if (typeof window !== "undefined" && typeof window.matchMedia === "function") {
      const mql = window.matchMedia("(prefers-color-scheme: dark)");
      const handler = () => {
        if (theme === "system") {
          applyDocumentClass(mql.matches);
        }
      };
      mql.addEventListener?.("change", handler);
      // Safari fallback
      mql.addListener?.(handler);
      return () => {
        mql.removeEventListener?.("change", handler);
        mql.removeListener?.(handler);
      };
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const value = useMemo(() => ({ theme, isDark, setTheme, toggleTheme }), [theme, isDark]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  return useContext(ThemeContext);
}


