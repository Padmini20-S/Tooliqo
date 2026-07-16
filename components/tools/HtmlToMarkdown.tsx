"use client";

import React from "react";
import { Hammer } from "lucide-react";

export default function HtmlToMarkdown() {{
  return (
    <div className="w-full max-w-2xl mx-auto p-10 rounded-2xl border border-dashed border-zinc-300 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/20 text-center space-y-4">
      <div className="flex justify-center">
        <span className="p-4 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400">
          <Hammer className="w-8 h-8" />
        </span>
      </div>
      <h2 className="text-xl font-bold">Under Construction</h2>
      <p className="text-sm text-zinc-500 dark:text-zinc-400">
        This tool is currently being built and will be available in the next major update!
      </p>
    </div>
  );
}}
