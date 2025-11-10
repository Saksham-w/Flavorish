import CardList from "@/components/cardList/CardList";
import styles from "./blogPage.module.css";
import Menu from "@/components/menu/Menu";

const BlogPage = ({ searchParams }) => {
  const page = parseInt(searchParams.page) || 1;
  const { cat } = searchParams;
  
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.breadcrumb}>
          <span className={styles.breadcrumbItem}>Home</span>
          <span className={styles.breadcrumbSeparator}>/</span>
          <span className={styles.breadcrumbItem}>Blog</span>
          {cat && (
            <>
              <span className={styles.breadcrumbSeparator}>/</span>
              <span className={styles.breadcrumbCurrent}>{cat}</span>
            </>
          )}
        </div>
        <h1 className={styles.title}>
          {cat ? (
            <>
              <span className={styles.titleCategory}>{cat}</span>
              <span className={styles.titleSuffix}>Articles</span>
            </>
          ) : (
            <>
              <span className={styles.titleMain}>All</span>
              <span className={styles.titleSuffix}>Blog Posts</span>
            </>
          )}
        </h1>
        <p className={styles.description}>
          {cat
            ? `Explore our collection of ${cat} articles and insights`
            : "Discover stories, thinking, and expertise from writers on any topic"}
        </p>
      </div>
      <div className={styles.content}>
        <CardList page={page} cat={cat} />
        <Menu />
      </div>
    </div>
  );
};

export default BlogPage;
