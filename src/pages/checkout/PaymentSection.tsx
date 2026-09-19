import React, { useState } from "react";
import { Elements, PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { Zap, CreditCard, ShieldCheck, AlertCircle, ArrowRight, Loader2, Lock, Shield, KeyRound } from "lucide-react";
import { CustomerData } from "./types";
import { trackAddPaymentInfo } from "./tracking";
import { stripePromise } from "./stripe";

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

/** Os campos do cartão herdam o desenho da página em vez de impor o do Stripe. */
const APARENCIA = {
  theme: "night" as const,
  variables: {
    colorPrimary: "#f59e0b",
    colorBackground: "#020617",
    colorText: "#e2e8f0",
    colorTextSecondary: "#94a3b8",
    colorDanger: "#fb7185",
    fontFamily: "'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif",
    borderRadius: "12px",
    spacingUnit: "4px",
  },
};

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
    <div className="space-y-3">
      <div className="bg-slate-950/90 border border-slate-800 rounded-xl p-3 text-slate-200">
        <PaymentElement options={{ layout: "tabs" }} />
      </div>

      <button
        type="button"
        onClick={pagar}
        disabled={enviando || !stripe}
        className="w-full py-4 px-6 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-base sm:text-lg tracking-wide flex items-center justify-center gap-2 shadow-xl shadow-amber-500/20 active:scale-[0.99] transition-all cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {enviando ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin text-slate-950" />
            <span>Processando Cartão...</span>
          </>
        ) : (
          <>
            <span>Pagar com Cartão — R$ 39,90</span>
            <ArrowRight className="w-5 h-5 text-slate-950 stroke-[3]" />
          </>
        )}
      </button>
    </div>
  );
};

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
    <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-4">
      <div className="border-b border-slate-800/80 pb-2 flex items-center justify-between">
        <h2 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
          <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 font-bold text-xs flex items-center justify-center">
            2
          </span>
          Forma de Pagamento
        </h2>
        <span className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5" /> Ambiente Seguro
        </span>
      </div>

      {/* Abas: PIX (já selecionada por padrão) e CARTÃO */}
      <div className="grid grid-cols-2 gap-2 bg-slate-950 p-1 rounded-xl border border-slate-800">
        <button
          type="button"
          onClick={() => {
            setActiveTab("pix");
            setCardRejection(null);
          }}
          className={`py-2.5 px-3 rounded-lg text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
            activeTab === "pix"
              ? "bg-slate-800 text-amber-400 shadow-md border border-amber-500/40"
              : "text-slate-400 hover:text-slate-200"
          }`}
        >
          <Zap className="w-4 h-4 text-emerald-400 fill-emerald-400/20" />
          <span>PIX</span>
          <span className="hidden sm:inline-block text-[10px] bg-emerald-950/80 text-emerald-300 px-1.5 py-0.2 rounded border border-emerald-800">
            Aprovação Imediata
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("card")}
          className={`py-2.5 px-3 rounded-lg text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
            activeTab === "card"
              ? "bg-slate-800 text-amber-400 shadow-md border border-amber-500/40"
              : "text-slate-400 hover:text-slate-200"
          }`}
        >
          <CreditCard className="w-4 h-4 text-slate-300" />
          <span>CARTÃO</span>
        </button>
      </div>

      {/* CONTEÚDO DA ABA PIX */}
      {activeTab === "pix" && (
        <div className="space-y-4 pt-1">
          <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3.5 text-xs text-slate-300 space-y-2">
            <div className="flex items-center gap-2 text-emerald-400 font-bold">
              <Zap className="w-4 h-4" />
              <span>Aprovado na hora • Acesso imediato ao workbook e PDF</span>
            </div>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Ao clicar no botão abaixo, geramos o seu código Pix oficial com valor exato de <strong>R$ 39,90</strong>.
            </p>
          </div>

          {/* O ÚNICO BOTÃO COM COR FORTE: ÂMBAR */}
          <button
            type="button"
            onClick={handlePixClick}
            disabled={isProcessing}
            className="w-full py-4 px-6 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-base sm:text-lg tracking-wide flex items-center justify-center gap-2 shadow-xl shadow-amber-500/20 active:scale-[0.99] transition-all cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isProcessing ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin text-slate-950" />
                <span>Gerando Pix Seguro...</span>
              </>
            ) : (
              <>
                <span>Gerar Pix — R$ 39,90</span>
                <ArrowRight className="w-5 h-5 text-slate-950 stroke-[3]" />
              </>
            )}
          </button>
        </div>
      )}

      {/* CONTEÚDO DA ABA CARTÃO */}
      {activeTab === "card" && (
        <div className="space-y-4 pt-1">
          {/* Mensagem em caso de Cartão Recusado */}
          {cardRejection && (
            <div className="bg-rose-950/40 border border-rose-800/80 rounded-xl p-3.5 text-xs space-y-2 text-rose-200 animate-fade-in">
              <div className="flex items-center gap-2 text-rose-300 font-bold">
                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                <span>{cardRejection}</span>
              </div>
              <button
                type="button"
                onClick={() => {
                  setCardRejection(null);
                  setActiveTab("pix");
                }}
                className="w-full mt-1 py-2.5 px-3 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <Zap className="w-4 h-4 fill-slate-950" />
                <span>Pagar com Pix — Aprovação Imediata</span>
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
            <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 text-xs text-slate-300 space-y-3">
              <div className="flex items-center gap-2 text-amber-400 font-semibold">
                <Loader2 className="w-4 h-4 animate-spin text-amber-400" />
                <span>Abrindo os campos do cartão...</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Se demorar, use a aba <strong className="text-slate-200">PIX</strong>: a aprovação é
                imediata e o acesso sai na hora.
              </p>
            </div>
          )}
        </div>
      )}

      {/* Seção visual de alta percepção de segurança */}
      <div className="pt-2 border-t border-slate-800/80 space-y-2.5">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          <div className="bg-slate-950/80 border border-slate-800/90 rounded-xl p-2.5 flex items-center gap-2.5 sm:flex-col sm:text-center sm:gap-1.5">
            <div className="w-7 h-7 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center shrink-0 text-emerald-400">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[11px] font-bold text-white block leading-tight">Ambiente Seguro</span>
              <span className="text-[9px] text-slate-400 block leading-tight">Certificado SSL 256-bit</span>
            </div>
          </div>

          <div className="bg-slate-950/80 border border-slate-800/90 rounded-xl p-2.5 flex items-center gap-2.5 sm:flex-col sm:text-center sm:gap-1.5">
            <div className="w-7 h-7 rounded-lg bg-sky-500/10 border border-sky-500/30 flex items-center justify-center shrink-0 text-sky-400">
              <KeyRound className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[11px] font-bold text-white block leading-tight">Criptografia de Ponta a Ponta</span>
              <span className="text-[9px] text-slate-400 block leading-tight">Dados 100% blindados</span>
            </div>
          </div>

          <div className="bg-slate-950/80 border border-slate-800/90 rounded-xl p-2.5 flex items-center gap-2.5 sm:flex-col sm:text-center sm:gap-1.5">
            <div className="w-7 h-7 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center shrink-0 text-amber-400">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[11px] font-bold text-white block leading-tight">Privacidade Garantida</span>
              <span className="text-[9px] text-slate-400 block leading-tight">Conforme a LGPD</span>
            </div>
          </div>
        </div>

        {/* Garantia incondicional de 7 dias */}
        <div className="text-center pt-1">
          <p className="text-xs text-slate-400 font-medium inline-flex items-center justify-center gap-1.5">
            <Shield className="w-3.5 h-3.5 text-amber-400" />
            <span>Garantia incondicional de 7 dias • Reembolso integral sem burocracia</span>
          </p>
        </div>
      </div>
    </div>
  );
};
