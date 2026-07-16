"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Search, Sparkles, Terminal, Flame, Info, Star, ShieldCheck, 
  HelpCircle, ChevronDown, Compass, Zap, Lock, RefreshCw, AppWindow 
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ToolCard from "@/components/ToolCard";
import SearchBar from "@/components/SearchBar";
import { tools, categories, Tool } from "@/lib/tools";
import { motion } from "framer-motion";

export default function Page() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchOpen, setSearchOpen] = useState(false);
  const [filteredTools, setFilteredTools] = useState<Tool[]>(tools);
  const [favoriteSlugs, setFavoriteSlugs] = useState<string[]>([]);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Load favorites from local storage on mount
  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("tooliqo_favorites") || "[]");
    setFavoriteSlugs(favorites);
  }, []);

  // Filter tools based on category and favorites trigger
  useEffect(() => {
    let result = tools;
    if (selectedCategory !== "all") {
      result = result.filter((t) => t.category === selectedCategory);
    }
    if (showFavoritesOnly) {
      const favorites = JSON.parse(localStorage.getItem("tooliqo_favorites") || "[]");
      setFavoriteSlugs(favorites);
      result = result.filter((t) => favorites.includes(t.slug));
    }
    setFilteredTools(result);
  }, [selectedCategory, showFavoritesOnly]);

  // Listen for CMD+K / CTRL+K
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

  const faqs = [
    {
      q: "Is Tooliqo really 100% client-side?",
      a: "Yes. All data processing—whether formatting JSON, generating passwords, compiling markdown, or hashing text—runs locally inside your browser via standard client JavaScript. No inputs or files are sent to any remote server.",
    },
    {
      q: "Can I use Tooliqo offline?",
      a: "Absolutely. Once the page is loaded, all tool features run completely locally without requiring active network requests, making it fast and secure even with intermittent internet connections.",
    },
    {
      q: "Is there any cost or limit on file size?",
      a: "No. Tooliqo is completely free to use without constraints, logins, or hidden premium paywalls. Files uploaded are parsed client-side, restricted only by your local browser's memory allocation.",
    },
    {
      q: "How does the password generator secure my data?",
      a: "It utilizes standard Web Cryptography APIs (`window.crypto.getRandomValues`) to generate random, high-entropy password strings. Because it runs locally, the generated password is never transmitted across the network, eliminating interception risks.",
    },
  ];

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 flex flex-col transition-colors duration-300 bg-grid-pattern">
      <Navbar onSearchOpen={() => setSearchOpen(true)} />

      {/* Hero Section */}
      <section className="relative py-24 md:py-32 px-4 overflow-hidden border-b border-zinc-200/60 dark:border-zinc-900/60 bg-gradient-to-b from-white via-zinc-50/50 to-transparent dark:from-zinc-950 dark:via-zinc-950/40">
        {/* Glow Effects */}
        <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-blue-500/10 dark:bg-blue-500/5 blur-3xl rounded-full pointer-events-none" />
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-purple-500/10 dark:bg-purple-500/5 blur-3xl rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          
          {/* Hero details */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, staggerChildren: 0.1 }}
            className="lg:col-span-7 space-y-6 text-left"
          >
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-indigo-200/50 dark:border-indigo-900/30 bg-indigo-50/50 dark:bg-indigo-950/30 text-indigo-650 dark:text-indigo-400 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
              <span>Futuristic Web Toolbox</span>
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.1] font-sans">
              Powerful Tools.<br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
                One Smart Platform.
              </span>
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="max-w-xl text-base sm:text-lg text-zinc-500 dark:text-zinc-400 leading-relaxed">
              Access the next-generation suite of formatting, cryptography, utility generators, and visual CSS design tools. 100% local execution, zero trackers, and ultra-fast speed.
            </motion.p>

            {/* CTAs */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="flex flex-wrap gap-4 pt-2">
              <a
                href="#toolbox"
                className="py-3 px-6 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-655 to-indigo-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-sm shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/30 transition-all duration-200 hover:-translate-y-0.5 flex items-center space-x-2 cursor-pointer"
              >
                <Compass className="w-4 h-4" />
                <span>Explore Toolbox</span>
              </a>
              <button
                onClick={() => setSearchOpen(true)}
                className="py-3 px-6 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white/70 dark:bg-zinc-900/40 text-zinc-700 dark:text-zinc-300 font-semibold text-sm hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all flex items-center space-x-2 cursor-pointer"
              >
                <Search className="w-4 h-4 text-zinc-400" />
                <span>Find a Tool</span>
                <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono border rounded bg-zinc-50 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 ml-2">
                  ⌘K
                </kbd>
              </button>
            </motion.div>

            {/* Trust highlights */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="grid grid-cols-3 gap-6 pt-6 border-t border-zinc-200/50 dark:border-zinc-800/50 max-w-md">
              <div className="space-y-1">
                <span className="block text-xl font-bold text-zinc-900 dark:text-white">12+</span>
                <span className="block text-xs text-zinc-450 dark:text-zinc-500 font-medium">Active Utilities</span>
              </div>
              <div className="space-y-1">
                <span className="block text-xl font-bold text-zinc-900 dark:text-white">100%</span>
                <span className="block text-xs text-zinc-450 dark:text-zinc-500 font-medium">Local Privacy</span>
              </div>
              <div className="space-y-1">
                <span className="block text-xl font-bold text-zinc-900 dark:text-white">&lt; 15ms</span>
                <span className="block text-xs text-zinc-450 dark:text-zinc-500 font-medium">Latency Response</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Interactive Hero Illustration Mockup */}
          <div className="lg:col-span-5 relative hidden lg:block">
            <div className="relative w-full h-[400px] rounded-3xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white/60 dark:bg-zinc-900/30 backdrop-blur-md p-6 shadow-2xl overflow-hidden glow-blue animate-float">
              {/* Top mockup header */}
              <div className="flex items-center justify-between pb-4 border-b border-zinc-150 dark:border-zinc-800/50">
                <div className="flex space-x-1.5">
                  <span className="w-3 h-3 rounded-full bg-red-400/80" />
                  <span className="w-3 h-3 rounded-full bg-amber-400/80" />
                  <span className="w-3 h-3 rounded-full bg-green-400/80" />
                </div>
                <div className="px-3 py-1 rounded bg-zinc-100 dark:bg-zinc-850 text-[10px] font-mono text-zinc-500">tooliqo_dashboard.cfg</div>
              </div>

              {/* Mock items inside code illustration */}
              <div className="space-y-4 pt-6 font-mono text-xs text-zinc-400">
                <div className="space-y-1">
                  <span className="text-indigo-650 dark:text-indigo-400 font-semibold">// Running Web Crypto Hash</span>
                  <p className="bg-zinc-50 dark:bg-zinc-900/60 p-2.5 rounded-lg border border-zinc-150 dark:border-zinc-850 break-all text-[11px] text-zinc-700 dark:text-zinc-300">
                    crypto.subtle.digest(&quot;SHA-256&quot;, buffer) &rarr; &quot;2cf24dba5fb0a30e26e83b2...&quot;
                  </p>
                </div>
                
                <div className="space-y-1">
                  <span className="text-rose-500 font-semibold">// Dynamic Indentation Spacing</span>
                  <div className="bg-zinc-50 dark:bg-zinc-900/60 p-2.5 rounded-lg border border-zinc-150 dark:border-zinc-850 text-[11px] text-zinc-650 dark:text-zinc-300 space-y-0.5">
                    <p className="text-blue-500">{`{`}</p>
                    <p className="pl-4"><span className="text-amber-500">&quot;tooliqo&quot;</span>: <span className="text-green-500">&quot;SaaS Platform&quot;</span>,</p>
                    <p className="pl-4"><span className="text-amber-500">&quot;performance&quot;</span>: <span className="text-green-500">&quot;99/100&quot;</span></p>
                    <p className="text-blue-500">{`}`}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-2 pt-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                  <span className="text-[10px] text-zinc-500">Live Client Compiler Ready</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Showcase Grid Section */}
      <section id="toolbox" className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-10 scroll-mt-16">
        
        {/* AdSense Top Ad Slot Placement */}
        <div className="border-2 border-dashed border-zinc-250 dark:border-zinc-800 rounded-2xl p-4 text-center bg-zinc-100/50 dark:bg-zinc-900/40 min-h-[90px] flex items-center justify-center">
          <div className="space-y-1">
            <span className="text-[9px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider block">Advertisement</span>
            <span className="text-xs text-zinc-450 dark:text-zinc-400 italic">Ad Slot Placement (Ideal for AdSense Page-Level Ads)</span>
          </div>
        </div>

        {/* Section Header */}
        <div className="text-center space-y-3">
          <h2 className="text-3xl font-extrabold tracking-tight">Our Smart Toolbox</h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 max-w-xl mx-auto">
            Choose from a wide variety of utilities. Filter by categories or view your favorites for quick daily access.
          </p>
        </div>

        {/* Categories Tab navigation & Favorites Switch */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-b border-zinc-200/50 dark:border-zinc-800/50 pb-4">
          <div className="flex items-center flex-wrap gap-2">
            <button
              onClick={() => {
                setSelectedCategory("all");
                setShowFavoritesOnly(false);
              }}
              className={`px-4.5 py-2 text-xs font-bold rounded-full transition-all duration-200 border cursor-pointer ${
                selectedCategory === "all" && !showFavoritesOnly
                  ? "bg-zinc-900 dark:bg-white text-white dark:text-zinc-950 border-zinc-900 dark:border-white shadow-sm"
                  : "bg-white dark:bg-zinc-900 text-zinc-500 dark:text-zinc-400 border-zinc-200/60 dark:border-zinc-800/60 hover:bg-zinc-50 dark:hover:bg-zinc-800"
              }`}
            >
              All Utilities
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat.id);
                  setShowFavoritesOnly(false);
                }}
                className={`px-4.5 py-2 text-xs font-bold rounded-full transition-all duration-200 border cursor-pointer ${
                  selectedCategory === cat.id && !showFavoritesOnly
                    ? "bg-indigo-600 dark:bg-indigo-550 text-white border-indigo-600 dark:border-indigo-550 shadow-sm"
                    : "bg-white dark:bg-zinc-900 text-zinc-500 dark:text-zinc-400 border-zinc-200/60 dark:border-zinc-800/60 hover:bg-zinc-50 dark:hover:bg-zinc-800"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Favorites switch */}
          <button
            onClick={() => {
              setShowFavoritesOnly(!showFavoritesOnly);
              setSelectedCategory("all");
            }}
            className={`flex items-center space-x-1.5 px-4.5 py-2 text-xs font-bold rounded-full border transition-all cursor-pointer ${
              showFavoritesOnly
                ? "bg-amber-500 border-amber-500 text-white shadow-md"
                : "bg-white dark:bg-zinc-900 text-zinc-550 dark:text-zinc-400 border-zinc-200/60 dark:border-zinc-800/60 hover:bg-zinc-50 dark:hover:bg-zinc-800"
            }`}
          >
            <Star className={`w-3.5 h-3.5 ${showFavoritesOnly ? "fill-white" : ""}`} />
            <span>Starred Tools</span>
          </button>
        </div>

        {/* Display Grid */}
        {filteredTools.length > 0 ? (
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTools.map((tool, index) => (
              <ToolCard key={tool.slug} tool={tool} index={index} />
            ))}
          </section>
        ) : (
          <div className="text-center py-16 p-6 rounded-2xl border border-dashed border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/30">
            <Star className="w-12 h-12 text-zinc-350 dark:text-zinc-600 mx-auto" />
            <h3 className="text-base font-bold text-zinc-700 dark:text-zinc-300 mt-4">No tools starred yet</h3>
            <p className="text-xs text-zinc-450 dark:text-zinc-500 mt-2 max-w-xs mx-auto">
              Add tools to your stars by clicking the star icon on any tool card for immediate dashboard retrieval.
            </p>
          </div>
        )}
      </section>

      {/* How it Works Section */}
      <section className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-zinc-200/50 dark:border-zinc-800/50 space-y-12">
        <div className="text-center space-y-3">
          <h2 className="text-2xl font-extrabold tracking-tight">How it Works</h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 max-w-sm mx-auto">
            Tooliqo streamlines your developer workflow in 3 simple steps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 rounded-2xl glass-card space-y-4">
            <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 font-bold text-sm">
              01
            </span>
            <h3 className="text-base font-bold text-zinc-800 dark:text-white">Choose Your Utility</h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
              Explore our dashboard categories or trigger search palette using <kbd className="px-1 py-0.5 border rounded bg-zinc-50 dark:bg-zinc-850">⌘K</kbd> to launch your preferred tool.
            </p>
          </div>

          <div className="p-6 rounded-2xl glass-card space-y-4">
            <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950/40 text-purple-650 dark:text-purple-400 font-bold text-sm">
              02
            </span>
            <h3 className="text-base font-bold text-zinc-800 dark:text-white">Process Data Locally</h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
              Enter your payloads, settings, or values. Conversions are calculated client-side in microseconds via standard browser Javascript.
            </p>
          </div>

          <div className="p-6 rounded-2xl glass-card space-y-4">
            <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-pink-50 dark:bg-pink-950/40 text-pink-600 dark:text-pink-400 font-bold text-sm">
              03
            </span>
            <h3 className="text-base font-bold text-zinc-800 dark:text-white">Copy or Export Output</h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
              Copy results instantly to your clipboard or download files (e.g. formatted JSON configurations or QR code SVGs) directly.
            </p>
          </div>
        </div>
      </section>

      {/* Security & Data Privacy Spotlight */}
      <section className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white/60 dark:bg-zinc-900/10 backdrop-blur-md flex flex-col lg:flex-row items-center justify-between gap-8 shadow-sm">
          <div className="space-y-3">
            <div className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/40 text-emerald-650 dark:text-emerald-400 text-[10px] font-bold border border-emerald-250/20">
              <ShieldCheck className="w-3.5 h-3.5 mr-1" />
              <span>SOC2 Compliant Architecture Model</span>
            </div>
            <h3 className="text-xl font-bold">100% Encrypted & Local Code Sandboxes</h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-3xl">
              Unlike online developer utilities that track payloads or write database logs, Tooliqo runs entirely in the context of your browser tab. We utilize native HTML5 Web Cryptography modules and ES6 compilers to execute operations locally. None of your data interacts with our hosting servers, ensuring total compliance for proprietary company configurations and user keys.
            </p>
          </div>
          <div className="flex-shrink-0 flex items-center justify-center w-14 h-14 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-650 dark:text-indigo-400 border border-indigo-200/50">
            <Lock className="w-6 h-6" />
          </div>
        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section className="max-w-3xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-extrabold tracking-tight flex items-center justify-center gap-2">
            <HelpCircle className="w-6 h-6 text-indigo-500" />
            <span>Frequently Asked Questions</span>
          </h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Everything you need to know about Tooliqo platform structure.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/20 overflow-hidden"
            >
              <button
                onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                className="w-full flex items-center justify-between p-5 text-left font-bold text-sm text-zinc-800 dark:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-900/40 transition-colors cursor-pointer"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  className={`w-4 h-4 text-zinc-450 dark:text-zinc-550 transition-transform duration-300 ${
                    activeFaq === idx ? "transform rotate-180" : ""
                  }`}
                />
              </button>
              <div
                className={`transition-all duration-300 ease-in-out ${
                  activeFaq === idx ? "max-h-40 border-t border-zinc-150 dark:border-zinc-800/50" : "max-h-0"
                } overflow-hidden`}
              >
                <p className="p-5 text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                  {faq.a}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Global Command Search Palette */}
      <SearchBar isOpen={searchOpen} onClose={() => setSearchOpen(false)} />

      <Footer />
    </div>
  );
}
