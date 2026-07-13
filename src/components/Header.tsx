import React, { useState, useEffect } from 'react';
import { Shield, Clock, ShieldCheck } from 'lucide-react';

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
    <header className="border-b border-zinc-900/80 bg-black/75 backdrop-blur-xl sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-4 flex items-center justify-between gap-4">
        
        {/* Logo and Tactical Status */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-survival-amber/10 border border-survival-amber/30 flex items-center justify-center text-survival-amber shadow-inner">
            <Shield className="w-4.5 h-4.5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[9px] font-mono font-bold text-survival-amber tracking-widest uppercase bg-survival-amber/10 px-1.5 py-0.5 rounded border border-survival-amber/20">
                PROJETO AUTÔNOMO
              </span>
              <span className="text-[9px] font-mono font-semibold text-zinc-500 tracking-wider">
                V2.14
              </span>
            </div>
            <h1 className="font-display font-extrabold text-xs sm:text-sm text-white tracking-wider uppercase leading-none mt-1">
              SOBREVIVÊNCIA APOCALÍPTICA
            </h1>
          </div>
        </div>

        {/* Live Operational Status */}
        <div className="flex items-center gap-3 text-[10px] font-mono">
          <div className="hidden md:flex items-center gap-1.5 text-zinc-500">
            <ShieldCheck className="w-3.5 h-3.5 text-survival-light" />
            <span className="tracking-wide">PROTOCOLO SEGURO ATIVO</span>
          </div>
          <span className="hidden md:inline text-zinc-800">|</span>
          <div className="flex items-center gap-2 bg-zinc-950 px-3.5 py-1.5 border border-zinc-900/80 rounded-lg text-zinc-400 font-bold shrink-0 shadow-sm">
            <Clock className="w-3.5 h-3.5 text-survival-amber animate-pulse" />
            <span className="tracking-widest">{utcTime || 'CARREGANDO UTC...'}</span>
          </div>
        </div>

      </div>
    </header>
  );
}
