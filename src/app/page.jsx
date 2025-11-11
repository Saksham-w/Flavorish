import Link from "next/link";
import styles from "./homepage.module.css";
import Featured from "@/components/featured/Featured";
import CategoryList from "@/components/categoryList/CategoryList";
import CardList from "@/components/cardList/CardList";
import Menu from "@/components/menu/Menu";
import TopRated from "@/components/topRated/TopRated";

export default function Home({ searchParams }) {
  const page = parseInt(searchParams.page) || 1;
  return (
    <div className={styles.container}>
      <Featured />
      <CategoryList />
      <Menu layout="row" />
      <TopRated layout="row" />
      <div className={styles.content}>
        <CardList page={page} />
      </div>
    </div>
  );
}
