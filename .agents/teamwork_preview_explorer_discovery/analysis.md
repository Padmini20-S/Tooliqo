# Tooliqo Tool Inventory & Architectural Analysis Report

**Date:** 2026-07-23  
**Agent:** Explorer Agent (teamwork_preview_explorer_discovery)  
**Target Codebase:** `/home/coder2/tooliqo`

---

## 1. Executive Summary & Inventory Overview

Tooliqo is a web application featuring a broad suite of developer, SEO, design, content, and utility tools. This discovery audit examined the tool catalog definitions, component implementations, and routing structure to establish an exact inventory.

### Key Metrics
- **Total Tool Items in Catalog (`lib/tools.ts`):** 250
- **Unique Tool Slugs:** 243 (7 duplicate entries found in catalog)
- **Implemented & Routed Tools (Fully Functional):** 16
- **Implemented but Unrouted Tools (Orphaned Real Components):** 3 (`dns-lookup`, `whois-lookup`, `ssl-certificate-checker`)
- **Stub Component Files ("Under Construction"):** 87
- **No Component File (Falling Back to PremiumFileUploader):** 137
- **Total Missing / Incomplete Tools Needing Implementation:** **224** (137 No-File + 87 Stubs + 3 Unrouted Real)

---

## 2. Codebase Architecture & Routing Analysis

### 2.1 Installed Packages & Ecosystem (`package.json`)
- **Framework & UI:** Next.js `16.2.10`, React `19.0.0`, Tailwind CSS `4.1.11`
- **Icons & Visuals:** `lucide-react` (`^0.553.0`), `framer-motion` / `motion` (`^12.42.2`)
- **Utilities & Formatting:** `marked` (Markdown parsing), `react-qr-code` (QR generation), `clsx` & `tailwind-merge` (styling)
- **Backend & Auth / Services:** `@google/genai`, `bcryptjs`, `jsonwebtoken`, `mongoose`, `resend`, `sonner`

### 2.2 Tool Definitions Catalog (`lib/tools.ts`)
- Defines `Tool` interface (`slug`, `name`, `description`, `longDescription`, `category`, `icon`, `keywords`)
- Contains 8 categories: `dev` (70 unique), `utility` (25 unique), `design` (31 unique), `text` (34 unique), `seo` (24 unique), `social` (20 unique), `business` (20 unique), `student` (20 unique).
- **Duplicate Slugs Detected (7):** `css-gradient` (index 54), `slug-generator` (index 113), `jwt-decoder` (index 125), `uuid-generator` (index 127), `csv-to-json` (index 136), `json-to-csv` (index 137), `svg-optimizer` (index 163).

### 2.3 Routing & Component Rendering (`components/ToolWrapper.tsx`)
- Tool pages (`app/tool/[slug]/page.tsx`) pass `tool.slug` to `<ToolWrapper slug={tool.slug} />`.
- `ToolWrapper.tsx` uses dynamic imports (`next/dynamic` with `ssr: false`) and a `switch(slug)` block.
- Currently, only **16 tools** have explicit cases in `ToolWrapper.tsx`.
- All other 227 tools hit the `default` case: `return <PremiumFileUploader toolName={slug} />;`.

### 2.4 Unrouted Real Components
Three tools have complete, fully implemented component files (>9 KB each) in `components/tools/`, but are NOT in `ToolWrapper.tsx`:
1. `dns-lookup` -> `DnsLookup.tsx` (9,219 bytes) - Features simulated DNS lookup for A, AAAA, MX, NS, TXT, SOA records.
2. `whois-lookup` -> `WhoisLookup.tsx` (9,984 bytes) - Features domain WHOIS queries with registrar, expiry, and status output.
3. `ssl-certificate-checker` -> `SslCertificateChecker.tsx` (11,468 bytes) - Features SSL certificate inspection, cipher suite checks, and validity indicators.

---

## 3. Implemented Tools Catalog

### 3.1 Implemented & Routed Tools (16)
| Slug | Name | Category | Component File | Size |
|---|---|---|---|---|
| `json-formatter` | JSON Formatter & Validator | `dev` | `JsonFormatter.tsx` | Dynamic |
| `password-generator` | Secure Password Generator | `utility` | `PasswordGenerator.tsx` | Dynamic |
| `diff-checker` | Text Diff Checker | `dev` | `DiffChecker.tsx` | Dynamic |
| `qr-code-generator` | QR Code Generator | `design` | `QrCodeGenerator.tsx` | Dynamic |
| `case-converter` | Text Case Converter | `text` | `CaseConverter.tsx` | Dynamic |
| `base64-codec` | Base64 Encoder / Decoder | `dev` | `Base64Codec.tsx` | Dynamic |
| `markdown-previewer` | Live Markdown Editor & Previewer | `text` | `MarkdownPreviewer.tsx` | Dynamic |
| `url-codec` | URL Encoder / Decoder | `dev` | `UrlCodec.tsx` | Dynamic |
| `hash-generator` | Cryptographic Hash Generator | `dev` | `HashGenerator.tsx` | Dynamic |
| `color-palette` | Color Palette Generator | `design` | `ColorPalette.tsx` | Dynamic |
| `css-gradient` | CSS Gradient Generator | `design` | `CssGradient.tsx` | Dynamic |
| `regex-tester` | Interactive Regex Tester | `utility` | `RegexTester.tsx` | Dynamic |
| `meta-tag-generator` | Meta Tag Generator | `seo` | `MetaTagGenerator.tsx` | Dynamic |
| `internet-speed-test` | Internet Speed Test | `utility` | `InternetSpeedTest.tsx` | Dynamic |
| `webcam-test` | Webcam Test | `utility` | `WebcamTest.tsx` | Dynamic |
| `browser-information` | Browser Information | `utility` | `BrowserInformation.tsx` | Dynamic |

### 3.2 Implemented but Unrouted Tools (3)
| Slug | Name | Category | Component File | Action Required |
|---|---|---|---|---|
| `whois-lookup` | WHOIS Lookup | `seo` | `WhoisLookup.tsx` | Add case to `ToolWrapper.tsx` |
| `dns-lookup` | DNS Lookup | `seo` | `DnsLookup.tsx` | Add case to `ToolWrapper.tsx` |
| `ssl-certificate-checker` | SSL Certificate Checker | `dev` | `SslCertificateChecker.tsx` | Add case to `ToolWrapper.tsx` |

---

## 4. Comprehensive Inventory of Missing Tools

### 4.1 No-File Tools (137 Tools)
*These tools have entry definitions in `lib/tools.ts` but no `.tsx` component file in `components/tools/`.*

| Slug | Name | Category | API Mocking Required | Recommended UI Pattern |
|---|---|---|---|---|
| `schema-markup-generator` | Schema Markup Generator | `seo` | No (Pure Client) | Interactive Controls & Live Output / Download |
| `robots-txt-generator` | Robots.txt Generator | `seo` | No (Pure Client) | Interactive Controls & Live Output / Download |
| `sitemap-validator` | Sitemap Validator | `seo` | No (Pure Client) | Single Input Form with Status / Detailed Metrics Cards |
| `open-graph-generator` | Open Graph Generator | `seo` | No (Pure Client) | Interactive Controls & Live Output / Download |
| `twitter-card-generator` | Twitter Card Generator | `seo` | No (Pure Client) | Interactive Controls & Live Output / Download |
| `canonical-url-checker` | Canonical URL Checker | `seo` | Yes (Mocked/Simulated) | Single Input Form with Status / Detailed Metrics Cards |
| `hreflang-generator` | Hreflang Generator | `seo` | No (Pure Client) | Interactive Controls & Live Output / Download |
| `redirect-checker` | Redirect Checker | `seo` | Yes (Mocked/Simulated) | Single Input Form with Status / Detailed Metrics Cards |
| `keyword-density-checker` | Keyword Density Checker | `seo` | Yes (Mocked/Simulated) | Single Input Form with Status / Detailed Metrics Cards |
| `keyword-difficulty-checker` | Keyword Difficulty Checker | `seo` | Yes (Mocked/Simulated) | Single Input Form with Status / Detailed Metrics Cards |
| `serp-preview-tool` | SERP Preview Tool | `seo` | Yes (Mocked/Simulated) | Input Form with Process Button & Formatted Results Display |
| `meta-description-generator` | Meta Description Generator | `seo` | Yes (Mocked/Simulated) | Interactive Controls & Live Output / Download |
| `html-sitemap-generator` | HTML Sitemap Generator | `seo` | No (Pure Client) | Interactive Controls & Live Output / Download |
| `favicon-checker` | Favicon Checker | `seo` | Yes (Mocked/Simulated) | Single Input Form with Status / Detailed Metrics Cards |
| `broken-link-checker` | Broken Link Checker | `seo` | Yes (Mocked/Simulated) | Single Input Form with Status / Detailed Metrics Cards |
| `utm-builder` | UTM Builder | `seo` | No (Pure Client) | Input Form with Process Button & Formatted Results Display |
| `url-shortener` | URL Shortener | `seo` | No (Pure Client) | Input Form with Process Button & Formatted Results Display |
| `redirect-generator` | Redirect Generator | `seo` | Yes (Mocked/Simulated) | Interactive Controls & Live Output / Download |
| `page-speed-analyzer` | Page Speed Analyzer | `seo` | Yes (Mocked/Simulated) | Single Input Form with Status / Detailed Metrics Cards |
| `mobile-friendly-checker` | Mobile Friendly Checker | `seo` | Yes (Mocked/Simulated) | Single Input Form with Status / Detailed Metrics Cards |
| `domain-age-checker` | Domain Age Checker | `seo` | Yes (Mocked/Simulated) | Single Input Form with Status / Detailed Metrics Cards |
| `jwt-encoder` | JWT Encoder | `dev` | No (Pure Client) | Dual-Pane Text / Code Editor (Input -> Transform -> Output) |
| `uuid-validator` | UUID Validator | `dev` | No (Pure Client) | Single Input Form with Status / Detailed Metrics Cards |
| `curl-generator` | Curl Generator | `dev` | No (Pure Client) | Interactive Controls & Live Output / Download |
| `api-request-tester` | API Request Tester | `dev` | No (Pure Client) | Single Input Form with Status / Detailed Metrics Cards |
| `graphql-formatter` | GraphQL Formatter | `dev` | No (Pure Client) | Dual-Pane Text / Code Editor (Input -> Transform -> Output) |
| `xml-validator` | XML Validator | `dev` | No (Pure Client) | Single Input Form with Status / Detailed Metrics Cards |
| `yaml-validator` | YAML Validator | `dev` | No (Pure Client) | Single Input Form with Status / Detailed Metrics Cards |
| `toml-formatter` | TOML Formatter | `dev` | No (Pure Client) | Dual-Pane Text / Code Editor (Input -> Transform -> Output) |
| `csv-viewer` | CSV Viewer | `dev` | No (Pure Client) | Input Form with Process Button & Formatted Results Display |
| `xml-to-json` | XML to JSON | `dev` | No (Pure Client) | Input Form with Process Button & Formatted Results Display |
| `json-diff-checker` | JSON Diff Checker | `dev` | Yes (Mocked/Simulated) | Single Input Form with Status / Detailed Metrics Cards |
| `unix-timestamp-converter` | Unix Timestamp Converter | `dev` | No (Pure Client) | Dual-Pane Text / Code Editor (Input -> Transform -> Output) |
| `regex-generator` | Regex Generator | `dev` | No (Pure Client) | Interactive Controls & Live Output / Download |
| `cron-generator` | Cron Generator | `dev` | No (Pure Client) | Interactive Controls & Live Output / Download |
| `http-header-checker` | HTTP Header Checker | `dev` | Yes (Mocked/Simulated) | Single Input Form with Status / Detailed Metrics Cards |
| `mime-type-finder` | MIME Type Finder | `dev` | No (Pure Client) | Input Form with Process Button & Formatted Results Display |
| `port-checker` | Port Checker | `dev` | Yes (Mocked/Simulated) | Single Input Form with Status / Detailed Metrics Cards |
| `base32-encoder` | Base32 Encoder | `dev` | No (Pure Client) | Dual-Pane Text / Code Editor (Input -> Transform -> Output) |
| `hex-converter` | Hex Converter | `dev` | No (Pure Client) | Dual-Pane Text / Code Editor (Input -> Transform -> Output) |
| `binary-converter` | Binary Converter | `dev` | No (Pure Client) | Dual-Pane Text / Code Editor (Input -> Transform -> Output) |
| `svg-wave-generator` | SVG Wave Generator | `design` | No (Pure Client) | Interactive Controls & Live Output / Download |
| `svg-blob-generator` | SVG Blob Generator | `design` | No (Pure Client) | Interactive Controls & Live Output / Download |
| `css-animation-generator` | CSS Animation Generator | `design` | No (Pure Client) | Interactive Controls & Live Output / Download |
| `css-grid-generator` | CSS Grid Generator | `design` | No (Pure Client) | Interactive Controls & Live Output / Download |
| `flexbox-generator` | Flexbox Generator | `design` | No (Pure Client) | Interactive Controls & Live Output / Download |
| `glassmorphism-generator` | Glassmorphism Generator | `design` | No (Pure Client) | Interactive Controls & Live Output / Download |
| `neumorphism-generator` | Neumorphism Generator | `design` | No (Pure Client) | Interactive Controls & Live Output / Download |
| `css-button-generator` | CSS Button Generator | `design` | No (Pure Client) | Interactive Controls & Live Output / Download |
| `css-shadow-generator` | CSS Shadow Generator | `design` | No (Pure Client) | Interactive Controls & Live Output / Download |
| `gradient-mesh-generator` | Gradient Mesh Generator | `design` | No (Pure Client) | Interactive Controls & Live Output / Download |
| `color-blindness-simulator` | Color Blindness Simulator | `design` | No (Pure Client) | Visual Canvas / Interactive Slider & Color Picker Preview |
| `palette-extractor` | Palette Extractor | `design` | No (Pure Client) | Visual Canvas / Interactive Slider & Color Picker Preview |
| `font-pair-generator` | Font Pair Generator | `design` | No (Pure Client) | Interactive Controls & Live Output / Download |
| `qr-sticker-generator` | QR Sticker Generator | `design` | No (Pure Client) | Interactive Controls & Live Output / Download |
| `mockup-generator` | Mockup Generator | `design` | No (Pure Client) | Interactive Controls & Live Output / Download |
| `browser-frame-generator` | Browser Frame Generator | `design` | No (Pure Client) | Interactive Controls & Live Output / Download |
| `icon-converter` | Icon Converter | `design` | No (Pure Client) | Dual-Pane Text / Code Editor (Input -> Transform -> Output) |
| `css-loader-generator` | CSS Loader Generator | `design` | No (Pure Client) | Interactive Controls & Live Output / Download |
| `favicon-pack-generator` | Favicon Pack Generator | `design` | No (Pure Client) | Interactive Controls & Live Output / Download |
| `linkedin-headline-generator` | LinkedIn Headline Generator | `social` | No (Pure Client) | Interactive Controls & Live Output / Download |
| `linkedin-summary-generator` | LinkedIn Summary Generator | `social` | No (Pure Client) | Interactive Controls & Live Output / Download |
| `youtube-chapter-generator` | YouTube Chapter Generator | `social` | No (Pure Client) | Interactive Controls & Live Output / Download |
| `youtube-timestamp-generator` | YouTube Timestamp Generator | `social` | No (Pure Client) | Interactive Controls & Live Output / Download |
| `reel-hook-generator` | Reel Hook Generator | `social` | No (Pure Client) | Interactive Controls & Live Output / Download |
| `viral-caption-generator` | Viral Caption Generator | `social` | No (Pure Client) | Interactive Controls & Live Output / Download |
| `hashtag-analyzer` | Hashtag Analyzer | `social` | No (Pure Client) | Single Input Form with Status / Detailed Metrics Cards |
| `bio-link-generator` | Bio Link Generator | `social` | No (Pure Client) | Interactive Controls & Live Output / Download |
| `emoji-combiner` | Emoji Combiner | `social` | No (Pure Client) | Input Form with Process Button & Formatted Results Display |
| `thumbnail-title-analyzer` | Thumbnail Title Analyzer | `social` | No (Pure Client) | Single Input Form with Status / Detailed Metrics Cards |
| `username-availability-checker` | Username Availability Checker | `social` | Yes (Mocked/Simulated) | Single Input Form with Status / Detailed Metrics Cards |
| `social-post-formatter` | Social Post Formatter | `social` | No (Pure Client) | Dual-Pane Text / Code Editor (Input -> Transform -> Output) |
| `cta-generator` | CTA Generator | `social` | No (Pure Client) | Interactive Controls & Live Output / Download |
| `comment-generator` | Comment Generator | `social` | No (Pure Client) | Interactive Controls & Live Output / Download |
| `poll-generator` | Poll Generator | `social` | No (Pure Client) | Interactive Controls & Live Output / Download |
| `giveaway-picker` | Giveaway Picker | `social` | No (Pure Client) | Input Form with Process Button & Formatted Results Display |
| `youtube-comment-picker` | YouTube Comment Picker | `social` | No (Pure Client) | Input Form with Process Button & Formatted Results Display |
| `viral-hook-generator` | Viral Hook Generator | `social` | No (Pure Client) | Interactive Controls & Live Output / Download |
| `engagement-calculator` | Engagement Calculator | `social` | No (Pure Client) | Form Input Grid with Instant Real-Time Formula Outputs |
| `trending-hashtag-finder` | Trending Hashtag Finder | `social` | No (Pure Client) | Input Form with Process Button & Formatted Results Display |
| `invoice-number-generator` | Invoice Number Generator | `business` | No (Pure Client) | Interactive Controls & Live Output / Download |
| `gst-hsn-finder` | GST HSN Finder | `business` | No (Pure Client) | Input Form with Process Button & Formatted Results Display |
| `profit-margin-analyzer` | Profit Margin Analyzer | `business` | No (Pure Client) | Single Input Form with Status / Detailed Metrics Cards |
| `break-even-calculator` | Break-even Calculator | `business` | No (Pure Client) | Form Input Grid with Instant Real-Time Formula Outputs |
| `sales-commission-calculator` | Sales Commission Calculator | `business` | No (Pure Client) | Form Input Grid with Instant Real-Time Formula Outputs |
| `startup-burn-rate-calculator` | Startup Burn Rate Calculator | `business` | No (Pure Client) | Form Input Grid with Instant Real-Time Formula Outputs |
| `roi-calculator` | ROI Calculator | `business` | No (Pure Client) | Form Input Grid with Instant Real-Time Formula Outputs |
| `cac-calculator` | CAC Calculator | `business` | No (Pure Client) | Form Input Grid with Instant Real-Time Formula Outputs |
| `ltv-calculator` | LTV Calculator | `business` | No (Pure Client) | Form Input Grid with Instant Real-Time Formula Outputs |
| `salary-hike-calculator` | Salary Hike Calculator | `business` | No (Pure Client) | Form Input Grid with Instant Real-Time Formula Outputs |
| `freelance-rate-calculator` | Freelance Rate Calculator | `business` | No (Pure Client) | Form Input Grid with Instant Real-Time Formula Outputs |
| `pricing-calculator` | Pricing Calculator | `business` | No (Pure Client) | Form Input Grid with Instant Real-Time Formula Outputs |
| `subscription-calculator` | Subscription Calculator | `business` | Yes (Mocked/Simulated) | Form Input Grid with Instant Real-Time Formula Outputs |
| `business-name-score-checker` | Business Name Score Checker | `business` | Yes (Mocked/Simulated) | Single Input Form with Status / Detailed Metrics Cards |
| `invoice-due-date-calculator` | Invoice Due Date Calculator | `business` | No (Pure Client) | Form Input Grid with Instant Real-Time Formula Outputs |
| `quotation-builder` | Quotation Builder | `business` | No (Pure Client) | Input Form with Process Button & Formatted Results Display |
| `receipt-builder` | Receipt Builder | `business` | Yes (Mocked/Simulated) | Input Form with Process Button & Formatted Results Display |
| `tax-estimator` | Tax Estimator | `business` | No (Pure Client) | Input Form with Process Button & Formatted Results Display |
| `profit-split-calculator` | Profit Split Calculator | `business` | No (Pure Client) | Form Input Grid with Instant Real-Time Formula Outputs |
| `expense-tracker` | Expense Tracker | `business` | No (Pure Client) | Input Form with Process Button & Formatted Results Display |
| `study-planner` | Study Planner | `student` | No (Pure Client) | Input Form with Process Button & Formatted Results Display |
| `revision-planner` | Revision Planner | `student` | No (Pure Client) | Input Form with Process Button & Formatted Results Display |
| `flashcard-generator` | Flashcard Generator | `student` | No (Pure Client) | Interactive Controls & Live Output / Download |
| `assignment-planner` | Assignment Planner | `student` | No (Pure Client) | Input Form with Process Button & Formatted Results Display |
| `citation-formatter` | Citation Formatter | `student` | No (Pure Client) | Dual-Pane Text / Code Editor (Input -> Transform -> Output) |
| `apa-generator` | APA Generator | `student` | No (Pure Client) | Interactive Controls & Live Output / Download |
| `mla-generator` | MLA Generator | `student` | No (Pure Client) | Interactive Controls & Live Output / Download |
| `research-outline-generator` | Research Outline Generator | `student` | No (Pure Client) | Interactive Controls & Live Output / Download |
| `quiz-generator` | Quiz Generator | `student` | No (Pure Client) | Interactive Controls & Live Output / Download |
| `random-question-picker` | Random Question Picker | `student` | No (Pure Client) | Input Form with Process Button & Formatted Results Display |
| `study-timer` | Study Timer | `student` | No (Pure Client) | Input Form with Process Button & Formatted Results Display |
| `reading-time-calculator` | Reading Time Calculator | `student` | No (Pure Client) | Form Input Grid with Instant Real-Time Formula Outputs |
| `exam-countdown` | Exam Countdown | `student` | No (Pure Client) | Input Form with Process Button & Formatted Results Display |
| `gpa-planner` | GPA Planner | `student` | No (Pure Client) | Input Form with Process Button & Formatted Results Display |
| `attendance-goal-calculator` | Attendance Goal Calculator | `student` | No (Pure Client) | Form Input Grid with Instant Real-Time Formula Outputs |
| `notes-formatter` | Notes Formatter | `student` | No (Pure Client) | Dual-Pane Text / Code Editor (Input -> Transform -> Output) |
| `formula-sheet-generator` | Formula Sheet Generator | `student` | No (Pure Client) | Interactive Controls & Live Output / Download |
| `homework-tracker` | Homework Tracker | `student` | No (Pure Client) | Input Form with Process Button & Formatted Results Display |
| `subject-timetable-generator` | Subject Timetable Generator | `student` | No (Pure Client) | Interactive Controls & Live Output / Download |
| `essay-outline-generator` | Essay Outline Generator | `student` | No (Pure Client) | Interactive Controls & Live Output / Download |
| `microphone-test` | Microphone Test | `utility` | No (Pure Client) | Input Form with Process Button & Formatted Results Display |
| `keyboard-tester` | Keyboard Tester | `utility` | No (Pure Client) | Single Input Form with Status / Detailed Metrics Cards |
| `mouse-tester` | Mouse Tester | `utility` | No (Pure Client) | Single Input Form with Status / Detailed Metrics Cards |
| `screen-resolution-checker` | Screen Resolution Checker | `utility` | Yes (Mocked/Simulated) | Single Input Form with Status / Detailed Metrics Cards |
| `device-information` | Device Information | `utility` | No (Pure Client) | Input Form with Process Button & Formatted Results Display |
| `battery-status-checker` | Battery Status Checker | `utility` | Yes (Mocked/Simulated) | Single Input Form with Status / Detailed Metrics Cards |
| `ip-geolocation` | IP Geolocation | `utility` | Yes (Mocked/Simulated) | Input Form with Process Button & Formatted Results Display |
| `time-zone-finder` | Time Zone Finder | `utility` | No (Pure Client) | Input Form with Process Button & Formatted Results Display |
| `network-ping-test` | Network Ping Test | `utility` | Yes (Mocked/Simulated) | Input Form with Process Button & Formatted Results Display |
| `internet-latency-checker` | Internet Latency Checker | `utility` | Yes (Mocked/Simulated) | Single Input Form with Status / Detailed Metrics Cards |
| `clipboard-cleaner` | Clipboard Cleaner | `utility` | Yes (Mocked/Simulated) | Input Form with Process Button & Formatted Results Display |
| `random-picker` | Random Picker | `utility` | No (Pure Client) | Input Form with Process Button & Formatted Results Display |
| `spin-wheel` | Spin Wheel | `utility` | No (Pure Client) | Input Form with Process Button & Formatted Results Display |
| `coin-flip` | Coin Flip | `utility` | Yes (Mocked/Simulated) | Input Form with Process Button & Formatted Results Display |
| `dice-roller` | Dice Roller | `utility` | No (Pure Client) | Input Form with Process Button & Formatted Results Display |
| `password-audit` | Password Audit | `utility` | No (Pure Client) | Input Form with Process Button & Formatted Results Display |
| `random-secret-generator` | Random Secret Generator | `utility` | No (Pure Client) | Interactive Controls & Live Output / Download |


### 4.2 Stub Components (87 Tools)
*These tools have `.tsx` files in `components/tools/` containing only the "Under Construction" dummy card.*

| Slug | Name | Category | API Mocking Required | Recommended UI Pattern |
|---|---|---|---|---|
| `jwt-decoder` | JWT Decoder | `dev` | No (Pure Client) | Dual-Pane Text / Code Editor (Input -> Transform -> Output) |
| `html-entity-encoder` | HTML Entity Encoder | `dev` | No (Pure Client) | Dual-Pane Text / Code Editor (Input -> Transform -> Output) |
| `url-parser` | URL Parser | `dev` | No (Pure Client) | Dual-Pane Text / Code Editor (Input -> Transform -> Output) |
| `uuid-generator` | UUID Generator | `utility` | No (Pure Client) | Interactive Controls & Live Output / Download |
| `lorem-ipsum` | Lorem Ipsum Generator | `text` | Yes (Mocked/Simulated) | Input Form with Process Button & Formatted Results Display |
| `color-contrast` | Color Contrast Checker | `design` | Yes (Mocked/Simulated) | Visual Canvas / Interactive Slider & Color Picker Preview |
| `bcrypt-generator` | Bcrypt Hash Generator | `dev` | No (Pure Client) | Interactive Controls & Live Output / Download |
| `json-to-csv` | JSON to CSV | `dev` | No (Pure Client) | Input Form with Process Button & Formatted Results Display |
| `csv-to-json` | CSV to JSON | `dev` | No (Pure Client) | Input Form with Process Button & Formatted Results Display |
| `sql-formatter` | SQL Formatter | `dev` | No (Pure Client) | Dual-Pane Text / Code Editor (Input -> Transform -> Output) |
| `css-minifier` | CSS Minifier | `dev` | No (Pure Client) | Dual-Pane Text / Code Editor (Input -> Transform -> Output) |
| `js-minifier` | JS Minifier | `dev` | No (Pure Client) | Dual-Pane Text / Code Editor (Input -> Transform -> Output) |
| `html-minifier` | HTML Minifier | `dev` | No (Pure Client) | Dual-Pane Text / Code Editor (Input -> Transform -> Output) |
| `base32-codec` | Base32 Encoder/Decoder | `dev` | No (Pure Client) | Input Form with Process Button & Formatted Results Display |
| `hex-to-rgb` | Hex to RGB | `design` | No (Pure Client) | Input Form with Process Button & Formatted Results Display |
| `rgb-to-hex` | RGB to Hex | `design` | No (Pure Client) | Input Form with Process Button & Formatted Results Display |
| `text-reverser` | Text Reverser | `text` | No (Pure Client) | Input Form with Process Button & Formatted Results Display |
| `word-counter` | Word Counter | `text` | No (Pure Client) | Single Input Form with Status / Detailed Metrics Cards |
| `markdown-to-html` | Markdown to HTML | `dev` | No (Pure Client) | Input Form with Process Button & Formatted Results Display |
| `html-to-markdown` | HTML to Markdown | `dev` | No (Pure Client) | Input Form with Process Button & Formatted Results Display |
| `unix-timestamp` | Unix Timestamp Converter | `dev` | No (Pure Client) | Input Form with Process Button & Formatted Results Display |
| `chmod-calculator` | Chmod Calculator | `dev` | No (Pure Client) | Form Input Grid with Instant Real-Time Formula Outputs |
| `crontab-generator` | Crontab Generator | `dev` | No (Pure Client) | Interactive Controls & Live Output / Download |
| `regex-matcher` | Regex Matcher | `dev` | No (Pure Client) | Input Form with Process Button & Formatted Results Display |
| `xml-formatter` | XML Formatter | `dev` | No (Pure Client) | Dual-Pane Text / Code Editor (Input -> Transform -> Output) |
| `json-validator` | JSON Validator | `dev` | No (Pure Client) | Single Input Form with Status / Detailed Metrics Cards |
| `svg-optimizer` | SVG Optimizer | `design` | No (Pure Client) | Input Form with Process Button & Formatted Results Display |
| `password-checker` | Password Strength Checker | `utility` | Yes (Mocked/Simulated) | Single Input Form with Status / Detailed Metrics Cards |
| `random-string` | Random String Generator | `utility` | No (Pure Client) | Input Form with Process Button & Formatted Results Display |
| `text-diff` | Text Diff Checker | `text` | Yes (Mocked/Simulated) | Input Form with Process Button & Formatted Results Display |
| `yaml-to-json` | YAML to JSON | `dev` | No (Pure Client) | Input Form with Process Button & Formatted Results Display |
| `json-to-yaml` | JSON to YAML | `dev` | No (Pure Client) | Input Form with Process Button & Formatted Results Display |
| `url-decode` | URL Decode | `dev` | No (Pure Client) | Input Form with Process Button & Formatted Results Display |
| `url-encode` | URL Encode | `dev` | No (Pure Client) | Input Form with Process Button & Formatted Results Display |
| `binary-to-text` | Binary to Text | `dev` | No (Pure Client) | Input Form with Process Button & Formatted Results Display |
| `text-to-binary` | Text to Binary | `dev` | No (Pure Client) | Input Form with Process Button & Formatted Results Display |
| `hex-to-text` | Hex to Text | `dev` | No (Pure Client) | Input Form with Process Button & Formatted Results Display |
| `text-to-hex` | Text to Hex | `dev` | No (Pure Client) | Input Form with Process Button & Formatted Results Display |
| `ascii-converter` | ASCII Converter | `dev` | No (Pure Client) | Dual-Pane Text / Code Editor (Input -> Transform -> Output) |
| `hash-calculator` | Hash Calculator | `dev` | No (Pure Client) | Form Input Grid with Instant Real-Time Formula Outputs |
| `hmac-generator` | HMAC Generator | `dev` | Yes (Mocked/Simulated) | Interactive Controls & Live Output / Download |
| `rsa-generator` | RSA Key Generator | `dev` | No (Pure Client) | Interactive Controls & Live Output / Download |
| `box-shadow` | Box Shadow Generator | `design` | No (Pure Client) | Visual Canvas / Interactive Slider & Color Picker Preview |
| `border-radius` | Border Radius Generator | `design` | No (Pure Client) | Input Form with Process Button & Formatted Results Display |
| `glassmorphism` | Glassmorphism Generator | `design` | No (Pure Client) | Visual Canvas / Interactive Slider & Color Picker Preview |
| `neumorphism` | Neumorphism Generator | `design` | No (Pure Client) | Visual Canvas / Interactive Slider & Color Picker Preview |
| `text-shadow` | Text Shadow Generator | `design` | No (Pure Client) | Visual Canvas / Interactive Slider & Color Picker Preview |
| `meta-tags` | Meta Tag Generator | `dev` | No (Pure Client) | Input Form with Process Button & Formatted Results Display |
| `open-graph` | Open Graph Generator | `dev` | No (Pure Client) | Input Form with Process Button & Formatted Results Display |
| `twitter-card` | Twitter Card Generator | `dev` | No (Pure Client) | Input Form with Process Button & Formatted Results Display |
| `robots-txt` | Robots.txt Generator | `dev` | No (Pure Client) | Input Form with Process Button & Formatted Results Display |
| `sitemap-generator` | Sitemap Generator | `dev` | No (Pure Client) | Interactive Controls & Live Output / Download |
| `htaccess-generator` | Htaccess Generator | `dev` | No (Pure Client) | Interactive Controls & Live Output / Download |
| `string-manipulation` | String Manipulation | `text` | Yes (Mocked/Simulated) | Input Form with Process Button & Formatted Results Display |
| `remove-line-breaks` | Remove Line Breaks | `text` | No (Pure Client) | Input Form with Process Button & Formatted Results Display |
| `remove-spaces` | Remove Extra Spaces | `text` | No (Pure Client) | Input Form with Process Button & Formatted Results Display |
| `extract-emails` | Extract Emails | `text` | No (Pure Client) | Input Form with Process Button & Formatted Results Display |
| `extract-urls` | Extract URLs | `text` | No (Pure Client) | Input Form with Process Button & Formatted Results Display |
| `sort-lines` | Sort Lines | `text` | No (Pure Client) | Input Form with Process Button & Formatted Results Display |
| `shuffle-lines` | Shuffle Lines | `text` | No (Pure Client) | Input Form with Process Button & Formatted Results Display |
| `reverse-lines` | Reverse Lines | `text` | No (Pure Client) | Input Form with Process Button & Formatted Results Display |
| `remove-duplicates` | Duplicate Line Remover | `text` | No (Pure Client) | Input Form with Process Button & Formatted Results Display |
| `add-prefix-suffix` | Prefix/Suffix Adder | `text` | No (Pure Client) | Input Form with Process Button & Formatted Results Display |
| `find-replace` | Find and Replace | `text` | No (Pure Client) | Input Form with Process Button & Formatted Results Display |
| `markdown-table` | Markdown Table Generator | `dev` | No (Pure Client) | Input Form with Process Button & Formatted Results Display |
| `json-stringify` | JSON Stringify | `dev` | No (Pure Client) | Input Form with Process Button & Formatted Results Display |
| `json-parse` | JSON Parse | `dev` | No (Pure Client) | Input Form with Process Button & Formatted Results Display |
| `slug-generator` | URL Slug Generator | `text` | No (Pure Client) | Interactive Controls & Live Output / Download |
| `title-case` | Title Case Converter | `text` | No (Pure Client) | Input Form with Process Button & Formatted Results Display |
| `camel-case` | Camel Case Converter | `text` | No (Pure Client) | Input Form with Process Button & Formatted Results Display |
| `snake-case` | Snake Case Converter | `text` | No (Pure Client) | Input Form with Process Button & Formatted Results Display |
| `kebab-case` | Kebab Case Converter | `text` | No (Pure Client) | Input Form with Process Button & Formatted Results Display |
| `pascal-case` | Pascal Case Converter | `text` | No (Pure Client) | Input Form with Process Button & Formatted Results Display |
| `constant-case` | Constant Case Converter | `text` | No (Pure Client) | Input Form with Process Button & Formatted Results Display |
| `dot-case` | Dot Case Converter | `text` | No (Pure Client) | Input Form with Process Button & Formatted Results Display |
| `path-case` | Path Case Converter | `text` | No (Pure Client) | Input Form with Process Button & Formatted Results Display |
| `sentence-case` | Sentence Case Converter | `text` | No (Pure Client) | Input Form with Process Button & Formatted Results Display |
| `toggle-case` | Toggle Case Converter | `text` | No (Pure Client) | Input Form with Process Button & Formatted Results Display |
| `alternating-case` | Alternating Case | `text` | No (Pure Client) | Input Form with Process Button & Formatted Results Display |
| `wide-text` | Wide Text Generator | `text` | No (Pure Client) | Input Form with Process Button & Formatted Results Display |
| `zalgo-text` | Zalgo Text Generator | `text` | No (Pure Client) | Input Form with Process Button & Formatted Results Display |
| `upside-down` | Upside Down Text | `text` | No (Pure Client) | Input Form with Process Button & Formatted Results Display |
| `morse-code` | Morse Code Converter | `text` | No (Pure Client) | Input Form with Process Button & Formatted Results Display |
| `braille-translator` | Braille Translator | `text` | No (Pure Client) | Input Form with Process Button & Formatted Results Display |
| `rot13-decoder` | ROT13 Decoder | `dev` | No (Pure Client) | Dual-Pane Text / Code Editor (Input -> Transform -> Output) |
| `bip39-generator` | BIP39 Mnemonic Generator | `dev` | Yes (Mocked/Simulated) | Interactive Controls & Live Output / Download |
| `vigenere-cipher` | Vigenere Cipher | `dev` | Yes (Mocked/Simulated) | Input Form with Process Button & Formatted Results Display |


---

## 5. API Mocking & UI Requirements Summary

### 5.1 API Mocking Requirements
Tools that interact with external networks, DNS servers, WHOIS databases, SSL certificates, or IP geolocation cannot run pure client-side JS without CORS or network constraints. They require **API Mocking** (simulated responses using `setTimeout` and realistic domain data) or proxy endpoints:
- **Network / DNS / IP Tools:** `dns-lookup`, `whois-lookup`, `ssl-certificate-checker`, `ip-lookup`, `ping-tool`, `port-scanner`, `http-header-checker`, `user-agent-parser`, `mac-address-lookup`, `subnet-calculator`.
- **SEO & Web Analyzers:** `serp-simulator`, `redirect-checker`, `site-speed-checker`, `backlink-checker`, `google-index-checker`, `plagiarism-checker`.

### 5.2 Common UI Archetypes
1. **Dual-Pane Text/Code Transformer:** Left/Right split textareas with copy/download controls. (Used for encodings, case converters, formatters, minifiers).
2. **Interactive Controls & Generator:** Options sidebar (length, checkboxes, dropdowns) with real-time output panel. (Used for password, UUID, crontab, lorem ipsum generators).
3. **Single Input Form with Status/Cards:** Domain/IP input bar with status badge, tabular results, and action buttons. (Used for WHOIS, DNS, SSL, IP lookup).
4. **Visual Canvas / Slider Preview:** Interactive sliders, color pickers, CSS generator preview box. (Used for box-shadow, border-radius, gradient, color contrast).
5. **Structured Step/Calculator Form:** Numeric inputs with immediate real-time calculations. (Used for business, financial, student, and math calculators).

---

## 6. Strategic Recommendations for Implementation

1. **Immediate Quick Win:** Update `components/ToolWrapper.tsx` to import and route the 3 unrouted real tools (`dns-lookup`, `whois-lookup`, `ssl-certificate-checker`).
2. **Clean Catalog Duplicates:** Remove or alias the 7 duplicate entries in `lib/tools.ts`.
3. **Phased Component Rollout:**
   - **Phase 1:** Standard Text & Code Utilities (Dual-pane transformer archetype).
   - **Phase 2:** Design & Visual Tools (Canvas / preview archetype).
   - **Phase 3:** SEO, Business & Student Calculators (Form / card archetype).
   - **Phase 4:** Network / API Mocking Tools (Mocked API data state machine).
