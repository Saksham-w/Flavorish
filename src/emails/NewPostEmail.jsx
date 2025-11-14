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

// ... keep all the styles as they are
