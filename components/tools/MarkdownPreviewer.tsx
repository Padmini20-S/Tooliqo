"use client";

import React, { useState, useEffect } from "react";
import { marked } from "marked";
import { Copy, Check, Trash2, LayoutGrid, Eye, Columns } from "lucide-react";

export default function MarkdownPreviewer() {
  const [markdown, setMarkdown] = useState("");
  const [html, setHtml] = useState("");
  const [copied, setCopied] = useState(false);
  const [layout, setLayout] = useState<"split" | "editor" | "preview">("split");

  // Sample markdown to load
  const loadSample = () => {
    const sample = `# Markdown Editor & Previewer

Welcome to **Tooliqo's** live Markdown Editor!

## Features

1. **Real-time rendering** as you type.
2. Multiple layouts: *Split*, *Editor Only*, and *Preview Only*.
3. Copy compiled HTML output instantly.

---

### Code Example
\`\`\`javascript
function greet(user) {
  console.log(\`Hello, \${user}!\`);
}
greet("Tooliqo Visitor");
\`\`\`

> "Markdown is a lightweight markup language with plain-text-formatting syntax." - John Gruber

Enjoy writing your docs!`;
    setMarkdown(sample);
  };

  useEffect(() => {
    loadSample();
  }, []);

  // Compile markdown to HTML
  useEffect(() => {
    if (!markdown) {
      setHtml("");
      return;
    }
    try {
      // Synchronous parse in marked v4+
      const parsed = marked.parse(markdown) as string;
      setHtml(parsed);
    } catch (e) {
      console.error(e);
      setHtml("<p className='text-red-500'>Error parsing Markdown</p>");
    }
  }, [markdown]);

  const handleCopyHtml = async () => {
    if (!html) return;
    try {
      await navigator.clipboard.writeText(html);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.error(e);
    }
  };

  const handleClear = () => {
    setMarkdown("");
    setHtml("");
  };

  return (
    <div className="space-y-4">
      {/* Controls Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        {/* Layout switcher */}
        <div className="flex items-center rounded-lg border border-zinc-200 dark:border-zinc-800 p-0.5 bg-zinc-50 dark:bg-zinc-900">
          <button
            onClick={() => setLayout("split")}
            className={`flex items-center space-x-1 px-3 py-1 text-xs font-semibold rounded-md transition-all cursor-pointer ${
              layout === "split"
                ? "bg-white dark:bg-zinc-800 text-indigo-650 dark:text-indigo-400 shadow-sm"
                : "text-zinc-500 hover:text-zinc-950 dark:hover:text-white"
            }`}
          >
            <Columns className="w-3.5 h-3.5" />
            <span>Split View</span>
          </button>
          <button
            onClick={() => setLayout("editor")}
            className={`flex items-center space-x-1 px-3 py-1 text-xs font-semibold rounded-md transition-all cursor-pointer ${
              layout === "editor"
                ? "bg-white dark:bg-zinc-800 text-indigo-650 dark:text-indigo-400 shadow-sm"
                : "text-zinc-500 hover:text-zinc-950 dark:hover:text-white"
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span>Editor Only</span>
          </button>
          <button
            onClick={() => setLayout("preview")}
            className={`flex items-center space-x-1 px-3 py-1 text-xs font-semibold rounded-md transition-all cursor-pointer ${
              layout === "preview"
                ? "bg-white dark:bg-zinc-800 text-indigo-650 dark:text-indigo-400 shadow-sm"
                : "text-zinc-500 hover:text-zinc-950 dark:hover:text-white"
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Preview Only</span>
          </button>
        </div>

        {/* Global actions */}
        <div className="flex items-center space-x-2">
          <button
            onClick={loadSample}
            className="text-xs px-2.5 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 text-zinc-650 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors"
          >
            Load Sample
          </button>
          <button
            disabled={!html}
            onClick={handleCopyHtml}
            className="text-xs px-2.5 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 text-zinc-650 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer flex items-center space-x-1.5 w-[96px]"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? "Copied!" : "Copy HTML"}</span>
          </button>
          <button
            onClick={handleClear}
            className="text-xs px-2.5 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors cursor-pointer flex items-center space-x-1.5"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear</span>
          </button>
        </div>
      </div>

      {/* Editor Panels */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left pane: Markdown Editor */}
        {(layout === "split" || layout === "editor") && (
          <div className="flex-1 flex flex-col space-y-2">
            <label className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
              Markdown Editor
            </label>
            <textarea
              placeholder="Start writing markdown here..."
              value={markdown}
              onChange={(e) => setMarkdown(e.target.value)}
              className="w-full h-[450px] min-h-[350px] p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 text-zinc-800 dark:text-zinc-100 font-mono text-sm outline-none focus:border-indigo-500 transition-all resize-y leading-relaxed"
            />
          </div>
        )}

        {/* Right pane: Visual HTML Preview */}
        {(layout === "split" || layout === "preview") && (
          <div className="flex-1 flex flex-col space-y-2">
            <label className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
              Live Compiled HTML Preview
            </label>
            <div className="w-full h-[450px] min-h-[350px] p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-905 overflow-y-auto prose dark:prose-invert max-w-none prose-sm sm:prose-base dark:prose-p:text-zinc-300 dark:prose-headings:text-zinc-100 dark:prose-strong:text-white dark:prose-code:text-indigo-400 dark:prose-blockquote:text-zinc-400 dark:prose-blockquote:border-l-indigo-500">
              {html ? (
                <div dangerouslySetInnerHTML={{ __html: html }} />
              ) : (
                <p className="text-zinc-400 dark:text-zinc-500 italic">Preview will render here...</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
