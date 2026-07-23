"use client";

import React, { useState } from "react";
import { Copy, Trash2, Check, Sparkles, FileCode2 } from "lucide-react";

export default function JsFormatter() {
  const [jsInput, setJsInput] = useState("");
  const [jsOutput, setJsOutput] = useState("");
  const [indentSpaces, setIndentSpaces] = useState(2);
  const [copied, setCopied] = useState(false);

  const sampleJs = `function calculateTotal(items,taxRate=0.08){let subtotal=0;for(let i=0;i<items.length;i++){subtotal+=items[i].price*items[i].quantity;}const tax=subtotal*taxRate;return{subtotal,tax,total:subtotal+tax};}const cart=[{price:10,quantity:2},{price:25,quantity:1}];console.log(calculateTotal(cart));`;

  const formatJs = (input: string, spaces: number = indentSpaces) => {
    if (!input.trim()) {
      setJsOutput("");
      return;
    }

    const pad = " ".repeat(spaces);
    let indentLevel = 0;
    let result = "";

    // Normalize spacing around braces and semicolons
    let clean = input
      .replace(/{\s*/g, " {\n")
      .replace(/;\s*/g, ";\n")
      .replace(/}\s*/g, "}\n")
      .trim();

    const lines = clean.split("\n").map((l) => l.trim()).filter(Boolean);

    lines.forEach((line) => {
      if (line.startsWith("}")) {
        indentLevel = Math.max(0, indentLevel - 1);
      }

      result += `${pad.repeat(indentLevel)}${line}\n`;

      if (line.endsWith("{") || (line.includes("{") && !line.includes("}"))) {
        indentLevel++;
      }
    });

    setJsOutput(result.trim());
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setJsInput(val);
    formatJs(val, indentSpaces);
  };

  const handleLoadSample = () => {
    setJsInput(sampleJs);
    formatJs(sampleJs, indentSpaces);
  };

  const handleCopy = async () => {
    if (!jsOutput) return;
    await navigator.clipboard.writeText(jsOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 rounded-xl">
              <FileCode2 className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">JavaScript / TS Formatter</h1>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">Beautify JavaScript and TypeScript code snippets nicely</p>
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
                setJsInput("");
                setJsOutput("");
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
                formatJs(jsInput, val);
              }}
              className="px-3 py-1 text-sm bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-yellow-500"
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
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Raw / Minified JS Input</label>
          <textarea
            value={jsInput}
            onChange={handleInputChange}
            placeholder="Paste JS / TS code snippet here..."
            className="w-full h-96 p-4 font-mono text-sm bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-yellow-500 text-zinc-900 dark:text-zinc-100 resize-none shadow-sm"
          />
        </div>

        {/* Output */}
        <div className="flex flex-col space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Formatted JavaScript</label>
            <button
              onClick={handleCopy}
              disabled={!jsOutput}
              className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 disabled:opacity-40 text-zinc-700 dark:text-zinc-300 rounded-lg transition"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
          <textarea
            readOnly
            value={jsOutput}
            placeholder="Formatted JS code will appear here..."
            className="w-full h-96 p-4 font-mono text-sm bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl text-zinc-900 dark:text-zinc-100 resize-none shadow-sm"
          />
        </div>
      </div>
    </div>
  );
}
