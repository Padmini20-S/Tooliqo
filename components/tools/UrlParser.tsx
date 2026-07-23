"use client";

import React, { useState, useEffect } from "react";
import { Copy, Trash2, Check, Sparkles, Link, Plus, AlertCircle } from "lucide-react";

export default function UrlParser() {
  const [urlInput, setUrlInput] = useState("");
  const [parsed, setParsed] = useState<{
    protocol: string;
    hostname: string;
    port: string;
    origin: string;
    pathname: string;
    hash: string;
    username?: string;
    password?: string;
  } | null>(null);

  const [queryParams, setQueryParams] = useState<Array<{ key: string; value: string }>>([]);
  const [error, setError] = useState<string | null>(null);
  const [copiedUrl, setCopiedUrl] = useState(false);
  const [copiedJson, setCopiedJson] = useState(false);

  const sampleUrl = "https://user:secretpass@api.tooliqo.dev:8080/v2/analytics/reports?workspace_id=9876&format=json&debug=true#overview-section";

  const parseUrlString = (str: string) => {
    if (!str.trim()) {
      setParsed(null);
      setQueryParams([]);
      setError(null);
      return;
    }

    try {
      const u = new URL(str.trim());
      setParsed({
        protocol: u.protocol,
        hostname: u.hostname,
        port: u.port || (u.protocol === "https:" ? "443" : "80"),
        origin: u.origin,
        pathname: u.pathname,
        hash: u.hash,
        username: u.username,
        password: u.password
      });

      const params: Array<{ key: string; value: string }> = [];
      u.searchParams.forEach((value, key) => {
        params.push({ key, value });
      });
      setQueryParams(params);
      setError(null);
    } catch (err: any) {
      setError(err.message || "Invalid URL. Please include protocol (e.g. https://)");
      setParsed(null);
      setQueryParams([]);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setUrlInput(val);
    parseUrlString(val);
  };

  const handleLoadSample = () => {
    setUrlInput(sampleUrl);
    parseUrlString(sampleUrl);
  };

  const handleParamChange = (index: number, field: "key" | "value", val: string) => {
    const updated = [...queryParams];
    updated[index][field] = val;
    setQueryParams(updated);
    rebuildUrl(updated);
  };

  const handleAddParam = () => {
    const updated = [...queryParams, { key: "new_param", value: "value" }];
    setQueryParams(updated);
    rebuildUrl(updated);
  };

  const handleDeleteParam = (index: number) => {
    const updated = queryParams.filter((_, i) => i !== index);
    setQueryParams(updated);
    rebuildUrl(updated);
  };

  const rebuildUrl = (params: Array<{ key: string; value: string }>) => {
    if (!urlInput.trim()) return;
    try {
      const u = new URL(urlInput.trim());
      u.search = "";
      params.forEach((p) => {
        if (p.key.trim()) {
          u.searchParams.append(p.key.trim(), p.value);
        }
      });
      setUrlInput(u.toString());
      setParsed({
        protocol: u.protocol,
        hostname: u.hostname,
        port: u.port || (u.protocol === "https:" ? "443" : "80"),
        origin: u.origin,
        pathname: u.pathname,
        hash: u.hash,
        username: u.username,
        password: u.password
      });
    } catch {
      // Ignore rebuild if invalid URL
    }
  };

  const handleCopyUrl = async () => {
    if (!urlInput) return;
    await navigator.clipboard.writeText(urlInput);
    setCopiedUrl(true);
    setTimeout(() => setCopiedUrl(false), 2000);
  };

  const handleCopyJson = async () => {
    if (!parsed) return;
    const exportObj = {
      fullUrl: urlInput,
      ...parsed,
      queryParams: Object.fromEntries(queryParams.map((p) => [p.key, p.value]))
    };
    await navigator.clipboard.writeText(JSON.stringify(exportObj, null, 2));
    setCopiedJson(true);
    setTimeout(() => setCopiedJson(false), 2000);
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-xl">
              <Link className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">URL Parser & Inspector</h1>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">Break down URLs into host, port, path, query parameters table, and hash</p>
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
                setUrlInput("");
                setParsed(null);
                setQueryParams([]);
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

      {/* Input Field */}
      <div className="flex flex-col space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">URL Input String</label>
          {urlInput && (
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyUrl}
                className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 rounded-lg transition"
              >
                {copiedUrl ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
                {copiedUrl ? "Copied URL!" : "Copy URL"}
              </button>
              <button
                onClick={handleCopyJson}
                className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 rounded-lg transition"
              >
                {copiedJson ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
                {copiedJson ? "Copied JSON!" : "Copy JSON"}
              </button>
            </div>
          )}
        </div>
        <input
          type="text"
          value={urlInput}
          onChange={handleInputChange}
          placeholder="Paste URL here... e.g. https://api.tooliqo.com:8080/v1/search?q=test#top"
          className="w-full px-4 py-3 font-mono text-sm bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-zinc-900 dark:text-zinc-100 shadow-sm"
        />
      </div>

      {error && (
        <div className="flex items-center gap-2 p-4 bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 rounded-xl text-sm font-medium">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Breakdown Grid */}
      {parsed && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Main URL Components */}
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm space-y-4">
            <h2 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 border-b border-zinc-100 dark:border-zinc-800 pb-3">
              URL Components Breakdown
            </h2>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between items-center p-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/50">
                <span className="font-semibold text-zinc-500">Protocol:</span>
                <span className="font-mono font-bold text-blue-600 dark:text-blue-400">{parsed.protocol}</span>
              </div>
              <div className="flex justify-between items-center p-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/50">
                <span className="font-semibold text-zinc-500">Origin:</span>
                <span className="font-mono font-bold text-zinc-900 dark:text-zinc-100 truncate max-w-[240px]">{parsed.origin}</span>
              </div>
              <div className="flex justify-between items-center p-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/50">
                <span className="font-semibold text-zinc-500">Hostname:</span>
                <span className="font-mono font-bold text-zinc-900 dark:text-zinc-100">{parsed.hostname}</span>
              </div>
              <div className="flex justify-between items-center p-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/50">
                <span className="font-semibold text-zinc-500">Port:</span>
                <span className="font-mono font-bold text-zinc-900 dark:text-zinc-100">{parsed.port}</span>
              </div>
              <div className="flex justify-between items-center p-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/50">
                <span className="font-semibold text-zinc-500">Pathname:</span>
                <span className="font-mono font-bold text-zinc-900 dark:text-zinc-100 truncate max-w-[240px]">{parsed.pathname || "/"}</span>
              </div>
              <div className="flex justify-between items-center p-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/50">
                <span className="font-semibold text-zinc-500">Hash / Fragment:</span>
                <span className="font-mono font-bold text-purple-600 dark:text-purple-400">{parsed.hash || "(none)"}</span>
              </div>
              {(parsed.username || parsed.password) && (
                <div className="flex justify-between items-center p-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/50">
                  <span className="font-semibold text-zinc-500">Credentials:</span>
                  <span className="font-mono text-zinc-900 dark:text-zinc-100">
                    {parsed.username}:{parsed.password}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Query Parameters Editor */}
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm space-y-4 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-3">
                <h2 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                  Query Parameters ({queryParams.length})
                </h2>
                <button
                  onClick={handleAddParam}
                  className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold bg-blue-500/10 text-blue-600 dark:text-blue-400 hover:bg-blue-500/20 rounded-lg transition"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Param
                </button>
              </div>

              {queryParams.length === 0 ? (
                <div className="text-center py-8 text-xs text-zinc-400">
                  No query parameters present in URL.
                </div>
              ) : (
                <div className="space-y-2.5 max-h-[300px] overflow-y-auto pr-1">
                  {queryParams.map((param, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <input
                        type="text"
                        value={param.key}
                        onChange={(e) => handleParamChange(idx, "key", e.target.value)}
                        placeholder="Key"
                        className="w-1/2 px-3 py-1.5 font-mono text-xs bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl text-zinc-900 dark:text-zinc-100"
                      />
                      <span className="text-zinc-400 text-xs">=</span>
                      <input
                        type="text"
                        value={param.value}
                        onChange={(e) => handleParamChange(idx, "value", e.target.value)}
                        placeholder="Value"
                        className="w-1/2 px-3 py-1.5 font-mono text-xs bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl text-zinc-900 dark:text-zinc-100"
                      />
                      <button
                        onClick={() => handleDeleteParam(idx)}
                        className="p-1.5 text-zinc-400 hover:text-red-500 rounded-lg transition"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

