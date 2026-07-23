"use client";

import React, { useState, useEffect } from "react";
import { Copy, Check, Clock, Sparkles } from "lucide-react";

export default function CronExpressionGenerator() {
  const [minute, setMinute] = useState("*");
  const [hour, setHour] = useState("*");
  const [dayOfMonth, setDayOfMonth] = useState("*");
  const [month, setMonth] = useState("*");
  const [dayOfWeek, setDayOfWeek] = useState("*");

  const [cronExpression, setCronExpression] = useState("* * * * *");
  const [description, setDescription] = useState("Runs every minute.");
  const [copied, setCopied] = useState(false);

  const presets = [
    { label: "Every minute (* * * * *)", m: "*", h: "*", dom: "*", mon: "*", dow: "*" },
    { label: "Every 5 minutes (*/5 * * * *)", m: "*/5", h: "*", dom: "*", mon: "*", dow: "*" },
    { label: "Every 15 minutes (*/15 * * * *)", m: "*/15", h: "*", dom: "*", mon: "*", dow: "*" },
    { label: "Every hour at 0 min (0 * * * *)", m: "0", h: "*", dom: "*", mon: "*", dow: "*" },
    { label: "Every day at midnight (0 0 * * *)", m: "0", h: "0", dom: "*", mon: "*", dow: "*" },
    { label: "Every day at 9 AM (0 9 * * *)", m: "0", h: "9", dom: "*", mon: "*", dow: "*" },
    { label: "Every Monday at 9 AM (0 9 * * 1)", m: "0", h: "9", dom: "*", mon: "*", dow: "1" },
    { label: "1st of every month (0 0 1 * *)", m: "0", h: "0", dom: "1", mon: "*", dow: "*" }
  ];

  const buildDescription = (m: string, h: string, dom: string, mon: string, dow: string): string => {
    if (m === "*" && h === "*" && dom === "*" && mon === "*" && dow === "*") {
      return "Runs every single minute.";
    }

    const parts: string[] = [];

    // Minute
    if (m === "*") parts.push("at every minute");
    else if (m.startsWith("*/")) parts.push(`every ${m.replace("*/", "")} minutes`);
    else parts.push(`at minute ${m}`);

    // Hour
    if (h === "*") parts.push("of every hour");
    else if (h.startsWith("*/")) parts.push(`every ${h.replace("*/", "")} hours`);
    else {
      const hNum = parseInt(h, 10);
      const ampm = hNum >= 12 ? "PM" : "AM";
      const h12 = hNum % 12 === 0 ? 12 : hNum % 12;
      parts.push(`at ${h12}:${m.padStart(2, "0")} ${ampm}`);
    }

    // Day of month
    if (dom !== "*") {
      parts.push(`on day ${dom} of the month`);
    }

    // Month
    if (mon !== "*") {
      const monthNames = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      const monNum = parseInt(mon, 10);
      parts.push(`in ${monthNames[monNum] || mon}`);
    }

    // Day of week
    if (dow !== "*") {
      const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
      const dowNum = parseInt(dow, 10);
      parts.push(`only on ${days[dowNum] || dow}`);
    }

    return "Runs " + parts.join(" ") + ".";
  };

  useEffect(() => {
    const expr = `${minute} ${hour} ${dayOfMonth} ${month} ${dayOfWeek}`;
    setCronExpression(expr);
    setDescription(buildDescription(minute, hour, dayOfMonth, month, dayOfWeek));
  }, [minute, hour, dayOfMonth, month, dayOfWeek]);

  const handleApplyPreset = (p: typeof presets[0]) => {
    setMinute(p.m);
    setHour(p.h);
    setDayOfMonth(p.dom);
    setMonth(p.mon);
    setDayOfWeek(p.dow);
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(cronExpression);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-xl">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">Cron Expression Generator</h1>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">Visual builder for crontab schedule expressions with human-readable explanation</p>
            </div>
          </div>
        </div>

        {/* Presets */}
        <div className="mt-6 pt-4 border-t border-zinc-100 dark:border-zinc-800/80">
          <label className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-2 block">Quick Presets</label>
          <div className="flex flex-wrap gap-2">
            {presets.map((p, idx) => (
              <button
                key={idx}
                onClick={() => handleApplyPreset(p)}
                className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium bg-zinc-100 dark:bg-zinc-800 hover:bg-emerald-500/10 hover:text-emerald-600 text-zinc-700 dark:text-zinc-300 rounded-xl transition"
              >
                <Sparkles className="w-3 h-3 text-emerald-500" />
                {p.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Output Box */}
      <div className="bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-cyan-500/10 border border-emerald-500/20 rounded-2xl p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">Cron Expression</span>
          <div className="text-3xl font-mono font-bold text-zinc-900 dark:text-zinc-100 tracking-wider">
            {cronExpression}
          </div>
          <p className="text-sm text-zinc-600 dark:text-zinc-300 font-medium pt-1">
            {description}
          </p>
        </div>

        <button
          onClick={handleCopy}
          className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl shadow-sm transition shrink-0"
        >
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          {copied ? "Copied!" : "Copy Expression"}
        </button>
      </div>

      {/* Visual Controls Grid */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {/* Minute */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 space-y-2">
          <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider block">Minute</label>
          <input
            type="text"
            value={minute}
            onChange={(e) => setMinute(e.target.value)}
            className="w-full px-3 py-2 font-mono text-sm bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            placeholder="*"
          />
          <span className="text-[11px] text-zinc-400 block">0-59, *, */5</span>
        </div>

        {/* Hour */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 space-y-2">
          <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider block">Hour</label>
          <input
            type="text"
            value={hour}
            onChange={(e) => setHour(e.target.value)}
            className="w-full px-3 py-2 font-mono text-sm bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            placeholder="*"
          />
          <span className="text-[11px] text-zinc-400 block">0-23, *, */2</span>
        </div>

        {/* Day of Month */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 space-y-2">
          <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider block">Day of Month</label>
          <input
            type="text"
            value={dayOfMonth}
            onChange={(e) => setDayOfMonth(e.target.value)}
            className="w-full px-3 py-2 font-mono text-sm bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            placeholder="*"
          />
          <span className="text-[11px] text-zinc-400 block">1-31, *</span>
        </div>

        {/* Month */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 space-y-2">
          <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider block">Month</label>
          <input
            type="text"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            className="w-full px-3 py-2 font-mono text-sm bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            placeholder="*"
          />
          <span className="text-[11px] text-zinc-400 block">1-12, *</span>
        </div>

        {/* Day of Week */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 space-y-2">
          <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider block">Day of Week</label>
          <input
            type="text"
            value={dayOfWeek}
            onChange={(e) => setDayOfWeek(e.target.value)}
            className="w-full px-3 py-2 font-mono text-sm bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            placeholder="*"
          />
          <span className="text-[11px] text-zinc-400 block">0-6 (Sun-Sat), *</span>
        </div>
      </div>
    </div>
  );
}
