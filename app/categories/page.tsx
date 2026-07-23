import React from "react";
import Link from "next/link";
import { Grid } from "lucide-react";

export default function CategoriesPage() {
  return (
    <div className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
      <div className="w-20 h-20 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
        <Grid className="w-10 h-10" />
      </div>
      <h1 className="text-4xl font-bold text-slate-900 mb-4">All Categories</h1>
      <p className="text-lg text-slate-500 max-w-2xl mx-auto mb-10">
        We are organizing our tools into an even better category system. Coming very soon!
      </p>
      <Link href="/tools" className="px-8 py-4 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition-colors shadow-sm">
        View All Tools Instead
      </Link>
    </div>
  );
}
