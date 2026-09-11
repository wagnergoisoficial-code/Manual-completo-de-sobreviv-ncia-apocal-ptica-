/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { Lock } from 'lucide-react';
import Header from './components/Header';
import VSLPlayer from './components/VSLPlayer';
import SurvivalQuiz from './components/SurvivalQuiz';
import OfferSection from './components/OfferSection';
import FAQ from './components/FAQ';
import BuyButton from './components/BuyButton';
import MobileStickyCTA from './components/MobileStickyCTA';
import { HandArrow, HandNote, HandUnderline } from './components/Annotation';
import { trackPixel } from './pixel';
import { CHAPTERS } from './data';
import manualCover from './assets/images/manual_cover_1783965348887.jpg';

/** A medida da página. Todo bloco começa e termina nestes limites. */
const SHELL = 'mx-auto max-w-[1240px] px-6 sm:px-10 lg:px-16';

/** Seta de rolagem do hero — desenhada, não um ícone genérico de biblioteca. */
function ScrollCue() {
  return (
    <a
      href="#metodo"
      className="group flex flex-col items-center gap-4 text-faint transition-colors hover:text-cream"
    >
      <span aria-hidden="true" className="h-12 w-px bg-gradient-to-b from-transparent to-cream/30" />
      <svg viewBox="0 0 16 26" className="h-6 w-4" fill="none" aria-hidden="true">
        <rect x="0.8" y="0.8" width="14.4" height="24.4" rx="7.2" stroke="currentColor" strokeWidth="1.3" />
        <circle cx="8" cy="7.5" r="1.6" fill="currentColor">
          <animate attributeName="cy" values="7.5;12;7.5" dur="2.2s" repeatCount="indefinite" />
        </circle>
      </svg>
      <span className="eyebrow">Descubra mais</span>
    </a>
  );
}

/**
 * O objeto: a capa tratada como produto físico, com perspectiva, lombada e a mesma luz
 * quente que atravessa a página. Não é um mockup flutuando — está apoiado numa sombra.
 */
function BookObject() {
  return (
    <div className="relative mx-auto w-[68%] max-w-[340px] lg:w-[78%] lg:max-w-none">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-16 bg-[radial-gradient(ellipse_at_50%_40%,rgba(243,179,64,0.20),transparent_66%)] blur-2xl"
      />
      <div className="relative [perspective:1600px]">
        <div className="relative [transform:rotateY(-13deg)_rotateX(2deg)] [transform-style:preserve-3d]">
          <img
            src={manualCover}
            alt="Capa do Manual Completo de Sobrevivência Apocalíptica"
            className="relative block w-full shadow-[24px_36px_70px_rgba(0,0,0,0.7)]"
            referrerPolicy="no-referrer"
          />
          {/* Lombada: a borda que transforma uma imagem plana num objeto. */}
          <span
            aria-hidden="true"
            className="absolute inset-y-0 -left-[9px] w-[9px] bg-gradient-to-r from-night via-ash to-slate"
            style={{ transform: 'rotateY(-72deg)', transformOrigin: 'right center' }}
          />
          {/* Brilho da luz âmbar batendo na capa pela direita. */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(102deg,rgba(0,0,0,0.42),transparent_38%,rgba(255,200,92,0.14))]"
          />
        </div>
      </div>
      {/* Chão: a sombra que apoia o objeto. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-8 left-[6%] h-10 w-[88%] rounded-[50%] bg-black/55 blur-2xl"
      />
    </div>
  );
}

export default function App() {
  // Quem abre a página viu a oferta. O InitiateCheckout agora também sai daqui, no clique
  // do botão de compra — ver pixel.ts para o porquê da mudança.
  useEffect(() => {
    trackPixel('ViewContent', { content_name: 'Página de vendas — Método 5P' });
  }, []);

  return (
    <div className="grain min-h-screen overflow-x-hidden bg-night text-cream">

      {/* ── HERO ─────────────────────────────────────────────────────────────────
          A fotografia carrega a atmosfera, o vídeo carrega o argumento. O texto fica
          à esquerda, na sombra, onde ele lê; a luz quente entra pela direita e assenta
          a tela na cena, em vez de deixá-la colada por cima. */}
      <section id="topo" className="relative overflow-hidden pt-28 pb-20 sm:pt-32 lg:flex lg:min-h-[88vh] lg:flex-col lg:justify-center lg:pt-32 lg:pb-28">

        <div aria-hidden="true" className="absolute inset-0">
          <img
            src={manualCover}
            alt=""
            className="h-full w-full scale-[1.55] object-cover object-[50%_60%] opacity-[0.46] blur-[3px]"
            referrerPolicy="no-referrer"
          />
          {/* O sol da referência: a luz vem de um ponto, não de um degradê chapado. */}
          <div className="absolute inset-0 bg-[radial-gradient(105%_80%_at_74%_34%,rgba(255,176,64,0.34),transparent_58%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(100deg,#0b0b0c_14%,rgba(11,11,12,0.9)_40%,rgba(11,11,12,0.52)_68%,rgba(11,11,12,0.8)_100%)]" />
          <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-night via-night/75 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-night via-night/80 to-transparent" />
        </div>

        <Header />

        <div className={`relative ${SHELL}`}>
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-x-16 lg:gap-y-9">

            {/* A — a promessa */}
            <div className="lg:col-span-5 lg:col-start-1 lg:row-start-1">
              <span className="eyebrow text-amber">Manual + plataforma</span>
              <h1 className="mt-6 max-w-[19ch] text-hero text-cream">
                Quando o sistema para, não existe tempo para aprender.{' '}
                <span className="text-amber">Existe o que você preparou antes.</span>
              </h1>
            </div>

            {/* B — o vídeo: o maior elemento da composição inicial */}
            <div className="lg:col-span-7 lg:col-start-6 lg:row-span-2 lg:row-start-1">
              <VSLPlayer />
            </div>

            {/* C — a decisão */}
            <div className="lg:col-span-5 lg:col-start-1 lg:row-start-2">
              <p className="max-w-[42ch] text-lead text-mist">
                Em uma tarde, a sua casa fica pronta para os três primeiros dias sem luz, sem
                água e sem mercado. Com um plano escrito — não com boa intenção.
              </p>
              <div className="mt-8">
                <BuyButton from="CTA Hero" block>
                  Quero meu acesso — R$&nbsp;39,90
                </BuyButton>
              </div>
              <p className="mt-5 flex items-center gap-2.5 text-[0.8125rem] text-faint">
                <Lock className="h-3.5 w-3.5 shrink-0" strokeWidth={2} />
                Pagamento único · Acesso imediato · 7 dias de garantia
              </p>
            </div>

          </div>

        </div>

        <div className="absolute inset-x-0 bottom-9 hidden justify-center lg:flex">
          <ScrollCue />
        </div>
      </section>

      {/* ── O MÉTODO ────────────────────────────────────────────────────────────
          O reenquadramento que decide a venda: não é um PDF, é uma plataforma. */}
      <section id="metodo" className="bg-coal py-24 lg:py-32">
        <div className={SHELL}>
          <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-12 lg:gap-12">

            <div className="lg:col-span-5">
              <span className="eyebrow text-faint">O que você vai encontrar</span>
              <h2 className="mt-6 max-w-[16ch] text-section text-cream">
                Você não lê sobre estar preparado.{' '}
                <span className="text-amber">Você fica preparado.</span>
              </h2>
              <p className="mt-7 max-w-[46ch] text-lead text-mist">
                O que quase todo mundo vende é um PDF de duzentas páginas: você baixa, lê metade
                e fecha. O Método 5P é uma plataforma — os cinco pilares viram passos marcados, e
                você vê na tela o que já tem e o que ainda falta.
              </p>

              <div className="relative mt-12 inline-block">
                <HandNote tilt={-3} className="text-[1.6rem]">
                  Porque o inesperado não avisa.
                </HandNote>
                <HandUnderline className="mt-1 h-2.5 w-[92%]" />
              </div>
            </div>

            <div className="relative lg:col-span-6 lg:col-start-7 lg:pt-32">
              {/* A anotação entra torta, por fora da grade, apontando para o objeto. */}
              <div className="pointer-events-none absolute right-2 top-0 z-10 hidden w-56 lg:block">
                <HandNote tilt={4} className="text-[1.45rem] leading-tight">
                  Conhecimento também é uma arma.
                </HandNote>
                <HandArrow className="ml-8 mt-2 h-16 w-11 -scale-x-100 text-cream/70" />
              </div>
              <BookObject />
            </div>

          </div>
        </div>
      </section>

      {/* ── DECLARAÇÃO ──────────────────────────────────────────────────────────
          Uma faixa de respiro entre dois blocos densos. Uma frase, nada mais. */}
      <section className="relative overflow-hidden py-24 lg:py-32">
        <div aria-hidden="true" className="absolute inset-0">
          <img
            src={manualCover}
            alt=""
            className="h-full w-full scale-[1.9] object-cover object-[50%_72%] opacity-[0.34] blur-[2px]"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,#0b0b0c,rgba(11,11,12,0.55)_50%,#0b0b0c)]" />
        </div>

        <div className={`relative ${SHELL} text-center`}>
          <p className="text-[clamp(0.95rem,1.7vw,1.3rem)] font-semibold uppercase leading-[1.7] tracking-[0.2em] text-cream">
            Este não é apenas um ebook.
            <br />
            <span className="text-amber">É o seu plano de ação.</span>
          </p>
          <span aria-hidden="true" className="mx-auto mt-7 block h-px w-14 bg-amber" />
        </div>
      </section>

      {/* ── OS CINCO PILARES ────────────────────────────────────────────────────
          Os módulos e os pilares eram duas seções dizendo a mesma coisa. Agora são
          cinco linhas: o pilar e, em uma frase, o que ele resolve. */}
      <section id="modulos" className="bg-coal py-24 lg:py-32">
        <div className={SHELL}>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">

            <div className="lg:sticky lg:top-16 lg:col-span-4 lg:self-start">
              <span className="eyebrow text-amber">Os 5 pilares</span>
              <h2 className="mt-6 max-w-[14ch] text-section text-cream">
                O que você vai saber fazer
              </h2>
              <p className="mt-6 max-w-[38ch] text-small text-mist">
                Os cinco módulos ficam liberados de uma vez, assim que você entra. Sem liberação
                semanal e sem espera.
              </p>
              <div className="mt-9">
                <BuyButton from="CTA Módulos" variant="ghost" block>
                  Entrar por R$&nbsp;39,90
                </BuyButton>
              </div>
            </div>

            <ol className="border-t border-cream/10 lg:col-span-7 lg:col-start-6">
              {CHAPTERS.map((chapter) => (
                <li
                  key={chapter.number}
                  className="flex items-baseline gap-5 border-b border-cream/10 py-6 sm:gap-8"
                >
                  <span className="shrink-0 text-[0.8125rem] tabular-nums text-faint">
                    {String(chapter.number).padStart(2, '0')}
                  </span>
                  <div className="min-w-0">
                    <h3 className="eyebrow text-amber">{chapter.tag}</h3>
                    <p className="mt-2.5 text-title text-cream">{chapter.subtitle}</p>
                  </div>
                </li>
              ))}
            </ol>

          </div>
        </div>
      </section>

      {/* ── DIAGNÓSTICO ─────────────────────────────────────────────────────────
          A única peça interativa, e a única que dispara Lead. */}
      <section id="diagnostico" className="py-24 lg:py-32">
        <div className={SHELL}>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">

            <div className="lg:sticky lg:top-16 lg:col-span-4 lg:self-start">
              <span className="eyebrow text-faint">Diagnóstico</span>
              <h2 className="mt-6 max-w-[15ch] text-section text-cream">
                Sua casa aguenta sete dias sem luz e sem água?
              </h2>
              <p className="mt-6 max-w-[38ch] text-small text-mist">
                Cinco perguntas. No fim, a sua nota em cada pilar e qual módulo resolve cada
                falha.
              </p>
            </div>

            <div className="lg:col-span-7 lg:col-start-6">
              <SurvivalQuiz />
            </div>

          </div>
        </div>
      </section>

      {/* ── OFERTA ──────────────────────────────────────────────────────────────
          O id é o gatilho que recolhe a pílula fixa do celular. */}
      <section id="oferta" className="relative overflow-hidden bg-coal py-24 lg:py-32">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(90%_70%_at_18%_50%,rgba(243,179,64,0.10),transparent_62%)]"
        />
        <div className="relative">
          <OfferSection />
        </div>
      </section>

      {/* ── PERGUNTAS ───────────────────────────────────────────────────────── */}
      <section id="faq" className="py-24 lg:py-32">
        <div className={SHELL}>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">

            <div className="lg:sticky lg:top-16 lg:col-span-4 lg:self-start">
              <span className="eyebrow text-faint">Antes de decidir</span>
              <h2 className="mt-6 max-w-[12ch] text-section text-cream">Perguntas diretas</h2>
              <div className="mt-9">
                <BuyButton from="CTA Fechamento" block>
                  Entrar por R$&nbsp;39,90
                </BuyButton>
              </div>
              <p className="mt-5 max-w-[34ch] text-[0.8125rem] text-faint">
                Pagamento único · Acesso imediato · 7 dias de garantia
              </p>
            </div>

            <div className="lg:col-span-7 lg:col-start-6">
              <FAQ />
            </div>

          </div>
        </div>
      </section>

      {/* ── RODAPÉ ──────────────────────────────────────────────────────────── */}
      <footer className="border-t border-cream/10 py-14">
        <div className={`${SHELL} flex flex-col gap-8 md:flex-row md:items-start md:justify-between`}>
          <p className="max-w-lg text-[0.8125rem] leading-relaxed text-faint">
            Conteúdo informativo e educacional, voltado à preparação doméstica para emergências.
            Não substitui atendimento médico, socorro público nem orientação profissional.
          </p>
          <p className="text-[0.8125rem] text-faint md:text-right">
            © {new Date().getFullYear()} Manual Completo de Sobrevivência Apocalíptica
          </p>
        </div>
      </footer>

      <MobileStickyCTA />

    </div>
  );
}
