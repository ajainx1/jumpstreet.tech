import React from 'react';
import Link from 'next/link';
import { ArrowLeft, FileText } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service | JumpStreet Tech',
  description: 'Read the Terms of Service for JumpStreet Tech platform and services.',
  alternates: { canonical: 'https://jumpstreet.tech/terms' },
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#020817] text-white p-6 sm:p-12 font-sans">
      <div className="max-w-3xl mx-auto space-y-8">
        <Link href="/" className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors text-sm font-mono">
          <ArrowLeft size={16} /> Back to JumpStreet Tech
        </Link>
        
        <div className="flex items-center gap-3 border-b border-slate-800 pb-6">
          <FileText className="w-8 h-8 text-emerald-400" />
          <h1 className="text-3xl sm:text-4xl font-bold font-mono">Terms of Service</h1>
        </div>

        <div className="space-y-6 text-slate-300 text-sm leading-relaxed font-mono">
          <p className="text-slate-400">Last updated: August 2026</p>

          <h2 className="text-lg font-bold text-white mt-8 border-l-2 border-emerald-400 pl-3">1. Acceptance of Terms</h2>
          <p>
            By accessing or using JumpStreet Tech website and services, you agree to be bound by these Terms of Service. If you do not agree, please do not use our platform.
          </p>

          <h2 className="text-lg font-bold text-white mt-8 border-l-2 border-emerald-400 pl-3">2. Service Usage</h2>
          <p>
            JumpStreet Tech provides algorithmic trading tools, indicator simulation tools, and hosting information. All tools and information are provided for educational and analytical purposes.
          </p>

          <h2 className="text-lg font-bold text-white mt-8 border-l-2 border-emerald-400 pl-3">3. Intellectual Property</h2>
          <p>
            All content, logos, designs, and code on JumpStreet Tech are the intellectual property of JumpStreet Tech and its licensors.
          </p>

          <h2 className="text-lg font-bold text-white mt-8 border-l-2 border-emerald-400 pl-3">4. Contact Information</h2>
          <p>
            For questions about these terms, reach us at <a href="mailto:support@jumpstreet.tech" className="text-emerald-400 underline hover:text-emerald-300">support@jumpstreet.tech</a>.
          </p>
        </div>
      </div>
    </main>
  );
}
