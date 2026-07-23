import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { tools, categories } from "@/lib/tools";
import { ChevronRight, Grid } from "lucide-react";
import ToolCard from "@/components/ToolCard";

interface CategoryPageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return categories.map((cat) => ({
    id: cat.id,
  }));
}

export async function generateMetadata({ params }: CategoryPageProps) {
  const { id } = await params;
  const category = categories.find((c) => c.id === id);

  if (!category) return {};

  return {
    title: `${category.name} Tools | Tooliqo`,
    description: category.description,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { id } = await params;
  const category = categories.find((c) => c.id === id);

  if (!category) {
    notFound();
  }

  const categoryTools = tools.filter((t) => t.category === id);

  return (
    <div className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      
      {/* Breadcrumbs */}
      <div className="flex items-center space-x-2 text-sm text-slate-500 mb-6">
        <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
        <ChevronRight className="w-4 h-4" />
        <Link href="/categories" className="hover:text-blue-600 transition-colors">Categories</Link>
        <ChevronRight className="w-4 h-4" />
        <span className="font-medium text-slate-900">{category.name}</span>
      </div>

      <div className="text-center max-w-3xl mx-auto space-y-4 mb-10">
        <div className="w-16 h-16 bg-blue-50 text-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm">
          <Grid className="w-8 h-8" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
          {category.name}
        </h1>
        <p className="text-base sm:text-lg text-slate-500 leading-relaxed">
          {category.description}
        </p>
      </div>

      {categoryTools.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categoryTools.map((tool, index) => (
            <ToolCard key={tool.slug} tool={tool} index={index} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 text-slate-500">
          No tools found in this category yet.
        </div>
      )}

    </div>
  );
}
