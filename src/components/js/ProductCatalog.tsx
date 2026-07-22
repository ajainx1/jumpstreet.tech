/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState, useEffect } from 'react';
import { Zap, ShoppingCart, ArrowRight, Radio, Server, Terminal } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Product } from './types';
import TiltWrapper from '@/components/3d/TiltWrapper';

interface ProductCatalogProps {
  onSelectProduct: (product: Product) => void;
}

const PRODUCTS: Product[] = [
  {
    id: 'bot_standard',
    name: 'Orca6™ — Trial License',
    description: 'We will provide a pre-configured demo account for you to test and verify the Orca6™ execution logic firsthand.',
    price: 1499,
    currency: 'INR',
    badge: 'Popular Trial',
    type: 'bot',
    image: '/js/Orca6_Logo_2_Terminal_Prompt.png',
    bgImage: '/js/trial_trading_banner.jpg',
    specs: [
      'Telegram, WhatsApp & Signal Webhook Alerts',
      'Minimum capital required: 500 USD',
      'We provide the demo account credentials',
      'Lightning-fast trade execution to maximize profit margins',
      '24/7 autonomous client-side running capability',
    ],
  },
  {
    id: 'bot_premium',
    name: 'Orca6™ — Premium VM Bundle',
    description: 'Full hands-off automated trading system running on Orca6™ logic, hosted on a dedicated low-latency server.',
    price: 4999,
    currency: 'INR',
    badge: 'VIP Elite',
    type: 'bundle',
    image: '/js/Orca6_Logo_1_Breaching_Orca.png',
    bgImage: '/js/premium_trading_banner.jpg',
    specs: [
      'Includes 1 Month Orca6™ License',
      'Minimum capital required: 500 USD',
      'Account credentials required for deployment',
      'Pre-installed on Windows Cloud VM (2GB ECC RAM, 1 vCPU)',
      'Jumpstreet Anti-crash execution watchdogs included',
      'VIP onboarding — 100% setup handled by our team',
    ],
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 300, damping: 24 } },
};

export default function ProductCatalog({ onSelectProduct }: ProductCatalogProps) {
  const [signalIndex, setSignalIndex] = useState(0);
  const [liveLatency, setLiveLatency] = useState('1.1ms');
  const [ramLoad, setRamLoad] = useState(42);

  const SIGNALS = [
    { pair: 'BUY XAUUSD @ 2650.40', sl: '2645.10', tp: '2665.80', latency: '1.1ms' },
    { pair: 'BUY BTCUSD @ 64230.10', sl: '63800', tp: '65100', latency: '0.9ms' },
    { pair: 'SELL EURUSD @ 1.08450', sl: '1.0870', tp: '1.0800', latency: '1.2ms' },
    { pair: 'BUY NQ1! @ 19840.25', sl: '19790', tp: '19950', latency: '0.8ms' },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setSignalIndex((prev) => (prev + 1) % SIGNALS.length);
      setLiveLatency((1.0 + (Math.random() * 0.3)).toFixed(1) + 'ms');
      setRamLoad(Math.floor(40 + (Math.random() * 6)));
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  const currentSignal = SIGNALS[signalIndex];

  return (
    <div className="space-y-6 sm:space-y-8">
      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {PRODUCTS.map((prod) => {
          const isPremium = prod.id === 'bot_premium' || prod.id === 'pro_trader_bundle';
          const isHardware = prod.type === 'hotspot';

          return (
            <TiltWrapper key={prod.id} tiltDeg={6}>
            <motion.div
              variants={itemVariants}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className={`rounded-[24px] border flex flex-col justify-between overflow-hidden relative group shadow-sm hover:shadow-md transition-shadow backdrop-blur-xl ${isPremium ? 'bg-white border-blue-200' : 'bg-white/60 border-white/60'}`}
            >
              {/* Magic Border Glow for Premium */}
              {isPremium && (
                <div className="absolute inset-0 z-0 bg-gradient-to-br from-blue-50 via-transparent to-indigo-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              )}

              {/* Badge */}
              {prod.badge && (
                <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest z-10 border shadow-sm ${isPremium ? 'bg-blue-600 text-white border-transparent' : 'bg-white text-slate-500 border-black/5'}`}>
                  {isPremium && <span className="mr-1">⭐</span>}
                  {prod.badge}
                </div>
              )}

              {/* Institutional Execution Telemetry Header */}
              <div className="h-48 sm:h-56 relative overflow-hidden flex-shrink-0 border-b border-black/10 z-10 bg-slate-950 p-4 flex flex-col justify-between group/img">
                {/* Background Chart Overlay */}
                {prod.bgImage && (
                  <img
                    src={prod.bgImage}
                    alt={`${prod.name} Trading Theme`}
                    className="absolute inset-0 w-full h-full object-cover opacity-25 group-hover/img:scale-105 transition-transform duration-700 pointer-events-none"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/90 pointer-events-none" />

                {/* Header Top Bar */}
                <div className="relative z-10 flex items-center justify-between">
                  <div className="flex items-center gap-2 bg-slate-900/90 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-400">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>{isPremium ? 'EQUINIX LD4 SERVER NODE' : 'LIVE SIGNAL RELAY'}</span>
                  </div>
                  <img
                    src={prod.image}
                    alt={prod.name}
                    className="h-8 w-auto object-contain drop-shadow-md opacity-90"
                  />
                </div>

                {/* Mockup Terminal Output */}
                <div className="relative z-10 my-auto bg-black/70 backdrop-blur-xl border border-white/10 rounded-xl p-3 font-mono text-[10px] space-y-1.5 shadow-inner overflow-hidden">
                  {/* Subtle Scan Line Laser Beam */}
                  <motion.div
                    animate={{ y: ['-100%', '300%'] }}
                    transition={{ repeat: Infinity, duration: 4, ease: 'linear' }}
                    className="absolute inset-x-0 h-8 bg-gradient-to-b from-emerald-500/10 via-emerald-500/5 to-transparent pointer-events-none"
                  />

                  {prod.id === 'bot_standard' ? (
                    <>
                      <div className="flex items-center justify-between text-slate-400 border-b border-white/5 pb-1">
                        <span className="flex items-center gap-1.5 text-blue-400 font-bold"><Terminal size={12} /> ORCA6-SIGNAL-NODE #412</span>
                        <span className="text-emerald-400 font-bold font-mono">LATENCY: {currentSignal.latency}</span>
                      </div>
                      <div className="h-5 flex items-center overflow-hidden relative">
                        <AnimatePresence mode="wait">
                          <motion.div
                            key={signalIndex}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3 }}
                            className="text-emerald-300 font-bold truncate absolute inset-x-0"
                          >
                            › [SIGNAL] {currentSignal.pair} | SL: {currentSignal.sl}
                          </motion.div>
                        </AnimatePresence>
                      </div>
                      <div className="text-slate-400 flex items-center justify-between text-[9px]">
                        <span>Relay: Telegram / WhatsApp / Webhook</span>
                        <span className="text-emerald-400 font-semibold flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                          FILLED ✓
                        </span>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex items-center justify-between text-slate-400 border-b border-white/5 pb-1">
                        <span className="flex items-center gap-1.5 text-indigo-400 font-bold"><Server size={12} /> ORCA6-VPS-SERVER #09</span>
                        <span className="text-emerald-400 font-bold font-mono">PING: ~{liveLatency}</span>
                      </div>
                      <div className="grid grid-cols-2 gap-1 text-[9px] text-slate-300">
                        <div>• RAM: <strong className="text-white">2GB ECC ({ramLoad}%)</strong></div>
                        <div>• WATCHDOG: <strong className="text-emerald-400">ACTIVE 24/7</strong></div>
                        <div>• REGION: <strong className="text-white">Equinix LD4</strong></div>
                        <div>• UPTIME: <strong className="text-emerald-400">99.99% SLA</strong></div>
                      </div>
                    </>
                  )}
                </div>

                {/* Header Footer Badge */}
                <div className="relative z-10 flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-slate-400">
                  <div className="flex items-center gap-1.5 text-slate-300">
                    {isHardware ? <Radio size={12} className="text-emerald-400" /> : <Zap size={12} className="text-emerald-400" />}
                    <span>{isHardware ? 'Hardware Redundancy' : 'Algorithmic Execution'}</span>
                  </div>
                  <span className="text-emerald-400 font-mono text-[9px]">⚡ INSTITUTIONAL GRADE</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-5 z-10 relative">
                <div>
                  <h4 className="text-base font-black tracking-widest uppercase group-hover:text-blue-600 transition-colors text-slate-900 font-title">
                    {prod.name}
                  </h4>
                  <p className="text-sm mt-2 leading-relaxed text-slate-600 font-medium">
                    {prod.description}
                  </p>

                  <ul className="mt-5 sm:mt-6 space-y-2.5 sm:space-y-3">
                    {prod.specs?.map((spec, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm">
                        <span className={`w-1.5 h-1.5 mt-2 flex-shrink-0 rounded-full ${isPremium ? 'bg-blue-600' : 'bg-slate-400'}`} />
                        <span className="font-medium text-slate-600">
                          {spec}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-5 sm:pt-6 border-t border-black/5 space-y-4 mt-auto">
                  <div className="flex justify-between items-baseline">
                    <span className="text-[11px] font-bold uppercase tracking-widest text-slate-400">
                      Pricing
                    </span>
                    <div className="text-right">
                      <span className={`text-2xl sm:text-3xl font-black font-title tracking-tight ${isPremium ? 'text-emerald-600' : 'text-slate-900'}`}>
                        ₹{prod.price.toLocaleString('en-IN')}
                      </span>
                      <span className="text-[10px] font-bold block text-slate-500 mt-1">
                        International: ${(prod.price / 85).toFixed(2)} USD
                      </span>
                    </div>
                  </div>

                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    type="button"
                    onClick={() => onSelectProduct(prod)}
                    className={`w-full py-3.5 rounded-full text-xs font-bold tracking-widest uppercase transition-all flex items-center justify-center gap-2 cursor-pointer group/btn shadow-sm ${
                      isPremium 
                        ? 'bg-emerald-500 text-white border-transparent hover:bg-emerald-600 shadow-md hover:shadow-lg border' 
                        : 'bg-transparent border-2 border-slate-200 text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    <ShoppingCart size={16} />
                    Activate License
                    <ArrowRight size={14} className="group-hover/btn:translate-x-1.5 transition-transform" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
            </TiltWrapper>
          );
        })}
      </motion.div>

      {/* Trust Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="rounded-[24px] border border-white/60 p-6 sm:p-8 grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 text-center bg-white/60 backdrop-blur-xl shadow-sm"
      >
        {[
          { icon: '🛡️', title: '100% Uptime Guarantee', desc: 'Enterprise SLAs with Zero Setup Fees.' },
          { icon: '🔄', title: 'Cancel Anytime', desc: '7-day money-back guarantee on all licenses.' },
          { icon: '💳', title: 'Global Payments', desc: 'UPI, GPay, Visa, Mastercard accepted.' },
        ].map((item, i) => (
          <div
            key={i}
            className={`space-y-2 py-4 sm:py-0 ${i > 0 ? 'sm:border-l border-t sm:border-t-0 border-black/5' : ''}`}
          >
            <span className="text-2xl">{item.icon}</span>
            <span className="font-black block text-xs uppercase tracking-widest text-slate-900 font-title mt-2">
              {item.title}
            </span>
            <span className="text-xs font-medium text-slate-500">
              {item.desc}
            </span>
          </div>
        ))}
      </motion.div>

      {/* FAQ Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-12 rounded-[24px] border border-white/60 p-8 sm:p-12 bg-white/60 backdrop-blur-xl shadow-sm text-left max-w-4xl mx-auto"
      >
        <h3 className="text-xl font-black font-title uppercase tracking-widest text-slate-900 mb-8 flex items-center gap-2">
          <span>❓</span> Frequently Asked Questions
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10">
          <div>
            <h4 className="text-lg font-bold text-slate-900 mb-2">What is the minimum capital required to run Orca6?</h4>
            <p className="text-base text-slate-600 font-medium leading-relaxed">$500 USD minimum.</p>
          </div>
          <div>
            <h4 className="text-lg font-bold text-slate-900 mb-2">Do I need coding experience?</h4>
            <p className="text-base text-slate-600 font-medium leading-relaxed">No. Our team handles 100% of the technical setup.</p>
          </div>
          <div>
            <h4 className="text-lg font-bold text-slate-900 mb-2">How fast is the execution?</h4>
            <p className="text-base text-slate-600 font-medium leading-relaxed">Average signal latency is ~1.2ms via Jumpstreet API.</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
