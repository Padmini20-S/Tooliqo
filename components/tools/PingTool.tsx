"use client";

import React, { useState } from "react";
import { Activity, Play, Globe, CheckCircle2, XCircle, BarChart3, RefreshCcw } from "lucide-react";

interface PacketResult {
  seq: number;
  bytes: number;
  ttl: number;
  timeMs: number;
  status: "success" | "timeout";
}

export default function PingTool() {
  const [host, setHost] = useState("");
  const [packetCount, setPacketCount] = useState(6);
  const [packetSize, setPacketSize] = useState(64);
  const [pinging, setPinging] = useState(false);
  const [packets, setPackets] = useState<PacketResult[]>([]);
  const [error, setError] = useState("");

  const presets = [
    { label: "Google DNS", host: "8.8.8.8" },
    { label: "Cloudflare", host: "1.1.1.1" },
    { label: "AWS East", host: "dynamodb.us-east-1.amazonaws.com" },
    { label: "GitHub", host: "github.com" },
  ];

  const handleStartPing = (targetHost?: string) => {
    const queryHost = (targetHost !== undefined ? targetHost : host).trim();
    if (!queryHost) {
      setError("Please enter a host or IP address.");
      return;
    }

    setError("");
    setPinging(true);
    setPackets([]);

    let currentSeq = 1;
    const interval = setInterval(() => {
      if (currentSeq > packetCount) {
        clearInterval(interval);
        setPinging(false);
        return;
      }

      // Realistic latency variation
      const baseMs = queryHost.includes("1.1.1.1") || queryHost.includes("8.8.8.8") ? 14 : 45;
      const jitter = (Math.random() - 0.5) * 12;
      const timeMs = Math.max(8, Math.round((baseMs + jitter) * 10) / 10);
      const isTimeout = Math.random() < 0.03; // 3% loss probability

      const newPacket: PacketResult = {
        seq: currentSeq,
        bytes: packetSize,
        ttl: 56 + Math.floor(Math.random() * 8),
        timeMs: isTimeout ? 0 : timeMs,
        status: isTimeout ? "timeout" : "success",
      };

      setPackets((prev) => [...prev, newPacket]);
      currentSeq++;
    }, 400);
  };

  const successfulPackets = packets.filter((p) => p.status === "success");
  const times = successfulPackets.map((p) => p.timeMs);
  const minRtt = times.length > 0 ? Math.min(...times) : 0;
  const maxRtt = times.length > 0 ? Math.max(...times) : 0;
  const avgRtt = times.length > 0 ? Math.round((times.reduce((a, b) => a + b, 0) / times.length) * 10) / 10 : 0;
  const lossPct = packets.length > 0 ? Math.round(((packets.length - successfulPackets.length) / packets.length) * 100) : 0;

  return (
    <div className="max-w-5xl mx-auto p-6 bg-zinc-900 border border-zinc-800 rounded-2xl shadow-xl space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-2 flex items-center justify-center gap-2">
          <Activity className="w-6 h-6 text-indigo-400" />
          ICMP Ping & Network Latency Simulator
        </h2>
        <p className="text-zinc-400">Simulate ICMP ECHO packets to measure network round-trip time (RTT), jitter, and packet loss.</p>
      </div>

      <div className="space-y-4">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Globe className="h-5 w-5 text-zinc-500" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-3 border border-zinc-700 rounded-xl bg-zinc-800 text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm"
              placeholder="Enter domain or IP (e.g., 1.1.1.1 or github.com)"
              value={host}
              onChange={(e) => setHost(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && !pinging && handleStartPing()}
            />
          </div>

          <div className="flex gap-2">
            <select
              value={packetCount}
              onChange={(e) => setPacketCount(Number(e.target.value))}
              className="py-3 px-3 border border-zinc-700 rounded-xl bg-zinc-800 text-zinc-200 text-xs font-medium focus:outline-none"
            >
              <option value={4}>4 Packets</option>
              <option value={6}>6 Packets</option>
              <option value={10}>10 Packets</option>
            </select>

            <button
              onClick={() => handleStartPing()}
              disabled={pinging}
              className="flex items-center justify-center gap-2 px-6 py-3 border border-transparent text-sm font-medium rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 transition-colors cursor-pointer"
            >
              {pinging ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <Play className="w-5 h-5" />}
              {pinging ? "Pinging..." : "Start Ping"}
            </button>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-400">
          <span className="font-semibold text-zinc-500">Presets:</span>
          {presets.map((preset) => (
            <button
              key={preset.host}
              onClick={() => {
                setHost(preset.host);
                handleStartPing(preset.host);
              }}
              className="px-2.5 py-1 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-lg border border-zinc-700 transition-colors cursor-pointer"
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-900/20 border border-red-500/30 rounded-xl text-red-300 text-sm">
          {error}
        </div>
      )}

      {packets.length > 0 && (
        <div className="space-y-6">
          {/* RTT Statistics Summary */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-4 bg-zinc-800/40 border border-zinc-700/80 rounded-xl">
              <span className="text-xs text-zinc-400">Min RTT</span>
              <div className="mt-1 text-xl font-bold text-emerald-400 font-mono">{minRtt} ms</div>
            </div>

            <div className="p-4 bg-zinc-800/40 border border-zinc-700/80 rounded-xl">
              <span className="text-xs text-zinc-400">Avg RTT</span>
              <div className="mt-1 text-xl font-bold text-indigo-400 font-mono">{avgRtt} ms</div>
            </div>

            <div className="p-4 bg-zinc-800/40 border border-zinc-700/80 rounded-xl">
              <span className="text-xs text-zinc-400">Max RTT</span>
              <div className="mt-1 text-xl font-bold text-amber-400 font-mono">{maxRtt} ms</div>
            </div>

            <div className="p-4 bg-zinc-800/40 border border-zinc-700/80 rounded-xl">
              <span className="text-xs text-zinc-400">Packet Loss</span>
              <div className={`mt-1 text-xl font-bold font-mono ${lossPct === 0 ? "text-emerald-400" : "text-rose-400"}`}>
                {lossPct}%
              </div>
            </div>
          </div>

          {/* Latency Bar Visualizer */}
          <div className="p-5 bg-zinc-800/40 border border-zinc-700/80 rounded-xl space-y-3">
            <h3 className="text-xs font-bold text-zinc-300 uppercase tracking-wider flex items-center gap-1.5">
              <BarChart3 className="w-4 h-4 text-indigo-400" />
              Real-time Latency Chart (ms)
            </h3>

            <div className="h-32 flex items-end gap-3 pt-4 px-2 border-b border-zinc-700/60">
              {packets.map((pkt) => {
                const heightPct = pkt.status === "timeout" ? 100 : Math.min(100, Math.max(15, (pkt.timeMs / (maxRtt * 1.2 || 50)) * 100));
                return (
                  <div key={pkt.seq} className="flex-1 flex flex-col items-center gap-1.5 group relative">
                    <div className="text-[10px] font-mono text-zinc-400 opacity-0 group-hover:opacity-100 transition-opacity">
                      {pkt.status === "timeout" ? "Loss" : `${pkt.timeMs}ms`}
                    </div>
                    <div
                      style={{ height: `${heightPct}%` }}
                      className={`w-full rounded-t transition-all duration-300 ${
                        pkt.status === "timeout" ? "bg-rose-500/80" : "bg-gradient-to-t from-indigo-600 to-indigo-400"
                      }`}
                    />
                    <span className="text-[10px] text-zinc-500 font-mono">#{pkt.seq}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Packet Sequence Table */}
          <div className="bg-zinc-800/40 border border-zinc-700/80 rounded-xl overflow-hidden">
            <table className="min-w-full divide-y divide-zinc-700/50 text-xs font-mono">
              <thead className="bg-zinc-800/80 text-zinc-400">
                <tr>
                  <th className="px-6 py-3 text-left">Seq #</th>
                  <th className="px-6 py-3 text-left">Bytes</th>
                  <th className="px-6 py-3 text-left">TTL</th>
                  <th className="px-6 py-3 text-left">Latency</th>
                  <th className="px-6 py-3 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-700/40">
                {packets.map((pkt) => (
                  <tr key={pkt.seq} className="hover:bg-zinc-700/20">
                    <td className="px-6 py-2.5 font-bold text-white">#{pkt.seq}</td>
                    <td className="px-6 py-2.5 text-zinc-300">{pkt.bytes} bytes</td>
                    <td className="px-6 py-2.5 text-zinc-300">{pkt.ttl}</td>
                    <td className="px-6 py-2.5 text-indigo-300 font-bold">
                      {pkt.status === "timeout" ? "-" : `${pkt.timeMs} ms`}
                    </td>
                    <td className="px-6 py-2.5 text-right">
                      {pkt.status === "success" ? (
                        <span className="inline-flex items-center gap-1 text-emerald-400">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Reply
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-rose-400">
                          <XCircle className="w-3.5 h-3.5" /> Timeout
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
