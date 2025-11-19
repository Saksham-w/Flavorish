import prisma from "@/utils/connect";
import { NextResponse, NextRequest } from "next/server";

export const GET = async (request: NextRequest) => {
  try {
    const categories = await prisma.category.findMany();
    return NextResponse.json(categories, { status: 200 });
  } catch (error) {
    console.error("Error fetching categories:", error);
    return NextResponse.json(
      JSON.stringify({ message: "Internal Server Error" }),
      { status: 500 }
    );
  }
};
