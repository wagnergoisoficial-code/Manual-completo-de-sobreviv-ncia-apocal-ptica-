/**
 * A ponte entre esta página e a Kiwify.
 *
 * O visitante chega do anúncio com ?fbclid=... na URL desta página, e o Pixel guarda
 * esse clique num cookie (_fbc) do NOSSO domínio. A compra, porém, acontece noutro
 * domínio (pay.kiwify.com.br) — e cookie não atravessa domínio. O Pixel da Kiwify não
 * consegue ler nada do que foi gravado aqui.
 *
 * Resultado quando o link vai pelado: o Purchase até chega ao Meta, mas sem identificação
 * do clique. O Meta não consegue atribuir a venda ao anúncio, e ela some da coluna de
 * resultados da campanha — mesmo estando lá, aprovada, no painel da Kiwify.
 *
 * Por isso o fbclid e os UTMs viajam junto na URL.
 */
import { KIWIFY_CHECKOUT_URL } from './data';

const FORWARDED_PARAMS = [
  'fbclid',
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_content',
  'utm_term',
];

function readCookie(name: string): string | null {
  const match = document.cookie.match(new RegExp('(?:^|; )' + name + '=([^;]*)'));
  return match ? decodeURIComponent(match[1]) : null;
}

/**
 * Plano B: se o fbclid já não está mais na barra de endereço, o Pixel guardou o clique
 * no cookie _fbc, no formato fb.1.<timestamp>.<fbclid>. Dá para recuperá-lo de lá.
 */
function fbclidFromCookie(): string | null {
  const fbc = readCookie('_fbc');
  if (!fbc) return null;
  const parts = fbc.split('.');
  return parts.length >= 4 ? parts.slice(3).join('.') : null;
}

export function buildCheckoutUrl(base: string = KIWIFY_CHECKOUT_URL): string {
  if (typeof window === 'undefined') return base;

  try {
    const url = new URL(base);
    const here = new URLSearchParams(window.location.search);

    for (const key of FORWARDED_PARAMS) {
      const value = here.get(key);
      if (value) url.searchParams.set(key, value);
    }

    if (!url.searchParams.has('fbclid')) {
      const recovered = fbclidFromCookie();
      if (recovered) url.searchParams.set('fbclid', recovered);
    }

    return url.toString();
  } catch {
    // Nenhum erro de rastreamento pode derrubar o botão de compra.
    return base;
  }
}
