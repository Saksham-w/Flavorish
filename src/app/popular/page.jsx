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
      <h1 className={styles.title}>Popular Posts</h1>
      <div className={styles.content}>
        <div className={styles.mainContent}>
          <h2 className={styles.sectionTitle}>Most Viewed Posts</h2>
          <div className={styles.posts}>
            {posts?.slice(0, 12).map((item) => (
              <Card item={item} key={item.id} />
            ))}
          </div>
        </div>

        <div className={styles.sidebar}>
          <h2 className={styles.subtitle}>Discover by topic</h2>
          <h1 className={styles.sidebarTitle}>Categories</h1>
          <MenuCategories layout="column" />

          <h2 className={styles.subtitle} style={{ marginTop: "48px" }}>
            Latest Updates
          </h2>
          <h1 className={styles.sidebarTitle}>Recent Posts</h1>
          <MenuPosts withImage={true} layout="column" showRecent={true} />
        </div>
      </div>
    </div>
  );
};

export default PopularPage;
