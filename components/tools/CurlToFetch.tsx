"use client";

import React, { useState } from "react";
import { Copy, Trash2, Check, Sparkles, Terminal } from "lucide-react";

export default function CurlToFetch() {
  const [curlInput, setCurlInput] = useState("");
  const [fetchOutput, setFetchOutput] = useState("");
  const [style, setStyle] = useState<"async" | "then">("async");
  const [copied, setCopied] = useState(false);

  const sampleCurl = `curl -X POST "https://api.example.com/v1/users" \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer secret_token_12345" \\
  -d '{"name": "Jane Doe", "email": "jane@example.com", "role": "admin"}'`;

  const parseCurl = (curlStr: string, mode: "async" | "then") => {
    if (!curlStr.trim()) {
      setFetchOutput("");
      return;
    }

    const clean = curlStr.replace(/\\\n/g, " ").replace(/\s+/g, " ").trim();

    let method = "GET";
    const headers: Record<string, string> = {};
    let body: string | null = null;
    let url = "";

    // Extract method
    const methodMatch = clean.match(/(?:-X|--request)\s+([A-Z]+)/i);
    if (methodMatch) {
      method = methodMatch[1].toUpperCase();
    }

    // Extract headers
    const headerRegex = /(?:-H|--header)\s+["']([^"']+)["']/gi;
    let hMatch;
    while ((hMatch = headerRegex.exec(clean)) !== null) {
      const headerStr = hMatch[1];
      const colonIdx = headerStr.indexOf(":");
      if (colonIdx !== -1) {
        const k = headerStr.substring(0, colonIdx).trim();
        const v = headerStr.substring(colonIdx + 1).trim();
        headers[k] = v;
      }
    }

    // Extract data
    const dataMatch = clean.match(/(?:-d|--data|--data-raw|--data-binary)\s+['"]([\s\S]*?)['"](?=\s+-[A-Za-z]|\s*$)/i) ||
                       clean.match(/(?:-d|--data|--data-raw|--data-binary)\s+([^\s]+)/i);
    if (dataMatch) {
      body = dataMatch[1];
      if (method === "GET") method = "POST";
    }

    // Extract URL
    const urlMatch = clean.match(/(https?:\/\/[^\s"']+)/i) || clean.match(/curl\s+["']?([^\s"']+)["']?/i);
    if (urlMatch) {
      url = urlMatch[1];
    } else {
      url = "https://api.example.com/endpoint";
    }

    const optionsObj: any = { method };

    if (Object.keys(headers).length > 0) {
      optionsObj.headers = headers;
    }

    if (body) {
      try {
        optionsObj.body = JSON.stringify(JSON.parse(body), null, 2);
      } catch {
        optionsObj.body = body;
      }
    }

    let jsCode = "";
    const optionsIndent = JSON.stringify(optionsObj, null, 2);

    if (mode === "async") {
      jsCode = `async function fetchData() {
  try {
    const response = await fetch("${url}", ${optionsIndent});
    if (!response.ok) {
      throw new Error(\`HTTP error! status: \${response.status}\`);
    }
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Fetch error:", error);
  }
}

fetchData();`;
    } else {
      jsCode = `fetch("${url}", ${optionsIndent})
  .then(response => {
    if (!response.ok) {
      throw new Error(\`HTTP error! status: \${response.status}\`);
    }
    return response.json();
  })
  .then(data => console.log(data))
  .catch(error => console.error("Fetch error:", error));`;
    }

    setFetchOutput(jsCode);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setCurlInput(val);
    parseCurl(val, style);
  };

  const handleLoadSample = () => {
    setCurlInput(sampleCurl);
    parseCurl(sampleCurl, style);
  };

  const handleCopy = async () => {
    if (!fetchOutput) return;
    await navigator.clipboard.writeText(fetchOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-violet-500/10 text-violet-600 dark:text-violet-400 rounded-xl">
              <Terminal className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">cURL to fetch() Converter</h1>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">Parse cURL command lines into executable JavaScript fetch() requests</p>
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
                setCurlInput("");
                setFetchOutput("");
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-zinc-100 dark:bg-zinc-800 hover:bg-red-500/10 hover:text-red-600 text-zinc-700 dark:text-zinc-300 rounded-lg transition"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Clear
            </button>
          </div>
        </div>

        {/* Options */}
        <div className="mt-6 pt-4 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center gap-6">
          <div className="flex items-center gap-2 bg-zinc-100 dark:bg-zinc-800 p-1 rounded-xl">
            <button
              onClick={() => {
                setStyle("async");
                parseCurl(curlInput, "async");
              }}
              className={`px-3 py-1 text-xs font-semibold rounded-lg transition ${
                style === "async"
                  ? "bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 shadow-sm"
                  : "text-zinc-500 dark:text-zinc-400"
              }`}
            >
              Async / Await
            </button>
            <button
              onClick={() => {
                setStyle("then");
                parseCurl(curlInput, "then");
              }}
              className={`px-3 py-1 text-xs font-semibold rounded-lg transition ${
                style === "then"
                  ? "bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 shadow-sm"
                  : "text-zinc-500 dark:text-zinc-400"
              }`}
            >
              Promises (.then)
            </button>
          </div>
        </div>
      </div>

      {/* Editor Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Input */}
        <div className="flex flex-col space-y-2">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">cURL Command Input</label>
          <textarea
            value={curlInput}
            onChange={handleInputChange}
            placeholder="Paste cURL command string here..."
            className="w-full h-96 p-4 font-mono text-sm bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-violet-500 text-zinc-900 dark:text-zinc-100 resize-none shadow-sm"
          />
        </div>

        {/* Output */}
        <div className="flex flex-col space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">JavaScript fetch() Output</label>
            <button
              onClick={handleCopy}
              disabled={!fetchOutput}
              className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 disabled:opacity-40 text-zinc-700 dark:text-zinc-300 rounded-lg transition"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? "Copied!" : "Copy Code"}
            </button>
          </div>
          <textarea
            readOnly
            value={fetchOutput}
            placeholder="Generated JS fetch code will appear here..."
            className="w-full h-96 p-4 font-mono text-sm bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl text-zinc-900 dark:text-zinc-100 resize-none shadow-sm"
          />
        </div>
      </div>
    </div>
  );
}
