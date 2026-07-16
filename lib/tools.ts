export interface Tool {
  slug: string;
  name: string;
  description: string;
  longDescription: string;
  category: string;
  icon: string;
  keywords: string[];
}

export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export const categories: Category[] = [
  {
    id: "dev",
    name: "Developer Tools",
    description: "Format, encode, decode, and hash code and data structures.",
    icon: "Code",
  },
  {
    id: "design",
    name: "Design & Graphics",
    description: "Create gradients, color palettes, and generate QR codes.",
    icon: "Palette",
  },
  {
    id: "text",
    name: "Text & Content",
    description: "Analyze, format, convert, and preview textual content.",
    icon: "FileText",
  },
  {
    id: "utility",
    name: "Utility Tools",
    description: "Generate passwords, test regular expressions, and convert units.",
    icon: "Wrench",
  },
];

export const tools: Tool[] = [
  {
    slug: "json-formatter",
    name: "JSON Formatter & Validator",
    description: "Beautify, minify, validate, and debug JSON data with syntax highlighting.",
    longDescription: "Use our free online JSON Formatter and Validator to clean, format, validate, and parse raw JSON strings. It highlights errors in real time, generates clean trees, and lets you minify JSON with a single click. Essential for API testing and web debugging.",
    category: "dev",
    icon: "Braces",
    keywords: ["json formatter", "json validator", "beautify json", "minify json", "json parser", "format json online"],
  },
  {
    slug: "password-generator",
    name: "Secure Password Generator",
    description: "Create highly secure, customizable passwords to protect your accounts.",
    longDescription: "Generate strong and random passwords with our Secure Password Generator. Customize the length, include uppercase, lowercase, numbers, and symbols. Perfect for creating unhackable credentials for your accounts.",
    category: "utility",
    icon: "Key",
    keywords: ["password generator", "secure password", "random password", "password strength", "strong password generator"],
  },
  {
    slug: "diff-checker",
    name: "Text Diff Checker",
    description: "Compare two text snippets side-by-side or inline to find code or text differences.",
    longDescription: "Compare two text versions side-by-side to highlight differences. Use it to check code diffs, text drafts, and formatting updates. Simple, secure, and fully client-side.",
    category: "dev",
    icon: "FileDiff",
    keywords: ["diff checker", "text comparison", "compare code", "side-by-side diff", "text merge comparator"],
  },
  {
    slug: "qr-code-generator",
    name: "QR Code Generator",
    description: "Generate customizable QR codes for URLs, text, or contacts with instant download.",
    longDescription: "Create custom QR codes for your websites, social media links, or contact info. Choose custom sizes, colors, and download them instantly in SVG format. Fully customizable and free.",
    category: "design",
    icon: "QrCode",
    keywords: ["qr code generator", "make qr code", "free qr code creator", "custom qr code", "qr code maker"],
  },
  {
    slug: "case-converter",
    name: "Text Case Converter",
    description: "Convert text cases between UPPERCASE, lowercase, Title Case, camelCase, and more.",
    longDescription: "Convert case formatting of any text online. Supports UPPERCASE, lowercase, Title Case, camelCase, snake_case, PascalCase, and slugification. Also includes a real-time character and word counter.",
    category: "text",
    icon: "CaseSensitive",
    keywords: ["case converter", "text case", "uppercase to lowercase", "title case generator", "slugify text", "camelcase converter"],
  },
  {
    slug: "base64-codec",
    name: "Base64 Encoder / Decoder",
    description: "Encode and decode plain text or files to and from Base64 format securely.",
    longDescription: "Safely encode and decode strings and files to and from Base64. A critical developer utility for data transmission, API payloads, and image URI generation. 100% client-side data safety.",
    category: "dev",
    icon: "Binary",
    keywords: ["base64 encoder", "base64 decoder", "base64 format", "base64 string", "encode base64", "decode base64"],
  },
  {
    slug: "markdown-previewer",
    name: "Live Markdown Editor & Previewer",
    description: "Write and edit Markdown syntax with a real-time visual HTML rendering side-by-side.",
    longDescription: "A real-time Markdown editor and renderer. Write markdown syntax, visualize the formatted HTML live, and copy the compiled HTML with one click. Ideal for blog writing and documentation formatting.",
    category: "text",
    icon: "Eye",
    keywords: ["markdown editor", "markdown previewer", "live markdown converter", "markdown to html", "write markdown online"],
  },
  {
    slug: "url-codec",
    name: "URL Encoder / Decoder",
    description: "Percent-encode or decode URL query strings and path parameters safely.",
    longDescription: "Easily encode or decode URL components using percent-encoding. Standardize URL query strings to avoid broken page paths or extract readable parameters from encoded links.",
    category: "dev",
    icon: "Link2",
    keywords: ["url encoder", "url decoder", "url percent encoding", "decode url string", "safe url query format"],
  },
  {
    slug: "hash-generator",
    name: "Cryptographic Hash Generator",
    description: "Generate MD5, SHA-1, SHA-256, and SHA-512 hashes instantly from any text input.",
    longDescription: "Securely generate cryptographic checksums and hashes online. Computes MD5, SHA-1, SHA-256, and SHA-512 hashes from input strings instantly inside your browser. Perfect for file verification and password hashing tests.",
    category: "dev",
    icon: "Lock",
    keywords: ["hash generator", "sha256 generator", "md5 generator", "sha1 generator", "cryptographic hash", "online hash maker"],
  },
  {
    slug: "color-palette",
    name: "Color Palette Generator",
    description: "Generate stunning color palettes, lock colors, copy HEX/RGB codes, and export configurations.",
    longDescription: "Generate cohesive and vibrant color palettes for websites and designs. Lock colors you love, pick custom shades, and copy HEX or RGB codes instantly. Perfect for designers and developers starting new projects.",
    category: "design",
    icon: "Palette",
    keywords: ["color palette generator", "color scheme", "hex color codes", "color palette generator web", "design color picker"],
  },
  {
    slug: "css-gradient",
    name: "CSS Gradient Generator",
    description: "Create linear and radial gradients visually, adjust angles and color stops, and export CSS.",
    longDescription: "Create rich, multi-color CSS gradients visually. Adjust gradient types (linear or radial), modify angles, customize color stops, and export the copy-pasteable CSS code instantly.",
    category: "design",
    icon: "Sparkles",
    keywords: ["css gradient generator", "linear gradient", "radial gradient", "gradient css maker", "visual gradient creator"],
  },
  {
    slug: "regex-tester",
    name: "Interactive Regex Tester",
    description: "Test regular expressions in real-time with match highlighting and group breakdowns.",
    longDescription: "Write and test regular expressions in real time. Highlights matches in your target text, displays capture group breakdowns, and verifies regex syntax with interactive color indicators.",
    category: "utility",
    icon: "SearchCode",
    keywords: ["regex tester", "regular expression checker", "regex helper", "test regex online", "regex match highlighter"],
  },
];
