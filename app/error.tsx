"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 flex flex-col transition-colors duration-300">
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center p-8 space-y-6 text-center">
        <h1 className="text-4xl font-extrabold text-red-505">Oops!</h1>
        <h2 className="text-xl font-bold text-zinc-800 dark:text-zinc-200">Something went wrong</h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 max-w-sm font-mono bg-zinc-100 dark:bg-zinc-900 p-3 rounded-lg border border-zinc-200 dark:border-zinc-800 text-left">
          {error.message || "An unexpected error occurred."}
        </p>
        <div className="flex space-x-4">
          <button onClick={reset} className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition-all shadow-md cursor-pointer">
            Try again
          </button>
          <a href="/" className="px-5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 text-zinc-750 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-900 font-semibold text-sm transition-all">
            Go back Home
          </a>
        </div>
      </main>
      <Footer />
    </div>
  );
}
