import Image from "next/image";
import Link from "next/link";
import React from "react";
import styles from "./menuPosts.module.css";

const getData = async (showRecent = false) => {
  // Fetch posts for sidebar display - either recent or popular
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const endpoint = showRecent
    ? `${baseUrl}/api/posts?page=1&limit=3`
    : `${baseUrl}/api/posts?popular=true&limit=3`;

  const res = await fetch(endpoint, {
    cache: "no-store",
  });

  if (!res.ok) {
    return [];
  }

  const data = await res.json();
  return data.posts || [];
};

const MenuPosts = async ({ showRecent = false }) => {
  const posts = await getData(showRecent);

  // Get first name only for compact sidebar display
  const getFirstName = (name) => {
    if (!name) return "Anonymous";
    return name.split(" ")[0];
  };

  return (
    <div className={styles.itemsColumn}>
      {posts.map((item) => (
        <Link
          href={`/posts/${item.slug}`}
          className={styles.item}
          key={item.id}
        >
          {/* Image or placeholder */}
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
                  {getFirstName(item.user?.name)}
                </span>
              </div>

              <div className={styles.stats}>
                {/* Show single star with rating number */}
                {item.rating > 0 && (
                  <div className={styles.statItem}>
                    <svg
                      className={styles.icon}
                      viewBox="0 0 24 24"
                      fill="rgb(16, 172, 157)"
                      stroke="rgb(16, 172, 157)"
                      strokeWidth="2"
                    >
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                    <span>{item.rating}</span>
                  </div>
                )}
                {/* Show views */}
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
