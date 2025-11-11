import React from "react";
import styles from "./CategoryList.module.css";
import Link from "next/link";

const CategoryList = () => {
  // Sample categories data
  const categories = [
    {
      slug: "style",
      title: "Style",
      img: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=100&h=100&fit=crop",
    },
    {
      slug: "fashion",
      title: "Fashion",
      img: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=100&h=100&fit=crop",
    },
    {
      slug: "food",
      title: "Food",
      img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=100&h=100&fit=crop",
    },
    {
      slug: "travel",
      title: "Travel",
      img: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=100&h=100&fit=crop",
    },
    {
      slug: "general",
      title: "General",
      img: "https://images.unsplash.com/photo-1432821596592-e2c18b78144f?w=100&h=100&fit=crop",
    },
    {
      slug: "coding",
      title: "Coding",
      img: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=100&h=100&fit=crop",
    },
  ];

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Explore Categories</h2>
      <div className={styles.categories}>
        {categories.map((item) => (
          <Link
            key={item.slug}
            href={`/blog?cat=${item.slug}`}
            className={styles.category}
          >
            <div className={styles.iconWrapper}>
              <img src={item.img} alt={item.title} className={styles.image} />
            </div>
            <span className={styles.label}>{item.title}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
