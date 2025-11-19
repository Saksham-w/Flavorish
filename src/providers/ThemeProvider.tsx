"use client";

import { ThemeContext } from "@/context/ThemeContext";
import React, { useContext, useEffect, useState, ReactNode } from "react";

interface ThemeProviderProps {
  children: ReactNode;
}

const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const context = useContext(ThemeContext);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (mounted && context) {
    return <div className={context.theme}>{children}</div>;
  }

  return null;
};

export default ThemeProvider;
