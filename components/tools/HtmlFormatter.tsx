"use client";

import React, { useState } from "react";
import { Copy, Trash2, Check, Sparkles, Code2 } from "lucide-react";

export default function HtmlFormatter() {
  const [htmlInput, setHtmlInput] = useState("");
  const [htmlOutput, setHtmlOutput] = useState("");
  const [indentSpaces, setIndentSpaces] = useState(2);
  const [copied, setCopied] = useState(false);

  const sampleHtml = `<div class="card"><div class="header"><h1>Welcome to Tooliqo</h1><p>The ultimate developer toolkit</p></div><div class="body"><ul><li>Fast</li><li>Client-side</li><li>Open source</li></ul><a href="#" class="btn">Get Started</a></div></div>`;

  const voidElements = new Set([
    "area", "base", "br", "col", "embed", "hr", "img", "input",
    "link", "meta", "param", "source", "track", "wbr"
  ]);

  const formatHtml = (input: string, spaces: number = indentSpaces) => {
    if (!input.trim()) {
      setHtmlOutput("");
      return;
    }

    const padStr = " ".repeat(spaces);
    // Split HTML by tags while preserving tokens
    const tokens = input.replace(/\s+/g, " ").replace(/>\s+</g, "><").trim().split(/(?=<)|(?<= me>)|(?<=>)/g).filter(Boolean);

    let indentLevel = 0;
    const formattedLines: string[] = [];

    tokens.forEach((token) => {
      const trimmedToken = token.trim();
      if (!trimmedToken) return;

      if (trimmedToken.startsWith("<!--")) {
        // Comment
        formattedLines.push(`${padStr.repeat(indentLevel)}${trimmedToken}`);
      } else if (trimmedToken.startsWith("</")) {
        // Closing tag
        indentLevel = Math.max(0, indentLevel - 1);
        formattedLines.push(`${padStr.repeat(indentLevel)}${trimmedToken}`);
      } else if (trimmedToken.startsWith("<")) {
        // Opening tag or void element or doctype
        const tagNameMatch = trimmedToken.match(/^<([a-zA-Z0-9-]+)/);
        const tagName = tagNameMatch ? tagNameMatch[1].toLowerCase() : "";
        const isSelfClosing = trimmedToken.endsWith("/>") || voidElements.has(tagName) || trimmedToken.toLowerCase().startsWith("<!doctype");

        formattedLines.push(`${padStr.repeat(indentLevel)}${trimmedToken}`);
        if (!isSelfClosing) {
          indentLevel++;
        }
      } else {
        // Text node
        formattedLines.push(`${padStr.repeat(indentLevel)}${trimmedToken}`);
      }
    });

    setHtmlOutput(formattedLines.join("\n"));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setHtmlInput(val);
    formatHtml(val, indentSpaces);
  };

  const handleLoadSample = () => {
    setHtmlInput(sampleHtml);
    formatHtml(sampleHtml, indentSpaces);
  };

  const handleCopy = async () => {
    if (!htmlOutput) return;
    await navigator.clipboard.writeText(htmlOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-red-500/10 text-red-600 dark:text-red-400 rounded-xl">
              <Code2 className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">HTML Formatter</h1>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">Beautify and format messy HTML strings with proper nesting</p>
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
                setHtmlInput("");
                setHtmlOutput("");
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
                formatHtml(htmlInput, val);
              }}
              className="px-3 py-1 text-sm bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-red-500"
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
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Raw HTML Input</label>
          <textarea
            value={htmlInput}
            onChange={handleInputChange}
            placeholder="Paste raw HTML here..."
            className="w-full h-96 p-4 font-mono text-sm bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-red-500 text-zinc-900 dark:text-zinc-100 resize-none shadow-sm"
          />
        </div>

        {/* Output */}
        <div className="flex flex-col space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Beautified HTML</label>
            <button
              onClick={handleCopy}
              disabled={!htmlOutput}
              className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 disabled:opacity-40 text-zinc-700 dark:text-zinc-300 rounded-lg transition"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
          <textarea
            readOnly
            value={htmlOutput}
            placeholder="Formatted HTML will appear here..."
            className="w-full h-96 p-4 font-mono text-sm bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl text-zinc-900 dark:text-zinc-100 resize-none shadow-sm"
          />
        </div>
      </div>
    </div>
  );
}
