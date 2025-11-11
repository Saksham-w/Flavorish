import Menu from "@/components/menu/Menu";
import styles from "./singlePage.module.css";
import Image from "next/image";
import Comments from "@/components/comments/Comments";
import parse from "html-react-parser";
import MenuCategories from "@/components/menuCategories/MenuCategories";

const getData = async (slug) => {
  const res = await fetch(`http://localhost:3000/api/posts/${slug}`, {
    cache: "no-store",
  });
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

          {/* Rating Display */}
          {data?.rating > 0 && (
            <div className={styles.ratingDisplay}>
              <div className={styles.starsDisplay}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill={star <= data.rating ? "rgb(16, 172, 157)" : "none"}
                    stroke={
                      star <= data.rating
                        ? "rgb(16, 172, 157)"
                        : "var(--softTextColor)"
                    }
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={styles.starIcon}
                  >
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                ))}
              </div>
              <span className={styles.ratingText}>
                {data.rating} {data.rating === 1 ? "Star" : "Stars"}
              </span>
            </div>
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

          {/* Additional Images Gallery */}
          {data?.images && data.images.length > 0 && (
            <div className={styles.imagesGallery}>
              <h3 className={styles.galleryTitle}>Image Gallery</h3>
              <div className={styles.galleryGrid}>
                {data.images.map((img, index) => (
                  <div key={index} className={styles.galleryItem}>
                    <Image
                      src={img}
                      alt={`Gallery image ${index + 1}`}
                      fill
                      className={styles.galleryImage}
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

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
