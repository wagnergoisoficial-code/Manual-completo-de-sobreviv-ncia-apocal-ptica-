import React from 'react';
import { KIWIFY_CHECKOUT_URL } from '../data';
import { trackPixel } from '../pixel';
import { ArrowUpRight, Check, ExternalLink, ShieldCheck, Zap } from 'lucide-react';

const INCLUDED = [
  { title: 'Acesso à Plataforma Completa', detail: 'Área de membros online, 24/7, no celular ou no computador' },
  { title: 'Manual Completo de Sobrevivência Apocalíptica', detail: 'Em PDF, para baixar e consultar sem internet' },
  { title: 'Checklists e ferramentas práticas', detail: 'Reserva de água, kit médico e plano de evacuação, dentro da plataforma' },
  { title: 'Bônus 01 — Telecomunicações Resilientes', detail: 'Frequências, rádios amadores e comunicação off-grid' },
  { title: 'Bônus 02 — Protocolo de Evacuação de 72h', detail: 'O fluxograma do que fazer nas primeiras horas' },
  { title: 'Bônus 03 — Farmácia Natural de Emergência', detail: 'Antibióticos, dosagens e plantas medicinais' },
  { title: 'Acesso vitalício', detail: 'Novos módulos e atualizações entram na sua conta sem custo' },
];

const TRUST = [
  { icon: ExternalLink, label: 'Compra na Kiwify' },
  { icon: ShieldCheck, label: 'Garantia de 7 dias' },
  { icon: Zap, label: 'Acesso imediato' },
];

export default function OfferSection() {
  return (
    <div className="max-w-[1440px] mx-auto text-black" id="oferta-module">

      <div className="max-w-3xl mx-auto text-center">
        <span className="inline-block font-mono text-tag font-bold uppercase bg-black text-signal px-4 py-1.5 mb-8">
          Você não está comprando só um e-book
        </span>
        <h2 className="font-display text-display uppercase mb-6">
          Prepare-se antes do colapso.
        </h2>
        <p className="text-body font-medium text-black/75">
          Acesso à plataforma completa + Manual em PDF + 3 bônus exclusivos.
          Sem assinatura, sem mensalidade: paga uma vez e o acesso é vitalício.
        </p>
      </div>

      {/* O que está incluído */}
      <div className="max-w-5xl mx-auto mt-16">
        <span className="font-mono text-tag font-bold uppercase block mb-4">
          O que está incluído no seu acesso
        </span>
        <div className="grid grid-cols-1 md:grid-cols-2 border-t border-black/25">
          {INCLUDED.map((item) => (
            <div key={item.title} className="flex items-start gap-3.5 py-5 pr-6 border-b border-black/25">
              <Check className="w-4 h-4 shrink-0 mt-1" strokeWidth={3} />
              <div>
                <h3 className="font-display font-bold text-[17px] leading-tight">{item.title}</h3>
                <p className="text-bodysm text-black/70 mt-1">{item.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Ação */}
      <div className="max-w-3xl mx-auto mt-16 flex flex-col items-center">
        <a
          href={KIWIFY_CHECKOUT_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackPixel('InitiateCheckout', { content_name: 'CTA Oferta' })}
          className="w-full md:w-auto inline-flex items-center justify-center gap-3 text-center bg-black hover:bg-surface-lowest text-signal font-display font-extrabold uppercase tracking-wide text-lg md:text-xl px-12 py-6 transition-colors"
        >
          Garantir meu acesso agora
          <ArrowUpRight className="w-5 h-5 shrink-0" strokeWidth={2.5} />
        </a>

        <p className="mt-5 font-mono text-tag uppercase text-black/60 text-center max-w-md">
          Ao clicar, você vai para a Kiwify — a plataforma oficial onde a compra é finalizada.
          Esta página não recebe pagamentos.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-x-8 gap-y-3 font-mono text-tag font-bold uppercase text-black/70">
          {TRUST.map(({ icon: Icon, label }) => (
            <span key={label} className="flex items-center gap-2">
              <Icon className="w-4 h-4" strokeWidth={2} />
              {label}
            </span>
          ))}
        </div>

        <p className="mt-8 text-bodysm text-black/70 text-center max-w-xl">
          Assim que a Kiwify confirmar o pagamento, você recebe por e-mail o login e a senha
          da plataforma, com os módulos, os checklists e os bônus liberados — e o botão para
          baixar o manual em PDF.
        </p>
      </div>

    </div>
  );
}
