"use client";

import React, { useState } from "react";
import { Copy, Trash2, Upload, Download, Check, AlertCircle, Sparkles } from "lucide-react";

export default function JsonFormatter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [indentSize, setIndentSize] = useState<number>(2);
  const [copied, setCopied] = useState(false);

  const handleFormat = () => {
    if (!input.trim()) {
      setError("Please enter some JSON content to format.");
      setOutput("");
      return;
    }
    try {
      const parsed = JSON.parse(input);
      const formatted = JSON.stringify(parsed, null, indentSize);
      setOutput(formatted);
      setError(null);
    } catch (e: any) {
      setError(e.message || "Invalid JSON syntax.");
      setOutput("");
    }
  };

  const handleMinify = () => {
    if (!input.trim()) {
      setError("Please enter some JSON content to minify.");
      setOutput("");
      return;
    }
    try {
      const parsed = JSON.parse(input);
      const minified = JSON.stringify(parsed);
      setOutput(minified);
      setError(null);
    } catch (e: any) {
      setError(e.message || "Invalid JSON syntax.");
      setOutput("");
    }
  };

  const handleCopy = async () => {
    if (!output) return;
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.error("Copy failed", e);
    }
  };

  const handleClear = () => {
    setInput("");
    setOutput("");
    setError(null);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      setInput(result);
      setError(null);
    };
    reader.readAsText(file);
  };

  const handleDownload = () => {
    if (!output) return;
    const blob = new Blob([output], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "formatted.json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Sample JSON to load
  const loadSample = () => {
    const sample = {
      name: "Tooliqo JSON Formatter",
      version: "1.0.0",
      description: "Fast, reliable, and completely local.",
      active: true,
      features: [
        "Real-time validation",
        "Indent customizability",
        "One-click minify",
        "File uploading"
      ],
      developer: {
        skills: ["React", "Next.js", "Tailwind CSS"],
        location: "Local Browser"
      }
    };
    setInput(JSON.stringify(sample, null, 2));
    setError(null);
    setOutput("");
  };

  return (
    <div className="space-y-6">
      {/* Top Banner / AdSense Placeholder */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Input Panel */}
        <div className="flex-1 flex flex-col space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h3 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Raw Input JSON</h3>
            <div className="flex items-center space-x-2">
              <button
                onClick={loadSample}
                className="text-xs px-2.5 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors cursor-pointer"
              >
                Sample JSON
              </button>
              <label className="text-xs px-2.5 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors cursor-pointer flex items-center space-x-1.5">
                <Upload className="w-3.5 h-3.5" />
                <span>Upload File</span>
                <input
                  type="file"
                  accept=".json,application/json"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
              <button
                onClick={handleClear}
                className="text-xs px-2.5 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 text-red-655 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors cursor-pointer flex items-center space-x-1.5"
                title="Clear input and output"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear</span>
              </button>
            </div>
          </div>
          <textarea
            placeholder="Paste your dirty or raw JSON here..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full h-80 min-h-[300px] p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 text-zinc-800 dark:text-zinc-100 font-mono text-sm outline-none focus:border-indigo-500 dark:focus:border-indigo-400 focus:ring-1 focus:ring-indigo-500 dark:focus:ring-indigo-400 transition-all resize-y"
          />
        </div>

        {/* Action Controls & Settings */}
        <div className="lg:w-48 flex flex-col justify-center space-y-4">
          <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/20 space-y-4">
            <h4 className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider">
              Settings
            </h4>
            <div className="space-y-2">
              <label className="text-xs text-zinc-500 dark:text-zinc-400 block">Indentation</label>
              <select
                value={indentSize}
                onChange={(e) => setIndentSize(Number(e.target.value))}
                className="w-full text-sm p-2 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 outline-none focus:border-indigo-500 transition-colors"
              >
                <option value={2}>2 Spaces</option>
                <option value={4}>4 Spaces</option>
                <option value={8}>8 Spaces</option>
              </select>
            </div>

            <div className="pt-2 space-y-2">
              <button
                onClick={handleFormat}
                className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-650 hover:from-indigo-500 hover:to-purple-550 text-white font-semibold text-sm shadow-md shadow-indigo-550/20 transition-all duration-200 hover:-translate-y-0.5 cursor-pointer flex items-center justify-center space-x-1.5"
              >
                <Sparkles className="w-4 h-4" />
                <span>Format JSON</span>
              </button>
              <button
                onClick={handleMinify}
                className="w-full py-2.5 px-4 rounded-xl border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-350 hover:bg-zinc-50 dark:hover:bg-zinc-900 font-semibold text-sm transition-colors cursor-pointer"
              >
                Minify JSON
              </button>
            </div>
          </div>
        </div>

        {/* Output Panel */}
        <div className="flex-1 flex flex-col space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Formatted Output JSON</h3>
            <div className="flex items-center space-x-2">
              <button
                disabled={!output}
                onClick={handleDownload}
                className="text-xs px-2.5 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 text-zinc-650 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer flex items-center space-x-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download</span>
              </button>
              <button
                disabled={!output}
                onClick={handleCopy}
                className="text-xs px-2.5 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 text-zinc-650 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer flex items-center space-x-1.5 w-[76px]"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? "Copied!" : "Copy"}</span>
              </button>
            </div>
          </div>
          <div className="relative">
            <textarea
              readOnly
              placeholder="Your formatted JSON will appear here..."
              value={output}
              className="w-full h-80 min-h-[300px] p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900 text-zinc-800 dark:text-zinc-100 font-mono text-sm outline-none resize-y"
            />
          </div>
        </div>
      </div>

      {/* Validation / Error Banner */}
      {error && (
        <div className="flex items-start space-x-3 p-4 rounded-xl bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/50 text-red-800 dark:text-red-400">
          <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-semibold text-sm">JSON Parsing Error</h4>
            <p className="text-xs mt-1 font-mono leading-relaxed">{error}</p>
          </div>
        </div>
      )}
    </div>
  );
}
