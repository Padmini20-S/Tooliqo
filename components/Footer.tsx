import React from "react";
import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          <div className="col-span-2 lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-lg">
                T
              </div>
              <span className="font-bold text-xl tracking-tight text-slate-900">Tooliqo</span>
            </Link>
            <p className="text-slate-500 text-sm mb-6 max-w-sm leading-relaxed">
              100+ Free Online Tools for Images, PDF, AI, Video, Audio, Text and more. Always 100% free, no premium plans, no login required.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-slate-900 mb-4">Tools</h3>
            <ul className="space-y-3">
              <li><Link href="/category/image" className="text-sm text-slate-500 hover:text-blue-600 transition-colors">Image Tools</Link></li>
              <li><Link href="/category/pdf" className="text-sm text-slate-500 hover:text-blue-600 transition-colors">PDF Tools</Link></li>
              <li><Link href="/category/ai" className="text-sm text-slate-500 hover:text-blue-600 transition-colors">AI Tools</Link></li>
              <li><Link href="/category/video" className="text-sm text-slate-500 hover:text-blue-600 transition-colors">Video Tools</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-slate-900 mb-4">Platform</h3>
            <ul className="space-y-3">
              <li><Link href="/about" className="text-sm text-slate-500 hover:text-blue-600 transition-colors">About Us</Link></li>
              <li><Link href="/blog" className="text-sm text-slate-500 hover:text-blue-600 transition-colors">Blog</Link></li>
              <li><Link href="/contact" className="text-sm text-slate-500 hover:text-blue-600 transition-colors">Contact</Link></li>
              <li><Link href="/faq" className="text-sm text-slate-500 hover:text-blue-600 transition-colors">FAQ</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-slate-900 mb-4">Legal</h3>
            <ul className="space-y-3">
              <li><Link href="/privacy" className="text-sm text-slate-500 hover:text-blue-600 transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-sm text-slate-500 hover:text-blue-600 transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-100 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-sm">
            &copy; {currentYear} Tooliqo. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
