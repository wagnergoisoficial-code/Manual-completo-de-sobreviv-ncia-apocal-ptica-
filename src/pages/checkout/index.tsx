import React, { useState, useEffect, useRef } from "react";
import { Header } from "./Header";
import { ProductSummary } from "./ProductSummary";
import { VisualBundleHero } from "./VisualBundleHero";
import { CustomerForm } from "./CustomerForm";
import { PaymentSection } from "./PaymentSection";
import { CheckoutFaq } from "./CheckoutFaq";
import { PixScreen } from "./PixScreen";
import { ThankYouScreen } from "./ThankYouScreen";
import { Footer } from "./Footer";
import { LegalModals } from "./LegalModals";
import { CustomerData, PaymentTransaction, TrackingData } from "./types";
import { getTrackingParams, trackInitiateCheckout, trackAddPaymentInfo } from "./tracking";
import { stripePromise } from "./stripe";
import { hostedCheckoutUrl } from "../../checkout";

/**
 * A página de pagamento.
 *
 * Ela é nossa do começo ao fim: cabeçalho, pôster do produto, formulário, abas de Pix e
 * cartão, QR Code e tela de obrigado. Quem processa o dinheiro é o Stripe, mas ele
 * aparece só onde precisa aparecer — no iframe dos campos de cartão.
 *
 * TRÊS TELAS, UMA PÁGINA
 *
 *   checkout   → o formulário e as formas de pagar
 *   pix_screen → o QR Code, esperando a transferência cair
 *   thank_you  → o pagamento aprovado e o que fazer agora
 *
 * Nenhuma delas troca de endereço enquanto a pessoa decide. Sair do domínio no meio de
 * uma compra é onde se perde gente.
 *
 * QUEM LIBERA O ACESSO NÃO É ESTA TELA
 *
 * É o webhook do Stripe, no servidor, quando o dinheiro entra de verdade. Esta página
 * só mostra o que está acontecendo. A pessoa pode fechar o navegador no segundo
 * seguinte ao pagamento e o acesso chega do mesmo jeito.
 */

const PRECO_EM_REAIS = 39.9;

/**
 * O que o Stripe devolve para o Pix.
 *
 * O typing do Stripe.js descreve o next_action do WeChat e o do 3D Secure, mas ainda
 * não o do Pix — embora a API o devolva e a documentação o descreva. Por isso a forma
 * está declarada aqui, e a leitura passa por um único ponto: se um dia o typing oficial
 * chegar, some este bloco e nada mais muda.
 */
interface QrCodeDoPix {
  data: string;
  image_url_png?: string;
  image_url_svg?: string;
  expires_at?: number;
  hosted_instructions_url?: string;
}

function lerQrCodeDoPix(paymentIntent: unknown): QrCodeDoPix | undefined {
  const acao = (paymentIntent as { next_action?: Record<string, unknown> } | null)?.next_action;
  const qr = acao?.pix_display_qr_code as QrCodeDoPix | undefined;
  return qr?.data ? qr : undefined;
}

/** De quanto em quanto tempo perguntamos ao Stripe se o Pix já caiu. */
const INTERVALO_DA_ESPERA = 3000;

function isValidCpf(cpf: string): boolean {
  const clean = cpf.replace(/\D/g, "");
  if (clean.length !== 11) return false;
  if (/^(\d)\1{10}$/.test(clean)) return false;

  let sum = 0;
  for (let i = 0; i < 9; i++) sum += parseInt(clean.charAt(i), 10) * (10 - i);
  let rev = 11 - (sum % 11);
  if (rev === 10 || rev === 11) rev = 0;
  if (rev !== parseInt(clean.charAt(9), 10)) return false;

  sum = 0;
  for (let i = 0; i < 10; i++) sum += parseInt(clean.charAt(i), 10) * (11 - i);
  rev = 11 - (sum % 11);
  if (rev === 10 || rev === 11) rev = 0;
  return rev === parseInt(clean.charAt(10), 10);
}

export default function CheckoutPage() {
  const [customer, setCustomer] = useState<CustomerData>({
    name: "",
    email: "",
    phone: "",
    document: "",
  });

  const [errors, setErrors] = useState<Partial<Record<keyof CustomerData, string>>>({});
  const [tracking, setTracking] = useState<TrackingData>({});
  const [amountInCents, setAmountInCents] = useState<number | null>(null);
  const [activeTransaction, setActiveTransaction] = useState<PaymentTransaction | null>(null);
  const [step, setStep] = useState<"checkout" | "pix_screen" | "thank_you">("checkout");
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [legalModal, setLegalModal] = useState<"terms" | "privacy" | null>(null);
  const [pagamentoQuebrado, setPagamentoQuebrado] = useState(false);

  const pollingRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    setTracking(getTrackingParams());

    // Chegar aqui É chegar ao pagamento. O evento significa exatamente o que promete,
    // sem depender de rolagem nem de clique.
    trackInitiateCheckout(PRECO_EM_REAIS, "BRL");

    // O preço vem do Price do Stripe, lido pelo servidor. Os campos do cartão montam em
    // modo diferido e precisam saber o valor antes de existir qualquer cobrança.
    fetch("/api/pagamento")
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error(String(res.status)))))
      .then((dados) => {
        if (typeof dados?.amount === "number") setAmountInCents(dados.amount);
      })
      .catch(() => setPagamentoQuebrado(true));
  }, []);

  /** O pagamento entrou: guarda o pedido e mostra a tela de acesso liberado. */
  const concluir = (transacao: PaymentTransaction) => {
    setActiveTransaction(transacao);
    localStorage.setItem("last_5p_transaction", JSON.stringify(transacao));
    setStep("thank_you");
    window.history.pushState({}, "", "/obrigado");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  /**
   * A espera do Pix.
   *
   * Quem responde é o próprio Stripe, consultado com o segredo da cobrança — não
   * precisamos de endpoint nosso para isso. Some a tela de "confirme seu pagamento":
   * a página percebe sozinha.
   */
  useEffect(() => {
    if (step !== "pix_screen" || !activeTransaction?.clientSecret) return;

    const segredo = activeTransaction.clientSecret;

    pollingRef.current = setInterval(async () => {
      try {
        const stripe = await stripePromise;
        if (!stripe) return;

        const { paymentIntent } = await stripe.retrievePaymentIntent(segredo);
        if (paymentIntent?.status === "succeeded") {
          if (pollingRef.current) clearInterval(pollingRef.current);
          concluir({ ...activeTransaction, status: "approved" });
        }
      } catch {
        // Segue a espera em silêncio: uma consulta que falhou não é um pagamento que falhou.
      }
    }, INTERVALO_DA_ESPERA);

    return () => {
      if (pollingRef.current) clearInterval(pollingRef.current);
    };
  }, [step, activeTransaction?.clientSecret]);

  const handleCustomerChange = (field: keyof CustomerData, value: string) => {
    setCustomer((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof CustomerData, string>> = {};

    if (!customer.name || customer.name.trim().length < 3) {
      newErrors.name = "Informe seu nome completo.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!customer.email || !emailRegex.test(customer.email.trim())) {
      newErrors.email = "Informe um e-mail válido para receber o acesso.";
    }

    const cleanPhone = customer.phone.replace(/\D/g, "");
    if (!cleanPhone || cleanPhone.length < 10) {
      newErrors.phone = "Informe um WhatsApp válido com DDD (ex: 11 99999-9999).";
    }

    const cleanCpf = customer.document.replace(/\D/g, "");
    if (!cleanCpf || cleanCpf.length !== 11) {
      newErrors.document = "Informe os 11 números do seu CPF.";
    } else if (!isValidCpf(customer.document)) {
      newErrors.document = "CPF inválido. Confira os números digitados.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Cria a cobrança no nosso servidor.
   *
   * É lá que o valor é lido do Stripe e que os identificadores da campanha entram nos
   * metadados — inclusive o IP e o navegador do comprador, que o servidor só consegue
   * ver porque quem chama a função é o navegador dele.
   */
  const criarCobranca = async (metodo: "pix" | "cartao") => {
    const resposta = await fetch("/api/pagamento", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        metodo,
        cliente: {
          nome: customer.name.trim(),
          email: customer.email.trim(),
          telefone: customer.phone.trim(),
        },
        rastreio: {
          fbc: tracking._fbc,
          fbp: tracking._fbp,
          utm_source: tracking.utm_source,
          utm_medium: tracking.utm_medium,
          utm_campaign: tracking.utm_campaign,
          utm_content: tracking.utm_content,
          utm_term: tracking.utm_term,
        },
      }),
    });

    if (!resposta.ok) {
      const erro = await resposta.json().catch(() => ({}));
      console.error("Falha ao criar a cobrança:", erro?.motivo || erro?.error || resposta.status);
      return null;
    }

    return resposta.json();
  };

  // Gerar a cobrança Pix e mostrar o QR Code aqui mesmo
  const handleGeneratePix = async () => {
    if (!validateForm()) return;

    setIsProcessing(true);
    try {
      trackAddPaymentInfo("pix", PRECO_EM_REAIS);

      const stripe = await stripePromise;
      const cobranca = stripe ? await criarCobranca("pix") : null;

      if (!stripe || !cobranca?.client_secret) {
        setPagamentoQuebrado(true);
        alert("Não foi possível gerar a cobrança Pix agora. Role a página: deixamos um link seguro para concluir a compra.");
        return;
      }

      // O CPF vai daqui direto para o Stripe. O Banco Central exige o identificador
      // fiscal em transferência internacional, e é o Stripe quem precisa dele —
      // guardá-lo também do nosso lado seria carregar um dado sensível à toa.
      const dadosDoPagador = {
        billing_details: {
          name: customer.name.trim(),
          email: customer.email.trim(),
          tax_id: customer.document.replace(/\D/g, ""),
        },
      };

      const { error, paymentIntent } = await stripe.confirmPixPayment(
        cobranca.client_secret,
        { payment_method: dadosDoPagador as never },
        // Sem isto o Stripe abre o QR Code dele por cima da página. O QR é nosso.
        { handleActions: false },
      );

      const pix = lerQrCodeDoPix(paymentIntent);
      if (error || !pix || !paymentIntent) {
        alert(error?.message || "Não foi possível gerar a cobrança Pix. Tente novamente.");
        return;
      }

      setActiveTransaction({
        id: paymentIntent.id,
        clientSecret: cobranca.client_secret,
        status: "pending",
        paymentMethod: "pix",
        total: PRECO_EM_REAIS,
        customer,
        tracking,
        eventId: paymentIntent.id,
        qrCode: pix.data,
        qrCodeImageUrl: pix.image_url_png,
        expirationDate: pix.expires_at ? new Date(pix.expires_at * 1000).toISOString() : undefined,
        createdAt: new Date().toISOString(),
      });
      setStep("pix_screen");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      console.error("Erro ao gerar o Pix:", err);
      alert("Erro ao conectar com o servidor para emissão do Pix. Tente novamente.");
    } finally {
      setIsProcessing(false);
    }
  };

  /** O cartão foi aprovado dentro da própria página, sem redirecionamento. */
  const handleCardApproved = (paymentIntentId: string) => {
    concluir({
      id: paymentIntentId,
      status: "approved",
      paymentMethod: "credit_card",
      total: PRECO_EM_REAIS,
      customer,
      tracking,
      eventId: paymentIntentId,
      createdAt: new Date().toISOString(),
    });
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 flex flex-col justify-between selection:bg-amber-500 selection:text-slate-950 font-['Plus_Jakarta_Sans',sans-serif]">
      {/* a) Topo sem menu ou links de saída */}
      <Header />

      <main className="flex-1 w-full mx-auto max-w-xl px-4 py-5 sm:py-6 lg:max-w-6xl lg:px-8 lg:py-10">
        {step === "checkout" && (
          /*
            DUAS LARGURAS, DOIS COMPORTAMENTOS

            No celular é uma coluna só, na ordem em que a decisão acontece: o produto
            convence, o preço fecha, o formulário e o pagamento executam, as dúvidas
            aparecem por último para quem ainda hesita.

            No computador a mesma tela vira duas colunas. Aquela coluna estreita no meio
            de uma tela larga parecia um aplicativo de celular espremido — e o pior:
            obrigava a rolar para achar onde pagar. Lado a lado, o que convence fica à
            esquerda e o que executa fica à direita, tudo visível de uma vez.

            A ordem no código já é a ordem do celular, e empilhada ela continua certa —
            por isso a grade não precisa reposicionar nada.
          */
          <div className="animate-fade-in space-y-5 lg:grid lg:grid-cols-12 lg:items-start lg:gap-8 lg:space-y-0">

            {/* A — o que convence: o pôster do produto e o resumo da oferta */}
            <div className="space-y-5 lg:col-span-7 lg:space-y-6">
              {/* Primeiro contêiner acima da página de checkout: Poster Visual Oficial do Bundle */}
              <VisualBundleHero />

              {/* b) Resumo Compacto da Oferta */}
              <ProductSummary price={PRECO_EM_REAIS} />
            </div>

            {/* B — o que executa: os dados, o pagamento e, logo abaixo, as dúvidas que
                aparecem justamente na hora de pagar */}
            <div className="space-y-5 lg:col-span-5 lg:space-y-6">
              {/* c) Formulário com dados essenciais */}
              <CustomerForm
                data={customer}
                onChange={handleCustomerChange}
                errors={errors}
                onOpenPrivacy={() => setLegalModal("privacy")}
              />

              {/* d) Pagamento em 2 abas (PIX e CARTÃO), selos de segurança e garantia */}
              <PaymentSection
                customer={customer}
                amountInCents={amountInCents}
                onGeneratePix={handleGeneratePix}
                onCriarCobranca={criarCobranca}
                onCardApproved={handleCardApproved}
                isProcessing={isProcessing}
                onValidateForm={validateForm}
              />

              {/* Rede de segurança: se o pagamento desta página não abrir — função fora do
                  ar, chave errada, Stripe instável —, a compra ainda tem por onde sair.
                  Nenhuma venda pode morrer por causa de um soluço nosso. */}
              {pagamentoQuebrado && (
                <div className="bg-slate-900/60 border border-amber-500/40 rounded-2xl p-4 text-xs text-slate-300 space-y-3">
                  <p className="leading-relaxed">
                    O pagamento não abriu aqui nesta página. Você pode concluir a compra com
                    segurança direto no Stripe:
                  </p>
                  <a
                    href={hostedCheckoutUrl()}
                    className="w-full py-3 px-5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-sm flex items-center justify-center transition-colors"
                  >
                    Continuar para o pagamento
                  </a>
                </div>
              )}

              {/* e) FAQ curto (acordeão) para sanar as principais dúvidas */}
              <CheckoutFaq />
            </div>
          </div>
        )}

        {/* O QR Code e a confirmação não viram duas colunas: são uma coisa só para ler e
            executar, e espalhá-las numa tela larga só afastaria o código do olho. */}
        {step === "pix_screen" && activeTransaction && (
          <div className="animate-fade-in mx-auto max-w-xl">
            <PixScreen transaction={activeTransaction} onCancel={() => setStep("checkout")} />
          </div>
        )}

        {step === "thank_you" && activeTransaction && (
          <div className="animate-fade-in mx-auto max-w-xl">
            <ThankYouScreen transaction={activeTransaction} />
          </div>
        )}
      </main>

      {/* f) Rodapé legal (Decreto 7.962/2013) */}
      <Footer
        onOpenTerms={() => setLegalModal("terms")}
        onOpenPrivacy={() => setLegalModal("privacy")}
      />

      {/* Modais Legais in-page (sem tirar da página) */}
      <LegalModals modalType={legalModal} onClose={() => setLegalModal(null)} />
    </div>
  );
}
