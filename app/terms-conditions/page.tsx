"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function TermsConditionsPage() {
  const lastUpdated = "July 16, 2026";

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 flex flex-col transition-colors duration-300">
      <Navbar />

      <main className="flex-1 max-w-3xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-extrabold tracking-tight">Terms & Conditions</h1>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">Last Updated: {lastUpdated}</p>
        </div>

        <article className="prose dark:prose-invert max-w-none text-sm text-zinc-650 dark:text-zinc-350 leading-relaxed space-y-6">
          <p>
            Welcome to <strong>Tooliqo</strong>!
          </p>
          <p>
            These terms and conditions outline the rules and regulations for the use of Tooliqo&apos;s Website, located at <a href="https://tooliqo.com" className="text-indigo-650 dark:text-indigo-400 hover:underline">tooliqo.com</a>.
          </p>
          <p>
            By accessing this website we assume you accept these terms and conditions. Do not continue to use Tooliqo if you do not agree to take all of the terms and conditions stated on this page.
          </p>

          <h3 className="text-lg font-bold text-zinc-905 dark:text-white pt-2">1. License</h3>
          <p>
            Unless otherwise stated, Tooliqo and/or its licensors own the intellectual property rights for all material on Tooliqo. All intellectual property rights are reserved. You may access this from Tooliqo for your own personal use subjected to restrictions set in these terms and conditions.
          </p>
          <p>You must not:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Republish material from Tooliqo</li>
            <li>Sell, rent or sub-license material from Tooliqo</li>
            <li>Reproduce, duplicate or copy material from Tooliqo</li>
            <li>Redistribute content from Tooliqo</li>
          </ul>

          <h3 className="text-lg font-bold text-zinc-905 dark:text-white pt-2">2. User Content & Processing</h3>
          <p>
            As all tools process text, code, and files completely client-side in the user&apos;s browser, Tooliqo does not store or monitor the content you input. You remain fully responsible for the content you format, generate, encode, or convert. We do not inspect, log, or claim any ownership over your inputs or outputs.
          </p>

          <h3 className="text-lg font-bold text-zinc-905 dark:text-white pt-2">3. Disclaimer of Warranties</h3>
          <p>
            To the maximum extent permitted by applicable law, we exclude all representations, warranties and conditions relating to our website and the use of this website. Nothing in this disclaimer will:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>limit or exclude our or your liability for death or personal injury;</li>
            <li>limit or exclude our or your liability for fraud or fraudulent misrepresentation;</li>
            <li>limit or exclude any of our or your liabilities in any way that is not permitted under applicable law.</li>
          </ul>
          <p>
            The limitations and prohibitions of liability set in this Section and elsewhere in this disclaimer: (a) are subject to the preceding paragraph; and (b) govern all liabilities arising under the disclaimer, including liabilities arising in contract, in tort and for breach of statutory duty.
          </p>
          <p>
            As long as the website and the tools on the website are provided free of charge, we will not be liable for any loss or damage of any nature.
          </p>
        </article>
      </main>

      <Footer />
    </div>
  );
}
