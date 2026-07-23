"use client";

import React, { useState, useEffect } from "react";
import { Copy, Trash2, Check, Sparkles, FileCode, Eye, Code } from "lucide-react";
import { marked } from "marked";

export default function MarkdownToHtml() {
  const [markdownInput, setMarkdownInput] = useState("");
  const [htmlOutput, setHtmlOutput] = useState("");
  const [viewMode, setViewMode] = useState<"code" | "preview">("preview");
  const [copiedHtml, setCopiedHtml] = useState(false);
  const [copiedMd, setCopiedMd] = useState(false);

  const sampleMd = `# Welcome to Tooliqo Markdown Editor

Tooliqo provides **real-time** conversion from Markdown to HTML.

## Key Features
- Headings & Paragraphs
- **Bold** and *Italic* text styling
- Inline \`code blocks\`
- Lists:
  - Feature A
  - Feature B
- Blockquotes:
> "Simple tools for complex workflows."

### Code Block
\`\`\`typescript
const greeting = (name: string): string => {
  return \`Hello, \${name}!\`;
};
\`\`\`
`;

  useEffect(() => {
    if (!markdownInput.trim()) {
      setHtmlOutput("");
      return;
    }
    try {
      const parsed = marked.parse(markdownInput, { async: false }) as string;
      setHtmlOutput(parsed);
    } catch {
      setHtmlOutput("");
    }
  }, [markdownInput]);

  const handleLoadSample = () => {
    setMarkdownInput(sampleMd);
  };

  const handleCopyHtml = async () => {
    if (!htmlOutput) return;
    await navigator.clipboard.writeText(htmlOutput);
    setCopiedHtml(true);
    setTimeout(() => setCopiedHtml(false), 2000);
  };

  const handleCopyMd = async () => {
    if (!markdownInput) return;
    await navigator.clipboard.writeText(markdownInput);
    setCopiedMd(true);
    setTimeout(() => setCopiedMd(false), 2000);
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-xl">
              <FileCode className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">Markdown to HTML Converter</h1>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">Live split-pane editor rendering Markdown into HTML code and rich preview</p>
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
                setMarkdownInput("");
                setHtmlOutput("");
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-zinc-100 dark:bg-zinc-800 hover:bg-red-500/10 hover:text-red-600 text-zinc-700 dark:text-zinc-300 rounded-lg transition"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Clear
            </button>
          </div>
        </div>
      </div>

      {/* Editor Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left: Markdown Input */}
        <div className="flex flex-col space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Markdown Input</label>
            <button
              onClick={handleCopyMd}
              disabled={!markdownInput}
              className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 disabled:opacity-40 text-zinc-700 dark:text-zinc-300 rounded-lg transition"
            >
              {copiedMd ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
              {copiedMd ? "Copied!" : "Copy MD"}
            </button>
          </div>
          <textarea
            value={markdownInput}
            onChange={(e) => setMarkdownInput(e.target.value)}
            placeholder="Type or paste Markdown here..."
            className="w-full h-96 p-4 font-mono text-sm bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-zinc-900 dark:text-zinc-100 resize-none shadow-sm"
          />
        </div>

        {/* Right: Output (Preview or HTML Code) */}
        <div className="flex flex-col space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 bg-zinc-100 dark:bg-zinc-800 p-1 rounded-xl">
              <button
                onClick={() => setViewMode("preview")}
                className={`inline-flex items-center gap-1 px-3 py-1 text-xs font-semibold rounded-lg transition ${
                  viewMode === "preview"
                    ? "bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 shadow-xs"
                    : "text-zinc-500 dark:text-zinc-400"
                }`}
              >
                <Eye className="w-3.5 h-3.5" /> HTML Preview
              </button>
              <button
                onClick={() => setViewMode("code")}
                className={`inline-flex items-center gap-1 px-3 py-1 text-xs font-semibold rounded-lg transition ${
                  viewMode === "code"
                    ? "bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 shadow-xs"
                    : "text-zinc-500 dark:text-zinc-400"
                }`}
              >
                <Code className="w-3.5 h-3.5" /> Raw HTML
              </button>
            </div>

            <button
              onClick={handleCopyHtml}
              disabled={!htmlOutput}
              className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 disabled:opacity-40 text-zinc-700 dark:text-zinc-300 rounded-lg transition"
            >
              {copiedHtml ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
              {copiedHtml ? "Copied!" : "Copy HTML"}
            </button>
          </div>

          {viewMode === "preview" ? (
            <div
              dangerouslySetInnerHTML={{ __html: htmlOutput || "<p class='text-zinc-400 italic'>HTML Preview will render here...</p>" }}
              className="w-full h-96 p-6 overflow-y-auto bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl text-zinc-900 dark:text-zinc-100 prose dark:prose-invert max-w-none shadow-sm"
            />
          ) : (
            <textarea
              readOnly
              value={htmlOutput}
              placeholder="Converted raw HTML code will appear here..."
              className="w-full h-96 p-4 font-mono text-sm bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl text-zinc-900 dark:text-zinc-100 resize-none shadow-sm"
            />
          )}
        </div>
      </div>
    </div>
  );
}

