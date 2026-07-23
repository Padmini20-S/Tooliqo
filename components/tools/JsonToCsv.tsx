"use client";

import React, { useState } from "react";
import { Copy, Trash2, Download, Check, AlertCircle, Table, Sparkles } from "lucide-react";

export default function JsonToCsv() {
  const [jsonInput, setJsonInput] = useState("");
  const [csvOutput, setCsvOutput] = useState("");
  const [delimiter, setDelimiter] = useState(",");
  const [includeHeaders, setIncludeHeaders] = useState(true);
  const [quoteFields, setQuoteFields] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const sampleJson = JSON.stringify(
    [
      { id: 1, name: "Alice Smith", role: "Engineer", department: "Dev", active: true },
      { id: 2, name: "Bob Jones", role: "Manager", department: "Sales", active: true },
      { id: 3, name: "Charlie Brown", role: "Designer", department: "Product", active: false }
    ],
    null,
    2
  );

  const handleConvert = (
    inputVal: string = jsonInput,
    delimVal: string = delimiter,
    headersVal: boolean = includeHeaders,
    quotesVal: boolean = quoteFields
  ) => {
    if (!inputVal.trim()) {
      setCsvOutput("");
      setError(null);
      return;
    }

    try {
      const parsed = JSON.parse(inputVal);
      const items = Array.isArray(parsed) ? parsed : [parsed];

      if (items.length === 0) {
        setCsvOutput("");
        return;
      }

      // Collect all unique keys
      const headersSet = new Set<string>();
      items.forEach((item) => {
        if (typeof item === "object" && item !== null) {
          Object.keys(item).forEach((k) => headersSet.add(k));
        }
      });
      const headers = Array.from(headersSet);

      const escapeField = (val: any): string => {
        if (val === null || val === undefined) return "";
        let str = typeof val === "object" ? JSON.stringify(val) : String(val);
        if (quotesVal || str.includes(delimVal) || str.includes('"') || str.includes("\n")) {
          str = `"${str.replace(/"/g, '""')}"`;
        }
        return str;
      };

      const lines: string[] = [];
      if (headersVal) {
        lines.push(headers.map((h) => (quotesVal ? `"${h}"` : h)).join(delimVal));
      }

      items.forEach((item) => {
        if (typeof item === "object" && item !== null) {
          const row = headers.map((h) => escapeField(item[h]));
          lines.push(row.join(delimVal));
        }
      });

      setCsvOutput(lines.join("\n"));
      setError(null);
    } catch (err: any) {
      setError(err.message || "Invalid JSON array input");
      setCsvOutput("");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setJsonInput(val);
    handleConvert(val, delimiter, includeHeaders, quoteFields);
  };

  const handleLoadSample = () => {
    setJsonInput(sampleJson);
    handleConvert(sampleJson, delimiter, includeHeaders, quoteFields);
  };

  const handleCopy = async () => {
    if (!csvOutput) return;
    await navigator.clipboard.writeText(csvOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    if (!csvOutput) return;
    const blob = new Blob([csvOutput], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "data.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-orange-500/10 text-orange-600 dark:text-orange-400 rounded-xl">
              <Table className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">JSON to CSV Converter</h1>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">Flatten JSON array of objects into tabular CSV format</p>
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
                setCsvOutput("");
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
            <label className="font-medium">Delimiter:</label>
            <select
              value={delimiter}
              onChange={(e) => {
                const val = e.target.value;
                setDelimiter(val);
                handleConvert(jsonInput, val, includeHeaders, quoteFields);
              }}
              className="px-3 py-1 text-sm bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value=",">Comma ( , )</option>
              <option value="&#9;">Tab ( \t )</option>
              <option value=";">Semicolon ( ; )</option>
            </select>
          </div>

          <label className="flex items-center gap-2 text-sm text-zinc-700 dark:text-zinc-300 cursor-pointer">
            <input
              type="checkbox"
              checked={includeHeaders}
              onChange={(e) => {
                const checked = e.target.checked;
                setIncludeHeaders(checked);
                handleConvert(jsonInput, delimiter, checked, quoteFields);
              }}
              className="rounded border-zinc-300 dark:border-zinc-700 text-orange-600 focus:ring-orange-500"
            />
            <span>Include Headers Row</span>
          </label>

          <label className="flex items-center gap-2 text-sm text-zinc-700 dark:text-zinc-300 cursor-pointer">
            <input
              type="checkbox"
              checked={quoteFields}
              onChange={(e) => {
                const checked = e.target.checked;
                setQuoteFields(checked);
                handleConvert(jsonInput, delimiter, includeHeaders, checked);
              }}
              className="rounded border-zinc-300 dark:border-zinc-700 text-orange-600 focus:ring-orange-500"
            />
            <span>Quote All String Fields</span>
          </label>
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
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">JSON Input (Array of Objects)</label>
          <textarea
            value={jsonInput}
            onChange={handleInputChange}
            placeholder="Paste JSON array here..."
            className="w-full h-96 p-4 font-mono text-sm bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500 text-zinc-900 dark:text-zinc-100 resize-none shadow-sm"
          />
        </div>

        {/* Output */}
        <div className="flex flex-col space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">CSV Output</label>
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopy}
                disabled={!csvOutput}
                className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 disabled:opacity-40 text-zinc-700 dark:text-zinc-300 rounded-lg transition"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? "Copied!" : "Copy"}
              </button>
              <button
                onClick={handleDownload}
                disabled={!csvOutput}
                className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 disabled:opacity-40 text-zinc-700 dark:text-zinc-300 rounded-lg transition"
              >
                <Download className="w-3.5 h-3.5" />
                Download
              </button>
            </div>
          </div>
          <textarea
            readOnly
            value={csvOutput}
            placeholder="Converted CSV tabular string will appear here..."
            className="w-full h-96 p-4 font-mono text-sm bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl text-zinc-900 dark:text-zinc-100 resize-none shadow-sm"
          />
        </div>
      </div>
    </div>
  );
}
