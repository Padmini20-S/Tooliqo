"use client";

import React, { useState } from "react";
import { Copy, Check, Trash2, FileText, Sparkles } from "lucide-react";

export default function CaseConverter() {
  const [text, setText] = useState("");
  const [copied, setCopied] = useState(false);

  const wordsCount = text.trim() === "" ? 0 : text.trim().split(/\s+/).length;
  const charsCount = text.length;
  const charsNoSpacesCount = text.replace(/\s+/g, "").length;
  const sentencesCount = text.split(/[.!?]+/).filter(Boolean).length;
  const readingTime = Math.ceil(wordsCount / 200); // 200 words per minute average

  const handleCopy = async () => {
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.error(e);
    }
  };

  const toUppercase = () => setText(text.toUpperCase());
  const toLowercase = () => setText(text.toLowerCase());

  const toTitleCase = () => {
    const titleCased = text
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
    setText(titleCased);
  };

  const toSentenceCase = () => {
    const sentenceCased = text
      .toLowerCase()
      .replace(/(^\s*|[.!?]\s+)([a-z])/g, (m) => m.toUpperCase());
    setText(sentenceCased);
  };

  const toCamelCase = () => {
    const camelCased = text
      .toLowerCase()
      .replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase())
      .replace(/^[A-Z]/, (m) => m.toLowerCase());
    setText(camelCased);
  };

  const toSnakeCase = () => {
    const snakeCased = text
      .toLowerCase()
      .replace(/\s+/g, "_")
      .replace(/[^a-z0-9_]/g, "");
    setText(snakeCased);
  };

  const toPascalCase = () => {
    const pascalCased = text
      .toLowerCase()
      .replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase())
      .replace(/^[a-z]/, (m) => m.toUpperCase());
    setText(pascalCased);
  };

  const toSlugify = () => {
    const slugified = text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");
    setText(slugified);
  };

  const handleClear = () => setText("");

  return (
    <div className="space-y-6">
      {/* Analytics Counter Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
        <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/20 text-center">
          <span className="block text-xs font-semibold text-zinc-500 dark:text-zinc-400">Words</span>
          <span className="text-xl font-bold text-zinc-850 dark:text-zinc-100 mt-1 block">{wordsCount}</span>
        </div>
        <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/20 text-center">
          <span className="block text-xs font-semibold text-zinc-500 dark:text-zinc-400">Characters</span>
          <span className="text-xl font-bold text-zinc-850 dark:text-zinc-100 mt-1 block">{charsCount}</span>
        </div>
        <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/20 text-center">
          <span className="block text-xs font-semibold text-zinc-500 dark:text-zinc-400">No Spaces</span>
          <span className="text-xl font-bold text-zinc-850 dark:text-zinc-100 mt-1 block">{charsNoSpacesCount}</span>
        </div>
        <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/20 text-center">
          <span className="block text-xs font-semibold text-zinc-500 dark:text-zinc-400">Sentences</span>
          <span className="text-xl font-bold text-zinc-850 dark:text-zinc-100 mt-1 block">{sentencesCount}</span>
        </div>
        <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/20 col-span-2 sm:col-span-1 text-center">
          <span className="block text-xs font-semibold text-zinc-500 dark:text-zinc-400">Read Time</span>
          <span className="text-xl font-bold text-zinc-850 dark:text-zinc-100 mt-1 block">~{readingTime}m</span>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Editor Area */}
        <div className="flex-1 flex flex-col space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Input Editor</h3>
            <div className="flex items-center space-x-2">
              <button
                disabled={!text}
                onClick={handleCopy}
                className="text-xs px-2.5 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 text-zinc-650 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer flex items-center space-x-1.5 w-[76px]"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? "Copied!" : "Copy"}</span>
              </button>
              <button
                onClick={handleClear}
                className="text-xs px-2.5 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 text-red-505 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors cursor-pointer flex items-center space-x-1.5"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear</span>
              </button>
            </div>
          </div>
          <textarea
            placeholder="Type or paste your text here..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full h-80 min-h-[300px] p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 text-zinc-800 dark:text-zinc-100 text-sm outline-none focus:border-indigo-500 transition-all resize-y leading-relaxed"
          />
        </div>

        {/* Conversion controls */}
        <div className="lg:w-60 flex flex-col justify-center space-y-4">
          <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/20 space-y-3">
            <h4 className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider mb-2 flex items-center space-x-1">
              <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
              <span>Conversions</span>
            </h4>
            <div className="grid grid-cols-2 lg:grid-cols-1 gap-2">
              <button
                disabled={!text}
                onClick={toUppercase}
                className="py-2 px-3 text-left rounded-lg border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-900 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer text-xs font-semibold"
              >
                UPPERCASE
              </button>
              <button
                disabled={!text}
                onClick={toLowercase}
                className="py-2 px-3 text-left rounded-lg border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-900 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer text-xs font-semibold"
              >
                lowercase
              </button>
              <button
                disabled={!text}
                onClick={toTitleCase}
                className="py-2 px-3 text-left rounded-lg border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-900 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer text-xs font-semibold"
              >
                Title Case
              </button>
              <button
                disabled={!text}
                onClick={toSentenceCase}
                className="py-2 px-3 text-left rounded-lg border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-900 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer text-xs font-semibold"
              >
                Sentence case
              </button>
              <button
                disabled={!text}
                onClick={toCamelCase}
                className="py-2 px-3 text-left rounded-lg border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-900 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer text-xs font-semibold"
              >
                camelCase
              </button>
              <button
                disabled={!text}
                onClick={toPascalCase}
                className="py-2 px-3 text-left rounded-lg border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-900 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer text-xs font-semibold"
              >
                PascalCase
              </button>
              <button
                disabled={!text}
                onClick={toSnakeCase}
                className="py-2 px-3 text-left rounded-lg border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-900 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer text-xs font-semibold"
              >
                snake_case
              </button>
              <button
                disabled={!text}
                onClick={toSlugify}
                className="py-2 px-3 text-left rounded-lg border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-900 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer text-xs font-semibold"
              >
                slug-ify
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
