import React from 'react';
import { BONUSES } from '../data';
import BuyButton from './BuyButton';
import seloGarantia from '../assets/images/selo-garantia-7-dias.png';
import bannerOferta from '../assets/images/banner-oferta.jpg';
import bannerOfertaMobile from '../assets/images/banner-oferta-mobile.jpg';

/**
 * A oferta e o pagamento, no mesmo lugar.
 *
 * À esquerda fica o que sustenta a decisão — preço e o que está incluído; à direita, o
 * botão que leva ao pagamento e, colado nele, o selo de garantia.
 *
 * O pagamento acontece em /checkout, uma página nossa com o formulário do Stripe
 * embutido. Já esteve aqui dentro, nesta seção; separar foi decisão de negócio. O que
 * importa é que continua sendo página nossa: o comprador não cai numa tela branca, e a
 * sessão criada pelo nosso servidor mantém a atribuição e o controle sobre o IOF.
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

      {/* O banner abre a oferta por cima das duas colunas.
          Ele tem texto dentro da imagem, e isso decide o tratamento no celular: o
          banner inteiro espremido em ~340px deixaria o título ilegível. Lá entra um
          recorte da metade direita — título, frase e os três selos —, no tamanho em
          que dá para ler. No computador aparece inteiro.
          Mesmo acabamento do vídeo no topo da página: canto reto, fio claro e a luz
          âmbar por trás, para a imagem pousar na seção em vez de parecer colada. */}
      <figure className="relative mb-14 lg:mb-20">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -inset-8 bg-[radial-gradient(ellipse_at_center,rgba(245,158,11,0.16),transparent_70%)] blur-3xl sm:-inset-14"
        />
        <picture>
          <source media="(min-width: 640px)" srcSet={bannerOferta} />
          <img
            src={bannerOfertaMobile}
            alt="Método 5P — Manual Completo de Sobrevivência Apocalíptica, na plataforma pelo computador e pelo celular. Acesso vitalício, pagamento único e 7 dias de garantia."
            width={1086}
            height={724}
            loading="lazy"
            decoding="async"
            className="relative block aspect-[3/2] w-full object-cover shadow-[0_30px_80px_rgba(0,0,0,0.6)] ring-1 ring-cream/10 sm:aspect-[3/1]"
          />
        </picture>
      </figure>

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

        </div>

        {/* B — o pagamento, aqui mesmo. No celular ele vem logo depois do preço, antes
            da lista inteira, porque quem já decidiu não deve ter de rolar para achar
            onde pagar. */}
        <div
          id="pagamento"
          className="scroll-mt-8 lg:col-span-6 lg:col-start-7 lg:row-start-1"
        >
          <span className="eyebrow text-faint">Finalizar</span>

          <div className="mt-7">
            <BuyButton from="CTA Oferta" block>
              Quero preparar minha casa
            </BuyButton>
            <p className="mt-5 text-[0.8125rem] leading-relaxed text-faint">
              Pix ou cartão · acesso imediato no seu e-mail
            </p>
          </div>

          {/* O selo fica colado no botão de pagar, e não perto do preço: a dúvida que
              ele responde — "e se eu me arrepender?" — aparece no instante em que a
              pessoa vai confirmar, não quando ela lê o valor. */}
          <div className="mt-10 flex items-center gap-6 border-t border-cream/10 pt-8">
            <img
              src={seloGarantia}
              alt="Selo de 7 dias de garantia"
              width={120}
              height={120}
              loading="lazy"
              decoding="async"
              className="h-24 w-24 shrink-0 drop-shadow-[0_10px_24px_rgba(0,0,0,0.55)] sm:h-28 sm:w-28"
            />
            <div>
              <p className="text-title text-cream">Risco zero por 7 dias</p>
              <p className="mt-2 text-small text-mist">
                Entre, use a plataforma e baixe o manual. Se não servir, é só pedir e
                devolvemos o valor integralmente — sem precisar justificar.
              </p>
            </div>
          </div>

          {/* O aviso de que o Pix aparece como Ebanx no extrato mora só no checkout, logo
              acima do botão de gerar o Pix — é lá que a pessoa vai ver o nome no banco. Aqui
              ele seria uma dúvida a mais, na hora errada. */}
          <p className="mt-8 text-[0.8125rem] leading-relaxed text-faint">
            Pagamento seguro processado pelo Stripe.
          </p>
        </div>

      </div>
    </div>
  );
}
