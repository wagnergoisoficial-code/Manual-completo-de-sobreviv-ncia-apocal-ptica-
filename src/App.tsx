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

const PILARES = [
  { nome: 'Prevenção', texto: 'Enxergar a falha antes dela chegar: os sinais de que luz, água ou mercado vão faltar.' },
  { nome: 'Planejamento', texto: 'O plano escrito da sua casa: quem faz o quê nas primeiras 72 horas, e por onde sair.' },
  { nome: 'Provisão', texto: 'Água, comida e remédio suficientes — guardados do jeito certo, não empilhados.' },
  { nome: 'Proteção', texto: 'Primeiros socorros, casa discreta e a família fora do caminho do problema.' },
  { nome: 'Persistência', texto: 'Aguentar semanas, não dias: energia, comunicação e reposição do que acabou.' },
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
            Isto não é um e-book — é a plataforma completa do Método 5P. O manual em PDF vem incluído.
          </p>
        </div>
      </div>

      <main className="flex-1">

        {/* HERO */}
        <section className="px-4 sm:px-8 py-20 md:py-32">
          <div className="max-w-[1440px] mx-auto flex flex-col items-center text-center">

            <span className="inline-flex items-center gap-2.5 px-3 py-1.5 border border-hairline mb-10">
              <span className="w-1.5 h-1.5 bg-alert animate-pulse" />
              <span className="font-mono text-tag uppercase text-alert">Método 5P · Os 5 pilares da preparação</span>
            </span>

            <h1 className="font-display text-display uppercase max-w-5xl text-ink">
              Quando o sistema para, não existe tempo para aprender.{' '}
              <br className="hidden md:block" />
              <span className="text-signal">Existe o que você preparou antes.</span>
            </h1>

            {/* O reenquadramento: o produto é a plataforma, não o PDF */}
            <div className="max-w-3xl mt-10 space-y-5">
              <p className="text-body text-ink">
                Em uma tarde, a sua casa fica pronta para os três primeiros dias sem luz, sem água
                e sem mercado. Com um plano escrito — não com boa intenção.
              </p>
              <p className="text-body text-ink-dim">
                O que quase todo mundo vende é um PDF de duzentas páginas. Você baixa, lê metade,
                fecha — e continua exatamente tão despreparado quanto estava antes de comprar.
              </p>
              <p className="text-body text-ink-dim">
                O <strong className="font-semibold text-signal">Método 5P</strong> é uma plataforma.
                Os cinco pilares — Prevenção, Planejamento, Provisão, Proteção e Persistência —
                viram passos marcados, um a um, e você vê na tela o que já tem e o que ainda falta.
                Você não lê sobre estar preparado. Você fica preparado.
              </p>
            </div>

            {/* Preço e o que vem incluído */}
            <div className="w-full max-w-3xl mt-10 border-y border-hairline py-5 flex flex-col sm:flex-row items-start sm:items-center gap-4 text-left">
              <span className="font-mono text-tag font-bold uppercase text-signal border border-signal px-2.5 py-1.5 shrink-0">
                R$ 39,90
              </span>
              <p className="text-bodysm text-ink-dim">
                <span className="text-ink font-semibold">Pagamento único, acesso vitalício.</span> Sem
                assinatura e sem mensalidade. O <span className="text-ink font-semibold">Manual Completo
                em PDF</span> e os 3 bônus vêm incluídos — o PDF é o seu seguro, para o dia em que não
                houver internet, energia, nem plataforma alguma para abrir.
              </p>
            </div>

            <div className="w-full mt-14">
              <VSLPlayer />
            </div>

            <CheckoutLink
              from="CTA Hero"
              className="w-full md:w-auto mt-12 bg-signal hover:bg-signal-soft text-black font-display font-extrabold uppercase tracking-wide text-base md:text-lg px-10 py-5 transition-colors"
            >
              Entrar na plataforma por R$ 39,90
            </CheckoutLink>

            <p className="font-mono text-tag uppercase text-outline mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2">
              <span>Pagamento único de R$ 39,90</span>
              <span className="hidden sm:inline text-outline-dim">/</span>
              <span>Acesso imediato e vitalício</span>
              <span className="hidden sm:inline text-outline-dim">/</span>
              <span>7 dias de garantia</span>
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
                Sua casa aguentaria o corte de água e de energia por uma semana? Responda cinco
                perguntas e veja a sua nota em cada um dos cinco pilares — e exatamente qual
                módulo da plataforma resolve cada falha que aparecer.
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

        {/* OS 5 PILARES — o método, nomeado */}
        <section className="border-y border-hairline bg-surface-lowest" id="pilares">
          <div className="max-w-[1440px] mx-auto px-6 sm:px-8 pt-10 md:pt-14">
            <span className="font-mono text-tag uppercase text-signal">[ Método 5P · os 5 pilares da preparação ]</span>
          </div>
          <div className="max-w-[1440px] mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5">
            {PILARES.map((pilar, i) => (
              <div
                key={pilar.nome}
                className={`px-6 sm:px-8 py-8 md:py-12 border-hairline border-b md:border-b-0 ${i < PILARES.length - 1 ? 'md:border-r' : ''}`}
              >
                <span className="font-mono text-tag text-outline-dim block mb-3 tabular-nums">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="font-display font-extrabold text-[26px] md:text-[30px] leading-none tracking-tight text-ink block">
                  {pilar.nome}
                </span>
                <span className="text-bodysm text-ink-dim block mt-4">
                  {pilar.texto}
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

            {/* CTA intermediário: logo depois de a pessoa se reconhecer num dos três perfis */}
            <div className="mt-14 pt-10 border-t border-hairline flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <p className="text-bodysm text-ink-dim max-w-md">
                Se você se reconheceu em algum dos três, o próximo passo custa menos que um lanche
                — e vem com 7 dias para desistir.
              </p>
              <CheckoutLink
                from="CTA Para Quem"
                className="w-full sm:w-auto text-center border border-signal text-signal hover:bg-signal hover:text-black font-mono text-tag font-bold uppercase px-8 py-4 transition-colors shrink-0"
              >
                Começar por R$ 39,90
              </CheckoutLink>
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
                O risco é todo nosso, não seu
              </h2>
              <p className="text-body text-ink-dim mt-6 max-w-xl">
                Entre na plataforma, abra os cinco pilares, use os checklists e baixe o manual. Se
                em sete dias você achar que não valeu, devolvemos os R$ 39,90 inteiros — sem
                pergunta nenhuma. O que não dá para devolver é o tempo: quando a energia sumir e as
                redes caírem, ninguém abre plataforma nem baixa PDF.
              </p>
            </div>
            <div className="md:col-span-5 md:flex md:justify-end">
              <CheckoutLink
                from="CTA Fechamento"
                className="w-full md:w-auto inline-flex items-center justify-center gap-3 border border-signal text-signal hover:bg-signal hover:text-black font-mono text-tag font-bold uppercase px-8 py-5 transition-colors"
              >
                Entrar por R$ 39,90
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
              O conteúdo desta plataforma é informativo e educacional, voltado à preparação
              doméstica para emergências. Não substitui atendimento médico, socorro público nem
              orientação profissional.
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
