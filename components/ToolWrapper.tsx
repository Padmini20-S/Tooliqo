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
    default:
      return <PremiumFileUploader toolName={slug} />;
  }
}
