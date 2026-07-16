"use client";

import React, { useState } from "react";
import { Copy, Check, Trash2, ArrowRight, AlertCircle, FileUp } from "lucide-react";

export default function Base64Codec() {
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleConvert = () => {
    if (!input.trim()) {
      setError("Please provide some input first.");
      setOutput("");
      return;
    }
    try {
      if (mode === "encode") {
        // UTF-8 base64 encoding support (to handle emojis and special characters correctly)
        const bytes = new TextEncoder().encode(input);
        const binString = String.fromCodePoint(...bytes);
        const base64 = btoa(binString);
        setOutput(base64);
        setError(null);
      } else {
        const binString = atob(input.trim());
        const bytes = Uint8Array.from(binString, (m) => m.codePointAt(0)!);
        const text = new TextDecoder().decode(bytes);
        setOutput(text);
        setError(null);
      }
    } catch (e: any) {
      setError(
        mode === "decode"
          ? "Invalid Base65 string. Please check that the input contains only valid Base64 characters and padding."
          : e.message || "Encoding failed."
      );
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
      console.error(e);
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
      if (mode === "encode") {
        setInput(result);
      } else {
        setInput(result);
      }
      setError(null);
    };
    reader.readAsText(file);
  };

  return (
    <div className="space-y-6">
      {/* Mode Selector */}
      <div className="flex justify-center">
        <div className="flex items-center rounded-xl border border-zinc-200 dark:border-zinc-800 p-1 bg-zinc-50 dark:bg-zinc-900/50">
          <button
            onClick={() => {
              setMode("encode");
              handleClear();
            }}
            className={`px-6 py-2 text-sm font-semibold rounded-lg transition-all cursor-pointer ${
              mode === "encode"
                ? "bg-white dark:bg-zinc-800 text-indigo-600 dark:text-indigo-400 shadow-md shadow-indigo-500/5"
                : "text-zinc-500 hover:text-zinc-950 dark:hover:text-white"
            }`}
          >
            Text &rarr; Base64 (Encode)
          </button>
          <button
            onClick={() => {
              setMode("decode");
              handleClear();
            }}
            className={`px-6 py-2 text-sm font-semibold rounded-lg transition-all cursor-pointer ${
              mode === "decode"
                ? "bg-white dark:bg-zinc-800 text-indigo-600 dark:text-indigo-400 shadow-md shadow-indigo-500/5"
                : "text-zinc-500 hover:text-zinc-950 dark:hover:text-white"
            }`}
          >
            Base64 &rarr; Text (Decode)
          </button>
        </div>
      </div>

      {/* Editor Grid */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Input Panel */}
        <div className="flex-1 flex flex-col space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
              {mode === "encode" ? "Raw UTF-8 Input Text" : "Base64 Input String"}
            </h3>
            <div className="flex items-center space-x-2">
              <label className="text-xs px-2.5 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 text-zinc-650 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors cursor-pointer flex items-center space-x-1.5">
                <FileUp className="w-3.5 h-3.5" />
                <span>Upload File</span>
                <input type="file" accept=".txt,.json,.base64" onChange={handleFileUpload} className="hidden" />
              </label>
              <button
                onClick={handleClear}
                className="text-xs px-2.5 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors cursor-pointer flex items-center space-x-1.5"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear</span>
              </button>
            </div>
          </div>
          <textarea
            placeholder={
              mode === "encode"
                ? "Type or paste UTF-8 string to encode..."
                : "Paste your base64 string to decode (e.g. dG9vbGlxbw==)..."
            }
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full h-80 min-h-[300px] p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 text-zinc-800 dark:text-zinc-100 font-mono text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all resize-y"
          />
        </div>

        {/* Process button */}
        <div className="lg:w-32 flex flex-col justify-center">
          <button
            onClick={handleConvert}
            className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-indigo-650 to-purple-650 hover:from-indigo-600 hover:to-purple-600 text-white font-semibold text-sm shadow-md transition-all duration-200 hover:-translate-y-0.5 flex items-center justify-center space-x-1.5 cursor-pointer"
          >
            <span>Convert</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Output Panel */}
        <div className="flex-1 flex flex-col space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Conversion Output</h3>
            <button
              disabled={!output}
              onClick={handleCopy}
              className="text-xs px-2.5 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 text-zinc-650 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer flex items-center space-x-1.5 w-[76px]"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? "Copied!" : "Copy"}</span>
            </button>
          </div>
          <textarea
            readOnly
            placeholder="Your output will appear here..."
            value={output}
            className="w-full h-80 min-h-[300px] p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900 text-zinc-800 dark:text-zinc-100 font-mono text-sm outline-none resize-y"
          />
        </div>
      </div>

      {/* Error alert */}
      {error && (
        <div className="flex items-start space-x-3 p-4 rounded-xl bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/50 text-red-800 dark:text-red-450">
          <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-semibold text-sm">Conversion Error</h4>
            <p className="text-xs mt-1 leading-relaxed">{error}</p>
          </div>
        </div>
      )}
    </div>
  );
}
