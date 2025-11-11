import prisma from "@/utils/connect";
import { NextResponse } from "next/server";
import { getAuthSession } from "@/utils/auth";
import { sendNewPostNotification } from "@/utils/newsletter";

export const GET = async (req) => {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page")) || 1;
  const cat = searchParams.get("cat");
  const popular = searchParams.get("popular");
  const toprated = searchParams.get("toprated");
  const limit = parseInt(searchParams.get("limit"));
  const POST_PER_PAGE = limit || 9;

  const where = cat ? { catSlug: cat } : {};

  try {
    // If toprated flag is set, return posts ordered by rating
    if (toprated === "true") {
      const topratedLimit = limit || POST_PER_PAGE;
      
      // Use pagination if limit is not explicitly set
      if (!limit) {
        const [posts, count] = await prisma.$transaction([
          prisma.post.findMany({
            take: POST_PER_PAGE,
            skip: POST_PER_PAGE * (page - 1),
            where: {
              ...where,
              rating: {
                gt: 0, // Only get posts with rating greater than 0
              },
            },
            include: {
              user: true,
            },
            orderBy: [
              {
                rating: "desc", // Primary sort: highest rating first
              },
              {
                createdAt: "desc", // Secondary sort: most recent first for same ratings
              },
            ],
          }),
          prisma.post.count({
            where: {
              ...where,
              rating: {
                gt: 0,
              },
            },
          }),
        ]);
        return NextResponse.json({ posts, count }, { status: 200 });
      } else {
        // If limit is explicitly set (for homepage sections)
        const posts = await prisma.post.findMany({
          take: topratedLimit,
          where: {
            ...where,
            rating: {
              gt: 0,
            },
          },
          include: {
            user: true,
          },
          orderBy: [
            {
              rating: "desc",
            },
            {
              createdAt: "desc",
            },
          ],
        });
        return NextResponse.json({ posts, count: posts.length }, { status: 200 });
      }
    }

    // If popular flag is set, return posts ordered by views
    if (popular === "true") {
      const popularLimit = limit || POST_PER_PAGE;
      
      // Use pagination if limit is not explicitly set
      if (!limit) {
        const [posts, count] = await prisma.$transaction([
          prisma.post.findMany({
            take: POST_PER_PAGE,
            skip: POST_PER_PAGE * (page - 1),
            where,
            include: {
              user: true,
            },
            orderBy: [
              {
                views: "desc", // Primary sort: highest views first
              },
              {
                createdAt: "desc", // Secondary sort: most recent first for same views
              },
            ],
          }),
          prisma.post.count({ where }),
        ]);
        return NextResponse.json({ posts, count }, { status: 200 });
      } else {
        // If limit is explicitly set (for homepage sections)
        const posts = await prisma.post.findMany({
          take: popularLimit,
          where,
          include: {
            user: true,
          },
          orderBy: [
            {
              views: "desc",
            },
            {
              createdAt: "desc",
            },
          ],
        });
        return NextResponse.json({ posts, count: posts.length }, { status: 200 });
      }
    }

    // Otherwise, return paginated posts ordered by creation date
    const [posts, count] = await prisma.$transaction([
      prisma.post.findMany({
        take: POST_PER_PAGE,
        skip: POST_PER_PAGE * (page - 1),
        where,
        include: {
          user: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      }),
      prisma.post.count({ where }),
    ]);
    return NextResponse.json({ posts, count }, { status: 200 });
  } catch (error) {
    console.error("Error fetching posts:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
};

//CREATE A POST
export const POST = async (req) => {
  const session = await getAuthSession();
  if (!session?.user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    console.log("Received body:", body);

    const { title, desc, img, images, rating, slug, catSlug, subtitle } = body;

    const postData = {
      title,
      desc,
      img: img || "",
      images: images || [],
      slug,
      catSlug,
      userEmail: session.user.email,
    };

    // Add optional fields only if they exist
    if (subtitle) postData.subtitle = subtitle;
    if (rating !== undefined && rating !== null) {
      postData.rating = parseInt(rating);
    }

    console.log("Creating post with data:", postData);

    const post = await prisma.post.create({
      data: postData,
    });

    // Send newsletter notification to all subscribers
    // This runs in the background and won't block the response
    sendNewPostNotification(post).catch((error) => {
      console.error("Failed to send newsletter:", error);
      // Don't fail the post creation if newsletter fails
    });

    return NextResponse.json(post, { status: 200 });
  } catch (error) {
    console.error("Error creating post:", error);
    console.error("Error details:", error.message);
    console.error("Error stack:", error.stack);
    return NextResponse.json(
      { message: "Internal Server Error", error: error.message },
      { status: 500 }
    );
  }
};
