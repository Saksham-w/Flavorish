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

        {/* Meta info */}
        <div className={styles.meta}>
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
                <span className={styles.username}>
                  {item.user?.name || "Anonymous"}
                </span>
              </div>

          {/* Rating stars in the middle */}
          {item.rating > 0 && (
            <div className={styles.ratingStars}>
              {[1, 2, 3, 4, 5].map((star) => (
                <svg
                  key={star}
                  className={styles.starIcon}
                  viewBox="0 0 24 24"
                  fill={star <= item.rating ? "rgb(16, 172, 157)" : "none"}
                  stroke={star <= item.rating ? "rgb(16, 172, 157)" : "var(--softTextColor)"}
                  strokeWidth="2"
                >
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
              ))}
            </div>
          )}

          <div className={styles.stats}>
            <div className={styles.statItem}>
              <svg
                className={styles.icon}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                <circle cx="12" cy="12" r="3"></circle>
              </svg>
              <span>{item.views || 0}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
