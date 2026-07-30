import React from 'react';
import Link from 'next/link';
import { Zap, ShieldCheck, Mail, Globe } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full border-t border-slate-800 bg-slate-950 text-slate-400 py-12 px-6 font-sans relative z-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        
        {/* Brand Column */}
        <div className="space-y-4 md:col-span-1">
          <div className="flex items-center gap-2 text-white font-title font-black text-xl tracking-tight">
            <span className="p-1.5 rounded-lg bg-emerald-500 text-slate-950 text-xs font-mono font-bold">JS</span>
            <span>JumpStreet Tech</span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed font-mono">
            Sub-millisecond execution infrastructure, high-frequency trading indicators, and dedicated cloud VPS hosting for institutional and retail traders.
          </p>
          <div className="flex items-center gap-2 text-xs text-emerald-400 font-mono">
            <Zap size={14} className="fill-emerald-400" />
            <span>Equinix LD4 Dedicated Edge Infrastructure</span>
          </div>
        </div>

        {/* Platform Links */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold font-mono uppercase tracking-widest text-slate-200">Platform</h4>
          <ul className="space-y-2 text-xs font-mono">
            <li><a href="#store" className="hover:text-emerald-400 transition-colors">Indicator Catalog</a></li>
            <li><a href="#vm" className="hover:text-emerald-400 transition-colors">Cloud VPS Hosting</a></li>
            <li><a href="#alerts" className="hover:text-emerald-400 transition-colors">Execution Simulator</a></li>
            <li><a href="#payment" className="hover:text-emerald-400 transition-colors">VIP Subscriptions</a></li>
          </ul>
        </div>

        {/* Ecosystem Links */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold font-mono uppercase tracking-widest text-slate-200">Ecosystem</h4>
          <ul className="space-y-2 text-xs font-mono">
            <li><a href="https://cyberkarma.me" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition-colors">CyberKarma Charity</a></li>
            <li><a href="https://adityasec32.systems" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition-colors">AdityaSec SecOps</a></li>
          </ul>
        </div>

        {/* Compliance */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold font-mono uppercase tracking-widest text-slate-200">Legal & Policy</h4>
          <ul className="space-y-2 text-xs font-mono">
            <li><a href="https://cyberkarma.me/privacy/" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition-colors">Privacy Policy</a></li>
            <li><a href="https://cyberkarma.me/terms/" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition-colors">Terms of Service</a></li>
            <li><a href="mailto:support@jumpstreet.tech" className="hover:text-emerald-400 transition-colors flex items-center gap-1.5"><Mail size={12} /> support@jumpstreet.tech</a></li>
          </ul>
        </div>

      </div>

      <div className="max-w-7xl mx-auto pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-slate-400 gap-4">
        <span>© {new Date().getFullYear()} JumpStreet Tech. All rights reserved. Sub-millisecond order execution gateway.</span>
        <div className="flex items-center gap-4">
          <a href="https://cyberkarma.me/privacy/" className="hover:underline">Privacy</a>
          <a href="https://cyberkarma.me/terms/" className="hover:underline">Terms</a>
          <a href="mailto:support@jumpstreet.tech" className="hover:underline">Contact</a>
        </div>
      </div>
    </footer>
  );
}
