import React from 'react';
import { CHAPTERS } from '../data';
import CheckoutLink from './CheckoutLink';

export default function ModulesSection() {
  return (
    <div className="max-w-[1440px] mx-auto" id="chapters-module">

      <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
        <span className="font-mono text-tag uppercase text-tactical block mb-5">
          [ 5 módulos liberados de uma vez ]
        </span>
        <h2 className="font-display text-display uppercase text-ink">O que você vai saber fazer</h2>
        <p className="text-body text-ink-dim mt-8 max-w-2xl mx-auto">
          Cada módulo corresponde a um dos cinco pilares e fica disponível na plataforma, com os
          checklists e as ferramentas daquele pilar — e também no manual em PDF, para consultar
          sem internet.
        </p>
      </div>

      <div className="border-t border-hairline">
        {CHAPTERS.map((chapter) => (
          <article
            key={chapter.number}
            className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-8 py-10 md:py-16 border-b border-hairline"
          >
            {/* Índice */}
            <div className="md:col-span-3 flex md:block items-baseline gap-5">
              <span className="font-display font-extrabold text-[56px] md:text-[96px] leading-[0.78] tracking-tighter text-outline-dim block">
                {String(chapter.number).padStart(2, '0')}
              </span>
              <span className="font-mono text-tag uppercase text-signal block md:mt-4">
                [{chapter.tag}]
              </span>
            </div>

            {/* Corpo */}
            <div className="md:col-span-5 space-y-4">
              <h3 className="font-display text-subhead text-ink">{chapter.title}</h3>
              <p className="font-mono text-tag uppercase text-outline">{chapter.subtitle}</p>
              <p className="text-body text-ink-dim">{chapter.description}</p>
            </div>

            {/* Pontos-chave */}
            <div className="md:col-span-4">
              <span className="font-mono text-tag uppercase text-outline block pb-3 border-b border-hairline">
                Pontos-chave
              </span>
              <ul>
                {chapter.topics.map((topic, i) => (
                  <li
                    key={i}
                    className="flex gap-4 py-3.5 border-b border-hairline last:border-b-0 text-bodysm text-ink-dim"
                  >
                    <span className="font-mono text-tag text-outline-dim shrink-0 pt-1 tabular-nums">
                      /{String(i + 1).padStart(2, '0')}
                    </span>
                    <span>{topic}</span>
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>

      <p className="font-mono text-tag uppercase text-outline mt-8 flex flex-col sm:flex-row sm:justify-between gap-2">
        <span>O pilar do Planejamento vive nas ferramentas da plataforma</span>
        <span>Acesso vitalício · atualizações inclusas</span>
      </p>

      {/* CTA intermediário: o visitante acabou de atravessar o bloco mais longo da página */}
      <div className="mt-12 pt-10 border-t border-hairline flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <p className="text-bodysm text-ink-dim max-w-md">
          Os cinco módulos ficam liberados de uma vez, assim que você entra. Não tem liberação
          semanal nem espera.
        </p>
        <CheckoutLink
          from="CTA Módulos"
          className="w-full sm:w-auto text-center border border-signal text-signal hover:bg-signal hover:text-black font-mono text-tag font-bold uppercase px-8 py-4 transition-colors shrink-0"
        >
          Entrar na plataforma — R$ 39,90
        </CheckoutLink>
      </div>

    </div>
  );
}
