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

export const stripePromise = CHAVE_PUBLICA ? loadStripe(CHAVE_PUBLICA) : null;
