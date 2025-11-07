import Image from "next/image";
import Link from "next/link";
import React from "react";
import styles from "./menuPosts.module.css";

const getData = async () => {
  const res = await fetch("http://localhost:3000/api/posts?popular=true", {
    cache: "no-store",
  });

  if (!res.ok) {
    return [];
  }

  const data = await res.json();
  return data.posts || [];
};

const MenuPosts = async ({ withImage }) => {
  const posts = await getData();
  const topPosts = posts.slice(0, 3); // Get top 3 posts

  return (
    <div className={styles.items}>
      {topPosts.map((item) => (
        <Link
          href={`/posts/${item.slug}`}
          className={styles.item}
          key={item.id}
        >
          {/* Image at the top */}
          {item.img && (
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
          )}

          {/* Content below image */}
          <div className={styles.content}>
            {/* Title */}
            <h2 className={styles.title}>{item.title}</h2>

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
                <span className={styles.username}>
                  {item.user?.name || "Anonymous"}
                </span>
              </div>
              <div className={styles.views}>
                <span>{item.views || 0} views</span>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default MenuPosts;
