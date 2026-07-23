import React from "react";
import { Toaster } from "sonner";
import "./globals.css";
import Navbar from "@/components/Navbar";
import MobileNav from "@/components/MobileNav";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Tooliqo - All The Tools You Need In One Place",
  description: "100+ Free Online Tools for Images, PDF, AI, Video, Audio, Text and more. Always free, no login required.",
  metadataBase: new URL("https://tooliqo.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Tooliqo - All The Tools You Need In One Place",
    description: "100+ Free Online Tools for Images, PDF, AI, Video, Audio, Text and more. Always free, no login required.",
    url: "https://tooliqo.com",
    siteName: "Tooliqo",
    locale: "en_US",
    type: "website",
  },
  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Load Inter font */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased min-h-screen flex flex-col pb-16 md:pb-0">
        <Navbar />
        <main className="flex-1 flex flex-col">
          {children}
        </main>
        <Footer />
        <MobileNav />
        <Toaster position="top-right" duration={3000} richColors />
      </body>
    </html>
  );
}


