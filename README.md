# Tooliqo — Ultimate Online Developer Toolbox 🛠️

**Tooliqo** is a modern, high-performance, and feature-rich suite of online developer utilities, text converters, design generators, and calculators. Built with **Next.js 15**, **React 19**, and **Tailwind CSS v4**, the application is optimized for speed, visual excellence, and complete data privacy.

---

## 🔒 100% Client-Side Privacy Guarantee
Unlike standard utility websites, **Tooliqo does not send your data to any backend server**. 
* Every calculation, formatting process, and hash computation occurs **entirely inside your browser** via local JavaScript execution.
* Your secrets, API keys, JSON payloads, and text snippets remain confidential and completely safe.

---

## ✨ Available Tools

### 💻 Developer Utilities
1. **JSON Formatter & Validator**: Beautify, validate, minify, and inspect JSON payloads with real-time error indicators (including line and character counts).
2. **Text Diff Checker**: Compare two text/code snippets side-by-side or unified inline with green/red highlight differences.
3. **Base64 Encoder / Decoder**: Safe base64 encoding and decoding with full UTF-8 emojis/symbols support.
4. **URL Encoder / Decoder**: Safely format or extract paths and parameter elements.
5. **Cryptographic Hash Generator**: Compute SHA-1, SHA-256, SHA-384, and SHA-512 hashes instantly using the browser's native SubtleCrypto API.

### 🎨 Design & Graphics Engines
6. **QR Code Generator**: Create custom QR codes for URLs or text with scale, custom color pickers, and vector (SVG/PNG) download formats.
7. **Color Palette Generator**: Generate beautiful color schemes, lock shades, customize parameters, and export configuration codes (CSS/JSON/Tailwind).
8. **CSS Gradient Generator**: Build custom linear or radial gradients visually, adjust stops/angles, and copy compiled CSS declarations.

### 📝 Text & utility Tools
9. **Live Markdown Previewer**: Write raw markdown on the left and visualize the formatted HTML live on the right. Copy compiled HTML instantly.
10. **Text Case Converter**: Translate casings (UPPERCASE, lowercase, Title Case, Sentence case, camelCase, PascalCase, snake_case, slug-ify) with live words and character counts.
11. **Secure Password Generator**: Generates cryptographically secure random passwords. Customize characters, filter similar characters, and view live strength levels.
12. **Interactive Regex Tester**: Test regular expression rules against text with live highlights, capturing groups, and validation alerts.

---

## 🚀 Tech Stack
* **Framework**: Next.js 15 (App Router)
* **Library**: React 19
* **Styling**: Tailwind CSS v4 & Lucide Icons
* **Formatting compiler**: Marked (for Markdown Previewer)
* **QR encoder**: React-QR-Code

---

## 💻 Local Development

### 1. Install Dependencies
```bash
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

### 3. Production Build Compilation
```bash
npm run build
```

This compiles optimized static pages (SSG) for all 23 paths under `out/` or `.next/` matching maximum production standards.

---

## 📈 Google AdSense Readiness
* Fully compliant legal routes created: `/about`, `/contact`, `/privacy-policy`, `/terms-conditions`, and `/disclaimer`.
* Search engine sitemap generated at `/sitemap.xml`.
* Crawling rules set up at `/robots.txt`.
* Zero empty or broken pages.
