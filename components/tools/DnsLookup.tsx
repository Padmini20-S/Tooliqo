"use client";

import React, { useState } from "react";
import { Search, Server, Globe, AlertCircle, Copy, Check, Filter } from "lucide-react";

export default function DnsLookup() {
  const [domain, setDomain] = useState("");
  const [recordType, setRecordType] = useState("ALL");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any[] | null>(null);
  const [error, setError] = useState("");
  const [copiedId, setCopiedId] = useState<number | null>(null);

  const recordTypes = ["ALL", "A", "AAAA", "MX", "NS", "CNAME", "TXT", "SOA"];

  const handleLookup = () => {
    if (!domain.trim()) {
      setError("Please enter a valid domain name.");
      return;
    }
    
    setError("");
    setLoading(true);
    setResults(null);

    // Simulate API call with realistic DNS data
    setTimeout(() => {
      setLoading(false);
      
      const allRecords = [
        { id: 1, type: "A", name: domain, value: "142.250.190.46", ttl: 300, class: "IN" },
        { id: 2, type: "A", name: domain, value: "142.250.190.47", ttl: 300, class: "IN" },
        { id: 3, type: "AAAA", name: domain, value: "2607:f8b0:4009:81a::200e", ttl: 300, class: "IN" },
        { id: 4, type: "MX", name: domain, value: "10 aspmx.l.google.com.", ttl: 3600, class: "IN" },
        { id: 5, type: "MX", name: domain, value: "20 alt1.aspmx.l.google.com.", ttl: 3600, class: "IN" },
        { id: 6, type: "NS", name: domain, value: "ns1.google.com.", ttl: 86400, class: "IN" },
        { id: 7, type: "NS", name: domain, value: "ns2.google.com.", ttl: 86400, class: "IN" },
        { id: 8, type: "TXT", name: domain, value: '"v=spf1 include:_spf.google.com ~all"', ttl: 3600, class: "IN" },
        { id: 9, type: "SOA", name: domain, value: "ns1.google.com. dns-admin.google.com. 523624467 900 900 1800 60", ttl: 60, class: "IN" }
      ];

      const filteredRecords = recordType === "ALL" 
        ? allRecords 
        : allRecords.filter(r => r.type === recordType);

      if (filteredRecords.length === 0) {
        setError(`No ${recordType} records found for ${domain}`);
        setResults([]);
      } else {
        setResults(filteredRecords);
      }
    }, 1200);
  };

  const copyToClipboard = (text: string, id: number) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      A: "bg-blue-900/40 text-blue-300 border-blue-700/50",
      AAAA: "bg-indigo-900/40 text-indigo-300 border-indigo-700/50",
      MX: "bg-purple-900/40 text-purple-300 border-purple-700/50",
      NS: "bg-green-900/40 text-green-300 border-green-700/50",
      CNAME: "bg-yellow-900/40 text-yellow-300 border-yellow-700/50",
      TXT: "bg-zinc-700/50 text-zinc-300 border-zinc-600",
      SOA: "bg-rose-900/40 text-rose-300 border-rose-700/50",
    };
    return colors[type] || "bg-zinc-800 text-zinc-300 border-zinc-700";
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-zinc-900 border border-zinc-800 rounded-2xl shadow-xl">
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-bold text-white mb-2 flex items-center justify-center gap-2">
          <Server className="w-6 h-6 text-indigo-400" />
          DNS Lookup
        </h2>
        <p className="text-zinc-400">Query DNS records for any domain name to troubleshoot and verify configurations.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-8 bg-zinc-800/30 p-4 rounded-xl border border-zinc-800/80">
        <div className="flex-1 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Globe className="h-5 w-5 text-zinc-500" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-3 border border-zinc-700 rounded-xl leading-5 bg-zinc-800 text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Enter domain (e.g., example.com)"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleLookup()}
          />
        </div>
        
        <div className="relative md:w-48">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Filter className="h-4 w-4 text-zinc-500" />
          </div>
          <select
            value={recordType}
            onChange={(e) => setRecordType(e.target.value)}
            className="block w-full pl-9 pr-10 py-3 border border-zinc-700 rounded-xl bg-zinc-800 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm appearance-none"
          >
            {recordTypes.map(type => (
              <option key={type} value={type}>{type} Records</option>
            ))}
          </select>
        </div>

        <button
          onClick={handleLookup}
          disabled={loading}
          className="flex items-center justify-center gap-2 px-6 py-3 border border-transparent text-sm font-medium rounded-xl shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 focus:ring-offset-zinc-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <Search className="w-5 h-5" />
          )}
          {loading ? "Querying..." : "Lookup"}
        </button>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-900/20 border border-red-500/30 rounded-xl flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
          <p className="text-red-300 text-sm">{error}</p>
        </div>
      )}

      {results && results.length > 0 && (
        <div className="bg-zinc-800/40 border border-zinc-700/80 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-zinc-700/80">
              <thead className="bg-zinc-800/80">
                <tr>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-zinc-300 uppercase tracking-wider w-24">Type</th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-zinc-300 uppercase tracking-wider">Name</th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-zinc-300 uppercase tracking-wider">Value</th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-zinc-300 uppercase tracking-wider w-24">TTL</th>
                  <th scope="col" className="px-6 py-4 text-right text-xs font-semibold text-zinc-300 uppercase tracking-wider w-24">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-700/50 bg-zinc-800/20">
                {results.map((record) => (
                  <tr key={record.id} className="hover:bg-zinc-700/30 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2.5 py-1 text-xs font-medium rounded border ${getTypeColor(record.type)}`}>
                        {record.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-300 font-medium">
                      {record.name}
                    </td>
                    <td className="px-6 py-4 text-sm text-zinc-300 font-mono break-all max-w-md">
                      {record.value}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-400">
                      {record.ttl}s
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => copyToClipboard(record.value, record.id)}
                        className="text-zinc-400 hover:text-white transition-colors p-1.5 rounded-md hover:bg-zinc-700"
                        title="Copy Value"
                      >
                        {copiedId === record.id ? (
                          <Check className="w-4 h-4 text-green-400" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="bg-zinc-800/80 px-6 py-3 border-t border-zinc-700/80 flex items-center justify-between text-xs text-zinc-400">
            <span>Showing {results.length} DNS record{results.length !== 1 ? 's' : ''}</span>
            <span>Class: IN (Internet)</span>
          </div>
        </div>
      )}
    </div>
  );
}
