import React from "react";
import { tools } from "@/lib/tools";
import ToolCard from "@/components/ToolCard";

export const metadata = {
  title: "All Tools - Tooliqo",
  description: "Browse all our free online tools.",
};

export default function ToolsPage() {
  return (
    <div className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">All Tools</h1>
        <p className="text-lg text-slate-500 max-w-2xl mx-auto">
          Explore our complete collection of 100+ free online tools to enhance your productivity.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {tools.map((tool, index) => (
          <ToolCard key={tool.slug} tool={tool} index={index} />
        ))}
      </div>
    </div>
  );
}
