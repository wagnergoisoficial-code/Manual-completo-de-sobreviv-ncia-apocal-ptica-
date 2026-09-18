import React, { useEffect } from 'react';
import { ArrowLeft, Lock } from 'lucide-react';
import PaymentForm from '../components/PaymentForm';
import Testimonials from '../components/Testimonials';
import { BONUSES } from '../data';
import { trackPixel } from '../pixel';
import seloGarantia from '../assets/images/selo-garantia-7-dias.png';

/**
 * A tela de pagamento, no nosso domínio e com a nossa cara.
 *
 * O formulário do Stripe vem num iframe — o cartão é digitado lá dentro e nunca toca
 * nesta página nem no nosso servidor. O que ganhamos é tudo o que fica EM VOLTA dele:
 * o preto da marca em vez do branco da página hospedada, o preço, a garantia e os
 * depoimentos ao lado de quem está decidindo pagar.
 *
 * ORDEM DIFERENTE NO CELULAR
 *
 * No computador o resumo fica à esquerda e o formulário à direita, lado a lado. No
 * celular não existe "ao lado": tudo vira uma coluna, e aí a ordem decide. Quem chega
 * aqui já clicou em comprar — fazer essa pessoa rolar por lista de bônus e depoimentos
 * antes de achar onde pagar seria cobrar pedágio de quem já decidiu. Por isso vem
 * preço, formulário, e só então o resto.
 */

const INCLUIDO = [
  ['Plataforma completa do Método 5P', 'Os 5 módulos, os checklists e as ferramentas'],
  ['Manual Completo em PDF', 'Para baixar e consultar sem internet'],
  ['Os 3 bônus', BONUSES.map((b) => b.title.replace(/^(O |Guia da |Checklist do )/, '')).join(' · ')],
  ['Acesso vitalício', 'Novos módulos e atualizações sem custo'],
] as const;

export default function Checkout() {
  // Chegar a esta página É chegar ao pagamento — o evento significa exatamente o que
  // promete, sem depender de rolagem nem de clique.
  useEffect(() => {
    trackPixel('InitiateCheckout', {
      content_name: 'Checkout — Método 5P',
      value: 39.9,
      currency: 'BRL',
    });
  }, []);

  return (
    <div className="grain min-h-screen bg-night text-cream">

      <header className="border-b border-cream/10">
        <div className="mx-auto flex max-w-[1160px] items-center justify-between gap-6 px-6 py-5 sm:px-10">
          <a
            href="/"
            className="group flex items-center gap-2.5 text-[0.8125rem] text-mist transition-colors hover:text-cream"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" strokeWidth={2} />
            Voltar
          </a>
          <span className="flex items-center gap-2 text-[0.8125rem] text-faint">
            <Lock className="h-3.5 w-3.5 shrink-0" strokeWidth={2} />
            Pagamento seguro
          </span>
        </div>
      </header>

      <main className="mx-auto max-w-[1160px] px-6 py-12 sm:px-10 lg:py-16">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-x-14">

          {/* A — o que está sendo comprado */}
          <div className="lg:col-span-5 lg:col-start-1 lg:row-start-1">
            <span className="eyebrow text-amber">Seu acesso</span>
            <h1 className="mt-5 max-w-[18ch] text-section text-cream">
              Método 5P — Manual Completo
            </h1>
            <div className="mt-6 flex items-baseline gap-3">
              <span className="text-hero text-cream">R$&nbsp;39,90</span>
              <span className="text-small text-mist">uma vez só</span>
            </div>
            <p className="mt-4 max-w-[38ch] text-small text-mist">
              Sem assinatura e sem mensalidade. O acesso é liberado assim que o pagamento
              é confirmado.
            </p>
          </div>

          {/* B — o formulário. No celular vem logo depois do preço. */}
          <div className="lg:col-span-6 lg:col-start-7 lg:row-span-2 lg:row-start-1">
            <div className="lg:sticky lg:top-8">
              <PaymentForm />
              <p className="mt-6 text-[0.8125rem] leading-relaxed text-faint">
                Processado pelo Stripe, com Pix ou cartão. Os dados do seu cartão vão
                direto para eles e não passam por esta página. No Pix são pedidos nome e
                CPF — o padrão para o banco identificar o pagamento. No extrato, o
                recebedor aparece como <span className="text-mist">Ebanx</span>, o
                parceiro do Stripe no Brasil.
              </p>
            </div>
          </div>

          {/* C — o que sustenta a decisão de quem ainda hesita */}
          <div className="lg:col-span-5 lg:col-start-1 lg:row-start-2">

            <div className="flex items-center gap-5 border-y border-cream/10 py-7">
              <img
                src={seloGarantia}
                alt="Selo de 7 dias de garantia"
                width={112}
                height={112}
                loading="lazy"
                decoding="async"
                className="h-20 w-20 shrink-0 drop-shadow-[0_10px_24px_rgba(0,0,0,0.55)] sm:h-24 sm:w-24"
              />
              <div>
                <p className="text-title text-cream">Risco zero por 7 dias</p>
                <p className="mt-2 text-small text-mist">
                  Se não servir, é só pedir e devolvemos o valor integralmente — sem
                  precisar justificar.
                </p>
              </div>
            </div>

            <span className="eyebrow mt-10 block text-faint">O que está incluído</span>
            <ul className="mt-6 border-t border-cream/10">
              {INCLUIDO.map(([titulo, detalhe]) => (
                <li key={titulo} className="flex items-baseline gap-4 border-b border-cream/10 py-4">
                  <span aria-hidden="true" className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-amber" />
                  <div className="min-w-0">
                    <h2 className="text-title text-cream">{titulo}</h2>
                    <p className="mt-1 text-small text-mist">{detalhe}</p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-12">
              <span className="eyebrow block text-faint">Quem já entrou</span>
              <div className="mt-7">
                {/* Sem a anotação manuscrita: nesta coluna estreita ela cairia por cima
                    do print, e anotação que atropela o que comenta vira defeito. */}
                <Testimonials comAnotacao={false} />
              </div>
            </div>

          </div>

        </div>
      </main>
    </div>
  );
}
