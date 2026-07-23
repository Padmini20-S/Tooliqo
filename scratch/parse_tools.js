const fs = require('fs');

const input = fs.readFileSync('scratch/tools_input.txt', 'utf8');
const lines = input.split('\n');

const categoryMap = {
  'Website & SEO': 'seo',
  'Developer': 'dev',
  'Design': 'design',
  'Social Media': 'social',
  'Business': 'business',
  'Student': 'student',
  'Utility': 'utility',
};

const iconMap = {
  'seo': 'Search',
  'dev': 'Terminal',
  'design': 'Palette',
  'social': 'MessageCircle',
  'business': 'Briefcase',
  'student': 'BookOpen',
  'utility': 'Wrench',
};

let currentCategory = '';
let tools = [];

for (let line of lines) {
  line = line.trim();
  if (!line) continue;
  
  if (line.includes('(') && line.includes(')')) {
    const catName = line.split('(')[0].trim();
    if (categoryMap[catName]) {
      currentCategory = categoryMap[catName];
    }
    continue;
  }
  
  if (currentCategory) {
    const slug = line.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    tools.push(`  {
    slug: "${slug}",
    name: "${line}",
    description: "Use our free online ${line} tool instantly.",
    longDescription: "The ${line} is a powerful online tool designed to help you with your tasks quickly and securely directly from your browser.",
    category: "${currentCategory}",
    icon: "${iconMap[currentCategory]}",
    keywords: ["${line.toLowerCase()}", "${currentCategory}", "${slug.replace(/-/g, ' ')}"],
  },`);
  }
}

fs.writeFileSync('scratch/generated_tools.ts', tools.join('\n'));
console.log('Done!');
