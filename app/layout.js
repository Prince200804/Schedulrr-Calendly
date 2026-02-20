import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Header from "@/components/header";
import CreateEventDrawer from "@/components/create-event";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://schedulrr.vercel.app"),
  title: {
    default: "Schedulrr - Smart Scheduling Made Simple",
    template: "%s | Schedulrr",
  },
  description: "Simplify your scheduling with Schedulrr. Create events, set your availability, and let others book time with you seamlessly. Integrates with Google Calendar and Google Meet.",
  keywords: [
    "scheduling",
    "calendar",
    "booking",
    "meetings",
    "appointments",
    "time management",
    "Google Calendar",
    "Google Meet",
    "availability",
  ],
  authors: [{ name: "Schedulrr" }],
  creator: "Schedulrr",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: process.env.NEXT_PUBLIC_APP_URL || "https://schedulrr.vercel.app",
    title: "Schedulrr - Smart Scheduling Made Simple",
    description: "Simplify your scheduling with Schedulrr. Create events, set your availability, and let others book time with you seamlessly.",
    siteName: "Schedulrr",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Schedulrr - Smart Scheduling",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Schedulrr - Smart Scheduling Made Simple",
    description: "Simplify your scheduling with Schedulrr. Create events, set your availability, and let others book time with you seamlessly.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  manifest: "/manifest.json",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={inter.className}>
          <ThemeProvider defaultTheme="light" storageKey="schedulrr-theme">
            <Header />
            <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
              {children}
            </main>
            <footer className="bg-blue-100 dark:bg-gray-900 py-12">
              <div className="container mx-auto px-4 text-center text-gray-600 dark:text-gray-400">
                <p>Made with 💗 by Prince Adani</p>
              </div>
            </footer>
            <CreateEventDrawer />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
