import React from "react";
import styles from "./featured.module.css";
import Link from "next/link";

function Featured() {
  return (
    <div className={styles.container}>
      <div className={styles.overlay}>
        <h1 className={styles.title}>Discover the Best Flavors of Nepal 🍲</h1>
        <div className={styles.ctaButtons}>
          <Link href="/blog" className={styles.primaryButton}>
            Explore Blogs
          </Link>
          <Link href="/popular" className={styles.secondaryButton}>
            Most Famous
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Featured;
