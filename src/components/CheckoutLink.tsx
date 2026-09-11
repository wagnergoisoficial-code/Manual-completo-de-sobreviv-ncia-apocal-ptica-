import React from 'react';
import { buildCheckoutUrl } from '../checkout';
import { trackPixel, trackCustomPixel } from '../pixel';

interface CheckoutLinkProps {
  /** Nome do CTA, para saber depois qual botão trouxe a venda. */
  from: string;
  className?: string;
  children: React.ReactNode;
}

/**
 * Todo caminho desta página para o pagamento passa por aqui: um único lugar que monta a
 * URL do Stripe com o rastreio embutido e registra a saída.
 *
 * Saem dois eventos no mesmo clique, de propósito:
 *
 *   InitiateCheckout  evento padrão do Meta, o que a campanha usa para otimizar. Ele
 *                     nasce aqui porque o clique abre a tela de pagamento do Stripe, e
 *                     lá dentro não é possível instalar pixel — se não sair daqui, não
 *                     sai de lugar nenhum.
 *   ClickCheckout     evento próprio, que já vinha sendo medido antes da troca de
 *                     processador. Fica para a série histórica não se partir ao meio.
 */
export default function CheckoutLink({ from, className, children }: CheckoutLinkProps) {
  return (
    <a
      href={buildCheckoutUrl()}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => {
        trackPixel('InitiateCheckout', {
          content_name: from,
          value: 39.9,
          currency: 'BRL',
        });
        trackCustomPixel('ClickCheckout', { content_name: from });
      }}
      className={className}
    >
      {children}
    </a>
  );
}
