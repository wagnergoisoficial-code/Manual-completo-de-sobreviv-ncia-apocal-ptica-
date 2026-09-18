import React, { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { CheckoutFormProvider, CheckoutForm, useCheckoutForm } from '@stripe/react-stripe-js/checkout';
import { currentFbc, hostedCheckoutUrl, readCookie } from '../checkout';

/**
 * Os campos de pagamento, dentro da própria página de vendas.
 *
 * O formulário do Stripe vem num iframe: o cartão é digitado lá dentro e nunca toca
 * nesta página nem no nosso servidor. O que é nosso é tudo em volta — preço, garantia,
 * depoimentos —, e é exatamente por isso que o pagamento saiu da página hospedada
 * deles: lá não cabia nada disso.
 *
 * A SESSÃO É CRIADA AO ABRIR A PÁGINA
 *
 * Isto vive numa página dedicada ao pagamento, e não mais numa seção da página de
 * vendas. A diferença muda a regra: lá, criar uma sessão no Stripe para todo visitante
 * seria desperdício — a maioria só passa os olhos. Aqui, quem chegou clicou no botão de
 * compra; a intenção já está declarada, e fazer essa pessoa esperar por rolagem seria
 * atrasar justamente o que ela veio buscar.
 */

const CHAVE_PUBLICA = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || '';

// loadStripe fora do componente: recriar a instância a cada render derruba o iframe.
const stripePromise = CHAVE_PUBLICA ? loadStripe(CHAVE_PUBLICA) : null;

/** O formulário herda o desenho da página em vez de impor o do Stripe. */
const APARENCIA = {
  theme: 'night' as const,
  variables: {
    colorPrimary: '#f3b340',
    colorBackground: '#121213',
    colorText: '#f5f1ea',
    colorTextSecondary: '#a9a29a',
    colorDanger: '#ef4444',
    fontFamily: 'Figtree, ui-sans-serif, system-ui, sans-serif',
    borderRadius: '10px',
    buttonBorderRadius: '9999px',
    spacingUnit: '4px',
  },
};

const UTMS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];

/**
 * O que o servidor precisa para, mais tarde, contar a venda ao Meta já ligada ao
 * anúncio. O IP e o user-agent ele pega sozinho dos cabeçalhos — e são os do comprador,
 * porque quem chama a função é o navegador dele.
 */
function dadosDeAtribuicao() {
  const aqui = new URLSearchParams(window.location.search);
  const utms = Object.fromEntries(UTMS.map((chave) => [chave, aqui.get(chave) ?? undefined]));
  return { fbc: currentFbc() ?? undefined, fbp: readCookie('_fbp') ?? undefined, ...utms };
}

/** Precisa viver dentro do provider: é lá que o estado do formulário existe. */
function Campos() {
  const estado = useCheckoutForm();

  if (estado.type === 'error') {
    return (
      <p className="text-small text-mist">
        Não foi possível carregar o pagamento. Recarregue a página e tente de novo.
      </p>
    );
  }

  const aoConfirmar = async (
    evento: Parameters<NonNullable<React.ComponentProps<typeof CheckoutForm>['onConfirm']>>[0],
  ) => {
    if (estado.type !== 'success') return;
    try {
      await estado.checkout.confirm({ formConfirmEvent: evento });
    } catch (erro) {
      // O formulário já mostra o erro traduzido para quem está comprando.
      console.error('Falha ao confirmar o pagamento:', erro);
    }
  };

  return <CheckoutForm onConfirm={aoConfirmar} />;
}

export default function PaymentForm() {
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [falhou, setFalhou] = useState(false);

  useEffect(() => {
    if (!stripePromise) {
      setFalhou(true);
      return;
    }

    let cancelado = false;

    fetch('/api/criar-sessao', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dadosDeAtribuicao()),
    })
      .then((resposta) => (resposta.ok ? resposta.json() : Promise.reject(new Error(String(resposta.status)))))
      .then((dados) => {
        if (cancelado) return;
        if (dados?.client_secret) setClientSecret(dados.client_secret);
        else setFalhou(true);
      })
      .catch(() => {
        if (!cancelado) setFalhou(true);
      });

    return () => {
      cancelado = true;
    };
  }, []);

  return (
    <div className="min-h-[280px]">
      {clientSecret && stripePromise ? (
        <CheckoutFormProvider stripe={stripePromise} options={{ clientSecret, appearance: APARENCIA }}>
          <Campos />
        </CheckoutFormProvider>
      ) : falhou ? (
        /* Rede de segurança: se a sessão não abriu, a venda não pode morrer aqui. O
           link hospedado do Stripe é o mesmo de sempre e sempre funciona. */
        <div className="border border-cream/12 p-7">
          <p className="text-small text-mist">
            O formulário não carregou nesta página. Você pode concluir a compra com
            segurança na página do Stripe:
          </p>
          <a
            href={hostedCheckoutUrl()}
            className="mt-6 inline-flex items-center justify-center rounded-full bg-amber px-8 py-4 text-[0.9375rem] font-semibold text-night transition-colors hover:bg-amber-bright"
          >
            Continuar para o pagamento
          </a>
        </div>
      ) : (
        <div className="flex items-center gap-4 py-10">
          <span className="h-5 w-5 animate-spin rounded-full border-2 border-cream/20 border-t-amber" />
          <span className="eyebrow text-faint">Abrindo o pagamento</span>
        </div>
      )}
    </div>
  );
}
