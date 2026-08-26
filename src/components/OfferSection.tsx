import React from 'react';
import CheckoutLink from './CheckoutLink';
import { ArrowUpRight, Check, ExternalLink, ShieldCheck, Zap } from 'lucide-react';

const INCLUDED = [
  { title: 'Plataforma completa do Método 5P', detail: 'O produto: os 5 pilares em passos marcados, no celular ou no computador, 24/7' },
  { title: 'Manual Completo em PDF — brinde', detail: 'Vem junto sem custo, para baixar e consultar sem internet' },
  { title: 'Checklists e ferramentas práticas', detail: 'Reserva de água, kit médico e plano de evacuação, dentro da plataforma' },
  { title: 'Bônus 01 — Telecomunicações Resilientes', detail: 'Frequências, rádios amadores e comunicação off-grid' },
  { title: 'Bônus 02 — Protocolo de Evacuação de 72h', detail: 'O fluxograma do que fazer nas primeiras horas' },
  { title: 'Bônus 03 — Farmácia Natural de Emergência', detail: 'Antibióticos, dosagens e plantas medicinais' },
  { title: 'Acesso vitalício', detail: 'Novos módulos e atualizações entram na sua conta sem custo' },
];

const TRUST = [
  { icon: ExternalLink, label: 'Compra na Kiwify' },
  { icon: ShieldCheck, label: '7 dias de garantia' },
  { icon: Zap, label: 'Pagamento único' },
];

export default function OfferSection() {
  return (
    <div className="max-w-[1440px] mx-auto text-black" id="oferta-module">

      <div className="max-w-3xl mx-auto text-center">
        <span className="inline-block font-mono text-tag font-bold uppercase bg-black text-signal px-4 py-1.5 mb-8">
          O produto é a plataforma. O e-book é brinde.
        </span>
        <h2 className="font-display text-display uppercase mb-6">
          R$ 39,90, uma vez só.
        </h2>
        <p className="text-body font-medium text-black/75">
          É o preço de um lanche. Você leva a plataforma completa do Método 5P, o Manual em PDF e
          os 3 bônus — sem assinatura, sem mensalidade, com acesso vitalício e 7 dias de garantia.
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
        <CheckoutLink
          from="CTA Oferta"
          className="w-full md:w-auto inline-flex items-center justify-center gap-3 text-center bg-black hover:bg-surface-lowest text-signal font-display font-extrabold uppercase tracking-wide text-lg md:text-xl px-12 py-6 transition-colors"
        >
          Garantir meu acesso por R$ 39,90
          <ArrowUpRight className="w-5 h-5 shrink-0" strokeWidth={2.5} />
        </CheckoutLink>

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
