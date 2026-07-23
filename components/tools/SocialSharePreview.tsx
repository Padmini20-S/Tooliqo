"use client";

import React, { useState } from "react";
import { Share2, Eye, Globe, Image as ImageIcon, MessageSquare } from "lucide-react";

type Platform = "twitter" | "facebook" | "linkedin" | "discord";

export default function SocialSharePreview() {
  const [platform, setPlatform] = useState<Platform>("twitter");
  const [title, setTitle] = useState("Tooliqo — Free Developer & Network Tools");
  const [description, setDescription] = useState(
    "Fast, browser-based utilities for web developers and network engineers. Features JSON formatters, DNS lookups, and regex testers."
  );
  const [url, setUrl] = useState("https://tooliqo.com");
  const [image, setImage] = useState("https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&h=630&fit=crop");
  const [authorHandle, setAuthorHandle] = useState("@tooliqo");

  return (
    <div className="max-w-5xl mx-auto p-6 bg-zinc-900 border border-zinc-800 rounded-2xl shadow-xl space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-2 flex items-center justify-center gap-2">
          <Share2 className="w-6 h-6 text-indigo-400" />
          Social Share Card Simulator
        </h2>
        <p className="text-zinc-400">Preview link card renderings as they will appear when shared on Twitter/X, Facebook, LinkedIn, and Discord.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Form Inputs */}
        <div className="lg:col-span-5 space-y-4 bg-zinc-800/40 p-5 rounded-xl border border-zinc-700/80 text-xs">
          <h3 className="font-bold text-white text-sm border-b border-zinc-700/50 pb-2">Card Metadata Parameters</h3>

          <div>
            <label className="block font-semibold text-zinc-300 mb-1">Title (`og:title` / `twitter:title`)</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-zinc-100 focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-semibold text-zinc-300 mb-1">Description</label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2.5 bg-zinc-900 border border-zinc-700 rounded-lg text-zinc-100 focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-semibold text-zinc-300 mb-1">Domain / Link URL</label>
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-zinc-100 focus:outline-none font-mono"
            />
          </div>

          <div>
            <label className="block font-semibold text-zinc-300 mb-1">Image URL</label>
            <input
              type="text"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-zinc-100 focus:outline-none font-mono text-[11px]"
            />
          </div>
        </div>

        {/* Live Card Renderers */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex bg-zinc-800 p-1 rounded-xl border border-zinc-700 justify-center gap-1 text-xs font-semibold">
            {(["twitter", "facebook", "linkedin", "discord"] as Platform[]).map((p) => (
              <button
                key={p}
                onClick={() => setPlatform(p)}
                className={`px-4 py-2 capitalize rounded-lg transition-colors cursor-pointer ${
                  platform === p ? "bg-indigo-600 text-white" : "text-zinc-400 hover:text-zinc-200"
                }`}
              >
                {p}
              </button>
            ))}
          </div>

          {/* Render Preview Card per Platform */}
          <div className="p-6 bg-zinc-950 rounded-2xl border border-zinc-800 min-h-[320px] flex items-center justify-center">
            {platform === "twitter" && (
              <div className="max-w-md w-full bg-black border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl">
                <div className="h-48 bg-zinc-900 overflow-hidden relative">
                  <img src={image} alt="Twitter Card" className="w-full h-full object-cover" />
                </div>
                <div className="p-3 bg-black space-y-1">
                  <span className="text-[11px] text-zinc-500 font-mono block">{url.replace(/^https?:\/\//, "")}</span>
                  <h4 className="text-sm font-bold text-white line-clamp-1">{title}</h4>
                  <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">{description}</p>
                </div>
              </div>
            )}

            {platform === "facebook" && (
              <div className="max-w-md w-full bg-[#242526] border border-[#3e4042] rounded-lg overflow-hidden shadow-2xl">
                <div className="h-48 bg-zinc-900 overflow-hidden">
                  <img src={image} alt="FB Card" className="w-full h-full object-cover" />
                </div>
                <div className="p-3 bg-[#242526] border-t border-[#3e4042] space-y-1">
                  <span className="text-[10px] uppercase text-[#b0b3b8] tracking-wider block font-medium">
                    {url.replace(/^https?:\/\//, "")}
                  </span>
                  <h4 className="text-sm font-bold text-[#e4e6eb] line-clamp-1">{title}</h4>
                  <p className="text-xs text-[#b0b3b8] line-clamp-2 leading-relaxed">{description}</p>
                </div>
              </div>
            )}

            {platform === "linkedin" && (
              <div className="max-w-md w-full bg-zinc-900 border border-zinc-700 rounded-lg overflow-hidden shadow-2xl">
                <div className="h-48 bg-zinc-800 overflow-hidden">
                  <img src={image} alt="LinkedIn Card" className="w-full h-full object-cover" />
                </div>
                <div className="p-3 bg-zinc-900 space-y-1 border-t border-zinc-800">
                  <h4 className="text-sm font-bold text-white line-clamp-1">{title}</h4>
                  <span className="text-[11px] text-zinc-400 block">{url.replace(/^https?:\/\//, "")}</span>
                </div>
              </div>
            )}

            {platform === "discord" && (
              <div className="max-w-md w-full bg-[#2f3136] border-l-4 border-l-indigo-500 rounded-r-lg p-4 space-y-2 shadow-2xl">
                <span className="text-[11px] font-medium text-zinc-400 block">{url}</span>
                <h4 className="text-sm font-bold text-white hover:underline cursor-pointer">{title}</h4>
                <p className="text-xs text-zinc-300 leading-relaxed">{description}</p>
                <div className="h-40 rounded-lg overflow-hidden mt-2">
                  <img src={image} alt="Discord Embed" className="w-full h-full object-cover" />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
