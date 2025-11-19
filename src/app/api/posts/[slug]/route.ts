import prisma from "@/utils/connect";
import { NextResponse, NextRequest } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) => {
  const { slug } = await params;

  try {
    const post = await prisma.post.update({
      data: {
        views: {
          increment: 1,
        },
      },
      where: { slug: slug },
      include: { user: true },
    });
    return NextResponse.json(post, { status: 200 });
  } catch (error) {
    console.error("Error fetching posts:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
};
