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
import { ShieldAlert, Radio, ArrowRight, ShieldCheck, HeartPulse, Sparkles, BookOpen } from 'lucide-react';
import { KIWIFY_CHECKOUT_URL } from './data';
import { trackPixel } from './pixel';

export default function App() {
  return (
    <div className="min-h-screen bg-apoc-black text-zinc-100 flex flex-col font-sans relative overflow-x-hidden selection:bg-survival-light selection:text-black">
      
      {/* Decorative background grids & faint glows */}
      <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-b from-survival-green/5 via-transparent to-transparent pointer-events-none z-0 animate-pulse" />
      <div className="absolute top-[800px] right-0 w-96 h-96 bg-survival-amber/5 rounded-full blur-3xl pointer-events-none z-0" />
      <div className="absolute top-[2200px] left-0 w-96 h-96 bg-survival-green/5 rounded-full blur-3xl pointer-events-none z-0" />
      
      {/* Fixed Header */}
      <Header />

      {/* Main Container */}
      <main className="flex-1 relative z-10">
        
        {/* HERO SECTION - FIRST SESSION WITH VIDEO PLAYER */}
        <section className="py-16 px-4 sm:px-8 relative" id="hero-module">
          <div className="max-w-5xl mx-auto text-center space-y-10 animate-fade-in">

            {/* HERO COPY ABOVE THE VIDEO */}
            <div className="space-y-5 max-w-4xl mx-auto pt-4">
              <span className="text-[10px] font-mono text-white tracking-widest uppercase font-black bg-survival-red border border-red-400/50 px-3.5 py-1.5 rounded-full inline-block">
                ACESSO À PLATAFORMA COMPLETA + EBOOK
              </span>
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-display font-black text-white tracking-tight leading-tight uppercase pt-2">
                QUANDO O SISTEMA PARA, NÃO EXISTE TEMPO PARA APRENDER. <span className="text-survival-amber">EXISTE O QUE VOCÊ PREPAROU ANTES.</span>
              </h1>
              <p className="text-sm sm:text-lg text-zinc-400 max-w-3xl mx-auto font-sans font-medium leading-relaxed">
                Você não está comprando um e-book avulso. Você entra na plataforma completa de preparação — com checklists, ferramentas e novos módulos — e ainda leva o Manual Completo em PDF para consultar offline, quando faltar internet.
              </p>
              <p className="text-sm sm:text-base text-zinc-200 max-w-2xl mx-auto font-sans font-bold leading-relaxed">
                Água, alimentos, energia, saúde, segurança e evacuação: assista ao vídeo abaixo e veja como funciona o plano que você vai executar dentro da plataforma.
              </p>
            </div>

            {/* VSL VIDEO PLAYER BELOW THE HERO COPY */}
            <div className="pt-2">
              <VSLPlayer />
            </div>

            {/* IMMEDIATE CTA BUTTON BELOW VIDEO */}
            <div className="flex flex-col items-center pt-2">
              <a 
                href={KIWIFY_CHECKOUT_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackPixel('InitiateCheckout', { content_name: 'CTA Hero' })}
                className="w-full max-w-lg py-5 px-8 rounded-xl bg-survival-amber hover:bg-amber-500 text-white font-display font-black text-base sm:text-lg uppercase tracking-wider text-center block transition-all duration-300 transform hover:scale-[1.02] shadow-[0_12px_40px_rgba(245,158,11,0.35)] hover:shadow-[0_15px_50px_rgba(245,158,11,0.5)] cursor-pointer active:scale-[0.98] animate-pulse"
              >
                <span className="block">QUERO ACESSAR O MÉTODO 5P AGORA</span>
                <span className="text-[10px] tracking-widest font-mono block mt-1 opacity-90 font-bold text-white">ACESSO IMEDIATO À PLATAFORMA + MANUAL EM PDF + BÔNUS</span>
              </a>
            </div>

            {/* Post-VSL Trust Elements */}
            <div className="pt-4 max-w-2xl mx-auto space-y-6 flex flex-col items-center">
              <div className="flex flex-wrap items-center justify-center gap-6 text-[10px] text-zinc-500 font-mono font-bold">
                <span className="flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-survival-light" />
                  PLATAFORMA ONLINE + MANUAL EM PDF
                </span>
                <span className="hidden sm:inline text-zinc-800">•</span>
                <span className="flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-survival-light" />
                  CHECKLISTS, FERRAMENTAS E 3 BÔNUS
                </span>
                <span className="hidden sm:inline text-zinc-800">•</span>
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-survival-light" />
                  GARANTIA DE 7 DIAS
                </span>
              </div>
            </div>

          </div>
        </section>

        {/* INTERACTIVE COMPONENT 1: THE RESILIENCY MATRIX QUIZ */}
        <section className="py-20 sm:py-28 px-4 sm:px-8 border-y border-apoc-border bg-apoc-gray/40 relative">
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
              Sua infraestrutura doméstica suportaria o corte completo de água e sinal de rede? Faça o teste tático de 2 minutos para revelar suas maiores vulnerabilidades operacionais e ver exatamente qual módulo da plataforma resolve cada uma delas.
            </p>
          </div>

          <SurvivalQuiz />
        </section>

        {/* EBOOK CHAPTERS DETAILED INSIGHTS */}
        <section className="py-20 sm:py-28 px-4 sm:px-8 relative">
          <EbookPreview />
        </section>

        {/* PRODUCT FACTS BANNER - apenas atributos verificáveis do produto */}
        <section className="py-14 bg-apoc-gray border-y border-apoc-border text-center">
          <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="space-y-1">
              <span className="text-3xl sm:text-4xl font-mono font-black text-white block tracking-tighter">5</span>
              <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest font-bold block">Módulos na Plataforma</span>
            </div>
            <div className="space-y-1">
              <span className="text-3xl sm:text-4xl font-mono font-black text-survival-light block tracking-tighter">3</span>
              <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest font-bold block">Bônus Inclusos</span>
            </div>
            <div className="space-y-1">
              <span className="text-3xl sm:text-4xl font-mono font-black text-survival-amber block tracking-tighter">7 dias</span>
              <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest font-bold block">Garantia Incondicional</span>
            </div>
            <div className="space-y-1">
              <span className="text-3xl sm:text-4xl font-mono font-black text-white block tracking-tighter">24/7</span>
              <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest font-bold block">Acesso à Plataforma</span>
            </div>
          </div>
        </section>

        {/* PARA QUEM É — substitui a antiga seção de depoimentos (política de anúncios Meta) */}
        <section className="py-20 sm:py-28 px-4 sm:px-8 max-w-5xl mx-auto" id="para-quem-module">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
            <span className="text-[10px] font-mono text-survival-light tracking-widest uppercase font-bold bg-survival-light/10 border border-survival-light/20 px-3 py-1 rounded-full">
              PARA QUEM FOI ESCRITO
            </span>
            <h2 className="text-2xl sm:text-4xl font-display font-black text-white uppercase mt-1 tracking-wider pt-2">
              ESTE MANUAL É PARA QUEM PREFERE ESTAR PRONTO
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed max-w-md mx-auto font-sans font-medium">
              Nada de teoria ou fanatismo de bunker. É um plano de contingência doméstico que você executa passo a passo dentro da plataforma — e leva no PDF para consultar mesmo sem internet.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-apoc-gray border border-apoc-border rounded-2xl p-6 sm:p-7 space-y-4 shadow-lg backdrop-blur-xl">
              <div className="w-11 h-11 rounded-xl bg-survival-amber/10 border border-survival-amber/25 flex items-center justify-center text-survival-amber">
                <HeartPulse className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-display font-extrabold text-white uppercase tracking-wide">
                Quem tem uma família para proteger
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-sans font-medium">
                Na plataforma você monta, item por item, a reserva de água, de comida e o kit de primeiros socorros da sua casa — com checklist para marcar o que já tem e o que ainda falta.
              </p>
            </div>

            <div className="bg-apoc-gray border border-apoc-border rounded-2xl p-6 sm:p-7 space-y-4 shadow-lg backdrop-blur-xl">
              <div className="w-11 h-11 rounded-xl bg-survival-light/10 border border-survival-light/25 flex items-center justify-center text-survival-light">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-display font-extrabold text-white uppercase tracking-wide">
                Quem mora em cidade grande
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-sans font-medium">
                Apagão, falta d'água, enchente ou greve de transporte param um centro urbano em horas. O protocolo das primeiras 72 horas e o plano de evacuação a pé ficam prontos dentro da sua conta.
              </p>
            </div>

            <div className="bg-apoc-gray border border-apoc-border rounded-2xl p-6 sm:p-7 space-y-4 shadow-lg backdrop-blur-xl">
              <div className="w-11 h-11 rounded-xl bg-survival-green/10 border border-survival-green/25 flex items-center justify-center text-survival-light">
                <Radio className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-display font-extrabold text-white uppercase tracking-wide">
                Quem começa do zero
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-sans font-medium">
                Cada módulo é passo a passo, com listas de compras, diagramas e checklists. Você não precisa de experiência prévia, terreno no interior nem equipamento caro — é só seguir a ordem que a plataforma indica.
              </p>
            </div>
          </div>

          <div className="mt-10 flex justify-center">
            <a
              href={KIWIFY_CHECKOUT_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackPixel('InitiateCheckout', { content_name: 'CTA Para Quem' })}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-survival-amber hover:bg-amber-500 text-white font-display font-black text-xs uppercase tracking-wider transition-all duration-300 shadow-lg shadow-survival-amber/10 hover:scale-[1.01] cursor-pointer"
            >
              QUERO ACESSO À PLATAFORMA AGORA
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </section>

        {/* CORE CHECKOUT & BONUSES SECTION */}
        <section className="py-20 sm:py-28 px-4 sm:px-8 bg-apoc-gray/10 border-t border-apoc-border relative">
          <CheckoutSection />
        </section>

        {/* FAQ BLOCK */}
        <section className="py-20 sm:py-28 px-4 sm:px-8">
          <FAQ />
        </section>

        {/* HIGHEST SCARCITY PRE-FOOTER PITCH */}
        <section className="py-14 bg-survival-red/5 border-y border-apoc-border text-center px-4 sm:px-8">
          <div className="max-w-3xl mx-auto space-y-4">
            <h3 className="text-xl sm:text-3xl font-display font-black text-survival-red uppercase tracking-wide">
              VOCÊ VAI ESPERAR A REDE CAIR PARA APRENDER?
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 max-w-xl mx-auto leading-relaxed font-sans font-medium">
              Mentes estratégicas agem antes da multidão. Quando a energia sumir e as redes caírem, ninguém entra em plataforma nenhuma nem baixa PDF nenhum. Garanta agora o acesso vitalício e deixe o manual salvo no seu celular enquanto a conectividade ainda existe.
            </p>
            <div className="pt-4">
              <a 
                href={KIWIFY_CHECKOUT_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackPixel('InitiateCheckout', { content_name: 'CTA Pré-rodapé' })}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-survival-amber hover:bg-amber-500 text-white font-display font-black text-xs uppercase tracking-wider transition-all duration-300 shadow-lg shadow-survival-amber/10 hover:scale-[1.01] cursor-pointer"
              >
                QUERO A PLATAFORMA + O MANUAL AGORA
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="border-t border-apoc-border bg-apoc-black py-8 text-center text-[10px] font-mono text-zinc-600 px-4">
        <div className="max-w-6xl mx-auto space-y-3">
          <p className="max-w-3xl mx-auto leading-relaxed font-medium text-zinc-500">
            AVISO DE RESPONSABILIDADE: Os métodos descritos neste compêndio são de teor estritamente pedagógico e informativo de resiliência civil.
          </p>
          <p className="text-zinc-600 font-bold">
            © {new Date().getFullYear()} MANUAL COMPLETO DE SOBREVIVÊNCIA APOCALÍPTICA. TODOS OS DIREITOS RESERVADOS.
          </p>
        </div>
      </footer>

    </div>
  );
}
