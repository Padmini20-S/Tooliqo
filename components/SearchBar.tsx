"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Search, X, Terminal, ArrowRight } from "lucide-react";
import { tools, Tool } from "@/lib/tools";

interface SearchBarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchBar({ isOpen, onClose }: SearchBarProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Tool[]>([]);
  const dialogRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Handle ESC and Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dialogRef.current && !dialogRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  // Filter tools
  useEffect(() => {
    if (!query.trim()) {
      setResults(tools.slice(0, 5)); // Show top 5 tools when empty
      return;
    }
    const filtered = tools.filter((tool) => {
      const q = query.toLowerCase();
      return (
        tool.name.toLowerCase().includes(q) ||
        tool.description.toLowerCase().includes(q) ||
        tool.keywords.some((kw) => kw.toLowerCase().includes(q))
      );
    });
    setResults(filtered);
  }, [query]);

  if (!isOpen) return null;

  const handleSelect = (slug: string) => {
    onClose();
    setQuery("");
    router.push(`/tool/${slug}`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4 bg-zinc-950/40 dark:bg-black/60 backdrop-blur-sm transition-opacity duration-200">
      <div
        ref={dialogRef}
        className="w-full max-w-lg overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-2xl transition-all"
      >
        {/* Search Input Header */}
        <div className="flex items-center border-b border-zinc-100 dark:border-zinc-800 px-4 py-3">
          <Search className="w-5 h-5 text-zinc-400 dark:text-zinc-500 mr-3" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Type a tool name, category, or keyword..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 text-base bg-transparent border-0 outline-none text-zinc-800 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 py-1"
          />
          <button
            onClick={onClose}
            className="p-1 rounded-md text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-[300px] overflow-y-auto p-2">
          {results.length > 0 ? (
            <div className="space-y-1">
              <h3 className="px-3 py-1.5 text-[10px] font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
                {query ? "Search Results" : "Popular Tools"}
              </h3>
              {results.map((tool) => (
                <button
                  key={tool.slug}
                  onClick={() => handleSelect(tool.slug)}
                  className="flex items-center justify-between w-full text-left px-3 py-2.5 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors group cursor-pointer"
                >
                  <div className="flex items-center space-x-3">
                    <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800 text-zinc-500 dark:text-zinc-400 group-hover:bg-indigo-500 group-hover:text-white dark:group-hover:bg-indigo-600 transition-all duration-200">
                      <Terminal className="w-4 h-4" />
                    </span>
                    <div>
                      <h4 className="text-sm font-medium text-zinc-800 dark:text-zinc-200 group-hover:text-zinc-950 dark:group-hover:text-white">
                        {tool.name}
                      </h4>
                      <p className="text-xs text-zinc-400 dark:text-zinc-500 line-clamp-1">
                        {tool.description}
                      </p>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-zinc-300 dark:text-zinc-600 group-hover:text-indigo-500 dark:group-hover:text-indigo-400 opacity-0 group-hover:opacity-100 transition-all duration-200" />
                </button>
              ))}
            </div>
          ) : (
            <div className="py-8 text-center">
              <p className="text-sm text-zinc-400 dark:text-zinc-500">
                No tools found for &quot;<span className="font-semibold text-zinc-600 dark:text-zinc-300">{query}</span>&quot;
              </p>
              <p className="text-xs text-zinc-400 dark:text-zinc-600 mt-1">
                Try searching for simple tags like &quot;json&quot;, &quot;pass&quot;, or &quot;crypt&quot;.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
