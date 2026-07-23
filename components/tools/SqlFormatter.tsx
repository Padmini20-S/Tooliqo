"use client";

import React, { useState } from "react";
import { Copy, Trash2, Check, Sparkles, Database } from "lucide-react";

export default function SqlFormatter() {
  const [sqlInput, setSqlInput] = useState("");
  const [sqlOutput, setSqlOutput] = useState("");
  const [uppercaseKeywords, setUppercaseKeywords] = useState(true);
  const [indentSpaces, setIndentSpaces] = useState(2);
  const [newlineCommas, setNewlineCommas] = useState(false);
  const [copied, setCopied] = useState(false);

  const sampleSql = `select u.id, u.username, u.email, count(o.id) as total_orders, sum(o.total_amount) as total_spent from users u left join orders o on u.id = o.user_id where u.status = 'active' and u.created_at >= '2025-01-01' group by u.id, u.username, u.email having count(o.id) > 2 order by total_spent desc limit 50;`;

  const keywords = [
    "SELECT", "FROM", "WHERE", "GROUP BY", "HAVING", "ORDER BY", "LIMIT", "OFFSET",
    "LEFT JOIN", "RIGHT JOIN", "INNER JOIN", "OUTER JOIN", "CROSS JOIN", "JOIN", "ON",
    "AND", "OR", "IN", "NOT IN", "EXISTS", "BETWEEN", "LIKE", "IS NULL", "IS NOT NULL",
    "INSERT INTO", "VALUES", "UPDATE", "SET", "DELETE FROM", "DELETE",
    "CREATE TABLE", "ALTER TABLE", "DROP TABLE", "UNION ALL", "UNION", "AS", "CASE", "WHEN", "THEN", "ELSE", "END"
  ];

  const formatSql = (
    input: string,
    uppercase: boolean = uppercaseKeywords,
    spaces: number = indentSpaces,
    commaNl: boolean = newlineCommas
  ) => {
    if (!input.trim()) {
      setSqlOutput("");
      return;
    }

    let formatted = input.replace(/\s+/g, " ").trim();

    // Replace major clauses with newlines and indentation
    const clauses = [
      "SELECT", "FROM", "WHERE", "GROUP BY", "HAVING", "ORDER BY", "LIMIT", "OFFSET",
      "LEFT JOIN", "RIGHT JOIN", "INNER JOIN", "OUTER JOIN", "CROSS JOIN", "JOIN",
      "INSERT INTO", "VALUES", "UPDATE", "SET", "DELETE FROM", "DELETE",
      "CREATE TABLE", "UNION ALL", "UNION"
    ];

    // Case-insensitive regex replacement for major clauses
    clauses.forEach((clause) => {
      const regex = new RegExp(`\\b${clause}\\b`, "gi");
      formatted = formatted.replace(regex, (match) => {
        const text = uppercase ? match.toUpperCase() : match.toLowerCase();
        return `\n${text}`;
      });
    });

    // Formatting keywords case
    if (uppercase) {
      keywords.forEach((kw) => {
        const regex = new RegExp(`\\b${kw}\\b`, "gi");
        formatted = formatted.replace(regex, kw.toUpperCase());
      });
    }

    // Handle indentation and newlines
    const lines = formatted.split("\n").map((l) => l.trim()).filter(Boolean);
    const pad = " ".repeat(spaces);
    const resultLines: string[] = [];

    lines.forEach((line) => {
      const firstWord = line.split(" ")[0].toUpperCase();
      if (["SELECT", "FROM", "WHERE", "GROUP", "HAVING", "ORDER", "LIMIT", "INSERT", "VALUES", "UPDATE", "SET", "DELETE", "CREATE"].includes(firstWord)) {
        resultLines.push(line);
      } else if (line.toUpperCase().includes("JOIN") || line.toUpperCase().startsWith("ON ")) {
        resultLines.push(`${pad}${line}`);
      } else {
        resultLines.push(`${pad}${line}`);
      }
    });

    let finalResult = resultLines.join("\n");

    if (commaNl) {
      finalResult = finalResult.replace(/,\s*/g, `,\n${pad}`);
    }

    setSqlOutput(finalResult.trim());
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setSqlInput(val);
    formatSql(val, uppercaseKeywords, indentSpaces, newlineCommas);
  };

  const handleLoadSample = () => {
    setSqlInput(sampleSql);
    formatSql(sampleSql, uppercaseKeywords, indentSpaces, newlineCommas);
  };

  const handleCopy = async () => {
    if (!sqlOutput) return;
    await navigator.clipboard.writeText(sqlOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 rounded-xl">
              <Database className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">SQL Formatter</h1>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">Beautify raw SQL queries with keyword uppercasing and clean indentation</p>
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
                setSqlInput("");
                setSqlOutput("");
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
          <label className="flex items-center gap-2 text-sm text-zinc-700 dark:text-zinc-300 cursor-pointer">
            <input
              type="checkbox"
              checked={uppercaseKeywords}
              onChange={(e) => {
                const checked = e.target.checked;
                setUppercaseKeywords(checked);
                formatSql(sqlInput, checked, indentSpaces, newlineCommas);
              }}
              className="rounded border-zinc-300 dark:border-zinc-700 text-cyan-600 focus:ring-cyan-500"
            />
            <span>UPPERCASE SQL Keywords</span>
          </label>

          <div className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
            <label className="font-medium">Indentation:</label>
            <select
              value={indentSpaces}
              onChange={(e) => {
                const val = Number(e.target.value);
                setIndentSpaces(val);
                formatSql(sqlInput, uppercaseKeywords, val, newlineCommas);
              }}
              className="px-3 py-1 text-sm bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            >
              <option value={2}>2 Spaces</option>
              <option value={4}>4 Spaces</option>
            </select>
          </div>

          <label className="flex items-center gap-2 text-sm text-zinc-700 dark:text-zinc-300 cursor-pointer">
            <input
              type="checkbox"
              checked={newlineCommas}
              onChange={(e) => {
                const checked = e.target.checked;
                setNewlineCommas(checked);
                formatSql(sqlInput, uppercaseKeywords, indentSpaces, checked);
              }}
              className="rounded border-zinc-300 dark:border-zinc-700 text-cyan-600 focus:ring-cyan-500"
            />
            <span>Put commas on new line</span>
          </label>
        </div>
      </div>

      {/* Editor Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Input */}
        <div className="flex flex-col space-y-2">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Unformatted SQL Input</label>
          <textarea
            value={sqlInput}
            onChange={handleInputChange}
            placeholder="Paste messy SQL query here..."
            className="w-full h-96 p-4 font-mono text-sm bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-cyan-500 text-zinc-900 dark:text-zinc-100 resize-none shadow-sm"
          />
        </div>

        {/* Output */}
        <div className="flex flex-col space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Formatted SQL</label>
            <button
              onClick={handleCopy}
              disabled={!sqlOutput}
              className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 disabled:opacity-40 text-zinc-700 dark:text-zinc-300 rounded-lg transition"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
          <textarea
            readOnly
            value={sqlOutput}
            placeholder="Formatted SQL query will appear here..."
            className="w-full h-96 p-4 font-mono text-sm bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl text-zinc-900 dark:text-zinc-100 resize-none shadow-sm"
          />
        </div>
      </div>
    </div>
  );
}
