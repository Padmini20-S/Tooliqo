"use client";

import React, { useState } from "react";
import { Copy, Trash2, Check, AlertCircle, ShieldCheck, Sparkles, Key, Clock, ShieldAlert } from "lucide-react";

export default function JwtDecoder() {
  const [token, setToken] = useState("");
  const [headerJson, setHeaderJson] = useState("");
  const [payloadJson, setPayloadJson] = useState("");
  const [tokenMeta, setTokenMeta] = useState<{
    alg?: string;
    typ?: string;
    exp?: number;
    iat?: number;
    sub?: string;
    iss?: string;
    isExpired?: boolean;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copiedHeader, setCopiedHeader] = useState(false);
  const [copiedPayload, setCopiedPayload] = useState(false);

  // Sample JWT valid token (expires far in future)
  const sampleJwt = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkFsaWNlIERvZSIsImFkbWluIjp0cnVlLCJpYXQiOjE1MTYyMzkwMjIsImV4cCI6MjUyNDYwODAwMH0.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";

  const base64UrlDecode = (str: string) => {
    let base64 = str.replace(/-/g, "+").replace(/_/g, "/");
    while (base64.length % 4) {
      base64 += "=";
    }
    return decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
  };

  const decodeJwt = (jwtStr: string) => {
    if (!jwtStr.trim()) {
      setHeaderJson("");
      setPayloadJson("");
      setTokenMeta(null);
      setError(null);
      return;
    }

    const parts = jwtStr.trim().split(".");
    if (parts.length !== 3) {
      setError("Invalid JWT string format. JWT must consist of 3 dot-separated parts (Header.Payload.Signature)");
      setHeaderJson("");
      setPayloadJson("");
      setTokenMeta(null);
      return;
    }

    try {
      const headerRaw = base64UrlDecode(parts[0]);
      const payloadRaw = base64UrlDecode(parts[1]);

      const headerObj = JSON.parse(headerRaw);
      const payloadObj = JSON.parse(payloadRaw);

      setHeaderJson(JSON.stringify(headerObj, null, 2));
      setPayloadJson(JSON.stringify(payloadObj, null, 2));

      const now = Math.floor(Date.now() / 1000);
      const isExp = payloadObj.exp ? payloadObj.exp < now : false;

      setTokenMeta({
        alg: headerObj.alg || "Unknown",
        typ: headerObj.typ || "JWT",
        exp: payloadObj.exp,
        iat: payloadObj.iat,
        sub: payloadObj.sub,
        iss: payloadObj.iss,
        isExpired: isExp
      });

      setError(null);
    } catch (err: any) {
      setError(err.message || "Failed to decode JWT base64 payload");
      setHeaderJson("");
      setPayloadJson("");
      setTokenMeta(null);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setToken(val);
    decodeJwt(val);
  };

  const handleLoadSample = () => {
    setToken(sampleJwt);
    decodeJwt(sampleJwt);
  };

  const formatDate = (timestamp?: number) => {
    if (!timestamp) return "N/A";
    return new Date(timestamp * 1000).toLocaleString();
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-violet-500/10 text-violet-600 dark:text-violet-400 rounded-xl">
              <Key className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">JWT Decoder</h1>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">Decode JSON Web Tokens and inspect claims, algorithm, and timestamps</p>
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
                setToken("");
                setHeaderJson("");
                setPayloadJson("");
                setTokenMeta(null);
                setError(null);
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-zinc-100 dark:bg-zinc-800 hover:bg-red-500/10 hover:text-red-600 text-zinc-700 dark:text-zinc-300 rounded-lg transition"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Clear
            </button>
          </div>
        </div>
      </div>

      {/* Input */}
      <div className="flex flex-col space-y-2">
        <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Encoded JWT Token String</label>
        <textarea
          value={token}
          onChange={handleInputChange}
          placeholder="Paste JWT token (e.g. eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...)"
          className="w-full h-28 p-4 font-mono text-sm bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-violet-500 text-zinc-900 dark:text-zinc-100 resize-none shadow-sm break-all"
        />
      </div>

      {error && (
        <div className="flex items-center gap-2 p-4 bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 rounded-xl text-sm font-medium">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Metadata Badges */}
      {tokenMeta && (
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 shadow-sm grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="space-y-1">
            <span className="text-xs text-zinc-500 dark:text-zinc-400">Algorithm</span>
            <div className="font-mono text-sm font-bold text-violet-600 dark:text-violet-400">{tokenMeta.alg}</div>
          </div>
          <div className="space-y-1">
            <span className="text-xs text-zinc-500 dark:text-zinc-400">Status</span>
            <div>
              {tokenMeta.isExpired ? (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-red-500/10 text-red-600 dark:text-red-400">
                  <ShieldAlert className="w-3 h-3" /> Expired
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-green-500/10 text-green-600 dark:text-green-400">
                  <ShieldCheck className="w-3 h-3" /> Active
                </span>
              )}
            </div>
          </div>
          <div className="space-y-1">
            <span className="text-xs text-zinc-500 dark:text-zinc-400">Issued At (iat)</span>
            <div className="flex items-center gap-1 text-xs font-medium text-zinc-800 dark:text-zinc-200">
              <Clock className="w-3.5 h-3.5 text-zinc-400" />
              {formatDate(tokenMeta.iat)}
            </div>
          </div>
          <div className="space-y-1">
            <span className="text-xs text-zinc-500 dark:text-zinc-400">Expiration (exp)</span>
            <div className="flex items-center gap-1 text-xs font-medium text-zinc-800 dark:text-zinc-200">
              <Clock className="w-3.5 h-3.5 text-zinc-400" />
              {formatDate(tokenMeta.exp)}
            </div>
          </div>
        </div>
      )}

      {/* Editor Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Header JSON */}
        <div className="flex flex-col space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Header JSON</label>
            <button
              onClick={async () => {
                if (!headerJson) return;
                await navigator.clipboard.writeText(headerJson);
                setCopiedHeader(true);
                setTimeout(() => setCopiedHeader(false), 2000);
              }}
              disabled={!headerJson}
              className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 disabled:opacity-40 text-zinc-700 dark:text-zinc-300 rounded-lg transition"
            >
              {copiedHeader ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
              {copiedHeader ? "Copied!" : "Copy Header"}
            </button>
          </div>
          <textarea
            readOnly
            value={headerJson}
            placeholder="Header claims will appear here..."
            className="w-full h-80 p-4 font-mono text-sm bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl text-zinc-900 dark:text-zinc-100 resize-none shadow-sm"
          />
        </div>

        {/* Payload JSON */}
        <div className="flex flex-col space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Payload Claims JSON</label>
            <button
              onClick={async () => {
                if (!payloadJson) return;
                await navigator.clipboard.writeText(payloadJson);
                setCopiedPayload(true);
                setTimeout(() => setCopiedPayload(false), 2000);
              }}
              disabled={!payloadJson}
              className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 disabled:opacity-40 text-zinc-700 dark:text-zinc-300 rounded-lg transition"
            >
              {copiedPayload ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
              {copiedPayload ? "Copied!" : "Copy Payload"}
            </button>
          </div>
          <textarea
            readOnly
            value={payloadJson}
            placeholder="Payload claims will appear here..."
            className="w-full h-80 p-4 font-mono text-sm bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl text-zinc-900 dark:text-zinc-100 resize-none shadow-sm"
          />
        </div>
      </div>
    </div>
  );
}
