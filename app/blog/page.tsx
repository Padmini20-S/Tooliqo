import React from "react";
import Link from "next/link";
import { FileText } from "lucide-react";

export default function BlogPage() {
  return (
    <div className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
      <div className="w-20 h-20 bg-purple-50 text-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
        <FileText className="w-10 h-10" />
      </div>
      <h1 className="text-4xl font-bold text-slate-900 mb-4">Our Blog</h1>
      <p className="text-lg text-slate-500 max-w-2xl mx-auto mb-10">
        Articles, tutorials, and productivity tips are coming soon to our brand new blog!
      </p>
      <Link href="/" className="px-8 py-4 bg-slate-900 text-white font-semibold rounded-full hover:bg-slate-800 transition-colors shadow-sm">
        Back to Home
      </Link>
    </div>
  );
}
