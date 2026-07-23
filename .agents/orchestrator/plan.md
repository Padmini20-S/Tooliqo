# Master Plan — Tooliqo 134+ Tools Implementation

## Objective
Orchestrate the development, integration, and build verification of all remaining online tools in Tooliqo.

## Project Structure & Architecture
- **Catalog**: `lib/tools.ts`
- **Routing**: `components/ToolWrapper.tsx`
- **Components**: `components/tools/<ToolName>.tsx`
- **UI Design Standard**:
  - Premium, modern, clean UI matching Tooliqo theme.
  - Interactive React state (`useState`, `useMemo`).
  - Icons from `lucide-react`.
  - Copy to clipboard, reset, input validation.
  - Async state machine with simulated delays (`setTimeout` 500-1000ms) for network/lookup tools (DNS, WHOIS, IP, SSL, Ping, PageSpeed, etc.).

## Milestones Partitioning

### Milestone 1 (M1): Quick Wins & Core Network/SEO Tools (~23 tools)
- Integration of existing unrouted components: `dns-lookup`, `whois-lookup`, `ssl-certificate-checker`.
- Implementation & integration of missing network/SEO components:
  - `ip-lookup`, `http-header-checker`, `user-agent-parser`, `robots-txt-generator`, `sitemap-generator`
  - `open-graph-generator`, `redirect-checker`, `ping-tool`, `port-scanner`, `domain-age-checker`
  - `keyword-density-checker`, `meta-tag-analyzer`, `google-serp-simulator`, `canonical-url-checker`
  - `favicon-fetcher`, `broken-link-checker`, `schema-markup-generator`, `page-speed-insights-mock`
  - `social-share-preview`, `slug-generator`

### Milestone 2 (M2): Developer & Code Utilities (~25 tools)
- Converters, formatters, generators & minifiers:
  - `json-to-xml`, `xml-to-json`, `yaml-to-json`, `json-to-yaml`, `csv-to-json`, `json-to-csv`
  - `sql-formatter`, `html-formatter`, `css-formatter`, `js-formatter`
  - `html-entity-encoder`, `jwt-decoder`, `uuid-generator`, `cron-expression-generator`, `chmod-calculator`
  - `curl-to-fetch`, `base64-image-encoder`, `hex-to-rgb`, `svg-to-png-converter`
  - `js-minifier`, `css-minifier`, `html-minifier`, `lorem-ipsum-generator`, `markdown-to-html`, `url-parser`

### Milestone 3 (M3): Text & String Processing Tools (~25 tools)
- Text tools & manipulators:
  - `word-counter`, `character-counter`, `line-counter`, `duplicate-line-remover`, `text-reverser`
  - `binary-to-text`, `text-to-binary`, `rot13-cipher`, `caesar-cipher`, `ascii-to-text`, `text-to-ascii`
  - `morse-code-translator`, `slugify-text`, `camelcase-converter`, `snake-case-converter`
  - `kebab-case-converter`, `title-case-converter`, `upside-down-text`, `zalgo-text-generator`
  - `random-string-generator`, `strip-html-tags`, `text-sorter`, `find-and-replace`, `prefix-suffix-adder`, `text-trimmer`

### Milestone 4 (M4): Design, Color & CSS Tools (~25 tools)
- Color & CSS tools:
  - `color-converter`, `hex-to-hsl`, `hsl-to-hex`, `rgb-to-hex`, `color-shades-generator`
  - `color-contrast-checker`, `box-shadow-generator`, `border-radius-generator`, `css-grid-generator`
  - `css-flexbox-generator`, `css-animation-generator`, `glassmorphism-generator`, `neumorphism-generator`
  - `aspect-ratio-calculator`, `px-to-rem-converter`, `rem-to-px-converter`, `svg-pattern-generator`
  - `svg-blob-generator`, `palette-extractor`, `gradient-text-generator`, `css-triangle-generator`
  - `css-filter-generator`, `clamp-calculator`, `color-blindness-simulator`, `favicon-generator`

### Milestone 5 (M5): Business, Finance & Calculator Tools (~25 tools)
- Financial & general calculators:
  - `roi-calculator`, `loan-calculator`, `mortgage-calculator`, `interest-calculator`, `discount-calculator`
  - `sales-tax-calculator`, `margin-calculator`, `markup-calculator`, `break-even-calculator`, `cpm-calculator`
  - `clv-calculator`, `conversion-rate-calculator`, `tip-calculator`, `invoice-generator`, `receipt-generator`
  - `payroll-calculator`, `salary-converter`, `vat-calculator`, `depreciation-calculator`, `gpa-calculator`
  - `percentage-calculator`, `fraction-calculator`, `bmi-calculator`, `calorie-calculator`, `age-calculator`

### Milestone 6 (M6): Math, Time & Unit Converter Tools (~25 tools)
- Unit converters & time/math tools:
  - `time-zone-converter`, `timestamp-converter`, `unit-converter-length`, `unit-converter-weight`
  - `unit-converter-temperature`, `unit-converter-area`, `unit-converter-volume`, `unit-converter-speed`
  - `unit-converter-data-size`, `currency-converter-mock`, `random-number-generator`, `dice-roller`
  - `coin-flipper`, `stopwatch`, `timer-tool`, `days-between-dates-calculator`, `leap-year-checker`
  - `roman-numeral-converter`, `number-to-words-converter`, `binary-calculator`, `hex-calculator`
  - `prime-number-checker`, `gcd-lcm-calculator`, `matrix-calculator`, `scientific-calculator`

### Milestone 7 (M7): Social, Content & Niche Tools (~25 tools)
- Social & niche tools:
  - `tweet-character-counter`, `instagram-caption-formatter`, `hashtag-generator`, `youtube-thumbnail-downloader`
  - `image-resizer-mock`, `image-cropper-mock`, `webp-to-png-converter`, `png-to-jpg-converter`, `pdf-to-image-mock`
  - `barcode-generator`, `qr-code-reader-mock`, `subdomain-finder-mock`, `port-checker`, `whois-ip-checker`
  - `traceroute-simulator`, `dns-propagation-checker-mock`, `speed-test-analyzer`, `screen-resolution-checker`
  - `device-pixel-ratio-checker`, `mime-type-lookup`, `http-status-code-checker`, `security-headers-checker`
  - `cors-header-checker`, `csp-generator`, `hash-comparator`

## Verification & Execution Protocol
For each milestone:
1. Dispatch **Worker** agent (`teamwork_preview_worker`) to implement the target tools in `components/tools/`, wire them into `components/ToolWrapper.tsx`, and run `npm run build` to verify clean compilation.
2. Dispatch **Reviewer** agent (`teamwork_preview_reviewer`) to verify code quality, theme consistency, and UI responsiveness.
3. Dispatch **Forensic Auditor** (`teamwork_preview_auditor`) to verify genuine interactivity (no empty dummy facades).
