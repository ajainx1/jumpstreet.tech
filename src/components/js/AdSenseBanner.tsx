'use client';

import React, { useEffect, useRef } from 'react';

interface AdSenseBannerProps {
  refreshKey?: string | number;
  className?: string;
  adSlot?: string;
  adFormat?: string;
}

export default function AdSenseBanner({ 
  className = "",
  adSlot = "1234567890",
  adFormat = "auto"
}: AdSenseBannerProps) {
  const adRef = useRef<HTMLModElement>(null);
  const pushedRef = useRef(false);

  useEffect(() => {
    if (pushedRef.current) return;

    try {
      if (typeof window !== 'undefined') {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const adsbygoogle = (window as any).adsbygoogle || [];
        adsbygoogle.push({});
        pushedRef.current = true;
      }
    } catch (err) {
      console.debug("AdSense load notice:", err);
    }
  }, []);

  return (
    <div className={`w-full my-6 font-sans ${className}`}>
      <div className="relative rounded-2xl border border-white/10 p-4 overflow-hidden bg-slate-900/80 backdrop-blur-2xl text-white shadow-xl">
        
        {/* Strictly Compliant Ad Label */}
        <div className="flex items-center justify-between text-[10px] font-mono font-bold uppercase tracking-widest text-slate-400 mb-3 pb-1 border-b border-white/10">
          <span>ADVERTISEMENT</span>
          <span className="text-[9px] text-slate-400 font-mono">JumpStreet Tech Partner Network</span>
        </div>

        {/* AdSense Unit */}
        <div className="w-full flex justify-center items-center min-h-[90px] overflow-hidden rounded-xl bg-black/20">
          <ins
            ref={adRef}
            className="adsbygoogle w-full"
            style={{ display: 'block', textAlign: 'center' }}
            data-ad-client="ca-pub-6072468142870937"
            data-ad-slot={adSlot}
            data-ad-format={adFormat}
            data-full-width-responsive="true"
          />
        </div>

        <div className="mt-2 text-center text-[9px] font-mono text-slate-400">
          Automated trading infrastructure & sub-millisecond cloud VPS nodes.
        </div>

      </div>
    </div>
  );
}
