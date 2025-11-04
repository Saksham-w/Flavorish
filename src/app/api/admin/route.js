import prisma from "@/utils/connect";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  try {
    const body = await req.json();

    const post = await prisma.post.create({
      data: {
        slug: body.slug,
        title: body.title,
        desc: body.desc,
        img: body.img || null,
        catSlug: body.catSlug,
        userEmail: body.userEmail,
      },
    });

    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    console.error("Error creating post:", error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
};
