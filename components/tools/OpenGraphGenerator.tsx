"use client";

import React, { useState } from "react";
import { Share2, Copy, Check, Eye, Globe, Image as ImageIcon } from "lucide-react";

export default function OpenGraphGenerator() {
  const [ogTitle, setOgTitle] = useState("Tooliqo — Free Developer & Network Tools");
  const [ogDescription, setOgDescription] = useState(
    "Fast, secure, and intuitive browser utilities for developers, network engineers, and SEO specialists."
  );
  const [ogUrl, setOgUrl] = useState("https://tooliqo.com");
  const [ogImage, setOgImage] = useState("https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&h=630&fit=crop");
  const [ogType, setOgType] = useState("website");
  const [siteName, setSiteName] = useState("Tooliqo");
  const [twitterCard, setTwitterCard] = useState("summary_large_image");
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<"html" | "nextjs">("html");

  const htmlSnippet = `<!-- Open Graph / Facebook -->
<meta property="og:type" content="${ogType}" />
<meta property="og:url" content="${ogUrl}" />
<meta property="og:title" content="${ogTitle}" />
<meta property="og:description" content="${ogDescription}" />
<meta property="og:image" content="${ogImage}" />
<meta property="og:site_name" content="${siteName}" />

<!-- Twitter / X -->
<meta name="twitter:card" content="${twitterCard}" />
<meta name="twitter:url" content="${ogUrl}" />
<meta name="twitter:title" content="${ogTitle}" />
<meta name="twitter:description" content="${ogDescription}" />
<meta name="twitter:image" content="${ogImage}" />`;

  const nextJsSnippet = `export const metadata = {
  title: "${ogTitle}",
  description: "${ogDescription}",
  openGraph: {
    title: "${ogTitle}",
    description: "${ogDescription}",
    url: "${ogUrl}",
    siteName: "${siteName}",
    images: [
      {
        url: "${ogImage}",
        width: 1200,
        height: 630,
      },
    ],
    type: "${ogType}",
  },
  twitter: {
    card: "${twitterCard}",
    title: "${ogTitle}",
    description: "${ogDescription}",
    images: ["${ogImage}"],
  },
};`;

  const currentCode = activeTab === "html" ? htmlSnippet : nextJsSnippet;

  const copyCode = () => {
    navigator.clipboard.writeText(currentCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-zinc-900 border border-zinc-800 rounded-2xl shadow-xl space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-2 flex items-center justify-center gap-2">
          <Share2 className="w-6 h-6 text-indigo-400" />
          Open Graph Meta Tag Generator
        </h2>
        <p className="text-zinc-400">Generate Open Graph & Twitter Card social meta tags with real-time card previews.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-6 space-y-4 bg-zinc-800/40 p-5 rounded-xl border border-zinc-700/80">
          <h3 className="text-sm font-bold text-white flex items-center gap-2 border-b border-zinc-700/50 pb-3">
            <Globe className="w-4 h-4 text-indigo-400" />
            Meta Data Properties
          </h3>

          <div className="space-y-3 text-xs">
            <div>
              <label className="block font-semibold text-zinc-300 mb-1">og:title</label>
              <input
                type="text"
                value={ogTitle}
                onChange={(e) => setOgTitle(e.target.value)}
                className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-zinc-100 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
              <span className="text-[10px] text-zinc-500 mt-0.5 block">{ogTitle.length} / 60 characters recommended</span>
            </div>

            <div>
              <label className="block font-semibold text-zinc-300 mb-1">og:description</label>
              <textarea
                rows={3}
                value={ogDescription}
                onChange={(e) => setOgDescription(e.target.value)}
                className="w-full p-2.5 bg-zinc-900 border border-zinc-700 rounded-lg text-zinc-100 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
              <span className="text-[10px] text-zinc-500 mt-0.5 block">{ogDescription.length} / 155 characters recommended</span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-zinc-300 mb-1">og:url</label>
                <input
                  type="text"
                  value={ogUrl}
                  onChange={(e) => setOgUrl(e.target.value)}
                  className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-zinc-100 focus:outline-none"
                />
              </div>
              <div>
                <label className="block font-semibold text-zinc-300 mb-1">og:site_name</label>
                <input
                  type="text"
                  value={siteName}
                  onChange={(e) => setSiteName(e.target.value)}
                  className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-zinc-100 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-zinc-300 mb-1">og:image URL (1200x630)</label>
              <input
                type="text"
                value={ogImage}
                onChange={(e) => setOgImage(e.target.value)}
                className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-zinc-100 focus:outline-none font-mono text-[11px]"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-zinc-300 mb-1">og:type</label>
                <select
                  value={ogType}
                  onChange={(e) => setOgType(e.target.value)}
                  className="w-full px-2.5 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-zinc-200 focus:outline-none"
                >
                  <option value="website">website</option>
                  <option value="article">article</option>
                  <option value="product">product</option>
                  <option value="profile">profile</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-zinc-300 mb-1">twitter:card</label>
                <select
                  value={twitterCard}
                  onChange={(e) => setTwitterCard(e.target.value)}
                  className="w-full px-2.5 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-zinc-200 focus:outline-none"
                >
                  <option value="summary_large_image">summary_large_image</option>
                  <option value="summary">summary</option>
                  <option value="player">player</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-6 space-y-6">
          <div className="p-4 bg-zinc-800/40 border border-zinc-700/80 rounded-xl space-y-3">
            <h3 className="text-xs font-bold text-zinc-300 uppercase tracking-wider flex items-center gap-1.5">
              <Eye className="w-3.5 h-3.5 text-indigo-400" />
              Live Facebook / LinkedIn Card Preview
            </h3>

            <div className="max-w-md mx-auto bg-zinc-950 border border-zinc-800 rounded-xl overflow-hidden shadow-lg">
              <div className="h-44 bg-zinc-900 relative overflow-hidden flex items-center justify-center">
                {ogImage ? (
                  <img src={ogImage} alt="OG Card" className="w-full h-full object-cover" />
                ) : (
                  <ImageIcon className="w-8 h-8 text-zinc-700" />
                )}
              </div>
              <div className="p-3 bg-zinc-900/90 border-t border-zinc-800 space-y-1">
                <span className="text-[10px] font-medium text-zinc-400 uppercase tracking-wider block">
                  {ogUrl.replace(/^https?:\/\//, "")}
                </span>
                <h4 className="text-xs font-bold text-white line-clamp-1">{ogTitle || "Untitled Page"}</h4>
                <p className="text-[11px] text-zinc-400 line-clamp-2 leading-relaxed">{ogDescription || "No description provided."}</p>
              </div>
            </div>
          </div>

          <div className="p-4 bg-zinc-800/40 border border-zinc-700/80 rounded-xl space-y-3">
            <div className="flex justify-between items-center">
              <div className="flex gap-2">
                <button
                  onClick={() => setActiveTab("html")}
                  className={`px-3 py-1 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                    activeTab === "html" ? "bg-indigo-600 text-white" : "bg-zinc-800 text-zinc-400 hover:text-zinc-200"
                  }`}
                >
                  HTML Tags
                </button>
                <button
                  onClick={() => setActiveTab("nextjs")}
                  className={`px-3 py-1 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                    activeTab === "nextjs" ? "bg-indigo-600 text-white" : "bg-zinc-800 text-zinc-400 hover:text-zinc-200"
                  }`}
                >
                  Next.js Metadata
                </button>
              </div>

              <button
                onClick={copyCode}
                className="flex items-center gap-1 px-3 py-1 bg-zinc-700 hover:bg-zinc-600 text-zinc-200 text-xs font-medium rounded-lg transition-colors cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? "Copied" : "Copy Code"}
              </button>
            </div>

            <pre className="w-full bg-black/60 border border-zinc-800 p-3 rounded-lg text-emerald-400 font-mono text-[11px] overflow-x-auto min-h-[160px]">
              {currentCode}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
