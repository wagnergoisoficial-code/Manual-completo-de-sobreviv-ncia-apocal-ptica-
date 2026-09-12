import React from 'react';
import { ShieldCheck } from 'lucide-react';
import { BONUSES } from '../data';
import PaymentForm from './PaymentForm';

/**
 * A oferta e o pagamento, no mesmo lugar.
 *
 * Os campos do cartão e do Pix ficam aqui dentro, na própria página de vendas: quem
 * decidiu comprar não é mandado para lugar nenhum. À esquerda fica o que sustenta a
 * decisão — preço, o que está incluído, garantia; à direita, o formulário.
 *
 * O fundo não é âmbar chapado: o âmbar da página significa ação, e um bloco inteiro
 * dessa cor tiraria do botão de pagar a única coisa que o distingue.
 */

const INCLUDED = [
  ['Plataforma completa do Método 5P', 'Os 5 módulos, os checklists e as ferramentas'],
  ['Manual Completo em PDF', 'Para baixar e consultar sem internet'],
  ['Os 3 bônus', BONUSES.map((bonus) => bonus.title.replace(/^(O |Guia da |Checklist do )/, '')).join(' · ')],
  ['Acesso vitalício', 'Novos módulos e atualizações sem custo'],
] as const;

export default function OfferSection() {
  return (
    <div className="mx-auto max-w-[1240px] px-6 sm:px-10 lg:px-16">
      <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-x-16">

        {/* A — o que sustenta a decisão */}
        <div className="lg:col-span-5 lg:col-start-1 lg:row-start-1">
          <span className="eyebrow text-amber">A oferta</span>

          <div className="mt-7 flex items-baseline gap-4">
            <span className="text-hero text-cream">R$&nbsp;39,90</span>
            <span className="text-small text-mist">uma vez só</span>
          </div>

          <p className="mt-6 max-w-sm text-lead text-mist">
            Sem assinatura e sem mensalidade. Acesso imediato e vitalício.
          </p>

          <ul className="mt-9 border-t border-cream/10">
            {INCLUDED.map(([title, detail]) => (
              <li key={title} className="flex items-baseline gap-4 border-b border-cream/10 py-4">
                <span aria-hidden="true" className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-amber" />
                <div className="min-w-0">
                  <h3 className="text-title text-cream">{title}</h3>
                  <p className="mt-1 text-small text-mist">{detail}</p>
                </div>
              </li>
            ))}
          </ul>

          <p className="mt-8 flex items-start gap-3 text-small text-cream">
            <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-amber" strokeWidth={2} />
            7 dias de garantia. Se não servir, devolvemos os R$&nbsp;39,90 integralmente.
          </p>
        </div>

        {/* B — o pagamento, aqui mesmo. No celular ele vem logo depois do preço, antes
            da lista inteira, porque quem já decidiu não deve ter de rolar para achar
            onde pagar. */}
        <div
          id="pagamento"
          className="scroll-mt-8 lg:col-span-6 lg:col-start-7 lg:row-start-1"
        >
          <span className="eyebrow text-faint">Pagamento</span>
          <div className="mt-7">
            <PaymentForm />
          </div>
          <p className="mt-6 text-[0.8125rem] leading-relaxed text-faint">
            Processado pelo Stripe, com Pix ou cartão. Os dados do seu cartão são
            enviados direto para eles e não passam por esta página. No extrato do Pix o
            recebedor aparece como <span className="text-mist">Ebanx</span>, o parceiro
            do Stripe no Brasil.
          </p>
        </div>

      </div>
    </div>
  );
}
