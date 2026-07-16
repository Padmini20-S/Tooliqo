"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Braces, Key, FileDiff, QrCode, CaseSensitive, Binary, 
  Eye, Link2, Lock, Palette, Sparkles, SearchCode, Terminal, 
  Star, Share2, ArrowUpRight, Check 
} from "lucide-react";
import { Tool } from "@/lib/tools";
import { motion } from "framer-motion";
import { toast } from "sonner";

interface ToolCardProps {
  tool: Tool;
  index?: number;
}

export default function ToolCard({ tool, index = 0 }: ToolCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [copiedShare, setCopiedShare] = useState(false);

  // Read favorite state on load
  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("tooliqo_favorites") || "[]");
    setIsFavorite(favorites.includes(tool.slug));
  }, [tool.slug]);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const favorites = JSON.parse(localStorage.getItem("tooliqo_favorites") || "[]");
    let updated;
    if (isFavorite) {
      updated = favorites.filter((slug: string) => slug !== tool.slug);
      toast.success("Removed from favorites");
    } else {
      updated = [...favorites, tool.slug];
      toast.success("Added to favorites", { icon: "🌟" });
    }
    localStorage.setItem("tooliqo_favorites", JSON.stringify(updated));
    setIsFavorite(!isFavorite);
  };

  const handleShare = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      const shareUrl = `${window.location.origin}/tool/${tool.slug}`;
      await navigator.clipboard.writeText(shareUrl);
      setCopiedShare(true);
      toast.success("Link copied to clipboard!");
      setTimeout(() => setCopiedShare(false), 2000);
    } catch (err) {
      console.error(err);
      toast.error("Failed to copy link");
    }
  };

  const renderIcon = (iconName: string) => {
    const props = { className: "w-5 h-5 transition-transform duration-500 group-hover:scale-110" };
    switch (iconName) {
      case "Braces":
        return <Braces {...props} />;
      case "Key":
        return <Key {...props} />;
      case "FileDiff":
        return <FileDiff {...props} />;
      case "QrCode":
        return <QrCode {...props} />;
      case "CaseSensitive":
        return <CaseSensitive {...props} />;
      case "Binary":
        return <Binary {...props} />;
      case "Eye":
        return <Eye {...props} />;
      case "Link2":
        return <Link2 {...props} />;
      case "Lock":
        return <Lock {...props} />;
      case "Palette":
        return <Palette {...props} />;
      case "Sparkles":
        return <Sparkles {...props} />;
      case "SearchCode":
        return <SearchCode {...props} />;
      default:
        return <Terminal {...props} />;
    }
  };

  const getGradientText = (cat: string) => {
    switch (cat) {
      case "dev":
        return "from-blue-500 to-indigo-500 text-indigo-600 dark:text-indigo-400";
      case "design":
        return "from-pink-500 to-rose-500 text-rose-600 dark:text-rose-400";
      case "text":
        return "from-amber-500 to-orange-500 text-amber-600 dark:text-amber-400";
      case "utility":
        return "from-emerald-500 to-teal-500 text-emerald-600 dark:text-emerald-400";
      default:
        return "from-zinc-500 to-slate-500 text-zinc-650 dark:text-zinc-400";
    }
  };

  const getIconContainerColor = (cat: string) => {
    switch (cat) {
      case "dev":
        return "bg-indigo-50 dark:bg-indigo-950/30 text-indigo-600 dark:text-indigo-400 border-indigo-100/50 dark:border-indigo-900/35";
      case "design":
        return "bg-rose-50 dark:bg-rose-950/30 text-rose-600 dark:text-rose-400 border-rose-100/50 dark:border-rose-900/35";
      case "text":
        return "bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400 border-amber-100/50 dark:border-amber-900/35";
      case "utility":
        return "bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 border-emerald-100/50 dark:border-emerald-900/35";
      default:
        return "bg-zinc-50 dark:bg-zinc-950/30 text-zinc-650 dark:text-zinc-450 border-zinc-150 dark:border-zinc-800/35";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
    >
      <Link
        href={`/tool/${tool.slug}`}
        className="group relative flex flex-col justify-between overflow-hidden rounded-2xl p-6 glass-card shadow-sm hover:shadow-xl dark:hover:shadow-zinc-950/40 transition-all duration-300 hover:-translate-y-1 block h-full"
      >
        {/* Dynamic hover color shine glows */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-transparent to-zinc-50/50 dark:to-zinc-850/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

        <div className="space-y-4">
          {/* Header Icon, Badges, Lock/Favorites */}
          <div className="flex items-center justify-between">
            <span className={`flex items-center justify-center w-11 h-11 rounded-xl border shadow-inner ${getIconContainerColor(tool.category)}`}>
              {renderIcon(tool.icon)}
            </span>

            <div className="flex items-center space-x-1.5">
              {/* Share */}
              <button
                onClick={handleShare}
                className="p-1.5 rounded-lg border border-zinc-200/50 dark:border-zinc-800 text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors z-10 relative"
                title="Copy link to tool"
              >
                {copiedShare ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Share2 className="w-3.5 h-3.5" />}
              </button>

              {/* Favorite */}
              <button
                onClick={toggleFavorite}
                className={`p-1.5 rounded-lg border border-zinc-200/50 dark:border-zinc-800 transition-colors z-10 relative ${
                  isFavorite 
                    ? "text-amber-500 bg-amber-50 dark:bg-amber-950/20 border-amber-200/50" 
                    : "text-zinc-400 hover:text-amber-500 hover:bg-zinc-100 dark:hover:bg-zinc-900"
                }`}
                title={isFavorite ? "Remove from Favorites" : "Add to Favorites"}
              >
                <Star className={`w-3.5 h-3.5 ${isFavorite ? "fill-amber-500" : ""}`} />
              </button>
            </div>
          </div>

          {/* Text Description */}
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <span className="text-[9px] font-bold font-mono uppercase tracking-wider px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-850 text-zinc-500 dark:text-zinc-400 border border-zinc-200/30 dark:border-zinc-800/30">
                {tool.category === "dev" ? "DevUtility" : tool.category === "design" ? "Creative" : tool.category === "text" ? "Editor" : "Utility"}
              </span>
            </div>
            <h3 className="text-base font-bold text-zinc-850 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300">
              {tool.name}
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-2 leading-relaxed">
              {tool.description}
            </p>
          </div>
        </div>

        {/* Action Footer */}
        <div className="mt-6 pt-4 border-t border-zinc-150/40 dark:border-zinc-800/40 flex items-center justify-between text-xs font-semibold text-zinc-500 dark:text-zinc-400">
          <span className="group-hover:text-indigo-650 dark:group-hover:text-indigo-400 transition-colors">Launch Tool</span>
          <span className="flex items-center justify-center w-7 h-7 rounded-lg border border-zinc-200/60 dark:border-zinc-800/60 bg-zinc-50 dark:bg-zinc-900 text-zinc-400 group-hover:bg-indigo-500 dark:group-hover:bg-indigo-650 group-hover:text-white transition-all duration-300 transform group-hover:rotate-45">
            <ArrowUpRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
