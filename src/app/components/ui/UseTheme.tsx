"use client";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
export default function UseTheme() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const saved = Cookies.get("theme") as "light" | "dark" | undefined;
    if (saved) setTheme(saved);
  }, []);

  useEffect(() => {
    Cookies.set("theme", theme, { expires: 365 });
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const handleChangeTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return {
    theme,
    handleChangeTheme,
  };
}
