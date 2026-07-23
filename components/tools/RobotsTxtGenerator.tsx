"use client";

import React, { useState } from "react";
import { FileText, Plus, Trash2, Copy, Check, Download, Shield, Sparkles } from "lucide-react";

interface Rule {
  id: string;
  userAgent: string;
  allowPaths: string[];
  disallowPaths: string[];
  crawlDelay: string;
}

export default function RobotsTxtGenerator() {
  const [sitemapUrl, setSitemapUrl] = useState("https://example.com/sitemap.xml");
  const [rules, setRules] = useState<Rule[]>([
    {
      id: "1",
      userAgent: "*",
      allowPaths: ["/"],
      disallowPaths: ["/admin/", "/api/", "/private/"],
      crawlDelay: "2",
    },
  ]);
  const [newAllowInput, setNewAllowInput] = useState<{ [key: string]: string }>({});
  const [newDisallowInput, setNewDisallowInput] = useState<{ [key: string]: string }>({});
  const [copied, setCopied] = useState(false);

  const presets = [
    {
      name: "Default Web App",
      sitemap: "https://example.com/sitemap.xml",
      rules: [
        {
          id: "1",
          userAgent: "*",
          allowPaths: ["/"],
          disallowPaths: ["/admin/", "/api/", "/private/", "/*.json$"],
          crawlDelay: "1",
        },
      ],
    },
    {
      name: "Block AI Crawlers",
      sitemap: "https://example.com/sitemap.xml",
      rules: [
        {
          id: "1",
          userAgent: "*",
          allowPaths: ["/"],
          disallowPaths: ["/private/"],
          crawlDelay: "",
        },
        {
          id: "2",
          userAgent: "GPTBot",
          allowPaths: [],
          disallowPaths: ["/"],
          crawlDelay: "",
        },
        {
          id: "3",
          userAgent: "CCBot",
          allowPaths: [],
          disallowPaths: ["/"],
          crawlDelay: "",
        },
      ],
    },
    {
      name: "Allow Everything",
      sitemap: "https://example.com/sitemap.xml",
      rules: [
        {
          id: "1",
          userAgent: "*",
          allowPaths: ["/"],
          disallowPaths: [],
          crawlDelay: "",
        },
      ],
    },
  ];

  const addRuleGroup = () => {
    const newId = Date.now().toString();
    setRules([
      ...rules,
      {
        id: newId,
        userAgent: "Googlebot",
        allowPaths: ["/public/"],
        disallowPaths: ["/drafts/"],
        crawlDelay: "",
      },
    ]);
  };

  const removeRuleGroup = (id: string) => {
    if (rules.length === 1) return;
    setRules(rules.filter((r) => r.id !== id));
  };

  const addPath = (ruleId: string, type: "allow" | "disallow") => {
    const inputVal = type === "allow" ? newAllowInput[ruleId] : newDisallowInput[ruleId];
    if (!inputVal || !inputVal.trim()) return;

    setRules(
      rules.map((r) => {
        if (r.id === ruleId) {
          if (type === "allow") {
            return { ...r, allowPaths: [...r.allowPaths, inputVal.trim()] };
          } else {
            return { ...r, disallowPaths: [...r.disallowPaths, inputVal.trim()] };
          }
        }
        return r;
      })
    );

    if (type === "allow") {
      setNewAllowInput({ ...newAllowInput, [ruleId]: "" });
    } else {
      setNewDisallowInput({ ...newDisallowInput, [ruleId]: "" });
    }
  };

  const removePath = (ruleId: string, type: "allow" | "disallow", index: number) => {
    setRules(
      rules.map((r) => {
        if (r.id === ruleId) {
          if (type === "allow") {
            return { ...r, allowPaths: r.allowPaths.filter((_, i) => i !== index) };
          } else {
            return { ...r, disallowPaths: r.disallowPaths.filter((_, i) => i !== index) };
          }
        }
        return r;
      })
    );
  };

  const generateRobotsTxt = () => {
    let output = "";
    rules.forEach((rule, idx) => {
      if (idx > 0) output += "\n";
      output += `User-agent: ${rule.userAgent}\n`;
      if (rule.crawlDelay) {
        output += `Crawl-delay: ${rule.crawlDelay}\n`;
      }
      rule.disallowPaths.forEach((path) => {
        output += `Disallow: ${path}\n`;
      });
      rule.allowPaths.forEach((path) => {
        output += `Allow: ${path}\n`;
      });
    });

    if (sitemapUrl.trim()) {
      output += `\nSitemap: ${sitemapUrl.trim()}\n`;
    }

    return output;
  };

  const robotsTxtContent = generateRobotsTxt();

  const copyToClipboard = () => {
    navigator.clipboard.writeText(robotsTxtContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadFile = () => {
    const element = document.createElement("a");
    const file = new Blob([robotsTxtContent], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "robots.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-zinc-900 border border-zinc-800 rounded-2xl shadow-xl space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-2 flex items-center justify-center gap-2">
          <FileText className="w-6 h-6 text-indigo-400" />
          Robots.txt Generator
        </h2>
        <p className="text-zinc-400">Generate, customize, and validate robots.txt rules for search engine crawlers and web bots.</p>
      </div>

      {/* Preset Quick Select */}
      <div className="flex items-center gap-2 flex-wrap text-xs bg-zinc-800/40 p-3 rounded-xl border border-zinc-800">
        <Sparkles className="w-4 h-4 text-indigo-400" />
        <span className="font-semibold text-zinc-300">Quick Preset Templates:</span>
        {presets.map((preset) => (
          <button
            key={preset.name}
            onClick={() => {
              setSitemapUrl(preset.sitemap);
              setRules(preset.rules);
            }}
            className="px-3 py-1 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-lg border border-zinc-700 transition-colors cursor-pointer"
          >
            {preset.name}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Form Controls */}
        <div className="lg:col-span-7 space-y-6">
          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1">XML Sitemap URL</label>
            <input
              type="text"
              value={sitemapUrl}
              onChange={(e) => setSitemapUrl(e.target.value)}
              className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-xl text-xs text-zinc-100 placeholder-zinc-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              placeholder="https://example.com/sitemap.xml"
            />
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Shield className="w-4 h-4 text-indigo-400" />
                User-Agent Rule Groups
              </h3>
              <button
                onClick={addRuleGroup}
                className="flex items-center gap-1 text-xs px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                Add User-Agent Group
              </button>
            </div>

            {rules.map((rule, idx) => (
              <div key={rule.id} className="p-4 bg-zinc-800/50 border border-zinc-700/80 rounded-xl space-y-4">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2 flex-1">
                    <span className="text-xs text-zinc-400 font-semibold">User-Agent:</span>
                    <input
                      type="text"
                      value={rule.userAgent}
                      onChange={(e) =>
                        setRules(rules.map((r) => (r.id === rule.id ? { ...r, userAgent: e.target.value } : r)))
                      }
                      className="px-2.5 py-1 text-xs font-mono bg-zinc-900 border border-zinc-700 rounded-lg text-indigo-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none flex-1"
                      placeholder="* or Googlebot"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      value={rule.crawlDelay}
                      onChange={(e) =>
                        setRules(rules.map((r) => (r.id === rule.id ? { ...r, crawlDelay: e.target.value } : r)))
                      }
                      className="w-20 px-2 py-1 text-xs bg-zinc-900 border border-zinc-700 rounded-lg text-zinc-200 focus:outline-none"
                      placeholder="Delay (s)"
                    />
                    {rules.length > 1 && (
                      <button
                        onClick={() => removeRuleGroup(rule.id)}
                        className="p-1.5 text-zinc-400 hover:text-red-400 transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Disallow paths */}
                <div className="space-y-2">
                  <span className="text-[11px] font-semibold text-rose-400 uppercase tracking-wider">Disallow Paths</span>
                  <div className="flex flex-wrap gap-1.5">
                    {rule.disallowPaths.map((path, i) => (
                      <span key={i} className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-rose-950/40 border border-rose-800/50 text-rose-300 rounded text-xs font-mono">
                        {path}
                        <button onClick={() => removePath(rule.id, "disallow", i)} className="hover:text-rose-100 cursor-pointer">
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newDisallowInput[rule.id] || ""}
                      onChange={(e) => setNewDisallowInput({ ...newDisallowInput, [rule.id]: e.target.value })}
                      onKeyDown={(e) => e.key === "Enter" && addPath(rule.id, "disallow")}
                      placeholder="e.g. /admin/"
                      className="flex-1 px-2.5 py-1 bg-zinc-900 border border-zinc-700 rounded text-xs text-zinc-200 focus:outline-none"
                    />
                    <button
                      onClick={() => addPath(rule.id, "disallow")}
                      className="px-2.5 py-1 bg-zinc-700 hover:bg-zinc-600 text-xs text-zinc-200 rounded cursor-pointer"
                    >
                      Add
                    </button>
                  </div>
                </div>

                {/* Allow paths */}
                <div className="space-y-2">
                  <span className="text-[11px] font-semibold text-emerald-400 uppercase tracking-wider">Allow Paths</span>
                  <div className="flex flex-wrap gap-1.5">
                    {rule.allowPaths.map((path, i) => (
                      <span key={i} className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-950/40 border border-emerald-800/50 text-emerald-300 rounded text-xs font-mono">
                        {path}
                        <button onClick={() => removePath(rule.id, "allow", i)} className="hover:text-emerald-100 cursor-pointer">
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newAllowInput[rule.id] || ""}
                      onChange={(e) => setNewAllowInput({ ...newAllowInput, [rule.id]: e.target.value })}
                      onKeyDown={(e) => e.key === "Enter" && addPath(rule.id, "allow")}
                      placeholder="e.g. /public/"
                      className="flex-1 px-2.5 py-1 bg-zinc-900 border border-zinc-700 rounded text-xs text-zinc-200 focus:outline-none"
                    />
                    <button
                      onClick={() => addPath(rule.id, "allow")}
                      className="px-2.5 py-1 bg-zinc-700 hover:bg-zinc-600 text-xs text-zinc-200 rounded cursor-pointer"
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Output Code View */}
        <div className="lg:col-span-5 flex flex-col space-y-3">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-bold text-white">Generated Output</h3>
            <div className="flex gap-2">
              <button
                onClick={copyToClipboard}
                className="flex items-center gap-1 px-3 py-1.5 bg-zinc-700 hover:bg-zinc-600 text-zinc-200 text-xs font-medium rounded-lg transition-colors cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? "Copied" : "Copy"}
              </button>
              <button
                onClick={downloadFile}
                className="flex items-center gap-1 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-medium rounded-lg transition-colors cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                Download
              </button>
            </div>
          </div>

          <pre className="flex-1 w-full bg-black/60 border border-zinc-800 p-4 rounded-xl text-emerald-400 font-mono text-xs overflow-x-auto min-h-[350px]">
            {robotsTxtContent}
          </pre>
        </div>
      </div>
    </div>
  );
}
