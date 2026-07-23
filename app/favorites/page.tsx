import React from "react";
import Link from "next/link";
import { Heart } from "lucide-react";

export default function FavoritesPage() {
  return (
    <div className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
      <div className="w-20 h-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
        <Heart className="w-10 h-10" />
      </div>
      <h1 className="text-4xl font-bold text-slate-900 mb-4">Your Favorites</h1>
      <p className="text-lg text-slate-500 max-w-2xl mx-auto mb-10">
        You haven't saved any tools to your favorites yet. Click the heart icon on any tool card to save it here for quick access.
      </p>
      <Link href="/tools" className="px-8 py-4 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition-colors shadow-sm">
        Explore Tools
      </Link>
    </div>
  );
}
