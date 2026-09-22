import React, { useEffect } from "react";
import { X } from "lucide-react";
import { PILL_BASE, PILL_VARIANTS } from "../../components/BuyButton";

interface LegalModalsProps {
  modalType: "terms" | "privacy" | null;
  onClose: () => void;
}

/**
 * Termos e privacidade, abertos por cima da página.
 *
 * Abrir numa aba nova tiraria a pessoa do checkout no meio da compra — e muita gente não
 * volta. O texto descreve o que de fato acontece: quem processa o pagamento, para onde
 * vão os dados e como pedir o reembolso.
 */
export const LegalModals: React.FC<LegalModalsProps> = ({ modalType, onClose }) => {
  // Esc fecha, como em qualquer janela sobreposta.
  useEffect(() => {
    if (!modalType) return;
    const aoTeclar = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", aoTeclar);
    return () => window.removeEventListener("keydown", aoTeclar);
  }, [modalType, onClose]);

  if (!modalType) return null;

  const titulo = modalType === "terms" ? "Termos de uso" : "Política de privacidade";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={titulo}
        onClick={(e) => e.stopPropagation()}
        className="animate-fade-in flex max-h-[85vh] w-full max-w-lg flex-col border border-cream/10 bg-coal shadow-[0_30px_80px_rgba(0,0,0,0.6)]"
      >
        <div className="flex items-center justify-between gap-4 border-b border-cream/10 px-6 py-5">
          <h3 className="text-title text-cream">{titulo}</h3>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar"
            className="rounded-full p-1 text-mist transition-colors hover:text-cream"
          >
            <X className="h-5 w-5" strokeWidth={2} />
          </button>
        </div>

        <div className="space-y-4 overflow-y-auto px-6 py-5 text-small text-mist">
          {modalType === "terms" ? (
            <>
              <p>
                <strong className="text-cream">1. Objeto.</strong> Estes termos regulam a compra do
                Manual Completo de Sobrevivência Apocalíptica, em PDF, junto com o acesso à
                Plataforma Método 5P e aos bônus inclusos.
              </p>
              <p>
                <strong className="text-cream">2. Pagamento e acesso.</strong> O valor é de R$ 39,90,
                em pagamento único, sem assinatura. O pagamento, por Pix ou cartão, é processado pelo
                Stripe; no Pix, o recebedor aparece no extrato como Ebanx, parceiro do Stripe no
                Brasil. Assim que o pagamento é confirmado, o login e a senha de acesso são enviados
                para o e-mail informado na compra.
              </p>
              <p>
                <strong className="text-cream">3. Arrependimento e garantia.</strong> Conforme o art. 49
                do Código de Defesa do Consumidor e o Decreto 7.962/2013, você pode pedir o reembolso
                integral em até 7 dias corridos a partir da compra, pelo e-mail
                suporte@appmanualcompleto.com, sem precisar justificar.
              </p>
              <p>
                <strong className="text-cream">4. Propriedade intelectual.</strong> O manual, os
                checklists, as ferramentas e o conteúdo da plataforma são do autor. É proibido
                reproduzir ou redistribuir o material sem autorização.
              </p>
            </>
          ) : (
            <>
              <p>
                <strong className="text-cream">1. O que coletamos e para quê.</strong> Em cumprimento
                à Lei Geral de Proteção de Dados (Lei 13.709/2018), coletamos nome, e-mail, CPF e, se
                você informar, WhatsApp. Eles servem para:
              </p>
              <ul className="list-disc space-y-1 pl-5">
                <li>criar o seu acesso e enviar o login e a senha;</li>
                <li>processar o pagamento no Stripe — o CPF é exigido pelo Banco Central para emitir o Pix;</li>
                <li>prestar suporte, quando você pedir;</li>
                <li>prevenir fraudes.</li>
              </ul>
              <p>
                <strong className="text-cream">2. Com quem compartilhamos.</strong> Seus dados não são
                vendidos. Eles vão apenas para os serviços que fazem a compra acontecer: o Stripe, que
                processa o pagamento, e a Meta, que recebe o seu e-mail criptografado para medir o
                resultado dos nossos anúncios. Os dados do cartão são digitados direto no campo do
                Stripe e não passam pelos nossos servidores.
              </p>
              <p>
                <strong className="text-cream">3. Seus direitos.</strong> Você pode pedir a qualquer
                momento a confirmação, a correção ou a exclusão dos seus dados pelo e-mail
                suporte@appmanualcompleto.com.
              </p>
            </>
          )}
        </div>

        <div className="border-t border-cream/10 px-6 py-4">
          <button type="button" onClick={onClose} className={`${PILL_BASE} ${PILL_VARIANTS.ghost} w-full`}>
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
