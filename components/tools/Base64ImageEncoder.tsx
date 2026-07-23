"use client";

import React, { useState } from "react";
import { Upload, Copy, Check, Trash2, Image as ImageIcon, Sparkles } from "lucide-react";

export default function Base64ImageEncoder() {
  const [dataUri, setDataUri] = useState("");
  const [fileInfo, setFileInfo] = useState<{
    name: string;
    type: string;
    size: number;
    width?: number;
    height?: number;
  } | null>(null);
  const [copiedType, setCopiedType] = useState<string | null>(null);

  const handleFileUpload = (file: File) => {
    if (!file || !file.type.startsWith("image/")) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setDataUri(result);

      // Measure dimensions
      const img = new Image();
      img.onload = () => {
        setFileInfo({
          name: file.name,
          type: file.type,
          size: file.size,
          width: img.width,
          height: img.height
        });
      };
      img.src = result;
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleCopy = async (text: string, typeKey: string) => {
    if (!text) return;
    await navigator.clipboard.writeText(text);
    setCopiedType(typeKey);
    setTimeout(() => setCopiedType(null), 2000);
  };

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const rawBase64 = dataUri ? dataUri.split(",")[1] || "" : "";
  const htmlTag = dataUri ? `<img src="${dataUri}" alt="Image" />` : "";
  const cssDecl = dataUri ? `background-image: url('${dataUri}');` : "";

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-pink-500/10 text-pink-600 dark:text-pink-400 rounded-xl">
              <ImageIcon className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">Base64 Image Encoder</h1>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">Convert image files to Data URIs for inline embedding</p>
            </div>
          </div>

          {dataUri && (
            <button
              onClick={() => {
                setDataUri("");
                setFileInfo(null);
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-zinc-100 dark:bg-zinc-800 hover:bg-red-500/10 hover:text-red-600 text-zinc-700 dark:text-zinc-300 rounded-lg transition"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Clear Image
            </button>
          )}
        </div>
      </div>

      {/* File Upload Drop Zone */}
      {!dataUri ? (
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          className="border-2 border-dashed border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-900 rounded-2xl p-12 text-center hover:border-pink-500/50 transition cursor-pointer flex flex-col items-center justify-center space-y-4"
        >
          <div className="p-4 bg-pink-500/10 text-pink-600 rounded-full">
            <Upload className="w-8 h-8" />
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
              Drag & Drop Image File Here
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Supports PNG, JPG, SVG, WebP, GIF (Max size recommended &lt; 5MB)
            </p>
          </div>
          <label className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold bg-pink-600 hover:bg-pink-700 text-white rounded-xl shadow-xs transition cursor-pointer">
            <span>Browse Computer</span>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0])}
            />
          </label>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Image Preview & Details Card */}
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm space-y-4 flex flex-col items-center justify-center">
            <div className="relative max-h-56 w-full flex items-center justify-center bg-zinc-100 dark:bg-zinc-950 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden">
              {/* Checkerboard background pattern */}
              <img src={dataUri} alt="Preview" className="max-h-48 max-w-full object-contain rounded-lg shadow-sm" />
            </div>

            {fileInfo && (
              <div className="w-full space-y-2 text-xs text-zinc-600 dark:text-zinc-400 pt-2 border-t border-zinc-100 dark:border-zinc-800">
                <div className="flex justify-between">
                  <span className="font-medium text-zinc-500">File Name:</span>
                  <span className="font-mono text-zinc-900 dark:text-zinc-100 truncate max-w-[160px]">{fileInfo.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-zinc-500">Dimensions:</span>
                  <span className="font-mono text-zinc-900 dark:text-zinc-100">{fileInfo.width} × {fileInfo.height} px</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-zinc-500">Original Size:</span>
                  <span className="font-mono text-zinc-900 dark:text-zinc-100">{formatBytes(fileInfo.size)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-zinc-500">Base64 Length:</span>
                  <span className="font-mono text-zinc-900 dark:text-zinc-100">{rawBase64.length.toLocaleString()} chars</span>
                </div>
              </div>
            )}
          </div>

          {/* Copy Controls Grid */}
          <div className="md:col-span-2 space-y-4">
            {/* Full Data URI */}
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 shadow-sm space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Data URI (data:image/...;base64)</span>
                <button
                  onClick={() => handleCopy(dataUri, "uri")}
                  className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 rounded-lg transition"
                >
                  {copiedType === "uri" ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
                  {copiedType === "uri" ? "Copied!" : "Copy Data URI"}
                </button>
              </div>
              <textarea
                readOnly
                value={dataUri}
                className="w-full h-20 p-3 font-mono text-xs bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-zinc-800 dark:text-zinc-200 resize-none"
              />
            </div>

            {/* HTML Image Tag */}
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 shadow-sm space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">HTML &lt;img&gt; Tag</span>
                <button
                  onClick={() => handleCopy(htmlTag, "html")}
                  className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 rounded-lg transition"
                >
                  {copiedType === "html" ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
                  {copiedType === "html" ? "Copied!" : "Copy HTML"}
                </button>
              </div>
              <textarea
                readOnly
                value={htmlTag}
                className="w-full h-16 p-3 font-mono text-xs bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-zinc-800 dark:text-zinc-200 resize-none"
              />
            </div>

            {/* CSS Background Image */}
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 shadow-sm space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">CSS background-image</span>
                <button
                  onClick={() => handleCopy(cssDecl, "css")}
                  className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 rounded-lg transition"
                >
                  {copiedType === "css" ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
                  {copiedType === "css" ? "Copied!" : "Copy CSS"}
                </button>
              </div>
              <textarea
                readOnly
                value={cssDecl}
                className="w-full h-16 p-3 font-mono text-xs bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-zinc-800 dark:text-zinc-200 resize-none"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
