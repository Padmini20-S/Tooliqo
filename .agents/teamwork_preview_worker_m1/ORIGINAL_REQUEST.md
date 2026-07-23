## 2026-07-23T20:15:30Z
You are a Worker subagent assigned to execute Milestone 1 (M1: Core Network & SEO Tools) for Tooliqo.
Working directory: /home/coder2/tooliqo/.agents/teamwork_preview_worker_m1
Project directory: /home/coder2/tooliqo

MANDATORY INTEGRITY WARNING:
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A Forensic Auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

Tasks for Milestone 1:
1. Inspect `components/ToolWrapper.tsx` and existing files in `components/tools/`.
2. Integrate 3 existing unrouted real components in `components/ToolWrapper.tsx`:
   - `dns-lookup` -> `components/tools/DnsLookup.tsx` (import DnsLookup dynamically)
   - `whois-lookup` -> `components/tools/WhoisLookup.tsx` (import WhoisLookup dynamically)
   - `ssl-certificate-checker` -> `components/tools/SslCertificateChecker.tsx` (import SslCertificateChecker dynamically)
3. Implement functional, highly interactive React components in `components/tools/` for the following network & SEO tools (replacing stubs or creating new files as needed):
   - `ip-lookup` (`components/tools/IpLookup.tsx`) - Mock IP lookup with location, ISP, country, ASN, map preview.
   - `http-header-checker` (`components/tools/HttpHeaderChecker.tsx`) - URL input, mock HTTP response headers (status 200/301/404, server, content-type, cache-control, security headers).
   - `user-agent-parser` (`components/tools/UserAgentParser.tsx`) - Analyzes input user-agent string (or current navigator.userAgent) to detect Browser, OS, Device, Engine, CPU architecture.
   - `robots-txt-generator` (`components/tools/RobotsTxtGenerator.tsx`) - Interactive form to generate robots.txt rules (allow, disallow, sitemap, user-agents).
   - `sitemap-generator` (`components/tools/SitemapGenerator.tsx`) - URL list input with frequency/priority settings to generate XML sitemap output.
   - `open-graph-generator` (`components/tools/OpenGraphGenerator.tsx`) - Form for og:title, og:description, og:image, og:url, og:type with live card preview & code snippet export.
   - `redirect-checker` (`components/tools/RedirectChecker.tsx`) - Analyzes redirect chain (301 -> 302 -> 200) with status codes, headers, and final destination URL simulation.
   - `ping-tool` (`components/tools/PingTool.tsx`) - Host ping simulator with latency graph/table, packet loss %, min/max/avg RTT.
   - `port-scanner` (`components/tools/PortScanner.tsx`) - Target host & port list scanner (common ports 80, 443, 21, 22, 3306, 8080, etc.) with open/closed status simulation.
   - `domain-age-checker` (`components/tools/DomainAgeChecker.tsx`) - Domain age & creation date estimator/lookup simulation.
   - `keyword-density-checker` (`components/tools/KeywordDensityChecker.tsx`) - Analyzes input text for word count, top 1/2/3-word phrase density percentages, stop-word filtering.
   - `meta-tag-analyzer` (`components/tools/MetaTagAnalyzer.tsx`) - Analyzes HTML text input or URL for title length, meta description length, canonical tag, OG tags, header structure.
   - `google-serp-simulator` (`components/tools/GoogleSerpSimulator.tsx`) - Live preview of desktop and mobile Google SERP snippets based on page title, URL, and meta description.
   - `canonical-url-checker` (`components/tools/CanonicalUrlChecker.tsx`) - Validates canonical tag format, absolute vs relative links, cross-domain canonical checks.
   - `favicon-fetcher` (`components/tools/FaviconFetcher.tsx`) - Fetches/previews domain favicons in multiple resolutions (16x16, 32x32, apple-touch-icon) with download links.
   - `broken-link-checker` (`components/tools/BrokenLinkChecker.tsx`) - Scans pasted HTML content for broken href links, mailto, tel, anchor links, anchor text.
   - `schema-markup-generator` (`components/tools/SchemaMarkupGenerator.tsx`) - Generates JSON-LD structured data for Article, Product, LocalBusiness, FAQPage, Organization.
   - `page-speed-insights-mock` (`components/tools/PageSpeedInsightsMock.tsx`) - Simulates Lighthouse scores (Performance, Accessibility, SEO, Best Practices) with Core Web Vitals (FCP, LCP, CLS).
   - `social-share-preview` (`components/tools/SocialSharePreview.tsx`) - Previews link card renderings on Twitter/X, Facebook, LinkedIn, Discord.
   - `slug-generator` (`components/tools/SlugGenerator.tsx`) - Converts titles/text into URL-friendly clean slugs with customizable separators and lowercase options.
4. Wire ALL 23 tools in `components/ToolWrapper.tsx` (add dynamic imports and switch cases).
5. Run `npm run build` to verify clean compilation with zero linting/typing errors.
6. Write a summary handoff to `/home/coder2/tooliqo/.agents/teamwork_preview_worker_m1/handoff.md` and message the parent with build results.
