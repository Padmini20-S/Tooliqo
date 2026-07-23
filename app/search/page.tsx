"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import { tools } from "@/lib/tools";
import ToolCard from "@/components/ToolCard";

export default function SearchPage() {
  const [query, setQuery] = useState("");

  const filteredTools = tools.filter(
    (tool) =>
      tool.name.toLowerCase().includes(query.toLowerCase()) ||
      tool.description.toLowerCase().includes(query.toLowerCase()) ||
      tool.keywords.some((k) => k.toLowerCase().includes(query.toLowerCase()))
  );

  return (
    <div className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-3xl mx-auto mb-10">
        <h1 className="text-3xl font-bold text-slate-900 mb-6 text-center">Search Tools</h1>
        
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-6 w-6 text-slate-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-12 pr-4 py-4 bg-white border-2 border-slate-200 rounded-2xl text-lg focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all shadow-sm"
            placeholder="Search for any tool..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
          />
        </div>
      </div>

      {query && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-slate-700">
            {filteredTools.length} result{filteredTools.length !== 1 ? 's' : ''} found
          </h2>
        </div>
      )}

      {filteredTools.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredTools.map((tool, index) => (
            <ToolCard key={tool.slug} tool={tool} index={index} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-slate-500 text-lg">No tools found matching "{query}". Try a different keyword.</p>
        </div>
      )}
    </div>
  );
}
