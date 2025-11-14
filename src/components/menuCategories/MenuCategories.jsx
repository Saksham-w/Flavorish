import Link from "next/link";
import React from "react";
import styles from "./menuCategories.module.css";
import { getBaseUrl } from "@/utils/api";

const getData = async () => {
  try {
    const res = await fetch(`${getBaseUrl()}/api/categories`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch categories");
    }

    return res.json();
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
};

const MenuCategories = async ({ layout = "row" }) => {
  const categories = await getData();

  // Define attractive color palette for categories
  const colorPalette = [
    { bg: "#57c4ff31", color: "#57c4ff" }, // Sky Blue
    { bg: "#da85c731", color: "#da85c7" }, // Pink
    { bg: "#7fb88133", color: "#7fb881" }, // Green
    { bg: "#ff795736", color: "#ff7957" }, // Coral
    { bg: "#ffb04f45", color: "#ffb04f" }, // Orange
    { bg: "#5e4fff31", color: "#5e4fff" }, // Purple
    { bg: "#ff6b9d31", color: "#ff6b9d" }, // Rose
    { bg: "#00d4aa31", color: "#00d4aa" }, // Teal
    { bg: "#ffc10731", color: "#ffc107" }, // Amber
    { bg: "#9c27b031", color: "#9c27b0" }, // Violet
  ];

  return (
    <div
      className={`${styles.categoryList} ${
        layout === "column" ? styles.categoryListColumn : styles.categoryListRow
      }`}
    >
      {categories.map((category, index) => {
        const colors = colorPalette[index % colorPalette.length];
        return (
          <Link
            key={category.slug}
            href={`/blog?cat=${category.slug}`}
            className={`${styles.categoryItem} ${styles[category.slug] || ""}`}
            style={{
              backgroundColor: colors.bg,
              color: colors.color,
            }}
          >
            {category.title.charAt(0).toUpperCase() + category.title.slice(1)}
          </Link>
        );
      })}
    </div>
  );
};

export default MenuCategories;
