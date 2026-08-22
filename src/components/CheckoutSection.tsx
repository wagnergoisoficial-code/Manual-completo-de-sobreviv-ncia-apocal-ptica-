import React, { useState, useEffect } from 'react';
import { BONUSES, KIWIFY_CHECKOUT_URL } from '../data';
import { trackPixel } from '../pixel';
import { Shield, Sparkles, Clock, Check, ArrowRight, ShieldCheck, Star, Users, Flame } from 'lucide-react';
import manualCover from '../assets/images/manual_cover_1783965348887.jpg';

export default function CheckoutSection() {
  // Scarcity state
  const [timeLeft, setTimeLeft] = useState<number>(899); // 14:59 min
  const [spotsLeft, setSpotsLeft] = useState<number>(14);

  // Timer loop
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          return 899; // loop back
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Spots decrease loop
  useEffect(() => {
    const interval = setInterval(() => {
      setSpotsLeft((prev) => {
        if (prev <= 3) return 3;
        return prev - Math.floor(Math.random() * 2);
      });
    }, 45000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="max-w-6xl mx-auto" id="pricing-module">
      {/* 2-Column layout: Left bonuses, Right pricing / Kiwify Checkout CTA */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Book Cover Showcase & Bonuses */}
        <div className="lg:col-span-6 space-y-6">
          <div>
            <span className="text-[10px] font-mono text-survival-amber tracking-widest uppercase font-bold bg-survival-amber/10 border border-survival-amber/20 px-3 py-1 rounded-full">
              RECOMPENSAS EXCLUSIVAS // ACESSO IMEDIATO
            </span>
            <h3 className="text-xl sm:text-3xl font-display font-black text-white uppercase mt-4">
              Kit Tático de Suporte de Campo
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 mt-2 font-sans font-medium">
              Para garantir sua autonomia e segurança em qualquer escala de desastre, incluímos sem custo adicional estes protocolos de apoio estratégico:
            </p>
          </div>

          {/* Ebook Cover Showcase */}
          <div className="bg-apoc-gray/40 border border-apoc-border rounded-2xl p-6 flex flex-col sm:flex-row gap-6 items-center shadow-[0_20px_50px_rgba(0,0,0,0.8)] relative overflow-hidden group backdrop-blur-xl">
            {/* Ambient amber glow behind book */}
            <div className="absolute -left-10 -top-10 w-32 h-32 bg-survival-amber/10 rounded-full blur-2xl pointer-events-none" />
            
            {/* Book Cover Image container with 3D/shadow effect */}
            <div className="w-36 sm:w-40 shrink-0 aspect-[2/3] relative rounded-xl overflow-hidden border border-apoc-border shadow-[0_0_30px_rgba(217,119,6,0.1)] group-hover:shadow-[0_0_45px_rgba(217,119,6,0.25)] transition-all duration-500 group-hover:scale-[1.02] transform">
              <img 
                src={manualCover} 
                alt="Manual Completo de Sobrevivência Apocalíptica" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            
            {/* Book specifications and title */}
            <div className="flex-1 space-y-3.5 text-center sm:text-left">
              <div>
                <span className="text-[9px] font-mono text-survival-amber font-bold tracking-widest uppercase block">
                  OBRA OFICIAL DE WAGNER GOIS
                </span>
                <h4 className="text-lg font-display font-extrabold text-white uppercase leading-tight mt-1">
                  Manual Completo de Sobrevivência Apocalíptica
                </h4>
                <p className="text-xs text-zinc-400 mt-1.5 leading-relaxed font-sans font-medium">
                  O compêndio definitivo contendo estratégias reais para proteger sua família quando tudo falhar.
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-3 pt-3 text-[10px] font-mono border-t border-apoc-border font-semibold">
                <div>
                  <span className="text-zinc-500 block text-[9px] tracking-wider">AUTOR:</span>
                  <span className="text-zinc-200">WAGNER GOIS</span>
                </div>
                <div>
                  <span className="text-zinc-500 block text-[9px] tracking-wider">EDIÇÃO:</span>
                  <span className="text-survival-light">2ª REVISADA</span>
                </div>
                <div>
                  <span className="text-zinc-500 block text-[9px] tracking-wider">FORMATO:</span>
                  <span className="text-zinc-200">PDF DIGITAL</span>
                </div>
                <div>
                  <span className="text-zinc-500 block text-[9px] tracking-wider">ENVIO:</span>
                  <span className="text-survival-amber">IMEDIATO</span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {BONUSES.map((bonus) => (
              <div 
                key={bonus.id} 
                className="bg-apoc-gray/15 border border-apoc-border rounded-xl p-5.5 relative overflow-hidden group hover:border-zinc-800 transition-all duration-300 backdrop-blur-sm"
              >
                {/* Micro visual accent lines */}
                <div className="absolute top-0 left-0 w-1.5 h-full bg-survival-amber" />
                
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <span className="text-[9px] font-mono font-bold bg-survival-amber/10 text-survival-amber border border-survival-amber/20 px-2 py-0.5 rounded uppercase tracking-wider">
                      {bonus.badge}
                    </span>
                    <h4 className="text-base font-display font-bold text-white uppercase mt-2">
                      {bonus.title}
                    </h4>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-xs font-mono font-bold text-survival-light block">
                      INCLUÍDO HOJE
                    </span>
                  </div>
                </div>

                <p className="text-xs text-zinc-400 mt-2 leading-relaxed font-sans font-medium">
                  {bonus.description}
                </p>
              </div>
            ))}
          </div>

          {/* Secure Trust Callout */}
          <div className="p-4.5 rounded-xl bg-zinc-950/30 border border-zinc-900/80 flex items-start gap-3.5">
            <Shield className="w-5 h-5 text-survival-light mt-0.5 shrink-0" />
            <div>
              <h5 className="text-xs font-bold text-zinc-200 uppercase">ACESSO IMEDIATO E SEGURO</h5>
              <p className="text-[11px] text-zinc-500 leading-normal mt-1 font-sans font-medium">
                Você receberá o link para download imediato do Manual de Sobrevivência e de todos os bônus diretamente em seu e-mail cadastrado, de forma rápida, segura e livre de taxas adicionais.
              </p>
            </div>
          </div>
        </div>

        {/* Right Side: Pricing / Kiwify Redirect Callout */}
        <div className="lg:col-span-6 bg-zinc-950/40 border border-zinc-900 rounded-2xl overflow-hidden shadow-[0_24px_60px_rgba(0,0,0,0.85)] relative backdrop-blur-xl">
          
          {/* Header Banner - Countdown timer */}
          <div className="bg-survival-green/10 border-b border-zinc-900 px-5 py-4 flex justify-between items-center text-xs font-mono">
            <div className="flex items-center gap-2 text-survival-light font-bold">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-survival-light opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-survival-light"></span>
              </span>
              <span className="tracking-wide">OFERTA EXPIRA EM:</span>
            </div>
            <div className="flex items-center gap-1.5 text-white font-bold bg-zinc-950 px-3 py-1.5 border border-zinc-900 rounded-lg shadow-sm">
              <Clock className="w-3.5 h-3.5 text-survival-amber" />
              <span>{formatTime(timeLeft)}</span>
            </div>
          </div>

          <div className="p-6 sm:p-10 space-y-8">
            {/* Access Callout */}
            <div className="text-center pb-6 border-b border-zinc-900/80 space-y-2">
              <span className="text-[10px] font-mono text-survival-amber uppercase tracking-widest font-bold block">
                ACESSO IMEDIATO AO CONTEÚDO
              </span>
              <h3 className="text-xl sm:text-2xl font-display font-black text-white uppercase">
                Manual Completo + Todos os Bônus Exclusivos
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400 font-sans font-medium">
                Garanta o download em PDF e acesso vitalício ao material de autonomia tática.
              </p>
            </div>

            {/* Value Stack checklist */}
            <div className="space-y-4">
              <h4 className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-wider">O QUE VOCÊ VAI RECEBER:</h4>
              <div className="space-y-3 font-sans text-xs sm:text-sm text-zinc-300 font-semibold">
                <div className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-survival-light shrink-0 mt-0.5" />
                  <span>Manual Completo de Sobrevivência Apocalíptica <span className="text-zinc-500">(Digital PDF)</span></span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-survival-light shrink-0 mt-0.5" />
                  <span>Bônus 1: O Guia Secreto de Telecomunicações Resilientes <span className="text-survival-amber">(Grátis)</span></span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-survival-light shrink-0 mt-0.5" />
                  <span>Bônus 2: Checklist do Protocolo de Evacuação de 72 Horas <span className="text-survival-amber">(Grátis)</span></span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-survival-light shrink-0 mt-0.5" />
                  <span>Bônus 3: Farmácia Natural e Antibióticos de Emergência <span className="text-survival-amber">(Grátis)</span></span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-survival-light shrink-0 mt-0.5" />
                  <span>Acesso Vitalício e Atualizações Futuras Sem Custo</span>
                </div>
              </div>
            </div>

            {/* Giant Call-to-action redirect button to Kiwify */}
            <div className="space-y-4 pt-2">
              <a
                href={KIWIFY_CHECKOUT_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackPixel('InitiateCheckout', { content_name: 'CTA Checkout' })}
                className="w-full py-4.5 rounded-xl bg-survival-amber hover:bg-amber-500 text-white font-display font-black text-center text-sm sm:text-base uppercase tracking-wider transition-all duration-300 shadow-[0_8px_30px_rgba(245,158,11,0.3)] hover:shadow-[0_12px_40px_rgba(245,158,11,0.5)] flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.01] active:scale-[0.99] animate-bounce-slow"
              >
                QUERO MEU ACESSO IMEDIATO + BÔNUS
                <ArrowRight className="w-5 h-5" />
              </a>

              <div className="flex items-center justify-center gap-2 text-center text-[10px] font-mono text-zinc-500 font-bold">
                <Flame className="w-4 h-4 text-survival-amber animate-pulse" />
                <span>DOWNLOAD LIBERADO NA HORA, ASSIM QUE O PAGAMENTO FOR CONFIRMADO</span>
              </div>
            </div>

            {/* Guaranteed Badges Info */}
            <div className="border-t border-zinc-900/80 pt-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-start gap-3 p-3 rounded-lg bg-zinc-950/60 border border-zinc-900">
                  <ShieldCheck className="w-5 h-5 text-survival-light shrink-0" />
                  <div>
                    <h5 className="text-[10px] font-mono font-bold text-white uppercase">GARANTIA INCONDICIONAL</h5>
                    <p className="text-[10px] text-zinc-500 font-sans font-medium mt-0.5 leading-normal">
                      7 dias de garantia total. Se achar que não serve para você, peça seu reembolso de 100%.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-lg bg-zinc-950/60 border border-zinc-900">
                  <Users className="w-5 h-5 text-survival-amber shrink-0" />
                  <div>
                    <h5 className="text-[10px] font-mono font-bold text-white uppercase">SISTEMA INTEGRADO</h5>
                    <p className="text-[10px] text-zinc-500 font-sans font-medium mt-0.5 leading-normal">
                      Segurança de compra processada de ponta a ponta pela plataforma Kiwify.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 justify-center text-[9px] text-zinc-600 font-bold font-mono">
                <span>🔒 CHECKOUT 100% SEGURO COM CRIPTOGRAFIA SSL SSL-256</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
