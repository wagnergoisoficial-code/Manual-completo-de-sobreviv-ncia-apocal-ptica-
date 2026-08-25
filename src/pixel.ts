/**
 * Meta Pixel — o script base (init + PageView) é carregado no <head> do index.html.
 * Este módulo dispara os eventos a partir dos componentes React.
 *
 * DIVISÃO DE RESPONSABILIDADE ENTRE OS DOIS DOMÍNIOS
 *
 * Esta página (topo do funil):     PageView, ViewContent, Lead, ClickCheckout
 * Kiwify (fundo do funil):         InitiateCheckout, Purchase
 *
 * O InitiateCheckout NÃO sai daqui de propósito. Ele significa "a pessoa chegou à tela
 * de pagamento", e isso acontece no domínio da Kiwify — se os dois lados disparassem o
 * mesmo evento com o mesmo Pixel ID, cada comprador seria contado duas vezes e a taxa de
 * conversão do funil ficaria impossível de ler.
 *
 * O clique no botão daqui vira ClickCheckout, um evento próprio (trackCustom). Ele mede
 * a taxa página → checkout sem contaminar o evento padrão que a campanha usa.
 *
 * O Purchase também não sai daqui: o pagamento acontece na Kiwify, e o mesmo Pixel ID
 * precisa estar configurado no painel dela — de preferência com a API de Conversões
 * ligada, para a venda por PIX não depender de o comprador voltar à tela de obrigado.
 */

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

/** Eventos padrão do Meta que esta página tem o direito de disparar. */
type PixelEvent = 'ViewContent' | 'Lead';

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
