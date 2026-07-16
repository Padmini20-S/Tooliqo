import React from "react";
import { Toaster } from "sonner";
import "./globals.css";

export const metadata = {
  title: "Tooliqo - 500+ Powerful Online Tools All in One Place",
  description: "Boost your productivity with Tooliqo. Access formatting, generators, cryptographic hash tools, and design helper engines directly in your browser.",
  metadataBase: new URL("https://tooliqo.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Tooliqo - Online Developer Toolbox",
    description: "Access free online formatting, validation, cryptographic hashes, and visual CSS design utilities securely in your browser.",
    url: "https://tooliqo.com",
    siteName: "Tooliqo",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth dark">
      <head>
        {/* Load Inter font from CDN dynamically on the client browser */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;855;900&display=swap" rel="stylesheet" />
        
        {/* AdSense Publisher Code Placement Holder */}
        {/* <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX" crossorigin="anonymous"></script> */}
      </head>
      <body className="antialiased bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 transition-colors duration-300">
        {children}
        <Toaster position="bottom-right" richColors theme="system" />
      </body>
    </html>
  );
}
