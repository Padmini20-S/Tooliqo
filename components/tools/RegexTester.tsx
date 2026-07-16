"use client";

import React, { useState, useEffect } from "react";
import { Search, AlertCircle, Info, Check, Copy } from "lucide-react";

interface MatchResult {
  text: string;
  index: number;
  groups: string[];
}

export default function RegexTester() {
  const [pattern, setPattern] = useState("([a-zA-Z0-9._%-]+)@([a-zA-Z0-9.-]+)\\.([a-zA-Z]{2,6})");
  const [testText, setTestText] = useState("Hello, please contact us at support@tooliqo.com or admin@tooliqo.org.");
  const [flags, setFlags] = useState({ g: true, i: true, m: false });
  const [matches, setMatches] = useState<MatchResult[]>([]);
  const [highlightedSegments, setHighlightedSegments] = useState<{ text: string; isMatch: boolean }[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!pattern) {
      setMatches([]);
      setHighlightedSegments([{ text: testText, isMatch: false }]);
      setError(null);
      return;
    }

    try {
      let activeFlags = "";
      if (flags.g) activeFlags += "g";
      if (flags.i) activeFlags += "i";
      if (flags.m) activeFlags += "m";

      const regex = new RegExp(pattern, activeFlags);
      const tempMatches: MatchResult[] = [];
      const segments: { text: string; isMatch: boolean }[] = [];
      let lastIndex = 0;

      // Exec regex matching
      if (flags.g) {
        let match;
        while ((match = regex.exec(testText)) !== null) {
          tempMatches.push({
            text: match[0],
            index: match.index,
            groups: match.slice(1).filter(Boolean),
          });

          // Add preceding non-match segment
          if (match.index > lastIndex) {
            segments.push({
              text: testText.slice(lastIndex, match.index),
              isMatch: false,
            });
          }

          // Add match segment
          segments.push({
            text: match[0],
            isMatch: true,
          });

          lastIndex = regex.lastIndex;

          // Prevent infinite loops on zero-width matches
          if (match[0].length === 0) {
            regex.lastIndex++;
          }
        }
      } else {
        const match = regex.exec(testText);
        if (match) {
          tempMatches.push({
            text: match[0],
            index: match.index,
            groups: match.slice(1).filter(Boolean),
          });

          if (match.index > lastIndex) {
            segments.push({
              text: testText.slice(lastIndex, match.index),
              isMatch: false,
            });
          }

          segments.push({
            text: match[0],
            isMatch: true,
          });

          lastIndex = match.index + match[0].length;
        }
      }

      // Add remaining text
      if (lastIndex < testText.length) {
        segments.push({
          text: testText.slice(lastIndex),
          isMatch: false,
        });
      }

      setMatches(tempMatches);
      setHighlightedSegments(segments.length > 0 ? segments : [{ text: testText, isMatch: false }]);
      setError(null);
    } catch (e: any) {
      setError(e.message || "Invalid regular expression pattern.");
      setMatches([]);
      setHighlightedSegments([{ text: testText, isMatch: false }]);
    }
  }, [pattern, testText, flags]);

  const loadSample = () => {
    setPattern("\\b\\d{3}-\\d{3}-\\d{4}\\b");
    setTestText("You can call our support desk at 123-456-7890 or 987-654-3210.");
    setFlags({ g: true, i: true, m: false });
  };

  return (
    <div className="space-y-6">
      {/* Editor top section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pattern & Flags Inputs */}
        <div className="lg:col-span-2 space-y-4">
          <div className="p-5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/20 space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-semibold text-zinc-900 dark:text-zinc-150">Regex Pattern</label>
              <button
                onClick={loadSample}
                className="text-xs px-2.5 py-1 rounded-lg border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors"
              >
                Sample Pattern
              </button>
            </div>
            
            {/* Pattern Input */}
            <div className="flex items-center space-x-2 border border-zinc-200 dark:border-zinc-800 rounded-lg p-2.5 bg-zinc-50 dark:bg-zinc-900">
              <span className="text-zinc-400 dark:text-zinc-500 font-mono font-semibold select-none">/</span>
              <input
                type="text"
                placeholder="Enter regex pattern here (e.g. [0-9]+)..."
                value={pattern}
                onChange={(e) => setPattern(e.target.value)}
                className="flex-1 text-sm bg-transparent outline-none font-mono text-indigo-650 dark:text-indigo-400"
              />
              <span className="text-zinc-400 dark:text-zinc-500 font-mono font-semibold select-none">/</span>
              <span className="text-xs font-mono text-zinc-500 font-bold bg-zinc-200 dark:bg-zinc-800 px-1.5 py-0.5 rounded">
                {(flags.g ? "g" : "") + (flags.i ? "i" : "") + (flags.m ? "m" : "")}
              </span>
            </div>

            {/* Flags Checkboxes */}
            <div className="flex items-center space-x-6 pt-2">
              <label className="flex items-center space-x-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={flags.g}
                  onChange={(e) => setFlags({ ...flags, g: e.target.checked })}
                  className="w-4 h-4 text-indigo-600 border-zinc-350 dark:border-zinc-700 rounded"
                />
                <span className="text-xs font-medium text-zinc-650 dark:text-zinc-300 font-mono" title="Global match">g (global)</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={flags.i}
                  onChange={(e) => setFlags({ ...flags, i: e.target.checked })}
                  className="w-4 h-4 text-indigo-600 border-zinc-350 dark:border-zinc-700 rounded"
                />
                <span className="text-xs font-medium text-zinc-650 dark:text-zinc-300 font-mono" title="Case insensitive match">i (insensitive)</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={flags.m}
                  onChange={(e) => setFlags({ ...flags, m: e.target.checked })}
                  className="w-4 h-4 text-indigo-600 border-zinc-350 dark:border-zinc-700 rounded"
                />
                <span className="text-xs font-medium text-zinc-650 dark:text-zinc-300 font-mono" title="Multiline search">m (multiline)</span>
              </label>
            </div>
          </div>
        </div>

        {/* Info card */}
        <div className="p-5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/20 text-xs text-zinc-500 dark:text-zinc-400 space-y-2.5">
          <h4 className="font-semibold text-zinc-700 dark:text-zinc-300 flex items-center space-x-1 uppercase tracking-wider text-[10px]">
            <Info className="w-3.5 h-3.5 text-indigo-500" />
            <span>Regex Cheat Sheet</span>
          </h4>
          <ul className="space-y-1.5 list-disc pl-4 font-sans leading-relaxed">
            <li><code className="bg-zinc-100 dark:bg-zinc-800 px-1 py-0.5 rounded font-mono text-[10px]">\d</code> - match any digit (0-9)</li>
            <li><code className="bg-zinc-100 dark:bg-zinc-800 px-1 py-0.5 rounded font-mono text-[10px]">\w</code> - match any word character (a-z, A-Z, 0-9, _)</li>
            <li><code className="bg-zinc-100 dark:bg-zinc-800 px-1 py-0.5 rounded font-mono text-[10px]">\b</code> - match a word boundary</li>
            <li><code className="bg-zinc-100 dark:bg-zinc-800 px-1 py-0.5 rounded font-mono text-[10px]">+</code> - match 1 or more occurrences</li>
            <li><code className="bg-zinc-100 dark:bg-zinc-800 px-1 py-0.5 rounded font-mono text-[10px]">*</code> - match 0 or more occurrences</li>
          </ul>
        </div>
      </div>

      {/* Target input & Visual Highlight */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Test String */}
        <div className="flex flex-col space-y-2">
          <label className="text-sm font-semibold text-zinc-750 dark:text-zinc-300">Test String</label>
          <textarea
            placeholder="Enter target test string here..."
            value={testText}
            onChange={(e) => setTestText(e.target.value)}
            className="w-full h-64 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 text-zinc-800 dark:text-zinc-100 font-mono text-sm outline-none focus:border-indigo-500 transition-all resize-y leading-relaxed"
          />
        </div>

        {/* Visual Matches Highlight */}
        <div className="flex flex-col space-y-2">
          <label className="text-sm font-semibold text-zinc-750 dark:text-zinc-300">Match Highlighting</label>
          <div className="w-full h-64 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 overflow-y-auto font-mono text-sm leading-relaxed whitespace-pre-wrap break-all">
            {highlightedSegments.map((seg, idx) => (
              <span
                key={idx}
                className={
                  seg.isMatch
                    ? "bg-indigo-100 dark:bg-indigo-950 text-indigo-850 dark:text-indigo-300 border-b-2 border-indigo-500 dark:border-indigo-400 font-bold px-0.5 rounded-sm"
                    : "text-zinc-700 dark:text-zinc-400"
                }
              >
                {seg.text}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Matches & Group breakdowns */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider">
          Matches Breakdown ({matches.length})
        </h3>
        
        {matches.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-60 overflow-y-auto p-1">
            {matches.map((m, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-lg border border-zinc-150 dark:border-zinc-800 bg-white dark:bg-zinc-900/20 text-xs flex justify-between items-start gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-indigo-600 dark:text-indigo-400 font-mono">Match {idx + 1}:</span>
                    <span className="bg-zinc-100 dark:bg-zinc-800 font-mono text-zinc-550 px-1 rounded">Index {m.index}</span>
                  </div>
                  <p className="font-mono text-sm text-zinc-800 dark:text-zinc-200 font-bold mt-1 break-all bg-zinc-50 dark:bg-zinc-950/40 p-1.5 rounded">{m.text}</p>
                  
                  {m.groups.length > 0 && (
                    <div className="pt-1.5 space-y-1">
                      <span className="font-semibold text-[10px] text-zinc-450 dark:text-zinc-500 uppercase tracking-wider">Capturing Groups:</span>
                      <div className="flex flex-wrap gap-1.5">
                        {m.groups.map((group, gIdx) => (
                          <span
                            key={gIdx}
                            className="bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-400 border border-indigo-100/50 dark:border-indigo-900/20 px-2 py-0.5 rounded font-mono text-[10px]"
                          >
                            Group {gIdx + 1}: {group}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center p-8 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-905">
            <p className="text-sm text-zinc-400 dark:text-zinc-500 italic">No matches found.</p>
          </div>
        )}
      </div>

      {/* Regex Syntax Error Alert */}
      {error && (
        <div className="flex items-start space-x-3 p-4 rounded-xl bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/50 text-red-800 dark:text-red-450">
          <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-semibold text-sm">Regex Syntax Error</h4>
            <p className="text-xs mt-1 font-mono leading-relaxed">{error}</p>
          </div>
        </div>
      )}
    </div>
  );
}
