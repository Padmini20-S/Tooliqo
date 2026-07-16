"use client";

import React, { useState, useRef } from "react";
import QRCode from "react-qr-code";
import { Download, Sparkles, Image as ImageIcon, Code } from "lucide-react";

export default function QrCodeGenerator() {
  const [value, setValue] = useState("https://tooliqo.com");
  const [size, setSize] = useState(256);
  const [fgColor, setFgColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [level, setLevel] = useState<"L" | "M" | "Q" | "H">("M");
  const qrRef = useRef<HTMLDivElement>(null);

  const downloadSvg = () => {
    if (!qrRef.current) return;
    const svgEl = qrRef.current.querySelector("svg");
    if (!svgEl) return;

    const svgString = new XMLSerializer().serializeToString(svgEl);
    const svgBlob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });
    const svgUrl = URL.createObjectURL(svgBlob);

    const downloadLink = document.createElement("a");
    downloadLink.href = svgUrl;
    downloadLink.download = "qrcode.svg";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
    URL.revokeObjectURL(svgUrl);
  };

  const downloadPng = () => {
    if (!qrRef.current) return;
    const svgEl = qrRef.current.querySelector("svg");
    if (!svgEl) return;

    const svgString = new XMLSerializer().serializeToString(svgEl);
    const svgBlob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });
    const svgUrl = URL.createObjectURL(svgBlob);

    const image = new Image();
    image.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = size;
      canvas.height = size;
      const context = canvas.getContext("2d");
      if (context) {
        context.drawImage(image, 0, 0, size, size);
        const pngUrl = canvas.toDataURL("image/png");
        const downloadLink = document.createElement("a");
        downloadLink.href = pngUrl;
        downloadLink.download = "qrcode.png";
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
      }
      URL.revokeObjectURL(svgUrl);
    };
    image.src = svgUrl;
  };

  return (
    <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-8 items-stretch">
      {/* Configuration Panel */}
      <div className="flex-1 p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/20 space-y-6">
        <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider">
          Configure QR Code
        </h3>

        {/* Input content */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">QR Code Content</label>
          <input
            type="text"
            placeholder="Enter text or URL to encode..."
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="w-full p-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-zinc-800 dark:text-zinc-150 text-sm outline-none focus:border-indigo-500 transition-colors"
          />
        </div>

        {/* Color selectors */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Foreground Color</label>
            <div className="flex items-center space-x-2">
              <input
                type="color"
                value={fgColor}
                onChange={(e) => setFgColor(e.target.value)}
                className="w-10 h-10 border-0 rounded cursor-pointer"
              />
              <span className="text-xs font-mono text-zinc-500 dark:text-zinc-400 uppercase">{fgColor}</span>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Background Color</label>
            <div className="flex items-center space-x-2">
              <input
                type="color"
                value={bgColor}
                onChange={(e) => setBgColor(e.target.value)}
                className="w-10 h-10 border-0 rounded cursor-pointer"
              />
              <span className="text-xs font-mono text-zinc-500 dark:text-zinc-400 uppercase">{bgColor}</span>
            </div>
          </div>
        </div>

        {/* Size Slider */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <label className="font-semibold text-zinc-700 dark:text-zinc-300">Size (Resolution)</label>
            <span className="font-mono text-xs text-indigo-650 dark:text-indigo-400 font-bold bg-indigo-50 dark:bg-indigo-950/30 px-2 py-0.5 rounded">
              {size}x{size} px
            </span>
          </div>
          <input
            type="range"
            min={128}
            max={512}
            step={32}
            value={size}
            onChange={(e) => setSize(Number(e.target.value))}
            className="w-full h-2 rounded-lg bg-zinc-200 dark:bg-zinc-800 appearance-none cursor-pointer accent-indigo-600 dark:accent-indigo-500"
          />
        </div>

        {/* Error Correction Level */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 block">Error Correction Level</label>
          <div className="grid grid-cols-4 gap-2 bg-zinc-50 dark:bg-zinc-900 p-1 rounded-lg border border-zinc-200 dark:border-zinc-800">
            {(["L", "M", "Q", "H"] as const).map((lvl) => (
              <button
                key={lvl}
                onClick={() => setLevel(lvl)}
                className={`py-1.5 text-xs font-bold rounded-md transition-all cursor-pointer ${
                  level === lvl
                    ? "bg-white dark:bg-zinc-850 text-indigo-600 dark:text-indigo-400 shadow-sm"
                    : "text-zinc-500 hover:text-zinc-950 dark:hover:text-white"
                }`}
              >
                {lvl}
              </button>
            ))}
          </div>
          <p className="text-[10px] text-zinc-400 dark:text-zinc-500 leading-relaxed">
            {level === "L" && "Low (~7% recovery) - Best for simple URLs."}
            {level === "M" && "Medium (~15% recovery) - Standard selection."}
            {level === "Q" && "Quartile (~25% recovery) - Good for dirty surfaces."}
            {level === "H" && "High (~30% recovery) - Maximum redundancy (ideal for print)."}
          </p>
        </div>
      </div>

      {/* Visual Live Preview Panel */}
      <div className="flex-1 flex flex-col items-center justify-between p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50">
        <h3 className="text-sm font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-4">
          Preview
        </h3>

        {/* The QR Container */}
        <div
          ref={qrRef}
          style={{ backgroundColor: bgColor }}
          className="p-6 rounded-2xl shadow-lg border border-zinc-200/50 dark:border-zinc-800 flex items-center justify-center aspect-square max-w-[280px] w-full"
        >
          {value ? (
            <QRCode
              value={value}
              size={size}
              bgColor={bgColor}
              fgColor={fgColor}
              level={level}
              style={{ height: "auto", maxWidth: "100%", width: "100%" }}
            />
          ) : (
            <div className="text-center p-4">
              <p className="text-sm text-zinc-400 dark:text-zinc-500">Provide input value to render QR code.</p>
            </div>
          )}
        </div>

        {/* Downloads */}
        <div className="w-full flex space-x-3 mt-6">
          <button
            disabled={!value}
            onClick={downloadPng}
            className="flex-1 py-2.5 px-4 rounded-xl bg-gradient-to-r from-indigo-650 to-indigo-750 hover:from-indigo-600 hover:to-indigo-700 text-white font-semibold text-sm shadow-md transition-all duration-200 hover:-translate-y-0.5 flex items-center justify-center space-x-1.5 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            <ImageIcon className="w-4 h-4" />
            <span>Download PNG</span>
          </button>
          <button
            disabled={!value}
            onClick={downloadSvg}
            className="flex-1 py-2.5 px-4 rounded-xl border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900 font-semibold text-sm transition-colors flex items-center justify-center space-x-1.5 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            <Code className="w-4 h-4" />
            <span>Download SVG</span>
          </button>
        </div>
      </div>
    </div>
  );
}
