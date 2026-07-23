"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Search, ArrowRight, Zap, Shield, Heart, HelpCircle, ChevronDown, CheckCircle, 
  Image as ImageIcon, FileText, Video, Music, Bot, Code, Calculator, ArrowLeftRight, QrCode, Palette, SearchCheck, Type 
} from "lucide-react";
import SearchBar from "@/components/SearchBar";
import ToolCard from "@/components/ToolCard";
import { tools, Tool } from "@/lib/tools";
import { motion } from "framer-motion";

export default function Home() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  
  // Setup keyboard shortcut for search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const categories = [
    { id: "image", name: "Image", icon: ImageIcon, color: "text-blue-500", bg: "bg-blue-50" },
    { id: "pdf", name: "PDF", icon: FileText, color: "text-red-500", bg: "bg-red-50" },
    { id: "video", name: "Video", icon: Video, color: "text-purple-500", bg: "bg-purple-50" },
    { id: "audio", name: "Audio", icon: Music, color: "text-orange-500", bg: "bg-orange-50" },
    { id: "ai", name: "AI", icon: Bot, color: "text-emerald-500", bg: "bg-emerald-50" },
    { id: "document", name: "Document", icon: FileText, color: "text-sky-500", bg: "bg-sky-50" },
    { id: "developer", name: "Developer", icon: Code, color: "text-indigo-500", bg: "bg-indigo-50" },
    { id: "calculator", name: "Calculator", icon: Calculator, color: "text-teal-500", bg: "bg-teal-50" },
    { id: "converter", name: "Converter", icon: ArrowLeftRight, color: "text-amber-500", bg: "bg-amber-50" },
    { id: "qr", name: "QR", icon: QrCode, color: "text-zinc-600", bg: "bg-zinc-100" },
    { id: "color", name: "Color", icon: Palette, color: "text-pink-500", bg: "bg-pink-50" },
    { id: "seo", name: "SEO", icon: SearchCheck, color: "text-cyan-500", bg: "bg-cyan-50" },
    { id: "text", name: "Text", icon: Type, color: "text-violet-500", bg: "bg-violet-50" },
  ];

  const faqs = [
    {
      q: "Is Tooliqo completely free?",
      a: "Yes, Tooliqo will always remain 100% FREE. We don't have any premium plans or paid subscriptions. Our platform is supported entirely by non-intrusive advertisements.",
    },
    {
      q: "Do I need to create an account to use the tools?",
      a: "No, every single tool on our platform is accessible without a login. Creating an account is completely optional, but gives you access to history, favorites, and preference syncing.",
    },
    {
      q: "Are my files secure?",
      a: "Absolutely. Many of our tools process files directly in your browser. For tools that require server processing, we delete all files immediately after processing. We never store, share, or sell your data.",
    },
    {
      q: "Can I use Tooliqo on my phone?",
      a: "Yes! Tooliqo is built with a mobile-first approach. The interface is completely responsive and works perfectly on smartphones, tablets, and desktops.",
    },
  ];

  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative pt-24 pb-20 md:pt-40 md:pb-32 px-4 sm:px-6 lg:px-8 w-full text-center overflow-hidden">
        {/* Premium Background Glow Effect */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] sm:w-[1000px] sm:h-[500px] opacity-[0.15] pointer-events-none z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-500 blur-[120px] rounded-full"></div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 max-w-5xl mx-auto space-y-10"
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-full bg-white/80 backdrop-blur-md text-slate-700 font-semibold text-sm mb-4 border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow cursor-default"
          >
            <SparklesIcon className="w-4 h-4 text-blue-500" />
            <span>100% Free Forever. No Login Required.</span>
          </motion.div>
          
          <h1 className="text-5xl sm:text-7xl md:text-[5.5rem] font-extrabold tracking-tighter text-slate-900 leading-[1.05]">
            All The Tools You Need <br className="hidden sm:block" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 pb-2">
              In One Place.
            </span>
          </h1>
          
          <p className="text-lg sm:text-2xl text-slate-500 max-w-3xl mx-auto leading-relaxed font-medium">
            100+ Free Online Tools for Images, PDF, AI, Video, Audio, Text and more. Enhance your productivity with a premium, lightning-fast platform.
          </p>

          {/* Large Hero Search Bar */}
          <div className="max-w-3xl mx-auto mt-12 relative">
            <button 
              onClick={() => setSearchOpen(true)}
              className="w-full flex items-center gap-4 bg-white/90 backdrop-blur-md border-2 border-slate-200/80 hover:border-blue-400 hover:shadow-lg hover:shadow-blue-500/10 rounded-2xl px-6 py-5 sm:px-8 sm:py-6 shadow-sm transition-all duration-300 text-left group"
            >
              <Search className="w-7 h-7 text-slate-400 group-hover:text-blue-500 transition-colors" />
              <span className="flex-1 text-xl text-slate-400 font-medium">What do you want to do today?</span>
              <kbd className="hidden sm:inline-flex items-center gap-1 px-4 py-2 bg-slate-100 rounded-xl text-sm font-bold text-slate-500 border border-slate-200 shadow-sm">
                <span>⌘</span><span>K</span>
              </kbd>
            </button>
          </div>
        </motion.div>
      </section>

      {/* Ad Placeholder (Hero) */}
      <div className="max-w-5xl mx-auto w-full px-4 mb-16">
        <div className="w-full h-[90px] md:h-[120px] bg-slate-50 border border-dashed border-slate-200 rounded-xl flex items-center justify-center text-slate-400 text-sm">
          Advertisement
        </div>
      </div>

      {/* Popular Categories */}
      <section className="py-16 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Popular Categories</h2>
              <p className="text-slate-500">Find exactly what you need quickly.</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {categories.slice(0, 12).map((category, i) => (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                key={category.id}
              >
                <Link 
                  href={`/categories/${category.id}`}
                  className="flex flex-col items-center justify-center p-6 bg-white border border-slate-200 rounded-2xl hover:border-blue-200 hover:shadow-soft transition-all group cursor-pointer h-full"
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${category.bg} group-hover:scale-110 transition-transform duration-300`}>
                    <category.icon className={`w-6 h-6 ${category.color}`} />
                  </div>
                  <span className="font-semibold text-slate-700 group-hover:text-blue-600 transition-colors">{category.name}</span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trending / Popular Tools */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-2">Trending Tools</h2>
              <p className="text-slate-500">Most used tools by our community today.</p>
            </div>
            <Link href="/tools" className="hidden sm:flex items-center text-blue-600 font-medium hover:text-blue-700">
              View all <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools.slice(0, 6).map((tool, index) => (
              <ToolCard key={tool.slug} tool={tool} index={index} />
            ))}
          </div>
          
          <div className="mt-8 text-center sm:hidden">
            <Link href="/tools" className="inline-flex items-center justify-center w-full px-6 py-3 bg-white border border-slate-200 rounded-xl font-medium text-slate-700">
              View all tools
            </Link>
          </div>
        </div>
      </section>

      {/* Ad Placeholder (Middle) */}
      <div className="max-w-7xl mx-auto w-full px-4 py-8">
        <div className="w-full h-[90px] bg-slate-50 border border-dashed border-slate-200 rounded-xl flex items-center justify-center text-slate-400 text-sm">
          Advertisement
        </div>
      </div>

      {/* Why Choose Us */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Why Choose Tooliqo?</h2>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto">
              We built this platform to be the only toolkit you'll ever need. Fast, beautiful, and always free.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 bg-slate-50 rounded-[24px] border border-slate-100">
              <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-6">
                <Zap className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Lightning Fast</h3>
              <p className="text-slate-500 leading-relaxed">
                Built on next-generation architecture. Tools load instantly and process data without frustrating delays or waiting screens.
              </p>
            </div>
            <div className="p-8 bg-slate-50 rounded-[24px] border border-slate-100">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mb-6">
                <Shield className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Secure & Private</h3>
              <p className="text-slate-500 leading-relaxed">
                Your data is yours. Many tools process locally in your browser. Server processed files are instantly wiped, guaranteeing privacy.
              </p>
            </div>
            <div className="p-8 bg-slate-50 rounded-[24px] border border-slate-100">
              <div className="w-14 h-14 bg-pink-100 text-pink-600 rounded-2xl flex items-center justify-center mb-6">
                <Heart className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">100% Free Forever</h3>
              <p className="text-slate-500 leading-relaxed">
                No hidden paywalls. No premium features. Everything is completely free and accessible without even creating an account.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-slate-500">Everything you need to know about the platform.</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm transition-all">
                <button
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <span className="font-semibold text-slate-900">{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${activeFaq === idx ? "rotate-180" : ""}`} />
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${activeFaq === idx ? "max-h-96" : "max-h-0"}`}>
                  <p className="px-6 pb-6 text-slate-500 leading-relaxed border-t border-slate-100 pt-4">
                    {faq.a}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">Ready to boost your productivity?</h2>
          <p className="text-xl text-slate-500 mb-10">Start using our premium tools for absolutely free right now.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/tools" className="px-8 py-4 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition-colors shadow-soft w-full sm:w-auto">
              Explore All Tools
            </Link>
            <Link href="/login" className="px-8 py-4 bg-white text-slate-700 font-semibold rounded-full border border-slate-200 hover:bg-slate-50 transition-colors w-full sm:w-auto">
              Create Free Account
            </Link>
          </div>
        </div>
      </section>

      <SearchBar isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </div>
  );
}

function SparklesIcon(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
      <path d="M5 3v4"/>
      <path d="M19 17v4"/>
      <path d="M3 5h4"/>
      <path d="M17 19h4"/>
    </svg>
  )
}
