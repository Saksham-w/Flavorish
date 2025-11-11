import Image from "next/image";
import Link from "next/link";
import React from "react";
import styles from "./menuPosts.module.css";

const getData = async (showRecent = false) => {
  const endpoint = showRecent
    ? `http://localhost:3000/api/posts?page=1&limit=3`
    : `http://localhost:3000/api/posts?popular=true&limit=3`;

  const res = await fetch(endpoint, {
    cache: "no-store",
  });

  if (!res.ok) {
    return [];
  }

  const data = await res.json();
  return data.posts || [];
};

const MenuPosts = async ({ layout = "column", showRecent = false }) => {
  const posts = await getData(showRecent);
  const displayPosts = showRecent ? posts.slice(0, 4) : posts.slice(0, 3);

  // Function to get display name based on layout
  const getDisplayName = (name) => {
    if (!name) return "Anonymous";
    // For column layout (sidebar), show only first name
    if (layout === "column") {
      return name.split(" ")[0];
    }
    // For row layout, show full name
    return name;
  };

  return (
    <div
      className={`${styles.items} ${
        layout === "row" ? styles.itemsRow : styles.itemsColumn
      }`}
    >
      {displayPosts.map((item) => (
        <Link
          href={`/posts/${item.slug}`}
          className={styles.item}
          key={item.id}
        >
          {/* Image or placeholder at the top */}
          {item.img ? (
            <div className={styles.imageContainer}>
              {/* Category tag overlay */}
              {item.catSlug && (
                <div className={styles.categoryTag}>
                  {item.catSlug.charAt(0).toUpperCase() + item.catSlug.slice(1)}
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
                  {item.catSlug.charAt(0).toUpperCase() + item.catSlug.slice(1)}
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
                  {getDisplayName(item.user?.name)}
                </span>
              </div>
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
      ))}
    </div>
  );
};

export default MenuPosts;
