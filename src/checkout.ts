/**
 * A ponte entre a página de vendas e a tela de pagamento.
 *
 * O pagamento agora acontece em /checkout, dentro do nosso próprio domínio, com o
 * formulário do Stripe embutido. Isso muda o problema de atribuição: antes o
 * identificador do clique no anúncio precisava atravessar para outro domínio espremido
 * em 200 caracteres; agora ele só precisa sobreviver a uma navegação interna.
 *
 * Os cookies do Pixel (_fbc e _fbp) são do nosso domínio, então continuam legíveis em
 * /checkout sem nenhum truque. O que NÃO sobrevive são os parâmetros da URL — e é por
 * isso que eles viajam explicitamente aqui.
 */
import { CHECKOUT_URL } from './data';

/** Onde o pagamento acontece de verdade. */
const ROTA_DO_CHECKOUT = '/checkout';

/** O que precisa atravessar da página de vendas para a tela de pagamento. */
const PARAMETROS_ENCAMINHADOS = [
  'fbclid',
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_content',
  'utm_term',
];

export function readCookie(name: string): string | null {
  const match = document.cookie.match(new RegExp('(?:^|; )' + name + '=([^;]*)'));
  return match ? decodeURIComponent(match[1]) : null;
}

/**
 * O identificador do clique no anúncio, no formato que a Conversions API espera:
 * fb.1.<timestamp>.<fbclid>.
 *
 * Normalmente o próprio Pixel já gravou isso no cookie _fbc. Mas o cookie é escrito de
 * forma assíncrona, e quem clica no botão nos primeiros instantes da visita chegaria ao
 * pagamento sem ele — justamente o visitante mais quente. Por isso, quando o cookie
 * ainda não existe, o valor é remontado a partir do fbclid da barra de endereço.
 */
export function currentFbc(): string | null {
  const doCookie = readCookie('_fbc');
  if (doCookie) return doCookie;

  const fbclid = new URLSearchParams(window.location.search).get('fbclid');
  return fbclid ? `fb.1.${Date.now()}.${fbclid}` : null;
}

/**
 * O endereço da tela de pagamento, com o rastreio da campanha junto.
 *
 * Se algo der errado ao montar, devolve a rota nua: perder o rastro é ruim, perder a
 * venda é pior.
 */
export function buildCheckoutUrl(): string {
  if (typeof window === 'undefined') return ROTA_DO_CHECKOUT;

  try {
    const destino = new URL(ROTA_DO_CHECKOUT, window.location.origin);
    const aqui = new URLSearchParams(window.location.search);

    for (const chave of PARAMETROS_ENCAMINHADOS) {
      const valor = aqui.get(chave);
      if (valor) destino.searchParams.set(chave, valor);
    }

    return destino.pathname + destino.search;
  } catch {
    return ROTA_DO_CHECKOUT;
  }
}

/**
 * O checkout hospedado do Stripe, usado só como rede de segurança.
 *
 * Se a criação da sessão falhar — função fora do ar, chave errada, Stripe instável —,
 * este link continua funcionando como sempre funcionou. Nenhuma venda pode morrer por
 * causa de um soluço nosso.
 */
export function hostedCheckoutUrl(): string {
  return `${CHECKOUT_URL}?locale=pt-BR`;
}
