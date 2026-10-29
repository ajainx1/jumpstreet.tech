import React from 'react';
import Link from 'next/link';
import { ArrowLeft, ShieldCheck } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | JumpStreet Tech',
  description: 'Read the JumpStreet Tech Privacy Policy. Learn how we handle your data, security, and third-party advertising partners like Google AdSense.',
  alternates: { canonical: 'https://jumpstreet.tech/privacy' },
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#020817] text-white p-6 sm:p-12 font-sans">
      <div className="max-w-3xl mx-auto space-y-8">
        <Link href="/" className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors text-sm font-mono">
          <ArrowLeft size={16} /> Back to JumpStreet Tech
        </Link>
        
        <div className="flex items-center gap-3 border-b border-slate-800 pb-6">
          <ShieldCheck className="w-8 h-8 text-emerald-400" />
          <h1 className="text-3xl sm:text-4xl font-bold font-mono">Privacy Policy</h1>
        </div>

        <div className="space-y-6 text-slate-300 text-sm leading-relaxed font-mono">
          <p className="text-slate-400">Last updated: August 2026</p>

          <h2 className="text-lg font-bold text-white mt-8 border-l-2 border-emerald-400 pl-3">1. Information We Collect</h2>
          <p>
            At JumpStreet Tech, we prioritize your privacy and transparency. When you visit our website, we may collect minimal technical usage data such as your IP address, browser type, and device information for analytics and performance monitoring.
          </p>

          <h2 className="text-lg font-bold text-white mt-8 border-l-2 border-emerald-400 pl-3">2. Cookies and Third-Party Advertising</h2>
          <p>
            We partner with third-party vendors, including <strong>Google AdSense</strong>, to serve ads when you visit our website. Google uses cookies (such as the DART cookie) to serve ads based on user visits to our site and other sites on the Internet.
          </p>
          <p>
            Users may opt out of personalized advertising by visiting Google's <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-emerald-400 underline hover:text-emerald-300">Ads Settings</a>.
          </p>

          <h2 className="text-lg font-bold text-white mt-8 border-l-2 border-emerald-400 pl-3">3. Data Protection and Security</h2>
          <p>
            We do not sell, trade, or rent your personal information to third parties. We enforce HTTPS encryption across all our web infrastructure to safeguard data in transit.
          </p>

          <h2 className="text-lg font-bold text-white mt-8 border-l-2 border-emerald-400 pl-3">4. Contact Us</h2>
          <p>
            If you have any questions regarding this Privacy Policy, please contact our support team at <a href="mailto:support@jumpstreet.tech" className="text-emerald-400 underline hover:text-emerald-300">support@jumpstreet.tech</a>.
          </p>
        </div>
      </div>
    </main>
  );
}
