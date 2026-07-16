"use client";

import React from "react";
import Link from "next/link";
import { 
  Braces, Key, FileDiff, QrCode, CaseSensitive, Binary, 
  Eye, Link2, Lock, Palette, Sparkles, SearchCode, Terminal 
} from "lucide-react";
import { Tool } from "@/lib/tools";

interface ToolCardProps {
  tool: Tool;
}

export default function ToolCard({ tool }: ToolCardProps) {
  // Select Lucide Icon based on icon string
  const renderIcon = (iconName: string) => {
    const props = { className: "w-6 h-6 transition-transform duration-300 group-hover:scale-110" };
    switch (iconName) {
      case "Braces":
        return <Braces {...props} />;
      case "Key":
        return <Key {...props} />;
      case "FileDiff":
        return <FileDiff {...props} />;
      case "QrCode":
        return <QrCode {...props} />;
      case "CaseSensitive":
        return <CaseSensitive {...props} />;
      case "Binary":
        return <Binary {...props} />;
      case "Eye":
        return <Eye {...props} />;
      case "Link2":
        return <Link2 {...props} />;
      case "Lock":
        return <Lock {...props} />;
      case "Palette":
        return <Palette {...props} />;
      case "Sparkles":
        return <Sparkles {...props} />;
      case "SearchCode":
        return <SearchCode {...props} />;
      default:
        return <Terminal {...props} />;
    }
  };

  // Generate category specific gradient highlight
  const getGradient = (cat: string) => {
    switch (cat) {
      case "dev":
        return "from-blue-500/10 to-indigo-500/10 text-indigo-600 dark:text-indigo-400 group-hover:border-indigo-500/30";
      case "design":
        return "from-pink-500/10 to-rose-500/10 text-rose-600 dark:text-rose-400 group-hover:border-rose-500/30";
      case "text":
        return "from-amber-500/10 to-orange-500/10 text-amber-600 dark:text-amber-400 group-hover:border-amber-500/30";
      case "utility":
        return "from-emerald-500/10 to-teal-500/10 text-emerald-600 dark:text-emerald-400 group-hover:border-emerald-500/30";
      default:
        return "from-zinc-500/10 to-slate-500/10 text-zinc-600 dark:text-zinc-400 group-hover:border-zinc-500/30";
    }
  };

  const getIconContainer = (cat: string) => {
    switch (cat) {
      case "dev":
        return "bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400";
      case "design":
        return "bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400";
      case "text":
        return "bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400";
      case "utility":
        return "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400";
      default:
        return "bg-zinc-50 dark:bg-zinc-950/40 text-zinc-600 dark:text-zinc-400";
    }
  };

  return (
    <Link
      href={`/tool/${tool.slug}`}
      className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900/40 p-6 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1"
    >
      {/* Background radial shine */}
      <div className="absolute inset-0 bg-gradient-to-tr opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none -z-10 bg-zinc-50/50 dark:bg-zinc-800/10" />

      <div className="space-y-4">
        {/* Icon & Category Indicator */}
        <div className="flex items-center justify-between">
          <span className={`flex items-center justify-center w-12 h-12 rounded-xl border border-zinc-150 dark:border-zinc-800/50 shadow-inner ${getIconContainer(tool.category)}`}>
            {renderIcon(tool.icon)}
          </span>
          <span className="text-[10px] font-semibold font-mono uppercase px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-850 text-zinc-500 dark:text-zinc-400">
            {tool.category}
          </span>
        </div>

        {/* Text Details */}
        <div>
          <h3 className="text-base font-semibold text-zinc-850 dark:text-zinc-100 group-hover:text-indigo-650 dark:group-hover:text-indigo-400 transition-colors">
            {tool.name}
          </h3>
          <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400 line-clamp-2 leading-relaxed">
            {tool.description}
          </p>
        </div>
      </div>

      {/* Footer / Read More action */}
      <div className="mt-6 flex items-center text-xs font-semibold text-indigo-600 dark:text-indigo-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300">
        Open Tool
        <span className="ml-1 text-[14px]">&#8594;</span>
      </div>
    </Link>
  );
}
