"use client";

import React, { useState, useRef, useEffect } from "react";
import { Download, Upload, Trash2, Image as ImageIcon, Sparkles, AlertCircle } from "lucide-react";

export default function SvgToPngConverter() {
  const [svgInput, setSvgInput] = useState("");
  const [width, setWidth] = useState<number>(512);
  const [height, setHeight] = useState<number>(512);
  const [bgColor, setBgColor] = useState<string>("transparent");
  const [customBg, setCustomBg] = useState<string>("#FFFFFF");
  const [error, setError] = useState<string | null>(null);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const sampleSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200">
  <circle cx="100" cy="100" r="80" fill="#3B82F6" />
  <polygon points="100,40 120,80 160,80 130,110 140,150 100,125 60,150 70,110 40,80 80,80" fill="#FFFFFF" />
</svg>`;

  const renderSvgToCanvas = (svgStr: string) => {
    if (!svgStr.trim()) {
      setError(null);
      return;
    }

    try {
      const blob = new Blob([svgStr], { type: "image/svg+xml;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const img = new Image();

      img.onload = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        ctx.clearRect(0, 0, width, height);

        if (bgColor !== "transparent") {
          ctx.fillStyle = bgColor === "custom" ? customBg : bgColor;
          ctx.fillRect(0, 0, width, height);
        }

        ctx.drawImage(img, 0, 0, width, height);
        URL.revokeObjectURL(url);
        setError(null);
      };

      img.onerror = () => {
        setError("Failed to render SVG image into canvas. Please check SVG syntax.");
        URL.revokeObjectURL(url);
      };

      img.src = url;
    } catch (err: any) {
      setError(err.message || "Failed to process SVG");
    }
  };

  useEffect(() => {
    renderSvgToCanvas(svgInput);
  }, [svgInput, width, height, bgColor, customBg]);

  const handleFileUpload = (file: File) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      setSvgInput(text);
    };
    reader.readAsText(file);
  };

  const handleDownload = (format: "png" | "webp") => {
    const canvas = canvasRef.current;
    if (!canvas || !svgInput) return;
    const dataUrl = canvas.toDataURL(`image/${format}`);
    const a = document.createElement("a");
    a.href = dataUrl;
    a.download = `rendered-svg-${width}x${height}.${format}`;
    a.click();
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-xl">
              <ImageIcon className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">SVG to PNG Converter</h1>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">Render SVG vectors onto canvas and export high-res PNG / WebP images</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => {
                setSvgInput(sampleSvg);
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 rounded-lg transition"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Load Sample
            </button>
            <button
              onClick={() => {
                setSvgInput("");
                setError(null);
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-zinc-100 dark:bg-zinc-800 hover:bg-red-500/10 hover:text-red-600 text-zinc-700 dark:text-zinc-300 rounded-lg transition"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Clear
            </button>
          </div>
        </div>

        {/* Export Controls Bar */}
        <div className="mt-6 pt-4 border-t border-zinc-100 dark:border-zinc-800/80 flex flex-wrap items-center justify-between gap-6">
          <div className="flex flex-wrap items-center gap-4 text-sm text-zinc-700 dark:text-zinc-300">
            <div className="flex items-center gap-2">
              <label className="font-medium">Dimensions:</label>
              <input
                type="number"
                value={width}
                onChange={(e) => setWidth(Number(e.target.value))}
                className="w-20 px-2 py-1 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg font-mono text-xs text-center"
              />
              <span>×</span>
              <input
                type="number"
                value={height}
                onChange={(e) => setHeight(Number(e.target.value))}
                className="w-20 px-2 py-1 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg font-mono text-xs text-center"
              />
              <span className="text-xs text-zinc-400">px</span>
            </div>

            <div className="flex items-center gap-2">
              <label className="font-medium">Background:</label>
              <select
                value={bgColor}
                onChange={(e) => setBgColor(e.target.value)}
                className="px-3 py-1 text-sm bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg text-zinc-900 dark:text-zinc-100"
              >
                <option value="transparent">Transparent</option>
                <option value="#ffffff">White</option>
                <option value="#000000">Black</option>
                <option value="custom">Custom Color</option>
              </select>

              {bgColor === "custom" && (
                <input
                  type="color"
                  value={customBg}
                  onChange={(e) => setCustomBg(e.target.value)}
                  className="w-8 h-8 rounded-lg border-0 bg-transparent cursor-pointer p-0"
                />
              )}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => handleDownload("png")}
              disabled={!svgInput}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white rounded-xl shadow-xs transition"
            >
              <Download className="w-4 h-4" />
              Download PNG
            </button>
            <button
              onClick={() => handleDownload("webp")}
              disabled={!svgInput}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold bg-zinc-800 hover:bg-zinc-700 disabled:opacity-40 text-white rounded-xl shadow-xs transition"
            >
              <Download className="w-4 h-4" />
              Download WebP
            </button>
          </div>
        </div>
      </div>

      {error && (
        <div className="flex items-center gap-2 p-4 bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 rounded-xl text-sm font-medium">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* SVG Input */}
        <div className="flex flex-col space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">SVG Code or File</label>
            <label className="inline-flex items-center gap-1 text-xs text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer">
              <Upload className="w-3.5 h-3.5" />
              <span>Upload .svg file</span>
              <input
                type="file"
                accept=".svg,image/svg+xml"
                className="hidden"
                onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0])}
              />
            </label>
          </div>
          <textarea
            value={svgInput}
            onChange={(e) => setSvgInput(e.target.value)}
            placeholder="Paste <svg>...</svg> markup here..."
            className="w-full h-96 p-4 font-mono text-sm bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-zinc-900 dark:text-zinc-100 resize-none shadow-sm"
          />
        </div>

        {/* Canvas Preview */}
        <div className="flex flex-col space-y-2">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Canvas Render Preview</label>
          <div className="w-full h-96 p-4 bg-zinc-100 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl flex items-center justify-center overflow-auto shadow-inner">
            <canvas ref={canvasRef} className="max-w-full max-h-full rounded-lg shadow-sm border border-zinc-200 dark:border-zinc-800/50" />
          </div>
        </div>
      </div>
    </div>
  );
}
