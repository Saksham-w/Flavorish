import React from "react";
import styles from "./popular.module.css";
import Pagination from "../pagination/Pagination";
import Card from "../card/Card";
import Link from "next/link";
import { getBaseUrl } from "@/utils/api";
import { Post } from "@/types";

const getData = async (
  page: number,
  limit: number | null = null
): Promise<{ posts: Post[]; count: number }> => {
  // For homepage: fetch only 3 posts without pagination
  // For popular page: fetch 9 posts with pagination
  const baseUrl = getBaseUrl();
  const endpoint = limit
    ? `${baseUrl}/api/posts?popular=true&limit=${limit}`
    : `${baseUrl}/api/posts?page=${page}&popular=true`;

  const res = await fetch(endpoint, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch popular posts");
  }
  return res.json();
};

interface PopularProps {
  page?: number;
  showViewAll?: boolean;
  limit?: number | null;
}

const Popular = async ({
  page = 1,
  showViewAll = true,
  limit = null,
}: PopularProps) => {
  const { posts, count } = await getData(page, limit);

  const POST_PER_PAGE = 9;

  const hasPrev = POST_PER_PAGE * (page - 1) > 0;
  const hasNext = POST_PER_PAGE * (page - 1) + POST_PER_PAGE < count;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.titleWrapper}>
          <h2 className={styles.subtitle}>{"What's hot"}</h2>
          <h1 className={styles.title}>Most Popular</h1>
        </div>
        {showViewAll && (
          <Link href="/popular" className={styles.viewAllBtn}>
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
      {!limit && (
        <Pagination page={page} cat="" hasPrev={hasPrev} hasNext={hasNext} />
      )}
    </div>
  );
};

export default Popular;
