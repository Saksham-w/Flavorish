import CardList from "@/components/cardList/CardList";
import styles from "./blogPage.module.css";
import Menu from "@/components/menu/Menu";

// Force dynamic rendering
export const dynamic = "force-dynamic";

interface BlogPageProps {
  searchParams: Promise<{ page?: string; cat?: string }>;
}

const BlogPage = async ({ searchParams }: BlogPageProps) => {
  const params = await searchParams;
  const page = parseInt(params.page || "1");
  const cat = params.cat || "";

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
            ? `Explore our collection of ${cat} places reviews and insights`
            : "Explore tasty stories, honest restaurant reviews, and foodie tips."}
        </p>
      </div>
      <div className={styles.content}>
        <CardList page={page} cat={cat} showViewAll={false} postsPerPage={8} />
        <Menu />
      </div>
    </div>
  );
};

export default BlogPage;
