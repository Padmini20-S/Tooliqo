"use client";

import React, { useState } from "react";
import { Copy, Trash2, Download, Check, Sparkles, Palette } from "lucide-react";

export default function CssMinifier() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [removeComments, setRemoveComments] = useState(true);
  const [copied, setCopied] = useState(false);

  const sampleCss = `/* Primary Button Styles */
.btn-primary {
  background-color: #3b82f6; /* Blue background */
  color: #ffffff;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  font-weight: 600;
  transition: all 0.2s ease;
}

/* Hover state */
.btn-primary:hover {
  background-color: #2563eb;
  transform: translateY(-1px);
}

@media (max-width: 768px) {
  .btn-primary {
    width: 100%;
    text-align: center;
  }
}`;

  const minifyCss = (code: string, stripComments: boolean = removeComments) => {
    if (!code.trim()) {
      setOutput("");
      return;
    }

    let minified = code;

    if (stripComments) {
      minified = minified.replace(/\/\*[\s\S]*?\*\//g, "");
    }

    minified = minified
      .replace(/\s+/g, " ")
      .replace(/\s*([{}:;,])\s*/g, "$1")
      .replace(/;\}/g, "}")
      .trim();

    setOutput(minified);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setInput(val);
    minifyCss(val, removeComments);
  };

  const handleLoadSample = () => {
    setInput(sampleCss);
    minifyCss(sampleCss, removeComments);
  };

  const handleCopy = async () => {
    if (!output) return;
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    if (!output) return;
    const blob = new Blob([output], { type: "text/css" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "style.min.css";
    a.click();
    URL.revokeObjectURL(url);
  };

  const origSize = new Blob([input]).size;
  const minSize = new Blob([output]).size;
  const savings = origSize > 0 ? Math.round(((origSize - minSize) / origSize) * 100) : 0;

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-pink-500/10 text-pink-600 dark:text-pink-400 rounded-xl">
              <Palette className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">CSS Minifier</h1>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">Compress CSS stylesheets by removing comments and unneeded spaces</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleLoadSample}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 rounded-lg transition"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Load Sample
            </button>
            <button
              onClick={() => {
                setInput("");
                setOutput("");
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-zinc-100 dark:bg-zinc-800 hover:bg-red-500/10 hover:text-red-600 text-zinc-700 dark:text-zinc-300 rounded-lg transition"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Clear
            </button>
          </div>
        </div>

        {/* Options & Stats */}
        <div className="mt-6 pt-4 border-t border-zinc-100 dark:border-zinc-800/80 flex flex-wrap items-center justify-between gap-6">
          <label className="flex items-center gap-2 text-sm text-zinc-700 dark:text-zinc-300 cursor-pointer">
            <input
              type="checkbox"
              checked={removeComments}
              onChange={(e) => {
                const checked = e.target.checked;
                setRemoveComments(checked);
                minifyCss(input, checked);
              }}
              className="rounded border-zinc-300 dark:border-zinc-700 text-pink-600 focus:ring-pink-500"
            />
            <span>Remove CSS Comments (/* ... */)</span>
          </label>

          {output && (
            <div className="flex items-center gap-4 text-xs">
              <span className="text-zinc-500">Original: <strong className="text-zinc-900 dark:text-zinc-100 font-mono">{origSize} B</strong></span>
              <span className="text-zinc-500">Minified: <strong className="text-zinc-900 dark:text-zinc-100 font-mono">{minSize} B</strong></span>
              <span className="px-2.5 py-0.5 rounded-full bg-green-500/10 text-green-600 dark:text-green-400 font-bold font-mono">
                {savings}% Savings
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Editor Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Input */}
        <div className="flex flex-col space-y-2">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Uncompressed CSS</label>
          <textarea
            value={input}
            onChange={handleInputChange}
            placeholder="Paste CSS code here..."
            className="w-full h-96 p-4 font-mono text-sm bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-pink-500 text-zinc-900 dark:text-zinc-100 resize-none shadow-sm"
          />
        </div>

        {/* Output */}
        <div className="flex flex-col space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Minified CSS Output</label>
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopy}
                disabled={!output}
                className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 disabled:opacity-40 text-zinc-700 dark:text-zinc-300 rounded-lg transition"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? "Copied!" : "Copy"}
              </button>
              <button
                onClick={handleDownload}
                disabled={!output}
                className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 disabled:opacity-40 text-zinc-700 dark:text-zinc-300 rounded-lg transition"
              >
                <Download className="w-3.5 h-3.5" />
                Download
              </button>
            </div>
          </div>
          <textarea
            readOnly
            value={output}
            placeholder="Minified CSS rules will appear here..."
            className="w-full h-96 p-4 font-mono text-sm bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl text-zinc-900 dark:text-zinc-100 resize-none shadow-sm"
          />
        </div>
      </div>
    </div>
  );
}

