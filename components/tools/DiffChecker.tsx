"use client";

import React, { useState } from "react";
import { Sparkles, Trash2, ArrowRightLeft, Split, List } from "lucide-react";

interface DiffLine {
  type: "added" | "deleted" | "unchanged";
  value: string;
  oldLineNum?: number;
  newLineNum?: number;
}

export default function DiffChecker() {
  const [original, setOriginal] = useState("");
  const [modified, setModified] = useState("");
  const [diffResult, setDiffResult] = useState<DiffLine[] | null>(null);
  const [viewMode, setViewMode] = useState<"side" | "inline">("side");

  const handleCompare = () => {
    const oldLines = original.split("\n");
    const newLines = modified.split("\n");

    const m = oldLines.length;
    const n = newLines.length;

    // Standard Dynamic Programming LCS DP Table
    const dp: number[][] = Array(m + 1)
      .fill(null)
      .map(() => Array(n + 1).fill(0));

    for (let i = 1; i <= m; i++) {
      for (let j = 1; j <= n; j++) {
        if (oldLines[i - 1] === newLines[j - 1]) {
          dp[i][j] = dp[i - 1][j - 1] + 1;
        } else {
          dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
        }
      }
    }

    // Backtrack to find the diff
    let i = m;
    let j = n;
    const result: DiffLine[] = [];

    while (i > 0 || j > 0) {
      if (i > 0 && j > 0 && oldLines[i - 1] === newLines[j - 1]) {
        result.unshift({
          type: "unchanged",
          value: oldLines[i - 1],
          oldLineNum: i,
          newLineNum: j,
        });
        i--;
        j--;
      } else if (j > 0 && (i === 0 || dp[i][j - 1] >= dp[i - 1][j])) {
        result.unshift({
          type: "added",
          value: newLines[j - 1],
          newLineNum: j,
        });
        j--;
      } else if (i > 0 && (j === 0 || dp[i - 1][j] >= dp[i][j - 1])) {
        result.unshift({
          type: "deleted",
          value: oldLines[i - 1],
          oldLineNum: i,
        });
        i--;
      }
    }

    setDiffResult(result);
  };

  const handleClear = () => {
    setOriginal("");
    setModified("");
    setDiffResult(null);
  };

  const loadSample = () => {
    const originalSample = `// Original JavaScript code
function add(a, b) {
  return a + b;
}

const result = add(5, 10);
console.log("Result is: " + result);`;

    const modifiedSample = `// Modified JavaScript code
function add(a, b) {
  // Add positive validation
  if (a < 0 || b < 0) return 0;
  return a + b;
}

const finalValue = add(5, 10);
console.log("Calculated Value:", finalValue);`;

    setOriginal(originalSample);
    setModified(modifiedSample);
    setDiffResult(null);
  };

  return (
    <div className="space-y-6">
      {/* Input Stage */}
      {!diffResult ? (
        <div className="space-y-4">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Original Panel */}
            <div className="flex-1 flex flex-col space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Original Text</label>
                <button
                  onClick={loadSample}
                  className="text-xs px-2.5 py-1 rounded-lg border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors"
                >
                  Load Sample Code
                </button>
              </div>
              <textarea
                placeholder="Paste the original code or text here..."
                value={original}
                onChange={(e) => setOriginal(e.target.value)}
                className="w-full h-80 min-h-[300px] p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 text-zinc-800 dark:text-zinc-100 font-mono text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all resize-y"
              />
            </div>

            {/* Modified Panel */}
            <div className="flex-1 flex flex-col space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Modified Text</label>
                <button
                  onClick={handleClear}
                  className="text-xs px-2.5 py-1 rounded-lg border border-zinc-200 dark:border-zinc-800 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors"
                >
                  Clear All
                </button>
              </div>
              <textarea
                placeholder="Paste the modified code or text here..."
                value={modified}
                onChange={(e) => setModified(e.target.value)}
                className="w-full h-80 min-h-[300px] p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 text-zinc-800 dark:text-zinc-100 font-mono text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all resize-y"
              />
            </div>
          </div>

          <div className="flex justify-center">
            <button
              onClick={handleCompare}
              className="py-3 px-6 rounded-xl bg-gradient-to-r from-indigo-650 to-purple-650 hover:from-indigo-600 hover:to-purple-600 text-white font-semibold text-sm shadow-md transition-all duration-200 hover:-translate-y-0.5 flex items-center space-x-2 cursor-pointer"
            >
              <ArrowRightLeft className="w-4 h-4" />
              <span>Compare Texts</span>
            </button>
          </div>
        </div>
      ) : (
        /* Result Stage */
        <div className="space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setDiffResult(null)}
                className="text-xs px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-900 cursor-pointer"
              >
                &larr; Edit Input
              </button>
              <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Comparison Results</h3>
            </div>
            
            {/* View Mode controls */}
            <div className="flex items-center rounded-lg border border-zinc-200 dark:border-zinc-800 p-0.5 bg-zinc-50 dark:bg-zinc-900">
              <button
                onClick={() => setViewMode("side")}
                className={`flex items-center space-x-1 px-3 py-1 text-xs font-semibold rounded-md transition-all ${
                  viewMode === "side"
                    ? "bg-white dark:bg-zinc-800 text-indigo-600 dark:text-indigo-400 shadow-sm"
                    : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
                }`}
              >
                <Split className="w-3.5 h-3.5" />
                <span>Side by Side</span>
              </button>
              <button
                onClick={() => setViewMode("inline")}
                className={`flex items-center space-x-1 px-3 py-1 text-xs font-semibold rounded-md transition-all ${
                  viewMode === "inline"
                    ? "bg-white dark:bg-zinc-800 text-indigo-600 dark:text-indigo-400 shadow-sm"
                    : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
                }`}
              >
                <List className="w-3.5 h-3.5" />
                <span>Unified Inline</span>
              </button>
            </div>
          </div>

          {/* Diff render panel */}
          <div className="border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden bg-white dark:bg-zinc-950 font-mono text-sm leading-relaxed max-h-[600px] overflow-y-auto">
            {viewMode === "inline" ? (
              /* Inline View */
              <div className="divide-y divide-zinc-100 dark:divide-zinc-900/50">
                {diffResult.map((line, idx) => {
                  let bgClass = "bg-transparent text-zinc-700 dark:text-zinc-350";
                  let prefix = " ";
                  let lineNumText = "";

                  if (line.type === "added") {
                    bgClass = "bg-green-50 dark:bg-green-950/20 text-green-800 dark:text-green-400";
                    prefix = "+";
                    lineNumText = `  | ${line.newLineNum}`;
                  } else if (line.type === "deleted") {
                    bgClass = "bg-red-50 dark:bg-red-950/20 text-red-805 dark:text-red-400";
                    prefix = "-";
                    lineNumText = `${line.oldLineNum} |  `;
                  } else {
                    lineNumText = `${line.oldLineNum} | ${line.newLineNum}`;
                  }

                  return (
                    <div key={idx} className={`flex ${bgClass} py-0.5 px-4`}>
                      <span className="w-16 flex-shrink-0 text-zinc-400 select-none text-right pr-4 border-r border-zinc-100 dark:border-zinc-900/50">
                        {lineNumText}
                      </span>
                      <span className="w-6 flex-shrink-0 text-zinc-400 select-none text-center font-bold pl-2">
                        {prefix}
                      </span>
                      <span className="whitespace-pre-wrap break-all">{line.value}</span>
                    </div>
                  );
                })}
              </div>
            ) : (
              /* Side-by-Side View */
              <div className="flex divide-x divide-zinc-200 dark:divide-zinc-850">
                {/* Left Side (Original) */}
                <div className="flex-1 overflow-x-auto divide-y divide-zinc-50 dark:divide-zinc-900/10">
                  {diffResult.map((line, idx) => {
                    if (line.type === "added") {
                      // Empty space placeholder on left
                      return (
                        <div key={idx} className="flex bg-zinc-50 dark:bg-zinc-900/10 py-0.5 px-4 min-h-[24px]">
                          <span className="w-10 flex-shrink-0 text-zinc-400 select-none text-right pr-3 border-r border-zinc-100 dark:border-zinc-900/50"></span>
                          <span className="pl-3"></span>
                        </div>
                      );
                    }
                    const isDeleted = line.type === "deleted";
                    return (
                      <div
                        key={idx}
                        className={`flex py-0.5 px-4 min-h-[24px] ${
                          isDeleted ? "bg-red-50 dark:bg-red-950/20 text-red-800 dark:text-red-450" : "text-zinc-700 dark:text-zinc-350"
                        }`}
                      >
                        <span className="w-10 flex-shrink-0 text-zinc-400 select-none text-right pr-3 border-r border-zinc-100 dark:border-zinc-900/50">
                          {line.oldLineNum}
                        </span>
                        <span className="pl-3 whitespace-pre-wrap break-all">{line.value}</span>
                      </div>
                    );
                  })}
                </div>

                {/* Right Side (Modified) */}
                <div className="flex-1 overflow-x-auto divide-y divide-zinc-50 dark:divide-zinc-900/10">
                  {diffResult.map((line, idx) => {
                    if (line.type === "deleted") {
                      // Empty space placeholder on right
                      return (
                        <div key={idx} className="flex bg-zinc-50 dark:bg-zinc-900/10 py-0.5 px-4 min-h-[24px]">
                          <span className="w-10 flex-shrink-0 text-zinc-400 select-none text-right pr-3 border-r border-zinc-100 dark:border-zinc-900/50"></span>
                          <span className="pl-3"></span>
                        </div>
                      );
                    }
                    const isAdded = line.type === "added";
                    return (
                      <div
                        key={idx}
                        className={`flex py-0.5 px-4 min-h-[24px] ${
                          isAdded ? "bg-green-50 dark:bg-green-950/20 text-green-800 dark:text-green-455" : "text-zinc-700 dark:text-zinc-350"
                        }`}
                      >
                        <span className="w-10 flex-shrink-0 text-zinc-400 select-none text-right pr-3 border-r border-zinc-100 dark:border-zinc-900/50">
                          {line.newLineNum}
                        </span>
                        <span className="pl-3 whitespace-pre-wrap break-all">{line.value}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
