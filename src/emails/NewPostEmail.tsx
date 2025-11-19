import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Text,
  Section,
  Button,
  Img,
} from "@react-email/components";
import { CSSProperties } from "react";

interface NewPostEmailProps {
  postTitle: string;
  postSubtitle: string;
  postSlug: string;
  postImg: string;
}

export default function NewPostEmail({
  postTitle,
  postSubtitle,
  postSlug,
  postImg,
}: NewPostEmailProps) {
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL ||
    process.env.NEXTAUTH_URL ||
    "http://localhost:3000";
  const postUrl = `${baseUrl}/posts/${postSlug}`;
  const unsubscribeUrl = `${baseUrl}/unsubscribe`;

  return (
    <Html>
      <Head />
      <Preview>New post on FLAVORISH: {postTitle}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>New Post Alert! 📝</Heading>
          <Text style={text}>
            We just published a new article that you might enjoy:
          </Text>

          {postImg && (
            <Section style={imageContainer}>
              <Img src={postImg} alt={postTitle} style={image} />
            </Section>
          )}

          <Section style={postContainer}>
            <Heading style={postTitleStyle}>{postTitle}</Heading>
            {postSubtitle && (
              <Text style={postSubtitleStyle}>{postSubtitle}</Text>
            )}
          </Section>

          <Section style={buttonContainer}>
            <Button style={button} href={postUrl}>
              Read Article
            </Button>
          </Section>

          <Text style={footer}>
            You're receiving this because you subscribed to FLAVORISH
            newsletter.
          </Text>
          <Text style={footer}>
            <Link href={unsubscribeUrl} style={link}>
              Unsubscribe
            </Link>
          </Text>
          <Text style={footer}>
            © 2025 Saksham Shrestha Blogs. All rights reserved.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

// Styles
const main: CSSProperties = {
  backgroundColor: "#f6f9fc",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container: CSSProperties = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "20px 0 48px",
  marginBottom: "64px",
  borderRadius: "8px",
};

const h1: CSSProperties = {
  color: "#333",
  fontSize: "32px",
  fontWeight: "700",
  margin: "40px 0",
  padding: "0 40px",
  textAlign: "center" as const,
};

const text: CSSProperties = {
  color: "#333",
  fontSize: "16px",
  lineHeight: "26px",
  padding: "0 40px",
};

const imageContainer: CSSProperties = {
  padding: "20px 40px",
};

const image: CSSProperties = {
  width: "100%",
  height: "auto",
  borderRadius: "8px",
};

const postContainer: CSSProperties = {
  padding: "20px 40px",
};

const postTitleStyle: CSSProperties = {
  color: "#10ac9d",
  fontSize: "24px",
  fontWeight: "600",
  margin: "0 0 10px",
};

const postSubtitleStyle: CSSProperties = {
  color: "#666",
  fontSize: "16px",
  margin: "0",
};

const buttonContainer: CSSProperties = {
  padding: "27px 40px",
  textAlign: "center" as const,
};

const button: CSSProperties = {
  backgroundColor: "#10ac9d",
  borderRadius: "8px",
  color: "#fff",
  fontSize: "16px",
  fontWeight: "600",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "inline-block",
  padding: "12px 32px",
};

const footer: CSSProperties = {
  color: "#8898aa",
  fontSize: "12px",
  lineHeight: "16px",
  padding: "0 40px",
  textAlign: "center" as const,
};

const link: CSSProperties = {
  color: "#10ac9d",
  textDecoration: "underline",
};
