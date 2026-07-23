"use client";

import React, { useState } from "react";
import { Search, Monitor, Smartphone, Globe, Star, AlertCircle } from "lucide-react";

export default function GoogleSerpSimulator() {
  const [title, setTitle] = useState("Tooliqo — Free Online Developer & Network Tools");
  const [url, setUrl] = useState("https://tooliqo.com/tools/json-formatter");
  const [description, setDescription] = useState(
    "Free online developer tools including JSON Formatter, DNS Lookup, Base64 Codec, and Regex Tester. Fast, browser-based, and completely free."
  );
  const [showRating, setShowRating] = useState(true);
  const [rating, setRating] = useState("4.9");
  const [reviewsCount, setReviewsCount] = useState("1,240");
  const [showDate, setShowDate] = useState(true);
  const [dateStr, setDateStr] = useState("Oct 14, 2025");
  const [viewMode, setViewMode] = useState<"desktop" | "mobile">("desktop");

  const titlePixelWidth = Math.round(title.length * 9.2); // ~9.2px per char estimation
  const maxTitlePixels = 580;
  const isTitleOver = titlePixelWidth > maxTitlePixels;

  const descPixelWidth = Math.round(description.length * 6.5);
  const maxDescPixels = 960;
  const isDescOver = descPixelWidth > maxDescPixels;

  return (
    <div className="max-w-5xl mx-auto p-6 bg-zinc-900 border border-zinc-800 rounded-2xl shadow-xl space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-2 flex items-center justify-center gap-2">
          <Search className="w-6 h-6 text-indigo-400" />
          Google SERP Snippet Simulator
        </h2>
        <p className="text-zinc-400">Preview how your web page title, URL breadcrumb, and meta description render in Google search results.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Input Form */}
        <div className="lg:col-span-5 space-y-4 bg-zinc-800/40 p-5 rounded-xl border border-zinc-700/80 text-xs">
          <h3 className="font-bold text-white text-sm border-b border-zinc-700/50 pb-2">SERP Snippet Controls</h3>

          <div>
            <div className="flex justify-between font-semibold text-zinc-300 mb-1">
              <span>SEO Title</span>
              <span className={isTitleOver ? "text-rose-400 font-mono" : "text-emerald-400 font-mono"}>
                {title.length} chars (~{titlePixelWidth}px / {maxTitlePixels}px)
              </span>
            </div>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-zinc-100 focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-semibold text-zinc-300 mb-1">Target URL</label>
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-zinc-100 focus:outline-none font-mono"
            />
          </div>

          <div>
            <div className="flex justify-between font-semibold text-zinc-300 mb-1">
              <span>Meta Description</span>
              <span className={isDescOver ? "text-rose-400 font-mono" : "text-emerald-400 font-mono"}>
                {description.length} chars
              </span>
            </div>
            <textarea
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2.5 bg-zinc-900 border border-zinc-700 rounded-lg text-zinc-100 focus:outline-none"
            />
          </div>

          <div className="space-y-2 pt-2 border-t border-zinc-700/50">
            <label className="flex items-center gap-2 cursor-pointer text-zinc-300">
              <input
                type="checkbox"
                checked={showRating}
                onChange={(e) => setShowRating(e.target.checked)}
                className="w-4 h-4 text-indigo-600 rounded bg-zinc-900 border-zinc-700"
              />
              Include Rating Snippet (Schema.org AggregateRating)
            </label>

            <label className="flex items-center gap-2 cursor-pointer text-zinc-300">
              <input
                type="checkbox"
                checked={showDate}
                onChange={(e) => setShowDate(e.target.checked)}
                className="w-4 h-4 text-indigo-600 rounded bg-zinc-900 border-zinc-700"
              />
              Include Date Snippet Badge
            </label>
          </div>
        </div>

        {/* Live SERP Snippet Preview Box */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex justify-between items-center bg-zinc-800/40 p-3 rounded-xl border border-zinc-700/80">
            <span className="text-xs font-bold text-zinc-300">Live Google SERP Card</span>
            <div className="flex bg-zinc-900 p-1 rounded-lg border border-zinc-700 text-xs">
              <button
                onClick={() => setViewMode("desktop")}
                className={`flex items-center gap-1 px-3 py-1 font-medium rounded cursor-pointer ${
                  viewMode === "desktop" ? "bg-indigo-600 text-white" : "text-zinc-400"
                }`}
              >
                <Monitor className="w-3.5 h-3.5" /> Desktop
              </button>
              <button
                onClick={() => setViewMode("mobile")}
                className={`flex items-center gap-1 px-3 py-1 font-medium rounded cursor-pointer ${
                  viewMode === "mobile" ? "bg-indigo-600 text-white" : "text-zinc-400"
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" /> Mobile
              </button>
            </div>
          </div>

          <div className={`p-6 bg-white rounded-2xl shadow-xl border border-slate-200 text-slate-900 ${viewMode === "mobile" ? "max-w-md mx-auto" : "w-full"}`}>
            {/* Website Icon & Header */}
            <div className="flex items-center gap-2 mb-1">
              <div className="w-7 h-7 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700 font-bold text-xs">
                T
              </div>
              <div className="flex flex-col text-xs leading-tight">
                <span className="font-semibold text-slate-900">Tooliqo</span>
                <span className="text-slate-500 font-mono text-[11px] truncate max-w-sm">{url}</span>
              </div>
            </div>

            {/* Title */}
            <h3 className="text-xl text-[#1a0dab] font-normal hover:underline cursor-pointer leading-snug line-clamp-1">
              {title || "Untitled Page"}
            </h3>

            {/* Optional Rich Rating Stars */}
            {showRating && (
              <div className="flex items-center gap-1 my-1 text-xs text-amber-500 font-medium">
                <span className="font-bold text-slate-700">{rating}</span>
                <div className="flex text-amber-400">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <Star className="w-3.5 h-3.5 fill-current" />
                </div>
                <span className="text-slate-500 text-[11px]">({reviewsCount} reviews)</span>
              </div>
            )}

            {/* Description */}
            <p className="text-xs text-[#4d5156] leading-relaxed line-clamp-2 mt-1">
              {showDate && <span className="text-slate-500 mr-1 font-medium">{dateStr} —</span>}
              {description || "No description provided."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
