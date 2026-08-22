"use client";
import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Calculator, Zap, TrendingUp, ShieldCheck, ArrowRight, Activity, Cpu } from 'lucide-react';

export default function ArbitrageCalculator({ onSelectBundle }: { onSelectBundle?: () => void }) {
  const [capital, setCapital] = useState<number>(50000);
  const [strategy, setStrategy] = useState<'conservative' | 'balanced' | 'hft_apex'>('balanced');
  const [holdingPeriod, setHoldingPeriod] = useState<number>(3); // months

  const metrics = useMemo(() => {
    let monthlyRoiRate = 0.08; // 8% conservative
    let slippageReduction = 94; // %
    let latencyAdvantage = "0.8ms LD4";

    if (strategy === 'conservative') {
      monthlyRoiRate = 0.075;
      slippageReduction = 91;
      latencyAdvantage = "1.2ms Direct";
    } else if (strategy === 'balanced') {
      monthlyRoiRate = 0.145;
      slippageReduction = 96;
      latencyAdvantage = "0.8ms LD4 VPS";
    } else if (strategy === 'hft_apex') {
      monthlyRoiRate = 0.235;
      slippageReduction = 99.2;
      latencyAdvantage = "0.4ms Cross-Connect";
    }

    const estimatedMonthlyProfit = Math.round(capital * monthlyRoiRate);
    const estimatedTotalGain = Math.round(capital * Math.pow(1 + monthlyRoiRate, holdingPeriod) - capital);
    const slippageSaved = Math.round(capital * 0.028 * holdingPeriod);

    return {
      monthlyRoiRate: (monthlyRoiRate * 100).toFixed(1),
      estimatedMonthlyProfit,
      estimatedTotalGain,
      slippageSaved,
      slippageReduction,
      latencyAdvantage,
    };
  }, [capital, strategy, holdingPeriod]);

  return (
    <div className="p-6 sm:p-8 rounded-[28px] bg-slate-900/80 border border-emerald-500/25 backdrop-blur-2xl shadow-2xl space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-sm">
            <Calculator size={24} />
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-black font-title text-white flex items-center gap-2">
              <span>Orca6™ Yield &amp; Latency Simulator</span>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                PROJECTION
              </span>
            </h3>
            <p className="text-xs text-slate-400">Estimate automated algorithmic returns &amp; slippage savings</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-400 bg-slate-950/80 px-3 py-1.5 rounded-xl border border-white/10">
          <Activity size={14} className="animate-pulse" />
          <span>Equinix LD4 Sub-Millisecond</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Controls */}
        <div className="lg:col-span-7 space-y-5">
          {/* Capital Slider */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs font-mono font-bold">
              <span className="text-slate-300">Trading Capital Base:</span>
              <span className="text-emerald-400 text-base font-title font-black">
                ₹{capital.toLocaleString('en-IN')} <span className="text-xs text-slate-400 font-mono">(~${Math.round(capital / 85)} USD)</span>
              </span>
            </div>
            <input
              type="range"
              min={10000}
              max={1000000}
              step={10000}
              value={capital}
              onChange={(e) => setCapital(Number(e.target.value))}
              className="w-full h-2 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-emerald-400 border border-white/10"
            />
            <div className="flex justify-between text-[10px] font-mono text-slate-500">
              <span>₹10,000 (Min)</span>
              <span>₹5,00,000</span>
              <span>₹10,00,000 (Apex)</span>
            </div>
          </div>

          {/* Strategy Mode Buttons */}
          <div className="space-y-2">
            <label className="text-xs font-mono font-bold text-slate-300">Execution Frequency &amp; Risk Mode:</label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'conservative', label: 'Conservative', roi: '7.5%/mo', desc: 'Low Drawdown' },
                { id: 'balanced', label: 'Balanced', roi: '14.5%/mo', desc: 'Standard Alpha' },
                { id: 'hft_apex', label: 'HFT Apex', roi: '23.5%/mo', desc: 'Ultra-High Frequency' }
              ].map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setStrategy(s.id as any)}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    strategy === s.id
                      ? 'bg-emerald-500/20 border-emerald-400 text-white shadow-md'
                      : 'bg-slate-950/60 border-white/10 text-slate-400 hover:text-white hover:border-white/20'
                  }`}
                >
                  <div className="text-xs font-bold font-title">{s.label}</div>
                  <div className="text-[11px] font-mono text-emerald-400 font-bold">{s.roi}</div>
                  <div className="text-[9px] text-slate-400">{s.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Holding Duration Buttons */}
          <div className="space-y-2">
            <label className="text-xs font-mono font-bold text-slate-300">Target Simulation Horizon:</label>
            <div className="flex gap-2">
              {[
                { months: 1, label: '1 Month' },
                { months: 3, label: '3 Months (Quarterly)' },
                { months: 6, label: '6 Months' },
                { months: 12, label: '1 Year (Compounded)' }
              ].map((h) => (
                <button
                  key={h.months}
                  type="button"
                  onClick={() => setHoldingPeriod(h.months)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                    holdingPeriod === h.months
                      ? 'bg-cyan-500 text-slate-950 font-black shadow-sm'
                      : 'bg-slate-950/60 border border-white/10 text-slate-400 hover:text-white'
                  }`}
                >
                  {h.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Output Metrics Card */}
        <div className="lg:col-span-5 p-6 rounded-2xl bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950/40 border border-emerald-500/30 space-y-4 shadow-xl">
          <div className="space-y-1">
            <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-wider">
              Projected Net Alpha
            </span>
            <div className="text-3xl sm:text-4xl font-black font-title text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">
              +₹{metrics.estimatedTotalGain.toLocaleString('en-IN')}
            </div>
            <div className="text-xs font-mono text-slate-400">
              Avg. ~₹{metrics.estimatedMonthlyProfit.toLocaleString('en-IN')} / month ({metrics.monthlyRoiRate}% ROI)
            </div>
          </div>

          <div className="space-y-2 pt-3 border-t border-white/10 text-xs font-mono">
            <div className="flex justify-between text-slate-300">
              <span>Slippage Saved vs Manual:</span>
              <span className="text-emerald-300 font-bold">+₹{metrics.slippageSaved.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between text-slate-300">
              <span>Latency Optimization:</span>
              <span className="text-cyan-300 font-bold">{metrics.latencyAdvantage}</span>
            </div>
            <div className="flex justify-between text-slate-300">
              <span>Order Execution Success:</span>
              <span className="text-emerald-400 font-bold">{metrics.slippageReduction}%</span>
            </div>
          </div>

          <button
            type="button"
            onClick={onSelectBundle}
            className="w-full py-3 px-4 rounded-xl text-xs font-mono font-bold uppercase tracking-wider bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 hover:brightness-110 transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/25 cursor-pointer"
          >
            <span>Deploy Orca6™ Bundle</span>
            <ArrowRight size={14} />
          </button>
        </div>

      </div>
    </div>
  );
}
