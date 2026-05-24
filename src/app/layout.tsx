import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/system/toaster";
import NavBar from "./components/layout/NavBar";
import CommandBar from "./components/layout/CommandBar";
import BottomNav from "./components/layout/BottomNav";
import { AuthProvider } from "./context/AuthContext";
import { PageTransition } from "@/components/system/page-transition";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "TalentHub — AI-Powered Recruiting",
    template: "%s — TalentHub",
  },
  description:
    "TalentHub is an AI-powered recruiting platform that helps companies find, evaluate, and hire top talent with resume intelligence and semantic search.",
  icons: {
    icon: [
      { url: "/talent.png", sizes: "32x32", type: "image/png" },
      { url: "/talent.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [
      { url: "/talent.png", sizes: "180x180", type: "image/png" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} bg-surface text-foreground pt-14 pb-16 md:pb-0 w-screen overflow-x-hidden font-sans`}>
        <AuthProvider>
          <NavBar />
          <CommandBar />
          <PageTransition>{children}</PageTransition>
          <BottomNav />
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
