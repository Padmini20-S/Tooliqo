"use client";

import React, { useState } from "react";
import { Link2, Copy, Check, Settings, RefreshCw, List } from "lucide-react";

export default function SlugGenerator() {
  const [inputText, setInputText] = useState("10 Best Free SEO & Network Tools in 2026! (Must Try)");
  const [separator, setSeparator] = useState<"-" | "_" | ".">("-");
  const [isLowercase, setIsLowercase] = useState(true);
  const [removeNumbers, setRemoveNumbers] = useState(false);
  const [removeStopWords, setRemoveStopWords] = useState(false);
  const [copied, setCopied] = useState(false);

  const stopWords = new Set(["a", "an", "and", "are", "as", "at", "be", "by", "for", "from", "in", "is", "it", "of", "on", "or", "that", "the", "to", "with"]);

  const generateSlug = (text: string) => {
    if (!text) return "";

    let processed = text;

    // Remove accents/diacritics
    processed = processed.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    if (isLowercase) {
      processed = processed.toLowerCase();
    }

    if (removeNumbers) {
      processed = processed.replace(/[0-9]/g, "");
    }

    // Split words
    let words = processed.replace(/[^\w\s-]/g, " ").split(/\s+/).filter(Boolean);

    if (removeStopWords) {
      words = words.filter((w) => !stopWords.has(w.toLowerCase()));
    }

    return words.join(separator);
  };

  const outputSlug = generateSlug(inputText);

  const copySlug = () => {
    navigator.clipboard.writeText(outputSlug);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-zinc-900 border border-zinc-800 rounded-2xl shadow-xl space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-2 flex items-center justify-center gap-2">
          <Link2 className="w-6 h-6 text-indigo-400" />
          URL Slug Generator
        </h2>
        <p className="text-zinc-400">Convert article titles and headlines into clean, SEO-friendly URL slugs.</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-zinc-300 mb-1">Input Text / Article Title</label>
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-xl text-zinc-100 placeholder-zinc-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none text-sm"
            placeholder="Type or paste headline here..."
          />
        </div>

        {/* Options */}
        <div className="p-4 bg-zinc-800/40 border border-zinc-700/80 rounded-xl space-y-3 text-xs">
          <h3 className="font-bold text-white flex items-center gap-1.5">
            <Settings className="w-3.5 h-3.5 text-indigo-400" /> Options & Formatting
          </h3>

          <div className="flex flex-wrap items-center gap-6">
            <div>
              <span className="text-zinc-400 block mb-1">Separator</span>
              <div className="flex gap-2">
                {(["-", "_", "."] as const).map((sep) => (
                  <button
                    key={sep}
                    onClick={() => setSeparator(sep)}
                    className={`px-3 py-1 font-mono font-bold rounded-lg border transition-colors cursor-pointer ${
                      separator === sep ? "bg-indigo-600 text-white border-indigo-500" : "bg-zinc-800 text-zinc-300 border-zinc-700"
                    }`}
                  >
                    '{sep}'
                  </button>
                ))}
              </div>
            </div>

            <label className="flex items-center gap-2 cursor-pointer text-zinc-300">
              <input
                type="checkbox"
                checked={isLowercase}
                onChange={(e) => setIsLowercase(e.target.checked)}
                className="w-4 h-4 text-indigo-600 rounded bg-zinc-900 border-zinc-700"
              />
              Force Lowercase
            </label>

            <label className="flex items-center gap-2 cursor-pointer text-zinc-300">
              <input
                type="checkbox"
                checked={removeStopWords}
                onChange={(e) => setRemoveStopWords(e.target.checked)}
                className="w-4 h-4 text-indigo-600 rounded bg-zinc-900 border-zinc-700"
              />
              Remove Stop Words ('in', 'the', 'is')
            </label>
          </div>
        </div>

        {/* Output */}
        <div className="p-5 bg-zinc-800/60 border border-zinc-700 rounded-xl space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold text-zinc-300">Generated URL Slug</span>
            <button
              onClick={copySlug}
              className="flex items-center gap-1 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-medium rounded-lg transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copied ? "Copied Slug" : "Copy Slug"}
            </button>
          </div>

          <div className="p-3 bg-black/60 border border-zinc-800 rounded-lg text-emerald-400 font-mono text-sm font-bold break-all">
            {outputSlug || "<Empty Slug>"}
          </div>
        </div>
      </div>
    </div>
  );
}
