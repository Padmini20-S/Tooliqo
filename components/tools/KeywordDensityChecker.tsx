"use client";

import React, { useState, useMemo } from "react";
import { BarChart2, Filter, Copy, Check, Search } from "lucide-react";

interface KeywordStat {
  phrase: string;
  count: number;
  density: number;
  status: "ideal" | "over" | "low";
}

export default function KeywordDensityChecker() {
  const [text, setText] = useState(
    `Search engine optimization (SEO) is the process of improving the quality and quantity of website traffic to a website or a web page from search engines. SEO targets unpaid traffic rather than direct traffic or paid traffic. High quality content and search engine optimization go hand in hand to rank pages on Google.`
  );
  const [ignoreStopWords, setIgnoreStopWords] = useState(true);
  const [minWordLength] = useState(3);
  const [phraseLength, setPhraseLength] = useState<1 | 2 | 3>(1);
  const [searchFilter, setSearchFilter] = useState("");
  const [copied, setCopied] = useState(false);

  const stopWords = new Set([
    "a", "about", "above", "after", "again", "against", "all", "am", "an", "and", "any", "are", "aren't", "as", "at",
    "be", "because", "been", "before", "being", "below", "between", "both", "but", "by", "can", "cannot", "could",
    "did", "do", "does", "doing", "down", "during", "each", "few", "for", "from", "further", "had", "has", "have",
    "having", "he", "her", "here", "hers", "herself", "him", "himself", "his", "how", "i", "if", "in", "into", "is",
    "it", "its", "itself", "me", "more", "most", "my", "myself", "no", "nor", "not", "of", "off", "on", "once", "only",
    "or", "other", "ought", "our", "ours", "ourselves", "out", "over", "own", "same", "she", "should", "so", "some",
    "such", "than", "that", "the", "their", "theirs", "them", "themselves", "then", "there", "these", "they", "this",
    "those", "through", "to", "too", "under", "until", "up", "very", "was", "we", "were", "what", "when", "where",
    "which", "while", "who", "whom", "why", "with", "would", "you", "your", "yours", "yourself", "yourselves"
  ]);

  const cleanWords = useMemo(() => {
    if (!text.trim()) return [];
    return text
      .toLowerCase()
      .replace(/[^\w\s]/g, " ")
      .split(/\s+/)
      .filter((w) => w.length > 0);
  }, [text]);

  const totalWords = cleanWords.length;
  const characterCount = text.length;

  const keywordStats: KeywordStat[] = useMemo(() => {
    if (cleanWords.length === 0) return [];

    const map: Record<string, number> = {};

    if (phraseLength === 1) {
      cleanWords.forEach((word) => {
        if (word.length < minWordLength) return;
        if (ignoreStopWords && stopWords.has(word)) return;
        map[word] = (map[word] || 0) + 1;
      });
    } else {
      for (let i = 0; i <= cleanWords.length - phraseLength; i++) {
        const slice = cleanWords.slice(i, i + phraseLength);
        if (ignoreStopWords && slice.some((w) => stopWords.has(w))) continue;
        if (slice.some((w) => w.length < minWordLength)) continue;
        const phrase = slice.join(" ");
        map[phrase] = (map[phrase] || 0) + 1;
      }
    }

    const items = Object.entries(map).map(([phrase, count]) => {
      const density = Math.round((count / totalWords) * 10000) / 100;
      let status: "ideal" | "over" | "low" = "ideal";
      if (density > 4.5) status = "over";
      else if (density < 1.0) status = "low";
      return { phrase, count, density, status };
    });

    items.sort((a, b) => b.count - a.count);

    if (searchFilter.trim()) {
      return items.filter((item) => item.phrase.toLowerCase().includes(searchFilter.toLowerCase()));
    }

    return items;
  }, [cleanWords, ignoreStopWords, minWordLength, phraseLength, searchFilter, totalWords]);

  const copyStats = () => {
    const lines = keywordStats.map((k) => `${k.phrase}: ${k.count} (${k.density}%)`).join("\n");
    navigator.clipboard.writeText(lines);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-zinc-900 border border-zinc-800 rounded-2xl shadow-xl space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-2 flex items-center justify-center gap-2">
          <BarChart2 className="w-6 h-6 text-indigo-400" />
          Keyword Density & Frequency Analyzer
        </h2>
        <p className="text-zinc-400">Analyze text to detect top single words, 2-word, and 3-word phrase density percentages for SEO optimization.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-6 space-y-4">
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-semibold text-zinc-300">Article or Webpage Text</label>
              <div className="flex gap-3 text-xs text-zinc-400 font-mono">
                <span>Words: <strong className="text-white">{totalWords}</strong></span>
                <span>Chars: <strong className="text-white">{characterCount}</strong></span>
              </div>
            </div>
            <textarea
              rows={12}
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Paste article or webpage text here to analyze keyword frequency..."
              className="w-full p-4 bg-zinc-800 border border-zinc-700 rounded-xl text-zinc-100 placeholder-zinc-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none text-xs leading-relaxed"
            />
          </div>

          <div className="p-4 bg-zinc-800/40 border border-zinc-700/80 rounded-xl space-y-3 text-xs">
            <h3 className="font-bold text-white flex items-center gap-1.5">
              <Filter className="w-3.5 h-3.5 text-indigo-400" /> Analysis Controls
            </h3>
            <div className="flex flex-wrap gap-4 items-center">
              <label className="flex items-center gap-2 cursor-pointer text-zinc-300">
                <input
                  type="checkbox"
                  checked={ignoreStopWords}
                  onChange={(e) => setIgnoreStopWords(e.target.checked)}
                  className="w-4 h-4 text-indigo-600 rounded bg-zinc-900 border-zinc-700 focus:ring-indigo-500"
                />
                Filter Common Stop Words ('the', 'is', 'and')
              </label>
            </div>
          </div>
        </div>

        <div className="lg:col-span-6 space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <div className="flex bg-zinc-800/80 p-1 rounded-lg border border-zinc-700/60 text-xs">
              {([1, 2, 3] as const).map((len) => (
                <button
                  key={len}
                  onClick={() => setPhraseLength(len)}
                  className={`px-3 py-1 font-medium rounded-md transition-colors cursor-pointer ${
                    phraseLength === len ? "bg-indigo-600 text-white" : "text-zinc-400 hover:text-zinc-200"
                  }`}
                >
                  {len}-Word Phrases
                </button>
              ))}
            </div>

            <button
              onClick={copyStats}
              className="flex items-center gap-1 px-3 py-1.5 bg-zinc-700 hover:bg-zinc-600 text-zinc-200 text-xs font-medium rounded-lg transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? "Copied" : "Copy Results"}
            </button>
          </div>

          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-zinc-500" />
            <input
              type="text"
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              placeholder="Search keyword results..."
              className="w-full pl-9 pr-3 py-1.5 bg-zinc-800 border border-zinc-700 rounded-lg text-xs text-zinc-200 focus:outline-none"
            />
          </div>

          <div className="bg-zinc-800/40 border border-zinc-700/80 rounded-xl overflow-hidden max-h-[360px] overflow-y-auto">
            <table className="min-w-full divide-y divide-zinc-700/50 text-xs">
              <thead className="bg-zinc-800/80 text-zinc-400 sticky top-0">
                <tr>
                  <th className="px-4 py-2.5 text-left">Keyword / Phrase</th>
                  <th className="px-4 py-2.5 text-center">Count</th>
                  <th className="px-4 py-2.5 text-right">Density %</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-700/40 font-mono">
                {keywordStats.slice(0, 30).map((item, idx) => (
                  <tr key={idx} className="hover:bg-zinc-700/20">
                    <td className="px-4 py-2 font-sans font-semibold text-zinc-200">{item.phrase}</td>
                    <td className="px-4 py-2 text-center text-zinc-300">{item.count}</td>
                    <td className="px-4 py-2 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <div className="w-16 h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                          <div
                            style={{ width: `${Math.min(100, item.density * 20)}%` }}
                            className={`h-full ${item.status === "over" ? "bg-rose-500" : "bg-indigo-500"}`}
                          />
                        </div>
                        <span className={`font-bold ${item.status === "over" ? "text-rose-400" : "text-indigo-400"}`}>
                          {item.density}%
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
