import React from "react";
import styles from "./toprated.module.css";
import Card from "@/components/card/Card";
import MenuPosts from "@/components/menuPosts/MenuPosts";
import MenuCategories from "@/components/menuCategories/MenuCategories";
import Pagination from "@/components/pagination/Pagination";

const getData = async (page) => {
  const res = await fetch(
    `http://localhost:3000/api/posts?page=${page}&toprated=true`,
    {
      cache: "no-store",
    }
  );
  if (!res.ok) {
    throw new Error("Failed to fetch top rated posts");
  }
  return res.json();
};

const TopRatedPage = async ({ searchParams }) => {
  const page = parseInt(searchParams.page) || 1;
  const { posts, count } = await getData(page);

  const POST_PER_PAGE = 9;
  const hasPrev = POST_PER_PAGE * (page - 1) > 0;
  const hasNext = POST_PER_PAGE * (page - 1) + POST_PER_PAGE < count;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.breadcrumb}>
          <span className={styles.breadcrumbItem}>Home</span>
          <span className={styles.breadcrumbSeparator}>/</span>
          <span className={styles.breadcrumbCurrent}>Top Rated</span>
        </div>
        <h1 className={styles.title}>
          <span className={styles.titleIcon}>⭐</span>
          <span className={styles.titleMain}>Top Rated</span>
          <span className={styles.titleSuffix}>Posts</span>
        </h1>
        <p className={styles.description}>
          Highest rated articles handpicked by our community
        </p>
      </div>

      <div className={styles.content}>
        <div className={styles.mainContent}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Best Rated Posts</h2>
            {/* <div className={styles.sectionBadge}>
              {count || 0} Articles
            </div> */}
          </div>
          <div className={styles.posts}>
            {posts?.map((item) => (
              <Card item={item} key={item.id} />
            ))}
          </div>
          <Pagination page={page} hasPrev={hasPrev} hasNext={hasNext} />
        </div>

        <div className={styles.sidebar}>
          <div className={styles.sidebarSection}>
            <span className={styles.subtitle}>Discover by topic</span>
            <h3 className={styles.sidebarTitle}>Categories</h3>
            <MenuCategories layout="column" />
          </div>

          <div className={styles.sidebarSection}>
            <span className={styles.subtitle}>Most Viewed</span>
            <h3 className={styles.sidebarTitle}>Popular Posts</h3>
            <MenuPosts withImage={true} layout="column" showPopular={true} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopRatedPage;
