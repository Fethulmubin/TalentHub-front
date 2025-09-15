import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import NavBar from "./components/layout/NavBar";
import { AuthProvider } from "./context/AuthContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// app/layout.tsx
export const metadata: Metadata = {
  title: "TalentHub - Mini Job Portal",
  description: "TalentHub is a modern mini job portal to apply, track, and manage job applications with ease.",
  icons: {
    icon: [
      { url: "/talent.png", sizes: "32x32", type: "image/png" }, // browser tab
      { url: "/talent.png", sizes: "192x192", type: "image/png" }, // android / chrome apps
    ],
    apple: [
      { url: "/talent.png", sizes: "180x180", type: "image/png" }, // iOS
    ],
  },
  openGraph: {
    title: "TalentHub - Mini Job Portal",
    description: "Find and apply for jobs easily with TalentHub.",
    url: "https://talent-hub-front-cckb.vercel.app/",
    siteName: "TalentHub",
    images: [
      {
        url: "/talent.png",
        width: 1200,
        height: 630,
        alt: "TalentHub Logo",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TalentHub - Mini Job Portal",
    description: "Apply, track, and manage jobs with ease using TalentHub.",
    images: ["/talent.png"],
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased pt-15`}
      >
        <AuthProvider>
          <NavBar />
          {children}
          <Toaster richColors position="top-right" />
        </AuthProvider>
      </body>
    </html>
  );
}
