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
 * Todo caminho desta página para a Kiwify passa por aqui: um único lugar que monta a URL
 * com o fbclid e registra a saída.
 *
 * O evento é ClickCheckout, próprio nosso — e não o InitiateCheckout padrão. Quem dispara
 * InitiateCheckout é a Kiwify, quando a tela de pagamento abre de verdade. Sair um clique
 * daqui não é o mesmo que chegar lá, e tratar as duas coisas como o mesmo evento é o que
 * produz número impossível no relatório.
 */
export default function CheckoutLink({ from, className, children }: CheckoutLinkProps) {
  return (
    <a
      href={buildCheckoutUrl()}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackCustomPixel('ClickCheckout', { content_name: from })}
      className={className}
    >
      {children}
    </a>
  );
}
