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
import { CSSProperties } from "react";

interface WelcomeEmailProps {
  email: string;
}

export default function WelcomeEmail({ email }: WelcomeEmailProps) {
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
