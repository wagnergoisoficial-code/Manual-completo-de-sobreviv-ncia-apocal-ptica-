import React from 'react';

/**
 * Cabeçalho: marca à esquerda, uma frase à direita. Nada mais.
 *
 * Ele fica por cima da fotografia, sem fundo e sem barra — quem chegou vê primeiro a
 * imagem e a headline, não uma faixa de navegação. Não há menu porque não há para onde
 * ir: a página tem um destino só, e ele está a um toque no hero e na barra fixa do
 * celular.
 */

/** A marca é um pico desenhado, não um ícone de biblioteca. */
function PeakMark() {
  return (
    <svg viewBox="0 0 28 20" className="w-6 h-[1.05rem] shrink-0" aria-hidden="true">
      <path
        d="M1 19 L10.5 3 L15.8 11.4 L18.6 7.2 L27 19 Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path d="M7.4 8.3 L10.5 3 L13.6 8.3 Z" fill="currentColor" />
    </svg>
  );
}

export default function Header() {
  return (
    <header className="absolute inset-x-0 top-0 z-40">
      <div className="mx-auto max-w-[1240px] px-6 sm:px-10 lg:px-16 py-7 sm:py-9 flex items-center justify-between gap-6">

        <a
          href="#topo"
          className="flex items-center gap-3.5 text-cream hover:text-amber transition-colors"
        >
          <PeakMark />
          <span className="eyebrow">Sobrevivência Real</span>
        </a>

        <p className="hidden sm:block text-small text-mist">Conhecimento é proteção.</p>

      </div>
    </header>
  );
}
