"use client";

import React, { useState } from "react";
import { Copy, Check, Shield, Sparkles, Terminal } from "lucide-react";

export default function ChmodCalculator() {
  // User/Owner permissions
  const [userR, setUserR] = useState(true);
  const [userW, setUserW] = useState(true);
  const [userX, setUserX] = useState(true);

  // Group permissions
  const [groupR, setGroupR] = useState(true);
  const [groupW, setGroupW] = useState(false);
  const [groupX, setGroupX] = useState(true);

  // Public/Other permissions
  const [publicR, setPublicR] = useState(true);
  const [publicW, setPublicW] = useState(false);
  const [publicX, setPublicX] = useState(true);

  const [copiedOctal, setCopiedOctal] = useState(false);
  const [copiedSymbolic, setCopiedSymbolic] = useState(false);
  const [copiedCommand, setCopiedCommand] = useState(false);

  // Calculate octal value (0-7 for each role)
  const userVal = (userR ? 4 : 0) + (userW ? 2 : 0) + (userX ? 1 : 0);
  const groupVal = (groupR ? 4 : 0) + (groupW ? 2 : 0) + (groupX ? 1 : 0);
  const publicVal = (publicR ? 4 : 0) + (publicW ? 2 : 0) + (publicX ? 1 : 0);

  const octalNotation = `${userVal}${groupVal}${publicVal}`;

  const formatSymbolicTriple = (r: boolean, w: boolean, x: boolean) => {
    return `${r ? "r" : "-"}${w ? "w" : "-"}${x ? "x" : "-"}`;
  };

  const symbolicNotation = `-${formatSymbolicTriple(userR, userW, userX)}${formatSymbolicTriple(groupR, groupW, groupX)}${formatSymbolicTriple(publicR, publicW, publicX)}`;

  const chmodCommand = `chmod ${octalNotation} filename`;

  const presets = [
    { label: "755 (Standard Directory / Executable)", user: [true, true, true], group: [true, false, true], public: [true, false, true] },
    { label: "644 (Standard File)", user: [true, true, false], group: [true, false, false], public: [true, false, false] },
    { label: "777 (Full Public Access - Unsafe)", user: [true, true, true], group: [true, true, true], public: [true, true, true] },
    { label: "600 (Private Key / File)", user: [true, true, false], group: [false, false, false], public: [false, false, false] },
    { label: "400 (Read Only Private File)", user: [true, false, false], group: [false, false, false], public: [false, false, false] }
  ];

  const applyPreset = (p: typeof presets[0]) => {
    setUserR(p.user[0]); setUserW(p.user[1]); setUserX(p.user[2]);
    setGroupR(p.group[0]); setGroupW(p.group[1]); setGroupX(p.group[2]);
    setPublicR(p.public[0]); setPublicW(p.public[1]); setPublicX(p.public[2]);
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-xl">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">Chmod Calculator</h1>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">Calculate Linux file permissions octal values and symbolic notation</p>
            </div>
          </div>
        </div>

        {/* Quick Presets */}
        <div className="mt-6 pt-4 border-t border-zinc-100 dark:border-zinc-800/80">
          <label className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-2 block">Common Presets</label>
          <div className="flex flex-wrap gap-2">
            {presets.map((p, idx) => (
              <button
                key={idx}
                onClick={() => applyPreset(p)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-zinc-100 dark:bg-zinc-800 hover:bg-blue-500/10 hover:text-blue-600 text-zinc-700 dark:text-zinc-300 rounded-xl transition"
              >
                <Sparkles className="w-3 h-3 text-blue-500" />
                {p.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Output Display Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Octal */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 shadow-sm space-y-2">
          <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider block">Octal Value</span>
          <div className="flex items-center justify-between">
            <span className="text-3xl font-mono font-bold text-blue-600 dark:text-blue-400">{octalNotation}</span>
            <button
              onClick={async () => {
                await navigator.clipboard.writeText(octalNotation);
                setCopiedOctal(true);
                setTimeout(() => setCopiedOctal(false), 2000);
              }}
              className="p-2 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
            >
              {copiedOctal ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Symbolic */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 shadow-sm space-y-2">
          <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider block">Symbolic Notation</span>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-mono font-bold text-purple-600 dark:text-purple-400">{symbolicNotation}</span>
            <button
              onClick={async () => {
                await navigator.clipboard.writeText(symbolicNotation);
                setCopiedSymbolic(true);
                setTimeout(() => setCopiedSymbolic(false), 2000);
              }}
              className="p-2 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
            >
              {copiedSymbolic ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Command */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 shadow-sm space-y-2">
          <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider block">Linux Command</span>
          <div className="flex items-center justify-between">
            <span className="text-sm font-mono font-semibold text-zinc-800 dark:text-zinc-200 truncate">{chmodCommand}</span>
            <button
              onClick={async () => {
                await navigator.clipboard.writeText(chmodCommand);
                setCopiedCommand(true);
                setTimeout(() => setCopiedCommand(false), 2000);
              }}
              className="p-2 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition shrink-0"
            >
              {copiedCommand ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Permission Checkboxes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Owner / User */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800/80 pb-3">
            <h3 className="font-bold text-zinc-900 dark:text-zinc-100">Owner (User)</h3>
            <span className="font-mono text-sm font-bold bg-blue-500/10 text-blue-600 px-2 py-0.5 rounded-lg">{userVal}</span>
          </div>

          <div className="space-y-3">
            <label className="flex items-center justify-between p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 cursor-pointer">
              <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Read (r - 4)</span>
              <input
                type="checkbox"
                checked={userR}
                onChange={(e) => setUserR(e.target.checked)}
                className="w-4 h-4 rounded border-zinc-300 dark:border-zinc-700 text-blue-600 focus:ring-blue-500"
              />
            </label>

            <label className="flex items-center justify-between p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 cursor-pointer">
              <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Write (w - 2)</span>
              <input
                type="checkbox"
                checked={userW}
                onChange={(e) => setUserW(e.target.checked)}
                className="w-4 h-4 rounded border-zinc-300 dark:border-zinc-700 text-blue-600 focus:ring-blue-500"
              />
            </label>

            <label className="flex items-center justify-between p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 cursor-pointer">
              <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Execute (x - 1)</span>
              <input
                type="checkbox"
                checked={userX}
                onChange={(e) => setUserX(e.target.checked)}
                className="w-4 h-4 rounded border-zinc-300 dark:border-zinc-700 text-blue-600 focus:ring-blue-500"
              />
            </label>
          </div>
        </div>

        {/* Group */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800/80 pb-3">
            <h3 className="font-bold text-zinc-900 dark:text-zinc-100">Group</h3>
            <span className="font-mono text-sm font-bold bg-purple-500/10 text-purple-600 px-2 py-0.5 rounded-lg">{groupVal}</span>
          </div>

          <div className="space-y-3">
            <label className="flex items-center justify-between p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 cursor-pointer">
              <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Read (r - 4)</span>
              <input
                type="checkbox"
                checked={groupR}
                onChange={(e) => setGroupR(e.target.checked)}
                className="w-4 h-4 rounded border-zinc-300 dark:border-zinc-700 text-purple-600 focus:ring-purple-500"
              />
            </label>

            <label className="flex items-center justify-between p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 cursor-pointer">
              <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Write (w - 2)</span>
              <input
                type="checkbox"
                checked={groupW}
                onChange={(e) => setGroupW(e.target.checked)}
                className="w-4 h-4 rounded border-zinc-300 dark:border-zinc-700 text-purple-600 focus:ring-purple-500"
              />
            </label>

            <label className="flex items-center justify-between p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 cursor-pointer">
              <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Execute (x - 1)</span>
              <input
                type="checkbox"
                checked={groupX}
                onChange={(e) => setGroupX(e.target.checked)}
                className="w-4 h-4 rounded border-zinc-300 dark:border-zinc-700 text-purple-600 focus:ring-purple-500"
              />
            </label>
          </div>
        </div>

        {/* Public / Others */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800/80 pb-3">
            <h3 className="font-bold text-zinc-900 dark:text-zinc-100">Public (Others)</h3>
            <span className="font-mono text-sm font-bold bg-amber-500/10 text-amber-600 px-2 py-0.5 rounded-lg">{publicVal}</span>
          </div>

          <div className="space-y-3">
            <label className="flex items-center justify-between p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 cursor-pointer">
              <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Read (r - 4)</span>
              <input
                type="checkbox"
                checked={publicR}
                onChange={(e) => setPublicR(e.target.checked)}
                className="w-4 h-4 rounded border-zinc-300 dark:border-zinc-700 text-amber-600 focus:ring-amber-500"
              />
            </label>

            <label className="flex items-center justify-between p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 cursor-pointer">
              <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Write (w - 2)</span>
              <input
                type="checkbox"
                checked={publicW}
                onChange={(e) => setPublicW(e.target.checked)}
                className="w-4 h-4 rounded border-zinc-300 dark:border-zinc-700 text-amber-600 focus:ring-amber-500"
              />
            </label>

            <label className="flex items-center justify-between p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 cursor-pointer">
              <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Execute (x - 1)</span>
              <input
                type="checkbox"
                checked={publicX}
                onChange={(e) => setPublicX(e.target.checked)}
                className="w-4 h-4 rounded border-zinc-300 dark:border-zinc-700 text-amber-600 focus:ring-amber-500"
              />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

