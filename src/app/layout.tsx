import Navbar from "@/components/navbar/Navbar";
import "./globals.css";
import { Inter, Open_Sans } from "next/font/google";
import Footer from "@/components/footer/Footer";
import { ThemeContext } from "@/context/ThemeContext";
import { ThemeContextProvider } from "@/context/ThemeContext";
import ThemeProvider from "@/providers/ThemeProvider";
import AuthProvider from "@/providers/AuthProvider";
import { Toaster } from "react-hot-toast";
import { ReactNode } from "react";
import { Metadata } from "next";

// Force dynamic rendering for all pages
export const dynamic = "force-dynamic";

const inter = Inter({ subsets: ["latin"] });
const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-open-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://flavorish.vercel.app"),

  title: {
    default:
      "FLAVORISH – Discover Nepali Food, Restaurant Reviews, Recipes & Stories",
    template: "%s | FLAVORISH",
  },

  description:
    "FLAVORISH is a Nepali food blog featuring Food and Restaurant Reviews, authentic recipes, food stories, restaurant experiences, and culinary culture from Nepal.",

  keywords: [
    "Nepali food blog",
    "Food Reviews Nepal",
    "Restaurants in Nepal",
    "Cafe in Kathmandu",
    "Best Food in Nepal",
    "Food Places in Kathmandu",
    "Restaurants Near Me Nepal",
    "Nepal food recipes",
    "Nepali cuisine",
    "food blog Nepal",
    "traditional Nepali food",
    "Nepali recipes",
    "food stories Nepal",
  ],

  authors: [{ name: "FLAVORISH Team" }],
  creator: "FLAVORISH",

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },

  openGraph: {
    title: "FLAVORISH – Discover Nepali Food & Recipes",
    description:
      "Explore authentic Nepali recipes, food culture, and culinary stories on FLAVORISH.",
    url: "https://flavorish.vercel.app",
    siteName: "FLAVORISH",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "FLAVORISH – Nepali Food Blog",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title:
      "FLAVORISH – Discover Nepali Food, Restaurant Cafe Reviews, Recipes & Stories",
    description:
      "Authentic Nepali recipes, Restaurants, Cafe, food places, and stories — all in one place.",
    images: ["/og-image.png"],
  },

  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },

  category: "Food & Drink",
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} ${openSans.variable}`}
        suppressHydrationWarning
      >
        <AuthProvider>
          <ThemeContextProvider>
            <ThemeProvider>
              <Toaster
                position="top-right"
                toastOptions={{
                  duration: 4000,
                  style: {
                    background: "var(--bg)",
                    color: "var(--textColor)",
                    border: "1px solid rgba(16, 172, 157, 0.3)",
                    borderRadius: "12px",
                    padding: "16px",
                    fontSize: "14px",
                    fontWeight: "500",
                  },
                  success: {
                    iconTheme: {
                      primary: "rgb(16, 172, 157)",
                      secondary: "white",
                    },
                  },
                  error: {
                    iconTheme: {
                      primary: "#ef4444",
                      secondary: "white",
                    },
                  },
                }}
              />
              <Navbar />
              <div className="container">
                <div className="wrapper">{children}</div>
                <Footer />
              </div>
            </ThemeProvider>
          </ThemeContextProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
