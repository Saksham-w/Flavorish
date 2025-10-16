"use client";

import { createContext, useEffect, useState } from "react";

export const ThemeContext = createContext();

const getFromLocalStorage = () => {
  // Ensure this runs only in the browser and handle environments
  // (like SSR or strict private modes) where localStorage may be unavailable.
  if (typeof window !== "undefined") {
    try {
      const value = localStorage.getItem("theme");
      return value || "light";
    } catch (e) {
      // localStorage can throw (e.g. Safari private mode). Fall back to default.
      return "light";
    }
  }

  // On the server, return the default theme.
  return "light";
};

export const ThemeContextProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    return getFromLocalStorage();
  });

  const toggle = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  useEffect(() => {
    // Only attempt to write when running in the browser and localStorage is available.
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("theme", theme);
      } catch (e) {
        // Ignore write errors (e.g., storage disabled/private mode)
      }
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggle }}>{children}</ThemeContext.Provider>
  );
};
