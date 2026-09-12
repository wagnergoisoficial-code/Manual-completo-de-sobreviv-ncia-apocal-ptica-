/**
 * Cria a sessão de pagamento do Stripe para o checkout embutido na própria página.
 *
 * POR QUE ISTO PRECISA EXISTIR
 *
 * O formulário embutido só monta com um client_secret, e o client_secret só nasce de uma
 * chamada autenticada com a chave secreta — que não pode viver no navegador. Daí esta
 * função: ela é a única peça do site de vendas que roda no servidor.
 *
 * O QUE ELA GANHA DE QUEBRA
 *
 * Com um Payment Link, o identificador do clique no anúncio cabia em 200 caracteres do
 * client_reference_id e nada mais. Aqui quem chama é o navegador do próprio comprador,
 * então o IP e o user-agent que chegam nos cabeçalhos são DELE — não do servidor do
 * Stripe. São exatamente os dois sinais que faltavam para a Conversions API casar a
 * venda com a pessoa que viu o anúncio.
 *
 * REGRA INEGOCIÁVEL
 *
 * O preço nunca vem do navegador. Ele é um Price ID guardado aqui. Aceitar valor do
 * cliente é como deixar o comprador digitar quanto quer pagar.
 */

const STRIPE_API = "https://api.stripe.com/v1/checkout/sessions";

const SECRET_KEY = process.env.STRIPE_SECRET_KEY;
const PRICE_ID = process.env.STRIPE_PRICE_ID;
const SITE_URL = process.env.URL || "https://www.manualcompletodesobrevivencia.com";

/**
 * Quem paga o IOF de 3,5% do Pix.
 *
 * A conta Stripe é dos EUA, então toda compra por Pix de um brasileiro é uma transação
 * internacional e o IOF incide. No padrão do Stripe ("never"), ele é somado por cima e o
 * comprador vê R$ 41,30 no app do banco depois de ter decidido comprar por R$ 39,90.
 *
 * Com "always" nós absorvemos a taxa: o banco pede exatamente o preço anunciado, e os
 * 3,5% saem da nossa margem. É uma decisão comercial, não técnica — por isso vive numa
 * variável de ambiente e o padrão mantém o comportamento atual, sem mudar nada em silêncio.
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

export const handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: JSON.stringify({ error: "Método não permitido" }) };
  }

  if (!SECRET_KEY || !PRICE_ID) {
    console.error("Falta STRIPE_SECRET_KEY ou STRIPE_PRICE_ID.");
    return { statusCode: 500, body: JSON.stringify({ error: "Checkout não configurado" }) };
  }

  let corpo = {};
  try {
    corpo = JSON.parse(event.body || "{}");
  } catch {
    // Corpo inválido não é motivo para recusar a venda: seguimos sem rastreio.
    corpo = {};
  }

  const fbc = saneado(corpo.fbc);
  const fbp = saneado(corpo.fbp);
  const ip = ipDoComprador(event.headers || {});
  const userAgent = saneado(event.headers?.["user-agent"], 500);

  const parametros = {
    mode: "payment",
    ui_mode: "form",
    return_url: `${SITE_URL}/obrigado?session_id={CHECKOUT_SESSION_ID}`,
    integration_identifier: "embedded_web_0001",
    locale: "pt-BR",
    "line_items[0][price]": PRICE_ID,
    "line_items[0][quantity]": 1,

    // O que o webhook vai precisar para contar a venda ao Meta já atribuída ao anúncio.
    // São dados de campanha, não do comprador: nada aqui identifica ninguém sozinho.
    metadata: {
      fbc,
      fbp,
      client_ip: ip,
      client_user_agent: userAgent,
      utm_source: saneado(corpo.utm_source),
      utm_medium: saneado(corpo.utm_medium),
      utm_campaign: saneado(corpo.utm_campaign),
      utm_content: saneado(corpo.utm_content),
      utm_term: saneado(corpo.utm_term),
    },
  };

  if (ABSORVER_IOF) {
    parametros["payment_method_options[pix][amount_includes_iof]"] = "always";
  }

  try {
    const resposta = await fetch(STRIPE_API, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${SECRET_KEY}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: paraFormulario(parametros).toString(),
    });

    const sessao = await resposta.json();

    if (!resposta.ok) {
      console.error("Stripe recusou a criação da sessão:", sessao?.error?.message);
      return { statusCode: 502, body: JSON.stringify({ error: "Não foi possível abrir o pagamento" }) };
    }

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
      body: JSON.stringify({ client_secret: sessao.client_secret }),
    };
  } catch (err) {
    console.error("Erro ao falar com o Stripe:", err);
    return { statusCode: 502, body: JSON.stringify({ error: "Não foi possível abrir o pagamento" }) };
  }
};
