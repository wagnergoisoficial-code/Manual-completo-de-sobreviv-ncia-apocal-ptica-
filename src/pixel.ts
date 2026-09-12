/**
 * Meta Pixel — o script base (init + PageView) é carregado no <head> do index.html.
 * Este módulo dispara os eventos a partir dos componentes React.
 *
 * DE ONDE SAI CADA EVENTO
 *
 * Página de vendas:   PageView, ViewContent, Lead, ClickCheckout
 * Tela /checkout:     InitiateCheckout
 * Webhook do Stripe:  Purchase, pela Conversions API do Meta
 *
 * O InitiateCheckout nasce ao abrir /checkout, e não no clique do botão. A diferença
 * importa: o clique é intenção, a tela aberta é chegada. Medir os dois como a mesma
 * coisa inflaria o evento com quem clicou e desistiu no caminho.
 *
 * O ClickCheckout continua no clique. São nomes diferentes, então nada se sobrepõe: o
 * padrão alimenta a campanha, o próprio preserva a série histórica e ainda revela
 * quantas pessoas somem entre o botão e o formulário.
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
