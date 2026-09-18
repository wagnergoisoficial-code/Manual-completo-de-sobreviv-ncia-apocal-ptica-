/**
 * Meta Pixel — o script base (init + PageView) é carregado no <head> do index.html.
 * Este módulo dispara os eventos a partir dos componentes React.
 *
 * DE ONDE SAI CADA EVENTO
 *
 * Página de vendas:   PageView, ViewContent, Lead, ClickCheckout
 * Página /checkout:   InitiateCheckout
 * Webhook do Stripe:  Purchase, pela Conversions API do Meta
 *
 * O InitiateCheckout nasce ao abrir /checkout. É o significado exato do evento — "a
 * pessoa chegou à tela de pagamento" —, e só é possível porque essa tela é nossa. No
 * formulário hospedado pelo Stripe não há como instalar pixel.
 *
 * O ClickCheckout continua no clique do botão. São nomes diferentes, então nada se
 * sobrepõe: o padrão alimenta a campanha, o próprio revela quantas pessoas somem entre
 * o botão e a tela de pagamento.
 *
 * O Purchase sai do servidor, do webhook do Stripe, e não do navegador: só o webhook
 * tem a confirmação de que o dinheiro entrou — no Pix ela chega minutos depois, com a
 * página possivelmente já fechada. Para o Meta ligar a venda ao anúncio, a função que
 * cria a sessão grava fbc, fbp, IP e user-agent do comprador nos metadados dela.
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
