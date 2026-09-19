/**
 * O motor da página de checkout: preço e criação da cobrança no Stripe.
 *
 * DUAS OPERAÇÕES, UMA FUNÇÃO
 *
 *   GET  /api/pagamento   → quanto custa (lido do Price do Stripe, não daqui)
 *   POST /api/pagamento   → cria a cobrança e devolve o client_secret
 *
 * POR QUE PAYMENT INTENT E NÃO CHECKOUT SESSION
 *
 * A sessão de checkout traz junto a interface do Stripe. Esta página tem a sua própria
 * — formulário, abas de Pix e cartão, tela do QR Code —, e para desenhá-la precisamos
 * do nível de baixo: o PaymentIntent, que devolve o código Pix cru para a página
 * mostrar do jeito dela.
 *
 * REGRA INEGOCIÁVEL
 *
 * O preço nunca vem do navegador. Ele vive num Price do Stripe e é lido aqui. Aceitar
 * valor do cliente é deixar o comprador digitar quanto quer pagar.
 *
 * O QUE ESTA FUNÇÃO GANHA DE QUEBRA
 *
 * Quem a chama é o navegador do próprio comprador, então o IP e o user-agent dos
 * cabeçalhos são DELE. São os dois sinais que faltavam para a Conversions API do Meta
 * casar a venda com a pessoa que viu o anúncio — por isso eles vão para o metadata, de
 * onde o webhook os lê na hora de mandar o Purchase.
 */

const STRIPE_API = "https://api.stripe.com/v1";

/**
 * Versão da API fixada nesta chamada.
 *
 * Fixar por requisição, e não mudar o padrão da conta no painel: o padrão vale para
 * TUDO, inclusive o formato dos eventos que chegam no webhook da plataforma — o mesmo
 * webhook que libera o acesso de quem comprou.
 */
const STRIPE_VERSION = "2026-03-25.dahlia";

const SECRET_KEY = process.env.STRIPE_SECRET_KEY;
const PRICE_ID = process.env.STRIPE_PRICE_ID;

/**
 * Quanto tempo o código Pix vale.
 *
 * A tela mostra um relógio em contagem regressiva, e o relógio precisa dizer a verdade:
 * este número é o mesmo que alimenta aquele mostrador. O padrão do Stripe são 4 horas —
 * tempo demais para uma decisão que já foi tomada, e que só esfria.
 */
const PIX_VALIDADE_SEGUNDOS = 1800;

/**
 * Quem paga o IOF de 3,5% do Pix.
 *
 * A conta Stripe é dos EUA, então toda compra por Pix de um brasileiro é uma transação
 * internacional e o IOF incide. No padrão do Stripe ("never"), ele é somado por cima e o
 * comprador vê R$ 41,30 no app do banco depois de ter decidido comprar por R$ 39,90.
 *
 * Com "always" nós absorvemos a taxa: o banco pede exatamente o preço anunciado, e os
 * 3,5% saem da nossa margem. É decisão comercial, não técnica — por isso vive numa
 * variável de ambiente, e o padrão não muda nada em silêncio.
 */
const ABSORVER_IOF = process.env.PIX_ABSORVER_IOF === "true";

/** Stripe fala form-urlencoded, inclusive para as chaves aninhadas. */
function paraFormulario(objeto, prefixo = "", acumulador = new URLSearchParams()) {
  for (const [chave, valor] of Object.entries(objeto)) {
    if (valor === undefined || valor === null || valor === "") continue;
    const nome = prefixo ? `${prefixo}[${chave}]` : chave;
    if (typeof valor === "object" && !Array.isArray(valor)) {
      paraFormulario(valor, nome, acumulador);
    } else {
      acumulador.append(nome, String(valor));
    }
  }
  return acumulador;
}

async function falarComStripe(caminho, corpo) {
  const resposta = await fetch(`${STRIPE_API}${caminho}`, {
    method: corpo ? "POST" : "GET",
    headers: {
      Authorization: `Bearer ${SECRET_KEY}`,
      "Content-Type": "application/x-www-form-urlencoded",
      "Stripe-Version": STRIPE_VERSION,
    },
    body: corpo ? paraFormulario(corpo).toString() : undefined,
  });
  return { ok: resposta.ok, dados: await resposta.json() };
}

/**
 * O preço, lido uma vez por instância.
 *
 * A função fica viva entre requisições, então guardar aqui poupa uma ida ao Stripe em
 * toda abertura da página. Se a leitura falhar, nada fica em cache — a próxima tentativa
 * recomeça limpa em vez de repetir um erro para sempre.
 */
let precoEmCache = null;

async function lerPreco() {
  if (precoEmCache) return precoEmCache;

  const { ok, dados } = await falarComStripe(`/prices/${encodeURIComponent(PRICE_ID)}`);
  if (!ok || typeof dados?.unit_amount !== "number") {
    throw new Error(dados?.error?.message || "preço não pôde ser lido");
  }

  precoEmCache = { amount: dados.unit_amount, currency: dados.currency };
  return precoEmCache;
}

/**
 * O IP de quem está comprando.
 *
 * A Netlify entrega o IP real em x-nf-client-connection-ip. O x-forwarded-for é o plano
 * B, e nele o primeiro endereço da lista é o do cliente — os seguintes são proxies.
 */
function ipDoComprador(headers) {
  const direto = headers["x-nf-client-connection-ip"];
  if (direto) return direto;
  const encadeado = headers["x-forwarded-for"];
  return encadeado ? encadeado.split(",")[0].trim() : undefined;
}

/** Aceita só o que reconhecemos, com tamanho limitado. Nada do navegador entra cru. */
function saneado(valor, limite = 255) {
  return typeof valor === "string" && valor.trim() ? valor.trim().slice(0, limite) : undefined;
}

/** Diz QUAL variável falta, e não apenas que algo falta. Nome de variável não é segredo. */
function configuracaoIncompleta() {
  const faltando = [
    !SECRET_KEY && "STRIPE_SECRET_KEY",
    !PRICE_ID && "STRIPE_PRICE_ID",
  ].filter(Boolean);

  if (faltando.length) {
    return { error: "Pagamento não configurado", faltando };
  }

  // Confusão fácil e cara: um produto pode ter vários preços, então o Stripe não aceita
  // prod_ aqui — ele precisa saber QUAL valor cobrar.
  if (!PRICE_ID.startsWith("price_")) {
    return {
      error: "Pagamento não configurado",
      motivo:
        `STRIPE_PRICE_ID está com "${PRICE_ID}". Isso é um ID de produto, não de preço. ` +
        `O valor correto começa com "price_" e fica em Stripe > Produtos > (o produto) > tabela de preços.`,
    };
  }

  return null;
}

const json = (statusCode, corpo) => ({
  statusCode,
  headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
  body: JSON.stringify(corpo),
});

export const handler = async (event) => {
  const problema = configuracaoIncompleta();
  if (problema) {
    console.error("Configuração incompleta:", problema.faltando?.join(", ") || problema.motivo);
    return json(500, problema);
  }

  if (event.httpMethod === "GET") {
    try {
      return json(200, await lerPreco());
    } catch (err) {
      console.error("Não foi possível ler o preço:", err?.message || err);
      return json(502, { error: "Não foi possível ler o preço", motivo: err?.message });
    }
  }

  if (event.httpMethod !== "POST") {
    return json(405, { error: "Método não permitido" });
  }

  let corpo = {};
  try {
    corpo = JSON.parse(event.body || "{}");
  } catch {
    corpo = {};
  }

  const metodo = corpo.metodo === "cartao" ? "card" : "pix";
  const cliente = corpo.cliente || {};
  const rastreio = corpo.rastreio || {};

  const email = saneado(cliente.email, 320);
  if (!email) {
    return json(400, { error: "E-mail é obrigatório para enviar o acesso." });
  }

  let preco;
  try {
    preco = await lerPreco();
  } catch (err) {
    console.error("Não foi possível ler o preço:", err?.message || err);
    return json(502, { error: "Não foi possível abrir o pagamento", motivo: err?.message });
  }

  const parametros = {
    amount: preco.amount,
    currency: preco.currency,
    "payment_method_types[0]": metodo,
    description: "Plataforma Método 5P + Manual Completo de Sobrevivência (PDF)",

    // É daqui que o webhook tira para quem mandar a senha de acesso.
    receipt_email: email,

    // O que o webhook vai precisar para contar a venda ao Meta já atribuída ao anúncio.
    //
    // O CPF não está aqui de propósito: ele é exigido pelo Banco Central para emitir o
    // Pix e vai direto do navegador para o Stripe, no momento de confirmar. Guardá-lo
    // também no nosso metadata seria manter um dado sensível onde ele não faz falta.
    metadata: {
      // A marca de quem criou esta cobrança.
      //
      // O link hospedado do Stripe — a rede de segurança desta página — também gera um
      // PaymentIntent, e o webhook da plataforma escuta os dois caminhos. Sem esta
      // marca ele trataria a mesma compra duas vezes: uma pela sessão do checkout
      // hospedado, outra pelo PaymentIntent dela. É por aqui que ele sabe distinguir.
      origem: "checkout-proprio",
      email,
      nome: saneado(cliente.nome, 120),
      telefone: saneado(cliente.telefone, 30),
      fbc: saneado(rastreio.fbc),
      fbp: saneado(rastreio.fbp),
      client_ip: ipDoComprador(event.headers || {}),
      client_user_agent: saneado(event.headers?.["user-agent"], 500),
      utm_source: saneado(rastreio.utm_source),
      utm_medium: saneado(rastreio.utm_medium),
      utm_campaign: saneado(rastreio.utm_campaign),
      utm_content: saneado(rastreio.utm_content),
      utm_term: saneado(rastreio.utm_term),
    },
  };

  if (metodo === "pix") {
    parametros["payment_method_options[pix][expires_after_seconds]"] = PIX_VALIDADE_SEGUNDOS;
    if (ABSORVER_IOF) {
      parametros["payment_method_options[pix][amount_includes_iof]"] = "always";
    }
  }

  try {
    const { ok, dados } = await falarComStripe("/payment_intents", parametros);

    if (!ok) {
      // Devolvemos a mensagem do Stripe junto: ela descreve um erro de configuração
      // NOSSA e é o que diz o que corrigir. Sem isso, o diagnóstico depende de abrir o
      // log do Netlify. O Stripe nunca ecoa a chave secreta numa mensagem de erro.
      const motivo = dados?.error?.message;
      console.error(`Stripe recusou a cobrança (${metodo}):`, motivo);
      return json(502, { error: "Não foi possível abrir o pagamento", motivo, codigo: dados?.error?.code });
    }

    return json(200, {
      client_secret: dados.client_secret,
      id: dados.id,
      amount: dados.amount,
      currency: dados.currency,
    });
  } catch (err) {
    console.error("Erro ao falar com o Stripe:", err);
    return json(502, { error: "Não foi possível abrir o pagamento" });
  }
};
