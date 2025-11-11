import React from "react";
import styles from "./topRated.module.css";
import Link from "next/link";
import MenuPosts from "../menuPosts/MenuPosts";

const TopRated = ({ layout = "row" }) => {
  return (
    <div
      className={`${styles.container} ${
        layout === "row" ? styles.fullWidth : ""
      }`}
    >
      <div className={styles.header}>
        <div>
          <h2 className={styles.subtitle}>⭐ Highest Rated</h2>
          <h1 className={styles.title}>Top Rated Posts</h1>
        </div>
        <Link href="/toprated" className={styles.viewAllButton}>
          <span>View All</span>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
      <MenuPosts withImage={false} layout={layout} showTopRated={true} />
    </div>
  );
};

export default TopRated;
