import React from 'react';
import { ArrowRight } from 'lucide-react';
import CheckoutLink from './CheckoutLink';

/**
 * O único botão de compra da página, em duas intensidades.
 *
 * Ele encapsula o CheckoutLink em vez de substituí-lo: a montagem da URL com fbclid e o
 * disparo do ClickCheckout continuam num lugar só. Aqui mora apenas a forma — a pílula
 * âmbar, que na página inteira significa "esta é a ação".
 */
interface BuyButtonProps {
  /** Nome do CTA, para saber depois qual botão trouxe a venda. */
  from: string;
  children: React.ReactNode;
  variant?: 'solid' | 'ghost';
  /** No celular o botão ocupa a largura toda; no desktop se ajusta ao texto. */
  block?: boolean;
  className?: string;
}

const BASE =
  'group inline-flex items-center justify-center gap-2.5 rounded-full font-semibold ' +
  'px-8 py-4 text-[0.9375rem] tracking-[-0.01em] transition-colors duration-200';

const VARIANTS = {
  solid: 'bg-amber text-night hover:bg-amber-bright',
  ghost: 'border border-cream/25 text-cream hover:border-amber hover:text-amber',
} as const;

export default function BuyButton({
  from,
  children,
  variant = 'solid',
  block = false,
  className = '',
}: BuyButtonProps) {
  return (
    <CheckoutLink
      from={from}
      className={`${BASE} ${VARIANTS[variant]} ${block ? 'w-full sm:w-auto' : ''} ${className}`}
    >
      {children}
      <ArrowRight
        className="w-4 h-4 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5"
        strokeWidth={2.25}
      />
    </CheckoutLink>
  );
}
