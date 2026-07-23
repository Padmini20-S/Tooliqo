"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Search, X, ArrowRight, AppWindow } from "lucide-react";
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

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
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

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dialogRef.current && !dialogRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    if (isOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!query.trim()) {
      setResults(tools.slice(0, 5));
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
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-24 px-4 bg-slate-900/20 backdrop-blur-sm transition-opacity duration-200">
      <div
        ref={dialogRef}
        className="w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl transition-all border border-slate-200"
      >
        {/* Search Input Header */}
        <div className="flex items-center border-b border-slate-100 px-4 py-4 bg-slate-50">
          <Search className="w-6 h-6 text-slate-400 mr-3" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search for any tool..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 text-lg bg-transparent border-0 outline-none text-slate-900 placeholder-slate-400"
          />
          <button
            onClick={onClose}
            className="p-2 rounded-full text-slate-400 hover:bg-slate-200 hover:text-slate-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-[60vh] overflow-y-auto p-2">
          {results.length > 0 ? (
            <div className="space-y-1">
              <h3 className="px-4 py-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                {query ? "Search Results" : "Trending Tools"}
              </h3>
              {results.map((tool) => (
                <button
                  key={tool.slug}
                  onClick={() => handleSelect(tool.slug)}
                  className="flex items-center justify-between w-full text-left px-4 py-3 rounded-xl hover:bg-blue-50 transition-colors group cursor-pointer"
                >
                  <div className="flex items-center space-x-4">
                    <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-slate-100 text-slate-500 group-hover:bg-blue-100 group-hover:text-blue-600 transition-all duration-200">
                      <AppWindow className="w-5 h-5" />
                    </span>
                    <div>
                      <h4 className="text-base font-semibold text-slate-900 group-hover:text-blue-700 transition-colors">
                        {tool.name}
                      </h4>
                      <p className="text-sm text-slate-500 line-clamp-1">
                        {tool.description}
                      </p>
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-blue-600 opacity-0 group-hover:opacity-100 transition-all duration-200 transform group-hover:translate-x-1" />
                </button>
              ))}
            </div>
          ) : (
            <div className="py-12 text-center">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-slate-400" />
              </div>
              <p className="text-base text-slate-900 font-medium">
                No tools found for &quot;<span className="text-blue-600">{query}</span>&quot;
              </p>
              <p className="text-sm text-slate-500 mt-2">
                Try searching for keywords like &quot;pdf&quot;, &quot;image&quot;, or &quot;converter&quot;.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
