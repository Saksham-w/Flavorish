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
  return (
    <Html>
      <Head />
      <Preview>Welcome to Sblog Newsletter! 🎉</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Welcome to Sblog! 🎉</Heading>
          <Text style={text}>
            Hi there! Thank you for subscribing to our newsletter.
          </Text>
          <Text style={text}>
            You'll now receive updates whenever we publish new articles on
            topics like technology, lifestyle, travel, and culture.
          </Text>
          <Section style={buttonContainer}>
            <Button
              style={button}
              href={process.env.NEXT_PUBLIC_URL || "http://localhost:3000"}
            >
              Visit Sblog
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
