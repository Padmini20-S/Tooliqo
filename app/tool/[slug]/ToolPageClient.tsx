"use client";

import React, { useState, useEffect } from "react";
import { Heart, Share2, HelpCircle, ChevronDown, Check } from "lucide-react";
import { Tool } from "@/lib/tools";
import { toast } from "sonner";

interface ToolPageClientProps {
  tool: Tool;
  children: React.ReactNode;
}

export default function ToolPageClient({ tool, children }: ToolPageClientProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [copiedShare, setCopiedShare] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("tooliqo_favorites") || "[]");
    setIsFavorite(favorites.includes(tool.slug));
  }, [tool.slug]);

  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem("tooliqo_favorites") || "[]");
    let updated;
    if (isFavorite) {
      updated = favorites.filter((slug: string) => slug !== tool.slug);
      toast.success("Removed from favorites");
    } else {
      updated = [...favorites, tool.slug];
      toast.success("Added to favorites");
    }
    localStorage.setItem("tooliqo_favorites", JSON.stringify(updated));
    setIsFavorite(!isFavorite);
  };

  const handleShare = async () => {
    try {
      const shareUrl = `${window.location.origin}/tool/${tool.slug}`;
      await navigator.clipboard.writeText(shareUrl);
      setCopiedShare(true);
      toast.success("Link copied!");
      setTimeout(() => setCopiedShare(false), 2000);
    } catch (err) {
      toast.error("Failed to copy link");
    }
  };

  const faqs = [
    {
      q: `Is the ${tool.name} tool completely free?`,
      a: `Yes, like all tools on Tooliqo, the ${tool.name} is 100% free to use. There are no hidden fees, premium plans, or usage limits.`
    },
    {
      q: `Do I need to log in to use this tool?`,
      a: `No login is required. You can use the ${tool.name} and download your results instantly without creating an account.`
    },
    {
      q: `Is my data secure when using the ${tool.name}?`,
      a: `Absolutely. We prioritize your privacy. Many of our tools run locally in your browser, meaning your data never leaves your device. For tools requiring server processing, all files are automatically and permanently deleted immediately after processing.`
    },
    {
      q: `Can I use this tool on my mobile device?`,
      a: `Yes, the ${tool.name} is fully optimized for mobile devices. You can comfortably use it on any smartphone or tablet.`
    }
  ];

  return (
    <div className="space-y-12">
      {/* Tool Container */}
      <div className="card-premium p-6 sm:p-10 relative overflow-hidden">
        {/* Actions (Favorite / Share) */}
        <div className="absolute top-6 right-6 flex items-center space-x-2 z-10">
          <button
            onClick={handleShare}
            className="p-2.5 rounded-full bg-slate-50 hover:bg-slate-100 text-slate-500 hover:text-slate-700 transition-colors border border-slate-200"
            title="Share"
          >
            {copiedShare ? <Check className="w-5 h-5 text-green-500" /> : <Share2 className="w-5 h-5" />}
          </button>
          <button
            onClick={toggleFavorite}
            className={`p-2.5 rounded-full border transition-colors ${
              isFavorite 
                ? "bg-red-50 text-red-500 border-red-100" 
                : "bg-slate-50 text-slate-500 border-slate-200 hover:bg-slate-100 hover:text-red-500"
            }`}
            title="Favorite"
          >
            <Heart className={`w-5 h-5 ${isFavorite ? "fill-red-500" : ""}`} />
          </button>
        </div>

        <div className="relative z-0 mt-8 sm:mt-0">
          {children}
        </div>
      </div>

      {/* Tool FAQ */}
      <div className="max-w-3xl mx-auto pt-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-slate-900 flex items-center justify-center gap-2">
            <HelpCircle className="w-6 h-6 text-blue-500" />
            <span>FAQ about {tool.name}</span>
          </h2>
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
    </div>
  );
}
