"use client";

import React, { useState } from "react";
import { Code, Copy, Check } from "lucide-react";
import { toast } from "sonner";

export default function MetaTagGenerator() {
  const [data, setData] = useState({
    title: "",
    description: "",
    keywords: "",
    author: "",
    allowRobots: true,
  });

  const [copied, setCopied] = useState(false);

  const metaTags = `<!-- Primary Meta Tags -->
<title>${data.title || "Page Title"}</title>
<meta name="title" content="${data.title || "Page Title"}" />
<meta name="description" content="${data.description || "Page description"}" />
<meta name="keywords" content="${data.keywords || "keyword1, keyword2"}" />
<meta name="author" content="${data.author || "Author Name"}" />
<meta name="robots" content="${data.allowRobots ? "index, follow" : "noindex, nofollow"}" />
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="language" content="English" />`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(metaTags);
    setCopied(true);
    toast.success("Meta tags copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full mx-auto bg-white rounded-2xl border border-slate-200 shadow-sm grid grid-cols-1 md:grid-cols-2 overflow-hidden">
      <div className="p-8 border-b md:border-b-0 md:border-r border-slate-200">
        <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
          <Code className="w-5 h-5 text-blue-500" />
          Meta Details
        </h2>

        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Site Title</label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="e.g., Tooliqo - Free Online Tools"
              value={data.title}
              onChange={(e) => setData({ ...data, title: e.target.value })}
            />
            <p className="text-xs text-slate-400 mt-1">{data.title.length} characters (recommended ~60)</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Site Description</label>
            <textarea
              className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none h-24 resize-none"
              placeholder="e.g., Free online tools for developers and designers..."
              value={data.description}
              onChange={(e) => setData({ ...data, description: e.target.value })}
            />
            <p className="text-xs text-slate-400 mt-1">{data.description.length} characters (recommended 150-160)</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Keywords (comma separated)</label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="e.g., tools, free online, utilities"
              value={data.keywords}
              onChange={(e) => setData({ ...data, keywords: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Author Name</label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="e.g., John Doe"
              value={data.author}
              onChange={(e) => setData({ ...data, author: e.target.value })}
            />
          </div>

          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="checkbox"
              checked={data.allowRobots}
              onChange={(e) => setData({ ...data, allowRobots: e.target.checked })}
              className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500 border-gray-300"
            />
            <span className="text-sm font-medium text-slate-700">Allow search engines to index this page</span>
          </label>
        </div>
      </div>

      <div className="p-8 bg-slate-50 flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-slate-900">Generated Code</h2>
          <button
            onClick={copyToClipboard}
            className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-sm font-medium hover:bg-slate-50 text-slate-600 transition-colors"
          >
            {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
            {copied ? "Copied!" : "Copy Code"}
          </button>
        </div>

        <pre className="flex-1 w-full bg-slate-900 text-green-400 p-6 rounded-xl overflow-x-auto text-sm shadow-inner font-mono leading-relaxed">
          <code>{metaTags}</code>
        </pre>
      </div>
    </div>
  );
}
