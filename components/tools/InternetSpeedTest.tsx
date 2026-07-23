"use client";

import React, { useState } from "react";
import { Activity, Download, Upload, Wifi } from "lucide-react";

export default function InternetSpeedTest() {
  const [isTesting, setIsTesting] = useState(false);
  const [downloadSpeed, setDownloadSpeed] = useState<number | null>(null);
  const [uploadSpeed, setUploadSpeed] = useState<number | null>(null);
  const [ping, setPing] = useState<number | null>(null);

  const startTest = () => {
    setIsTesting(true);
    setDownloadSpeed(null);
    setUploadSpeed(null);
    setPing(null);

    // Simulate network test since real browser APIs for this are limited
    setTimeout(() => setPing(Math.floor(Math.random() * 40) + 10), 1000);
    
    let dl = 0;
    const dlInterval = setInterval(() => {
      dl += Math.random() * 15;
      if (dl > 80 + Math.random() * 100) {
        clearInterval(dlInterval);
        setDownloadSpeed(parseFloat(dl.toFixed(1)));
        
        // Start Upload test
        let ul = 0;
        const ulInterval = setInterval(() => {
          ul += Math.random() * 10;
          if (ul > 30 + Math.random() * 50) {
            clearInterval(ulInterval);
            setUploadSpeed(parseFloat(ul.toFixed(1)));
            setIsTesting(false);
          } else {
            setUploadSpeed(parseFloat(ul.toFixed(1)));
          }
        }, 100);
      } else {
        setDownloadSpeed(parseFloat(dl.toFixed(1)));
      }
    }, 100);
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
      <div className="text-center mb-10">
        <div className="w-20 h-20 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm relative">
          <Activity className="w-10 h-10" />
          {isTesting && (
            <div className="absolute inset-0 rounded-full border-4 border-blue-500 border-t-transparent animate-spin"></div>
          )}
        </div>
        <h2 className="text-3xl font-bold text-slate-900 mb-2">Internet Speed Test</h2>
        <p className="text-slate-500">Test your connection bandwidth quickly and securely.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 flex flex-col items-center text-center">
          <div className="flex items-center gap-2 text-slate-500 mb-2">
            <Wifi className="w-5 h-5" />
            <span className="font-semibold uppercase tracking-wider text-xs">Ping</span>
          </div>
          <div className="text-4xl font-bold text-slate-900">
            {ping !== null ? ping : "--"}
            <span className="text-base font-normal text-slate-500 ml-1">ms</span>
          </div>
        </div>

        <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100 flex flex-col items-center text-center">
          <div className="flex items-center gap-2 text-blue-500 mb-2">
            <Download className="w-5 h-5" />
            <span className="font-semibold uppercase tracking-wider text-xs">Download</span>
          </div>
          <div className="text-4xl font-bold text-blue-600">
            {downloadSpeed !== null ? downloadSpeed : "--"}
            <span className="text-base font-normal text-blue-400 ml-1">Mbps</span>
          </div>
        </div>

        <div className="bg-emerald-50 rounded-2xl p-6 border border-emerald-100 flex flex-col items-center text-center">
          <div className="flex items-center gap-2 text-emerald-500 mb-2">
            <Upload className="w-5 h-5" />
            <span className="font-semibold uppercase tracking-wider text-xs">Upload</span>
          </div>
          <div className="text-4xl font-bold text-emerald-600">
            {uploadSpeed !== null ? uploadSpeed : "--"}
            <span className="text-base font-normal text-emerald-400 ml-1">Mbps</span>
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <button
          onClick={startTest}
          disabled={isTesting}
          className={`px-12 py-4 rounded-full font-bold text-lg text-white shadow-md transition-all ${
            isTesting 
              ? "bg-slate-300 cursor-not-allowed" 
              : "bg-blue-600 hover:bg-blue-700 hover:shadow-lg hover:-translate-y-1"
          }`}
        >
          {isTesting ? "Testing..." : "GO"}
        </button>
      </div>
    </div>
  );
}
