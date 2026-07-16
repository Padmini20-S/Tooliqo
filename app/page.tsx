"use client";

import React, { useState, useEffect } from "react";
import { Search, Sparkles, Terminal, Flame, Info } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ToolCard from "@/components/ToolCard";
import SearchBar from "@/components/SearchBar";
import { tools, categories, Tool } from "@/lib/tools";

export default function Page() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchOpen, setSearchOpen] = useState(false);
  const [filteredTools, setFilteredTools] = useState<Tool[]>(tools);

  // Filter tools based on chosen category
  useEffect(() => {
    if (selectedCategory === "all") {
      setFilteredTools(tools);
    } else {
      setFilteredTools(tools.filter((tool) => tool.category === selectedCategory));
    }
  }, [selectedCategory]);

  // Listen for CMD+K / CTRL+K to trigger search modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 flex flex-col transition-colors duration-300">
      <Navbar onSearchOpen={() => setSearchOpen(true)} />

      {/* Hero Section */}
      <header className="relative py-20 px-4 overflow-hidden border-b border-zinc-200 dark:border-zinc-900/60 bg-gradient-to-b from-white to-zinc-50 dark:from-zinc-950 dark:to-zinc-950/40">
        {/* Decorative background grid and blurs */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] pointer-events-none" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-gradient-to-tr from-indigo-500/10 to-pink-500/10 blur-3xl rounded-full pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center space-y-6 relative z-10">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full border border-indigo-200/50 dark:border-indigo-900/30 bg-indigo-50/50 dark:bg-indigo-950/30 text-indigo-650 dark:text-indigo-400 text-xs font-semibold">
            <Flame className="w-3.5 h-3.5" />
            <span>100% Client-Side Data Safety</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight font-sans">
            Free, Safe, and Fast{" "}
            <span className="block mt-2 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-400 dark:to-pink-400">
              Online Developer Utilities
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-base sm:text-lg text-zinc-500 dark:text-zinc-400 leading-relaxed">
            Boost your productivity with Tooliqo. Access formatting, generators, cryptographic hash tools, and design helper engines directly in your browser.
          </p>

          {/* Centered Search Button Bar */}
          <div className="max-w-md mx-auto pt-4">
            <button
              onClick={() => setSearchOpen(true)}
              className="w-full flex items-center justify-between p-3.5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/40 text-zinc-400 dark:text-zinc-500 hover:border-indigo-550 shadow-md shadow-zinc-100 dark:shadow-none hover:shadow-indigo-500/5 transition-all text-sm cursor-pointer"
            >
              <span className="flex items-center space-x-2.5">
                <Search className="w-4 h-4 text-zinc-405" />
                <span>Search across our suite of tools...</span>
              </span>
              <kbd className="hidden sm:inline-block px-2 py-0.5 text-xs font-mono border rounded bg-zinc-50 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700">
                ⌘K
              </kbd>
            </button>
          </div>
        </div>
      </header>

      {/* Main Tools Showcase */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        {/* AdSense Top Banner Placement */}
        <div className="border-2 border-dashed border-zinc-250 dark:border-zinc-800 rounded-2xl p-4 text-center bg-zinc-100/50 dark:bg-zinc-900/40 min-h-[90px] flex items-center justify-center">
          <div className="space-y-1">
            <span className="text-[9px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider block">Advertisement</span>
            <span className="text-xs text-zinc-450 dark:text-zinc-400 italic">Ad Slot Placement (Ideal for AdSense Page-Level Ads)</span>
          </div>
        </div>

        {/* Category filtering tab nav */}
        <div className="flex items-center justify-center flex-wrap gap-2 pt-2">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`px-5 py-2 text-xs font-bold rounded-full transition-all duration-200 border cursor-pointer ${
              selectedCategory === "all"
                ? "bg-zinc-900 dark:bg-white text-white dark:text-zinc-950 border-zinc-900 dark:border-white shadow-md"
                : "bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800"
            }`}
          >
            All Tools
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-5 py-2 text-xs font-bold rounded-full transition-all duration-200 border cursor-pointer ${
                selectedCategory === cat.id
                  ? "bg-indigo-600 dark:bg-indigo-550 text-white border-indigo-600 dark:border-indigo-550 shadow-md"
                  : "bg-white dark:bg-zinc-900 text-zinc-650 dark:text-zinc-400 border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Grid display */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
          {filteredTools.map((tool) => (
            <ToolCard key={tool.slug} tool={tool} />
          ))}
        </section>

        {/* Data Security Banner */}
        <section className="p-6 rounded-2xl border border-indigo-100 dark:border-indigo-900/30 bg-indigo-50/30 dark:bg-indigo-950/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <h3 className="text-base font-semibold text-indigo-900 dark:text-indigo-400 flex items-center space-x-2">
              <Info className="w-5 h-5" />
              <span>How Tooliqo Safeguards Your Privacy</span>
            </h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-3xl">
              Unlike other online utility web portals, Tooliqo runs entirely client-side. Every calculation, formatting process, and hash computation occurs solely in your browser using JavaScript. No information is ever uploaded to external servers, protecting your secrets and files completely.
            </p>
          </div>
          <div className="flex-shrink-0 bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-400 p-3 rounded-2xl">
            <Terminal className="w-8 h-8" />
          </div>
        </section>
      </main>

      {/* Global Cmd+K Search Palette */}
      <SearchBar isOpen={searchOpen} onClose={() => setSearchOpen(false)} />

      <Footer />
    </div>
  );
}
