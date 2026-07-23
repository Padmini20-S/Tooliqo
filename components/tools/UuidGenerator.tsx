"use client";

import React, { useState, useEffect } from "react";
import { Copy, RefreshCw, Download, Check, Hash, Sliders } from "lucide-react";

export default function UuidGenerator() {
  const [count, setCount] = useState<number>(5);
  const [uppercase, setUppercase] = useState<boolean>(false);
  const [removeHyphens, setRemoveHyphens] = useState<boolean>(false);
  const [useBraces, setUseBraces] = useState<boolean>(false);
  const [uuids, setUuids] = useState<string[]>([]);
  const [copiedAll, setCopiedAll] = useState<boolean>(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const generateSingleUuid = (): string => {
    // RFC4122 v4 UUID generator using crypto.getRandomValues if available
    let uuid = "";
    if (typeof crypto !== "undefined" && crypto.randomUUID) {
      uuid = crypto.randomUUID();
    } else {
      uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
        const r = (Math.random() * 16) | 0;
        const v = c === "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      });
    }

    if (removeHyphens) {
      uuid = uuid.replace(/-/g, "");
    }
    if (uppercase) {
      uuid = uuid.toUpperCase();
    }
    if (useBraces) {
      uuid = `{${uuid}}`;
    }
    return uuid;
  };

  const generateUuids = () => {
    const list: string[] = [];
    const limit = Math.min(Math.max(1, count), 100);
    for (let i = 0; i < limit; i++) {
      list.push(generateSingleUuid());
    }
    setUuids(list);
  };

  useEffect(() => {
    generateUuids();
  }, [count, uppercase, removeHyphens, useBraces]);

  const handleCopyAll = async () => {
    if (uuids.length === 0) return;
    await navigator.clipboard.writeText(uuids.join("\n"));
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2000);
  };

  const handleCopySingle = async (uuid: string, idx: number) => {
    await navigator.clipboard.writeText(uuid);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleDownload = () => {
    if (uuids.length === 0) return;
    const blob = new Blob([uuids.join("\n")], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `uuids-${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-xl">
              <Hash className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">UUID v4 Generator</h1>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">Generate secure random RFC4122 version-4 UUID identifiers in bulk</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={generateUuids}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-sm transition"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Regenerate
            </button>
          </div>
        </div>

        {/* Options Bar */}
        <div className="mt-6 pt-4 border-t border-zinc-100 dark:border-zinc-800/80 flex flex-wrap items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-zinc-700 dark:text-zinc-300 font-medium">
              <Sliders className="w-4 h-4 text-zinc-400" />
              <span>Quantity:</span>
              <input
                type="number"
                min={1}
                max={100}
                value={count}
                onChange={(e) => setCount(Number(e.target.value))}
                className="w-20 px-3 py-1 text-sm bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500 text-center"
              />
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-sm text-zinc-700 dark:text-zinc-300">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={uppercase}
                onChange={(e) => setUppercase(e.target.checked)}
                className="rounded border-zinc-300 dark:border-zinc-700 text-blue-600 focus:ring-blue-500"
              />
              <span>Uppercase</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={removeHyphens}
                onChange={(e) => setRemoveHyphens(e.target.checked)}
                className="rounded border-zinc-300 dark:border-zinc-700 text-blue-600 focus:ring-blue-500"
              />
              <span>Remove Hyphens</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={useBraces}
                onChange={(e) => setUseBraces(e.target.checked)}
                className="rounded border-zinc-300 dark:border-zinc-700 text-blue-600 focus:ring-blue-500"
              />
              <span>Enclose in &#123;&#125;</span>
            </label>
          </div>
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
          Generated UUIDs ({uuids.length})
        </h2>
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopyAll}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 rounded-lg transition"
          >
            {copiedAll ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
            {copiedAll ? "Copied All!" : "Copy All"}
          </button>
          <button
            onClick={handleDownload}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 rounded-lg transition"
          >
            <Download className="w-3.5 h-3.5" />
            Download TXT
          </button>
        </div>
      </div>

      {/* UUID List */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 shadow-sm space-y-2 max-h-[500px] overflow-y-auto">
        {uuids.map((item, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between p-3 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-800/80 hover:border-blue-500/30 transition group"
          >
            <span className="font-mono text-sm text-zinc-900 dark:text-zinc-100 font-medium select-all">
              {item}
            </span>
            <button
              onClick={() => handleCopySingle(item, idx)}
              className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 rounded-lg transition shadow-xs"
            >
              {copiedIndex === idx ? (
                <>
                  <Check className="w-3.5 h-3.5 text-green-500" /> Copied
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" /> Copy
                </>
              )}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

