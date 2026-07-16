"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Lock, Unlock, RefreshCw, Copy, Check, Eye } from "lucide-react";

interface ColorItem {
  hex: string;
  locked: boolean;
}

export default function ColorPalette() {
  const [colors, setColors] = useState<ColorItem[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [copiedFormat, setCopiedFormat] = useState(false);
  const [exportFormat, setExportFormat] = useState<"css" | "json" | "tailwind">("css");

  // Helper to generate a random hex color
  const generateRandomHex = (): string => {
    const chars = "0123456789abcdef";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += chars[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const generatePalette = useCallback(() => {
    setColors((prevColors) => {
      if (prevColors.length === 0) {
        // First generation: create 5 random colors
        return Array.from({ length: 5 }, () => ({
          hex: generateRandomHex(),
          locked: false,
        }));
      }
      // Re-generate only unlocked colors
      return prevColors.map((color) =>
        color.locked ? color : { ...color, hex: generateRandomHex() }
      );
    });
  }, []);

  // Generate initial palette
  useEffect(() => {
    generatePalette();
  }, [generatePalette]);

  // Support Space key to regenerate
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space" && e.target === document.body) {
        e.preventDefault();
        generatePalette();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [generatePalette]);

  const toggleLock = (index: number) => {
    setColors((prev) =>
      prev.map((c, i) => (i === index ? { ...c, locked: !c.locked } : c))
    );
  };

  const handleColorChange = (index: number, newHex: string) => {
    setColors((prev) =>
      prev.map((c, i) => (i === index ? { ...c, hex: newHex } : c))
    );
  };

  const copyColor = async (hex: string, index: number) => {
    try {
      await navigator.clipboard.writeText(hex);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (e) {
      console.error(e);
    }
  };

  const getExportString = (): string => {
    if (exportFormat === "css") {
      return `:root {\n${colors
        .map((c, i) => `  --color-palette-${i + 1}: ${c.hex};`)
        .join("\n")}\n}`;
    } else if (exportFormat === "json") {
      return JSON.stringify(
        colors.map((c) => c.hex),
        null,
        2
      );
    } else {
      return `colors: {\n${colors
        .map((c, i) => `  palette${i + 1}: "${c.hex}",`)
        .join("\n")}\n}`;
    }
  };

  const copyExportString = async () => {
    try {
      await navigator.clipboard.writeText(getExportString());
      setCopiedFormat(true);
      setTimeout(() => setCopiedFormat(false), 2000);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="space-y-8">
      {/* Top Banner instruction */}
      <div className="text-center p-3 rounded-xl bg-indigo-50 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-900/30 text-xs text-indigo-700 dark:text-indigo-400 font-semibold">
        Tip: Press the <span className="font-bold bg-white dark:bg-zinc-800 px-1.5 py-0.5 rounded border shadow-sm">Spacebar</span> anywhere on this page to quickly generate a new palette!
      </div>

      {/* Palette Colors Row */}
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 h-[320px]">
        {colors.map((color, index) => {
          // Check color brightness to adapt text readability (dark text on light, light text on dark)
          const r = parseInt(color.hex.slice(1, 3), 16);
          const g = parseInt(color.hex.slice(3, 5), 16);
          const b = parseInt(color.hex.slice(5, 7), 16);
          const yiq = (r * 299 + g * 587 + b * 114) / 1000;
          const isLight = yiq >= 128;

          const textClass = isLight ? "text-zinc-800" : "text-white";
          const borderClass = isLight ? "border-zinc-300/30" : "border-white/10";
          const iconHover = isLight ? "hover:bg-zinc-800/10" : "hover:bg-white/10";

          return (
            <div
              key={index}
              style={{ backgroundColor: color.hex }}
              className="relative flex flex-col justify-between p-5 rounded-2xl border border-zinc-200/20 shadow-lg group transition-all duration-300 transform"
            >
              {/* Color picker overlay */}
              <input
                type="color"
                value={color.hex}
                onChange={(e) => handleColorChange(index, e.target.value)}
                className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                title="Change Color"
              />

              {/* Top controls (Lock/Unlock) */}
              <div className="flex justify-end z-10">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleLock(index);
                  }}
                  className={`p-2 rounded-xl border ${borderClass} ${iconHover} transition-all cursor-pointer`}
                  title={color.locked ? "Unlock Color" : "Lock Color"}
                >
                  {color.locked ? (
                    <Lock className={`w-4 h-4 ${textClass}`} />
                  ) : (
                    <Unlock className={`w-4 h-4 ${textClass} opacity-60 group-hover:opacity-100`} />
                  )}
                </button>
              </div>

              {/* Bottom values */}
              <div className="space-y-1.5 z-10 pointer-events-none">
                <span className={`block text-[10px] font-bold font-mono tracking-wider opacity-60 uppercase ${textClass}`}>
                  Color {index + 1}
                </span>
                <div className="flex items-center justify-between">
                  <span className={`text-base font-bold font-mono tracking-tight uppercase ${textClass}`}>
                    {color.hex}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      copyColor(color.hex, index);
                    }}
                    className={`p-1.5 rounded-lg border pointer-events-auto ${borderClass} ${iconHover} transition-all cursor-pointer`}
                    title="Copy Color Hex"
                  >
                    {copiedIndex === index ? (
                      <Check className="w-3.5 h-3.5 text-green-500" />
                    ) : (
                      <Copy className={`w-3.5 h-3.5 ${textClass}`} />
                    )}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer controls & Export */}
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:w-48 flex flex-col justify-center">
          <button
            onClick={generatePalette}
            className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-sm shadow-lg shadow-indigo-500/20 transition-all duration-200 hover:-translate-y-0.5 flex items-center justify-center space-x-2 cursor-pointer animate-pulse"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Generate New</span>
          </button>
        </div>

        {/* Export Formats Panel */}
        <div className="flex-1 p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/20 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h4 className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider">
              Export Configurations
            </h4>
            <div className="flex items-center rounded-lg border border-zinc-200 dark:border-zinc-800 p-0.5 bg-zinc-50 dark:bg-zinc-900">
              {(["css", "json", "tailwind"] as const).map((fmt) => (
                <button
                  key={fmt}
                  onClick={() => setExportFormat(fmt)}
                  className={`px-3 py-1 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                    exportFormat === fmt
                      ? "bg-white dark:bg-zinc-800 text-indigo-650 dark:text-indigo-400 shadow-sm"
                      : "text-zinc-500 hover:text-zinc-950 dark:hover:text-white"
                  }`}
                >
                  {fmt.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          <div className="relative">
            <textarea
              readOnly
              value={getExportString()}
              className="w-full h-24 p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 font-mono text-xs outline-none"
            />
            <button
              onClick={copyExportString}
              className="absolute right-3.5 bottom-3.5 text-xs px-2.5 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 text-zinc-650 dark:text-zinc-400 bg-white dark:bg-zinc-850 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-all cursor-pointer flex items-center space-x-1 w-[76px]"
            >
              {copiedFormat ? <Check className="w-3 h-3 text-green-500" /> : <Copy className="w-3 h-3" />}
              <span>{copiedFormat ? "Copied!" : "Copy"}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
