"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function DisclaimerPage() {
  const lastUpdated = "July 16, 2026";

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 flex flex-col transition-colors duration-300">

      <main className="flex-1 max-w-3xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-extrabold tracking-tight">Disclaimer</h1>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">Last Updated: {lastUpdated}</p>
        </div>

        <article className="prose dark:prose-invert max-w-none text-sm text-zinc-650 dark:text-zinc-350 leading-relaxed space-y-6">
          <p>
            If you require any more information or have any questions about our site&apos;s disclaimer, please feel free to contact us by email at <a href="mailto:support@tooliqo.com" className="text-indigo-650 dark:text-indigo-400 hover:underline">support@tooliqo.com</a>.
          </p>

          <h3 className="text-lg font-bold text-zinc-905 dark:text-white pt-2">Disclaimers for Tooliqo</h3>
          <p>
            All the information and tool outputs on this website - <a href="https://tooliqo.com" className="text-indigo-650 dark:text-indigo-400 hover:underline font-bold">tooliqo.com</a> - are published in good faith and for general information and utility purposes only. Tooliqo does not make any warranties about the completeness, reliability, and accuracy of this information. Any action you take upon the information you find on this website (Tooliqo), is strictly at your own risk. Tooliqo will not be liable for any losses and/or damages in connection with the use of our website.
          </p>
          <p>
            From our website, you can visit other websites by following hyperlinks to such external sites. While we strive to provide only quality links to useful and ethical websites, we have no control over the content and nature of these sites. These links to other websites do not imply a recommendation for all the content found on these sites. Site owners and content may change without notice and may occur before we have the opportunity to remove a link which may have gone &apos;bad&apos;.
          </p>
          <p>
            Please be also aware that when you leave our website, other sites may have different privacy policies and terms which are beyond our control. Please be sure to check the Privacy Policies of these sites as well as their &quot;Terms of Service&quot; before engaging in any business or uploading any information.
          </p>

          <h3 className="text-lg font-bold text-zinc-905 dark:text-white pt-2">Consent</h3>
          <p>
            By using our website, you hereby consent to our disclaimer and agree to its terms.
          </p>

          <h3 className="text-lg font-bold text-zinc-905 dark:text-white pt-2">Update</h3>
          <p>
            Should we update, amend or make any changes to this document, those changes will be prominently posted here.
          </p>
        </article>
      </main>

    </div>
  );
}
