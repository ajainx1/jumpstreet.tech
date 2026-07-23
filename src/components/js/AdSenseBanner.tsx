'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, ShieldCheck, Zap, Server, TrendingUp } from 'lucide-react';

interface AdSenseBannerProps {
  refreshKey?: string | number;
  className?: string;
}

const TRADING_SPONSOR_ADS = [
  {
    id: 1,
    title: "Orca6™ Sub-Millisecond Cloud VPS Node",
    sponsor: "Jumpstreet Infrastructure",
    desc: "Pre-provisioned Windows Server VPS hosted on Equinix LD4 nodes with zero-loss order execution.",
    badge: "AdSense Premium Ad Unit",
    cta: "Configure VPS",
    link: "#vm",
    icon: <Server size={18} className="text-emerald-400" />,
    gradient: "from-emerald-950/90 via-slate-900 to-slate-950 border-emerald-500/40",
  },
  {
    id: 2,
    title: "Enterprise SecOps & Threat Telemetry",
    sponsor: "AdityaSec Systems",
    desc: "Automated Purple Teaming, EDR/SIEM SME monitoring, and 24/7 infrastructure hardening.",
    badge: "Sponsored • Est. CPM $9.20",
    cta: "Launch Portal",
    link: "https://adityasec32.systems",
    icon: <ShieldCheck size={18} className="text-cyan-400" />,
    gradient: "from-cyan-950/90 via-slate-900 to-slate-950 border-cyan-500/40",
  },
  {
    id: 3,
    title: "Apex Quantitative Signal Suite",
    sponsor: "Mangalik & Sons Quant Lab",
    desc: "Institutional order-book imbalance execution & real-time signal relay to Telegram & Webhooks.",
    badge: "Direct Ad Unit • Live",
    cta: "View Catalog",
    link: "#store",
    icon: <TrendingUp size={18} className="text-teal-400" />,
    gradient: "from-teal-950/90 via-slate-900 to-slate-950 border-teal-500/40",
  },
  {
    id: 4,
    title: "Dual-Homed 5G J-SIM Network Edge",
    sponsor: "Jumpstreet Hardware Division",
    desc: "Enterprise hardware redundancy with failover routing & sub-millisecond API execution.",
    badge: "Sponsored Ad Unit",
    cta: "Explore Hardware",
    link: "#store",
    icon: <Zap size={18} className="text-amber-400" />,
    gradient: "from-amber-950/90 via-slate-900 to-slate-950 border-amber-500/40",
  },
];

export default function AdSenseBanner({ refreshKey = 0, className = "" }: AdSenseBannerProps) {
  const [adIndex, setAdIndex] = useState(0);

  // Rotate ad banner on refreshKey change or 8s interval
  useEffect(() => {
    const timer = setInterval(() => {
      setAdIndex((prev) => (prev + 1) % TRADING_SPONSOR_ADS.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (refreshKey) {
      setAdIndex((prev) => (prev + 1) % TRADING_SPONSOR_ADS.length);
    }
  }, [refreshKey]);

  // Safely trigger Google AdSense push
  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const adsbygoogle = (window as any).adsbygoogle || [];
        adsbygoogle.push({});
      }
    } catch (e) {
      console.log('AdSense init notice:', e);
    }
  }, [refreshKey, adIndex]);

  const currentAd = TRADING_SPONSOR_ADS[adIndex];

  return (
    <div className={`w-full my-6 font-sans ${className}`}>
      {/* Outer Card Container */}
      <div className="relative rounded-[24px] border border-white/10 p-4 sm:p-5 overflow-hidden bg-slate-900/80 backdrop-blur-2xl text-white shadow-xl">
        
        {/* Header Label Bar */}
        <div className="flex items-center justify-between text-[10px] font-mono font-bold uppercase tracking-widest text-slate-400 mb-3 pb-2 border-b border-white/10">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Monetized Display Ad Unit (Pub: ca-pub-6072468142870937)</span>
          </div>
          <span className="text-emerald-400 font-mono text-[9px] bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
            Est CPM $4.50 – $10.00 USD
          </span>
        </div>

        {/* Live Google AdSense Ins Tag */}
        <div className="relative overflow-hidden rounded-2xl">
          <ins className="adsbygoogle"
               style={{ display: 'block', width: '100%', minHeight: '90px' }}
               data-ad-client="ca-pub-6072468142870937"
               data-ad-slot="auto"
               data-ad-format="auto"
               data-full-width-responsive="true"
               data-ad-test="on" />
        </div>

        {/* Active Animated Ad Banner Creative */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentAd.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className={`mt-2 p-4 rounded-2xl border bg-gradient-to-r ${currentAd.gradient} flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-lg`}
          >
            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-xl bg-slate-900/80 border border-white/10 shrink-0 shadow-inner">
                {currentAd.icon}
              </div>
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="text-[9px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    {currentAd.badge}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">• {currentAd.sponsor}</span>
                </div>
                <h4 className="text-sm font-bold text-white font-title leading-tight">{currentAd.title}</h4>
                <p className="text-xs text-slate-300 font-medium leading-relaxed max-w-xl">{currentAd.desc}</p>
              </div>
            </div>

            <a
              href={currentAd.link}
              className="w-full sm:w-auto px-5 py-2.5 rounded-full text-xs font-bold font-mono tracking-wider uppercase transition-all flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 hover:from-emerald-400 hover:to-teal-400 shadow-md shrink-0 hover:scale-[1.03]"
            >
              <span>{currentAd.cta}</span>
              <ExternalLink size={13} />
            </a>
          </motion.div>
        </AnimatePresence>

        {/* Footer info bar */}
        <div className="mt-3 text-center text-[10px] font-mono text-slate-400 flex flex-wrap items-center justify-between gap-2 px-1">
          <span>⚡ AdSense Engine Active • Auto-refreshes per session</span>
          <span className="text-emerald-400">Google Script Connected ✓</span>
        </div>

      </div>
    </div>
  );
}
