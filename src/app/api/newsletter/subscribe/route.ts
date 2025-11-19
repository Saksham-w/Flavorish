import { NextResponse, NextRequest } from "next/server";
import prisma from "@/utils/connect";
import { Resend } from "resend";
import WelcomeEmail from "@/emails/WelcomeEmail";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    // Validate email
    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { error: "Please provide a valid email address" },
        { status: 400 }
      );
    }

    // Check if subscriber already exists
    const existingSubscriber = await prisma.subscriber.findUnique({
      where: { email },
    });

    if (existingSubscriber) {
      if (existingSubscriber.active) {
        return NextResponse.json(
          { message: "You're already subscribed!" },
          { status: 200 }
        );
      } else {
        // Reactivate subscription
        await prisma.subscriber.update({
          where: { email },
          data: { active: true },
        });
        return NextResponse.json(
          { message: "Welcome back! Your subscription has been reactivated." },
          { status: 200 }
        );
      }
    }

    // Create new subscriber
    await prisma.subscriber.create({
      data: { email },
    });

    // Send welcome email
    try {
      // Initialize Resend only when needed (lazy initialization)
      const resend = new Resend(process.env.RESEND_API_KEY);

      await resend.emails.send({
        from: "FLAVORISH <onboarding@resend.dev>", // Change this to your verified domain
        to: email,
        subject: "Welcome to FLAVORISH Newsletter! 🎉",
        react: WelcomeEmail({ email }),
      });
    } catch (emailError) {
      console.error("Error sending welcome email:", emailError);
      // Don't fail the subscription if email fails
    }

    return NextResponse.json(
      {
        message: "Successfully subscribed! Check your email for confirmation.",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Newsletter subscription error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again later." },
      { status: 500 }
    );
  }
}
