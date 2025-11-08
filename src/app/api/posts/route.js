import prisma from "@/utils/connect";
import { NextResponse } from "next/server";
import { getAuthSession } from "@/utils/auth";

export const GET = async (req) => {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page")) || 1;
  const cat = searchParams.get("cat");
  const popular = searchParams.get("popular");
  const POST_PER_PAGE = 9;

  const where = cat ? { catSlug: cat } : {};

  try {
    // If popular flag is set, return posts ordered by views
    if (popular === "true") {
      const posts = await prisma.post.findMany({
        take: 3,
        where,
        include: {
          user: true,
        },
        orderBy: {
          views: "desc",
        },
      });
      return NextResponse.json({ posts, count: posts.length }, { status: 200 });
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
    const post = await prisma.post.create({
      data: {
        ...body,
        userEmail: session.user.email,
      },
    });
    return NextResponse.json(post, { status: 200 });
  } catch (error) {
    console.error("Error creating post:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
};
