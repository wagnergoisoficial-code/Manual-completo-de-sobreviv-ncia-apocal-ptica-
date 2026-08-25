import React, { useState, useEffect } from 'react';
import { Shield } from 'lucide-react';
import CheckoutLink from './CheckoutLink';

const NAV_LINKS = [
  { label: 'Diagnóstico', href: '#diagnostico' },
  { label: 'Módulos', href: '#modulos' },
  { label: 'O que inclui', href: '#kit' },
  { label: 'FAQ', href: '#faq' },
];

export default function Header() {
  const [utcTime, setUtcTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hh = String(now.getUTCHours()).padStart(2, '0');
      const mm = String(now.getUTCMinutes()).padStart(2, '0');
      const ss = String(now.getUTCSeconds()).padStart(2, '0');
      setUtcTime(`${hh}:${mm}:${ss} UTC`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-void/85 backdrop-blur-md border-b border-hairline">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 h-16 flex items-center justify-between gap-6">

        {/* Marca */}
        <a href="#topo" className="flex items-center gap-3 min-w-0">
          <span className="w-7 h-7 border border-hairline flex items-center justify-center shrink-0">
            <Shield className="w-3.5 h-3.5 text-signal" strokeWidth={1.75} />
          </span>
          <span className="font-display font-bold uppercase tracking-tight text-[13px] sm:text-[15px] text-ink truncate">
            Sobrevivência Apocalíptica
          </span>
        </a>

        {/* Índice */}
        <nav className="hidden lg:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-mono text-tag uppercase text-ink-dim hover:text-ink hover:bg-surface-high px-3 py-2 transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-5">
          <span className="hidden xl:block font-mono text-tag text-outline tabular-nums">
            {utcTime}
          </span>
          <CheckoutLink
            from="CTA Topo"
            className="bg-signal hover:bg-signal-soft text-black font-mono text-tag font-bold uppercase px-4 sm:px-6 py-3 transition-colors shrink-0"
          >
            <span className="sm:hidden">Acessar</span>
            <span className="hidden sm:inline">Acessar plataforma</span>
          </CheckoutLink>
        </div>

      </div>
    </header>
  );
}
