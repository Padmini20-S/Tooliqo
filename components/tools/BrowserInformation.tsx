"use client";

import React, { useState, useEffect } from "react";
import { Monitor, Globe, Info, HardDrive } from "lucide-react";

export default function BrowserInformation() {
  const [info, setInfo] = useState<any>(null);

  useEffect(() => {
    const getBrowserInfo = () => {
      const ua = navigator.userAgent;
      let browserName = "Unknown";
      if (ua.indexOf("Firefox") > -1) browserName = "Mozilla Firefox";
      else if (ua.indexOf("SamsungBrowser") > -1) browserName = "Samsung Internet";
      else if (ua.indexOf("Opera") > -1 || ua.indexOf("OPR") > -1) browserName = "Opera";
      else if (ua.indexOf("Trident") > -1) browserName = "Microsoft Internet Explorer";
      else if (ua.indexOf("Edge") > -1 || ua.indexOf("Edg") > -1) browserName = "Microsoft Edge";
      else if (ua.indexOf("Chrome") > -1) browserName = "Google Chrome";
      else if (ua.indexOf("Safari") > -1) browserName = "Apple Safari";

      let osName = "Unknown OS";
      if (window.navigator.userAgent.indexOf("Windows NT 10.0") !== -1) osName = "Windows 10/11";
      if (window.navigator.userAgent.indexOf("Windows NT 6.2") !== -1) osName = "Windows 8";
      if (window.navigator.userAgent.indexOf("Windows NT 6.1") !== -1) osName = "Windows 7";
      if (window.navigator.userAgent.indexOf("Mac") !== -1) osName = "Mac/iOS";
      if (window.navigator.userAgent.indexOf("X11") !== -1) osName = "UNIX";
      if (window.navigator.userAgent.indexOf("Linux") !== -1) osName = "Linux";

      return {
        browser: browserName,
        os: osName,
        userAgent: ua,
        language: navigator.language,
        cookiesEnabled: navigator.cookieEnabled,
        screenResolution: `${window.screen.width} x ${window.screen.height}`,
        colorDepth: window.screen.colorDepth,
        connection: (navigator as any).connection ? (navigator as any).connection.effectiveType : "Unknown",
        platform: navigator.platform,
      };
    };

    setInfo(getBrowserInfo());
  }, []);

  if (!info) return <div className="p-8 text-center text-slate-500">Detecting browser information...</div>;

  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
      <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
        <Monitor className="w-6 h-6 text-blue-500" />
        Your Browser & Device Info
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-slate-50 p-6 rounded-xl border border-slate-100">
          <div className="flex items-center gap-3 mb-2">
            <Globe className="w-5 h-5 text-blue-500" />
            <h3 className="font-semibold text-slate-700">Browser</h3>
          </div>
          <p className="text-xl font-bold text-slate-900">{info.browser}</p>
        </div>

        <div className="bg-slate-50 p-6 rounded-xl border border-slate-100">
          <div className="flex items-center gap-3 mb-2">
            <HardDrive className="w-5 h-5 text-emerald-500" />
            <h3 className="font-semibold text-slate-700">Operating System</h3>
          </div>
          <p className="text-xl font-bold text-slate-900">{info.os}</p>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
          <Info className="w-5 h-5 text-slate-400" />
          Detailed Specifications
        </h3>
        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
          <table className="w-full text-left text-sm">
            <tbody className="divide-y divide-slate-100">
              <tr>
                <th className="py-3 px-4 bg-slate-50 text-slate-600 w-1/3">Screen Resolution</th>
                <td className="py-3 px-4 font-medium">{info.screenResolution}</td>
              </tr>
              <tr>
                <th className="py-3 px-4 bg-slate-50 text-slate-600">Color Depth</th>
                <td className="py-3 px-4 font-medium">{info.colorDepth}-bit</td>
              </tr>
              <tr>
                <th className="py-3 px-4 bg-slate-50 text-slate-600">Language</th>
                <td className="py-3 px-4 font-medium">{info.language}</td>
              </tr>
              <tr>
                <th className="py-3 px-4 bg-slate-50 text-slate-600">Cookies Enabled</th>
                <td className="py-3 px-4 font-medium">{info.cookiesEnabled ? "Yes" : "No"}</td>
              </tr>
              <tr>
                <th className="py-3 px-4 bg-slate-50 text-slate-600">Connection Type</th>
                <td className="py-3 px-4 font-medium uppercase">{info.connection}</td>
              </tr>
              <tr>
                <th className="py-3 px-4 bg-slate-50 text-slate-600">Platform</th>
                <td className="py-3 px-4 font-medium">{info.platform}</td>
              </tr>
              <tr>
                <th className="py-3 px-4 bg-slate-50 text-slate-600">User Agent</th>
                <td className="py-3 px-4 font-medium text-xs break-all text-slate-500">{info.userAgent}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
