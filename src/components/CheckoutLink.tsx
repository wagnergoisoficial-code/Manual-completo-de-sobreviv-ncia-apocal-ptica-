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
 * Todos os botões de compra da página passam por aqui. Eles não levam a lugar nenhum:
 * rolam até a seção de pagamento, que está nesta mesma página.
 *
 * Sai apenas o ClickCheckout. O InitiateCheckout nasce quando o formulário entra em
 * cena, e não no clique — clique é intenção, formulário à vista é chegada.
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
