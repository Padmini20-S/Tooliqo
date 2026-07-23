"use client";

import React, { useState } from "react";
import { Link2, CheckCircle2, AlertTriangle, XCircle, Search, Copy, Check } from "lucide-react";

interface ValidationResult {
  isAbsolute: boolean;
  protocolMatch: boolean;
  domainMatch: boolean;
  trailingSlashMatch: boolean;
  verdict: "valid" | "warning" | "error";
  verdictTitle: string;
  recommendation: string;
  fixedTag: string;
}

export default function CanonicalUrlChecker() {
  const [currentPageUrl, setCurrentPageUrl] = useState("https://tooliqo.com/tools/json-formatter/");
  const [canonicalUrl, setCanonicalUrl] = useState("https://tooliqo.com/tools/json-formatter");
  const [copied, setCopied] = useState(false);
  const [result, setResult] = useState<ValidationResult | null>(null);

  const handleValidate = () => {
    const page = currentPageUrl.trim();
    const target = canonicalUrl.trim();

    if (!page || !target) return;

    const isAbsolute = /^https?:\/\//i.test(target);
    const pageProtocol = page.split(":")[0];
    const targetProtocol = target.split(":")[0];
    const protocolMatch = pageProtocol === targetProtocol;

    let pageDomain = "";
    let targetDomain = "";
    try {
      pageDomain = new URL(page).hostname;
      targetDomain = new URL(target).hostname;
    } catch (e) {
      // relative or invalid
    }

    const domainMatch = Boolean(pageDomain && targetDomain && pageDomain === targetDomain);
    const trailingSlashMatch = page.endsWith("/") === target.endsWith("/");

    let verdict: "valid" | "warning" | "error" = "valid";
    let verdictTitle = "Valid Self-Referencing Canonical Tag";
    let recommendation = "The canonical tag is properly formatted and points to the authoritative URL version.";

    if (!isAbsolute) {
      verdict = "error";
      verdictTitle = "Invalid Relative Canonical URL";
      recommendation = "Canonical URLs MUST be absolute (including https:// domain) to avoid indexing errors.";
    } else if (!domainMatch) {
      verdict = "warning";
      verdictTitle = "Cross-Domain Canonical Tag Detected";
      recommendation = "This page points canonical authority to a different domain. Verify this is intentional.";
    } else if (!trailingSlashMatch) {
      verdict = "warning";
      verdictTitle = "Trailing Slash Mismatch";
      recommendation = "Align page trailing slash conventions to prevent duplicate indexing.";
    }

    const fixedTag = `<link rel="canonical" href="${isAbsolute ? target : `https://${pageDomain || "example.com"}${target.startsWith("/") ? "" : "/"}${target}`}" />`;

    setResult({
      isAbsolute,
      protocolMatch,
      domainMatch,
      trailingSlashMatch,
      verdict,
      verdictTitle,
      recommendation,
      fixedTag,
    });
  };

  const copyCode = () => {
    if (!result) return;
    navigator.clipboard.writeText(result.fixedTag);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-zinc-900 border border-zinc-800 rounded-2xl shadow-xl space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-2 flex items-center justify-center gap-2">
          <Link2 className="w-6 h-6 text-indigo-400" />
          Canonical URL Validator
        </h2>
        <p className="text-zinc-400">Validate canonical tags for absolute link syntax, protocol consistency, and cross-domain canonical rules.</p>
      </div>

      <div className="space-y-4 bg-zinc-800/40 p-5 rounded-xl border border-zinc-700/80">
        <div>
          <label className="block text-xs font-semibold text-zinc-300 mb-1">Current Page URL</label>
          <input
            type="text"
            value={currentPageUrl}
            onChange={(e) => setCurrentPageUrl(e.target.value)}
            className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-zinc-100 text-xs font-mono focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-zinc-300 mb-1">Canonical Tag Target URL (`rel="canonical" href="..."`)</label>
          <input
            type="text"
            value={canonicalUrl}
            onChange={(e) => setCanonicalUrl(e.target.value)}
            className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-zinc-100 text-xs font-mono focus:outline-none"
          />
        </div>

        <button
          onClick={handleValidate}
          className="flex items-center justify-center gap-2 px-6 py-2.5 text-xs font-medium rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 transition-colors cursor-pointer"
        >
          <Search className="w-4 h-4" /> Validate Canonical Rule
        </button>
      </div>

      {result && (
        <div className="space-y-6">
          <div className={`p-5 rounded-xl border flex items-center gap-3 ${
            result.verdict === "valid" ? "bg-emerald-950/40 border-emerald-800/60 text-emerald-300" :
            result.verdict === "warning" ? "bg-amber-950/40 border-amber-800/60 text-amber-300" :
            "bg-rose-950/40 border-rose-800/60 text-rose-300"
          }`}>
            {result.verdict === "valid" ? <CheckCircle2 className="w-6 h-6" /> : <AlertTriangle className="w-6 h-6" />}
            <div>
              <h3 className="text-base font-bold">{result.verdictTitle}</h3>
              <p className="text-xs opacity-90">{result.recommendation}</p>
            </div>
          </div>

          <div className="p-4 bg-zinc-800/40 border border-zinc-700/80 rounded-xl space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-white">Recommended Canonical HTML Tag</span>
              <button
                onClick={copyCode}
                className="flex items-center gap-1 px-3 py-1 bg-zinc-700 text-zinc-200 text-xs rounded transition-colors cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? "Copied" : "Copy HTML Tag"}
              </button>
            </div>
            <pre className="p-3 bg-black/60 border border-zinc-800 rounded-lg text-emerald-400 font-mono text-xs overflow-x-auto">
              {result.fixedTag}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}
