"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Mail, MessageSquare, Send, CheckCircle2 } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 flex flex-col transition-colors duration-300">

      <main className="flex-1 max-w-lg w-full mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-extrabold tracking-tight">Contact Us</h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Have feedback, feature requests, or questions? Send us a message!
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-6">
          <div className="sm:w-1/3 flex flex-col space-y-6">
            <div className="p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/20 shadow-sm space-y-3">
              <span className="inline-flex p-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400">
                <Mail className="w-5 h-5" />
              </span>
              <h3 className="text-base font-semibold">Direct Email</h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                Contact the founder directly for support, feedback, or business inquiries.
              </p>
              <div className="pt-2">
                <p className="text-sm font-bold">Padmini Singh</p>
                <a href="mailto:singh12019@gmail.com" className="text-indigo-600 dark:text-indigo-400 text-sm hover:underline">
                  singh12019@gmail.com
                </a>
              </div>
            </div>
          </div>

          <div className="sm:w-2/3">

        {submitted ? (
          <div className="p-6 rounded-2xl border border-green-200 dark:border-green-900/35 bg-green-50 dark:bg-green-950/20 text-center space-y-4">
            <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto" />
            <h3 className="text-lg font-semibold text-green-900 dark:text-green-400">Message Sent!</h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Thank you for contacting Tooliqo. We have received your message and will get back to you shortly.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="text-xs px-4 py-2 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors"
            >
              Send Another Message
            </button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/20 space-y-4 shadow-sm"
          >
            {/* Name */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Name</label>
              <input
                required
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full text-sm p-2.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 outline-none focus:border-indigo-500"
                placeholder="Your name"
              />
            </div>

            {/* Email */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Email Address</label>
              <input
                required
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full text-sm p-2.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 outline-none focus:border-indigo-500"
                placeholder="your.email@example.com"
              />
            </div>

            {/* Subject */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Subject</label>
              <input
                type="text"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="w-full text-sm p-2.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 outline-none focus:border-indigo-500"
                placeholder="Feature request, bug, etc."
              />
            </div>

            {/* Message */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Message</label>
              <textarea
                required
                rows={5}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full text-sm p-2.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 outline-none focus:border-indigo-500 resize-y"
                placeholder="Type your message details here..."
              />
            </div>

            {/* Submit */}
            <button
              disabled={loading}
              type="submit"
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-650 hover:from-indigo-500 hover:to-purple-550 text-white font-semibold text-sm shadow-md transition-all duration-200 hover:-translate-y-0.5 flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50"
            >
              {loading ? (
                <span>Sending...</span>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Send Message</span>
                </>
              )}
            </button>
          </form>
        )}
          </div>
        </div>
      </main>

    </div>
  );
}
