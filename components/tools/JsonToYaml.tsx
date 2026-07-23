"use client";

import React, { useState } from "react";
import { Copy, Trash2, Download, Check, AlertCircle, FileText, Sparkles } from "lucide-react";

export default function JsonToYaml() {
  const [jsonInput, setJsonInput] = useState("");
  const [yamlOutput, setYamlOutput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const sampleJson = JSON.stringify(
    {
      appName: "Tooliqo Workspace",
      version: "1.0.0",
      enabled: true,
      services: ["auth-api", "converter-worker", "analytics"],
      settings: {
        timeout: 3000,
        retries: 3,
        debug: false
      }
    },
    null,
    2
  );

  const jsonToYamlStr = (obj: any, indentLevel = 0): string => {
    const pad = "  ".repeat(indentLevel);

    if (obj === null || obj === undefined) return "null";
    if (typeof obj === "boolean" || typeof obj === "number") return String(obj);
    if (typeof obj === "string") {
      if (obj.includes("\n")) {
        const lines = obj.split("\n").map((l) => pad + "  " + l).join("\n");
        return `|\n${lines}`;
      }
      if (obj.includes(":") || obj.includes("#") || obj.startsWith("-") || obj === "") {
        return `"${obj.replace(/"/g, '\\"')}"`;
      }
      return obj;
    }

    let yaml = "";

    if (Array.isArray(obj)) {
      if (obj.length === 0) return "[]";
      for (const item of obj) {
        if (typeof item === "object" && item !== null) {
          const itemYaml = jsonToYamlStr(item, indentLevel + 1).trimStart();
          yaml += `${pad}- ${itemYaml}`;
        } else {
          yaml += `${pad}- ${jsonToYamlStr(item, indentLevel)}\n`;
        }
      }
      return yaml;
    }

    if (typeof obj === "object") {
      const keys = Object.keys(obj);
      if (keys.length === 0) return "{}";
      for (const key of keys) {
        const val = obj[key];
        const cleanKey = /^[a-zA-Z0-9_-]+$/.test(key) ? key : `"${key}"`;

        if (typeof val === "object" && val !== null) {
          yaml += `${pad}${cleanKey}:\n${jsonToYamlStr(val, indentLevel + 1)}`;
        } else {
          yaml += `${pad}${cleanKey}: ${jsonToYamlStr(val, indentLevel)}\n`;
        }
      }
      return yaml;
    }

    return String(obj);
  };

  const handleConvert = (inputVal: string = jsonInput) => {
    if (!inputVal.trim()) {
      setYamlOutput("");
      setError(null);
      return;
    }

    try {
      const parsed = JSON.parse(inputVal);
      const yaml = jsonToYamlStr(parsed, 0);
      setYamlOutput(yaml);
      setError(null);
    } catch (err: any) {
      setError(err.message || "Invalid JSON syntax");
      setYamlOutput("");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setJsonInput(val);
    handleConvert(val);
  };

  const handleLoadSample = () => {
    setJsonInput(sampleJson);
    handleConvert(sampleJson);
  };

  const handleCopy = async () => {
    if (!yamlOutput) return;
    await navigator.clipboard.writeText(yamlOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    if (!yamlOutput) return;
    const blob = new Blob([yamlOutput], { type: "text/yaml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "output.yaml";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-xl">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">JSON to YAML Converter</h1>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">Convert JSON object payloads into clean YAML documents</p>
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
                setYamlOutput("");
                setError(null);
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-zinc-100 dark:bg-zinc-800 hover:bg-red-500/10 hover:text-red-600 text-zinc-700 dark:text-zinc-300 rounded-lg transition"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Clear
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

      {/* Editor Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Input */}
        <div className="flex flex-col space-y-2">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">JSON Input</label>
          <textarea
            value={jsonInput}
            onChange={handleInputChange}
            placeholder="Paste JSON string here..."
            className="w-full h-96 p-4 font-mono text-sm bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-zinc-900 dark:text-zinc-100 resize-none shadow-sm"
          />
        </div>

        {/* Output */}
        <div className="flex flex-col space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">YAML Output</label>
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopy}
                disabled={!yamlOutput}
                className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 disabled:opacity-40 text-zinc-700 dark:text-zinc-300 rounded-lg transition"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? "Copied!" : "Copy"}
              </button>
              <button
                onClick={handleDownload}
                disabled={!yamlOutput}
                className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 disabled:opacity-40 text-zinc-700 dark:text-zinc-300 rounded-lg transition"
              >
                <Download className="w-3.5 h-3.5" />
                Download
              </button>
            </div>
          </div>
          <textarea
            readOnly
            value={yamlOutput}
            placeholder="Converted YAML will appear here..."
            className="w-full h-96 p-4 font-mono text-sm bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl text-zinc-900 dark:text-zinc-100 resize-none shadow-sm"
          />
        </div>
      </div>
    </div>
  );
}
