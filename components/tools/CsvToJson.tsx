"use client";

import React, { useState } from "react";
import { Copy, Trash2, Download, Check, AlertCircle, Table, Sparkles } from "lucide-react";

export default function CsvToJson() {
  const [csvInput, setCsvInput] = useState("");
  const [jsonOutput, setJsonOutput] = useState("");
  const [delimiter, setDelimiter] = useState(",");
  const [hasHeader, setHasHeader] = useState(true);
  const [parseTypes, setParseTypes] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const sampleCsv = `id,name,role,department,salary,active
1,"Alice Smith",Engineer,Dev,95000,true
2,"Bob Jones",Manager,Sales,88000,true
3,"Charlie Brown",Designer,Product,75000,false`;

  const parseCsvLine = (line: string, delim: string): string[] => {
    const result: string[] = [];
    let current = "";
    let inQuotes = false;

    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      if (char === '"' || char === "'") {
        if (inQuotes && line[i + 1] === char) {
          current += char;
          i++;
        } else {
          inQuotes = !inQuotes;
        }
      } else if (char === delim && !inQuotes) {
        result.push(current.trim());
        current = "";
      } else {
        current += char;
      }
    }
    result.push(current.trim());
    return result;
  };

  const handleConvert = (
    inputVal: string = csvInput,
    delimVal: string = delimiter,
    headerVal: boolean = hasHeader,
    typesVal: boolean = parseTypes
  ) => {
    if (!inputVal.trim()) {
      setJsonOutput("");
      setError(null);
      return;
    }

    try {
      const lines = inputVal
        .split("\n")
        .map((line) => line.replace(/\r$/, ""))
        .filter((line) => line.trim().length > 0);

      if (lines.length === 0) {
        setJsonOutput("[]");
        return;
      }

      const rows = lines.map((l) => parseCsvLine(l, delimVal));

      const formatVal = (v: string) => {
        if (!typesVal) return v;
        if (v.toLowerCase() === "true") return true;
        if (v.toLowerCase() === "false") return false;
        if (v.toLowerCase() === "null") return null;
        if (/^-?\d+(\.\d+)?$/.test(v) && v !== "") return Number(v);
        return v;
      };

      if (headerVal) {
        const headers = rows[0].map((h, i) => h || `column_${i + 1}`);
        const dataRows = rows.slice(1);

        const jsonArray = dataRows.map((row) => {
          const obj: Record<string, any> = {};
          headers.forEach((h, idx) => {
            obj[h] = idx < row.length ? formatVal(row[idx]) : null;
          });
          return obj;
        });

        setJsonOutput(JSON.stringify(jsonArray, null, 2));
      } else {
        const jsonArray = rows.map((row) => row.map(formatVal));
        setJsonOutput(JSON.stringify(jsonArray, null, 2));
      }
      setError(null);
    } catch (err: any) {
      setError(err.message || "Failed to parse CSV string");
      setJsonOutput("");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setCsvInput(val);
    handleConvert(val, delimiter, hasHeader, parseTypes);
  };

  const handleLoadSample = () => {
    setCsvInput(sampleCsv);
    handleConvert(sampleCsv, delimiter, hasHeader, parseTypes);
  };

  const handleCopy = async () => {
    if (!jsonOutput) return;
    await navigator.clipboard.writeText(jsonOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    if (!jsonOutput) return;
    const blob = new Blob([jsonOutput], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "parsed.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-amber-500/10 text-amber-600 dark:text-amber-400 rounded-xl">
              <Table className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">CSV to JSON Converter</h1>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">Parse CSV tabular text into JSON array of objects</p>
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
                setCsvInput("");
                setJsonOutput("");
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
                handleConvert(csvInput, val, hasHeader, parseTypes);
              }}
              className="px-3 py-1 text-sm bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              <option value=",">Comma ( , )</option>
              <option value="&#9;">Tab ( \t )</option>
              <option value=";">Semicolon ( ; )</option>
              <option value="|">Pipe ( | )</option>
            </select>
          </div>

          <label className="flex items-center gap-2 text-sm text-zinc-700 dark:text-zinc-300 cursor-pointer">
            <input
              type="checkbox"
              checked={hasHeader}
              onChange={(e) => {
                const checked = e.target.checked;
                setHasHeader(checked);
                handleConvert(csvInput, delimiter, checked, parseTypes);
              }}
              className="rounded border-zinc-300 dark:border-zinc-700 text-amber-600 focus:ring-amber-500"
            />
            <span>First row as Header</span>
          </label>

          <label className="flex items-center gap-2 text-sm text-zinc-700 dark:text-zinc-300 cursor-pointer">
            <input
              type="checkbox"
              checked={parseTypes}
              onChange={(e) => {
                const checked = e.target.checked;
                setParseTypes(checked);
                handleConvert(csvInput, delimiter, hasHeader, checked);
              }}
              className="rounded border-zinc-300 dark:border-zinc-700 text-amber-600 focus:ring-amber-500"
            />
            <span>Auto-parse Numbers & Booleans</span>
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
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">CSV Input</label>
          <textarea
            value={csvInput}
            onChange={handleInputChange}
            placeholder="Paste CSV text here..."
            className="w-full h-96 p-4 font-mono text-sm bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-amber-500 text-zinc-900 dark:text-zinc-100 resize-none shadow-sm"
          />
        </div>

        {/* Output */}
        <div className="flex flex-col space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">JSON Output</label>
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopy}
                disabled={!jsonOutput}
                className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 disabled:opacity-40 text-zinc-700 dark:text-zinc-300 rounded-lg transition"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? "Copied!" : "Copy"}
              </button>
              <button
                onClick={handleDownload}
                disabled={!jsonOutput}
                className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 disabled:opacity-40 text-zinc-700 dark:text-zinc-300 rounded-lg transition"
              >
                <Download className="w-3.5 h-3.5" />
                Download
              </button>
            </div>
          </div>
          <textarea
            readOnly
            value={jsonOutput}
            placeholder="Converted JSON array will appear here..."
            className="w-full h-96 p-4 font-mono text-sm bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl text-zinc-900 dark:text-zinc-100 resize-none shadow-sm"
          />
        </div>
      </div>
    </div>
  );
}
