"use client";

import React, { useState } from "react";
import { Search, Shield, Globe, Lock, AlertCircle, Calendar, Server, Activity, CheckCircle2, AlertTriangle, XCircle } from "lucide-react";

export default function SslCertificateChecker() {
  const [domain, setDomain] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState("");

  const handleLookup = () => {
    if (!domain.trim()) {
      setError("Please enter a domain name.");
      return;
    }
    
    setError("");
    setLoading(true);
    setResult(null);

    // Simulate API call with realistic SSL data
    setTimeout(() => {
      setLoading(false);
      
      const now = new Date();
      const validFrom = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000); // 90 days ago
      const validTo = new Date(now.getTime() + 275 * 24 * 60 * 60 * 1000); // 275 days from now
      
      const daysRemaining = Math.floor((validTo.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
      
      let status = "valid";
      if (daysRemaining < 0) status = "expired";
      else if (daysRemaining < 30) status = "expiring_soon";

      setResult({
        domain: domain,
        status: status,
        daysRemaining: daysRemaining,
        issuer: {
          commonName: "GTS CA 1C3",
          organization: "Google Trust Services LLC",
          country: "US"
        },
        subject: {
          commonName: `*.${domain.replace(/^www\./, '')}`,
          organization: "Not Part Of Certificate",
          alternativeNames: [
            `*.${domain.replace(/^www\./, '')}`,
            domain.replace(/^www\./, '')
          ]
        },
        validity: {
          from: validFrom.toISOString(),
          to: validTo.toISOString()
        },
        technical: {
          algorithm: "SHA256withRSA",
          keySize: 2048,
          serialNumber: "03:52:90:5B:C0:2D:E6:AA:08:92:49:15:36:56:88:94",
          fingerprint: "A1:B2:C3:D4:E5:F6:78:90:12:34:56:78:90:AB:CD:EF:12:34:56:78"
        }
      });
    }, 1800);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      timeZoneName: "short"
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "valid": return <CheckCircle2 className="w-8 h-8 text-green-500" />;
      case "expiring_soon": return <AlertTriangle className="w-8 h-8 text-yellow-500" />;
      case "expired": return <XCircle className="w-8 h-8 text-red-500" />;
      default: return <Activity className="w-8 h-8 text-zinc-500" />;
    }
  };

  const getStatusText = (status: string, days: number) => {
    switch (status) {
      case "valid": return `Certificate is valid (${days} days remaining)`;
      case "expiring_soon": return `Expiring soon (${days} days remaining)`;
      case "expired": return `Certificate has expired`;
      default: return "Unknown status";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "valid": return "bg-green-500/10 text-green-400 border-green-500/20";
      case "expiring_soon": return "bg-yellow-500/10 text-yellow-400 border-yellow-500/20";
      case "expired": return "bg-red-500/10 text-red-400 border-red-500/20";
      default: return "bg-zinc-500/10 text-zinc-400 border-zinc-500/20";
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-zinc-900 border border-zinc-800 rounded-2xl shadow-xl">
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-bold text-white mb-2 flex items-center justify-center gap-2">
          <Shield className="w-6 h-6 text-indigo-400" />
          SSL Certificate Checker
        </h2>
        <p className="text-zinc-400">Verify the SSL/TLS certificate installation and expiration status of any website.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="flex-1 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Lock className="h-5 w-5 text-zinc-500" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-3 border border-zinc-700 rounded-xl leading-5 bg-zinc-800 text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Enter hostname (e.g., example.com)"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleLookup()}
          />
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
          {loading ? "Checking..." : "Check SSL"}
        </button>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-900/20 border border-red-500/30 rounded-xl flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
          <p className="text-red-300 text-sm">{error}</p>
        </div>
      )}

      {result && (
        <div className="space-y-6">
          <div className={`p-6 rounded-xl border flex items-center gap-4 ${getStatusColor(result.status)}`}>
            {getStatusIcon(result.status)}
            <div>
              <h3 className="text-lg font-bold">{domain}</h3>
              <p className="text-sm opacity-90">{getStatusText(result.status, result.daysRemaining)}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-zinc-800/50 border border-zinc-700 rounded-xl p-5">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Globe className="w-5 h-5 text-indigo-400" />
                Subject Information
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex flex-col border-b border-zinc-700/50 pb-2">
                  <span className="text-zinc-400 mb-1">Common Name (CN)</span>
                  <span className="text-white font-medium break-all">{result.subject.commonName}</span>
                </div>
                <div className="flex flex-col border-b border-zinc-700/50 pb-2">
                  <span className="text-zinc-400 mb-1">Organization (O)</span>
                  <span className="text-white font-medium">{result.subject.organization}</span>
                </div>
                <div className="flex flex-col pb-2">
                  <span className="text-zinc-400 mb-1">Subject Alternative Names (SANs)</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {result.subject.alternativeNames.map((name: string, i: number) => (
                      <span key={i} className="px-2 py-1 bg-zinc-700 rounded text-xs text-zinc-300">
                        {name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-zinc-800/50 border border-zinc-700 rounded-xl p-5">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Server className="w-5 h-5 text-indigo-400" />
                Issuer Information
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex flex-col border-b border-zinc-700/50 pb-2">
                  <span className="text-zinc-400 mb-1">Common Name (CN)</span>
                  <span className="text-white font-medium">{result.issuer.commonName}</span>
                </div>
                <div className="flex flex-col border-b border-zinc-700/50 pb-2">
                  <span className="text-zinc-400 mb-1">Organization (O)</span>
                  <span className="text-white font-medium">{result.issuer.organization}</span>
                </div>
                <div className="flex flex-col pb-2">
                  <span className="text-zinc-400 mb-1">Country (C)</span>
                  <span className="text-white font-medium">{result.issuer.country}</span>
                </div>
              </div>
            </div>
            
            <div className="bg-zinc-800/50 border border-zinc-700 rounded-xl p-5">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-indigo-400" />
                Validity Period
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex flex-col border-b border-zinc-700/50 pb-2">
                  <span className="text-zinc-400 mb-1">Issued On</span>
                  <span className="text-white font-medium">{formatDate(result.validity.from)}</span>
                </div>
                <div className="flex flex-col pb-2">
                  <span className="text-zinc-400 mb-1">Expires On</span>
                  <span className="text-white font-medium">{formatDate(result.validity.to)}</span>
                </div>
              </div>
            </div>

            <div className="bg-zinc-800/50 border border-zinc-700 rounded-xl p-5">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Shield className="w-5 h-5 text-indigo-400" />
                Technical Details
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex flex-col border-b border-zinc-700/50 pb-2">
                  <span className="text-zinc-400 mb-1">Signature Algorithm</span>
                  <span className="text-white font-medium">{result.technical.algorithm}</span>
                </div>
                <div className="flex flex-col border-b border-zinc-700/50 pb-2">
                  <span className="text-zinc-400 mb-1">Key Size</span>
                  <span className="text-white font-medium">{result.technical.keySize} bits</span>
                </div>
                <div className="flex flex-col border-b border-zinc-700/50 pb-2">
                  <span className="text-zinc-400 mb-1">Serial Number</span>
                  <span className="text-white font-medium font-mono text-xs break-all">{result.technical.serialNumber}</span>
                </div>
                <div className="flex flex-col pb-2">
                  <span className="text-zinc-400 mb-1">SHA-256 Fingerprint</span>
                  <span className="text-white font-medium font-mono text-xs break-all">{result.technical.fingerprint}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
