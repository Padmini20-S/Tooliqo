"use client";

import React, { useState } from "react";
import { Copy, Trash2, Check, Sparkles, Binary } from "lucide-react";

export default function HtmlEntityEncoder() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const [entityFormat, setEntityFormat] = useState<"named" | "decimal" | "hex">("named");
  const [copied, setCopied] = useState(false);

  const sampleText = `<div class="content" id="main">
  <h1>HTML & Web Entities</h1>
  <p>Price: $10.00 & 50% off! "Quotes" & 'single quotes'</p>
</div>`;

  const encodeHtml = (str: string, format: "named" | "decimal" | "hex") => {
    if (!str) return "";

    if (format === "decimal") {
      return str.replace(/[\u00A0-\u9999<>&"']/g, (c) => `&#${c.charCodeAt(0)};`);
    }
    if (format === "hex") {
      return str.replace(/[\u00A0-\u9999<>&"']/g, (c) => `&#x${c.charCodeAt(0).toString(16).toUpperCase()};`);
    }

    // Named entities
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&apos;");
  };

  const decodeHtml = (str: string) => {
    if (!str) return "";
    const textarea = document.createElement("textarea");
    textarea.innerHTML = str;
    return textarea.value;
  };

  const handleProcess = (
    text: string = input,
    m: "encode" | "decode" = mode,
    fmt: "named" | "decimal" | "hex" = entityFormat
  ) => {
    if (!text.trim()) {
      setOutput("");
      return;
    }

    if (m === "encode") {
      setOutput(encodeHtml(text, fmt));
    } else {
      setOutput(decodeHtml(text));
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setInput(val);
    handleProcess(val, mode, entityFormat);
  };

  const handleLoadSample = () => {
    setInput(sampleText);
    handleProcess(sampleText, mode, entityFormat);
  };

  const handleCopy = async () => {
    if (!output) return;
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-xl">
              <Binary className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">HTML Entity Encoder / Decoder</h1>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">Convert special characters to HTML entities and back</p>
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

        {/* Options */}
        <div className="mt-6 pt-4 border-t border-zinc-100 dark:border-zinc-800/80 flex flex-wrap items-center gap-6">
          <div className="flex items-center gap-2 bg-zinc-100 dark:bg-zinc-800 p-1 rounded-xl">
            <button
              onClick={() => {
                setMode("encode");
                handleProcess(input, "encode", entityFormat);
              }}
              className={`px-3 py-1 text-xs font-semibold rounded-lg transition ${
                mode === "encode"
                  ? "bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 shadow-sm"
                  : "text-zinc-500 dark:text-zinc-400"
              }`}
            >
              Encode
            </button>
            <button
              onClick={() => {
                setMode("decode");
                handleProcess(input, "decode", entityFormat);
              }}
              className={`px-3 py-1 text-xs font-semibold rounded-lg transition ${
                mode === "decode"
                  ? "bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 shadow-sm"
                  : "text-zinc-500 dark:text-zinc-400"
              }`}
            >
              Decode
            </button>
          </div>

          {mode === "encode" && (
            <div className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
              <label className="font-medium">Format:</label>
              <select
                value={entityFormat}
                onChange={(e) => {
                  const fmt = e.target.value as "named" | "decimal" | "hex";
                  setEntityFormat(fmt);
                  handleProcess(input, mode, fmt);
                }}
                className="px-3 py-1 text-sm bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="named">Named Entities (&amp;lt;)</option>
                <option value="decimal">Decimal (&amp;#60;)</option>
                <option value="hex">Hexadecimal (&amp;#x3C;)</option>
              </select>
            </div>
          )}
        </div>
      </div>

      {/* Editor Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Input */}
        <div className="flex flex-col space-y-2">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
            {mode === "encode" ? "Raw Input Text / HTML" : "HTML Entity Encoded Text"}
          </label>
          <textarea
            value={input}
            onChange={handleInputChange}
            placeholder={mode === "encode" ? "Type or paste text to encode..." : "Paste encoded HTML entities to decode..."}
            className="w-full h-96 p-4 font-mono text-sm bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-zinc-900 dark:text-zinc-100 resize-none shadow-sm"
          />
        </div>

        {/* Output */}
        <div className="flex flex-col space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              {mode === "encode" ? "Encoded Output" : "Decoded Output"}
            </label>
            <button
              onClick={handleCopy}
              disabled={!output}
              className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 disabled:opacity-40 text-zinc-700 dark:text-zinc-300 rounded-lg transition"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
          <textarea
            readOnly
            value={output}
            placeholder="Processed output will appear here..."
            className="w-full h-96 p-4 font-mono text-sm bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl text-zinc-900 dark:text-zinc-100 resize-none shadow-sm"
          />
        </div>
      </div>
    </div>
  );
}
