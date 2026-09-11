/**
 * A ponte entre esta página e o checkout do Stripe.
 *
 * O PROBLEMA QUE ESTE MÓDULO RESOLVE
 *
 * O Stripe hospeda o checkout na infraestrutura dele e não permite injetar pixel nenhum.
 * O comprador sai daqui, paga em outro domínio e nunca mais volta — então o Purchase
 * precisa ser enviado pelo servidor, pela Conversions API, a partir do webhook que o
 * Stripe chama quando o pagamento é confirmado.
 *
 * Só que o servidor não sabe de que anúncio aquela pessoa veio. Essa informação existe
 * apenas aqui, no navegador, nos cookies que o Pixel gravou. Ela precisa atravessar a
 * fronteira junto com o comprador, e o Stripe oferece exatamente um canal para isso: o
 * `client_reference_id`, devolvido no evento `checkout.session.completed`. É o que este
 * módulo monta.
 *
 * REGRAS DO STRIPE QUE MOLDARAM ESTE CÓDIGO (verificadas na documentação)
 *
 *   · utm_source, utm_medium, utm_campaign, utm_content e utm_term são suportados de
 *     verdade e ainda são repassados à URL de redirecionamento pós-pagamento.
 *   · client_reference_id aceita apenas [A-Za-z0-9_-] e no máximo 200 caracteres.
 *   · Valores inválidos são descartados em silêncio: a página de pagamento continua
 *     funcionando. Nada aqui pode derrubar uma venda — no pior caso, perde-se o rastro.
 *   · fbclid solto não serve para nada no Stripe; por isso ele vai empacotado.
 */
import { CHECKOUT_URL } from './data';

/** Os únicos parâmetros que o Stripe reconhece como rastreio de campanha. */
const UTM_PARAMS = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_content',
  'utm_term',
];

/**
 * Versão do formato do client_reference_id.
 *
 * O webhook precisa saber como desempacotar o que chegou. Se um dia o conteúdo mudar,
 * o prefixo muda junto e o servidor continua sabendo ler o formato antigo.
 */
const REF_FORMAT = 'fb1';

function readCookie(name: string): string | null {
  const match = document.cookie.match(new RegExp('(?:^|; )' + name + '=([^;]*)'));
  return match ? decodeURIComponent(match[1]) : null;
}

/**
 * O identificador do clique no anúncio, no formato que a Conversions API espera:
 * fb.1.<timestamp>.<fbclid>.
 *
 * Normalmente o próprio Pixel já gravou isso no cookie _fbc. Mas o cookie é escrito de
 * forma assíncrona, e quem clica no botão nos primeiros instantes da visita chegaria ao
 * checkout sem ele — justamente o visitante mais quente. Por isso, quando o cookie ainda
 * não existe, o valor é remontado a partir do fbclid que está na barra de endereço.
 */
function currentFbc(): string | null {
  const fromCookie = readCookie('_fbc');
  if (fromCookie) return fromCookie;

  const fbclid = new URLSearchParams(window.location.search).get('fbclid');
  return fbclid ? `fb.1.${Date.now()}.${fbclid}` : null;
}

/** Base64 na variante URL-safe — que por acaso é exatamente o alfabeto do Stripe. */
function toBase64Url(input: string): string | null {
  try {
    return btoa(input).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  } catch {
    // btoa quebra fora de Latin-1. Não deveria acontecer com identificadores do Meta,
    // mas perder o rastro é infinitamente melhor do que perder a venda.
    return null;
  }
}

/**
 * Empacota os identificadores do Meta num único valor que o Stripe aceita carregar.
 *
 * Os dois valores são separados por "|" e o conjunto é codificado em base64url, porque
 * o formato original tem pontos — e ponto não passa pelo filtro do client_reference_id.
 */
function buildClientReference(): string | null {
  const fbc = currentFbc();
  const fbp = readCookie('_fbp');
  if (!fbc && !fbp) return null;

  const encoded = toBase64Url(`${fbc ?? ''}|${fbp ?? ''}`);
  if (!encoded) return null;

  const value = `${REF_FORMAT}-${encoded}`;
  // Acima de 200 o Stripe descarta o campo inteiro. Melhor não enviar do que enviar
  // algo que será jogado fora sem aviso.
  return value.length <= 200 ? value : null;
}

export function buildCheckoutUrl(base: string = CHECKOUT_URL): string {
  if (typeof window === 'undefined') return base;

  try {
    const url = new URL(base);
    const here = new URLSearchParams(window.location.search);

    for (const key of UTM_PARAMS) {
      const value = here.get(key);
      if (value) url.searchParams.set(key, value);
    }

    // O checkout do Stripe abre em inglês por padrão, inclusive o preço (R$39.90 em vez
    // de R$ 39,90). Para quem está comprando em português, isso é um tranco de confiança
    // bem no último passo.
    url.searchParams.set('locale', 'pt-BR');

    const clientReference = buildClientReference();
    if (clientReference) url.searchParams.set('client_reference_id', clientReference);

    return url.toString();
  } catch {
    // Nenhum erro de rastreamento pode derrubar o botão de compra.
    return base;
  }
}
