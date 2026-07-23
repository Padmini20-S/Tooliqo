"use client";

import React, { useState } from "react";
import { Copy, Check, Palette, Sparkles } from "lucide-react";

export default function HexToRgb() {
  const [hexInput, setHexInput] = useState("#3B82F6");
  const [colorPicker, setColorPicker] = useState("#3b82f6");
  const [alpha, setAlpha] = useState<number>(1);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const hexToRgbValues = (hex: string) => {
    let clean = hex.trim().replace(/^#/, "");
    if (clean.length === 3) {
      clean = clean.split("").map((c) => c + c).join("");
    }
    if (clean.length === 6 || clean.length === 8) {
      const r = parseInt(clean.substring(0, 2), 16);
      const g = parseInt(clean.substring(2, 4), 16);
      const b = parseInt(clean.substring(4, 6), 16);
      let a = alpha;
      if (clean.length === 8) {
        a = parseFloat((parseInt(clean.substring(6, 8), 16) / 255).toFixed(2));
      }
      if (!isNaN(r) && !isNaN(g) && !isNaN(b)) {
        return { r, g, b, a };
      }
    }
    return null;
  };

  const rgbToHsl = (r: number, g: number, b: number) => {
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h = 0, s = 0, l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }
    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100)
    };
  };

  const rgb = hexToRgbValues(hexInput) || { r: 59, g: 130, b: 246, a: 1 };
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);

  const rgbStr = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
  const rgbaStr = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${rgb.a})`;
  const hslStr = `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;
  const hslaStr = `hsla(${hsl.h}, ${hsl.s}%, ${hsl.l}%, ${rgb.a})`;

  const sampleColors = [
    { label: "Blue", hex: "#3B82F6" },
    { label: "Emerald", hex: "#10B981" },
    { label: "Purple", hex: "#8B5CF6" },
    { label: "Rose", hex: "#F43F5E" },
    { label: "Amber", hex: "#F59E0B text-amber-500" },
    { label: "Dark", hex: "#18181B" }
  ];

  const handleCopy = async (val: string, key: string) => {
    await navigator.clipboard.writeText(val);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-xl">
              <Palette className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">HEX to RGB Color Converter</h1>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">Convert HEX color codes to RGB, RGBA, and HSL formats with color preview</p>
            </div>
          </div>
        </div>

        {/* Presets */}
        <div className="mt-6 pt-4 border-t border-zinc-100 dark:border-zinc-800/80">
          <label className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-2 block">Color Presets</label>
          <div className="flex flex-wrap gap-2">
            {sampleColors.map((c, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setHexInput(c.hex.split(" ")[0]);
                  setColorPicker(c.hex.split(" ")[0]);
                }}
                className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-medium bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 rounded-xl transition"
              >
                <span className="w-3.5 h-3.5 rounded-full border border-white/20 shadow-xs" style={{ backgroundColor: c.hex.split(" ")[0] }} />
                {c.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Interactive Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Input & Color Picker */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">HEX Color Code</label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={colorPicker}
                onChange={(e) => {
                  setColorPicker(e.target.value);
                  setHexInput(e.target.value.toUpperCase());
                }}
                className="w-12 h-12 rounded-xl cursor-pointer border-0 bg-transparent p-0"
              />
              <input
                type="text"
                value={hexInput}
                onChange={(e) => {
                  const val = e.target.value;
                  setHexInput(val);
                  if (/^#[0-9A-F]{6}$/i.test(val)) {
                    setColorPicker(val);
                  }
                }}
                placeholder="#3B82F6"
                className="flex-1 px-4 py-2.5 font-mono text-base bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="font-medium text-zinc-700 dark:text-zinc-300">Alpha / Opacity:</span>
              <span className="font-mono text-zinc-500">{alpha}</span>
            </div>
            <input
              type="range"
              min={0}
              max={1}
              step={0.05}
              value={alpha}
              onChange={(e) => setAlpha(parseFloat(e.target.value))}
              className="w-full accent-blue-600"
            />
          </div>

          {/* Color Preview Swatch */}
          <div className="space-y-2">
            <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider block">Preview Swatch</span>
            <div
              className="h-32 w-full rounded-2xl shadow-inner border border-zinc-200 dark:border-zinc-800 flex items-center justify-center p-4 transition-all"
              style={{ backgroundColor: rgbaStr }}
            >
              <div className="bg-black/40 backdrop-blur-md px-4 py-2 rounded-xl text-white font-mono text-xs font-bold shadow-md">
                {rgbaStr}
              </div>
            </div>
          </div>
        </div>

        {/* Converted Formats List */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm space-y-4">
          <h2 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 border-b border-zinc-100 dark:border-zinc-800 pb-3">
            Converted Values
          </h2>

          {/* RGB */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-800">
            <div className="space-y-0.5">
              <span className="text-xs text-zinc-400 uppercase font-semibold">RGB</span>
              <div className="font-mono text-sm font-bold text-zinc-900 dark:text-zinc-100">{rgbStr}</div>
            </div>
            <button
              onClick={() => handleCopy(rgbStr, "rgb")}
              className="p-2 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 rounded-lg hover:bg-zinc-200/50 dark:hover:bg-zinc-700 transition"
            >
              {copiedKey === "rgb" ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>

          {/* RGBA */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-800">
            <div className="space-y-0.5">
              <span className="text-xs text-zinc-400 uppercase font-semibold">RGBA</span>
              <div className="font-mono text-sm font-bold text-zinc-900 dark:text-zinc-100">{rgbaStr}</div>
            </div>
            <button
              onClick={() => handleCopy(rgbaStr, "rgba")}
              className="p-2 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 rounded-lg hover:bg-zinc-200/50 dark:hover:bg-zinc-700 transition"
            >
              {copiedKey === "rgba" ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>

          {/* HSL */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-800">
            <div className="space-y-0.5">
              <span className="text-xs text-zinc-400 uppercase font-semibold">HSL</span>
              <div className="font-mono text-sm font-bold text-zinc-900 dark:text-zinc-100">{hslStr}</div>
            </div>
            <button
              onClick={() => handleCopy(hslStr, "hsl")}
              className="p-2 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 rounded-lg hover:bg-zinc-200/50 dark:hover:bg-zinc-700 transition"
            >
              {copiedKey === "hsl" ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>

          {/* HSLA */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-800">
            <div className="space-y-0.5">
              <span className="text-xs text-zinc-400 uppercase font-semibold">HSLA</span>
              <div className="font-mono text-sm font-bold text-zinc-900 dark:text-zinc-100">{hslaStr}</div>
            </div>
            <button
              onClick={() => handleCopy(hslaStr, "hsla")}
              className="p-2 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 rounded-lg hover:bg-zinc-200/50 dark:hover:bg-zinc-700 transition"
            >
              {copiedKey === "hsla" ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

