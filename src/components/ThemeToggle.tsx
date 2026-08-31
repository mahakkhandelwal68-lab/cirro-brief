"use client";

import { useTheme } from "./ThemeProvider";

export function ThemeToggle() {
  const { theme, toggle } = useTheme();
  return (
    <button
      onClick={toggle}
      title="Toggle theme"
      className="btn-pop"
      style={{
        width: 36,
        height: 36,
        borderRadius: 10,
        border: "1px solid var(--border)",
        background: "transparent",
        color: "var(--text2)",
        fontSize: 15,
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {theme === "dark" ? "◑" : "◐"}
    </button>
  );
}
