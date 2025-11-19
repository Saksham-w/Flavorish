"use client";
import Image from "next/image";
import React, { use, useContext } from "react";
import styles from "./themeToggle.module.css";
import { ThemeContext } from "@/context/ThemeContext";

function ThemeToggle() {
  const context = useContext(ThemeContext);

  if (!context) {
    return null;
  }

  const { theme, toggle } = context;

  return (
    <div
      className={styles.container}
      onClick={toggle}
      style={
        theme === "dark"
          ? { backgroundColor: "white" }
          : { backgroundColor: "#0f172a" }
      }
    >
      <Image src="/moon.png" alt="Moon Icon" width={14} height={14} />
      <div
        className={styles.ball}
        style={
          theme === "dark"
            ? { left: "1px", background: "#0f172a" }
            : { right: "1px", background: "white" }
        }
      ></div>
      <Image src="/sun.png" alt="Sun Icon" width={14} height={14} />
    </div>
  );
}

export default ThemeToggle;
