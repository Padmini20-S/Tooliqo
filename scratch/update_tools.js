const fs = require('fs');

// Create new categories array
const categoriesCode = `
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
    icon: "Terminal",
  },
  {
    id: "seo",
    name: "Website & SEO",
    description: "Optimize your website for search engines and check tags.",
    icon: "Search",
  },
  {
    id: "design",
    name: "Design & Graphics",
    description: "Create gradients, color palettes, and generate assets.",
    icon: "Palette",
  },
  {
    id: "text",
    name: "Text & Content",
    description: "Analyze, format, convert, and preview textual content.",
    icon: "FileText",
  },
  {
    id: "social",
    name: "Social Media",
    description: "Generate headlines, hashtags, and social post content.",
    icon: "MessageCircle",
  },
  {
    id: "business",
    name: "Business",
    description: "Calculate invoices, taxes, profit margins and more.",
    icon: "Briefcase",
  },
  {
    id: "student",
    name: "Student",
    description: "Study planners, citation generators, and study tools.",
    icon: "BookOpen",
  },
  {
    id: "utility",
    name: "Utility Tools",
    description: "Speed tests, hardware tests, and random generators.",
    icon: "Wrench",
  },
];
`;

let toolsFileContent = fs.readFileSync('lib/tools.ts', 'utf8');

// The original tools array content (extracted via regex or splitting)
let toolsArrayContent = toolsFileContent.substring(toolsFileContent.indexOf('export const tools: Tool[] = [') + 'export const tools: Tool[] = ['.length);
toolsArrayContent = toolsArrayContent.substring(0, toolsArrayContent.lastIndexOf('];'));

// Merge with new tools
const newToolsContent = fs.readFileSync('scratch/generated_tools.ts', 'utf8');

const finalFileContent = categoriesCode + '\nexport const tools: Tool[] = [\n' + toolsArrayContent + '\n' + newToolsContent + '\n];\n';

fs.writeFileSync('lib/tools.ts', finalFileContent);
console.log('Successfully updated lib/tools.ts');
