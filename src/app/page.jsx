import Link from "next/link";
import styles from "./homepage.module.css";
import Featured from "@/components/featured/Featured";
import CategoryList from "@/components/categoryList/CategoryList";
import CardList from "@/components/cardList/CardList";
import Menu from "@/components/menu/Menu";
import TopRated from "@/components/topRated/TopRated";
import Popular from "@/components/popular/Popular";

// Force dynamic rendering (don't try to static generate)
export const dynamic = "force-dynamic";

export default function Home({ searchParams }) {
  const page = parseInt(searchParams.page) || 1;
  return (
    <div className={styles.container}>
      <Featured />
      <CategoryList />
      <div className={styles.content}>
        <div className={styles.homepageSection}>
          <Popular page={1} showViewAll={true} limit={3} />
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.homepageSection}>
          <TopRated page={1} showViewAll={true} limit={3} />
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.homepageSection}>
          <CardList page={page} />
        </div>
      </div>
    </div>
  );
}
