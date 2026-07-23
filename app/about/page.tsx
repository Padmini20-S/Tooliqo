"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Sparkles, Shield, Cpu, Heart } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 flex flex-col transition-colors duration-300">

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            About <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-pink-500">Tooliqo</span>
          </h1>
          <p className="max-w-xl mx-auto text-sm sm:text-base text-zinc-500 dark:text-zinc-400 leading-relaxed">
            The free, web-based toolbox designed for web developers, graphics designers, copywriters, and daily internet users.
          </p>
        </div>

        {/* Mission Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
          <div className="p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/20 space-y-3">
            <span className="inline-flex p-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400">
              <Shield className="w-5 h-5" />
            </span>
            <h3 className="text-base font-semibold">100% Client-Side Privacy</h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
              We care deeply about your privacy. None of your data, code snippets, or keys are uploaded to our servers. Every calculation is processed natively inside your web browser.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/20 space-y-3">
            <span className="inline-flex p-2 rounded-xl bg-pink-50 dark:bg-pink-950/40 text-pink-600 dark:text-pink-400">
              <Cpu className="w-5 h-5" />
            </span>
            <h3 className="text-base font-semibold">High Performance</h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
              Built on React and Next.js 15, Tooliqo features code splitting and modular loading to ensure that tool screens load immediately, eliminating unnecessary bundle overhead.
            </p>
          </div>
        </div>

        {/* Story */}
        <div className="prose dark:prose-invert max-w-none space-y-4 text-zinc-650 dark:text-zinc-350 text-sm leading-relaxed">
          <h3 className="text-lg font-bold text-zinc-905 dark:text-white">Our Story</h3>
          <p>
            As software developers, we frequently found ourselves searching for utilities to format raw JSON payloads, generate quick passwords, test regular expressions, and convert case values. However, most available tool sites were cluttered with intrusive pop-up advertisements, slow load times, and suspicious data sharing practices.
          </p>
          <p>
            I created <strong>Tooliqo</strong> to solve this. Tooliqo delivers a clean, beautiful, fast, and secure suite of tools without cookie tracking or back-end storage.
          </p>
          <div className="pt-4 pb-2">
            <h4 className="font-bold text-zinc-900 dark:text-white">Founder</h4>
            <p className="font-medium">Padmini Singh</p>
            <a href="mailto:singh12019@gmail.com" className="text-indigo-600 dark:text-indigo-400 hover:underline">singh12019@gmail.com</a>
          </div>
          <p className="flex items-center gap-1 pt-4 border-t border-zinc-200/50 dark:border-zinc-800/50">
            Made with <Heart className="w-4 h-4 text-red-500 fill-red-500" /> by developers, for developers.
          </p>
        </div>
      </main>

    </div>
  );
}
