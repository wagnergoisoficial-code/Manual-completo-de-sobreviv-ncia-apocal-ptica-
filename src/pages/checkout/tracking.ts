import { TrackingData } from "./types";
import { trackPixel } from "../../pixel";

/**
 * O rastreio desta página.
 *
 * Os eventos passam pelo pixel.ts, que é o único lugar do site que toca no fbq. Aqui
 * ficam só os nomes e os parâmetros de cada evento do checkout, para que a leitura
 * deste arquivo diga o que a página conta ao Meta e em que momento.
 */

const PRODUTO = "Plataforma Método 5P + Manual de Sobrevivência (PDF)";

/** Lê o valor de um cookie pelo nome. */
function getCookie(name: string): string | undefined {
  if (typeof document === "undefined") return undefined;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift();
  return undefined;
}

/**
 * Coleta os parâmetros de campanha que vieram na URL e os cookies do Pixel.
 *
 * O _fbc é remontado a partir do fbclid quando o cookie ainda não existe: ele é gravado
 * de forma assíncrona, e quem chega e age nos primeiros instantes sairia daqui sem o
 * identificador do clique — justamente a visita mais quente.
 */
export function getTrackingParams(): TrackingData {
  if (typeof window === "undefined") return {};

  const urlParams = new URLSearchParams(window.location.search);
  const utm_source = urlParams.get("utm_source") || undefined;
  const utm_medium = urlParams.get("utm_medium") || undefined;
  const utm_campaign = urlParams.get("utm_campaign") || undefined;
  const utm_content = urlParams.get("utm_content") || undefined;
  const utm_term = urlParams.get("utm_term") || undefined;
  const fbclid = urlParams.get("fbclid") || undefined;

  const _fbp = getCookie("_fbp");
  const _fbc = getCookie("_fbc") || (fbclid ? `fb.1.${Date.now()}.${fbclid}` : undefined);

  return {
    utm_source,
    utm_medium,
    utm_campaign,
    utm_content,
    utm_term,
    fbclid,
    _fbp,
    _fbc,
  };
}

/**
 * UM InitiateCheckout POR VISITA
 *
 * "Visita" é a aba: da primeira vez que ela abre o checkout até ser fechada. Recarregar,
 * voltar da tela do Pix ou ir à página de vendas e retornar não é outra pessoa chegando
 * ao pagamento — e contar de novo inflaria justamente o número que a campanha usa para
 * aprender quem está perto de comprar.
 *
 * A marca fica em dois lugares. Na memória do módulo, que sobrevive a qualquer remontagem
 * do React dentro da mesma carga. E no sessionStorage, que sobrevive ao recarregar.
 *
 * O event_id é o mesmo durante toda a visita. O Meta recebe cada evento duas vezes —
 * pelo navegador e pelo canal de servidor que o próprio pixel mantém — e é por esse id
 * que ele reconhece os dois como um só.
 */
const CHAVE_DA_VISITA = "checkout:initiate_checkout";
let idEnviadoNestaCarga: string | null = null;

function novoId(): string {
  try {
    return `ic-${crypto.randomUUID()}`;
  } catch {
    // randomUUID só existe em contexto seguro. Em produção sempre é; aqui é só garantia.
    return `ic-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
  }
}

/** A pessoa chegou à tela de pagamento — conta uma vez só por visita. */
export function trackInitiateCheckout(value: number = 39.9, currency: string = "BRL") {
  if (idEnviadoNestaCarga) return;

  let eventId: string | null = null;
  try {
    eventId = sessionStorage.getItem(CHAVE_DA_VISITA);
  } catch {
    // Navegação privada pode bloquear o armazenamento: sobra a marca em memória.
  }

  if (eventId) {
    idEnviadoNestaCarga = eventId;
    return;
  }

  eventId = novoId();
  idEnviadoNestaCarga = eventId;
  try {
    sessionStorage.setItem(CHAVE_DA_VISITA, eventId);
  } catch {
    // Idem: sem armazenamento, vale a marca em memória.
  }

  trackPixel(
    "InitiateCheckout",
    {
      value,
      currency,
      content_name: PRODUTO,
      content_category: "Educação / Preparação",
    },
    { eventID: eventId },
  );
}

/** A pessoa escolheu como pagar e apertou o botão. */
export function trackAddPaymentInfo(paymentMethod: "pix" | "credit_card", value: number = 39.9) {
  trackPixel("AddPaymentInfo", {
    value,
    currency: "BRL",
    content_name: PRODUTO,
    payment_type: paymentMethod === "pix" ? "Pix" : "Cartão de Crédito",
  });
}

/**
 * O pagamento foi aprovado com a pessoa ainda na tela.
 *
 * O mesmo evento sai do webhook, pela Conversions API. O event_id — o id do
 * PaymentIntent — é o que faz o Meta entender que são o mesmo acontecimento.
 */
export function trackBrowserPurchase(eventId: string, value: number = 39.9, currency: string = "BRL") {
  trackPixel(
    "Purchase",
    { value, currency, content_name: PRODUTO, content_type: "product" },
    { eventID: eventId },
  );
}
