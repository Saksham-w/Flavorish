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
} from "@react-email/components";

export default function WelcomeEmail({ email }) {
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL ||
    process.env.NEXTAUTH_URL ||
    "http://localhost:3000";

  return (
    <Html>
      <Head />
      <Preview>Welcome to FLAVORISH Newsletter! 🎉</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Welcome to FLAVORISH! 🎉</Heading>
          <Text style={text}>
            Hi there! Thank you for subscribing to our newsletter.
          </Text>
          <Text style={text}>
            You'll now receive updates whenever we publish new articles on
            topics like technology, lifestyle, travel, and culture.
          </Text>
          <Section style={buttonContainer}>
            <Button style={button} href={baseUrl}>
              Visit FLAVORISH
            </Button>
          </Section>
          <Text style={text}>
            We promise to only send you quality content and never spam your
            inbox.
          </Text>
          <Text style={footer}>
            If you didn't subscribe to this newsletter, you can safely ignore
            this email.
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
