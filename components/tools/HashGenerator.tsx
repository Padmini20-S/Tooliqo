"use client";

import React, { useState, useEffect } from "react";
import { Copy, Check, Trash2, Key } from "lucide-react";

export default function HashGenerator() {
  const [input, setInput] = useState("");
  const [hashes, setHashes] = useState({
    sha1: "",
    sha256: "",
    sha384: "",
    sha512: "",
  });
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Helper to compute a hash using the SubtleCrypto API
  const computeHash = async (text: string, algorithm: string): Promise<string> => {
    if (!text) return "";
    try {
      const msgBuffer = new TextEncoder().encode(text);
      const hashBuffer = await crypto.subtle.digest(algorithm, msgBuffer);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
      return hashHex;
    } catch (err) {
      console.error(err);
      return "Hash error";
    }
  };

  useEffect(() => {
    const updateHashes = async () => {
      if (!input) {
        setHashes({ sha1: "", sha256: "", sha384: "", sha512: "" });
        return;
      }
      const sha1 = await computeHash(input, "SHA-1");
      const sha256 = await computeHash(input, "SHA-256");
      const sha384 = await computeHash(input, "SHA-384");
      const sha512 = await computeHash(input, "SHA-512");
      setHashes({ sha1, sha256, sha384, sha512 });
    };

    updateHashes();
  }, [input]);

  const handleCopy = async (hashVal: string, key: string) => {
    if (!hashVal) return;
    try {
      await navigator.clipboard.writeText(hashVal);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2000);
    } catch (e) {
      console.error(e);
    }
  };

  const handleClear = () => {
    setInput("");
  };

  return (
    <div className="space-y-6">
      {/* Input panel */}
      <div className="flex flex-col space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Input Text</label>
          <button
            onClick={handleClear}
            className="text-xs px-2.5 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors cursor-pointer flex items-center space-x-1.5"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear</span>
          </button>
        </div>
        <textarea
          placeholder="Type or paste the text to hash here..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full h-32 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 text-zinc-800 dark:text-zinc-100 font-mono text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all resize-y"
        />
      </div>

      {/* Output Grid */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider">
          Calculated Cryptographic Checksums
        </h3>

        <div className="grid grid-cols-1 gap-4">
          {/* SHA-256 */}
          <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/20 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 font-mono">SHA-256</span>
              <p className="font-mono text-xs text-zinc-650 dark:text-zinc-305 break-all select-all">
                {hashes.sha256 || <span className="text-zinc-400 italic">Provide input text...</span>}
              </p>
            </div>
            <button
              disabled={!hashes.sha256}
              onClick={() => handleCopy(hashes.sha256, "sha256")}
              className="text-xs px-3 py-2 rounded-lg border border-zinc-200 dark:border-zinc-800 text-zinc-650 dark:text-zinc-450 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer flex items-center justify-center space-x-1.5 w-[76px] self-start md:self-auto"
            >
              {copiedKey === "sha256" ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedKey === "sha256" ? "Copied!" : "Copy"}</span>
            </button>
          </div>

          {/* SHA-512 */}
          <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/20 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-xs font-bold text-pink-600 dark:text-pink-400 font-mono">SHA-512</span>
              <p className="font-mono text-xs text-zinc-650 dark:text-zinc-305 break-all select-all">
                {hashes.sha512 || <span className="text-zinc-400 italic">Provide input text...</span>}
              </p>
            </div>
            <button
              disabled={!hashes.sha512}
              onClick={() => handleCopy(hashes.sha512, "sha512")}
              className="text-xs px-3 py-2 rounded-lg border border-zinc-200 dark:border-zinc-800 text-zinc-650 dark:text-zinc-450 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer flex items-center justify-center space-x-1.5 w-[76px] self-start md:self-auto"
            >
              {copiedKey === "sha512" ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedKey === "sha512" ? "Copied!" : "Copy"}</span>
            </button>
          </div>

          {/* SHA-1 */}
          <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/20 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-xs font-bold text-amber-600 dark:text-amber-400 font-mono">SHA-1 (Legacy)</span>
              <p className="font-mono text-xs text-zinc-650 dark:text-zinc-305 break-all select-all">
                {hashes.sha1 || <span className="text-zinc-400 italic">Provide input text...</span>}
              </p>
            </div>
            <button
              disabled={!hashes.sha1}
              onClick={() => handleCopy(hashes.sha1, "sha1")}
              className="text-xs px-3 py-2 rounded-lg border border-zinc-200 dark:border-zinc-800 text-zinc-650 dark:text-zinc-450 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer flex items-center justify-center space-x-1.5 w-[76px] self-start md:self-auto"
            >
              {copiedKey === "sha1" ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedKey === "sha1" ? "Copied!" : "Copy"}</span>
            </button>
          </div>

          {/* SHA-384 */}
          <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/20 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 font-mono">SHA-384</span>
              <p className="font-mono text-xs text-zinc-650 dark:text-zinc-305 break-all select-all">
                {hashes.sha384 || <span className="text-zinc-400 italic">Provide input text...</span>}
              </p>
            </div>
            <button
              disabled={!hashes.sha384}
              onClick={() => handleCopy(hashes.sha384, "sha384")}
              className="text-xs px-3 py-2 rounded-lg border border-zinc-200 dark:border-zinc-800 text-zinc-650 dark:text-zinc-450 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer flex items-center justify-center space-x-1.5 w-[76px] self-start md:self-auto"
            >
              {copiedKey === "sha384" ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedKey === "sha384" ? "Copied!" : "Copy"}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
