/**
 * Meta Pixel — o script base (init + PageView) é carregado no <head> do index.html.
 * Este módulo dispara os eventos a partir dos componentes React.
 *
 * DE ONDE SAI CADA EVENTO
 *
 * Página de vendas:   PageView, ViewContent, Lead, ClickCheckout
 * Página /checkout:   InitiateCheckout, AddPaymentInfo e, quando o pagamento é
 *                     aprovado com a pessoa ainda na tela, Purchase
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
 * O PURCHASE SAI DE DOIS LUGARES, E ISSO É DE PROPÓSITO
 *
 * O webhook é a fonte que não falha: o dinheiro entrou, então a venda existe mesmo que
 * o comprador feche o navegador. O navegador é a fonte rica: leva os cookies do Pixel
 * e a sessão real da pessoa, o que o Meta usa para casar a venda com o anúncio.
 *
 * Os dois mandam o MESMO event_id — o id do PaymentIntent do Stripe. É assim que o
 * Meta reconhece um único evento em vez de contar a venda duas vezes.
 */

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

/** Eventos padrão do Meta que esta página tem o direito de disparar. */
type PixelEvent = 'ViewContent' | 'Lead' | 'InitiateCheckout' | 'AddPaymentInfo' | 'Purchase';

/**
 * A chave de desduplicação. Só faz sentido no Purchase, que também sai do servidor:
 * mesmo event_id nos dois lados, uma venda contada uma vez só.
 */
interface PixelOptions {
  eventID: string;
}

/** Eventos próprios, fora do vocabulário padrão do Meta. */
type CustomPixelEvent = 'ClickCheckout';

export function trackPixel(
  event: PixelEvent,
  params?: Record<string, unknown>,
  options?: PixelOptions,
): void {
  // O fbq pode não existir se um bloqueador de anúncios travar o script base.
  if (options) window.fbq?.('track', event, params, options);
  else window.fbq?.('track', event, params);
}

export function trackCustomPixel(event: CustomPixelEvent, params?: Record<string, unknown>): void {
  // Evento próprio exige trackCustom: o track só aceita o vocabulário padrão do Meta.
  window.fbq?.('trackCustom', event, params);
}
