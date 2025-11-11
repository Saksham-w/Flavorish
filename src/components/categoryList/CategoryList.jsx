import React from "react";
import styles from "./categoryList.module.css";
import Link from "next/link";
import Image from "next/image";

const getData = async () => {
  try {
    const res = await fetch(`http://localhost:3000/api/categories`, {
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

const CategoryList = async () => {
  const categories = await getData();

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.subtitle}>Discover by topic</h2>
        <h1 className={styles.title}>Explore Categories</h1>
      </div>
      <div className={styles.categories}>
        {categories.map((item) => (
          <Link
            key={item.slug}
            href={`/blog?cat=${item.slug}`}
            className={styles.category}
          >
            <div className={styles.iconWrapper}>
              {item.img ? (
                <Image
                  src={item.img}
                  alt={item.title}
                  fill
                  className={styles.image}
                  sizes="48px"
                />
              ) : (
                <div className={styles.placeholder}>
                  {item.title.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
            <span className={styles.label}>
              {item.title.charAt(0).toUpperCase() + item.title.slice(1)}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
