"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Search, Wrench, FileText, Code, Palette, Terminal } from "lucide-react";
import { cn } from "@/lib/utils";
import { categories } from "@/lib/tools";

interface NavbarProps {
  onSearchOpen?: () => void;
}

export default function Navbar({ onSearchOpen }: NavbarProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case "Code":
        return <Code className="w-4 h-4" />;
      case "Palette":
        return <Palette className="w-4 h-4" />;
      case "FileText":
        return <FileText className="w-4 h-4" />;
      case "Wrench":
        return <Wrench className="w-4 h-4" />;
      default:
        return <Terminal className="w-4 h-4" />;
    }
  };

  return (
    <nav className="sticky top-0 z-40 w-full border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 text-white shadow-lg shadow-indigo-500/25">
                <Wrench className="w-5 h-5 text-white" />
              </span>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-pink-600 dark:from-indigo-400 dark:to-pink-400 font-sans tracking-tight">
                Tooliqo
              </span>
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center ml-8 space-x-1">
              {categories.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/#${cat.id}`}
                  className="flex items-center space-x-1.5 px-3.5 py-2 rounded-lg text-sm font-medium text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-all duration-200"
                >
                  {getCategoryIcon(cat.icon)}
                  <span>{cat.name}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            {/* Search Bar Trigger */}
            <button
              onClick={onSearchOpen}
              className="flex items-center space-x-2 px-3 py-1.5 w-48 text-left rounded-lg border border-zinc-200 dark:border-zinc-800 text-zinc-400 dark:text-zinc-500 hover:border-indigo-500 dark:hover:border-indigo-400 text-xs bg-zinc-50 dark:bg-zinc-900/50 cursor-pointer transition-all duration-200"
            >
              <Search className="w-3.5 h-3.5" />
              <span className="flex-1">Search tools...</span>
              <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono border rounded bg-white dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700">
                ⌘K
              </kbd>
            </button>
          </div>

          {/* Mobile menu and search buttons */}
          <div className="flex md:hidden items-center space-x-2">
            <button
              onClick={onSearchOpen}
              className="p-2 rounded-lg text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900 border border-zinc-200 dark:border-zinc-800"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900 border border-zinc-200 dark:border-zinc-800"
              aria-label="Open Menu"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-4 py-3 space-y-1 shadow-lg">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/#${cat.id}`}
              onClick={() => setIsOpen(false)}
              className="flex items-center space-x-2.5 px-3 py-2.5 rounded-lg text-base font-medium text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900"
            >
              {getCategoryIcon(cat.icon)}
              <span>{cat.name}</span>
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
