"use client";

import React, { useState, useEffect } from "react";
import { Copy, RefreshCw, Check, Sparkles, FileText, Sliders } from "lucide-react";

export default function LoremIpsumGenerator() {
  const [type, setType] = useState<"paragraphs" | "sentences" | "words">("paragraphs");
  const [count, setCount] = useState<number>(3);
  const [startWithLorem, setStartWithLorem] = useState(true);
  const [wrapParagraphs, setWrapParagraphs] = useState(false);
  const [flavor, setFlavor] = useState<"classic" | "tech" | "pirate">("classic");
  const [generatedText, setGeneratedText] = useState("");
  const [copied, setCopied] = useState(false);

  const classicWords = [
    "lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit",
    "sed", "do", "eiusmod", "tempor", "incididunt", "ut", "labore", "et", "dolore",
    "magna", "aliqua", "enim", "ad", "minim", "veniam", "quis", "nostrud",
    "exercitation", "ullamco", "laboris", "nisi", "ut", "aliquip", "ex", "ea",
    "commodo", "consequat", "duis", "aute", "irure", "in", "reprehenderit", "in",
    "voluptate", "velit", "esse", "cillum", "dolore", "eu", "fugiat", "nulla",
    "pariatur", "excepteur", "sint", "occaecat", "cupidatat", "non", "proident",
    "sunt", "in", "culpa", "qui", "officia", "deserunt", "mollit", "anim", "id", "est", "laborum"
  ];

  const techWords = [
    "quantum", "neural", "synapse", "blockchain", "hyperlink", "cloud", "algo", "cyber",
    "terminal", "matrix", "protocol", "bandwidth", "node", "cluster", "latency", "vector",
    "database", "bytecode", "container", "microservice", "runtime", "fullstack", "devops", "kernel"
  ];

  const pirateWords = [
    "ahoy", "matey", "scurvy", "grog", "doubloon", "shiver", "timbers", "plank", "buccaneer",
    "captain", "starboard", "treasure", "sea", "parrot", "cutlass", "hoist", "sail", "corsair"
  ];

  const getWordPool = () => {
    if (flavor === "tech") return techWords;
    if (flavor === "pirate") return pirateWords;
    return classicWords;
  };

  const generateText = () => {
    const pool = getWordPool();
    const getRandomWord = () => pool[Math.floor(Math.random() * pool.length)];

    const makeSentence = (minWords = 6, maxWords = 14) => {
      const len = Math.floor(Math.random() * (maxWords - minWords + 1)) + minWords;
      const wordsArr = [];
      for (let i = 0; i < len; i++) {
        wordsArr.push(getRandomWord());
      }
      let sentence = wordsArr.join(" ");
      return sentence.charAt(0).toUpperCase() + sentence.slice(1) + ".";
    };

    const makeParagraph = () => {
      const sentenceCount = Math.floor(Math.random() * 4) + 3;
      const sentences = [];
      for (let i = 0; i < sentenceCount; i++) {
        sentences.push(makeSentence());
      }
      return sentences.join(" ");
    };

    let result = "";

    if (type === "words") {
      const limit = Math.min(Math.max(1, count), 500);
      const wList = [];
      if (startWithLorem && flavor === "classic") {
        wList.push("Lorem", "ipsum", "dolor", "sit", "amet");
      }
      while (wList.length < limit) {
        wList.push(getRandomWord());
      }
      result = wList.slice(0, limit).join(" ");
    } else if (type === "sentences") {
      const limit = Math.min(Math.max(1, count), 50);
      const sList = [];
      if (startWithLorem && flavor === "classic") {
        sList.push("Lorem ipsum dolor sit amet, consectetur adipiscing elit.");
      }
      while (sList.length < limit) {
        sList.push(makeSentence());
      }
      result = sList.slice(0, limit).join(" ");
    } else {
      // Paragraphs
      const limit = Math.min(Math.max(1, count), 20);
      const pList = [];
      for (let i = 0; i < limit; i++) {
        let p = makeParagraph();
        if (i === 0 && startWithLorem && flavor === "classic") {
          p = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. " + p;
        }
        pList.push(p);
      }

      if (wrapParagraphs) {
        result = pList.map((p) => `<p>${p}</p>`).join("\n\n");
      } else {
        result = pList.join("\n\n");
      }
    }

    setGeneratedText(result);
  };

  useEffect(() => {
    generateText();
  }, [type, count, startWithLorem, wrapParagraphs, flavor]);

  const handleCopy = async () => {
    if (!generatedText) return;
    await navigator.clipboard.writeText(generatedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-amber-500/10 text-amber-600 dark:text-amber-400 rounded-xl">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">Lorem Ipsum Generator</h1>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">Generate customizable placeholder text paragraphs, sentences, or words</p>
            </div>
          </div>

          <button
            onClick={generateText}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold bg-amber-600 hover:bg-amber-700 text-white rounded-xl shadow-xs transition shrink-0"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Regenerate
          </button>
        </div>

        {/* Controls Bar */}
        <div className="mt-6 pt-4 border-t border-zinc-100 dark:border-zinc-800/80 flex flex-wrap items-center justify-between gap-6">
          <div className="flex flex-wrap items-center gap-4 text-sm text-zinc-700 dark:text-zinc-300">
            {/* Units Selector */}
            <div className="flex items-center gap-2 bg-zinc-100 dark:bg-zinc-800 p-1 rounded-xl">
              <button
                onClick={() => setType("paragraphs")}
                className={`px-3 py-1 text-xs font-semibold rounded-lg transition ${
                  type === "paragraphs"
                    ? "bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 shadow-xs"
                    : "text-zinc-500 dark:text-zinc-400"
                }`}
              >
                Paragraphs
              </button>
              <button
                onClick={() => setType("sentences")}
                className={`px-3 py-1 text-xs font-semibold rounded-lg transition ${
                  type === "sentences"
                    ? "bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 shadow-xs"
                    : "text-zinc-500 dark:text-zinc-400"
                }`}
              >
                Sentences
              </button>
              <button
                onClick={() => setType("words")}
                className={`px-3 py-1 text-xs font-semibold rounded-lg transition ${
                  type === "words"
                    ? "bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 shadow-xs"
                    : "text-zinc-500 dark:text-zinc-400"
                }`}
              >
                Words
              </button>
            </div>

            {/* Quantity */}
            <div className="flex items-center gap-2">
              <label className="font-medium">Count:</label>
              <input
                type="number"
                min={1}
                max={type === "words" ? 500 : 50}
                value={count}
                onChange={(e) => setCount(Number(e.target.value))}
                className="w-20 px-3 py-1 text-sm bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg text-zinc-900 dark:text-zinc-100 text-center font-mono"
              />
            </div>

            {/* Flavor */}
            <div className="flex items-center gap-2">
              <label className="font-medium">Theme:</label>
              <select
                value={flavor}
                onChange={(e) => setFlavor(e.target.value as any)}
                className="px-3 py-1 text-sm bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg text-zinc-900 dark:text-zinc-100"
              >
                <option value="classic">Classic Latin</option>
                <option value="tech">Tech Cyberpunk</option>
                <option value="pirate">Pirate Talk</option>
              </select>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-sm text-zinc-700 dark:text-zinc-300">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={startWithLorem}
                onChange={(e) => setStartWithLorem(e.target.checked)}
                className="rounded border-zinc-300 dark:border-zinc-700 text-amber-600 focus:ring-amber-500"
              />
              <span>Start with "Lorem ipsum..."</span>
            </label>

            {type === "paragraphs" && (
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={wrapParagraphs}
                  onChange={(e) => setWrapParagraphs(e.target.checked)}
                  className="rounded border-zinc-300 dark:border-zinc-700 text-amber-600 focus:ring-amber-500"
                />
                <span>Wrap in &lt;p&gt; tags</span>
              </label>
            )}
          </div>
        </div>
      </div>

      {/* Output Display */}
      <div className="flex flex-col space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Generated Text Output</label>
          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-amber-600 hover:bg-amber-700 text-white rounded-xl shadow-xs transition"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? "Copied Text!" : "Copy Text"}
          </button>
        </div>

        <textarea
          readOnly
          value={generatedText}
          className="w-full h-80 p-5 font-sans text-sm leading-relaxed bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl text-zinc-900 dark:text-zinc-100 resize-none shadow-sm focus:outline-none"
        />
      </div>
    </div>
  );
}
