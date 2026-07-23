"use client";

import React, { useState } from "react";
import { Copy, Trash2, Download, Check, AlertCircle, Code, Sparkles } from "lucide-react";

export default function XmlToJson() {
  const [xmlInput, setXmlInput] = useState("");
  const [jsonOutput, setJsonOutput] = useState("");
  const [indent, setIndent] = useState(2);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const sampleXml = `<?xml version="1.0" encoding="UTF-8"?>
<bookstore>
  <book category="COOKING">
    <title lang="en">Everyday Italian</title>
    <author>Giada De Laurentiis</author>
    <year>2005</year>
    <price>30.00</price>
  </book>
  <book category="CHILDREN">
    <title lang="en">Harry Potter</title>
    <author>J K. Rowling</author>
    <year>2005</year>
    <price>29.99</price>
  </book>
</bookstore>`;

  const xmlToObj = (node: Node): any => {
    if (node.nodeType === Node.TEXT_NODE) {
      return node.nodeValue?.trim() || null;
    }

    if (node.nodeType !== Node.ELEMENT_NODE) {
      return null;
    }

    const element = node as Element;
    const obj: any = {};

    // Process attributes
    if (element.attributes.length > 0) {
      obj["@attributes"] = {};
      for (let i = 0; i < element.attributes.length; i++) {
        const attr = element.attributes[i];
        obj["@attributes"][attr.name] = attr.value;
      }
    }

    // Process children
    const children = Array.from(element.childNodes);
    const elementChildren = children.filter((c) => c.nodeType === Node.ELEMENT_NODE);
    const textChildren = children.filter(
      (c) => c.nodeType === Node.TEXT_NODE && c.nodeValue && c.nodeValue.trim().length > 0
    );

    if (elementChildren.length === 0) {
      const textContent = textChildren.map((c) => c.nodeValue?.trim()).join("");
      if (Object.keys(obj).length === 0) {
        // Try auto-coercing numbers/booleans if simple text
        if (textContent === "true") return true;
        if (textContent === "false") return false;
        if (!isNaN(Number(textContent)) && textContent !== "") return Number(textContent);
        return textContent;
      }
      if (textContent) obj["#text"] = textContent;
      return obj;
    }

    for (const child of elementChildren) {
      const childName = (child as Element).tagName;
      const childObj = xmlToObj(child);

      if (obj[childName] === undefined) {
        obj[childName] = childObj;
      } else {
        if (!Array.isArray(obj[childName])) {
          obj[childName] = [obj[childName]];
        }
        obj[childName].push(childObj);
      }
    }

    return obj;
  };

  const handleConvert = (inputVal: string = xmlInput) => {
    if (!inputVal.trim()) {
      setJsonOutput("");
      setError(null);
      return;
    }

    try {
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(inputVal, "text/xml");

      const parserError = xmlDoc.querySelector("parsererror");
      if (parserError) {
        throw new Error(parserError.textContent || "XML Syntax Error");
      }

      const root = xmlDoc.documentElement;
      if (!root) throw new Error("No root element found in XML");

      const result = { [root.tagName]: xmlToObj(root) };
      setJsonOutput(JSON.stringify(result, null, indent));
      setError(null);
    } catch (err: any) {
      setError(err.message || "Failed to parse XML input");
      setJsonOutput("");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setXmlInput(val);
    handleConvert(val);
  };

  const handleLoadSample = () => {
    setXmlInput(sampleXml);
    handleConvert(sampleXml);
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
    a.download = "converted.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-purple-500/10 text-purple-600 dark:text-purple-400 rounded-xl">
              <Code className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">XML to JSON Converter</h1>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">Parse XML documents and output formatted JSON structure</p>
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
                setXmlInput("");
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
        <div className="mt-6 pt-4 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center gap-6">
          <div className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
            <label className="font-medium">Indent JSON:</label>
            <select
              value={indent}
              onChange={(e) => {
                const val = Number(e.target.value);
                setIndent(val);
                if (xmlInput) {
                  setTimeout(() => handleConvert(xmlInput), 50);
                }
              }}
              className="px-3 py-1 text-sm bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value={2}>2 Spaces</option>
              <option value={4}>4 Spaces</option>
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
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">XML Input</label>
          <textarea
            value={xmlInput}
            onChange={handleInputChange}
            placeholder="Paste XML string here..."
            className="w-full h-96 p-4 font-mono text-sm bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-zinc-900 dark:text-zinc-100 resize-none shadow-sm"
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
            placeholder="Converted JSON will appear here..."
            className="w-full h-96 p-4 font-mono text-sm bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl text-zinc-900 dark:text-zinc-100 resize-none shadow-sm"
          />
        </div>
      </div>
    </div>
  );
}
