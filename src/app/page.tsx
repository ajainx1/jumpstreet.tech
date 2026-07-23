"use client";
import React, { useState, useEffect, useRef } from 'react';
import {
  ShieldCheck, Terminal, TrendingUp, Radio, ExternalLink,
  FileCheck, Clock, Sliders, ShoppingCart, Menu, X,
  MessageSquare, Server, ChevronUp, Globe
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Product, VMConfig, PaymentSubmission } from '@/components/js/types';
import { useToast, ToastProvider } from '@/components/js/ToastContext';

import AlertsSimulator from '@/components/js/AlertsSimulator';
import VmConfigurator from '@/components/js/VmConfigurator';
import ProductCatalog from '@/components/js/ProductCatalog';
import PaymentPortal from '@/components/js/PaymentPortal';

/* ══════════════════════════════
   HOOKS
══════════════════════════════ */

// Visit counter removed for UX improvements

function useScrollTop() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
  return { visible, scrollTop };
}

/* ══════════════════════════════
   SUB-COMPONENTS
══════════════════════════════ */

// VisitCounterBadge removed

const TICKER_ITEMS = [
  '🚀 Orca6™ automated trading indicator package now live',
  '📞 24/7 VIP Support Active: +91 98975 77 007',
  '⚡ Sub-millisecond Windows Cloud VMs available 24/7',
  '🤖 Automated watchdogs pre-installed on all VMs',
  '💳 UPI, GPay & International Card payments accepted',
  '🔒 Managed by Jumpstreet — A Mangalik & Sons Ventures',
  '📈 Avg signal latency: 1.2ms via Jumpstreet API',
];

type TabKey = 'store' | 'vm' | 'alerts' | 'checkout' | 'orders';

const tabVariants = {
  hidden: { opacity: 0, y: 15, scale: 0.98 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring' as const, stiffness: 400, damping: 25 } },
  exit: { opacity: 0, y: -15, scale: 0.98, transition: { duration: 0.15 } }
};

/* ══════════════════════════════
   MAIN APP CONTENT
══════════════════════════════ */
function AppContent() {
  const [activeTab, setActiveTab] = useState<TabKey>('store');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [customVmConfig, setCustomVmConfig] = useState<{ config: VMConfig; price: number } | null>(null);
  const [orders, setOrders] = useState<PaymentSubmission[]>([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);

  // Sync wallet connection state
  useEffect(() => {
    const checkWallet = () => {
      const savedWallet = localStorage.getItem("web3_wallet_address");
      setWalletAddress(savedWallet);
    };
    checkWallet();
    window.addEventListener("storage", checkWallet);
    return () => window.removeEventListener("storage", checkWallet);
  }, []);
  
  const { visible: showScrollTop, scrollTop } = useScrollTop();
  const { addToast } = useToast();

  // Load orders from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('jumpstreet_orders');
    if (saved) {
      try { setOrders(JSON.parse(saved)); } catch {}
    } else {
      const seed: PaymentSubmission = {
        id: 'TXN-842013', planId: 'bot_standard',
        planName: 'Orca6™ - Trial License',
        amountPaid: 600, currency: 'INR', paymentMethod: 'UPI',
        utrNo: '412095384112', email: 'jain.aditya33@gmail.com',
        telegramUsername: '@ajain_fixed', status: 'pending_verification',
        createdAt: new Date(Date.now() - 3600000).toLocaleDateString('en-IN', {
          day: '2-digit', month: 'short', year: 'numeric',
          hour: '2-digit', minute: '2-digit',
        }),
        hasVM: false,
      };
      setOrders([seed]);
      localStorage.setItem('jumpstreet_orders', JSON.stringify([seed]));
    }
  }, []);

  const tabContentRef = useRef<HTMLDivElement>(null);

  const switchTab = (tab: TabKey) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
    setTimeout(() => {
      if (tabContentRef.current) {
        const yOffset = -90;
        const y = tabContentRef.current.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }, 60);
  };

  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    setCustomVmConfig(null);
    switchTab('checkout');
    addToast(`${product.name} added to checkout`, 'success', '🛒');
  };

  const handleAddVmToCart = (config: VMConfig, price: number) => {
    setCustomVmConfig({ config, price });
    setSelectedProduct(null);
    switchTab('checkout');
    addToast(`VM (${config.ram}GB RAM) added to checkout`, 'success', '🖥️');
  };

  const handlePaymentSubmitted = (submission: PaymentSubmission) => {
    const updated = [submission, ...orders];
    setOrders(updated);
    localStorage.setItem('jumpstreet_orders', JSON.stringify(updated));
    switchTab('orders');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    addToast('Payment submitted! Awaiting verification.', 'success', '✅');
  };

  const handleCancelOrder = (id: string) => {
    const filtered = orders.filter(o => o.id !== id);
    setOrders(filtered);
    localStorage.setItem('jumpstreet_orders', JSON.stringify(filtered));
    addToast('Order cancelled and removed.', 'warn', '🗑️');
  };

  const navItems: { key: TabKey; label: string; icon: React.ReactNode }[] = [
    { key: 'store',    label: 'Store',    icon: <TrendingUp size={14} /> },
    { key: 'vm',       label: 'Cloud VM', icon: <Server size={14} /> },
    { key: 'alerts',   label: 'Alerts',   icon: <Radio size={14} /> },
    { key: 'checkout', label: 'Checkout', icon: <ShoppingCart size={14} /> },
    { key: 'orders',   label: 'Orders',   icon: <FileCheck size={14} /> },
  ];

  const hasPendingCheckout = !!(selectedProduct || customVmConfig);

  return (
    <div className="min-h-screen flex flex-col font-sans relative text-slate-100 bg-[#020817] overflow-x-hidden selection:bg-emerald-500 selection:text-slate-950 transition-colors duration-500">
      {/* ── Dynamic iCloud Mesh Background ── */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[#020817]" />
        <motion.div animate={{ x: [0, 50, 0], y: [0, 30, 0], scale: [1, 1.1, 1] }} transition={{ duration: 30, repeat: Infinity, ease: 'easeInOut' }} className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] rounded-full blur-[140px] opacity-25 bg-emerald-600 mix-blend-screen" />
        <motion.div animate={{ x: [0, -50, 0], y: [0, -30, 0], scale: [1, 1.2, 1] }} transition={{ duration: 35, repeat: Infinity, ease: 'easeInOut' }} className="absolute bottom-[-10%] right-[-10%] w-[70vw] h-[70vw] rounded-full blur-[150px] opacity-20 bg-cyan-600 mix-blend-screen" />
        <div className="absolute inset-0 backdrop-blur-[90px]" />
      </div>

      {/* ── Ticker bar ── */}
      <div className="relative z-10 py-2 border-b border-white/10 bg-slate-950/80 backdrop-blur-md overflow-hidden">
        <motion.div 
          animate={{ x: [0, -1000] }}
          transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
          className="hidden md:flex whitespace-nowrap"
        >
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
            <span key={i} className="inline-flex items-center gap-3 mx-8 text-[11px] font-mono font-bold uppercase tracking-widest text-slate-400">
              {item}
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-sm animate-pulse" />
            </span>
          ))}
        </motion.div>
      </div>

      {/* ── Sticky Header ── */}
      <header className="sticky top-0 z-40 border-b border-white/10 px-4 sm:px-6 py-3 bg-slate-950/80 backdrop-blur-2xl shadow-xl">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">

          {/* Logo */}
          <div className="flex items-center gap-3 flex-shrink-0 group cursor-pointer" onClick={() => switchTab('store')}>
            <div className="w-10 h-10 flex items-center justify-center rounded-[12px] bg-slate-900 shadow-md border border-emerald-500/30 group-hover:border-emerald-400 group-hover:-translate-y-0.5 transition-all overflow-hidden">
              <img src="/js/Orca6_Logo_1_Breaching_Orca.png" alt="Orca6 Logo" className="w-full h-full object-contain p-0.5" />
            </div>
            <div className="hidden sm:block">
              <div className="flex items-center gap-2">
                <span className="text-sm font-black tracking-widest uppercase text-white font-title">
                  Jumpstreet
                </span>
                <span className="text-[9px] px-2 py-0.5 rounded-full font-bold uppercase tracking-widest hidden md:inline bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 shadow-inner">
                  Mangalik &amp; Sons Ventures
                </span>
              </div>
              <p className="text-[10px] font-bold tracking-wider uppercase text-slate-400 group-hover:text-emerald-400 transition-colors">
                Mangalik &amp; Sons Ventures
              </p>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-2 font-bold uppercase tracking-widest text-[11px] p-1.5 bg-slate-900/80 rounded-2xl border border-white/10 backdrop-blur-sm shadow-inner" aria-label="Main navigation">
            {navItems.map(({ key, label, icon }) => {
              const isActive = activeTab === key;
              return (
                <button
                  key={key}
                  onClick={() => switchTab(key)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all relative z-10 ${
                    isActive ? (key === 'checkout' ? 'text-emerald-400 font-black' : 'text-emerald-300 font-black') : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {isActive && (
                    <motion.div 
                      layoutId="desktopNavBubble"
                      className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border border-emerald-500/40 rounded-xl shadow-sm -z-10"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  {icon}
                  {label}
                  {key === 'checkout' && hasPendingCheckout && (
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping absolute top-1.5 right-1.5" />
                  )}
                  {key === 'orders' && orders.length > 0 && (
                    <span className="text-[9px] font-bold px-2 py-0.5 rounded-full ml-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                      {orders.length}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-3">
            {walletAddress && (
              <div className="hidden md:flex items-center gap-1.5 px-3 py-2 rounded-lg border border-emerald-500/20 bg-emerald-500/10 text-emerald-400 text-[10px] font-mono font-bold uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>{walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}</span>
              </div>
            )}


            <button
              onClick={() => setMobileMenuOpen(m => !m)}
              className="lg:hidden p-3 rounded-xl transition-all bg-slate-900 text-slate-300 border border-white/10 hover:bg-slate-800"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile Dropdown Drawer ── */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden sticky z-30 border-b border-white/10 px-4 py-4 space-y-2 font-bold uppercase tracking-widest text-[11px] bg-slate-950/95 backdrop-blur-2xl overflow-hidden shadow-xl"
            style={{ top: '65px' }}
          >
            {navItems.map(({ key, label, icon }) => (
              <button
                key={key}
                onClick={() => switchTab(key)}
                className={`w-full text-left flex items-center justify-between p-4 rounded-xl transition-all ${
                   activeTab === key ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm' : 'text-slate-400 hover:bg-white/5 hover:text-white'
                }`}
              >
                <span className={`flex items-center gap-3 ${activeTab === key && key === 'checkout' ? 'text-emerald-400' : ''}`}>
                  {icon} {label}
                </span>
                {key === 'orders' && orders.length > 0 && (
                  <span className="text-[10px] font-bold text-emerald-300 bg-emerald-500/20 px-3 py-1 rounded-full border border-emerald-500/40 shadow-sm">
                    {orders.length}
                  </span>
                )}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Main Content ── */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start relative z-10">

        {/* Left Column */}
        <div className="lg:col-span-8 space-y-8 min-w-0">

          {/* ── Hero Card ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative rounded-[32px] border border-white/10 overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.6)] bg-slate-900/70 backdrop-blur-2xl transition-shadow hover:shadow-[0_35px_70px_rgba(0,0,0,0.8)]"
          >
            <div className="absolute right-0 top-0 w-80 h-80 pointer-events-none bg-emerald-500/10 blur-[80px] rounded-full translate-x-1/3 -translate-y-1/3" />
            <div className="absolute left-0 bottom-0 w-64 h-64 pointer-events-none bg-cyan-500/10 blur-[80px] rounded-full -translate-x-1/3 translate-y-1/3" />

            <div className="relative p-8 sm:p-10 lg:p-12">
              <div className="flex items-center gap-3 mb-6 bg-slate-950/80 w-max px-4 py-2 rounded-full border border-emerald-500/30 shadow-sm">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-sm" />
                <span className="text-[11px] font-bold text-emerald-400 tracking-[0.2em] uppercase font-mono">
                  Platform Node Active
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-[1.15] uppercase mb-6 text-white font-title">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 drop-shadow-md block sm:inline">
                  Apex Algorithmic Execution
                </span>{' '}
                <span className="opacity-70 text-slate-400 text-2xl sm:text-3xl font-medium font-sans">
                  — Powered by
                </span>{' '}
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-title font-black text-2xl sm:text-4xl shadow-sm tracking-normal">
                  Orca6™
                </span>
              </h1>

              <p className="text-base sm:text-lg leading-relaxed max-w-2xl mb-8 text-slate-300 font-medium">
                Experience fully hands-off, state-of-the-art algorithmic trading. Jumpstreet secures
                the lowest-latency Windows Cloud VPS packages seamlessly pre-installed with our elite{' '}
                <strong className="text-emerald-400 font-black">Orca6™</strong> trading logic, delivering instant execution directly to the markets.
              </p>

              <div className="mb-10 p-5 rounded-2xl bg-indigo-950/40 border border-indigo-500/30 shadow-sm text-sm font-medium text-indigo-200 leading-relaxed max-w-2xl backdrop-blur-xl">
                <strong className="text-indigo-400 flex items-center gap-2 mb-2 text-xs tracking-widest uppercase font-mono"><ShieldCheck size={16} /> VIP Client Onboarding &amp; Zero-Risk Trial</strong>
                For the <strong>Trial License</strong>, Jumpstreet provisions and delivers a <strong>Pre-Funded Demo Account</strong> with login credentials so you can evaluate Orca6™ execution logic with <strong>zero personal capital risk</strong>. When upgrading to the <strong>Premium VM Bundle</strong>, our engineering team handles 100% of the turnkey setup on your Real or Prop-Firm (Funding) accounts—including zero-loss deposit guidance via Paytm, UPI, Cards, or Crypto.
                <ul className="mt-3.5 space-y-1 text-xs font-semibold text-indigo-300">
                  <li className="flex items-center gap-2">✓ Pre-funded demo account credentials delivered instantly for Trial License</li>
                  <li className="flex items-center gap-2">✓ Compatible with Real Accounts &amp; Prop-Firm / Funded Accounts</li>
                  <li className="flex items-center gap-2">✓ Dedicated 1:1 onboarding &amp; zero-loss deposit assistance</li>
                </ul>
              </div>

              {/* Stats Grid */}
              <div className="flex sm:grid sm:grid-cols-4 gap-4 overflow-x-auto pb-4 sm:pb-0 snap-x hide-scrollbar">
                {[
                  { label: 'Gateway Status', value: 'Secure Live',    color: '#34d399', pulse: true, bg: 'bg-emerald-950/40 border-emerald-500/30' },
                  { label: 'Signal Latency',  value: '~1.2 ms avg',   color: '#38bdf8',  pulse: false, bg: 'bg-slate-950/80 border-white/10' },
                  { label: 'Dual-Homed Node Stock', value: '14 Units Left', color: '#cbd5e1',  pulse: false, bg: 'bg-slate-950/80 border-white/10' },
                  { label: 'Operator',        value: 'M&S Ventures',   color: '#34d399', pulse: false, bg: 'bg-emerald-950/40 border-emerald-500/30' },
                ].map((s, i) => (
                  <motion.div
                    whileHover={{ y: -4 }}
                    key={i}
                    className={`p-5 rounded-2xl border backdrop-blur-xl shadow-sm ${s.bg} min-w-[160px] sm:min-w-0 snap-center shrink-0`}
                  >
                    <span className="text-[10px] font-mono font-bold block uppercase tracking-widest mb-2 text-slate-400">{s.label}</span>
                    <span className="text-xs font-black flex items-center gap-2 font-title tracking-wide" style={{ color: s.color }}>
                      {s.pulse && <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse flex-shrink-0 shadow-sm" />}
                      {s.value}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* ── Tab Content ── */}
          <div ref={tabContentRef} className="relative min-h-[500px] scroll-mt-24">
            <AnimatePresence mode="wait">
              
              {activeTab === 'store' && (
                <motion.div key="store" variants={tabVariants} initial="hidden" animate="visible" exit="exit" className="space-y-6">
                  <div className="bg-slate-900/70 p-6 rounded-[24px] border border-white/10 shadow-lg backdrop-blur-xl mb-6">
                    <h2 className="text-base sm:text-lg font-black tracking-widest flex items-center gap-3 uppercase text-white font-title">
                      <TrendingUp size={22} className="text-emerald-400" /> Licenses &amp; Hardware Catalog
                    </h2>
                    <p className="text-sm font-medium mt-1 text-slate-400">Order licenses and hardware imported for optimal latency</p>
                  </div>
                  <ProductCatalog onSelectProduct={handleSelectProduct} />
                </motion.div>
              )}

              {activeTab === 'vm' && (
                <motion.div key="vm" variants={tabVariants} initial="hidden" animate="visible" exit="exit" className="space-y-6">
                  <div className="bg-slate-900/70 p-6 rounded-[24px] border border-white/10 shadow-lg backdrop-blur-xl mb-6">
                    <h2 className="text-base sm:text-lg font-black tracking-widest flex items-center gap-3 uppercase text-white font-title">
                      <Sliders size={22} className="text-emerald-400" /> Custom VM Architecture Build
                    </h2>
                    <p className="text-sm font-medium mt-1 text-slate-400">Tailor the perfect Windows VPS for continuous automated execution</p>
                  </div>
                  <VmConfigurator onAddVmToCart={handleAddVmToCart} />
                </motion.div>
              )}

              {activeTab === 'alerts' && (
                <motion.div key="alerts" variants={tabVariants} initial="hidden" animate="visible" exit="exit">
                  <AlertsSimulator />
                </motion.div>
              )}

              {activeTab === 'checkout' && (
                <motion.div key="checkout" variants={tabVariants} initial="hidden" animate="visible" exit="exit">
                  <PaymentPortal
                    selectedProduct={selectedProduct}
                    customVmConfig={customVmConfig}
                    onPaymentSubmitted={handlePaymentSubmitted}
                  />
                </motion.div>
              )}

              {activeTab === 'orders' && (
                <motion.div key="orders" variants={tabVariants} initial="hidden" animate="visible" exit="exit" className="space-y-6">
                  <div className="flex justify-between items-center flex-wrap gap-3 bg-slate-900/70 p-6 rounded-[24px] border border-white/10 shadow-lg backdrop-blur-xl">
                    <div>
                      <h2 className="text-base sm:text-lg font-black tracking-widest flex items-center gap-3 uppercase text-white font-title">
                        <FileCheck size={22} className="text-emerald-400" /> Order &amp; License Logbook
                      </h2>
                      <p className="text-sm font-medium mt-1 text-slate-400">Track billing verifications and subscription states</p>
                    </div>
                    <span className="text-[10px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 shadow-sm font-mono">
                      LOCAL STORAGE SECURED
                    </span>
                  </div>

                  {orders.length === 0 ? (
                    <div className="rounded-[24px] border border-white/10 p-12 sm:p-16 text-center bg-slate-900/60 backdrop-blur-2xl shadow-lg">
                      <div className="w-20 h-20 rounded-[20px] flex items-center justify-center mx-auto mb-6 bg-slate-950 border border-white/10 text-slate-400 shadow-inner">
                        <Clock size={32} />
                      </div>
                      <h3 className="text-base font-black uppercase tracking-widest text-white font-title">No transactions yet</h3>
                      <p className="text-sm mt-3 max-w-sm mx-auto font-medium text-slate-400 leading-relaxed">
                        Scan the UPI QR in Checkout, transfer funds, and enter your reference ID.
                      </p>
                      <button
                        onClick={() => switchTab('store')}
                        className="mt-8 px-8 py-3.5 rounded-full text-xs font-bold transition-all uppercase tracking-widest bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 hover:from-emerald-400 hover:to-teal-400 shadow-md hover:shadow-lg hover:-translate-y-0.5"
                      >
                        Browse Licenses
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-5">
                      {orders.map((ord, i) => (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.1 }}
                          key={ord.id}
                          className="rounded-[24px] border border-white/10 p-6 sm:p-8 space-y-6 bg-slate-900/70 backdrop-blur-xl shadow-lg hover:border-emerald-500/30 transition-all group"
                        >
                          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-5 border-b border-white/10">
                            <div>
                              <span className="text-sm font-black uppercase tracking-widest text-white group-hover:text-emerald-400 transition-colors font-title">
                                {ord.planName}
                              </span>
                              <div className="flex flex-wrap items-center gap-3 mt-2 font-mono">
                                <span className="text-[11px] font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/30">ID: {ord.id}</span>
                                <span className="text-slate-600">•</span>
                                <span className="text-[11px] font-bold text-slate-400">{ord.createdAt}</span>
                              </div>
                            </div>
                            <span
                              className={`px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-sm ${
                                (ord.status === 'active' || ord.status === 'completed') 
                                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
                                  : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                              }`}
                            >
                              {(ord.status === 'active' || ord.status === 'completed') ? '✅ Verified & Active' : '⏳ Verifying...'}
                            </span>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm">
                            {[
                              { label: 'User', primary: ord.email, secondary: ord.telegramUsername },
                              { label: 'UTR / Reference', primary: ord.utrNo, secondary: `via ${ord.paymentMethod}` },
                              { label: 'Total Paid', primary: `₹${ord.amountPaid.toLocaleString('en-IN')}`, secondary: `~$${(ord.amountPaid/85).toFixed(1)} USD`, big: true },
                            ].map((row, j) => (
                              <div key={j}>
                                <span className="block text-[10px] uppercase tracking-widest font-mono font-bold mb-1.5 text-slate-400">{row.label}</span>
                                <span className={`block truncate ${row.big ? 'text-emerald-400 font-black text-2xl font-title tracking-tight' : 'text-white font-bold'}`}>
                                  {row.primary}
                                </span>
                                <span className="text-[11px] text-slate-400 mt-1 block font-medium">{row.secondary}</span>
                              </div>
                            ))}
                          </div>

                          {ord.hasVM && (
                            <div className="p-5 rounded-2xl border border-white/10 bg-slate-950/80">
                              <div className="font-black flex items-center gap-3 uppercase tracking-widest text-white font-title text-sm">
                                <Terminal size={18} className="text-emerald-400 animate-pulse" />
                                Windows Server Deployment Initiated
                              </div>
                              <p className="text-sm mt-3 leading-relaxed text-slate-300 font-medium">
                                Provisioning <strong className="text-white font-bold">{ord.vmDetails?.ram || 2}GB RAM</strong> node in <strong className="text-white font-bold">{ord.vmDetails?.region || 'Mumbai'}</strong>. Credentials dispatched via Telegram.
                              </p>
                            </div>
                          )}

                          <div className="pt-5 border-t border-white/10 flex justify-between items-center text-[11px] font-bold">
                            <span className="italic text-slate-400">
                              {ord.status === 'pending_verification'
                                ? '🔒 Awaiting ledger review by Mangalik & Sons Ventures.'
                                : '✅ License key dispatched via Telegram.'}
                            </span>
                            <button
                              onClick={() => handleCancelOrder(ord.id)}
                              className="text-red-400 hover:text-white transition-colors uppercase tracking-widest ml-4 px-4 py-2 rounded-full border border-red-500/30 bg-red-500/10 hover:bg-red-600 shadow-sm"
                            >
                              Cancel
                            </button>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Right Sidebar */}
        <aside className="lg:col-span-4 space-y-6 lg:space-y-8 lg:sticky lg:top-[90px]">
          {/* Corporate Overview */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="rounded-[24px] border border-white/10 p-8 space-y-6 bg-slate-900/70 backdrop-blur-2xl shadow-lg"
          >
            <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] pb-4 border-b border-white/10 text-slate-400 flex items-center gap-2 font-mono">
               Corporate Overview
            </h3>
            <div className="space-y-4 text-sm leading-relaxed text-slate-300 font-medium">
              <p>
                High-frequency automated execution infrastructure. A technology division of <strong className="text-white font-bold">Mangalik &amp; Sons Ventures</strong>.
              </p>
              <p>
                We specialize in FPGA-accelerated, latency-critical trading utilities—delivering the{' '}
                <strong className="text-emerald-400 font-bold">Orca6™ HFT execution suite</strong>—alongside enterprise-grade 5G routing and secure J-SIM networking infrastructure.
              </p>
            </div>
            <div className="p-5 rounded-2xl border border-white/10 bg-slate-950/80">
              <span className="text-[10px] font-black block uppercase tracking-widest font-title mb-4 text-slate-400">Operations</span>
              <div className="grid grid-cols-2 gap-3 text-xs">
                {[
                  { label: 'Corporate HQ', value: 'New Delhi, IN' },
                  { label: 'Edge Infrastructure', value: 'Tokyo, Frankfurt & Mumbai' },
                  { label: 'Established', value: '2022' },
                  { label: 'Core Sector', value: 'HFT & Quant Execution' },
                ].map(item => (
                  <div key={item.label} className="p-3 rounded-xl border border-white/10 bg-slate-900 shadow-sm hover:border-emerald-500/40 transition-colors flex flex-col justify-center">
                    <span className="block text-[9px] font-mono font-bold text-slate-400 mb-1 uppercase tracking-widest">{item.label}</span>
                    <span className="font-black text-white leading-tight">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Help Desk */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="rounded-[24px] border border-white/10 p-8 sm:p-10 text-center space-y-5 bg-slate-900/70 backdrop-blur-2xl shadow-lg"
          >
            <div className="w-16 h-16 rounded-[20px] flex items-center justify-center mx-auto bg-slate-950 border border-white/10 text-emerald-400 shadow-inner">
              <MessageSquare size={24} />
            </div>
            <div>
              <h4 className="text-base font-black uppercase tracking-widest text-white font-title">Need Custom Setup?</h4>
              <p className="text-xs mt-2 font-medium text-slate-400 leading-relaxed max-w-[200px] mx-auto">
                We design fully automated systems tailored to your trading strategy.
              </p>
            </div>
            <Link
              href="https://wa.me/919897577007"
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full py-4 mt-4 text-xs font-bold tracking-widest uppercase rounded-full transition-all flex items-center justify-center gap-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 shadow-md hover:shadow-xl hover:from-emerald-400 hover:to-teal-400 hover:-translate-y-0.5 group"
            >
              <span>Speak to Developer</span>
              <ExternalLink size={16} className="group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </motion.div>

          {/* Global Intelligence */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="rounded-[24px] border border-white/10 p-8 sm:p-10 text-center space-y-5 bg-slate-900/70 backdrop-blur-2xl shadow-lg mt-6"
          >
            <div className="w-16 h-16 rounded-[20px] flex items-center justify-center mx-auto bg-slate-950 border border-white/10 text-cyan-400 shadow-inner">
              <Globe size={24} />
            </div>
            <div>
              <h4 className="text-base font-black uppercase tracking-widest text-white font-title">World Monitor</h4>
              <p className="text-xs mt-2 font-medium text-slate-400 leading-relaxed max-w-[200px] mx-auto">
                Live global telemetry: conflicts, economics, and infrastructure.
              </p>
            </div>
            <Link
              href="https://www.worldmonitor.app/dashboard?zoom=1.00&view=global&timeRange=7d&layers=conflicts%2Cbases%2Chotspots%2Cnuclear%2Csanctions%2Cweather%2Ceconomic%2Cwaterways%2Coutages%2Cmilitary%2Cnatural"
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full py-4 mt-4 text-xs font-bold tracking-widest uppercase rounded-full transition-all flex items-center justify-center gap-3 bg-slate-950 text-white border border-white/10 shadow-sm hover:shadow-md hover:bg-slate-800 hover:-translate-y-0.5 group"
            >
              <span>Launch Radar</span>
              <ExternalLink size={16} className="group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform text-cyan-400" />
            </Link>
          </motion.div>
        </aside>
      </main>

      {/* ── Footer ── */}
      <footer className="border-t border-white/10 py-12 px-4 text-center text-xs mt-auto relative z-10 bg-slate-950/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] font-mono font-bold uppercase tracking-widest text-slate-400">
            <span>Jumpstreet • Mangalik &amp; Sons Ventures © 2026. All rights reserved.</span>
            <span className="text-emerald-400 tracking-wider">Orca6™ — Intelligent. Strategic. Apex.</span>
          </div>
          <p className="max-w-2xl mx-auto text-[11px] leading-relaxed text-slate-400 font-medium">
            Jumpstreet is a technology distribution venture. Trading signals are for backtesting and analytical simulation.
            We do not provide personalised financial advice. *Prices exclude GST. International payments via Stripe/Razorpay. <br/>
            Your data is never shared or sold. Secured via 256-bit encryption.
          </p>
          <div className="flex flex-wrap justify-center gap-6 sm:gap-10 text-[10px] uppercase tracking-widest font-bold text-slate-400">
            {[
              { label: 'Security Operations', href: 'https://adityasec32.systems' },
              { label: 'Primary Network Portal', href: 'https://adityasec32.systems' },
              { label: 'Terms & Risk Governance', href: '#' },
            ].map(link => (
              <Link key={link.label} href={link.href} className="hover:text-emerald-400 transition-colors">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </footer>

      {/* ── Mobile Bottom Navigation ── */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-950/95 backdrop-blur-xl border-t border-white/10 flex justify-around p-2 pb-[calc(0.5rem+env(safe-area-inset-bottom))] shadow-2xl">
        {navItems.map(({ key, label, icon }) => (
          <button
            key={key}
            onClick={() => switchTab(key)}
            className={`flex flex-col items-center justify-center p-2 rounded-xl gap-1.5 min-w-[60px] transition-all ${
              activeTab === key ? 'text-emerald-400 bg-emerald-500/20' : 'text-slate-400 hover:bg-white/5'
            }`}
          >
            {icon}
            <span className="text-[9px] font-bold uppercase tracking-widest">{label}</span>
          </button>
        ))}
      </nav>

      {/* ── Scroll-to-Top Button ── */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={scrollTop}
            className="fixed bottom-24 sm:bottom-8 right-6 z-40 w-12 h-12 rounded-full flex items-center justify-center bg-slate-900 border border-emerald-500/40 text-emerald-400 shadow-[0_10px_25px_rgba(0,0,0,0.5)] hover:bg-emerald-500 hover:text-slate-950 hover:shadow-[0_10px_25px_rgba(16,185,129,0.3)] transition-all"
            aria-label="Scroll to top"
          >
            <ChevronUp size={24} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function JSPage() {
  return (
    <ToastProvider>
      <AppContent />
    </ToastProvider>
  );
}
