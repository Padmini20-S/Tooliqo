"use client";

import React, { useState } from "react";
import { Search, CheckCircle2, AlertTriangle, XCircle, FileText, Code, Shield, Sparkles } from "lucide-react";

interface AuditResult {
  title: { text: string; length: number; status: "good" | "short" | "long" | "missing" };
  description: { text: string; length: number; status: "good" | "short" | "long" | "missing" };
  canonical: { url: string; present: boolean };
  openGraph: { title: boolean; description: boolean; image: boolean; type: boolean };
  headings: { h1: string[]; h2Count: number; h3Count: number };
  seoScore: number;
  suggestions: string[];
}

export default function MetaTagAnalyzer() {
  const [htmlInput, setHtmlInput] = useState(`<!DOCTYPE html>
<html>
<head>
  <title>Tooliqo — Free Developer & Network Utilities</title>
  <meta name="description" content="Fast, privacy-focused online tools for web developers, designers, and network engineers. Features JSON formatters, DNS lookups, and regex testers." />
  <link rel="canonical" href="https://tooliqo.com" />
  <meta property="og:title" content="Tooliqo Free Online Tools" />
  <meta property="og:description" content="Fast online tools for web developers." />
  <meta property="og:image" content="https://tooliqo.com/og.png" />
</head>
<body>
  <h1>All-in-One Online Developer Utilities</h1>
  <h2>Core Features</h2>
  <h2>SEO & Network Tools</h2>
  <h3>DNS Lookup</h3>
</body>
</html>`);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AuditResult | null>(null);

  const analyzeHtml = () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);

      // Extract Title
      const titleMatch = htmlInput.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
      const titleText = titleMatch ? titleMatch[1].trim() : "";
      let titleStatus: "good" | "short" | "long" | "missing" = "good";
      if (!titleText) titleStatus = "missing";
      else if (titleText.length < 30) titleStatus = "short";
      else if (titleText.length > 65) titleStatus = "long";

      // Extract Description
      const descMatch = htmlInput.match(/<meta[^>]*name=["']description["'][^>]*content=["']([\s\S]*?)["']/i);
      const descText = descMatch ? descMatch[1].trim() : "";
      let descStatus: "good" | "short" | "long" | "missing" = "good";
      if (!descText) descStatus = "missing";
      else if (descText.length < 100) descStatus = "short";
      else if (descText.length > 165) descStatus = "long";

      // Extract Canonical
      const canonicalMatch = htmlInput.match(/<link[^>]*rel=["']canonical["'][^>]*href=["']([\s\S]*?)["']/i);
      const canonicalUrl = canonicalMatch ? canonicalMatch[1].trim() : "";

      // Extract OpenGraph
      const ogTitle = /<meta[^>]*property=["']og:title["']/i.test(htmlInput);
      const ogDesc = /<meta[^>]*property=["']og:description["']/i.test(htmlInput);
      const ogImg = /<meta[^>]*property=["']og:image["']/i.test(htmlInput);
      const ogType = /<meta[^>]*property=["']og:type["']/i.test(htmlInput);

      // Headings
      const h1Matches = Array.from(htmlInput.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/gi)).map((m) => m[1].trim());
      const h2Matches = Array.from(htmlInput.matchAll(/<h2[^>]*>/gi));
      const h3Matches = Array.from(htmlInput.matchAll(/<h3[^>]*>/gi));

      // Calculate score & suggestions
      const suggestions: string[] = [];
      let score = 100;

      if (titleStatus === "missing") {
        score -= 25;
        suggestions.push("Missing <title> tag. Add a unique page title between 50-60 characters.");
      } else if (titleStatus === "short" || titleStatus === "long") {
        score -= 10;
        suggestions.push(`Title length (${titleText.length} chars) is outside optimal 50-60 char range.`);
      }

      if (descStatus === "missing") {
        score -= 20;
        suggestions.push("Missing Meta Description. Add a description between 120-160 characters.");
      } else if (descStatus === "short" || descStatus === "long") {
        score -= 10;
        suggestions.push(`Meta description length (${descText.length} chars) is outside 120-160 char range.`);
      }

      if (!canonicalUrl) {
        score -= 15;
        suggestions.push("Missing Canonical Tag. Add <link rel='canonical' href='...' /> to prevent duplicate content.");
      }

      if (h1Matches.length === 0) {
        score -= 15;
        suggestions.push("No <h1> tag found. Each page should have exactly one primary <h1> heading.");
      } else if (h1Matches.length > 1) {
        score -= 10;
        suggestions.push("Multiple <h1> tags detected. Use only one <h1> per page for optimal hierarchy.");
      }

      if (!ogTitle || !ogImg) {
        score -= 10;
        suggestions.push("Incomplete Open Graph tags. Add og:title and og:image for rich social sharing cards.");
      }

      setResult({
        title: { text: titleText, length: titleText.length, status: titleStatus },
        description: { text: descText, length: descText.length, status: descStatus },
        canonical: { url: canonicalUrl, present: Boolean(canonicalUrl) },
        openGraph: { title: ogTitle, description: ogDesc, image: ogImg, type: ogType },
        headings: { h1: h1Matches, h2Count: h2Matches.length, h3Count: h3Matches.length },
        seoScore: Math.max(0, score),
        suggestions,
      });
    }, 600);
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-zinc-900 border border-zinc-800 rounded-2xl shadow-xl space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-2 flex items-center justify-center gap-2">
          <FileText className="w-6 h-6 text-indigo-400" />
          Meta Tag & On-Page SEO Analyzer
        </h2>
        <p className="text-zinc-400">Audit HTML source code for Title tag, Meta Description, Canonical URL, OpenGraph tags, and H1-H3 heading structure.</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-zinc-300 mb-1">Paste HTML Code / Source Snippet</label>
          <textarea
            rows={8}
            value={htmlInput}
            onChange={(e) => setHtmlInput(e.target.value)}
            className="w-full p-3 font-mono text-xs bg-zinc-800 border border-zinc-700 rounded-xl text-zinc-100 placeholder-zinc-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
        </div>

        <button
          onClick={analyzeHtml}
          disabled={loading}
          className="flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 text-sm font-medium rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 transition-colors cursor-pointer"
        >
          {loading ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <Search className="w-5 h-5" />}
          {loading ? "Analyzing..." : "Analyze HTML Meta Tags"}
        </button>
      </div>

      {result && (
        <div className="space-y-6">
          {/* SEO Score Banner */}
          <div className="p-5 bg-zinc-800/40 border border-zinc-700/80 rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-indigo-600/20 border border-indigo-500/40 flex items-center justify-center font-black text-2xl text-indigo-400">
                {result.seoScore}
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Overall On-Page Meta Score</h3>
                <p className="text-xs text-zinc-400">
                  {result.seoScore >= 90 ? "Excellent meta configuration!" : "Some SEO issues detected."}
                </p>
              </div>
            </div>
          </div>

          {/* Detailed Audit Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
            {/* Title & Description */}
            <div className="p-5 bg-zinc-800/40 border border-zinc-700/80 rounded-xl space-y-4">
              <h4 className="font-bold text-white text-sm border-b border-zinc-700/50 pb-2">Title & Description</h4>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-zinc-300">Page Title</span>
                  <span className={`px-2 py-0.5 rounded font-mono ${result.title.status === "good" ? "bg-emerald-900/40 text-emerald-300" : "bg-amber-900/40 text-amber-300"}`}>
                    {result.title.length} chars
                  </span>
                </div>
                <p className="p-2.5 bg-zinc-900 rounded border border-zinc-800 text-zinc-200 font-mono">
                  {result.title.text || "<No Title Found>"}
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-zinc-300">Meta Description</span>
                  <span className={`px-2 py-0.5 rounded font-mono ${result.description.status === "good" ? "bg-emerald-900/40 text-emerald-300" : "bg-amber-900/40 text-amber-300"}`}>
                    {result.description.length} chars
                  </span>
                </div>
                <p className="p-2.5 bg-zinc-900 rounded border border-zinc-800 text-zinc-200 leading-relaxed">
                  {result.description.text || "<No Description Found>"}
                </p>
              </div>
            </div>

            {/* Technical & Social Tags */}
            <div className="p-5 bg-zinc-800/40 border border-zinc-700/80 rounded-xl space-y-4">
              <h4 className="font-bold text-white text-sm border-b border-zinc-700/50 pb-2">Technical & Headings</h4>

              <div className="space-y-2">
                <span className="font-semibold text-zinc-300 block">Canonical URL Tag</span>
                <div className="p-2.5 bg-zinc-900 rounded border border-zinc-800 font-mono text-indigo-300 flex items-center justify-between">
                  <span>{result.canonical.url || "Missing Canonical Tag"}</span>
                  {result.canonical.present ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <XCircle className="w-4 h-4 text-rose-400" />}
                </div>
              </div>

              <div className="space-y-2">
                <span className="font-semibold text-zinc-300 block">Heading Structure Breakdown</span>
                <div className="grid grid-cols-3 gap-2 text-center font-mono">
                  <div className="p-2 bg-zinc-900 rounded border border-zinc-800">
                    <span className="text-zinc-500 block text-[10px]">H1</span>
                    <span className="text-white font-bold">{result.headings.h1.length}</span>
                  </div>
                  <div className="p-2 bg-zinc-900 rounded border border-zinc-800">
                    <span className="text-zinc-500 block text-[10px]">H2</span>
                    <span className="text-white font-bold">{result.headings.h2Count}</span>
                  </div>
                  <div className="p-2 bg-zinc-900 rounded border border-zinc-800">
                    <span className="text-zinc-500 block text-[10px]">H3</span>
                    <span className="text-white font-bold">{result.headings.h3Count}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
