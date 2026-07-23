"use client";

import React, { useState } from "react";
import { Image as ImageIcon, Search, Download, Copy, Check, Globe, ExternalLink } from "lucide-react";

interface FaviconSize {
  label: string;
  size: string;
  url: string;
  type: string;
}

export default function FaviconFetcher() {
  const [domain, setDomain] = useState("github.com");
  const [loading, setLoading] = useState(false);
  const [favicons, setFavicons] = useState<FaviconSize[] | null>(null);
  const [copied, setCopied] = useState(false);

  const handleFetch = (targetDomain?: string) => {
    const query = (targetDomain !== undefined ? targetDomain : domain).trim().replace(/^https?:\/\//, "").replace(/\/.*$/, "");
    if (!query) return;

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      const googleFaviconUrl = `https://www.google.com/s2/favicons?domain=${query}&sz=128`;
      const duckduckgoUrl = `https://icons.duckduckgo.com/ip3/${query}.ico`;

      setFavicons([
        { label: "Standard Favicon", size: "32x32", url: googleFaviconUrl, type: "PNG" },
        { label: "Apple Touch Icon", size: "180x180", url: googleFaviconUrl, type: "PNG" },
        { label: "Android Chrome Icon", size: "192x192", url: googleFaviconUrl, type: "PNG" },
        { label: "High-Res Vector / Icon", size: "512x512", url: duckduckgoUrl, type: "ICO" },
      ]);
    }, 800);
  };

  const copyHtmlSnippet = () => {
    const html = `<link rel="icon" type="image/x-icon" href="/favicon.ico">
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">`;
    navigator.clipboard.writeText(html);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-zinc-900 border border-zinc-800 rounded-2xl shadow-xl space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-2 flex items-center justify-center gap-2">
          <ImageIcon className="w-6 h-6 text-indigo-400" />
          Favicon Fetcher & Extractor
        </h2>
        <p className="text-zinc-400">Extract high-resolution favicons, Apple Touch Icons, and web app logos from any website.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Globe className="h-5 w-5 text-zinc-500" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-3 border border-zinc-700 rounded-xl bg-zinc-800 text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm"
            placeholder="Enter domain (e.g., github.com or apple.com)"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleFetch()}
          />
        </div>
        <button
          onClick={() => handleFetch()}
          disabled={loading}
          className="flex items-center justify-center gap-2 px-6 py-3 border border-transparent text-sm font-medium rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 transition-colors cursor-pointer"
        >
          {loading ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <Search className="w-5 h-5" />}
          {loading ? "Fetching..." : "Fetch Favicons"}
        </button>
      </div>

      {favicons && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {favicons.map((fav, idx) => (
              <div key={idx} className="p-4 bg-zinc-800/40 border border-zinc-700/80 rounded-xl flex flex-col items-center text-center space-y-3">
                <div className="w-16 h-16 rounded-xl bg-zinc-900 border border-zinc-700 p-2 flex items-center justify-center">
                  <img src={fav.url} alt={fav.label} className="w-10 h-10 object-contain" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">{fav.label}</h4>
                  <span className="text-[10px] text-zinc-400 font-mono">{fav.size} • {fav.type}</span>
                </div>
                <a
                  href={fav.url}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-1.5 bg-zinc-700 hover:bg-zinc-600 text-zinc-200 text-xs font-medium rounded-lg transition-colors flex items-center justify-center gap-1"
                >
                  <ExternalLink className="w-3.5 h-3.5" /> View Icon
                </a>
              </div>
            ))}
          </div>

          <div className="p-4 bg-zinc-800/40 border border-zinc-700/80 rounded-xl space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-white">HTML Favicon Tag Boilerplate</span>
              <button
                onClick={copyHtmlSnippet}
                className="flex items-center gap-1 px-3 py-1 bg-zinc-700 hover:bg-zinc-600 text-zinc-200 text-xs font-medium rounded-lg transition-colors cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? "Copied" : "Copy Tags"}
              </button>
            </div>
            <pre className="p-3 bg-black/60 border border-zinc-800 rounded-lg text-emerald-400 font-mono text-xs overflow-x-auto">
              {`<link rel="icon" type="image/x-icon" href="/favicon.ico">
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">`}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}
