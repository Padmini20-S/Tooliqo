"use client";

import React, { useState } from "react";
import { Code, Copy, Check, Download, Layers, Plus, Trash2 } from "lucide-react";

type SchemaType = "Article" | "Product" | "LocalBusiness" | "FAQPage" | "Organization";

interface FaqItem {
  question: string;
  answer: string;
}

export default function SchemaMarkupGenerator() {
  const [schemaType, setSchemaType] = useState<SchemaType>("Article");
  const [copied, setCopied] = useState(false);

  // Article State
  const [articleTitle, setArticleTitle] = useState("10 Essential Developer Tools for Web Developers");
  const [articleAuthor, setArticleAuthor] = useState("Jane Doe");
  const [articlePublisher, setArticlePublisher] = useState("Tooliqo Media");
  const [articleImage, setArticleImage] = useState("https://tooliqo.com/images/article-banner.jpg");

  // Product State
  const [productName, setProductName] = useState("Developer Pro Suite License");
  const [productPrice, setProductPrice] = useState("49.99");
  const [productCurrency, setProductCurrency] = useState("USD");
  const [productBrand, setProductBrand] = useState("Tooliqo");

  // FAQ State
  const [faqs, setFaqs] = useState<FaqItem[]>([
    { question: "Is Tooliqo completely free to use?", answer: "Yes, all core web tools on Tooliqo are free." },
    { question: "Are my data inputs stored on servers?", answer: "No, processing happens client-side inside your browser." },
  ]);

  const addFaq = () => {
    setFaqs([...faqs, { question: "", answer: "" }]);
  };

  const removeFaq = (idx: number) => {
    setFaqs(faqs.filter((_, i) => i !== idx));
  };

  const generateSchemaJson = () => {
    let obj: any = {};

    if (schemaType === "Article") {
      obj = {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: articleTitle,
        image: [articleImage],
        datePublished: new Date().toISOString(),
        author: {
          "@type": "Person",
          name: articleAuthor,
        },
        publisher: {
          "@type": "Organization",
          name: articlePublisher,
          logo: {
            "@type": "ImageObject",
            url: "https://tooliqo.com/logo.png",
          },
        },
      };
    } else if (schemaType === "Product") {
      obj = {
        "@context": "https://schema.org",
        "@type": "Product",
        name: productName,
        image: ["https://tooliqo.com/product.jpg"],
        brand: {
          "@type": "Brand",
          name: productBrand,
        },
        offers: {
          "@type": "Offer",
          url: "https://tooliqo.com/pricing",
          priceCurrency: productCurrency,
          price: productPrice,
          availability: "https://schema.org/InStock",
        },
      };
    } else if (schemaType === "FAQPage") {
      obj = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      };
    } else if (schemaType === "Organization") {
      obj = {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "Tooliqo",
        url: "https://tooliqo.com",
        logo: "https://tooliqo.com/logo.png",
        sameAs: ["https://twitter.com/tooliqo", "https://github.com/tooliqo"],
      };
    } else {
      obj = {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        name: "Tooliqo HQ",
        image: "https://tooliqo.com/office.jpg",
        priceRange: "$$",
        address: {
          "@type": "PostalAddress",
          streetAddress: "100 Innovation Way",
          addressLocality: "San Francisco",
          addressRegion: "CA",
          postalCode: "94105",
          addressCountry: "US",
        },
      };
    }

    return JSON.stringify(obj, null, 2);
  };

  const schemaJsonStr = generateSchemaJson();
  const scriptTagCode = `<script type="application/ld+json">\n${schemaJsonStr}\n</script>`;

  const copyCode = () => {
    navigator.clipboard.writeText(scriptTagCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadJsonLd = () => {
    const element = document.createElement("a");
    const file = new Blob([scriptTagCode], { type: "text/json" });
    element.href = URL.createObjectURL(file);
    element.download = `schema-${schemaType.toLowerCase()}.jsonld`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-zinc-900 border border-zinc-800 rounded-2xl shadow-xl space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-2 flex items-center justify-center gap-2">
          <Code className="w-6 h-6 text-indigo-400" />
          JSON-LD Schema Markup Generator
        </h2>
        <p className="text-zinc-400">Generate structured data (Article, Product, FAQPage, Organization, LocalBusiness) for rich Google search snippets.</p>
      </div>

      {/* Schema Type Switcher Tabs */}
      <div className="flex bg-zinc-800/80 p-1 rounded-xl border border-zinc-700/80 justify-center gap-2 flex-wrap text-xs font-semibold">
        {(["Article", "Product", "FAQPage", "Organization", "LocalBusiness"] as SchemaType[]).map((t) => (
          <button
            key={t}
            onClick={() => setSchemaType(t)}
            className={`px-4 py-2 rounded-lg transition-colors cursor-pointer ${
              schemaType === t ? "bg-indigo-600 text-white" : "text-zinc-400 hover:text-white"
            }`}
          >
            {t} Schema
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Dynamic Form per Schema Type */}
        <div className="lg:col-span-6 space-y-4 bg-zinc-800/40 p-5 rounded-xl border border-zinc-700/80 text-xs">
          <h3 className="font-bold text-white text-sm border-b border-zinc-700/50 pb-2">{schemaType} Parameters</h3>

          {schemaType === "Article" && (
            <div className="space-y-3">
              <div>
                <label className="block font-semibold text-zinc-300 mb-1">Headline / Title</label>
                <input
                  type="text"
                  value={articleTitle}
                  onChange={(e) => setArticleTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-zinc-100 focus:outline-none"
                />
              </div>
              <div>
                <label className="block font-semibold text-zinc-300 mb-1">Author Name</label>
                <input
                  type="text"
                  value={articleAuthor}
                  onChange={(e) => setArticleAuthor(e.target.value)}
                  className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-zinc-100 focus:outline-none"
                />
              </div>
              <div>
                <label className="block font-semibold text-zinc-300 mb-1">Publisher Name</label>
                <input
                  type="text"
                  value={articlePublisher}
                  onChange={(e) => setArticlePublisher(e.target.value)}
                  className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-zinc-100 focus:outline-none"
                />
              </div>
            </div>
          )}

          {schemaType === "Product" && (
            <div className="space-y-3">
              <div>
                <label className="block font-semibold text-zinc-300 mb-1">Product Name</label>
                <input
                  type="text"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-zinc-100 focus:outline-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-zinc-300 mb-1">Price</label>
                  <input
                    type="text"
                    value={productPrice}
                    onChange={(e) => setProductPrice(e.target.value)}
                    className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-zinc-100 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-zinc-300 mb-1">Currency</label>
                  <input
                    type="text"
                    value={productCurrency}
                    onChange={(e) => setProductCurrency(e.target.value)}
                    className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-zinc-100 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {schemaType === "FAQPage" && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="font-bold text-white">Question & Answer Pairs</span>
                <button
                  onClick={addFaq}
                  className="flex items-center gap-1 px-2.5 py-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded text-[11px]"
                >
                  <Plus className="w-3 h-3" /> Add Q&A
                </button>
              </div>

              {faqs.map((faq, i) => (
                <div key={i} className="p-3 bg-zinc-900 rounded-lg border border-zinc-700 space-y-2 relative">
                  {faqs.length > 1 && (
                    <button
                      onClick={() => removeFaq(i)}
                      className="absolute right-2 top-2 text-zinc-500 hover:text-rose-400 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                  <input
                    type="text"
                    placeholder="Question"
                    value={faq.question}
                    onChange={(e) => {
                      const copy = [...faqs];
                      copy[i].question = e.target.value;
                      setFaqs(copy);
                    }}
                    className="w-full px-2.5 py-1 bg-zinc-800 border border-zinc-700 rounded text-zinc-100 focus:outline-none"
                  />
                  <textarea
                    rows={2}
                    placeholder="Answer"
                    value={faq.answer}
                    onChange={(e) => {
                      const copy = [...faqs];
                      copy[i].answer = e.target.value;
                      setFaqs(copy);
                    }}
                    className="w-full p-2 bg-zinc-800 border border-zinc-700 rounded text-zinc-100 focus:outline-none"
                  />
                </div>
              ))}
            </div>
          )}

          {(schemaType === "Organization" || schemaType === "LocalBusiness") && (
            <div className="p-3 bg-zinc-900/60 rounded-lg border border-zinc-800 text-zinc-300 leading-relaxed">
              Standard organization schema pre-configured with brand name, URL, logo, and location parameters. Edit fields in code preview directly if needed.
            </div>
          )}
        </div>

        {/* Live Output Code */}
        <div className="lg:col-span-6 flex flex-col space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold text-white">Generated JSON-LD Script</span>
            <div className="flex gap-2">
              <button
                onClick={copyCode}
                className="flex items-center gap-1 px-3 py-1 bg-zinc-700 hover:bg-zinc-600 text-zinc-200 text-xs font-medium rounded-lg transition-colors cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? "Copied" : "Copy Code"}
              </button>
              <button
                onClick={downloadJsonLd}
                className="flex items-center gap-1 px-3 py-1 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-medium rounded-lg transition-colors cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" /> Download
              </button>
            </div>
          </div>

          <pre className="flex-1 w-full bg-black/60 border border-zinc-800 p-4 rounded-xl text-emerald-400 font-mono text-xs overflow-x-auto min-h-[350px]">
            {scriptTagCode}
          </pre>
        </div>
      </div>
    </div>
  );
}
