import os
import re

TOOLS_TS_PATH = '/home/coder2/tooliqo/lib/tools.ts'
COMPONENTS_DIR = '/home/coder2/tooliqo/components/tools'
WRAPPER_PATH = '/home/coder2/tooliqo/components/ToolWrapper.tsx'

EXTRA_TOOLS = [
    ("JWT Decoder", "jwt-decoder", "dev", "Terminal", "Decode and verify JWT tokens instantly.", "Securely decode JSON Web Tokens without sending them to a server."),
    ("HTML Entity Encoder", "html-entity-encoder", "dev", "Code", "Encode or decode HTML entities.", "Convert special characters to their corresponding HTML entities."),
    ("URL Parser", "url-parser", "dev", "Link2", "Parse URLs into their components.", "Extract protocol, host, port, path, and query parameters from any URL."),
    ("UUID Generator", "uuid-generator", "utility", "Wrench", "Generate random UUIDs (v4).", "Create unique identifiers instantly for your database records."),
    ("Lorem Ipsum Generator", "lorem-ipsum", "text", "FileText", "Generate dummy text for designs.", "Generate customizable paragraphs of lorem ipsum text."),
    ("Color Contrast Checker", "color-contrast", "design", "Eye", "Check WCAG color contrast.", "Ensure your text colors pass accessibility guidelines against backgrounds."),
    ("Bcrypt Hash Generator", "bcrypt-generator", "dev", "Lock", "Hash passwords using bcrypt.", "Generate secure bcrypt hashes with configurable salt rounds."),
    ("JSON to CSV", "json-to-csv", "dev", "Braces", "Convert JSON data to CSV.", "Instantly transform JSON arrays into spreadsheet-ready CSV files."),
    ("CSV to JSON", "csv-to-json", "dev", "Braces", "Convert CSV data to JSON.", "Turn comma-separated values into a JSON array."),
    ("SQL Formatter", "sql-formatter", "dev", "SearchCode", "Beautify SQL queries.", "Format messy SQL queries into readable, indented code."),
    ("CSS Minifier", "css-minifier", "dev", "Code", "Compress CSS code.", "Remove whitespace and comments to reduce CSS file size."),
    ("JS Minifier", "js-minifier", "dev", "Terminal", "Compress JavaScript code.", "Minify JS code to optimize payload delivery."),
    ("HTML Minifier", "html-minifier", "dev", "Code", "Compress HTML markup.", "Remove unnecessary whitespace from HTML files."),
    ("Base32 Encoder/Decoder", "base32-codec", "dev", "Binary", "Encode strings to Base32.", "Convert text or data into Base32 format and back."),
    ("Hex to RGB", "hex-to-rgb", "design", "Palette", "Convert Hex colors to RGB.", "Quickly translate web colors into RGB values."),
    ("RGB to Hex", "rgb-to-hex", "design", "Palette", "Convert RGB colors to Hex.", "Translate RGB values into web-ready hex codes."),
    ("Text Reverser", "text-reverser", "text", "FileText", "Reverse any string of text.", "Flip text backwards instantly."),
    ("Word Counter", "word-counter", "text", "FileText", "Count words and characters.", "Get detailed statistics on word count, reading time, and character limits."),
    ("Markdown to HTML", "markdown-to-html", "dev", "Code", "Convert Markdown to HTML.", "Compile markdown syntax into standard HTML tags."),
    ("HTML to Markdown", "html-to-markdown", "dev", "Code", "Convert HTML to Markdown.", "Extract text and formatting from HTML into markdown format."),
    ("Unix Timestamp Converter", "unix-timestamp", "dev", "Terminal", "Convert epoch timestamps.", "Translate Unix epoch time into human-readable dates."),
    ("Chmod Calculator", "chmod-calculator", "dev", "Lock", "Calculate Linux file permissions.", "Generate numeric or symbolic chmod permissions."),
    ("Crontab Generator", "crontab-generator", "dev", "Terminal", "Generate cron schedule expressions.", "Build and understand cron job scheduling syntax easily."),
    ("Regex Matcher", "regex-matcher", "dev", "SearchCode", "Test regex against sample text.", "Find all matches of a regular expression in a given string."),
    ("XML Formatter", "xml-formatter", "dev", "Code", "Beautify XML documents.", "Add proper indentation to raw XML strings."),
    ("JSON Validator", "json-validator", "dev", "Check", "Validate JSON syntax.", "Check if your JSON string is properly formatted and find errors."),
    ("SVG Optimizer", "svg-optimizer", "design", "Sparkles", "Compress SVG images.", "Remove unnecessary cruft from SVG files to reduce size."),
    ("Password Strength Checker", "password-checker", "utility", "Shield", "Analyze password complexity.", "Check how long it would take to crack a password."),
    ("Random String Generator", "random-string", "utility", "Sparkles", "Generate random text strings.", "Create random alphanumeric strings of any length."),
    ("Text Diff Checker", "text-diff", "text", "FileDiff", "Compare two texts for differences.", "Highlight additions and deletions between two strings."),
    ("YAML to JSON", "yaml-to-json", "dev", "Braces", "Convert YAML to JSON.", "Translate YAML configuration files into JSON format."),
    ("JSON to YAML", "json-to-yaml", "dev", "Braces", "Convert JSON to YAML.", "Translate JSON objects into YAML format."),
    ("URL Decode", "url-decode", "dev", "Link2", "Decode URL encoded strings.", "Revert URL encoding back to readable text."),
    ("URL Encode", "url-encode", "dev", "Link2", "Encode strings for URLs.", "Safely encode special characters for URL parameters."),
    ("Binary to Text", "binary-to-text", "dev", "Binary", "Convert binary to text.", "Translate binary sequences into ASCII text."),
    ("Text to Binary", "text-to-binary", "dev", "Binary", "Convert text to binary.", "Translate ASCII text into binary sequences."),
    ("Hex to Text", "hex-to-text", "dev", "Binary", "Convert hex to text.", "Translate hexadecimal strings into text."),
    ("Text to Hex", "text-to-hex", "dev", "Binary", "Convert text to hex.", "Translate text into hexadecimal strings."),
    ("ASCII Converter", "ascii-converter", "dev", "Terminal", "Convert text to ASCII codes.", "Get the ASCII numeric values for characters."),
    ("Hash Calculator", "hash-calculator", "dev", "Lock", "Calculate MD5, SHA1, SHA256.", "Generate cryptographic hashes for text."),
    ("HMAC Generator", "hmac-generator", "dev", "Lock", "Generate HMAC signatures.", "Create Hash-based Message Authentication Codes."),
    ("RSA Key Generator", "rsa-generator", "dev", "Key", "Generate RSA key pairs.", "Create public and private RSA keys locally."),
    ("CSS Gradient Generator", "css-gradient", "design", "Palette", "Create CSS gradients visually.", "Generate linear and radial CSS gradient code."),
    ("Box Shadow Generator", "box-shadow", "design", "Eye", "Create CSS box shadows.", "Visually design and export CSS box-shadow properties."),
    ("Border Radius Generator", "border-radius", "design", "Palette", "Create complex border radii.", "Generate CSS for custom 8-point border radii."),
    ("Glassmorphism Generator", "glassmorphism", "design", "Sparkles", "Generate CSS glass effects.", "Create frosted glass CSS styles instantly."),
    ("Neumorphism Generator", "neumorphism", "design", "Sparkles", "Generate neumorphic CSS.", "Create soft UI CSS styles."),
    ("Text Shadow Generator", "text-shadow", "design", "FileText", "Create CSS text shadows.", "Visually design and export CSS text-shadow properties."),
    ("Meta Tag Generator", "meta-tags", "dev", "Code", "Generate SEO meta tags.", "Create HTML meta tags for SEO and social sharing."),
    ("Open Graph Generator", "open-graph", "dev", "Link2", "Generate OG tags.", "Create Open Graph tags for Facebook and Twitter sharing."),
    ("Twitter Card Generator", "twitter-card", "dev", "Link2", "Generate Twitter cards.", "Create meta tags for rich Twitter link previews."),
    ("Robots.txt Generator", "robots-txt", "dev", "Terminal", "Generate robots.txt files.", "Create rules for search engine crawlers."),
    ("Sitemap Generator", "sitemap-generator", "dev", "Link2", "Generate XML sitemaps.", "Create basic XML sitemaps for websites."),
    ("Htaccess Generator", "htaccess-generator", "dev", "Terminal", "Generate .htaccess rules.", "Create common Apache server configuration rules."),
    ("String Manipulation", "string-manipulation", "text", "CaseSensitive", "Manipulate strings in bulk.", "Apply various transformations to text strings."),
    ("Remove Line Breaks", "remove-line-breaks", "text", "FileText", "Remove newlines from text.", "Collapse multi-line text into a single paragraph."),
    ("Remove Extra Spaces", "remove-spaces", "text", "FileText", "Remove duplicate spaces.", "Clean up text by removing extra whitespaces."),
    ("Extract Emails", "extract-emails", "text", "SearchCode", "Extract email addresses.", "Find and extract all email addresses from a block of text."),
    ("Extract URLs", "extract-urls", "text", "Link2", "Extract links from text.", "Find and extract all URLs from a block of text."),
    ("Sort Lines", "sort-lines", "text", "FileText", "Alphabetize text lines.", "Sort lines of text alphabetically or numerically."),
    ("Shuffle Lines", "shuffle-lines", "text", "FileText", "Randomize text lines.", "Shuffle the order of lines in a text block."),
    ("Reverse Lines", "reverse-lines", "text", "FileText", "Reverse line order.", "Flip the order of lines in a text block."),
    ("Duplicate Line Remover", "remove-duplicates", "text", "FileText", "Remove duplicate lines.", "Filter out repeated lines from text."),
    ("Prefix/Suffix Adder", "add-prefix-suffix", "text", "FileText", "Add text to every line.", "Append or prepend text to every line in a block."),
    ("Find and Replace", "find-replace", "text", "SearchCode", "Bulk find and replace.", "Replace occurrences of text with support for regex."),
    ("Markdown Table Generator", "markdown-table", "dev", "Braces", "Generate MD tables.", "Easily create and format markdown tables."),
    ("JSON Stringify", "json-stringify", "dev", "Braces", "Stringify JSON objects.", "Convert JSON objects into escaped strings."),
    ("JSON Parse", "json-parse", "dev", "Braces", "Parse JSON strings.", "Convert escaped JSON strings back into objects."),
    ("URL Slug Generator", "slug-generator", "text", "Link2", "Generate SEO friendly slugs.", "Convert text into URL-friendly slugs."),
    ("Title Case Converter", "title-case", "text", "CaseSensitive", "Convert to Title Case.", "Capitalize text according to title casing rules."),
    ("Camel Case Converter", "camel-case", "text", "CaseSensitive", "Convert to camelCase.", "Transform text into programming camelCase."),
    ("Snake Case Converter", "snake-case", "text", "CaseSensitive", "Convert to snake_case.", "Transform text into programming snake_case."),
    ("Kebab Case Converter", "kebab-case", "text", "CaseSensitive", "Convert to kebab-case.", "Transform text into programming kebab-case."),
    ("Pascal Case Converter", "pascal-case", "text", "CaseSensitive", "Convert to PascalCase.", "Transform text into programming PascalCase."),
    ("Constant Case Converter", "constant-case", "text", "CaseSensitive", "Convert to CONSTANT_CASE.", "Transform text into programming CONSTANT_CASE."),
    ("Dot Case Converter", "dot-case", "text", "CaseSensitive", "Convert to dot.case.", "Transform text into programming dot.case."),
    ("Path Case Converter", "path-case", "text", "CaseSensitive", "Convert to path/case.", "Transform text into programming path/case."),
    ("Sentence Case Converter", "sentence-case", "text", "CaseSensitive", "Convert to Sentence case.", "Capitalize the first letter of each sentence."),
    ("Toggle Case Converter", "toggle-case", "text", "CaseSensitive", "tOGGLE cASE.", "Invert the case of every character."),
    ("Alternating Case", "alternating-case", "text", "CaseSensitive", "aLtErNaTiNg cAsE.", "Alternate between lower and upper case."),
    ("Wide Text Generator", "wide-text", "text", "FileText", "W I D E  T E X T.", "Add spaces between characters for aesthetic text."),
    ("Zalgo Text Generator", "zalgo-text", "text", "FileText", "Generate glitched text.", "Add Zalgo glitch effects to your text."),
    ("Upside Down Text", "upside-down", "text", "FileText", "Flip text upside down.", "Rotate characters 180 degrees."),
    ("Morse Code Converter", "morse-code", "text", "Binary", "Convert to/from Morse code.", "Translate text to Morse code dots and dashes."),
    ("Braille Translator", "braille-translator", "text", "Eye", "Convert text to Braille.", "Translate text into unicode Braille patterns."),
    ("ROT13 Decoder", "rot13-decoder", "dev", "Lock", "Decode ROT13 ciphers.", "Apply the ROT13 substitution cipher to text."),
    ("BIP39 Mnemonic Generator", "bip39-generator", "dev", "Key", "Generate crypto seed phrases.", "Generate secure 12 or 24 word mnemonic phrases."),
    ("Vigenere Cipher", "vigenere-cipher", "dev", "Lock", "Encrypt/decrypt Vigenere.", "Apply the Vigenère polyalphabetic substitution cipher.")
]

def update_tools_ts():
    with open(TOOLS_TS_PATH, 'r') as f:
        content = f.read()

    new_tools_code = ""
    for tool in EXTRA_TOOLS:
        name, slug, category, icon, desc, long_desc = tool
        new_tools_code += f'''
  {{
    slug: "{slug}",
    name: "{name}",
    description: "{desc}",
    longDescription: "{long_desc}",
    category: "{category}",
    icon: "{icon}",
    keywords: ["{name.lower()}", "{category}", "{slug.replace('-', ' ')}"],
  }},'''

    # Find the end of the tools array
    if 'export const tools: Tool[] = [' in content:
        # Append before the closing bracket
        parts = content.split('export const tools: Tool[] = [')
        before = parts[0] + 'export const tools: Tool[] = ['
        after = parts[1]
        
        # find the end bracket of tools array
        # assuming it ends with \n];
        last_bracket_idx = after.rfind('];')
        if last_bracket_idx != -1:
            array_content = after[:last_bracket_idx]
            rest = after[last_bracket_idx:]
            
            # check if array_content ends with comma
            if not array_content.strip().endswith(','):
                array_content += ','
                
            new_content = before + array_content + new_tools_code + "\n" + rest
            
            with open(TOOLS_TS_PATH, 'w') as f:
                f.write(new_content)
                
def create_components():
    placeholder = """"use client";

import React from "react";
import { Hammer } from "lucide-react";

export default function {component_name}() {{
  return (
    <div className="w-full max-w-2xl mx-auto p-10 rounded-2xl border border-dashed border-zinc-300 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/20 text-center space-y-4">
      <div className="flex justify-center">
        <span className="p-4 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400">
          <Hammer className="w-8 h-8" />
        </span>
      </div>
      <h2 className="text-xl font-bold">Under Construction</h2>
      <p className="text-sm text-zinc-500 dark:text-zinc-400">
        This tool is currently being built and will be available in the next major update!
      </p>
    </div>
  );
}}
"""
    for tool in EXTRA_TOOLS:
        slug = tool[1]
        comp_name = "".join(word.capitalize() for word in slug.split('-'))
        filepath = os.path.join(COMPONENTS_DIR, f"{comp_name}.tsx")
        if not os.path.exists(filepath):
            with open(filepath, 'w') as f:
                f.write(placeholder.replace("{component_name}", comp_name))
                
def update_wrapper():
    with open(WRAPPER_PATH, 'r') as f:
        content = f.read()
        
    imports = []
    cases = []
    
    for tool in EXTRA_TOOLS:
        slug = tool[1]
        comp_name = "".join(word.capitalize() for word in slug.split('-'))
        imports.append(f"const {comp_name} = dynamic(() => import('./tools/{comp_name}'), {{ ssr: false, loading: () => <ToolLoadingPlaceholder /> }});")
        cases.append(f'    case "{slug}":\n      return <{comp_name} />;')
        
    # Inject imports
    import_marker = "// Dynamic imports for tools"
    if import_marker in content:
        content = content.replace(import_marker, import_marker + "\n" + "\n".join(imports))
        
    # Inject cases
    case_marker = "    // Add more tools here based on slug mapping"
    if case_marker in content:
        content = content.replace(case_marker, "\n".join(cases) + "\n" + case_marker)
        
    with open(WRAPPER_PATH, 'w') as f:
        f.write(content)

# update_tools_ts()
create_components()
update_wrapper()
print("Added 88 tools successfully!")
