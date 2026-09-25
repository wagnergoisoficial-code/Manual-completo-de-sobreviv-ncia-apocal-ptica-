import React, { useState } from "react";
import { Elements, PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { Zap, CreditCard, ArrowRight, Loader2, Lock } from "lucide-react";
import { CustomerData } from "./types";
import { trackAddPaymentInfo } from "./tracking";
import { stripePromise } from "./stripe";
import { PILL_BASE, PILL_VARIANTS } from "../../components/BuyButton";

/**
 * As duas formas de pagar, no desenho desta página.
 *
 * O Pix é um botão só: os dados já foram digitados no formulário acima, e daqui a
 * pessoa vai direto para a tela do QR Code — sem sair do site, sem tela branca.
 *
 * O cartão vem do Stripe, num iframe. O número do cartão é digitado lá dentro e nunca
 * toca nesta página nem no nosso servidor; é o que nos tira do alcance das regras de
 * PCI e, ao mesmo tempo, o que permite o resto da tela ser nosso. Os campos herdam a
 * cor, a fonte e o raio de canto daqui, então a emenda não aparece.
 *
 * A COBRANÇA SÓ NASCE NO CLIQUE
 *
 * Nada é criado no Stripe enquanto a pessoa apenas olha. O PaymentIntent nasce quando
 * ela aperta o botão — e por isso os campos do cartão montam em modo diferido, com o
 * preço lido do servidor, antes de existir qualquer cobrança.
 */

interface Cobranca {
  client_secret: string;
  id: string;
}

interface PaymentSectionProps {
  customer: CustomerData;
  /** Em centavos, como o Stripe conta. Vem do Price, nunca do navegador. */
  amountInCents: number | null;
  onGeneratePix: () => Promise<void>;
  /** Cria a cobrança no nosso servidor e devolve o segredo para confirmar. */
  onCriarCobranca: (metodo: "pix" | "cartao") => Promise<Cobranca | null>;
  onCardApproved: (paymentIntentId: string) => void;
  isProcessing: boolean;
  onValidateForm: () => boolean;
}

/**
 * Os campos do cartão herdam os tokens da página de vendas em vez de impor os do Stripe:
 * o mesmo carvão de fundo, o mesmo creme no texto, o âmbar no foco e a Figtree.
 */
const APARENCIA = {
  theme: "night" as const,
  variables: {
    colorPrimary: "#f59e0b",
    colorBackground: "#0f172a",
    colorText: "#f5f1ea",
    colorTextSecondary: "#a9a29a",
    colorDanger: "#f87171",
    fontFamily: "Figtree, ui-sans-serif, system-ui, sans-serif",
    borderRadius: "10px",
    spacingUnit: "4px",
  },
};

/** O iframe do Stripe não enxerga as fontes da página: a Figtree precisa ir por aqui. */
const FONTES = [
  { cssSrc: "https://fonts.googleapis.com/css2?family=Figtree:wght@400;500;600&display=swap" },
];

/** A pílula âmbar da página de vendas, ocupando a largura da coluna. */
const BOTAO_PRINCIPAL = `${PILL_BASE} ${PILL_VARIANTS.solid} w-full disabled:cursor-not-allowed disabled:opacity-70`;

/**
 * Os campos do cartão e o botão de pagar.
 *
 * Precisa viver dentro do provider: é lá que o estado dos campos existe.
 */
const CartaoStripe: React.FC<{
  onCriarCobranca: PaymentSectionProps["onCriarCobranca"];
  onCardApproved: PaymentSectionProps["onCardApproved"];
  onValidateForm: PaymentSectionProps["onValidateForm"];
  customer: CustomerData;
  onRejeicao: (mensagem: string) => void;
}> = ({ onCriarCobranca, onCardApproved, onValidateForm, customer, onRejeicao }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [enviando, setEnviando] = useState(false);

  const pagar = async () => {
    if (!stripe || !elements) return;
    if (!onValidateForm()) return;

    setEnviando(true);
    try {
      // Valida os campos do cartão antes de criar qualquer cobrança: assim um número
      // digitado errado não deixa um PaymentIntent órfão para trás.
      const { error: erroDeCampo } = await elements.submit();
      if (erroDeCampo) {
        onRejeicao(erroDeCampo.message || "Confira os dados do cartão e tente de novo.");
        return;
      }

      trackAddPaymentInfo("credit_card");

      const cobranca = await onCriarCobranca("cartao");
      if (!cobranca) {
        onRejeicao("Não foi possível abrir o pagamento agora. Tente pelo Pix, que é instantâneo.");
        return;
      }

      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        clientSecret: cobranca.client_secret,
        confirmParams: {
          return_url: `${window.location.origin}/obrigado`,
          payment_method_data: {
            billing_details: {
              name: customer.name || undefined,
              email: customer.email || undefined,
            },
          },
        },
        // O cartão resolve aqui mesmo na maioria das vezes. O redirecionamento só
        // acontece quando o banco exige a autenticação em 3D Secure.
        redirect: "if_required",
      });

      if (error) {
        onRejeicao(
          error.message ||
            "Cartão recusado pelo emissor. Recomendamos efetuar o pagamento via Pix instantâneo.",
        );
        return;
      }

      if (paymentIntent?.status === "succeeded") {
        onCardApproved(paymentIntent.id);
      } else {
        onRejeicao("O pagamento não foi concluído. Tente novamente ou use o Pix.");
      }
    } finally {
      setEnviando(false);
    }
  };

  return (
    <div className="space-y-5">
      <PaymentElement options={{ layout: "tabs" }} />

      <button type="button" onClick={pagar} disabled={enviando || !stripe} className={BOTAO_PRINCIPAL}>
        {enviando ? (
          <>
            <Loader2 className="h-4 w-4 shrink-0 animate-spin" strokeWidth={2.25} />
            Processando o cartão…
          </>
        ) : (
          <>
            Pagar com cartão — R$&nbsp;39,90
            <ArrowRight
              className="h-4 w-4 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5"
              strokeWidth={2.25}
            />
          </>
        )}
      </button>
    </div>
  );
};

/** Uma aba do seletor. A escolhida acende; o âmbar fica só no ícone, porque âmbar é ação. */
const Aba: React.FC<{
  ativa: boolean;
  onClick: () => void;
  icone: React.ReactNode;
  children: React.ReactNode;
}> = ({ ativa, onClick, icone, children }) => (
  <button
    type="button"
    role="tab"
    aria-selected={ativa}
    onClick={onClick}
    className={`flex items-center justify-center gap-2 rounded-full py-2.5 text-[0.875rem] font-semibold transition-colors ${
      ativa ? "bg-cream/10 text-cream" : "text-mist hover:text-cream"
    }`}
  >
    <span className={ativa ? "text-amber" : "text-faint"}>{icone}</span>
    {children}
  </button>
);

export const PaymentSection: React.FC<PaymentSectionProps> = ({
  customer,
  amountInCents,
  onGeneratePix,
  onCriarCobranca,
  onCardApproved,
  isProcessing,
  onValidateForm,
}) => {
  const [activeTab, setActiveTab] = useState<"pix" | "card">("pix");
  const [cardRejection, setCardRejection] = useState<string | null>(null);

  const handlePixClick = async () => {
    if (!onValidateForm()) return;
    await onGeneratePix();
  };

  return (
    <section aria-labelledby="pagamento-titulo">
      <h2 id="pagamento-titulo" className="eyebrow text-faint">
        Pagamento
      </h2>

      {/* Pix vem escolhido: é aprovação na hora, e é como a maioria paga. */}
      <div role="tablist" aria-label="Forma de pagamento" className="mt-5 grid grid-cols-2 gap-1 rounded-full border border-cream/12 p-1">
        <Aba
          ativa={activeTab === "pix"}
          onClick={() => {
            setActiveTab("pix");
            setCardRejection(null);
          }}
          icone={<Zap className="h-4 w-4" strokeWidth={2} />}
        >
          Pix
        </Aba>
        <Aba
          ativa={activeTab === "card"}
          onClick={() => setActiveTab("card")}
          icone={<CreditCard className="h-4 w-4" strokeWidth={2} />}
        >
          Cartão
        </Aba>
      </div>

      {activeTab === "pix" && (
        <div className="mt-5">
          {/* O aviso do Ebanx fica logo acima do botão, e não depois: quem vê um nome
              estranho no app do banco na hora de confirmar desconfia e cancela. Avisado
              antes, não é surpresa. */}
          <p className="text-[0.8125rem] leading-relaxed text-faint">
            <span className="text-mist">O código aparece aqui mesmo, com aprovação na hora.</span>{" "}
            No extrato do Pix o recebedor aparece como <span className="text-mist">Ebanx</span>, o
            parceiro do Stripe no Brasil.
          </p>

          <button type="button" onClick={handlePixClick} disabled={isProcessing} className={`${BOTAO_PRINCIPAL} mt-5`}>
            {isProcessing ? (
              <>
                <Loader2 className="h-4 w-4 shrink-0 animate-spin" strokeWidth={2.25} />
                Gerando o Pix…
              </>
            ) : (
              <>
                Gerar Pix — R$&nbsp;39,90
                <ArrowRight
                  className="h-4 w-4 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5"
                  strokeWidth={2.25}
                />
              </>
            )}
          </button>
        </div>
      )}

      {activeTab === "card" && (
        <div className="mt-5 space-y-5">
          {cardRejection && (
            <div className="animate-fade-in rounded-[10px] border border-red-400/40 bg-red-400/[0.06] p-4">
              <p className="text-small text-cream">{cardRejection}</p>
              <button
                type="button"
                onClick={() => {
                  setCardRejection(null);
                  setActiveTab("pix");
                }}
                className={`${PILL_BASE} ${PILL_VARIANTS.ghost} mt-4 w-full`}
              >
                Pagar com Pix — aprovação imediata
              </button>
            </div>
          )}

          {stripePromise && amountInCents ? (
            <Elements
              stripe={stripePromise}
              options={{
                mode: "payment",
                amount: amountInCents,
                currency: "brl",
                paymentMethodTypes: ["card"],
                locale: "pt-BR",
                appearance: APARENCIA,
                fonts: FONTES,
              }}
            >
              <CartaoStripe
                customer={customer}
                onCriarCobranca={onCriarCobranca}
                onCardApproved={onCardApproved}
                onValidateForm={onValidateForm}
                onRejeicao={setCardRejection}
              />
            </Elements>
          ) : (
            /* Os campos ainda não têm como montar: falta a chave pública ou o preço
               ainda está vindo do servidor. O Pix continua ali do lado, inteiro. */
            <div className="flex items-start gap-4 py-2">
              <span className="mt-0.5 h-5 w-5 shrink-0 animate-spin rounded-full border-2 border-cream/20 border-t-amber" />
              <p className="text-small text-mist">
                Abrindo os campos do cartão. Se demorar, use o{" "}
                <strong className="font-semibold text-cream">Pix</strong>: a aprovação é imediata.
              </p>
            </div>
          )}
        </div>
      )}

      {/* A mesma linha que fica embaixo dos botões da página de vendas. */}
      <p className="mt-4 flex items-center justify-center gap-2 text-center text-[0.8125rem] text-faint">
        <Lock className="h-3.5 w-3.5 shrink-0" strokeWidth={2} />
        Pagamento único · Acesso imediato · 7 dias de garantia
      </p>
    </section>
  );
};
