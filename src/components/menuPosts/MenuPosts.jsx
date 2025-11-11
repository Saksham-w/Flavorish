import Image from "next/image";
import Link from "next/link";
import React from "react";
import styles from "./menuPosts.module.css";

const getData = async (
  showRecent = false,
  showPopular = false,
  showTopRated = false
) => {
  let endpoint = `http://localhost:3000/api/posts?page=1&limit=3`;

  if (showTopRated) {
    endpoint = `http://localhost:3000/api/posts?toprated=true&limit=3`;
  } else if (showPopular) {
    endpoint = `http://localhost:3000/api/posts?popular=true&limit=3`;
  } else if (showRecent) {
    endpoint = `http://localhost:3000/api/posts?page=1&limit=3`;
  } else {
    // Default to popular
    endpoint = `http://localhost:3000/api/posts?popular=true&limit=3`;
  }

  const res = await fetch(endpoint, {
    cache: "no-store",
  });

  if (!res.ok) {
    return [];
  }

  const data = await res.json();
  return data.posts || [];
};

const MenuPosts = async ({
  layout = "column",
  showRecent = false,
  showPopular = false,
  showTopRated = false,
}) => {
  const posts = await getData(showRecent, showPopular, showTopRated);
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

              {/* For row layout (homepage), show 5 physical stars in the middle */}
              {layout === "row" && item.rating > 0 && (
                <div className={styles.ratingStars}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      className={styles.starIcon}
                      viewBox="0 0 24 24"
                      fill={star <= item.rating ? "rgb(16, 172, 157)" : "none"}
                      stroke={
                        star <= item.rating
                          ? "rgb(16, 172, 157)"
                          : "var(--softTextColor)"
                      }
                      strokeWidth="2"
                    >
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                  ))}
                </div>
              )}

              <div className={styles.stats}>
                {/* For column layout (sidebar), show single star with number */}
                {layout === "column" && item.rating > 0 && (
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
                {/* Always show views */}
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
