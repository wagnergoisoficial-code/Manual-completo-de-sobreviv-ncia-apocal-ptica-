import React from 'react';
import { BONUSES } from '../data';
import BuyButton from './BuyButton';

/**
 * A oferta.
 *
 * Não é um bloco âmbar chapado: o âmbar da página significa ação, e um fundo inteiro
 * dessa cor tiraria do botão a única coisa que o distingue. A distinção aqui vem do
 * preço em corpo de headline e do calor que sobe do fundo — a mesma luz do hero,
 * fechando a página onde ela começou.
 */

const INCLUDED = [
  ['Plataforma completa do Método 5P', 'Os 5 módulos, os checklists e as ferramentas, no celular ou no computador'],
  ['Manual Completo em PDF', 'Para baixar e consultar sem internet — o seu seguro'],
  ['Os 3 bônus', BONUSES.map((bonus) => bonus.title.replace(/^(O |Guia da |Checklist do )/, '')).join(' · ')],
  ['Acesso vitalício', 'Novos módulos e atualizações entram na sua conta sem custo'],
] as const;

export default function OfferSection() {
  return (
    <div className="mx-auto max-w-[1240px] px-6 sm:px-10 lg:px-16">
      <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">

        <div className="lg:col-span-5">
          <span className="eyebrow text-amber">A oferta</span>

          <div className="mt-7 flex items-baseline gap-4">
            <span className="text-hero text-cream">R$&nbsp;39,90</span>
            <span className="text-small text-mist">uma vez só</span>
          </div>

          <p className="mt-6 max-w-sm text-lead text-mist">
            Sem assinatura e sem mensalidade. Acesso imediato e vitalício, com{' '}
            <span className="text-cream">7 dias de garantia</span> — se não servir, devolvemos
            os R$&nbsp;39,90 integralmente.
          </p>

          <div className="mt-9">
            <BuyButton from="CTA Oferta" block>
              Entrar na plataforma
            </BuyButton>
            <p className="mt-5 max-w-xs text-[0.8125rem] leading-relaxed text-faint">
              A compra é finalizada na Kiwify. Esta página não recebe pagamentos.
            </p>
          </div>
        </div>

        <div className="lg:col-span-7">
          <span className="eyebrow text-faint">O que está incluído</span>
          <ul className="mt-7 border-t border-cream/10">
            {INCLUDED.map(([title, detail]) => (
              <li key={title} className="flex items-baseline gap-5 border-b border-cream/10 py-5">
                <span aria-hidden="true" className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-amber" />
                <div className="min-w-0">
                  <h3 className="text-title text-cream">{title}</h3>
                  <p className="mt-1.5 text-small text-mist">{detail}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </div>
  );
}
