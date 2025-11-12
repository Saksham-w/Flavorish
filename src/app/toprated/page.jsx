import TopRated from "@/components/topRated/TopRated";
import styles from "./toprated.module.css";
import Menu from "@/components/menu/Menu";

const TopRatedPage = ({ searchParams }) => {
  const page = parseInt(searchParams.page) || 1;

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
          <span className={styles.titleMain}>Top</span>
          <span className={styles.titleSuffix}>Picks</span>
        </h1>
        <p className={styles.description}>
          Highest rated articles handpicked by our community
        </p>
      </div>
      <div className={styles.content}>
        <TopRated page={page} showViewAll={false} />
        <Menu />
      </div>
    </div>
  );
};

export default TopRatedPage;
