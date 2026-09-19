import { loadStripe } from "@stripe/stripe-js";

/**
 * A instância do Stripe.js desta página, criada uma vez só.
 *
 * Fora de qualquer componente de propósito: refazer a instância a cada render derruba
 * os iframes dos campos de cartão no meio da digitação.
 *
 * A chave é a PÚBLICA. Ela nasce para viver no navegador — sozinha, só consegue criar
 * meios de pagamento, nunca mover dinheiro. Quem cobra é a chave secreta, que fica na
 * função do servidor e nunca desce para cá.
 */
const CHAVE_PUBLICA = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || "";

/**
 * PORTUGUÊS SEMPRE, NÃO O IDIOMA DO APARELHO
 *
 * Sem este locale o Stripe.js usa a língua do navegador de quem está comprando. Quem
 * tem o celular em inglês — e é mais gente do que parece — via "Card number" e
 * "Payment failed" no meio de uma página inteira em português. Fixar aqui vale para
 * tudo que o Stripe desenha ou escreve: os campos do cartão e também as mensagens de
 * erro que devolvemos para a tela.
 */
export const stripePromise = CHAVE_PUBLICA
  ? loadStripe(CHAVE_PUBLICA, { locale: "pt-BR" })
  : null;
