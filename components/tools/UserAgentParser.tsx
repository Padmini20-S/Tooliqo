"use client";

import React, { useState, useEffect } from "react";
import { Monitor, Smartphone, Cpu, Shield, Copy, Check, Terminal, Globe, RefreshCw } from "lucide-react";

interface ParsedUa {
  raw: string;
  browser: { name: string; version: string };
  os: { name: string; version: string; platform: string };
  device: { type: string; brand: string; model: string };
  engine: { name: string; version: string };
  cpu: { architecture: string };
  isBot: boolean;
}

export default function UserAgentParser() {
  const [uaInput, setUaInput] = useState("");
  const [parsed, setParsed] = useState<ParsedUa | null>(null);
  const [copied, setCopied] = useState(false);

  const presets = [
    {
      name: "Chrome 122 (Windows)",
      ua: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
    },
    {
      name: "Safari 17 (iPhone)",
      ua: "Mozilla/5.0 (iPhone; CPU iPhone OS 17_3_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.3.1 Mobile/15E148 Safari/604.1",
    },
    {
      name: "Firefox 123 (macOS)",
      ua: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:123.0) Gecko/20100101 Firefox/123.0",
    },
    {
      name: "Googlebot Desktop",
      ua: "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)",
    },
  ];

  const parseUserAgent = (ua: string): ParsedUa => {
    const raw = ua.trim();
    let browser = { name: "Unknown", version: "Unknown" };
    let os = { name: "Unknown", version: "Unknown", platform: "Unknown" };
    let device = { type: "Desktop", brand: "Generic", model: "PC" };
    let engine = { name: "Unknown", version: "Unknown" };
    let cpu = { architecture: "x64" };
    let isBot = false;

    if (!raw) {
      return { raw, browser, os, device, engine, cpu, isBot };
    }

    // Bot detection
    if (/bot|crawler|spider|slurp|facebookexternalhit|bingbot|googlebot/i.test(raw)) {
      isBot = true;
    }

    // Browser detection
    if (/edg\/([\d.]+)/i.test(raw)) {
      browser = { name: "Microsoft Edge", version: RegExp.$1 };
      engine = { name: "Blink", version: "122.0" };
    } else if (/chrome\/([\d.]+)/i.test(raw)) {
      browser = { name: "Google Chrome", version: RegExp.$1 };
      engine = { name: "Blink", version: RegExp.$1 };
    } else if (/firefox\/([\d.]+)/i.test(raw)) {
      browser = { name: "Mozilla Firefox", version: RegExp.$1 };
      engine = { name: "Gecko", version: RegExp.$1 };
    } else if (/version\/([\d.]+).*safari/i.test(raw)) {
      browser = { name: "Apple Safari", version: RegExp.$1 };
      engine = { name: "WebKit", version: "605.1" };
    } else if (/googlebot\/([\d.]+)/i.test(raw)) {
      browser = { name: "Googlebot", version: RegExp.$1 };
    }

    // OS detection
    if (/windows nt 10\.0/i.test(raw)) {
      os = { name: "Windows", version: "10 / 11", platform: "Win32" };
    } else if (/mac os x ([\d_]+)/i.test(raw)) {
      os = { name: "macOS", version: RegExp.$1.replace(/_/g, "."), platform: "MacIntel" };
    } else if (/iphone os ([\d_]+)/i.test(raw)) {
      os = { name: "iOS", version: RegExp.$1.replace(/_/g, "."), platform: "iPhone" };
      device = { type: "Mobile", brand: "Apple", model: "iPhone" };
    } else if (/android ([\d.]+)/i.test(raw)) {
      os = { name: "Android", version: RegExp.$1, platform: "Android" };
      device = { type: "Mobile", brand: "Android Device", model: "Smartphone" };
    } else if (/linux/i.test(raw)) {
      os = { name: "Linux", version: "Kernel x86_64", platform: "Linux x86_64" };
    }

    // CPU detection
    if (/arm64|aarch64/i.test(raw) || (os.name === "iOS") || (os.name === "macOS" && !/intel/i.test(raw))) {
      cpu = { architecture: "ARM64" };
    } else if (/x86_64|x64|win64/i.test(raw)) {
      cpu = { architecture: "x86_64 (64-bit)" };
    }

    return { raw, browser, os, device, engine, cpu, isBot };
  };

  useEffect(() => {
    if (typeof window !== "undefined" && navigator.userAgent) {
      setUaInput(navigator.userAgent);
      setParsed(parseUserAgent(navigator.userAgent));
    }
  }, []);

  const handleParse = (uaString?: string) => {
    const text = uaString !== undefined ? uaString : uaInput;
    setParsed(parseUserAgent(text));
  };

  const loadMyUa = () => {
    if (typeof window !== "undefined" && navigator.userAgent) {
      setUaInput(navigator.userAgent);
      setParsed(parseUserAgent(navigator.userAgent));
    }
  };

  const copyParsed = () => {
    if (!parsed) return;
    navigator.clipboard.writeText(JSON.stringify(parsed, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-zinc-900 border border-zinc-800 rounded-2xl shadow-xl space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-2 flex items-center justify-center gap-2">
          <Terminal className="w-6 h-6 text-indigo-400" />
          User-Agent Parser & Inspector
        </h2>
        <p className="text-zinc-400">Parse user-agent strings to inspect browser, operating system, rendering engine, and device details.</p>
      </div>

      <div className="space-y-4">
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-xs font-semibold text-zinc-300">User-Agent String</label>
            <button
              onClick={loadMyUa}
              className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1 cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Use Current Browser UA
            </button>
          </div>
          <textarea
            rows={3}
            value={uaInput}
            onChange={(e) => {
              setUaInput(e.target.value);
              handleParse(e.target.value);
            }}
            className="w-full p-3 font-mono text-xs bg-zinc-800 border border-zinc-700 rounded-xl text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Paste User-Agent string here..."
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-400">
          <span className="font-semibold text-zinc-500">Presets:</span>
          {presets.map((preset) => (
            <button
              key={preset.name}
              onClick={() => {
                setUaInput(preset.ua);
                handleParse(preset.ua);
              }}
              className="px-2.5 py-1 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-lg border border-zinc-700 transition-colors cursor-pointer"
            >
              {preset.name}
            </button>
          ))}
        </div>
      </div>

      {parsed && (
        <div className="space-y-6">
          <div className="flex justify-between items-center p-4 bg-zinc-800/40 border border-zinc-700/80 rounded-xl">
            <div className="flex items-center gap-3">
              <span className="p-2.5 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 rounded-lg">
                {parsed.device.type === "Mobile" ? <Smartphone className="w-5 h-5" /> : <Monitor className="w-5 h-5" />}
              </span>
              <div>
                <h3 className="text-lg font-bold text-white">
                  {parsed.browser.name} {parsed.browser.version}
                </h3>
                <p className="text-xs text-zinc-400">
                  {parsed.os.name} {parsed.os.version} • {parsed.device.type} ({parsed.cpu.architecture})
                </p>
              </div>
            </div>
            <button
              onClick={copyParsed}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-zinc-700 hover:bg-zinc-600 text-zinc-200 text-xs font-medium rounded-lg transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
              {copied ? "Copied" : "Copy JSON"}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 bg-zinc-800/40 border border-zinc-700/80 rounded-xl space-y-3">
              <h4 className="text-sm font-semibold text-white flex items-center gap-2 border-b border-zinc-700/50 pb-2">
                <Globe className="w-4 h-4 text-indigo-400" />
                Browser & Engine
              </h4>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-zinc-400">Browser Name</span>
                  <span className="text-white font-medium">{parsed.browser.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">Browser Version</span>
                  <span className="text-zinc-300 font-mono">{parsed.browser.version}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">Layout Engine</span>
                  <span className="text-indigo-400 font-medium">{parsed.engine.name}</span>
                </div>
              </div>
            </div>

            <div className="p-5 bg-zinc-800/40 border border-zinc-700/80 rounded-xl space-y-3">
              <h4 className="text-sm font-semibold text-white flex items-center gap-2 border-b border-zinc-700/50 pb-2">
                <Monitor className="w-4 h-4 text-indigo-400" />
                Operating System
              </h4>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-zinc-400">OS Name</span>
                  <span className="text-white font-medium">{parsed.os.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">OS Version</span>
                  <span className="text-zinc-300 font-mono">{parsed.os.version}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">Platform</span>
                  <span className="text-zinc-300 font-mono">{parsed.os.platform}</span>
                </div>
              </div>
            </div>

            <div className="p-5 bg-zinc-800/40 border border-zinc-700/80 rounded-xl space-y-3">
              <h4 className="text-sm font-semibold text-white flex items-center gap-2 border-b border-zinc-700/50 pb-2">
                <Cpu className="w-4 h-4 text-indigo-400" />
                Device & CPU
              </h4>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-zinc-400">Device Type</span>
                  <span className="text-white font-medium">{parsed.device.type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">CPU Architecture</span>
                  <span className="text-indigo-400 font-mono">{parsed.cpu.architecture}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-zinc-400">Bot / Crawler</span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${parsed.isBot ? "bg-rose-900/40 text-rose-300" : "bg-emerald-900/40 text-emerald-300"}`}>
                    {parsed.isBot ? "Yes (Crawler)" : "No (User)"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
