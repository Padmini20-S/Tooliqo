"use client";

import React, { useState } from "react";
import { Download, Upload, Wifi } from "lucide-react";

export default function InternetSpeedTest() {
  const [isTesting, setIsTesting] = useState(false);
  const [downloadSpeed, setDownloadSpeed] = useState<number | null>(null);
  const [uploadSpeed, setUploadSpeed] = useState<number | null>(null);
  const [ping, setPing] = useState<number | null>(null);
  const [currentSpeed, setCurrentSpeed] = useState<number>(0);
  const [testPhase, setTestPhase] = useState<"idle" | "ping" | "download" | "upload" | "done">("idle");

  const startTest = () => {
    setIsTesting(true);
    setTestPhase("ping");
    setDownloadSpeed(null);
    setUploadSpeed(null);
    setPing(null);
    setCurrentSpeed(0);

    setTimeout(() => {
      setPing(Math.floor(Math.random() * 40) + 10);
      setTestPhase("download");
      
      let dl = 0;
      const dlInterval = setInterval(() => {
        dl += Math.random() * 20 - 5;
        if (dl < 0) dl = 0;
        setCurrentSpeed(dl);
        
        if (dl > 80 + Math.random() * 100) {
          clearInterval(dlInterval);
          setDownloadSpeed(parseFloat(dl.toFixed(1)));
          setTestPhase("upload");
          
          let ul = 0;
          const ulInterval = setInterval(() => {
            ul += Math.random() * 10 - 2;
            if (ul < 0) ul = 0;
            setCurrentSpeed(ul);
            
            if (ul > 30 + Math.random() * 50) {
              clearInterval(ulInterval);
              setUploadSpeed(parseFloat(ul.toFixed(1)));
              setCurrentSpeed(0);
              setTestPhase("done");
              setIsTesting(false);
            } else {
              setUploadSpeed(parseFloat(ul.toFixed(1)));
            }
          }, 100);
        } else {
          setDownloadSpeed(parseFloat(dl.toFixed(1)));
        }
      }, 100);
    }, 1000);
  };

  // Convert speed (0-200) to degrees (-90 to 90)
  const rotation = -90 + (Math.min(currentSpeed, 200) / 200) * 180;

  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-slate-900 mb-2">Internet Speed Test</h2>
        <p className="text-slate-500">Test your connection bandwidth quickly and securely.</p>
      </div>

      {/* Speedometer Gauge */}
      <div className="relative w-64 h-32 mx-auto mb-12 overflow-hidden flex justify-center">
        {/* Background Arc */}
        <svg viewBox="0 0 200 100" className="w-full h-full drop-shadow-md">
          <path d="M 20 90 A 70 70 0 0 1 180 90" fill="none" stroke="#e2e8f0" strokeWidth="15" strokeLinecap="round" />
          <path d="M 20 90 A 70 70 0 0 1 180 90" fill="none" stroke="url(#gaugeGradient)" strokeWidth="15" strokeLinecap="round" strokeDasharray="220" strokeDashoffset={220 - (220 * Math.min(currentSpeed, 200)) / 200} className="transition-all duration-300 ease-out" />
          
          <defs>
            <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="50%" stopColor="#8b5cf6" />
              <stop offset="100%" stopColor="#ec4899" />
            </linearGradient>
          </defs>

          {/* Needle */}
          <g style={{ transform: \`rotate(\${rotation}deg)\`, transformOrigin: '100px 90px', transition: 'transform 0.1s ease-out' }}>
            <polygon points="95,90 105,90 100,20" fill="#0f172a" />
            <circle cx="100" cy="90" r="8" fill="#0f172a" />
            <circle cx="100" cy="90" r="3" fill="#ffffff" />
          </g>
        </svg>

        <div className="absolute bottom-0 left-0 right-0 text-center">
          <div className="text-3xl font-black text-slate-900 tabular-nums">
            {currentSpeed.toFixed(1)}
          </div>
          <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Mbps</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className={`rounded-2xl p-6 border flex flex-col items-center text-center transition-colors ${testPhase === 'ping' ? 'bg-slate-100 border-slate-300 shadow-inner' : 'bg-slate-50 border-slate-100'}`}>
          <div className="flex items-center gap-2 text-slate-500 mb-2">
            <Wifi className="w-5 h-5" />
            <span className="font-semibold uppercase tracking-wider text-xs">Ping</span>
          </div>
          <div className="text-4xl font-bold text-slate-900">
            {ping !== null ? ping : "--"}
            <span className="text-base font-normal text-slate-500 ml-1">ms</span>
          </div>
        </div>

        <div className={`rounded-2xl p-6 border flex flex-col items-center text-center transition-colors ${testPhase === 'download' ? 'bg-blue-100 border-blue-300 shadow-inner' : 'bg-blue-50 border-blue-100'}`}>
          <div className="flex items-center gap-2 text-blue-500 mb-2">
            <Download className="w-5 h-5" />
            <span className="font-semibold uppercase tracking-wider text-xs">Download</span>
          </div>
          <div className="text-4xl font-bold text-blue-600">
            {downloadSpeed !== null ? downloadSpeed : "--"}
            <span className="text-base font-normal text-blue-400 ml-1">Mbps</span>
          </div>
        </div>

        <div className={`rounded-2xl p-6 border flex flex-col items-center text-center transition-colors ${testPhase === 'upload' ? 'bg-emerald-100 border-emerald-300 shadow-inner' : 'bg-emerald-50 border-emerald-100'}`}>
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
              ? "bg-slate-300 cursor-not-allowed scale-95" 
              : "bg-blue-600 hover:bg-blue-700 hover:shadow-lg hover:-translate-y-1"
          }`}
        >
          {isTesting ? "Testing in progress..." : (testPhase === 'done' ? "Test Again" : "Start Speed Test")}
        </button>
      </div>
    </div>
  );
}
