import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { tools } from "@/lib/tools";
import { ChevronRight, ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ToolWrapper from "@/components/ToolWrapper";

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
    title: `${tool.name} - Free Online Web Tool | Tooliqo`,
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

  // Structured Data Schema for Web Application (SEO Audit requirement!)
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": tool.name,
    "description": tool.description,
    "applicationCategory": "DeveloperApplication",
    "operatingSystem": "All",
    "browserRequirements": "Requires JavaScript",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  };

  // Internal Links: Show other tools in the same category
  const relatedTools = tools.filter((t) => t.category === tool.category && t.slug !== tool.slug).slice(0, 4);

  return (
    <>
      {/* Schema Markup for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 flex flex-col transition-colors duration-300">
        <Navbar />

        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
          {/* Breadcrumbs & Navigation */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <nav className="flex items-center space-x-2 text-xs text-zinc-500 dark:text-zinc-400">
              <Link href="/" className="hover:text-indigo-600 transition-colors">Home</Link>
              <ChevronRight className="w-3 h-3" />
              <span className="capitalize">{tool.category}</span>
              <ChevronRight className="w-3 h-3" />
              <span className="font-semibold text-zinc-800 dark:text-zinc-200">{tool.name}</span>
            </nav>
            <Link
              href="/"
              className="flex items-center space-x-1.5 text-xs text-zinc-650 dark:text-zinc-350 hover:text-indigo-600 dark:hover:text-indigo-400 font-semibold"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Dashboard</span>
            </Link>
          </div>

          {/* Hero Header with AdSense Placeholder */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
            <div className="lg:col-span-3 space-y-3">
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
                {tool.name}
              </h1>
              <p className="text-sm sm:text-base text-zinc-550 dark:text-zinc-400 leading-relaxed max-w-3xl">
                {tool.longDescription}
              </p>
            </div>

            {/* AdSense Top Ad Slot Placeholder */}
            <div className="lg:col-span-1 border-2 border-dashed border-zinc-250 dark:border-zinc-800 rounded-2xl p-4 text-center bg-zinc-100/50 dark:bg-zinc-900/50 min-h-[90px] flex items-center justify-center">
              <div className="space-y-1">
                <span className="text-[9px] font-bold text-zinc-400 dark:text-zinc-550 uppercase tracking-wider block">Advertisement</span>
                <span className="text-xs text-zinc-450 dark:text-zinc-400 italic">Ad Slot Placement (Ideal for AdSense)</span>
              </div>
            </div>
          </div>

          {/* Main Working Tool Component loaded inside our Client Wrapper */}
          <div className="bg-white dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800/80 rounded-2xl p-6 shadow-sm">
            <ToolWrapper slug={tool.slug} />
          </div>

          {/* Related Tools Section for Internal Linking */}
          {relatedTools.length > 0 && (
            <div className="space-y-4 pt-4">
              <h3 className="text-sm font-semibold text-zinc-900 dark:text-white uppercase tracking-wider">
                Related {tool.category === "dev" ? "Developer" : tool.category === "design" ? "Design" : "Utility"} Tools
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {relatedTools.map((t) => (
                  <Link
                    key={t.slug}
                    href={`/tool/${t.slug}`}
                    className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/20 hover:border-indigo-500/30 transition-all flex flex-col justify-between"
                  >
                    <div>
                      <h4 className="text-xs font-bold text-zinc-800 dark:text-zinc-200">{t.name}</h4>
                      <p className="text-[11px] text-zinc-405 dark:text-zinc-500 line-clamp-2 mt-1.5 leading-relaxed">{t.description}</p>
                    </div>
                    <span className="text-[10px] text-indigo-650 dark:text-indigo-400 font-semibold mt-3 block">Open &rarr;</span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </main>

        <Footer />
      </div>
    </>
  );
}
