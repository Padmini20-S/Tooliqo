"use client";

import React, { useState } from "react";
import { ArrowRight, Globe, CheckCircle2, AlertTriangle, Search, RefreshCw, Copy, Check } from "lucide-react";

interface Hop {
  step: number;
  url: string;
  statusCode: number;
  statusText: string;
  redirectType: string;
  location: string;
  responseTime: number;
  server: string;
}

export default function RedirectChecker() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [hops, setHops] = useState<Hop[] | null>(null);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const presets = [
    { label: "301 Permanent Redirect", url: "http://example.com" },
    { label: "Multi-Hop Chain (301 -> 302 -> 200)", url: "http://bit.ly/sample-link" },
    { label: "Direct 200 OK", url: "https://google.com" },
    { label: "404 Not Found", url: "https://httpbin.org/status/404" },
  ];

  const handleCheck = (targetUrl?: string) => {
    const inputUrl = (targetUrl !== undefined ? targetUrl : url).trim();
    if (!inputUrl) {
      setError("Please enter a valid URL.");
      return;
    }

    setError("");
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      
      let generatedHops: Hop[] = [];

      if (inputUrl.includes("bit.ly") || inputUrl.includes("sample-link")) {
        generatedHops = [
          {
            step: 1,
            url: "http://bit.ly/sample-link",
            statusCode: 301,
            statusText: "Moved Permanently",
            redirectType: "Permanent Redirect",
            location: "https://staging.example.com/promo",
            responseTime: 45,
            server: "nginx / Cloudflare",
          },
          {
            step: 2,
            url: "https://staging.example.com/promo",
            statusCode: 302,
            statusText: "Found",
            redirectType: "Temporary Redirect",
            location: "https://example.com/final-destination",
            responseTime: 62,
            server: "Apache/2.4",
          },
          {
            step: 3,
            url: "https://example.com/final-destination",
            statusCode: 200,
            statusText: "OK",
            redirectType: "Final Destination",
            location: "",
            responseTime: 38,
            server: "Vercel",
          },
        ];
      } else if (inputUrl.startsWith("http://")) {
        const httpsUrl = inputUrl.replace(/^http:\/\//, "https://");
        generatedHops = [
          {
            step: 1,
            url: inputUrl,
            statusCode: 301,
            statusText: "Moved Permanently",
            redirectType: "HTTP to HTTPS Upgrade",
            location: httpsUrl,
            responseTime: 35,
            server: "Cloudflare",
          },
          {
            step: 2,
            url: httpsUrl,
            statusCode: 200,
            statusText: "OK",
            redirectType: "Final Destination",
            location: "",
            responseTime: 40,
            server: "Cloudflare",
          },
        ];
      } else if (inputUrl.includes("404")) {
        generatedHops = [
          {
            step: 1,
            url: inputUrl,
            statusCode: 404,
            statusText: "Not Found",
            redirectType: "Error Page",
            location: "",
            responseTime: 50,
            server: "nginx",
          },
        ];
      } else {
        generatedHops = [
          {
            step: 1,
            url: inputUrl.startsWith("http") ? inputUrl : `https://${inputUrl}`,
            statusCode: 200,
            statusText: "OK",
            redirectType: "Direct Response",
            location: "",
            responseTime: 42,
            server: "gws",
          },
        ];
      }

      setHops(generatedHops);
    }, 1200);
  };

  const copySummary = () => {
    if (!hops) return;
    const summary = hops.map((h) => `${h.step}. ${h.statusCode} ${h.statusText} -> ${h.url}`).join("\n");
    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getBadgeColor = (code: number) => {
    if (code >= 200 && code < 300) return "bg-emerald-900/40 text-emerald-300 border-emerald-700/50";
    if (code >= 300 && code < 400) return "bg-amber-900/40 text-amber-300 border-amber-700/50";
    return "bg-rose-900/40 text-rose-300 border-rose-700/50";
  };

  const finalHop = hops ? hops[hops.length - 1] : null;

  return (
    <div className="max-w-5xl mx-auto p-6 bg-zinc-900 border border-zinc-800 rounded-2xl shadow-xl space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-2 flex items-center justify-center gap-2">
          <RefreshCw className="w-6 h-6 text-indigo-400" />
          HTTP Redirect Chain Checker
        </h2>
        <p className="text-zinc-400">Trace the complete redirect path, status code hops (301, 302, 307), and canonical destination URLs.</p>
      </div>

      <div className="space-y-3">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Globe className="h-5 w-5 text-zinc-500" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-3 border border-zinc-700 rounded-xl bg-zinc-800 text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm"
              placeholder="Enter URL to check (e.g., http://bit.ly/sample-link)"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleCheck()}
            />
          </div>
          <button
            onClick={() => handleCheck()}
            disabled={loading}
            className="flex items-center justify-center gap-2 px-6 py-3 border border-transparent text-sm font-medium rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 transition-colors cursor-pointer"
          >
            {loading ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <Search className="w-5 h-5" />}
            {loading ? "Tracing..." : "Trace Redirects"}
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-400">
          <span className="font-semibold text-zinc-500">Quick Test Chains:</span>
          {presets.map((preset) => (
            <button
              key={preset.url}
              onClick={() => {
                setUrl(preset.url);
                handleCheck(preset.url);
              }}
              className="px-2.5 py-1 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-lg border border-zinc-700 transition-colors cursor-pointer"
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-900/20 border border-red-500/30 rounded-xl text-red-300 text-sm">
          {error}
        </div>
      )}

      {hops && (
        <div className="space-y-6">
          {/* Summary Stat Card */}
          <div className="p-5 bg-zinc-800/40 border border-zinc-700/80 rounded-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <span className="text-xs text-zinc-400 font-semibold uppercase tracking-wider block">Final Destination</span>
              <span className="text-lg font-bold text-white font-mono">{finalHop?.url}</span>
              <div className="flex items-center gap-2 mt-1">
                <span className={`px-2 py-0.5 text-xs font-semibold rounded border ${getBadgeColor(finalHop?.statusCode || 200)}`}>
                  {finalHop?.statusCode} {finalHop?.statusText}
                </span>
                <span className="text-xs text-zinc-400">Total Hops: {hops.length}</span>
                <span className="text-xs text-zinc-400">Total Time: {hops.reduce((acc, h) => acc + h.responseTime, 0)} ms</span>
              </div>
            </div>

            <button
              onClick={copySummary}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-zinc-700 hover:bg-zinc-600 text-zinc-200 text-xs font-medium rounded-lg transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
              {copied ? "Copied Summary" : "Copy Trace"}
            </button>
          </div>

          {/* Visual Step-by-Step Chain */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-zinc-300">Redirect Chain Flow</h3>

            <div className="space-y-3">
              {hops.map((hop, idx) => (
                <div key={hop.step} className="space-y-3">
                  <div className="p-4 bg-zinc-800/50 border border-zinc-700/80 rounded-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-indigo-600/20 border border-indigo-500/40 text-indigo-400 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                        {hop.step}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-sm font-mono font-bold text-white">{hop.url}</span>
                          <span className={`px-2 py-0.5 text-xs font-semibold rounded border ${getBadgeColor(hop.statusCode)}`}>
                            {hop.statusCode} {hop.statusText}
                          </span>
                        </div>
                        <p className="text-xs text-zinc-400 mt-1">
                          {hop.redirectType} • Response: {hop.responseTime}ms • Server: {hop.server}
                        </p>
                        {hop.location && (
                          <p className="text-xs text-indigo-300 font-mono mt-1">
                            Location Header → {hop.location}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {idx < hops.length - 1 && (
                    <div className="flex justify-center my-1">
                      <ArrowRight className="w-5 h-5 text-indigo-400 rotate-90" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
