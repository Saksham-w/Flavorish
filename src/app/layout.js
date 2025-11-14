import Navbar from "@/components/navbar/Navbar";
import "./globals.css";
import { Inter, Open_Sans } from "next/font/google";
import Footer from "@/components/footer/Footer";
import { ThemeContext } from "@/context/ThemeContext";
import { ThemeContextProvider } from "@/context/ThemeContext";
import ThemeProvider from "@/providers/ThemeProvider";
import AuthProvider from "@/providers/AuthProvider";
import { Toaster } from "react-hot-toast";

// Force dynamic rendering for all pages
export const dynamic = "force-dynamic";

const inter = Inter({ subsets: ["latin"] });
const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-open-sans",
});

export const metadata = {
  title: "FLAVORISH",
  description: "Food Blog in Nepal",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }) {
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
