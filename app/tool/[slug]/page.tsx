import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { tools } from "@/lib/tools";
import { ChevronRight, ArrowLeft, Heart, Share2, HelpCircle, ChevronDown, CheckCircle } from "lucide-react";
import ToolWrapper from "@/components/ToolWrapper";
import ToolPageClient from "./ToolPageClient"; // We will create this for client-side interactivity like FAQ and Favorites

interface ToolPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return tools.map((tool) => ({
    slug: tool.slug,
  }));
}

export async function generateMetadata({ params }: ToolPageProps) {
  const { slug } = await params;
  const tool = tools.find((t) => t.slug === slug);

  if (!tool) return {};

  return {
    title: `${tool.name} - Free Online Tool | Tooliqo`,
    description: tool.description,
    keywords: tool.keywords.join(", "),
    alternates: {
      canonical: `https://tooliqo.com/tool/${tool.slug}`,
    },
    openGraph: {
      title: `${tool.name} | Tooliqo`,
      description: tool.description,
      url: `https://tooliqo.com/tool/${tool.slug}`,
      siteName: "Tooliqo",
      type: "website",
    },
  };
}

export default async function ToolPage({ params }: ToolPageProps) {
  const { slug } = await params;
  const tool = tools.find((t) => t.slug === slug);

  if (!tool) {
    notFound();
  }

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": tool.name,
    "description": tool.description,
    "applicationCategory": "DeveloperApplication",
    "operatingSystem": "All",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  };

  const relatedTools = tools.filter((t) => t.category === tool.category && t.slug !== tool.slug).slice(0, 4);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      <div className="flex-1 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
        
        {/* Breadcrumbs */}
        <div className="flex items-center space-x-2 text-sm text-slate-500 mb-6">
          <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <Link href={`/categories/${tool.category}`} className="capitalize hover:text-blue-600 transition-colors">{tool.category}</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="font-medium text-slate-900">{tool.name}</span>
        </div>

        {/* Ad Placeholder Top */}
        <div className="w-full h-[90px] bg-slate-50 border border-dashed border-slate-200 rounded-xl flex items-center justify-center text-slate-400 text-sm mb-8">
          Advertisement
        </div>

        {/* Tool Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
            {tool.name}
          </h1>
          <p className="text-base sm:text-lg text-slate-500 leading-relaxed">
            {tool.longDescription}
          </p>
        </div>

        {/* Main Tool Area */}
        <ToolPageClient tool={tool}>
          <ToolWrapper slug={tool.slug} />
        </ToolPageClient>

        {/* Ad Placeholder Middle */}
        <div className="w-full h-[90px] bg-slate-50 border border-dashed border-slate-200 rounded-xl flex items-center justify-center text-slate-400 text-sm my-12">
          Advertisement
        </div>

        {/* Related Tools */}
        {relatedTools.length > 0 && (
          <div className="pt-8 border-t border-slate-100">
            <h3 className="text-2xl font-bold text-slate-900 mb-6">Related Tools</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {relatedTools.map((t) => (
                <Link
                  key={t.slug}
                  href={`/tool/${t.slug}`}
                  className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-blue-200 hover:shadow-soft transition-all group block h-full"
                >
                  <h4 className="text-base font-semibold text-slate-900 group-hover:text-blue-600 transition-colors mb-2">{t.name}</h4>
                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">{t.description}</p>
                </Link>
              ))}
            </div>
          </div>
        )}

      </div>
    </>
  );
}
