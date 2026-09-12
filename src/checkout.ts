/**
 * Os dados de atribuição da campanha, e para onde os botões de compra apontam.
 *
 * O pagamento acontece numa seção da própria página de vendas, com o formulário do
 * Stripe embutido. Como ninguém navega para lugar nenhum, o problema que existia antes
 * — fazer o identificador do clique no anúncio atravessar para outro domínio — deixou
 * de existir: os cookies do Pixel e a query da URL continuam onde sempre estiveram, e
 * o formulário os lê na hora de criar a sessão.
 */
import { CHECKOUT_URL } from './data';

/**
 * Onde o pagamento acontece: uma seção desta mesma página.
 *
 * Não há navegação nem parâmetro para encaminhar — o comprador não sai do lugar, então
 * os cookies do Pixel e a query da URL continuam exatamente onde estavam.
 */
const ANCORA_DO_PAGAMENTO = '#pagamento';

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

/** O destino dos botões de compra: a seção de pagamento, nesta mesma página. */
export function buildCheckoutUrl(): string {
  return ANCORA_DO_PAGAMENTO;
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
