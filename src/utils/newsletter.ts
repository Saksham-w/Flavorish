import { Resend } from "resend";
import prisma from "@/utils/connect";
import NewPostEmail from "@/emails/NewPostEmail";

const resend = new Resend(process.env.RESEND_API_KEY);

interface Post {
  title: string;
  subtitle?: string | null;
  slug: string;
  img?: string | null;
}

interface NewsletterResult {
  success: boolean;
  sentCount?: number;
  errorCount?: number;
  message?: string;
  error?: string;
}

export async function sendNewPostNotification(
  post: Post
): Promise<NewsletterResult> {
  try {
    // Get all active subscribers
    const subscribers = await prisma.subscriber.findMany({
      where: { active: true },
      select: { email: true },
    });

    if (subscribers.length === 0) {
      return { success: true, message: "No subscribers" };
    }

    // Send emails in batches to avoid rate limits
    const batchSize = 50;
    const batches = [];

    for (let i = 0; i < subscribers.length; i += batchSize) {
      batches.push(subscribers.slice(i, i + batchSize));
    }

    let sentCount = 0;
    let errorCount = 0;

    for (const batch of batches) {
      const emailPromises = batch.map(async (subscriber) => {
        try {
          await resend.emails.send({
            from: "FLAVORISH <onboarding@resend.dev>", // Change to your verified domain
            to: subscriber.email,
            subject: `New Post: ${post.title}`,
            react: NewPostEmail({
              postTitle: post.title,
              postSubtitle: post.subtitle || "",
              postSlug: post.slug,
              postImg: post.img || "",
            }),
          });
          sentCount++;
        } catch (error) {
          console.error(`Failed to send email to ${subscriber.email}:`, error);
          errorCount++;
        }
      });

      await Promise.all(emailPromises);

      // Add a small delay between batches
      if (batches.indexOf(batch) < batches.length - 1) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    }

    return {
      success: true,
      sentCount,
      errorCount,
      message: `Sent to ${sentCount} subscribers`,
    };
  } catch (error: any) {
    console.error("Error sending newsletter:", error);
    return { success: false, error: error.message };
  }
}
