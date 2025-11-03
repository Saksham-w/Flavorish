import prisma from "@/utils/connect";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page"));
  const POST_PER_PAGE = 2;
  try {
    const posts = await prisma.post.findMany({
      skip: (page - 1) * POST_PER_PAGE,
      take: POST_PER_PAGE,
    });
    return NextResponse.json(posts, { status: 200 });
  } catch (error) {
    console.error("Error fetching posts:", error);
    return NextResponse.json(
      JSON.stringify({ message: "Internal Server Error" }),
      { status: 500 }
    );
  }
};
