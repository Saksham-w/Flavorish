import React from "react";
import styles from "./popular.module.css";
import Card from "@/components/card/Card";
import MenuPosts from "@/components/menuPosts/MenuPosts";
import MenuCategories from "@/components/menuCategories/MenuCategories";

const getData = async () => {
  const res = await fetch(
    `http://localhost:3000/api/posts?page=1&popular=true`,
    {
      cache: "no-store",
    }
  );
  if (!res.ok) {
    throw new Error("Failed to fetch popular posts");
  }
  return res.json();
};

const PopularPage = async () => {
  const { posts } = await getData();

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.breadcrumb}>
          <span className={styles.breadcrumbItem}>Home</span>
          <span className={styles.breadcrumbSeparator}>/</span>
          <span className={styles.breadcrumbCurrent}>Popular</span>
        </div>
        <h1 className={styles.title}>
          <span className={styles.titleIcon}>🔥</span>
          <span className={styles.titleMain}>Trending</span>
          <span className={styles.titleSuffix}>Now</span>
        </h1>
        <p className={styles.description}>
          Most viewed and loved articles by our community
        </p>
      </div>
      
      <div className={styles.content}>
        <div className={styles.mainContent}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Most Viewed Posts</h2>
            <div className={styles.sectionBadge}>
              {posts?.length || 0} Articles
            </div>
          </div>
          <div className={styles.posts}>
            {posts?.slice(0, 12).map((item) => (
              <Card item={item} key={item.id} />
            ))}
          </div>
        </div>

        <div className={styles.sidebar}>
          <div className={styles.sidebarSection}>
            <span className={styles.subtitle}>Discover by topic</span>
            <h3 className={styles.sidebarTitle}>Categories</h3>
            <MenuCategories layout="column" />
          </div>

          <div className={styles.sidebarSection}>
            <span className={styles.subtitle}>Latest Updates</span>
            <h3 className={styles.sidebarTitle}>Recent Posts</h3>
            <MenuPosts withImage={true} layout="column" showRecent={true} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopularPage;
