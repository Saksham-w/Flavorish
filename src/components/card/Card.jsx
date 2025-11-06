import React from "react";
import styles from "./card.module.css";
import Link from "next/link";
import Image from "next/image";

export default function Card({ item }) {
  // Strip HTML tags from description for preview
  const stripHtml = (html) => {
    if (typeof window !== "undefined") {
      const tmp = document.createElement("div");
      tmp.innerHTML = html;
      return tmp.textContent || tmp.innerText || "";
    }
    // Server-side: simple regex to remove HTML tags
    return html.replace(/<[^>]*>/g, "");
  };

  const plainDesc = stripHtml(item.desc || "");

  return (
    <div className={styles.container}>
      {item.img && (
        <div className={styles.imageContainer}>
          <Image src={item.img} alt="" fill className={styles.image} />
        </div>
      )}
      <div className={styles.textContainer}>
        <div className={styles.detail}>
          <span className={styles.date}>
            {item.createdAt.substring(0, 10)} -{" "}
          </span>
          <span className={styles.category}>{item.catSlug}</span>
        </div>
        <Link href={`/posts/${item.slug}`}>
          <h1>{item.title}</h1>
        </Link>
        <p className={styles.desc}>{item.subtitle}...</p>
        <Link href={`/posts/${item.slug}`} className={styles.link}>
          Read More
        </Link>
      </div>
    </div>
  );
}
