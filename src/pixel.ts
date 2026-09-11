/**
 * Meta Pixel — o script base (init + PageView) é carregado no <head> do index.html.
 * Este módulo dispara os eventos a partir dos componentes React.
 *
 * DE ONDE SAI CADA EVENTO
 *
 * Esta página:         PageView, ViewContent, Lead, InitiateCheckout, ClickCheckout
 * Checkout do Stripe:  nada — é impossível instalar pixel lá
 * Webhook do Stripe:   Purchase, pela Conversions API do Meta
 *
 * O InitiateCheckout sai do clique no botão de compra. Ele significa "a pessoa chegou à
 * tela de pagamento", e o clique aqui leva direto a ela. Como o checkout é hospedado
 * pelo Stripe e não aceita pixel, se o evento não sair daqui não sai de lugar nenhum —
 * e a campanha perde o sinal que usa para otimizar.
 *
 * O ClickCheckout sai no mesmo clique. São nomes diferentes, então não há inflação de
 * métrica: o padrão alimenta a campanha, o próprio preserva a série histórica.
 *
 * O Purchase não pode nascer no navegador: o comprador termina a compra fora do nosso
 * domínio e nunca mais volta. Ele é enviado pelo servidor, do webhook do Stripe. Para
 * que o Meta consiga ligar essa venda ao anúncio que a gerou, o checkout.ts empacota os
 * identificadores do clique no client_reference_id — é o que atravessa a fronteira.
 */

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

/** Eventos padrão do Meta que esta página tem o direito de disparar. */
type PixelEvent = 'ViewContent' | 'Lead' | 'InitiateCheckout';

/** Eventos próprios, fora do vocabulário padrão do Meta. */
type CustomPixelEvent = 'ClickCheckout';

export function trackPixel(event: PixelEvent, params?: Record<string, unknown>): void {
  // O fbq pode não existir se um bloqueador de anúncios travar o script base.
  window.fbq?.('track', event, params);
}

export function trackCustomPixel(event: CustomPixelEvent, params?: Record<string, unknown>): void {
  // Evento próprio exige trackCustom: o track só aceita o vocabulário padrão do Meta.
  window.fbq?.('trackCustom', event, params);
}
