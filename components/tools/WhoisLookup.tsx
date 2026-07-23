"use client";

import React, { useState } from "react";
import { Search, Server, Globe, Calendar, User, Shield, AlertCircle, Copy, Check } from "lucide-react";

export default function WhoisLookup() {
  const [domain, setDomain] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const handleLookup = () => {
    if (!domain.trim()) {
      setError("Please enter a domain name.");
      return;
    }
    
    setError("");
    setLoading(true);
    setResult(null);

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setResult({
        domain: domain,
        registrar: "GoDaddy.com, LLC",
        createdDate: "1997-09-15T04:00:00Z",
        updatedDate: "2023-09-09T09:10:42Z",
        expiresDate: "2028-09-14T04:00:00Z",
        nameServers: [
          "NS1.GOOGLE.COM",
          "NS2.GOOGLE.COM",
          "NS3.GOOGLE.COM",
          "NS4.GOOGLE.COM"
        ],
        status: [
          "clientDeleteProhibited",
          "clientTransferProhibited",
          "clientUpdateProhibited",
          "serverDeleteProhibited",
          "serverTransferProhibited",
          "serverUpdateProhibited"
        ],
        registrant: {
          organization: "Google LLC",
          state: "CA",
          country: "US"
        },
        rawText: `Domain Name: ${domain.toUpperCase()}
Registry Domain ID: 2138514_DOMAIN_COM-VRSN
Registrar WHOIS Server: whois.markmonitor.com
Registrar URL: http://www.markmonitor.com
Updated Date: 2023-09-09T09:10:42Z
Creation Date: 1997-09-15T04:00:00Z
Registry Expiry Date: 2028-09-14T04:00:00Z
Registrar: MarkMonitor Inc.
Registrar IANA ID: 292
Registrar Abuse Contact Email: abusecomplaints@markmonitor.com
Registrar Abuse Contact Phone: +1.2086859797
Domain Status: clientDeleteProhibited https://icann.org/epp#clientDeleteProhibited
Domain Status: clientTransferProhibited https://icann.org/epp#clientTransferProhibited
Domain Status: clientUpdateProhibited https://icann.org/epp#clientUpdateProhibited
Domain Status: serverDeleteProhibited https://icann.org/epp#serverDeleteProhibited
Domain Status: serverTransferProhibited https://icann.org/epp#serverTransferProhibited
Domain Status: serverUpdateProhibited https://icann.org/epp#serverUpdateProhibited
Name Server: NS1.GOOGLE.COM
Name Server: NS2.GOOGLE.COM
Name Server: NS3.GOOGLE.COM
Name Server: NS4.GOOGLE.COM
DNSSEC: unsigned
URL of the ICANN Whois Inaccuracy Complaint Form: https://www.icann.org/wicf/
>>> Last update of whois database: 2023-10-25T14:15:23Z <<<`
      });
    }, 1500);
  };

  const copyRaw = () => {
    if (result) {
      navigator.clipboard.writeText(result.rawText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-zinc-900 border border-zinc-800 rounded-2xl shadow-xl">
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-bold text-white mb-2 flex items-center justify-center gap-2">
          <Globe className="w-6 h-6 text-indigo-400" />
          WHOIS Lookup
        </h2>
        <p className="text-zinc-400">Discover registration details, ownership information, and name servers for any domain.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="flex-1 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-zinc-500" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-3 border border-zinc-700 rounded-xl leading-5 bg-zinc-800 text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Enter domain name (e.g., google.com)"
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
          {loading ? "Searching..." : "Lookup"}
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-zinc-800/50 border border-zinc-700 rounded-xl p-5">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Shield className="w-5 h-5 text-indigo-400" />
                Domain Information
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between border-b border-zinc-700/50 pb-2">
                  <span className="text-zinc-400 text-sm">Domain</span>
                  <span className="text-white font-medium">{result.domain}</span>
                </div>
                <div className="flex justify-between border-b border-zinc-700/50 pb-2">
                  <span className="text-zinc-400 text-sm">Registrar</span>
                  <span className="text-white font-medium">{result.registrar}</span>
                </div>
                <div className="flex justify-between border-b border-zinc-700/50 pb-2">
                  <span className="text-zinc-400 text-sm">Registered On</span>
                  <span className="text-white font-medium">{formatDate(result.createdDate)}</span>
                </div>
                <div className="flex justify-between border-b border-zinc-700/50 pb-2">
                  <span className="text-zinc-400 text-sm">Expires On</span>
                  <span className="text-white font-medium">{formatDate(result.expiresDate)}</span>
                </div>
                <div className="flex justify-between pb-2">
                  <span className="text-zinc-400 text-sm">Updated On</span>
                  <span className="text-white font-medium">{formatDate(result.updatedDate)}</span>
                </div>
              </div>
            </div>

            <div className="bg-zinc-800/50 border border-zinc-700 rounded-xl p-5">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <User className="w-5 h-5 text-indigo-400" />
                Registrant Details
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between border-b border-zinc-700/50 pb-2">
                  <span className="text-zinc-400 text-sm">Organization</span>
                  <span className="text-white font-medium">{result.registrant.organization}</span>
                </div>
                <div className="flex justify-between border-b border-zinc-700/50 pb-2">
                  <span className="text-zinc-400 text-sm">State/Province</span>
                  <span className="text-white font-medium">{result.registrant.state}</span>
                </div>
                <div className="flex justify-between pb-2">
                  <span className="text-zinc-400 text-sm">Country</span>
                  <span className="text-white font-medium">{result.registrant.country}</span>
                </div>
              </div>

              <h3 className="text-lg font-semibold text-white mt-6 mb-4 flex items-center gap-2">
                <Server className="w-5 h-5 text-indigo-400" />
                Name Servers
              </h3>
              <div className="flex flex-wrap gap-2">
                {result.nameServers.map((ns: string, index: number) => (
                  <span key={index} className="px-3 py-1 bg-zinc-700/50 border border-zinc-600 rounded-lg text-sm text-zinc-300">
                    {ns}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-zinc-800/50 border border-zinc-700 rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                <Calendar className="w-5 h-5 text-indigo-400" />
                Raw WHOIS Data
              </h3>
              <button
                onClick={copyRaw}
                className="flex items-center gap-1.5 px-3 py-1.5 text-sm bg-zinc-700 hover:bg-zinc-600 text-zinc-200 rounded-lg transition-colors"
              >
                {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
            <pre className="bg-black/40 p-4 rounded-lg overflow-x-auto text-sm text-zinc-300 font-mono whitespace-pre-wrap">
              {result.rawText}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}
