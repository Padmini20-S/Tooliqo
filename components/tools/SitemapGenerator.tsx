"use client";

import React, { useState } from "react";
import { FileCode, Copy, Check, Download, Plus, Trash2, Globe, Settings, List } from "lucide-react";

interface UrlItem {
  id: string;
  loc: string;
  lastmod: string;
  changefreq: string;
  priority: string;
}

export default function SitemapGenerator() {
  const [baseUrl, setBaseUrl] = useState("https://example.com");
  const [urlsText, setUrlsText] = useState(
    "/\n/about\n/services\n/pricing\n/blog\n/contact"
  );
  const [globalFreq, setGlobalFreq] = useState("weekly");
  const [globalPriority, setGlobalPriority] = useState("0.8");
  const [useTodayDate, setUseTodayDate] = useState(true);
  const [customItems, setCustomItems] = useState<UrlItem[] | null>(null);
  const [copied, setCopied] = useState(false);

  const todayStr = new Date().toISOString().split("T")[0];

  const parseUrls = (): UrlItem[] => {
    if (customItems) return customItems;
    
    const lines = urlsText.split("\n").map((l) => l.trim()).filter((l) => l.length > 0);
    const cleanBase = baseUrl.replace(/\/+$/, "");

    return lines.map((line, idx) => {
      let fullUrl = line;
      if (!/^https?:\/\//i.test(line)) {
        const path = line.startsWith("/") ? line : "/" + line;
        fullUrl = cleanBase + path;
      }
      return {
        id: idx.toString(),
        loc: fullUrl,
        lastmod: todayStr,
        changefreq: line === "/" || line === cleanBase ? "daily" : globalFreq,
        priority: line === "/" || line === cleanBase ? "1.0" : globalPriority,
      };
    });
  };

  const currentItems = parseUrls();

  const updateItem = (id: string, field: keyof UrlItem, value: string) => {
    const items = [...currentItems];
    const index = items.findIndex((item) => item.id === id);
    if (index !== -1) {
      items[index] = { ...items[index], [field]: value };
      setCustomItems(items);
    }
  };

  const resetCustom = () => {
    setCustomItems(null);
  };

  const generateXml = () => {
    const items = currentItems;
    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

    items.forEach((item) => {
      xml += `  <url>\n`;
      xml += `    <loc>${item.loc}</loc>\n`;
      if (useTodayDate && item.lastmod) {
        xml += `    <lastmod>${item.lastmod}</lastmod>\n`;
      }
      if (item.changefreq) {
        xml += `    <changefreq>${item.changefreq}</changefreq>\n`;
      }
      if (item.priority) {
        xml += `    <priority>${item.priority}</priority>\n`;
      }
      xml += `  </url>\n`;
    });

    xml += `</urlset>`;
    return xml;
  };

  const xmlContent = generateXml();

  const copyToClipboard = () => {
    navigator.clipboard.writeText(xmlContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadSitemap = () => {
    const element = document.createElement("a");
    const file = new Blob([xmlContent], { type: "text/xml" });
    element.href = URL.createObjectURL(file);
    element.download = "sitemap.xml";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-zinc-900 border border-zinc-800 rounded-2xl shadow-xl space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-2 flex items-center justify-center gap-2">
          <FileCode className="w-6 h-6 text-indigo-400" />
          XML Sitemap Generator
        </h2>
        <p className="text-zinc-400">Generate valid XML sitemaps for Google, Bing, and search engine crawlers with custom priority rules.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Inputs */}
        <div className="lg:col-span-6 space-y-5">
          <div className="p-4 bg-zinc-800/40 border border-zinc-700/80 rounded-xl space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Globe className="w-4 h-4 text-indigo-400" />
              Website Configuration
            </h3>

            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1">Base Domain URL</label>
              <input
                type="text"
                value={baseUrl}
                onChange={(e) => {
                  setBaseUrl(e.target.value);
                  resetCustom();
                }}
                className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-xs text-zinc-100 placeholder-zinc-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1">Page Paths / URLs (One per line)</label>
              <textarea
                rows={6}
                value={urlsText}
                onChange={(e) => {
                  setUrlsText(e.target.value);
                  resetCustom();
                }}
                className="w-full p-3 font-mono text-xs bg-zinc-900 border border-zinc-700 rounded-lg text-zinc-100 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="p-4 bg-zinc-800/40 border border-zinc-700/80 rounded-xl space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Settings className="w-4 h-4 text-indigo-400" />
              Global Rules & Settings
            </h3>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-semibold text-zinc-300 mb-1">Change Frequency</label>
                <select
                  value={globalFreq}
                  onChange={(e) => {
                    setGlobalFreq(e.target.value);
                    resetCustom();
                  }}
                  className="w-full px-2.5 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-zinc-200 focus:outline-none"
                >
                  <option value="always">Always</option>
                  <option value="hourly">Hourly</option>
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                  <option value="yearly">Yearly</option>
                  <option value="never">Never</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-zinc-300 mb-1">Default Priority</label>
                <select
                  value={globalPriority}
                  onChange={(e) => {
                    setGlobalPriority(e.target.value);
                    resetCustom();
                  }}
                  className="w-full px-2.5 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-zinc-200 focus:outline-none font-mono"
                >
                  <option value="1.0">1.0 (Highest)</option>
                  <option value="0.9">0.9</option>
                  <option value="0.8">0.8 (Standard)</option>
                  <option value="0.7">0.7</option>
                  <option value="0.5">0.5</option>
                  <option value="0.3">0.3 (Low)</option>
                </select>
              </div>
            </div>

            <label className="flex items-center gap-2 cursor-pointer text-xs text-zinc-300">
              <input
                type="checkbox"
                checked={useTodayDate}
                onChange={(e) => setUseTodayDate(e.target.checked)}
                className="w-4 h-4 text-indigo-600 rounded bg-zinc-900 border-zinc-700 focus:ring-indigo-500"
              />
              Include Last Modified Date (`lastmod`)
            </label>
          </div>
        </div>

        {/* Right XML Code & Preview */}
        <div className="lg:col-span-6 flex flex-col space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <List className="w-4 h-4 text-indigo-400" />
              <span className="text-sm font-bold text-white">Generated XML ({currentItems.length} URLs)</span>
            </div>

            <div className="flex gap-2">
              <button
                onClick={copyToClipboard}
                className="flex items-center gap-1 px-3 py-1.5 bg-zinc-700 hover:bg-zinc-600 text-zinc-200 text-xs font-medium rounded-lg transition-colors cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? "Copied" : "Copy XML"}
              </button>
              <button
                onClick={downloadSitemap}
                className="flex items-center gap-1 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-medium rounded-lg transition-colors cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                Download XML
              </button>
            </div>
          </div>

          <pre className="flex-1 w-full bg-black/60 border border-zinc-800 p-4 rounded-xl text-emerald-400 font-mono text-xs overflow-x-auto min-h-[380px]">
            {xmlContent}
          </pre>
        </div>
      </div>
    </div>
  );
}
