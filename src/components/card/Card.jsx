import React from "react";
import styles from "./card.module.css";
import Link from "next/link";
import Image from "next/image";

export default function Card({ item }) {
  // Capitalize first letter of category
  const capitalizeCategory = (category) => {
    if (!category) return "";
    return category.charAt(0).toUpperCase() + category.slice(1);
  };

  return (
    <Link href={`/posts/${item.slug}`} className={styles.container}>
      {/* Image or placeholder at the top */}
      {item.img ? (
        <div className={styles.imageContainer}>
          {/* Category tag overlay */}
          {item.catSlug && (
            <div className={styles.categoryTag}>
              {capitalizeCategory(item.catSlug)}
            </div>
          )}
          <Image
            src={item.img}
            alt={item.title}
            fill
            className={styles.image}
          />
        </div>
      ) : (
        <div className={styles.placeholderContainer}>
          {/* Category tag overlay */}
          {item.catSlug && (
            <div className={styles.categoryTag}>
              {capitalizeCategory(item.catSlug)}
            </div>
          )}
          {/* Centered title when no image */}
          <h2 className={styles.placeholderTitle}>{item.title}</h2>
        </div>
      )}

      {/* Content below image */}
      <div className={styles.content}>
        {/* Title (only if image exists, otherwise shown in placeholder) */}
        {item.img && <h2 className={styles.title}>{item.title}</h2>}

        {/* Username and Views row */}
        <div className={styles.footer}>
          <div className={styles.author}>
            {item.user?.image && (
              <div className={styles.avatarContainer}>
                <Image
                  src={item.user.image}
                  alt={item.user.name}
                  fill
                  className={styles.avatar}
                />
              </div>
            )}
            <span className={styles.username}>{item.user?.name}</span>
          </div>
          <div className={styles.views}>
            <span>{item.views || 0} views</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
