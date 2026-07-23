"use client";

import React from "react";
import dynamic from "next/dynamic";
import PremiumFileUploader from "./PremiumFileUploader";

const JsonFormatter = dynamic(() => import("@/components/tools/JsonFormatter"), {
  loading: () => <div className="h-80 flex items-center justify-center text-zinc-400">Loading JSON Formatter...</div>,
  ssr: false,
});
const PasswordGenerator = dynamic(() => import("@/components/tools/PasswordGenerator"), {
  loading: () => <div className="h-80 flex items-center justify-center text-zinc-400">Loading Password Generator...</div>,
  ssr: false,
});
const DiffChecker = dynamic(() => import("@/components/tools/DiffChecker"), {
  loading: () => <div className="h-80 flex items-center justify-center text-zinc-400">Loading Diff Checker...</div>,
  ssr: false,
});
const QrCodeGenerator = dynamic(() => import("@/components/tools/QrCodeGenerator"), {
  loading: () => <div className="h-80 flex items-center justify-center text-zinc-400">Loading QR Code Generator...</div>,
  ssr: false,
});
const CaseConverter = dynamic(() => import("@/components/tools/CaseConverter"), {
  loading: () => <div className="h-80 flex items-center justify-center text-zinc-400">Loading Case Converter...</div>,
  ssr: false,
});
const Base64Codec = dynamic(() => import("@/components/tools/Base64Codec"), {
  loading: () => <div className="h-80 flex items-center justify-center text-zinc-400">Loading Base64 Codec...</div>,
  ssr: false,
});
const MarkdownPreviewer = dynamic(() => import("@/components/tools/MarkdownPreviewer"), {
  loading: () => <div className="h-80 flex items-center justify-center text-zinc-400">Loading Markdown Previewer...</div>,
  ssr: false,
});
const UrlCodec = dynamic(() => import("@/components/tools/UrlCodec"), {
  loading: () => <div className="h-80 flex items-center justify-center text-zinc-400">Loading URL Codec...</div>,
  ssr: false,
});
const HashGenerator = dynamic(() => import("@/components/tools/HashGenerator"), {
  loading: () => <div className="h-80 flex items-center justify-center text-zinc-400">Loading Hash Generator...</div>,
  ssr: false,
});
const ColorPalette = dynamic(() => import("@/components/tools/ColorPalette"), {
  loading: () => <div className="h-80 flex items-center justify-center text-zinc-400">Loading Color Palette...</div>,
  ssr: false,
});
const CssGradient = dynamic(() => import("@/components/tools/CssGradient"), {
  loading: () => <div className="h-80 flex items-center justify-center text-zinc-400">Loading CSS Gradient...</div>,
  ssr: false,
});
const RegexTester = dynamic(() => import("@/components/tools/RegexTester"), {
  loading: () => <div className="h-80 flex items-center justify-center text-zinc-400">Loading Regex Tester...</div>,
  ssr: false,
});
const BrowserInformation = dynamic(() => import("@/components/tools/BrowserInformation"), {
  loading: () => <div className="h-80 flex items-center justify-center text-zinc-400">Loading Browser Information...</div>,
  ssr: false,
});
const WebcamTest = dynamic(() => import("@/components/tools/WebcamTest"), {
  loading: () => <div className="h-80 flex items-center justify-center text-zinc-400">Loading Webcam Test...</div>,
  ssr: false,
});
const MetaTagGenerator = dynamic(() => import("@/components/tools/MetaTagGenerator"), {
  loading: () => <div className="h-80 flex items-center justify-center text-zinc-400">Loading Meta Tag Generator...</div>,
  ssr: false,
});
const InternetSpeedTest = dynamic(() => import("@/components/tools/InternetSpeedTest"), {
  loading: () => <div className="h-80 flex items-center justify-center text-zinc-400">Loading Internet Speed Test...</div>,
  ssr: false,
});

// Milestone 1 (Network & SEO Tools)
const DnsLookup = dynamic(() => import("@/components/tools/DnsLookup"), {
  loading: () => <div className="h-80 flex items-center justify-center text-zinc-400">Loading DNS Lookup...</div>,
  ssr: false,
});
const WhoisLookup = dynamic(() => import("@/components/tools/WhoisLookup"), {
  loading: () => <div className="h-80 flex items-center justify-center text-zinc-400">Loading WHOIS Lookup...</div>,
  ssr: false,
});
const SslCertificateChecker = dynamic(() => import("@/components/tools/SslCertificateChecker"), {
  loading: () => <div className="h-80 flex items-center justify-center text-zinc-400">Loading SSL Certificate Checker...</div>,
  ssr: false,
});
const IpLookup = dynamic(() => import("@/components/tools/IpLookup"), {
  loading: () => <div className="h-80 flex items-center justify-center text-zinc-400">Loading IP Lookup...</div>,
  ssr: false,
});
const HttpHeaderChecker = dynamic(() => import("@/components/tools/HttpHeaderChecker"), {
  loading: () => <div className="h-80 flex items-center justify-center text-zinc-400">Loading HTTP Header Checker...</div>,
  ssr: false,
});
const UserAgentParser = dynamic(() => import("@/components/tools/UserAgentParser"), {
  loading: () => <div className="h-80 flex items-center justify-center text-zinc-400">Loading User-Agent Parser...</div>,
  ssr: false,
});
const RobotsTxtGenerator = dynamic(() => import("@/components/tools/RobotsTxtGenerator"), {
  loading: () => <div className="h-80 flex items-center justify-center text-zinc-400">Loading Robots.txt Generator...</div>,
  ssr: false,
});
const SitemapGenerator = dynamic(() => import("@/components/tools/SitemapGenerator"), {
  loading: () => <div className="h-80 flex items-center justify-center text-zinc-400">Loading Sitemap Generator...</div>,
  ssr: false,
});
const OpenGraphGenerator = dynamic(() => import("@/components/tools/OpenGraphGenerator"), {
  loading: () => <div className="h-80 flex items-center justify-center text-zinc-400">Loading Open Graph Generator...</div>,
  ssr: false,
});
const RedirectChecker = dynamic(() => import("@/components/tools/RedirectChecker"), {
  loading: () => <div className="h-80 flex items-center justify-center text-zinc-400">Loading Redirect Checker...</div>,
  ssr: false,
});
const PingTool = dynamic(() => import("@/components/tools/PingTool"), {
  loading: () => <div className="h-80 flex items-center justify-center text-zinc-400">Loading Ping Tool...</div>,
  ssr: false,
});
const PortScanner = dynamic(() => import("@/components/tools/PortScanner"), {
  loading: () => <div className="h-80 flex items-center justify-center text-zinc-400">Loading Port Scanner...</div>,
  ssr: false,
});
const DomainAgeChecker = dynamic(() => import("@/components/tools/DomainAgeChecker"), {
  loading: () => <div className="h-80 flex items-center justify-center text-zinc-400">Loading Domain Age Checker...</div>,
  ssr: false,
});
const KeywordDensityChecker = dynamic(() => import("@/components/tools/KeywordDensityChecker"), {
  loading: () => <div className="h-80 flex items-center justify-center text-zinc-400">Loading Keyword Density Checker...</div>,
  ssr: false,
});
const MetaTagAnalyzer = dynamic(() => import("@/components/tools/MetaTagAnalyzer"), {
  loading: () => <div className="h-80 flex items-center justify-center text-zinc-400">Loading Meta Tag Analyzer...</div>,
  ssr: false,
});
const GoogleSerpSimulator = dynamic(() => import("@/components/tools/GoogleSerpSimulator"), {
  loading: () => <div className="h-80 flex items-center justify-center text-zinc-400">Loading Google SERP Simulator...</div>,
  ssr: false,
});
const CanonicalUrlChecker = dynamic(() => import("@/components/tools/CanonicalUrlChecker"), {
  loading: () => <div className="h-80 flex items-center justify-center text-zinc-400">Loading Canonical URL Checker...</div>,
  ssr: false,
});
const FaviconFetcher = dynamic(() => import("@/components/tools/FaviconFetcher"), {
  loading: () => <div className="h-80 flex items-center justify-center text-zinc-400">Loading Favicon Fetcher...</div>,
  ssr: false,
});
const BrokenLinkChecker = dynamic(() => import("@/components/tools/BrokenLinkChecker"), {
  loading: () => <div className="h-80 flex items-center justify-center text-zinc-400">Loading Broken Link Checker...</div>,
  ssr: false,
});
const SchemaMarkupGenerator = dynamic(() => import("@/components/tools/SchemaMarkupGenerator"), {
  loading: () => <div className="h-80 flex items-center justify-center text-zinc-400">Loading Schema Markup Generator...</div>,
  ssr: false,
});
const PageSpeedInsightsMock = dynamic(() => import("@/components/tools/PageSpeedInsightsMock"), {
  loading: () => <div className="h-80 flex items-center justify-center text-zinc-400">Loading PageSpeed Insights...</div>,
  ssr: false,
});
const SocialSharePreview = dynamic(() => import("@/components/tools/SocialSharePreview"), {
  loading: () => <div className="h-80 flex items-center justify-center text-zinc-400">Loading Social Share Preview...</div>,
  ssr: false,
});
const SlugGenerator = dynamic(() => import("@/components/tools/SlugGenerator"), {
  loading: () => <div className="h-80 flex items-center justify-center text-zinc-400">Loading Slug Generator...</div>,
  ssr: false,
});

interface ToolWrapperProps {
  slug: string;
}

export default function ToolWrapper({ slug }: ToolWrapperProps) {
  switch (slug) {
    case "json-formatter":
      return <JsonFormatter />;
    case "password-generator":
      return <PasswordGenerator />;
    case "diff-checker":
      return <DiffChecker />;
    case "qr-code-generator":
      return <QrCodeGenerator />;
    case "case-converter":
      return <CaseConverter />;
    case "base64-codec":
      return <Base64Codec />;
    case "markdown-previewer":
      return <MarkdownPreviewer />;
    case "url-codec":
      return <UrlCodec />;
    case "hash-generator":
      return <HashGenerator />;
    case "color-palette":
      return <ColorPalette />;
    case "css-gradient":
      return <CssGradient />;
    case "regex-tester":
      return <RegexTester />;
    case "browser-information":
      return <BrowserInformation />;
    case "webcam-test":
      return <WebcamTest />;
    case "meta-tag-generator":
      return <MetaTagGenerator />;
    case "internet-speed-test":
      return <InternetSpeedTest />;

    // Milestone 1 (Network & SEO Tools)
    case "dns-lookup":
      return <DnsLookup />;
    case "whois-lookup":
      return <WhoisLookup />;
    case "ssl-certificate-checker":
      return <SslCertificateChecker />;
    case "ip-lookup":
      return <IpLookup />;
    case "http-header-checker":
      return <HttpHeaderChecker />;
    case "user-agent-parser":
      return <UserAgentParser />;
    case "robots-txt-generator":
    case "robots-txt":
      return <RobotsTxtGenerator />;
    case "sitemap-generator":
      return <SitemapGenerator />;
    case "open-graph-generator":
    case "open-graph":
      return <OpenGraphGenerator />;
    case "redirect-checker":
      return <RedirectChecker />;
    case "ping-tool":
      return <PingTool />;
    case "port-scanner":
      return <PortScanner />;
    case "domain-age-checker":
      return <DomainAgeChecker />;
    case "keyword-density-checker":
      return <KeywordDensityChecker />;
    case "meta-tag-analyzer":
      return <MetaTagAnalyzer />;
    case "google-serp-simulator":
      return <GoogleSerpSimulator />;
    case "canonical-url-checker":
      return <CanonicalUrlChecker />;
    case "favicon-fetcher":
      return <FaviconFetcher />;
    case "broken-link-checker":
      return <BrokenLinkChecker />;
    case "schema-markup-generator":
      return <SchemaMarkupGenerator />;
    case "page-speed-insights-mock":
    case "page-speed-insights":
      return <PageSpeedInsightsMock />;
    case "social-share-preview":
      return <SocialSharePreview />;
    case "slug-generator":
      return <SlugGenerator />;

    default:
      return <PremiumFileUploader toolName={slug} />;
  }
}
