import Menu from "@/components/Menu/Menu";
import styles from "./singlePage.module.css";
import Image from "next/image";
import Comments from "@/components/comments/Comments";
import parse from "html-react-parser";
import MenuCategories from "@/components/menuCategories/MenuCategories";

const getData = async (slug) => {
  const res = await fetch(`http://localhost:3000/api/posts/${slug}`, {
    cache: "no-store",
  });
  console.log(res);
  if (!res.ok) {
    throw new Error("Failed to fetch post");
  }
  return res.json();
};

const SinglePage = async ({ params }) => {
  const { slug } = await params;
  const data = await getData(slug);
  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        {/* Featured Image at the top */}
        {data?.img && (
          <div className={styles.imageContainer}>
            <Image src={data?.img} alt="" fill className={styles.image} />
          </div>
        )}

        {/* Title, Subtitle, and User Info */}
        <div className={styles.textContainer}>
          <h1 className={styles.title}>{data?.title}</h1>
          {data?.subtitle && (
            <h2 className={styles.subtitle}>{data.subtitle}</h2>
          )}
          <div className={styles.user}>
            {data?.user?.image && (
              <div className={styles.userImageContainer}>
                <Image
                  src={data.user.image}
                  alt=""
                  fill
                  className={styles.avatar}
                />
              </div>
            )}
            <div className={styles.userTextContainer}>
              <span className={styles.username}>{data?.user?.name}</span>
              <span className={styles.date}>
                {new Date(data?.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.post}>
          <div className={styles.description}>{parse(data?.desc || "")}</div>

          {/* Categories section between post and comments */}
          <div className={styles.categoriesSection}>
            <h2 className={styles.categoriesSubtitle}>Discover by topic</h2>
            <h1 className={styles.categoriesTitle}>Categories</h1>
            <MenuCategories />
          </div>

          <div className={styles.comment}>
            <Comments postSlug={slug} />
          </div>
        </div>
        {/* <Menu /> */}
      </div>
    </div>
  );
};

export default SinglePage;
