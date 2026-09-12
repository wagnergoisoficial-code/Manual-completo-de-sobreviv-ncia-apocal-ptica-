import React, { useEffect, useMemo, useState } from 'react';
import { Lock, ShieldCheck } from 'lucide-react';
import { loadStripe } from '@stripe/stripe-js';
import { CheckoutFormProvider, CheckoutForm, useCheckoutForm } from '@stripe/react-stripe-js/checkout';
import Testimonials from '../components/Testimonials';
import { currentFbc, hostedCheckoutUrl, readCookie } from '../checkout';
import { trackPixel } from '../pixel';

/**
 * A tela de pagamento, dentro do nosso domínio.
 *
 * O formulário do Stripe vem num iframe — o cartão é digitado lá dentro e nunca toca
 * nesta página nem no nosso servidor. O que ganhamos é tudo o que fica EM VOLTA dele:
 * preço, garantia e os prints dos depoimentos, que na página hospedada do Stripe não
 * cabiam de jeito nenhum.
 *
 * A aparência do formulário é ajustada pela Appearance API para não parecer um bloco
 * estranho colado no meio da página: mesmo preto, mesmo âmbar, mesma fonte, botão em
 * pílula como todos os outros do site.
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
 * O que o servidor precisa saber para, mais tarde, contar a venda ao Meta já ligada ao
 * anúncio que a gerou. O IP e o user-agent ele pega sozinho dos cabeçalhos — e são os
 * do comprador, porque quem chama a função é o navegador dele.
 *
 * O fbc vem de currentFbc(), e não do cookie direto: quem clicou no anúncio e comprou
 * em poucos segundos pode chegar aqui antes de o Pixel ter gravado o cookie, e nesse
 * caso o valor é remontado a partir do fbclid encaminhado na URL.
 */
function dadosDeAtribuicao() {
  const aqui = new URLSearchParams(window.location.search);
  const utms = Object.fromEntries(UTMS.map((chave) => [chave, aqui.get(chave) ?? undefined]));
  return { fbc: currentFbc() ?? undefined, fbp: readCookie('_fbp') ?? undefined, ...utms };
}

/** Precisa viver dentro do provider: é lá que o estado do formulário existe. */
function Formulario() {
  const estado = useCheckoutForm();

  if (estado.type === 'error') {
    return (
      <p className="text-small text-mist">
        Não foi possível carregar o pagamento. Recarregue a página ou use o botão abaixo.
      </p>
    );
  }

  const aoConfirmar = async (evento: Parameters<NonNullable<React.ComponentProps<typeof CheckoutForm>['onConfirm']>>[0]) => {
    if (estado.type !== 'success') return;
    try {
      await estado.checkout.confirm({ formConfirmEvent: evento });
    } catch (erro) {
      // O formulário já mostra o erro traduzido para quem está comprando; o console é
      // para nós.
      console.error('Falha ao confirmar o pagamento:', erro);
    }
  };

  return <CheckoutForm onConfirm={aoConfirmar} />;
}

export default function Checkout() {
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [falhou, setFalhou] = useState(false);

  // Chegar nesta tela É chegar ao pagamento. O evento sai daqui, e não mais do clique
  // no botão da página de vendas — aqui ele significa o que promete.
  useEffect(() => {
    trackPixel('InitiateCheckout', { content_name: 'Checkout embutido', value: 39.9, currency: 'BRL' });
  }, []);

  useEffect(() => {
    let cancelado = false;

    if (!stripePromise) {
      setFalhou(true);
      return;
    }

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

  const opcoes = useMemo(
    () => (clientSecret ? { clientSecret, appearance: APARENCIA } : null),
    [clientSecret],
  );

  return (
    <div className="grain min-h-screen bg-night text-cream">
      <header className="border-b border-cream/10">
        <div className="mx-auto flex max-w-[1240px] items-center justify-between px-6 py-6 sm:px-10">
          <a href="/" className="eyebrow text-cream transition-colors hover:text-amber">
            ← Voltar
          </a>
          <span className="flex items-center gap-2 text-[0.8125rem] text-faint">
            <Lock className="h-3.5 w-3.5" strokeWidth={2} />
            Pagamento seguro
          </span>
        </div>
      </header>

      <main className="mx-auto max-w-[1240px] px-6 py-14 sm:px-10 lg:py-20">
        {/* Três blocos, e não duas colunas, por causa do celular.
            Empilhados, "coluna da esquerda inteira depois coluna da direita" jogaria o
            formulário para o fim da rolagem, atrás dos depoimentos — quem já decidiu
            teria de percorrer o argumento todo para achar onde pagar. Separados, a
            ordem no celular fica preço → formulário → depoimentos, e no desktop o
            formulário ocupa a coluna da direita inteira. */}
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-x-14 lg:gap-y-12">

          {/* A — a oferta */}
          <div className="lg:col-span-5 lg:col-start-1 lg:row-start-1">
            <span className="eyebrow text-amber">Seu acesso</span>
            <h1 className="mt-5 text-section text-cream">Método 5P — Manual Completo</h1>

            <div className="mt-7 flex items-baseline gap-3 border-b border-cream/10 pb-7">
              <span className="text-hero text-cream">R$&nbsp;39,90</span>
              <span className="text-small text-mist">uma vez só</span>
            </div>

            <ul className="mt-7 space-y-3 text-small text-mist">
              <li>Plataforma completa com os 5 módulos, checklists e ferramentas</li>
              <li>Manual Completo em PDF para baixar</li>
              <li>Os 3 bônus</li>
              <li>Acesso vitalício, com atualizações inclusas</li>
            </ul>

            <p className="mt-7 flex items-start gap-3 text-small text-cream">
              <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-amber" strokeWidth={2} />
              7 dias de garantia. Se não servir, devolvemos os R$&nbsp;39,90 integralmente.
            </p>

          </div>

          {/* B — o formulário do Stripe. Tudo dentro deste iframe é deles; nada do
              cartão passa por aqui. */}
          <div className="lg:col-span-6 lg:col-start-7 lg:row-span-2 lg:row-start-1">
            <div className="lg:sticky lg:top-10">
              {opcoes && stripePromise ? (
                <CheckoutFormProvider stripe={stripePromise} options={opcoes}>
                  <Formulario />
                </CheckoutFormProvider>
              ) : falhou ? (
                /* Rede de segurança: se a sessão não abriu, a venda não pode morrer aqui.
                   O link hospedado do Stripe é o mesmo de sempre e sempre funciona. */
                <div className="border border-cream/12 p-8">
                  <p className="text-small text-mist">
                    O pagamento não abriu nesta página. Você pode concluir a compra com
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
                <div className="flex items-center gap-4 p-8">
                  <span className="h-5 w-5 animate-spin rounded-full border-2 border-cream/20 border-t-amber" />
                  <span className="eyebrow text-faint">Abrindo o pagamento</span>
                </div>
              )}

              <p className="mt-6 text-[0.8125rem] leading-relaxed text-faint">
                Pagamento processado pelo Stripe. No extrato do Pix o recebedor aparece
                como <span className="text-mist">Ebanx</span>, que é o parceiro do Stripe
                no Brasil.
              </p>
            </div>
          </div>

          {/* C — a prova social, depois da ação. Quem já ia pagar não precisa dela;
              quem hesitou encontra logo abaixo. */}
          <div className="lg:col-span-5 lg:col-start-1 lg:row-start-2">
            <span className="eyebrow text-faint">Quem já entrou</span>
            <div className="mt-8">
              <Testimonials comAnotacao={false} />
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
