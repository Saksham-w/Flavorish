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

export default function NewPostEmail({
  postTitle,
  postSubtitle,
  postSlug,
  postImg,
}) {
  const postUrl = `${process.env.NEXT_PUBLIC_URL || "http://localhost:3000"}/posts/${postSlug}`;

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
            <Heading style={postTitle}>{postTitle}</Heading>
            {postSubtitle && <Text style={postSubtitle}>{postSubtitle}</Text>}
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
            <Link
              href={`${process.env.NEXT_PUBLIC_URL}/unsubscribe`}
              style={link}
            >
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

const main = {
  backgroundColor: "#f6f9fc",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "20px 0 48px",
  marginBottom: "64px",
};

const h1 = {
  color: "#333",
  fontSize: "32px",
  fontWeight: "bold",
  margin: "40px 0",
  padding: "0 40px",
};

const text = {
  color: "#333",
  fontSize: "16px",
  lineHeight: "26px",
  margin: "16px 0",
  padding: "0 40px",
};

const imageContainer = {
  padding: "0 40px",
  margin: "32px 0",
};

const image = {
  width: "100%",
  maxWidth: "560px",
  height: "auto",
  borderRadius: "12px",
};

const postContainer = {
  padding: "0 40px",
  margin: "24px 0",
};

const postTitle = {
  color: "#333",
  fontSize: "24px",
  fontWeight: "bold",
  margin: "0 0 12px 0",
};

const postSubtitle = {
  color: "#666",
  fontSize: "16px",
  lineHeight: "24px",
  margin: "0",
};

const buttonContainer = {
  padding: "27px 0 27px",
  textAlign: "center",
};

const button = {
  backgroundColor: "#667eea",
  borderRadius: "8px",
  color: "#fff",
  fontSize: "16px",
  fontWeight: "bold",
  textDecoration: "none",
  textAlign: "center",
  display: "inline-block",
  padding: "12px 32px",
};

const footer = {
  color: "#8898aa",
  fontSize: "12px",
  lineHeight: "16px",
  padding: "0 40px",
  marginTop: "32px",
};

const link = {
  color: "#667eea",
  textDecoration: "underline",
};
