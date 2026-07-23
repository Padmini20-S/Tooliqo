"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Heart } from "lucide-react";
import { tools } from "@/lib/tools";
import ToolCard from "@/components/ToolCard";

export default function FavoritesPage() {
  const [favoriteSlugs, setFavoriteSlugs] = useState<string[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("tooliqo_favorites") || "[]");
    setFavoriteSlugs(saved);
    setIsLoaded(true);
  }, []);

  const favoriteTools = tools.filter((t) => favoriteSlugs.includes(t.slug));

  if (!isLoaded) {
    return <div className="flex-1 w-full py-20 text-center text-slate-500">Loading your favorites...</div>;
  }

  return (
    <div className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-bold text-slate-900 mb-4 flex items-center justify-center gap-3">
          <Heart className="w-8 h-8 text-red-500 fill-red-500" />
          Your Favorites
        </h1>
        <p className="text-lg text-slate-500 max-w-2xl mx-auto">
          Tools you've saved for quick access.
        </p>
      </div>

      {favoriteTools.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {favoriteTools.map((tool, index) => (
            <ToolCard key={tool.slug} tool={tool} index={index} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <div className="w-20 h-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <Heart className="w-10 h-10" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">No favorites yet</h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto mb-10">
            You haven't saved any tools to your favorites yet. Click the heart icon on any tool card to save it here for quick access.
          </p>
          <Link href="/tools" className="px-8 py-4 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition-colors shadow-sm">
            Explore Tools
          </Link>
        </div>
      )}
    </div>
  );
}

