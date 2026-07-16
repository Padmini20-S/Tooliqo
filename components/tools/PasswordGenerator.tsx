"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Copy, Check, RotateCw, Shield, AlertTriangle } from "lucide-react";
import { toast } from "sonner";

export default function PasswordGenerator() {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(16);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [excludeSimilar, setExcludeSimilar] = useState(false);
  const [copied, setCopied] = useState(false);
  const [strength, setStrength] = useState({ label: "Medium", score: 2, color: "bg-yellow-500", textColor: "text-yellow-600 dark:text-yellow-400" });

  const generatePassword = useCallback(() => {
    const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
    const numberChars = "0123456789";
    const symbolChars = "!@#$%^&*()_+-=[]{}|;:,.<>?";
    const similarChars = /[il1Lo0O]/g;

    let availableChars = "";
    if (includeUppercase) availableChars += uppercaseChars;
    if (includeLowercase) availableChars += lowercaseChars;
    if (includeNumbers) availableChars += numberChars;
    if (includeSymbols) availableChars += symbolChars;

    if (excludeSimilar) {
      availableChars = availableChars.replace(similarChars, "");
    }

    if (!availableChars) {
      setPassword("");
      return;
    }

    let generatedPassword = "";
    const array = new Uint32Array(length);
    window.crypto.getRandomValues(array);

    for (let i = 0; i < length; i++) {
      generatedPassword += availableChars[array[i] % availableChars.length];
    }

    setPassword(generatedPassword);
  }, [length, includeUppercase, includeLowercase, includeNumbers, includeSymbols, excludeSimilar]);

  // Calculate password strength
  useEffect(() => {
    if (!password) {
      setStrength({ label: "None", score: 0, color: "bg-zinc-200 dark:bg-zinc-800", textColor: "text-zinc-400" });
      return;
    }

    let score = 0;
    // Length weight
    if (password.length >= 8) score += 1;
    if (password.length >= 14) score += 1;
    if (password.length >= 20) score += 1;

    // Variety weight
    let activeCategories = 0;
    if (/[a-z]/.test(password)) activeCategories++;
    if (/[A-Z]/.test(password)) activeCategories++;
    if (/[0-9]/.test(password)) activeCategories++;
    if (/[^A-Za-z0-9]/.test(password)) activeCategories++;

    score += Math.floor(activeCategories / 2);

    if (score <= 1) {
      setStrength({ label: "Very Weak", score: 1, color: "bg-red-500", textColor: "text-red-500" });
    } else if (score === 2) {
      setStrength({ label: "Weak", score: 2, color: "bg-orange-500", textColor: "text-orange-500" });
    } else if (score === 3) {
      setStrength({ label: "Medium", score: 3, color: "bg-yellow-500", textColor: "text-yellow-500" });
    } else if (score === 4) {
      setStrength({ label: "Strong", score: 4, color: "bg-green-500", textColor: "text-green-500" });
    } else {
      setStrength({ label: "Very Strong", score: 5, color: "bg-emerald-500", textColor: "text-emerald-500" });
    }
  }, [password]);

  // Generate once on mount
  useEffect(() => {
    generatePassword();
  }, [generatePassword]);

  const handleCopy = async () => {
    if (!password) return;
    try {
      await navigator.clipboard.writeText(password);
      setCopied(true);
      toast.success("Password copied to clipboard!", { icon: "🔑" });
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.error(e);
      toast.error("Failed to copy password");
    }
  };

  return (
    <div className="max-w-xl mx-auto space-y-6">
      {/* Output screen */}
      <div className="relative flex items-center justify-between p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 shadow-inner">
        <span className="font-mono text-lg sm:text-xl font-bold tracking-wider break-all text-zinc-800 dark:text-zinc-100 pr-12">
          {password || "Select at least one checkbox"}
        </span>
        <div className="absolute right-3 flex items-center space-x-1">
          <button
            onClick={generatePassword}
            className="p-2 rounded-lg text-zinc-500 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
            title="Generate new password"
          >
            <RotateCw className="w-5 h-5" />
          </button>
          <button
            disabled={!password}
            onClick={handleCopy}
            className="p-2 rounded-lg text-zinc-500 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors disabled:opacity-50 cursor-pointer w-9 h-9 flex items-center justify-center"
            title="Copy password"
          >
            {copied ? <Check className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Strength indicator */}
      {password && (
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold">
            <span className="text-zinc-500 dark:text-zinc-400">Password Strength:</span>
            <span className={strength.textColor}>{strength.label}</span>
          </div>
          <div className="flex space-x-1 h-2">
            {[1, 2, 3, 4, 5].map((level) => (
              <div
                key={level}
                className={`flex-1 rounded-full transition-all duration-300 ${
                  level <= strength.score ? strength.color : "bg-zinc-200 dark:bg-zinc-800"
                }`}
              />
            ))}
          </div>
        </div>
      )}

      {/* Controls Card */}
      <div className="p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/20 space-y-6">
        {/* Slider */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <label className="font-semibold text-zinc-700 dark:text-zinc-300">Password Length</label>
            <span className="font-mono font-bold text-indigo-650 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40 px-2 py-0.5 rounded text-xs">
              {length} characters
            </span>
          </div>
          <input
            type="range"
            min={6}
            max={64}
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            className="w-full h-2 rounded-lg bg-zinc-200 dark:bg-zinc-800 appearance-none cursor-pointer accent-indigo-600 dark:accent-indigo-500"
          />
        </div>

        {/* Checkboxes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="checkbox"
              checked={includeUppercase}
              onChange={(e) => setIncludeUppercase(e.target.checked)}
              className="w-4.5 h-4.5 rounded text-indigo-600 border-zinc-300 dark:border-zinc-700 focus:ring-indigo-500"
            />
            <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Uppercase (A-Z)</span>
          </label>
          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="checkbox"
              checked={includeLowercase}
              onChange={(e) => setIncludeLowercase(e.target.checked)}
              className="w-4.5 h-4.5 rounded text-indigo-600 border-zinc-300 dark:border-zinc-700 focus:ring-indigo-500"
            />
            <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Lowercase (a-z)</span>
          </label>
          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="checkbox"
              checked={includeNumbers}
              onChange={(e) => setIncludeNumbers(e.target.checked)}
              className="w-4.5 h-4.5 rounded text-indigo-600 border-zinc-300 dark:border-zinc-700 focus:ring-indigo-500"
            />
            <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Numbers (0-9)</span>
          </label>
          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="checkbox"
              checked={includeSymbols}
              onChange={(e) => setIncludeSymbols(e.target.checked)}
              className="w-4.5 h-4.5 rounded text-indigo-600 border-zinc-300 dark:border-zinc-700 focus:ring-indigo-500"
            />
            <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Symbols (!@#$...)</span>
          </label>
        </div>

        {/* Readability & Safety settings */}
        <div className="pt-4 border-t border-zinc-150 dark:border-zinc-800 space-y-4">
          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="checkbox"
              checked={excludeSimilar}
              onChange={(e) => setExcludeSimilar(e.target.checked)}
              className="w-4.5 h-4.5 rounded text-indigo-600 border-zinc-300 dark:border-zinc-700 focus:ring-indigo-500"
            />
            <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Exclude similar characters (e.g., <code className="bg-zinc-100 dark:bg-zinc-800 px-1 py-0.5 rounded text-xs font-mono">i, l, 1, L, o, 0</code>)
            </span>
          </label>

          {/* Advice Banner */}
          <div className="flex items-start space-x-2.5 p-3 rounded-lg bg-indigo-50 dark:bg-indigo-950/20 text-indigo-800 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-900/30 text-xs leading-relaxed">
            <Shield className="w-4 h-4 flex-shrink-0 mt-0.5" />
            <p>
              <strong>Security Recommendation:</strong> Use passwords of at least 14 characters with letters, numbers, and symbols to ensure maximum defense against brute-force attacks.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
