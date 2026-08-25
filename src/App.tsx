/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import Header from './components/Header';
import VSLPlayer from './components/VSLPlayer';
import SurvivalQuiz from './components/SurvivalQuiz';
import ModulesSection from './components/ModulesSection';
import KitSection from './components/KitSection';
import OfferSection from './components/OfferSection';
import FAQ from './components/FAQ';
import CheckoutLink from './components/CheckoutLink';
import { trackPixel } from './pixel';
import { AlertTriangle, ArrowRight } from 'lucide-react';

const DATA_STRIP = [
  { value: '05', label: 'Módulos na plataforma' },
  { value: '03', label: 'Bônus inclusos' },
  { value: '07', label: 'Dias de garantia', accent: true },
  { value: '24/7', label: 'Acesso à plataforma' },
];

const AUDIENCE = [
  {
    index: '01',
    title: 'Quem tem uma família para proteger',
    text: 'Na plataforma você monta, item por item, a reserva de água, de comida e o kit de primeiros socorros da sua casa — com checklist para marcar o que já tem e o que ainda falta.',
  },
  {
    index: '02',
    title: 'Quem mora em cidade grande',
    text: 'Apagão, falta d’água, enchente ou greve de transporte param um centro urbano em horas. O protocolo das primeiras 72 horas e o plano de evacuação a pé ficam prontos dentro da sua conta.',
  },
  {
    index: '03',
    title: 'Quem começa do zero',
    text: 'Cada módulo é passo a passo, com listas de compras, diagramas e checklists. Você não precisa de experiência prévia, terreno no interior nem equipamento caro — é só seguir a ordem que a plataforma indica.',
  },
];

export default function App() {
  // Quem abre a página viu a oferta. Este é o evento padrão que ESTA página pode
  // reivindicar de verdade — o InitiateCheckout pertence à tela de pagamento da Kiwify.
  useEffect(() => {
    trackPixel('ViewContent', { content_name: 'Página de vendas — Método 5P' });
  }, []);

  return (
    <div className="min-h-screen bg-void text-ink flex flex-col overflow-x-hidden grain" id="topo">

      <Header />

      {/* FAIXA DE ENTRADA — a primeira linha que a pessoa lê ao abrir a página */}
      <div className="bg-ink text-void border-b border-hairline">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 py-3.5 flex items-center justify-center gap-3">
          <AlertTriangle className="w-4 h-4 shrink-0" strokeWidth={2.5} />
          <p className="font-mono text-tag font-bold uppercase text-center">
            Isto não é um e-book — é a plataforma completa do Método 5P. O manual em PDF vem de brinde.
          </p>
        </div>
      </div>

      <main className="flex-1">

        {/* HERO */}
        <section className="px-4 sm:px-8 py-20 md:py-32">
          <div className="max-w-[1440px] mx-auto flex flex-col items-center text-center">

            <span className="inline-flex items-center gap-2.5 px-3 py-1.5 border border-hairline mb-10">
              <span className="w-1.5 h-1.5 bg-alert animate-pulse" />
              <span className="font-mono text-tag uppercase text-alert">Método 5P · Acesso imediato</span>
            </span>

            <h1 className="font-display text-display uppercase max-w-5xl text-ink">
              Quando o sistema para, não existe tempo para aprender.{' '}
              <br className="hidden md:block" />
              <span className="text-signal">Existe o que você preparou antes.</span>
            </h1>

            {/* O reenquadramento: o produto é a plataforma, não o PDF */}
            <div className="max-w-3xl mt-10 space-y-5">
              <p className="text-body text-ink-dim">
                O que quase todo mundo vende é um PDF de duzentas páginas. Você baixa, lê metade,
                fecha — e continua exatamente tão despreparado quanto estava antes de comprar.
              </p>
              <p className="text-body text-ink">
                Aqui é outra coisa. Você entra no <strong className="font-semibold text-signal">Método 5P</strong>:
                a plataforma completa onde a preparação da sua casa vira um plano com passos
                marcados, um a um — água, alimento, energia, saúde e segurança. Você não lê sobre
                estar preparado. Você fica preparado.
              </p>
            </div>

            {/* O brinde */}
            <div className="w-full max-w-3xl mt-10 border-y border-hairline py-5 flex flex-col sm:flex-row items-start sm:items-center gap-4 text-left">
              <span className="font-mono text-tag font-bold uppercase text-signal border border-signal px-2.5 py-1.5 shrink-0">
                Brinde incluso
              </span>
              <p className="text-bodysm text-ink-dim">
                O <span className="text-ink font-semibold">Manual Completo em PDF</span> vem junto,
                sem custo nenhum — para o dia em que não houver internet, energia, nem plataforma
                alguma para abrir.
              </p>
            </div>

            <div className="w-full mt-14">
              <VSLPlayer />
            </div>

            <CheckoutLink
              from="CTA Hero"
              className="w-full md:w-auto mt-12 bg-signal hover:bg-signal-soft text-black font-display font-extrabold uppercase tracking-wide text-base md:text-lg px-10 py-5 transition-colors"
            >
              Quero acessar o Método 5P agora
            </CheckoutLink>

            <p className="font-mono text-tag uppercase text-outline mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2">
              <span>Plataforma Método 5P</span>
              <span className="hidden sm:inline text-outline-dim">/</span>
              <span>Manual em PDF de brinde</span>
              <span className="hidden sm:inline text-outline-dim">/</span>
              <span>Garantia de 7 dias</span>
            </p>

          </div>
        </section>

        {/* DIAGNÓSTICO */}
        <section id="diagnostico" className="px-4 sm:px-8 py-24 md:py-36 bg-surface-lowest border-y border-hairline">
          <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 items-start">

            <div className="md:col-span-5 md:sticky md:top-28">
              <span className="inline-block font-mono text-tag uppercase text-outline border border-hairline px-3 py-1.5 mb-8">
                Ferramenta tática
              </span>
              <h2 className="font-display text-headline uppercase text-ink">
                Descubra se você sobreviveria a um blackout de 7 dias
              </h2>
              <p className="text-body text-ink-dim mt-6">
                Sua infraestrutura doméstica suportaria o corte completo de água e sinal de rede?
                Faça o teste de 2 minutos para revelar suas maiores vulnerabilidades e ver
                exatamente qual módulo da plataforma resolve cada uma delas.
              </p>
            </div>

            <div className="md:col-span-7">
              <SurvivalQuiz />
            </div>

          </div>
        </section>

        {/* MÓDULOS */}
        <section id="modulos" className="px-4 sm:px-8 py-24 md:py-36">
          <ModulesSection />
        </section>

        {/* FAIXA DE DADOS */}
        <section className="border-y border-hairline bg-surface-lowest">
          <div className="max-w-[1440px] mx-auto grid grid-cols-2 md:grid-cols-4">
            {DATA_STRIP.map((item, i) => (
              <div
                key={item.label}
                className={`px-6 sm:px-8 py-10 md:py-14 border-hairline ${i % 2 === 0 ? 'border-r' : ''} ${i < 2 ? 'border-b md:border-b-0' : ''} ${i === 2 ? 'md:border-r' : ''}`}
              >
                <span className={`font-display font-extrabold text-[40px] md:text-[56px] leading-none tracking-tighter block ${item.accent ? 'text-signal' : 'text-ink'}`}>
                  {item.value}
                </span>
                <span className="font-mono text-tag uppercase text-outline block mt-3">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* PARA QUEM */}
        <section className="px-4 sm:px-8 py-24 md:py-36">
          <div className="max-w-[1440px] mx-auto">

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end mb-16 md:mb-20">
              <div className="md:col-span-7">
                <span className="font-mono text-tag uppercase text-outline block mb-5">[ Para quem foi escrito ]</span>
                <h2 className="font-display text-headline uppercase text-ink">
                  Este manual é para quem prefere estar pronto
                </h2>
              </div>
              <p className="md:col-span-5 text-body text-ink-dim">
                Nada de teoria ou fanatismo de bunker. É um plano de contingência doméstico que
                você executa passo a passo dentro da plataforma — e leva no PDF para consultar
                mesmo sem internet.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-0 border-t border-hairline pt-10">
              {AUDIENCE.map((item) => (
                <div
                  key={item.index}
                  className="md:border-l md:border-hairline md:pl-8 md:pr-6 first:md:border-l-0 first:md:pl-0"
                >
                  <span className="font-mono text-tag text-signal block mb-4">{item.index}</span>
                  <h3 className="font-display text-subhead uppercase text-ink mb-4">{item.title}</h3>
                  <p className="text-bodysm text-ink-dim">{item.text}</p>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* KIT TÁTICO */}
        <section id="kit" className="px-4 sm:px-8 py-24 md:py-36 bg-surface-lowest border-y border-hairline overflow-hidden">
          <KitSection />
        </section>

        {/* OFERTA */}
        <section id="oferta" className="px-4 sm:px-8 py-24 md:py-32 bg-signal">
          <OfferSection />
        </section>

        {/* FAQ */}
        <section id="faq" className="px-4 sm:px-8 py-24 md:py-36">
          <FAQ />
        </section>

        {/* FECHAMENTO */}
        <section className="px-4 sm:px-8 pb-24 md:pb-36">
          <div className="max-w-[1440px] mx-auto border-t border-hairline pt-14 md:pt-20 grid grid-cols-1 md:grid-cols-12 gap-10 items-end">
            <div className="md:col-span-7">
              <span className="font-mono text-tag uppercase text-alert block mb-5">[ Última nota ]</span>
              <h2 className="font-display text-headline uppercase text-ink">
                Você vai esperar a rede cair para aprender?
              </h2>
              <p className="text-body text-ink-dim mt-6 max-w-xl">
                Quando a energia sumir e as redes caírem, ninguém entra em plataforma nenhuma nem
                baixa PDF nenhum. Garanta agora o acesso vitalício e deixe o manual salvo no seu
                celular enquanto a conectividade ainda existe.
              </p>
            </div>
            <div className="md:col-span-5 md:flex md:justify-end">
              <CheckoutLink
                from="CTA Fechamento"
                className="w-full md:w-auto inline-flex items-center justify-center gap-3 border border-signal text-signal hover:bg-signal hover:text-black font-mono text-tag font-bold uppercase px-8 py-5 transition-colors"
              >
                Quero a plataforma + o manual
                <ArrowRight className="w-4 h-4" />
              </CheckoutLink>
            </div>
          </div>
        </section>

      </main>

      {/* RODAPÉ */}
      <footer className="border-t border-hairline bg-surface-lowest px-4 sm:px-8 py-14">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-10">
          <div className="md:col-span-7">
            <span className="font-mono text-tag uppercase text-outline block mb-3">Aviso de responsabilidade</span>
            <p className="text-bodysm text-ink-dim max-w-2xl">
              Os métodos descritos neste compêndio são de teor estritamente pedagógico e
              informativo de resiliência civil.
            </p>
          </div>
          <div className="md:col-span-5 flex flex-col md:items-end gap-4">
            <nav className="flex flex-wrap gap-x-6 gap-y-2 font-mono text-tag uppercase text-outline">
              <a href="#modulos" className="hover:text-ink transition-colors">Módulos</a>
              <a href="#kit" className="hover:text-ink transition-colors">O que inclui</a>
              <a href="#faq" className="hover:text-ink transition-colors">FAQ</a>
              <a href="#topo" className="hover:text-ink transition-colors">Voltar ao topo</a>
            </nav>
            <span className="font-mono text-tag uppercase text-outline-dim md:text-right">
              © {new Date().getFullYear()} Manual Completo de Sobrevivência Apocalíptica
            </span>
          </div>
        </div>
      </footer>

    </div>
  );
}
