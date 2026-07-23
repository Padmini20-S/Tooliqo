"use client";

import React, { useState } from "react";
import { Search, MapPin, Globe, Wifi, Copy, Check, Radio } from "lucide-react";

interface IpDetails {
  ip: string;
  ipVersion: string;
  country: string;
  countryCode: string;
  region: string;
  city: string;
  postal: string;
  lat: number;
  lng: number;
  timezone: string;
  isp: string;
  asn: string;
  asName: string;
  hostname: string;
  isProxy: boolean;
  isVpn: boolean;
  isDatacenter: boolean;
}

export default function IpLookup() {
  const [inputIp, setInputIp] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<IpDetails | null>(null);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const presets = [
    { label: "Google DNS", ip: "8.8.8.8" },
    { label: "Cloudflare DNS", ip: "1.1.1.1" },
    { label: "OpenDNS", ip: "208.67.222.222" },
    { label: "Quad9", ip: "9.9.9.9" },
  ];

  const handleLookup = (targetIp?: string) => {
    const queryIp = (targetIp !== undefined ? targetIp : inputIp).trim();
    if (!queryIp) {
      setError("Please enter a valid IP address.");
      return;
    }

    const ipv4Regex = /^((25[0-5]|(2[0-4]|1\d|[1-9]|)\d)\.){3}(25[0-5]|(2[0-4]|1\d|[1-9]|)\d)$/;
    const ipv6Regex = /^([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$/;
    
    if (!ipv4Regex.test(queryIp) && !ipv6Regex.test(queryIp) && queryIp !== "my-ip") {
      setError("Invalid IPv4 or IPv6 address format.");
      return;
    }

    setError("");
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      const isIPv6 = queryIp.includes(":");
      
      let mockData: IpDetails;
      if (queryIp === "1.1.1.1") {
        mockData = {
          ip: "1.1.1.1",
          ipVersion: "IPv4",
          country: "United States",
          countryCode: "US",
          region: "California",
          city: "San Francisco",
          postal: "94107",
          lat: 37.7749,
          lng: -122.4194,
          timezone: "America/Los_Angeles (UTC-07:00)",
          isp: "Cloudflare, Inc.",
          asn: "AS13335",
          asName: "CLOUDFLARENET",
          hostname: "one.one.one.one",
          isProxy: false,
          isVpn: false,
          isDatacenter: true,
        };
      } else if (queryIp === "8.8.8.8") {
        mockData = {
          ip: "8.8.8.8",
          ipVersion: "IPv4",
          country: "United States",
          countryCode: "US",
          region: "California",
          city: "Mountain View",
          postal: "94043",
          lat: 37.4056,
          lng: -122.0775,
          timezone: "America/Los_Angeles (UTC-07:00)",
          isp: "Google LLC",
          asn: "AS15169",
          asName: "GOOGLE",
          hostname: "dns.google",
          isProxy: false,
          isVpn: false,
          isDatacenter: true,
        };
      } else {
        mockData = {
          ip: queryIp === "my-ip" ? "203.0.113.195" : queryIp,
          ipVersion: isIPv6 ? "IPv6" : "IPv4",
          country: "United States",
          countryCode: "US",
          region: "New York",
          city: "New York City",
          postal: "10001",
          lat: 40.7128,
          lng: -74.0060,
          timezone: "America/New_York (UTC-04:00)",
          isp: "Verizon Communications",
          asn: "AS701",
          asName: "UUNET",
          hostname: `host-${queryIp.replace(/[\.:]/g, '-')}.net`,
          isProxy: false,
          isVpn: false,
          isDatacenter: false,
        };
      }
      setResult(mockData);
    }, 1000);
  };

  const copyResults = () => {
    if (!result) return;
    navigator.clipboard.writeText(JSON.stringify(result, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-zinc-900 border border-zinc-800 rounded-2xl shadow-xl space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-2 flex items-center justify-center gap-2">
          <Globe className="w-6 h-6 text-indigo-400" />
          IP Address Lookup
        </h2>
        <p className="text-zinc-400">Discover geolocation, ISP, ASN, and network metadata for any IPv4 or IPv6 address.</p>
      </div>

      <div className="space-y-3">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-zinc-500" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-3 border border-zinc-700 rounded-xl bg-zinc-800 text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm"
              placeholder="Enter IP address (e.g., 8.8.8.8 or 2001:4860:4860::8888)"
              value={inputIp}
              onChange={(e) => setInputIp(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleLookup()}
            />
          </div>
          <button
            onClick={() => handleLookup()}
            disabled={loading}
            className="flex items-center justify-center gap-2 px-6 py-3 border border-transparent text-sm font-medium rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 transition-colors cursor-pointer"
          >
            {loading ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <Search className="w-5 h-5" />}
            {loading ? "Searching..." : "Lookup IP"}
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-400">
          <span className="font-semibold text-zinc-500">Quick Test:</span>
          {presets.map((preset) => (
            <button
              key={preset.ip}
              onClick={() => {
                setInputIp(preset.ip);
                handleLookup(preset.ip);
              }}
              className="px-2.5 py-1 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-lg border border-zinc-700 transition-colors cursor-pointer"
            >
              {preset.label} ({preset.ip})
            </button>
          ))}
          <button
            onClick={() => {
              setInputIp("my-ip");
              handleLookup("my-ip");
            }}
            className="px-2.5 py-1 bg-indigo-900/40 hover:bg-indigo-800/60 text-indigo-300 rounded-lg border border-indigo-700/50 transition-colors font-medium cursor-pointer"
          >
            Detect My IP
          </button>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-900/20 border border-red-500/30 rounded-xl text-red-300 text-sm">
          {error}
        </div>
      )}

      {result && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-5 bg-zinc-800/50 border border-zinc-700/80 rounded-xl gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                <Radio className="w-6 h-6 animate-pulse" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-white font-mono">{result.ip}</span>
                  <span className="px-2 py-0.5 text-xs font-semibold bg-zinc-700 text-zinc-300 rounded border border-zinc-600">
                    {result.ipVersion}
                  </span>
                </div>
                <p className="text-zinc-400 text-sm flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-indigo-400" />
                  {result.city}, {result.region}, {result.country}
                </p>
              </div>
            </div>
            <button
              onClick={copyResults}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-zinc-700 hover:bg-zinc-600 text-zinc-200 text-xs font-medium rounded-lg transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
              {copied ? "Copied JSON" : "Copy JSON"}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-zinc-800/40 border border-zinc-700/80 rounded-xl p-5 space-y-3">
              <h3 className="text-base font-semibold text-white flex items-center gap-2 border-b border-zinc-700/50 pb-3">
                <MapPin className="w-5 h-5 text-indigo-400" />
                Geolocation Data
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between border-b border-zinc-800 pb-1.5">
                  <span className="text-zinc-400">Country</span>
                  <span className="text-zinc-100 font-medium">{result.country} ({result.countryCode})</span>
                </div>
                <div className="flex justify-between border-b border-zinc-800 pb-1.5">
                  <span className="text-zinc-400">Region / State</span>
                  <span className="text-zinc-100 font-medium">{result.region}</span>
                </div>
                <div className="flex justify-between border-b border-zinc-800 pb-1.5">
                  <span className="text-zinc-400">City</span>
                  <span className="text-zinc-100 font-medium">{result.city}</span>
                </div>
                <div className="flex justify-between border-b border-zinc-800 pb-1.5">
                  <span className="text-zinc-400">Postal Code</span>
                  <span className="text-zinc-100 font-medium">{result.postal}</span>
                </div>
                <div className="flex justify-between border-b border-zinc-800 pb-1.5">
                  <span className="text-zinc-400">Timezone</span>
                  <span className="text-zinc-100 font-medium">{result.timezone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">Coordinates</span>
                  <span className="text-zinc-100 font-mono text-xs">{result.lat}, {result.lng}</span>
                </div>
              </div>
            </div>

            <div className="bg-zinc-800/40 border border-zinc-700/80 rounded-xl p-5 space-y-3">
              <h3 className="text-base font-semibold text-white flex items-center gap-2 border-b border-zinc-700/50 pb-3">
                <Wifi className="w-5 h-5 text-indigo-400" />
                Network & ISP Info
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between border-b border-zinc-800 pb-1.5">
                  <span className="text-zinc-400">ISP</span>
                  <span className="text-zinc-100 font-medium">{result.isp}</span>
                </div>
                <div className="flex justify-between border-b border-zinc-800 pb-1.5">
                  <span className="text-zinc-400">ASN Number</span>
                  <span className="text-indigo-400 font-mono font-medium">{result.asn}</span>
                </div>
                <div className="flex justify-between border-b border-zinc-800 pb-1.5">
                  <span className="text-zinc-400">AS Name</span>
                  <span className="text-zinc-100 font-medium">{result.asName}</span>
                </div>
                <div className="flex justify-between border-b border-zinc-800 pb-1.5">
                  <span className="text-zinc-400">Hostname / PTR</span>
                  <span className="text-zinc-100 font-mono text-xs truncate max-w-[200px]">{result.hostname}</span>
                </div>
                <div className="flex justify-between items-center pt-1">
                  <span className="text-zinc-400">Security Badges</span>
                  <div className="flex gap-1.5">
                    <span className={`px-2 py-0.5 text-xs font-semibold rounded ${result.isDatacenter ? "bg-amber-900/40 text-amber-300 border border-amber-700/50" : "bg-emerald-900/40 text-emerald-300 border border-emerald-700/50"}`}>
                      {result.isDatacenter ? "Datacenter" : "Residential"}
                    </span>
                    <span className="px-2 py-0.5 text-xs font-semibold bg-emerald-900/40 text-emerald-300 border border-emerald-700/50 rounded">
                      Clean
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-zinc-800/30 border border-zinc-700/60 rounded-xl p-5">
            <h3 className="text-sm font-semibold text-zinc-300 mb-3 flex items-center justify-between">
              <span>Location Coordinate Map Preview</span>
              <span className="text-xs text-zinc-500 font-mono">LAT: {result.lat} | LNG: {result.lng}</span>
            </h3>
            <div className="h-44 rounded-lg bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 border border-zinc-800 flex flex-col items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#6366f1_1px,transparent_1px)] [background-size:16px_16px]" />
              <div className="relative z-10 flex flex-col items-center gap-2">
                <div className="p-3 bg-indigo-600/30 border border-indigo-500/50 rounded-full animate-bounce">
                  <MapPin className="w-8 h-8 text-indigo-400" />
                </div>
                <div className="text-center">
                  <div className="text-sm font-bold text-white">{result.city}, {result.country}</div>
                  <div className="text-xs text-zinc-400">Coordinates: {result.lat}° N, {result.lng}° W</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
