"use client";

import React, { useState } from "react";
import { Gauge, Monitor, Smartphone, Search, Zap, CheckCircle2, AlertTriangle, ArrowUpRight } from "lucide-react";

interface LighthouseAudit {
  url: string;
  device: "mobile" | "desktop";
  scores: { performance: number; accessibility: number; bestPractices: number; seo: number };
  vitals: {
    fcp: { val: string; status: "good" | "needs-improvement" | "poor" };
    lcp: { val: string; status: "good" | "needs-improvement" | "poor" };
    cls: { val: string; status: "good" | "needs-improvement" | "poor" };
    tbt: { val: string; status: "good" | "needs-improvement" | "poor" };
    si: { val: string; status: "good" | "needs-improvement" | "poor" };
  };
  opportunities: { title: string; savings: string; description: string }[];
}

export default function PageSpeedInsightsMock() {
  const [url, setUrl] = useState("https://tooliqo.com");
  const [device, setDevice] = useState<"mobile" | "desktop">("mobile");
  const [loading, setLoading] = useState(false);
  const [audit, setAudit] = useState<LighthouseAudit | null>(null);

  const handleAudit = () => {
    if (!url.trim()) return;
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      const isMobile = device === "mobile";

      setAudit({
        url: url.trim(),
        device,
        scores: {
          performance: isMobile ? 88 : 98,
          accessibility: 96,
          bestPractices: 100,
          seo: 95,
        },
        vitals: {
          fcp: { val: isMobile ? "1.2 s" : "0.5 s", status: "good" },
          lcp: { val: isMobile ? "2.1 s" : "0.9 s", status: "good" },
          cls: { val: "0.01", status: "good" },
          tbt: { val: isMobile ? "110 ms" : "15 ms", status: "good" },
          si: { val: isMobile ? "2.4 s" : "1.1 s", status: "good" },
        },
        opportunities: [
          {
            title: "Properly size images",
            savings: "0.45 s",
            description: "Serve images that are appropriately-sized to save cellular data and improve load time.",
          },
          {
            title: "Eliminate render-blocking resources",
            savings: "0.30 s",
            description: "Resources are blocking the first paint of your page. Consider delivering critical JS/CSS inline.",
          },
          {
            title: "Minify JavaScript and CSS",
            savings: "0.15 s",
            description: "Compress source bundles to reduce bandwidth payload.",
          },
        ],
      });
    }, 1400);
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-emerald-400 border-emerald-500 bg-emerald-950/30";
    if (score >= 50) return "text-amber-400 border-amber-500 bg-amber-950/30";
    return "text-rose-400 border-rose-500 bg-rose-950/30";
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-zinc-900 border border-zinc-800 rounded-2xl shadow-xl space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-2 flex items-center justify-center gap-2">
          <Zap className="w-6 h-6 text-indigo-400" />
          PageSpeed & Core Web Vitals Auditor
        </h2>
        <p className="text-zinc-400">Simulate Google Lighthouse performance scores and Core Web Vitals (FCP, LCP, CLS, TBT) diagnostic audits.</p>
      </div>

      <div className="space-y-4">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Zap className="h-5 w-5 text-zinc-500" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-3 border border-zinc-700 rounded-xl bg-zinc-800 text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm"
              placeholder="Enter URL to audit (e.g. https://tooliqo.com)"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && !loading && handleAudit()}
            />
          </div>

          <div className="flex gap-2">
            <div className="flex bg-zinc-800 p-1 rounded-xl border border-zinc-700 text-xs">
              <button
                onClick={() => setDevice("mobile")}
                className={`flex items-center gap-1 px-3 py-2 font-medium rounded-lg cursor-pointer ${
                  device === "mobile" ? "bg-indigo-600 text-white" : "text-zinc-400"
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" /> Mobile
              </button>
              <button
                onClick={() => setDevice("desktop")}
                className={`flex items-center gap-1 px-3 py-2 font-medium rounded-lg cursor-pointer ${
                  device === "desktop" ? "bg-indigo-600 text-white" : "text-zinc-400"
                }`}
              >
                <Monitor className="w-3.5 h-3.5" /> Desktop
              </button>
            </div>

            <button
              onClick={handleAudit}
              disabled={loading}
              className="flex items-center justify-center gap-2 px-6 py-3 border border-transparent text-sm font-medium rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 transition-colors cursor-pointer"
            >
              {loading ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <Search className="w-5 h-5" />}
              {loading ? "Analyzing..." : "Analyze Page"}
            </button>
          </div>
        </div>
      </div>

      {audit && (
        <div className="space-y-6">
          {/* 4 Score Gauges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {Object.entries(audit.scores).map(([key, score]) => (
              <div key={key} className="p-5 bg-zinc-800/40 border border-zinc-700/80 rounded-xl flex flex-col items-center text-center space-y-2">
                <div className={`w-16 h-16 rounded-full border-4 flex items-center justify-center text-2xl font-black ${getScoreColor(score)}`}>
                  {score}
                </div>
                <span className="text-xs font-bold text-white capitalize">{key.replace(/([A-Z])/g, " $1")}</span>
              </div>
            ))}
          </div>

          {/* Core Web Vitals Metrics */}
          <div className="p-5 bg-zinc-800/40 border border-zinc-700/80 rounded-xl space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2 border-b border-zinc-700/50 pb-3">
              <Gauge className="w-4 h-4 text-indigo-400" />
              Core Web Vitals Breakdown ({audit.device.toUpperCase()})
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 text-xs">
              <div className="p-3 bg-zinc-900/60 rounded-lg border border-zinc-800 space-y-1">
                <span className="text-zinc-400 block font-medium">First Contentful Paint (FCP)</span>
                <span className="text-base font-mono font-bold text-emerald-400">{audit.vitals.fcp.val}</span>
              </div>
              <div className="p-3 bg-zinc-900/60 rounded-lg border border-zinc-800 space-y-1">
                <span className="text-zinc-400 block font-medium">Largest Contentful Paint (LCP)</span>
                <span className="text-base font-mono font-bold text-emerald-400">{audit.vitals.lcp.val}</span>
              </div>
              <div className="p-3 bg-zinc-900/60 rounded-lg border border-zinc-800 space-y-1">
                <span className="text-zinc-400 block font-medium">Cumulative Layout Shift (CLS)</span>
                <span className="text-base font-mono font-bold text-emerald-400">{audit.vitals.cls.val}</span>
              </div>
              <div className="p-3 bg-zinc-900/60 rounded-lg border border-zinc-800 space-y-1">
                <span className="text-zinc-400 block font-medium">Total Blocking Time (TBT)</span>
                <span className="text-base font-mono font-bold text-emerald-400">{audit.vitals.tbt.val}</span>
              </div>
              <div className="p-3 bg-zinc-900/60 rounded-lg border border-zinc-800 space-y-1">
                <span className="text-zinc-400 block font-medium">Speed Index (SI)</span>
                <span className="text-base font-mono font-bold text-emerald-400">{audit.vitals.si.val}</span>
              </div>
            </div>
          </div>

          {/* Diagnostic Opportunities */}
          <div className="p-5 bg-zinc-800/40 border border-zinc-700/80 rounded-xl space-y-3">
            <h3 className="text-sm font-bold text-white">Performance Opportunities</h3>
            <div className="space-y-2">
              {audit.opportunities.map((opp, idx) => (
                <div key={idx} className="p-3 bg-zinc-900/80 rounded-lg border border-zinc-800 flex justify-between items-start text-xs">
                  <div>
                    <h4 className="font-bold text-white">{opp.title}</h4>
                    <p className="text-zinc-400 mt-0.5">{opp.description}</p>
                  </div>
                  <span className="px-2 py-1 bg-amber-900/40 text-amber-300 font-mono font-bold rounded border border-amber-700/50 shrink-0">
                    Save {opp.savings}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
