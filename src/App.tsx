/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import Header from './components/Header';
import VSLPlayer from './components/VSLPlayer';
import SurvivalQuiz from './components/SurvivalQuiz';
import EbookPreview from './components/EbookPreview';
import CheckoutSection from './components/CheckoutSection';
import FAQ from './components/FAQ';
import { ShieldAlert, Radio, Activity, Star, Users, ArrowRight, ShieldCheck, HeartPulse, Sparkles, BookOpen } from 'lucide-react';
import { TESTIMONIALS } from './data';

export default function App() {
  return (
    <div className="min-h-screen bg-black text-zinc-100 flex flex-col font-sans relative overflow-x-hidden selection:bg-survival-light selection:text-black">
      
      {/* Decorative background grids & faint glows */}
      <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-b from-survival-green/5 via-transparent to-transparent pointer-events-none z-0 animate-pulse" />
      <div className="absolute top-[800px] right-0 w-96 h-96 bg-survival-amber/5 rounded-full blur-3xl pointer-events-none z-0" />
      <div className="absolute top-[2200px] left-0 w-96 h-96 bg-survival-green/5 rounded-full blur-3xl pointer-events-none z-0" />
      
      {/* Fixed Header */}
      <Header />

      {/* Main Container */}
      <main className="flex-1 relative z-10">
        
        {/* HERO SECTION - FIRST SESSION WITH VIDEO PLAYER */}
        <section className="py-12 px-4 sm:px-8 relative" id="hero-module">
          <div className="max-w-5xl mx-auto text-center space-y-8">
            
            {/* VSL VIDEO PLAYER - IN FIRST SESSION */}
            <div className="pt-2">
              <VSLPlayer />
            </div>

            {/* PERSUASIVE HEADLINE BELOW THE VIDEO */}
            <div className="pt-10 space-y-5 max-w-4xl mx-auto">
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-display font-black text-white tracking-tight leading-tight uppercase">
                O colapso sistêmico não é uma questão de <span className="text-survival-amber">se</span>, mas de <span className="text-survival-light">quando</span>. Aqueles que continuarem cegos serão os primeiros a sucumbir.
              </h1>

              {/* Sub-headline / Copy targeting revolutionary thinkers */}
              <p className="text-sm sm:text-lg text-zinc-400 max-w-3xl mx-auto font-sans font-medium leading-relaxed">
                Para mentes estratégicas contemporâneas que recusam a ingenuidade civil: o <span className="text-white font-bold">Manual Completo de Sobrevivência Apocalíptica</span> é a única doutrina prática de engenharia improvisada, rádio off-grid e medicina de campo feita sob medida para a sua autonomia absoluta.
              </p>
            </div>

            {/* Post-VSL Trust Elements & Main Highly Prominent Call-to-Action */}
            <div className="pt-6 max-w-2xl mx-auto space-y-6 flex flex-col items-center">
              <a 
                href="#pricing-module"
                className="w-full max-w-md py-4.5 px-8 rounded-xl bg-survival-light hover:bg-green-500 text-black font-display font-black text-sm uppercase tracking-wider text-center block transition-all duration-300 transform hover:scale-[1.01] shadow-[0_10px_35px_rgba(34,197,94,0.25)] cursor-pointer"
              >
                QUERO O MANUAL COMPLETO COM ACESSO IMEDIATO
              </a>

              <div className="flex flex-wrap items-center justify-center gap-6 text-[10px] text-zinc-500 font-mono font-bold">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-survival-light" />
                  ACESSO INCONDICIONAL
                </span>
                <span className="hidden sm:inline text-zinc-800">•</span>
                <span className="flex items-center gap-1.5">
                  <Star className="w-4 h-4 text-survival-light fill-survival-light" />
                  AVALIAÇÃO DE CRÍTICOS: 4.9/5
                </span>
                <span className="hidden sm:inline text-zinc-800">•</span>
                <span className="flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-survival-light" />
                  9,731 LEITORES ATIVOS
                </span>
              </div>
            </div>

          </div>
        </section>

        {/* INTERACTIVE COMPONENT 1: THE RESILIENCY MATRIX QUIZ */}
        <section className="py-20 sm:py-28 px-4 sm:px-8 border-y border-zinc-900 bg-zinc-950/20 relative">
          {/* Subtle warning stripe design element on margins */}
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-survival-amber/0 via-survival-amber/35 to-survival-amber/0" />
          
          <div className="max-w-4xl mx-auto text-center mb-12 space-y-2">
            <span className="text-[10px] font-mono text-survival-amber tracking-widest uppercase font-bold bg-survival-amber/10 border border-survival-amber/20 px-3 py-1 rounded-full">
              DIAGNÓSTICO SITUACIONAL DE LINHA DE FRENTE
            </span>
            <h2 className="text-2xl sm:text-4xl font-display font-black text-white uppercase tracking-tight pt-3">
              DESCUBRA SE VOCÊ SOBREVIVERIA A UM BLACKOUT DE 7 DIAS
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 mt-2 max-w-2xl mx-auto leading-relaxed font-sans font-medium">
              Sua infraestrutura doméstica suportaria o corte completo de água e sinal de rede? Faça o teste tático de 2 minutos para revelar suas maiores vulnerabilidades operacionais e aprenda imediatamente como sanar cada uma delas antes que a rede colapse.
            </p>
          </div>

          <SurvivalQuiz />
        </section>

        {/* EBOOK CHAPTERS DETAILED INSIGHTS */}
        <section className="py-20 sm:py-28 px-4 sm:px-8 relative">
          <EbookPreview />
        </section>

        {/* STATS BANNER - SOCIAL PROOF */}
        <section className="py-14 bg-zinc-950/80 border-y border-zinc-900 text-center">
          <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="space-y-1">
              <span className="text-3xl sm:text-4xl font-mono font-black text-white block tracking-tighter">9.7k+</span>
              <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest font-bold block">Cópias Baixadas</span>
            </div>
            <div className="space-y-1">
              <span className="text-3xl sm:text-4xl font-mono font-black text-survival-light block tracking-tighter">100%</span>
              <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest font-bold block">Autonomia Digital</span>
            </div>
            <div className="space-y-1">
              <span className="text-3xl sm:text-4xl font-mono font-black text-survival-amber block tracking-tighter">0%</span>
              <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest font-bold block">Rastreamento Fiscal</span>
            </div>
            <div className="space-y-1">
              <span className="text-3xl sm:text-4xl font-mono font-black text-white block tracking-tighter">24/7</span>
              <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest font-bold block">Protocolo de Envio</span>
            </div>
          </div>
        </section>

        {/* ELITE TESTIMONIALS SECTION */}
        <section className="py-20 sm:py-28 px-4 sm:px-8 max-w-5xl mx-auto" id="testimonials-module">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
            <span className="text-[10px] font-mono text-survival-light tracking-widest uppercase font-bold bg-survival-light/10 border border-survival-light/20 px-3 py-1 rounded-full">
              RESPALDO CRÍTICO
            </span>
            <h2 className="text-2xl sm:text-4xl font-display font-black text-white uppercase mt-1 tracking-wider pt-2">
              CHANCELADO POR METRICISTAS DE RISCO
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed max-w-md mx-auto font-sans font-medium">
              Leia o testemunho de analistas de segurança, ex-militares e investidores que avaliam o manual sob os preceitos de contingência contemporânea.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((test) => (
              <div 
                key={test.id} 
                className="bg-zinc-950/40 border border-zinc-900 rounded-2xl p-6 sm:p-7 flex flex-col justify-between shadow-lg relative group hover:border-zinc-800 transition-all duration-350 backdrop-blur-xl"
              >
                <div className="space-y-5">
                  <div className="flex gap-1 text-survival-amber">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-survival-amber text-survival-amber" />
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed italic font-sans font-medium">
                    "{test.quote}"
                  </p>
                </div>

                <div className="flex items-center gap-3.5 pt-5 mt-6 border-t border-zinc-900/60">
                  <img 
                    src={test.avatar} 
                    alt={test.name} 
                    referrerPolicy="no-referrer"
                    className="w-10 h-10 rounded-full object-cover shrink-0 border border-zinc-800"
                  />
                  <div className="min-w-0">
                    <h4 className="text-xs font-extrabold text-white truncate">{test.name}</h4>
                    <span className="text-[9px] text-zinc-500 font-mono uppercase tracking-wider block mt-0.5">{test.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CORE CHECKOUT & BONUSES SECTION */}
        <section className="py-20 sm:py-28 px-4 sm:px-8 bg-zinc-950/10 border-t border-zinc-900 relative">
          <CheckoutSection />
        </section>

        {/* FAQ BLOCK */}
        <section className="py-20 sm:py-28 px-4 sm:px-8">
          <FAQ />
        </section>

        {/* HIGHEST SCARCITY PRE-FOOTER PITCH */}
        <section className="py-14 bg-survival-red/5 border-y border-zinc-900/80 text-center px-4 sm:px-8">
          <div className="max-w-3xl mx-auto space-y-4">
            <h3 className="text-xl sm:text-3xl font-display font-black text-survival-red uppercase tracking-wide">
              VOCÊ VAI ESPERAR A REDE CAIR PARA APRENDER?
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 max-w-xl mx-auto leading-relaxed font-sans font-medium">
              Mentes estratégicas agem antes da multidão. Quando a energia sumir e os sistemas se desintegrarem, seu acesso ao manual estará bloqueado pela barreira física. Adquira sua cópia digital vitalícia enquanto a conectividade ainda existe.
            </p>
            <div className="pt-4">
              <a 
                href="#pricing-module"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-survival-red hover:bg-red-500 text-white font-display font-black text-xs uppercase tracking-wider transition-all duration-300 shadow-lg shadow-survival-red/10 hover:scale-[1.01] cursor-pointer"
              >
                ADQUIRIR O MANUAL COMPLETO AGORA
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </section>

      </main>

      {/* DISCREET SYSTEM FOOTER */}
      <footer className="border-t border-zinc-900 bg-black py-10 text-center text-[10px] font-mono text-zinc-600 px-4">
        <div className="max-w-6xl mx-auto space-y-4">
          <p className="uppercase tracking-widest font-bold text-zinc-500">
            SOCIETAL DECRYPT SECURITY PROTOCOL // COGNITIVE FREEDOM DIVISION
          </p>
          <p className="max-w-3xl mx-auto leading-relaxed font-semibold">
            AVISO DE RESPONSABILIDADE: Os métodos descritos neste compêndio são de teor estritamente pedagógico e informativo de resiliência civil. O leitor assume integral responsabilidade civil e jurídica pela aplicação das táticas off-grid e práticas laboratoriais descritas.
          </p>
          <p className="text-zinc-700 font-bold">
            © {new Date().getFullYear()} MANUAL COMPLETO DE SOBREVIVÊNCIA APOCALÍPTICA. TODOS OS DIREITOS RESERVADOS.
          </p>
        </div>
      </footer>

    </div>
  );
}

