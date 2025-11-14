import React from "react";
import styles from "./cardList.module.css";
import Pagination from "../pagination/Pagination";
import Card from "../card/Card";
import Link from "next/link";
import { getBaseUrl } from "@/utils/api";

const getData = async (page, cat) => {
  const baseUrl = getBaseUrl();
  const res = await fetch(
    `${baseUrl}/api/posts?page=${page}&cat=${cat || ""}`,
    {
      cache: "no-store",
    }
  );
  if (!res.ok) {
    throw new Error("Failed to fetch posts");
  }
  return res.json();
};

const CardList = async ({ page, cat, showViewAll = true }) => {
  const { posts, count } = await getData(page, cat);

  const POST_PER_PAGE = 9;

  const hasPrev = POST_PER_PAGE * (page - 1) > 0;
  const hasNext = POST_PER_PAGE * (page - 1) + POST_PER_PAGE < count;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.titleWrapper}>
          <h2 className={styles.subtitle}>Recently Added</h2>
          <h1 className={styles.title}>Recent Posts</h1>
        </div>
        {showViewAll && (
          <Link href="/blog" className={styles.viewAllBtn}>
            <span>View All</span>
            <svg
              className={styles.arrow}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        )}
      </div>
      <div className={styles.posts}>
        {posts?.map((item) => (
          <Card item={item} key={item.id} />
        ))}
      </div>
      <Pagination page={page} cat={cat} hasPrev={hasPrev} hasNext={hasNext} />
    </div>
  );
};

export default CardList;
