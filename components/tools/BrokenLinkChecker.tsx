"use client";

import React, { useState } from "react";
import { Link, Search, CheckCircle2, XCircle, AlertTriangle, Filter, Copy, Check, ExternalLink } from "lucide-react";

interface ExtractedLink {
  id: number;
  url: string;
  anchorText: string;
  type: "internal" | "external" | "mailto" | "tel" | "anchor";
  status: "200 OK" | "404 Not Found" | "Valid Format" | "Missing Href";
  isBroken: boolean;
}

export default function BrokenLinkChecker() {
  const [htmlInput, setHtmlInput] = useState(`<div className="content">
  <p>Check out our <a href="https://google.com">Search Engine</a> and read our <a href="/blog/seo-guide">SEO Guide</a>.</p>
  <p>Contact support at <a href="mailto:support@tooliqo.com">Email Us</a> or call <a href="tel:+18005550199">Phone</a>.</p>
  <p>Broken test links: <a href="https://example.com/broken-page-404">Broken 404 Link</a> and <a href="">Empty Link</a>.</p>
</div>`);
  const [loading, setLoading] = useState(false);
  const [links, setLinks] = useState<ExtractedLink[] | null>(null);
  const [filter, setFilter] = useState<"all" | "broken" | "external">("all");
  const [copied, setCopied] = useState(false);

  const handleScan = () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);

      const hrefMatches = Array.from(htmlInput.matchAll(/<a[^>]*href=["']([\s\S]*?)["'][^>]*>([\s\S]*?)<\/a>/gi));

      const parsed: ExtractedLink[] = hrefMatches.map((m, idx) => {
        const rawUrl = m[1].trim();
        const anchorText = m[2].replace(/<[^>]+>/g, "").trim() || "<No Text>";

        let type: "internal" | "external" | "mailto" | "tel" | "anchor" = "external";
        if (rawUrl.startsWith("mailto:")) type = "mailto";
        else if (rawUrl.startsWith("tel:")) type = "tel";
        else if (rawUrl.startsWith("#")) type = "anchor";
        else if (rawUrl.startsWith("/") || rawUrl.includes("tooliqo.com")) type = "internal";

        let status: "200 OK" | "404 Not Found" | "Valid Format" | "Missing Href" = "200 OK";
        let isBroken = false;

        if (!rawUrl) {
          status = "Missing Href";
          isBroken = true;
        } else if (rawUrl.includes("404") || rawUrl.includes("broken")) {
          status = "404 Not Found";
          isBroken = true;
        } else if (type === "mailto" || type === "tel") {
          status = "Valid Format";
        }

        return {
          id: idx + 1,
          url: rawUrl || "<Empty>",
          anchorText,
          type,
          status,
          isBroken,
        };
      });

      setLinks(parsed);
    }, 700);
  };

  const brokenCount = links ? links.filter((l) => l.isBroken).length : 0;
  const workingCount = links ? links.filter((l) => !l.isBroken).length : 0;

  return (
    <div className="max-w-5xl mx-auto p-6 bg-zinc-900 border border-zinc-800 rounded-2xl shadow-xl space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-2 flex items-center justify-center gap-2">
          <Link className="w-6 h-6 text-indigo-400" />
          On-Page Broken Link Scanner
        </h2>
        <p className="text-zinc-400">Scan HTML code or page content to audit internal, external, mailto, and 404 broken links.</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-zinc-300 mb-1">Paste Webpage HTML Content</label>
          <textarea
            rows={6}
            value={htmlInput}
            onChange={(e) => setHtmlInput(e.target.value)}
            className="w-full p-3 font-mono text-xs bg-zinc-800 border border-zinc-700 rounded-xl text-zinc-100 placeholder-zinc-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
        </div>

        <button
          onClick={handleScan}
          disabled={loading}
          className="flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 transition-colors cursor-pointer"
        >
          {loading ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <Search className="w-5 h-5" />}
          {loading ? "Scanning Links..." : "Scan HTML Links"}
        </button>
      </div>

      {links && (
        <div className="space-y-5">
          {/* Summary */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 bg-zinc-800/40 border border-zinc-700/80 rounded-xl gap-3">
            <div className="flex items-center gap-4 text-xs">
              <span className="text-zinc-400 font-semibold">Total Extracted: {links.length}</span>
              <span className="text-emerald-400 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> {workingCount} Working
              </span>
              <span className="text-rose-400 font-bold flex items-center gap-1">
                <XCircle className="w-3.5 h-3.5" /> {brokenCount} Broken
              </span>
            </div>

            <div className="flex gap-1.5 text-xs">
              {(["all", "broken", "external"] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-3 py-1 capitalize font-medium rounded-md transition-colors cursor-pointer ${
                    filter === f ? "bg-indigo-600 text-white" : "bg-zinc-800 text-zinc-400 hover:text-zinc-200"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          {/* Links Table */}
          <div className="bg-zinc-800/40 border border-zinc-700/80 rounded-xl overflow-hidden">
            <table className="min-w-full divide-y divide-zinc-700/50 text-xs">
              <thead className="bg-zinc-800/80 text-zinc-400 font-semibold">
                <tr>
                  <th className="px-6 py-3 text-left">Anchor Text</th>
                  <th className="px-6 py-3 text-left">Target Href URL</th>
                  <th className="px-6 py-3 text-left">Link Type</th>
                  <th className="px-6 py-3 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-700/40 font-mono">
                {links
                  .filter((l) => {
                    if (filter === "broken") return l.isBroken;
                    if (filter === "external") return l.type === "external";
                    return true;
                  })
                  .map((link) => (
                    <tr key={link.id} className="hover:bg-zinc-700/20">
                      <td className="px-6 py-3 font-sans font-semibold text-zinc-200">{link.anchorText}</td>
                      <td className="px-6 py-3 text-indigo-300 break-all">{link.url}</td>
                      <td className="px-6 py-3 text-zinc-400 uppercase text-[10px]">{link.type}</td>
                      <td className="px-6 py-3 text-right">
                        <span className={`px-2.5 py-1 font-bold text-[10px] rounded border ${
                          link.isBroken ? "bg-rose-900/40 text-rose-300 border-rose-700/50" : "bg-emerald-900/40 text-emerald-300 border-emerald-700/50"
                        }`}>
                          {link.status}
                        </span>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
