/**
 * Meta Pixel — o script base (init + PageView) é carregado no <head> do index.html.
 * Este módulo apenas dispara os eventos de conversão a partir dos componentes React.
 *
 * O evento Purchase NÃO é disparado aqui: o pagamento acontece no domínio da Kiwify,
 * por isso o mesmo Pixel ID precisa de estar configurado no painel da Kiwify.
 */

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

type PixelEvent = 'InitiateCheckout' | 'Lead' | 'ViewContent';

export function trackPixel(event: PixelEvent, params?: Record<string, unknown>): void {
  // O fbq pode não existir se um bloqueador de anúncios travar o script base.
  window.fbq?.('track', event, params);
}
