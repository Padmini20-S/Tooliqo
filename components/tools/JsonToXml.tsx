"use client";

import React, { useState } from "react";
import { Copy, Trash2, Download, Check, AlertCircle, FileCode, Sparkles } from "lucide-react";

export default function JsonToXml() {
  const [jsonInput, setJsonInput] = useState("");
  const [xmlOutput, setXmlOutput] = useState("");
  const [rootTag, setRootTag] = useState("root");
  const [indent, setIndent] = useState(2);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const sampleJson = JSON.stringify(
    {
      user: {
        id: 101,
        name: "John Doe",
        email: "john@example.com",
        roles: ["admin", "developer"],
        active: true,
        address: {
          city: "San Francisco",
          zip: "94105"
        }
      }
    },
    null,
    2
  );

  const jsonToXmlStr = (obj: any, level = 0): string => {
    const pad = " ".repeat(level * indent);
    const newline = indent > 0 ? "\n" : "";

    if (obj === null || obj === undefined) return "";
    if (typeof obj !== "object") {
      return String(obj)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&apos;");
    }

    let result = "";
    if (Array.isArray(obj)) {
      for (const item of obj) {
        result += `${pad}<item>${newline}`;
        result += typeof item === "object" ? jsonToXmlStr(item, level + 1) : `${" ".repeat((level + 1) * indent)}${jsonToXmlStr(item, 0)}`;
        result += `${indent > 0 && typeof item === "object" ? newline + pad : ""}</item>${newline}`;
      }
      return result;
    }

    for (const key of Object.keys(obj)) {
      const validKey = key.replace(/[^a-zA-Z0-9_-]/g, "_") || "key";
      const val = obj[key];
      if (Array.isArray(val)) {
        for (const subItem of val) {
          result += `${pad}<${validKey}>${newline}`;
          result += typeof subItem === "object" ? jsonToXmlStr(subItem, level + 1) : `${jsonToXmlStr(subItem, 0)}`;
          result += `${indent > 0 && typeof subItem === "object" ? newline + pad : ""}</${validKey}>${newline}`;
        }
      } else if (typeof val === "object" && val !== null) {
        result += `${pad}<${validKey}>${newline}`;
        result += jsonToXmlStr(val, level + 1);
        result += `${newline}${pad}</${validKey}>${newline}`;
      } else {
        result += `${pad}<${validKey}>${jsonToXmlStr(val, 0)}</${validKey}>${newline}`;
      }
    }
    return result;
  };

  const handleConvert = (inputVal: string = jsonInput, tagVal: string = rootTag) => {
    if (!inputVal.trim()) {
      setXmlOutput("");
      setError(null);
      return;
    }

    try {
      const parsed = JSON.parse(inputVal);
      const cleanRoot = tagVal.trim().replace(/[^a-zA-Z0-9_-]/g, "_") || "root";
      const newline = indent > 0 ? "\n" : "";
      const body = jsonToXmlStr(parsed, indent > 0 ? 1 : 0);
      const xml = `<?xml version="1.0" encoding="UTF-8"?>${newline}<${cleanRoot}>${newline}${body}${newline}</${cleanRoot}>`;
      setXmlOutput(xml);
      setError(null);
    } catch (err: any) {
      setError(err.message || "Invalid JSON input");
      setXmlOutput("");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setJsonInput(val);
    handleConvert(val, rootTag);
  };

  const handleLoadSample = () => {
    setJsonInput(sampleJson);
    handleConvert(sampleJson, rootTag);
  };

  const handleCopy = async () => {
    if (!xmlOutput) return;
    await navigator.clipboard.writeText(xmlOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    if (!xmlOutput) return;
    const blob = new Blob([xmlOutput], { type: "application/xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "converted.xml";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-xl">
              <FileCode className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">JSON to XML Converter</h1>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">Convert JSON payload into structured XML documents</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleLoadSample}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 rounded-lg transition"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Load Sample
            </button>
            <button
              onClick={() => {
                setJsonInput("");
                setXmlOutput("");
                setError(null);
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-zinc-100 dark:bg-zinc-800 hover:bg-red-500/10 hover:text-red-600 text-zinc-700 dark:text-zinc-300 rounded-lg transition"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Clear
            </button>
          </div>
        </div>

        {/* Options */}
        <div className="mt-6 pt-4 border-t border-zinc-100 dark:border-zinc-800/80 flex flex-wrap items-center gap-6">
          <div className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
            <label htmlFor="root-tag" className="font-medium">Root Element:</label>
            <input
              id="root-tag"
              type="text"
              value={rootTag}
              onChange={(e) => {
                setRootTag(e.target.value);
                handleConvert(jsonInput, e.target.value);
              }}
              className="px-3 py-1 text-sm bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
            <label className="font-medium">Indentation:</label>
            <select
              value={indent}
              onChange={(e) => {
                const val = Number(e.target.value);
                setIndent(val);
                setTimeout(() => handleConvert(jsonInput, rootTag), 50);
              }}
              className="px-3 py-1 text-sm bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value={2}>2 Spaces</option>
              <option value={4}>4 Spaces</option>
              <option value={0}>Compact (No spaces)</option>
            </select>
          </div>
        </div>
      </div>

      {error && (
        <div className="flex items-center gap-2 p-4 bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 rounded-xl text-sm font-medium">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Editor Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Input */}
        <div className="flex flex-col space-y-2">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">JSON Input</label>
          <textarea
            value={jsonInput}
            onChange={handleInputChange}
            placeholder='Paste JSON here... e.g. {"name": "Tooliqo"}'
            className="w-full h-96 p-4 font-mono text-sm bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-zinc-900 dark:text-zinc-100 resize-none shadow-sm"
          />
        </div>

        {/* Output */}
        <div className="flex flex-col space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">XML Output</label>
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopy}
                disabled={!xmlOutput}
                className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 disabled:opacity-40 text-zinc-700 dark:text-zinc-300 rounded-lg transition"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? "Copied!" : "Copy"}
              </button>
              <button
                onClick={handleDownload}
                disabled={!xmlOutput}
                className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 disabled:opacity-40 text-zinc-700 dark:text-zinc-300 rounded-lg transition"
              >
                <Download className="w-3.5 h-3.5" />
                Download
              </button>
            </div>
          </div>
          <textarea
            readOnly
            value={xmlOutput}
            placeholder="Converted XML will appear here..."
            className="w-full h-96 p-4 font-mono text-sm bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl text-zinc-900 dark:text-zinc-100 resize-none shadow-sm"
          />
        </div>
      </div>
    </div>
  );
}
