"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function PrivacyPolicyPage() {
  const lastUpdated = "July 16, 2026";

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 flex flex-col transition-colors duration-300">

      <main className="flex-1 max-w-3xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-extrabold tracking-tight">Privacy Policy</h1>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">Last Updated: {lastUpdated}</p>
        </div>

        <article className="prose dark:prose-invert max-w-none text-sm text-zinc-650 dark:text-zinc-350 leading-relaxed space-y-6">
          <p>
            At <strong>Tooliqo</strong>, accessible from <a href="https://tooliqo.com" className="text-indigo-600 dark:text-indigo-400 font-bold hover:underline">tooliqo.com</a>, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by Tooliqo and how we use it.
          </p>

          <h3 className="text-lg font-bold text-zinc-900 dark:text-white pt-2">1. Client-Side Processing Consent</h3>
          <p>
            Tooliqo is designed to run entirely on the client-side. Any data you enter into our tools (including JSON payloads, password configurations, files, plain text, and query strings) is processed locally inside your web browser. None of this data is transmitted, stored, or processed on our backend servers.
          </p>

          <h3 className="text-lg font-bold text-zinc-900 dark:text-white pt-2">2. Log Files</h3>
          <p>
            Tooliqo follows a standard procedure of using log files. These files log visitors when they visit websites. All hosting companies do this as part of hosting services&apos; analytics. The information collected by log files includes internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable.
          </p>

          <h3 className="text-lg font-bold text-zinc-900 dark:text-white pt-2">3. Google DoubleClick DART Cookie</h3>
          <p>
            Google is one of the third-party vendors on our site. It also uses cookies, known as DART cookies, to serve ads to our site visitors based upon their visit to our site and other sites on the internet. However, visitors may choose to decline the use of DART cookies by visiting the Google ad and content network Privacy Policy at the following URL: <a href="https://policies.google.com/technologies/ads" className="text-indigo-650 dark:text-indigo-400 hover:underline">https://policies.google.com/technologies/ads</a>.
          </p>

          <h3 className="text-lg font-bold text-zinc-900 dark:text-white pt-2">4. Advertising Partners Privacy Policies</h3>
          <p>
            Third-party ad servers or ad networks use technologies like cookies, JavaScript, or Web Beacons that are used in their respective advertisements and links that appear on Tooliqo, which are sent directly to users&apos; browsers. They automatically receive your IP address when this occurs. These technologies are used to measure the effectiveness of their advertising campaigns and/or to personalize the advertising content that you see on websites that you visit.
          </p>
          <p>
            Note that Tooliqo has no access to or control over these cookies that are used by third-party advertisers.
          </p>

          <h3 className="text-lg font-bold text-zinc-900 dark:text-white pt-2">5. Third Party Privacy Policies</h3>
          <p>
            Tooliqo&apos;s Privacy Policy does not apply to other advertisers or websites. Thus, we are advising you to consult the respective Privacy Policies of these third-party ad servers for more detailed information. It may include their practices and instructions about how to opt-out of certain options.
          </p>

          <h3 className="text-lg font-bold text-zinc-900 dark:text-white pt-2">6. GDPR Data Protection Rights</h3>
          <p>
            We want to make sure you are fully aware of all of your data protection rights. Every user is entitled to the following:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>The right to access - You have the right to request copies of your personal data.</li>
            <li>The right to rectification - You have the right to request that we correct any information you believe is inaccurate.</li>
            <li>The right to erasure - You have the right to request that we erase your personal data, under certain conditions.</li>
          </ul>
        </article>
      </main>

    </div>
  );
}
