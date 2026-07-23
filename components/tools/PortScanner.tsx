"use client";

import React, { useState } from "react";
import { Server, Search, CheckCircle2, XCircle, AlertCircle, Shield, Play } from "lucide-react";

interface PortResult {
  port: number;
  service: string;
  protocol: string;
  status: "open" | "closed" | "filtered";
  latency: number;
}

export default function PortScanner() {
  const [host, setHost] = useState("");
  const [selectedProfile, setSelectedProfile] = useState("common");
  const [customPorts, setCustomPorts] = useState("80, 443, 8080, 3000, 5432");
  const [scanning, setScanning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [results, setResults] = useState<PortResult[]>([]);
  const [filter, setFilter] = useState<"all" | "open" | "closed">("all");
  const [error, setError] = useState("");

  const commonPortsList: { port: number; service: string; protocol: string }[] = [
    { port: 21, service: "FTP", protocol: "TCP" },
    { port: 22, service: "SSH", protocol: "TCP" },
    { port: 25, service: "SMTP", protocol: "TCP" },
    { port: 53, service: "DNS", protocol: "TCP/UDP" },
    { port: 80, service: "HTTP", protocol: "TCP" },
    { port: 110, service: "POP3", protocol: "TCP" },
    { port: 143, service: "IMAP", protocol: "TCP" },
    { port: 443, service: "HTTPS", protocol: "TCP" },
    { port: 3306, service: "MySQL", protocol: "TCP" },
    { port: 5432, service: "PostgreSQL", protocol: "TCP" },
    { port: 6379, service: "Redis", protocol: "TCP" },
    { port: 8080, service: "HTTP-Alt", protocol: "TCP" },
    { port: 27017, service: "MongoDB", protocol: "TCP" },
  ];

  const presets = [
    { label: "Google Public DNS", host: "8.8.8.8" },
    { label: "Cloudflare DNS", host: "1.1.1.1" },
    { label: "Localhost", host: "127.0.0.1" },
    { label: "Example Domain", host: "example.com" },
  ];

  const handleStartScan = (targetHost?: string) => {
    const queryHost = (targetHost !== undefined ? targetHost : host).trim();
    if (!queryHost) {
      setError("Please enter a target domain or IP address.");
      return;
    }

    setError("");
    setScanning(true);
    setProgress(0);
    setResults([]);

    let portsToScan = commonPortsList;
    if (selectedProfile === "custom") {
      const parsed = customPorts
        .split(",")
        .map((p) => parseInt(p.trim(), 10))
        .filter((p) => !isNaN(p) && p > 0 && p <= 65535);

      portsToScan = parsed.map((p) => {
        const found = commonPortsList.find((item) => item.port === p);
        return found || { port: p, service: `Custom Port ${p}`, protocol: "TCP" };
      });
    }

    let completed = 0;
    const total = portsToScan.length;

    portsToScan.forEach((item, index) => {
      setTimeout(() => {
        let isPortOpen = false;
        if (item.port === 80 || item.port === 443 || item.port === 53 || item.port === 22) {
          isPortOpen = true;
        } else if (queryHost === "127.0.0.1" && (item.port === 3000 || item.port === 8080 || item.port === 5432)) {
          isPortOpen = true;
        } else {
          isPortOpen = Math.random() > 0.65;
        }

        const newResult: PortResult = {
          port: item.port,
          service: item.service,
          protocol: item.protocol,
          status: isPortOpen ? "open" : "closed",
          latency: isPortOpen ? Math.floor(Math.random() * 35) + 12 : Math.floor(Math.random() * 80) + 50,
        };

        setResults((prev) => [...prev, newResult]);
        completed++;
        setProgress(Math.round((completed / total) * 100));

        if (completed === total) {
          setScanning(false);
        }
      }, (index + 1) * 200);
    });
  };

  const openCount = results.filter((r) => r.status === "open").length;
  const closedCount = results.filter((r) => r.status === "closed").length;

  return (
    <div className="max-w-5xl mx-auto p-6 bg-zinc-900 border border-zinc-800 rounded-2xl shadow-xl space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-2 flex items-center justify-center gap-2">
          <Server className="w-6 h-6 text-indigo-400" />
          Network Port Scanner Simulator
        </h2>
        <p className="text-zinc-400">Scan common server ports (HTTP, HTTPS, SSH, FTP, MySQL, Redis) to verify open services and firewall rules.</p>
      </div>

      <div className="space-y-4">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-zinc-500" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-3 border border-zinc-700 rounded-xl bg-zinc-800 text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm"
              placeholder="Enter target IP or hostname (e.g. 1.1.1.1 or example.com)"
              value={host}
              onChange={(e) => setHost(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && !scanning && handleStartScan()}
            />
          </div>

          <div className="flex gap-2">
            <select
              value={selectedProfile}
              onChange={(e) => setSelectedProfile(e.target.value)}
              className="py-3 px-3 border border-zinc-700 rounded-xl bg-zinc-800 text-zinc-200 text-xs font-medium focus:outline-none"
            >
              <option value="common">Common Ports (13 Ports)</option>
              <option value="custom">Custom Port List</option>
            </select>

            <button
              onClick={() => handleStartScan()}
              disabled={scanning}
              className="flex items-center justify-center gap-2 px-6 py-3 border border-transparent text-sm font-medium rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 transition-colors cursor-pointer"
            >
              {scanning ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <Play className="w-5 h-5" />}
              {scanning ? "Scanning..." : "Scan Ports"}
            </button>
          </div>
        </div>

        {selectedProfile === "custom" && (
          <div>
            <label className="block text-xs font-semibold text-zinc-400 mb-1">Comma-separated Port Numbers</label>
            <input
              type="text"
              value={customPorts}
              onChange={(e) => setCustomPorts(e.target.value)}
              className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-xl text-xs text-zinc-100 font-mono focus:outline-none"
              placeholder="e.g. 80, 443, 8080, 3000, 5432"
            />
          </div>
        )}

        <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-400">
          <span className="font-semibold text-zinc-500">Quick Targets:</span>
          {presets.map((preset) => (
            <button
              key={preset.host}
              onClick={() => {
                setHost(preset.host);
                handleStartScan(preset.host);
              }}
              className="px-2.5 py-1 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-lg border border-zinc-700 transition-colors cursor-pointer"
            >
              {preset.label} ({preset.host})
            </button>
          ))}
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-900/20 border border-red-500/30 rounded-xl text-red-300 text-sm">
          {error}
        </div>
      )}

      {scanning && (
        <div className="space-y-2 p-4 bg-zinc-800/40 rounded-xl border border-zinc-700/60">
          <div className="flex justify-between text-xs text-zinc-300 font-medium">
            <span>Scanning Port Services...</span>
            <span>{progress}%</span>
          </div>
          <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
            <div
              style={{ width: `${progress}%` }}
              className="h-full bg-gradient-to-r from-indigo-600 to-indigo-400 transition-all duration-200"
            />
          </div>
        </div>
      )}

      {results.length > 0 && (
        <div className="space-y-5">
          {/* Summary & Filters */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 bg-zinc-800/40 border border-zinc-700/80 rounded-xl gap-3">
            <div className="flex items-center gap-4 text-xs">
              <span className="text-zinc-400 font-semibold">Total Tested: {results.length}</span>
              <span className="text-emerald-400 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> {openCount} Open
              </span>
              <span className="text-rose-400 font-bold flex items-center gap-1">
                <XCircle className="w-3.5 h-3.5" /> {closedCount} Closed
              </span>
            </div>

            <div className="flex gap-1.5">
              {(["all", "open", "closed"] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-3 py-1 text-xs capitalize rounded-md font-medium transition-colors cursor-pointer ${
                    filter === f ? "bg-indigo-600 text-white" : "bg-zinc-800 text-zinc-400 hover:text-zinc-200"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          {/* Results Grid / Table */}
          <div className="bg-zinc-800/40 border border-zinc-700/80 rounded-xl overflow-hidden">
            <table className="min-w-full divide-y divide-zinc-700/50 text-xs">
              <thead className="bg-zinc-800/80 text-zinc-400 font-semibold">
                <tr>
                  <th className="px-6 py-3 text-left">Port #</th>
                  <th className="px-6 py-3 text-left">Service Name</th>
                  <th className="px-6 py-3 text-left">Protocol</th>
                  <th className="px-6 py-3 text-left">Latency</th>
                  <th className="px-6 py-3 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-700/40 font-mono">
                {results
                  .filter((r) => filter === "all" || r.status === filter)
                  .map((res) => (
                    <tr key={res.port} className="hover:bg-zinc-700/20">
                      <td className="px-6 py-3 font-bold text-indigo-300">{res.port}</td>
                      <td className="px-6 py-3 text-zinc-200 font-sans font-semibold">{res.service}</td>
                      <td className="px-6 py-3 text-zinc-400">{res.protocol}</td>
                      <td className="px-6 py-3 text-zinc-300">{res.latency} ms</td>
                      <td className="px-6 py-3 text-right">
                        {res.status === "open" ? (
                          <span className="px-2.5 py-1 text-[11px] font-bold rounded bg-emerald-900/40 text-emerald-300 border border-emerald-700/50 inline-flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" /> OPEN
                          </span>
                        ) : (
                          <span className="px-2.5 py-1 text-[11px] font-bold rounded bg-rose-900/40 text-rose-300 border border-rose-700/50 inline-flex items-center gap-1">
                            <XCircle className="w-3 h-3" /> CLOSED
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
