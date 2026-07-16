"use client";

import React from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 flex flex-col transition-colors duration-300">
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center p-8 space-y-6 text-center">
        <h1 className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-pink-500">404</h1>
        <h2 className="text-xl font-bold text-zinc-800 dark:text-zinc-200">Page Not Found</h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 max-w-sm leading-relaxed">
          We couldn&apos;t find the tool or page you were looking for. Feel free to explore our homepage for working utilities.
        </p>
        <Link href="/" className="px-5 py-2.5 rounded-xl bg-indigo-650 hover:bg-indigo-550 text-white font-semibold text-sm transition-all shadow-md">
          Go back Home
        </Link>
      </main>
      <Footer />
    </div>
  );
}
