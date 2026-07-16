"use client";

import React, { useState } from "react";
import { Plus, Trash2, Copy, Check, Sparkles } from "lucide-react";

interface ColorStop {
  color: string;
  position: number;
}

export default function CssGradient() {
  const [type, setType] = useState<"linear" | "radial">("linear");
  const [angle, setAngle] = useState(135);
  const [stops, setStops] = useState<ColorStop[]>([
    { color: "#6366f1", position: 0 },
    { color: "#ec4899", position: 100 },
  ]);
  const [copied, setCopied] = useState(false);

  const getGradientCss = (): string => {
    // Sort stops by position to compile valid gradients
    const sortedStops = [...stops].sort((a, b) => a.position - b.position);
    const stopsStr = sortedStops.map((s) => `${s.color} ${s.position}%`).join(", ");

    if (type === "linear") {
      return `linear-gradient(${angle}deg, ${stopsStr})`;
    } else {
      return `radial-gradient(circle, ${stopsStr})`;
    }
  };

  const handleCopy = async () => {
    try {
      const cssString = `background: ${getGradientCss()};`;
      await navigator.clipboard.writeText(cssString);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.error(e);
    }
  };

  const handleStopColorChange = (index: number, color: string) => {
    setStops((prev) =>
      prev.map((stop, i) => (i === index ? { ...stop, color } : stop))
    );
  };

  const handleStopPositionChange = (index: number, position: number) => {
    setStops((prev) =>
      prev.map((stop, i) => (i === index ? { ...stop, position } : stop))
    );
  };

  const addStop = () => {
    if (stops.length >= 5) return;
    const nextPosition = Math.min(
      100,
      Math.max(0, stops[stops.length - 1].position - 15)
    );
    setStops((prev) => [...prev, { color: "#3b82f6", position: nextPosition }]);
  };

  const removeStop = (index: number) => {
    if (stops.length <= 2) return;
    setStops((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-8 items-stretch">
      {/* Settings Column */}
      <div className="flex-1 p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/20 space-y-6">
        <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider">
          Customize Gradient
        </h3>

        {/* Gradient Type */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 block">Gradient Type</label>
          <div className="grid grid-cols-2 gap-2 bg-zinc-50 dark:bg-zinc-900 p-1 rounded-lg border border-zinc-200 dark:border-zinc-800">
            <button
              onClick={() => setType("linear")}
              className={`py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                type === "linear"
                  ? "bg-white dark:bg-zinc-850 text-indigo-650 dark:text-indigo-400 shadow-sm"
                  : "text-zinc-500 hover:text-zinc-950 dark:hover:text-white"
              }`}
            >
              Linear
            </button>
            <button
              onClick={() => setType("radial")}
              className={`py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                type === "radial"
                  ? "bg-white dark:bg-zinc-850 text-indigo-650 dark:text-indigo-400 shadow-sm"
                  : "text-zinc-500 hover:text-zinc-950 dark:hover:text-white"
              }`}
            >
              Radial
            </button>
          </div>
        </div>

        {/* Linear Angle */}
        {type === "linear" && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <label className="font-semibold text-zinc-700 dark:text-zinc-300">Angle</label>
              <span className="font-mono text-xs text-indigo-600 dark:text-indigo-400 font-bold bg-indigo-50 dark:bg-indigo-950/30 px-2 py-0.5 rounded">
                {angle}°
              </span>
            </div>
            <input
              type="range"
              min={0}
              max={360}
              value={angle}
              onChange={(e) => setAngle(Number(e.target.value))}
              className="w-full h-2 bg-zinc-200 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
          </div>
        )}

        {/* Color Stops Controls */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Color Stops</label>
            <button
              disabled={stops.length >= 5}
              onClick={addStop}
              className="text-xs px-2.5 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 text-indigo-600 dark:text-indigo-400 hover:bg-zinc-50 dark:hover:bg-zinc-900 disabled:opacity-50 cursor-pointer flex items-center space-x-1 font-semibold"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Stop</span>
            </button>
          </div>

          <div className="space-y-3">
            {stops.map((stop, index) => (
              <div
                key={index}
                className="flex items-center space-x-3 p-3 rounded-lg border border-zinc-150 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/40"
              >
                {/* Color input */}
                <input
                  type="color"
                  value={stop.color}
                  onChange={(e) => handleStopColorChange(index, e.target.value)}
                  className="w-8 h-8 rounded border-0 cursor-pointer"
                />

                {/* Range offset */}
                <div className="flex-1 flex items-center space-x-2">
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={stop.position}
                    onChange={(e) => handleStopPositionChange(index, Number(e.target.value))}
                    className="flex-1 h-1.5 bg-zinc-200 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                  />
                  <span className="font-mono text-xs font-semibold text-zinc-500 w-8 text-right">
                    {stop.position}%
                  </span>
                </div>

                {/* Trash delete */}
                <button
                  disabled={stops.length <= 2}
                  onClick={() => removeStop(index)}
                  className="p-1 rounded text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 disabled:opacity-40 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Visual Live Preview Column */}
      <div className="flex-1 flex flex-col justify-between p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50">
        <h3 className="text-sm font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-4">
          Visual Preview
        </h3>

        {/* Visual box */}
        <div
          style={{ background: getGradientCss() }}
          className="w-full h-48 rounded-2xl shadow-inner border border-zinc-200/50 dark:border-zinc-850"
        />

        {/* Copy CSS output */}
        <div className="mt-6 space-y-3">
          <label className="text-xs font-semibold text-zinc-550 dark:text-zinc-400 block">Copy-Paste CSS Code</label>
          <div className="relative">
            <textarea
              readOnly
              value={`background: ${getGradientCss()};`}
              className="w-full h-16 p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-zinc-800 dark:text-zinc-200 font-mono text-xs outline-none"
            />
            <button
              onClick={handleCopy}
              className="absolute right-2.5 bottom-2.5 text-xs px-2.5 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 text-zinc-650 dark:text-zinc-400 bg-white dark:bg-zinc-850 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-all cursor-pointer flex items-center space-x-1 w-[76px]"
            >
              {copied ? <Check className="w-3 h-3 text-green-500" /> : <Copy className="w-3 h-3" />}
              <span>{copied ? "Copied!" : "Copy"}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
