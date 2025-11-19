import Popular from "@/components/popular/Popular";
import styles from "./popular.module.css";
import Menu from "@/components/menu/Menu";

// Force dynamic rendering
export const dynamic = "force-dynamic";

const PopularPage = () => {
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
          Top 12 most viewed and loved articles by our community
        </p>
      </div>
      <div className={styles.content}>
        <Popular page={1} showViewAll={false} limit={12} />
        <Menu showRecent={true} />
      </div>
    </div>
  );
};

export default PopularPage;
