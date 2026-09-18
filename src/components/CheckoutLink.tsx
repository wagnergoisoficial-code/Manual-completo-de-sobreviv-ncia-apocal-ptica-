import React from 'react';
import { buildCheckoutUrl } from '../checkout';
import { trackCustomPixel } from '../pixel';

interface CheckoutLinkProps {
  /** Nome do CTA, para saber depois qual botão trouxe a venda. */
  from: string;
  className?: string;
  children: React.ReactNode;
}

/**
 * Todos os botões de compra da página passam por aqui: um único lugar que monta o
 * endereço de /checkout com o rastreio da campanha junto e registra a saída.
 *
 * Sai apenas o ClickCheckout. O InitiateCheckout nasce ao abrir /checkout, que é onde
 * a tela de pagamento realmente aparece — clique é intenção, página aberta é chegada.
 *
 * Sem target="_blank": o destino é uma rota nossa. Abrir o próprio site numa aba nova
 * duplicaria a página e deixaria a pessoa sem o botão "voltar".
 */
export default function CheckoutLink({ from, className, children }: CheckoutLinkProps) {
  return (
    <a
      href={buildCheckoutUrl()}
      onClick={() => trackCustomPixel('ClickCheckout', { content_name: from })}
      className={className}
    >
      {children}
    </a>
  );
}
