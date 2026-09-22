import React, { useEffect } from "react";
import { CheckCircle2, Mail } from "lucide-react";
import { PaymentTransaction } from "./types";
import { trackBrowserPurchase } from "./tracking";
import { PILL_BASE, PILL_VARIANTS } from "../../components/BuyButton";

interface ThankYouScreenProps {
  transaction: PaymentTransaction;
}

/**
 * O pagamento entrou, com a pessoa ainda na tela.
 *
 * Esta tela não libera nada — quem libera é o webhook, no servidor. Ela só diz o que
 * acontece agora e onde procurar o e-mail com a senha.
 */
export const ThankYouScreen: React.FC<ThankYouScreenProps> = ({ transaction }) => {
  // Dispara o evento Purchase no navegador com o MESMO event_id para desduplicação no Meta CAPI
  useEffect(() => {
    if (transaction?.eventId) {
      trackBrowserPurchase(transaction.eventId, transaction.total || 39.9, "BRL");
    }
  }, [transaction?.eventId, transaction?.total]);

  const customerEmail = transaction.customer?.email || "o e-mail informado";
  const primeiroNome = (transaction.customer?.name || "").trim().split(/\s+/)[0];

  return (
    <div className="space-y-10 py-4">
      <div>
        <CheckCircle2 className="h-10 w-10 text-amber" strokeWidth={1.75} />
        <span className="eyebrow mt-8 block text-amber">Pagamento aprovado</span>
        <h1 className="mt-5 text-section text-cream">
          {primeiroNome ? `${primeiroNome}, seu acesso está liberado` : "Seu acesso está liberado"}
        </h1>
        <p className="mt-5 text-lead text-mist">
          Enviamos o login e a senha da plataforma para{" "}
          <span className="text-cream">{customerEmail}</span>. Lá dentro estão os 5 módulos, os
          checklists e o Manual Completo em PDF para baixar.
        </p>
        <p className="mt-4 font-mono text-[0.8125rem] text-faint">
          Pedido {transaction.id} · R$ 39,90
        </p>
      </div>

      <a
        href="https://appmanualcompleto.com"
        target="_blank"
        rel="noopener noreferrer"
        className={`${PILL_BASE} ${PILL_VARIANTS.solid} w-full`}
      >
        Acessar a plataforma
      </a>

      <p className="flex items-start gap-3 border-t border-cream/10 pt-8 text-small text-mist">
        <Mail className="mt-0.5 h-4 w-4 shrink-0 text-faint" strokeWidth={2} />
        <span>
          Não chegou em alguns minutos? Confira o spam e a lixeira — o e-mail leva a senha e
          alguns provedores o separam. Se ainda assim não achar, escreva para{" "}
          <a href="mailto:suporte@appmanualcompleto.com" className="text-cream underline underline-offset-2">
            suporte@appmanualcompleto.com
          </a>
          .
        </span>
      </p>
    </div>
  );
};
