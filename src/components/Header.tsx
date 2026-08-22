import React, { useState, useEffect } from 'react';
import { Shield, Clock } from 'lucide-react';

export default function Header() {
  const [utcTime, setUtcTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setUtcTime(now.toUTCString().replace('GMT', 'UTC'));
    };
    
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="sticky top-0 z-50">
      <header className="border-b border-zinc-900/80 bg-black/85 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-4 flex items-center justify-between gap-4">
        
        {/* Logo and Status */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-survival-amber/10 border border-survival-amber/30 flex items-center justify-center text-survival-amber shadow-inner">
            <Shield className="w-4.5 h-4.5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[9px] font-mono font-bold text-survival-amber tracking-widest uppercase bg-survival-amber/10 px-1.5 py-0.5 rounded border border-survival-amber/20">
                PLATAFORMA + MANUAL
              </span>
            </div>
            <h1 className="font-display font-extrabold text-xs sm:text-sm text-white tracking-wider uppercase leading-none mt-1">
              SOBREVIVÊNCIA APOCALÍPTICA
            </h1>
          </div>
        </div>

        {/* Live Operational Clock */}
        <div className="flex items-center gap-3 text-[10px] font-mono">
          <div className="flex items-center gap-2 bg-zinc-950 px-3.5 py-1.5 border border-zinc-900/80 rounded-lg text-zinc-400 font-bold shrink-0 shadow-sm">
            <Clock className="w-3.5 h-3.5 text-survival-amber animate-pulse" />
            <span className="tracking-widest">{utcTime || 'CARREGANDO UTC...'}</span>
          </div>
        </div>

      </div>
    </header>
    </div>
  );
}

