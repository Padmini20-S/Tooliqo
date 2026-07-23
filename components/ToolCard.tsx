"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Heart, Share2, ArrowRight, Check, Sparkles, Image as ImageIcon, 
  FileText, Video, Music, Bot, Code, Calculator, ArrowLeftRight, 
  QrCode, Palette, SearchCheck, Type
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
      toast.success("Added to favorites");
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
      toast.success("Link copied!");
      setTimeout(() => setCopiedShare(false), 2000);
    } catch (err) {
      toast.error("Failed to copy link");
    }
  };

  const renderIcon = (iconName: string) => {
    const props = { className: "w-6 h-6 transition-transform duration-300 group-hover:scale-110" };
    switch (iconName) {
      case "ImageIcon": return <ImageIcon {...props} />;
      case "FileText": return <FileText {...props} />;
      case "Video": return <Video {...props} />;
      case "Music": return <Music {...props} />;
      case "Bot": return <Bot {...props} />;
      case "Code": return <Code {...props} />;
      case "Calculator": return <Calculator {...props} />;
      case "ArrowLeftRight": return <ArrowLeftRight {...props} />;
      case "QrCode": return <QrCode {...props} />;
      case "Palette": return <Palette {...props} />;
      case "SearchCheck": return <SearchCheck {...props} />;
      case "Type": return <Type {...props} />;
      default: return <Sparkles {...props} />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="h-full"
    >
      <Link
        href={`/tool/${tool.slug}`}
        className="group flex flex-col justify-between h-full card-premium p-6 cursor-pointer"
      >
        <div className="space-y-4">
          <div className="flex items-start justify-between">
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-[14px] flex items-center justify-center">
              {renderIcon(tool.icon)}
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={handleShare}
                className="p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors z-10 relative"
                title="Share tool"
              >
                {copiedShare ? <Check className="w-4 h-4 text-green-500" /> : <Share2 className="w-4 h-4" />}
              </button>

              <button
                onClick={toggleFavorite}
                className={`p-2 rounded-full transition-colors z-10 relative ${
                  isFavorite 
                    ? "text-red-500 bg-red-50" 
                    : "text-slate-400 hover:text-red-500 hover:bg-slate-100"
                }`}
                title="Favorite"
              >
                <Heart className={`w-4 h-4 ${isFavorite ? "fill-red-500" : ""}`} />
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
              {tool.name}
            </h3>
            <p className="text-sm text-slate-500 line-clamp-2 leading-relaxed">
              {tool.description}
            </p>
          </div>
        </div>

        <div className="mt-6 flex items-center text-sm font-semibold text-slate-400 group-hover:text-blue-600 transition-colors">
          <span>Use Tool</span>
          <ArrowRight className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" />
        </div>
      </Link>
    </motion.div>
  );
}
