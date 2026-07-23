"use client";

import React, { useState } from "react";
import { Copy, Trash2, Check, Sparkles, Palette } from "lucide-react";

export default function CssFormatter() {
  const [cssInput, setCssInput] = useState("");
  const [cssOutput, setCssOutput] = useState("");
  const [indentSpaces, setIndentSpaces] = useState(2);
  const [copied, setCopied] = useState(false);

  const sampleCss = `.btn-primary{background-color:#3b82f6;color:#ffffff;padding:0.5rem 1rem;border-radius:0.375rem;font-weight:600;transition:all 0.2s ease}.btn-primary:hover{background-color:#2563eb;transform:translateY(-1px)}@media (max-width: 768px){.btn-primary{width:100%;text-align:center}}`;

  const formatCss = (input: string, spaces: number = indentSpaces) => {
    if (!input.trim()) {
      setCssOutput("");
      return;
    }

    const pad = " ".repeat(spaces);
    let indentLevel = 0;
    let result = "";

    // Clean up spaces around special chars
    let clean = input
      .replace(/\s+/g, " ")
      .replace(/{\s*/g, " {\n")
      .replace(/;\s*/g, ";\n")
      .replace(/}\s*/g, "}\n")
      .trim();

    const lines = clean.split("\n").map((l) => l.trim()).filter(Boolean);

    lines.forEach((line) => {
      if (line.includes("}")) {
        indentLevel = Math.max(0, indentLevel - 1);
      }

      result += `${pad.repeat(indentLevel)}${line}\n`;

      if (line.includes("{")) {
        indentLevel++;
      }
    });

    setCssOutput(result.trim());
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setCssInput(val);
    formatCss(val, indentSpaces);
  };

  const handleLoadSample = () => {
    setCssInput(sampleCss);
    formatCss(sampleCss, indentSpaces);
  };

  const handleCopy = async () => {
    if (!cssOutput) return;
    await navigator.clipboard.writeText(cssOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

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
              <h1 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">CSS Formatter</h1>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">Format minified or messy CSS code into clean indented rules</p>
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
                setCssInput("");
                setCssOutput("");
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-zinc-100 dark:bg-zinc-800 hover:bg-red-500/10 hover:text-red-600 text-zinc-700 dark:text-zinc-300 rounded-lg transition"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Clear
            </button>
          </div>
        </div>

        {/* Options */}
        <div className="mt-6 pt-4 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center gap-6">
          <div className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
            <label className="font-medium">Indentation:</label>
            <select
              value={indentSpaces}
              onChange={(e) => {
                const val = Number(e.target.value);
                setIndentSpaces(val);
                formatCss(cssInput, val);
              }}
              className="px-3 py-1 text-sm bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-pink-500"
            >
              <option value={2}>2 Spaces</option>
              <option value={4}>4 Spaces</option>
            </select>
          </div>
        </div>
      </div>

      {/* Editor Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Input */}
        <div className="flex flex-col space-y-2">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Raw / Minified CSS</label>
          <textarea
            value={cssInput}
            onChange={handleInputChange}
            placeholder="Paste CSS code here..."
            className="w-full h-96 p-4 font-mono text-sm bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-pink-500 text-zinc-900 dark:text-zinc-100 resize-none shadow-sm"
          />
        </div>

        {/* Output */}
        <div className="flex flex-col space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Formatted CSS</label>
            <button
              onClick={handleCopy}
              disabled={!cssOutput}
              className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 disabled:opacity-40 text-zinc-700 dark:text-zinc-300 rounded-lg transition"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
          <textarea
            readOnly
            value={cssOutput}
            placeholder="Formatted CSS rules will appear here..."
            className="w-full h-96 p-4 font-mono text-sm bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl text-zinc-900 dark:text-zinc-100 resize-none shadow-sm"
          />
        </div>
      </div>
    </div>
  );
}
