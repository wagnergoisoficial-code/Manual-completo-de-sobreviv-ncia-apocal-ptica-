import React, { useState, useEffect } from "react";
import { Copy, Check, QrCode, Clock } from "lucide-react";
import { PaymentTransaction } from "./types";
import { PILL_BASE, PILL_VARIANTS } from "../../components/BuyButton";

interface PixScreenProps {
  transaction: PaymentTransaction;
  onCancel?: () => void;
}

/**
 * O Pix gerado, esperando a transferência.
 *
 * No celular o botão de copiar vem antes do QR Code: quem está no celular paga colando
 * o código no app do banco — escanear a própria tela não dá. O QR é para quem está no
 * computador e paga pelo celular.
 */
export const PixScreen: React.FC<PixScreenProps> = ({ transaction, onCancel }) => {
  const [copied, setCopied] = useState(false);
  const [timeLeft, setTimeLeft] = useState<number>(1800); // 30 minutos em segundos

  // Contagem regressiva da validade real do Pix
  useEffect(() => {
    if (transaction.expirationDate) {
      const expTime = new Date(transaction.expirationDate).getTime();
      const now = Date.now();
      const diffSeconds = Math.max(0, Math.floor((expTime - now) / 1000));
      setTimeLeft(diffSeconds > 0 ? diffSeconds : 1800);
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [transaction.expirationDate]);

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  const copyPixCode = () => {
    if (transaction.qrCode) {
      navigator.clipboard.writeText(transaction.qrCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <span className="eyebrow flex items-center gap-3 text-amber">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-amber" />
          </span>
          Aguardando o pagamento
        </span>
        <h1 className="mt-5 text-section text-cream">Pix gerado</h1>
        <p className="mt-3 text-lead text-mist">
          R$ 39,90 · Manual Completo de Sobrevivência Apocalíptica + Plataforma Método 5P
        </p>
        <p className="mt-4 flex items-center gap-2 text-[0.8125rem] text-faint">
          <Clock className="h-3.5 w-3.5 shrink-0" strokeWidth={2} />
          Código válido por <span className="font-mono text-mist">{formatTimer(timeLeft)}</span>
        </p>
      </div>

      <div>
        <button type="button" onClick={copyPixCode} className={`${PILL_BASE} ${PILL_VARIANTS.solid} w-full`}>
          {copied ? (
            <>
              <Check className="h-4 w-4 shrink-0" strokeWidth={2.5} />
              Código copiado
            </>
          ) : (
            <>
              <Copy className="h-4 w-4 shrink-0" strokeWidth={2.25} />
              Copiar código Pix
            </>
          )}
        </button>
        {copied && (
          <p className="animate-fade-in mt-3 text-center text-[0.8125rem] text-mist">
            Agora abra o app do seu banco e escolha <strong className="text-cream">Pix Copia e Cola</strong>.
          </p>
        )}
      </div>

      <div className="flex flex-col items-center gap-4 border-y border-cream/10 py-8 text-center">
        {/* O QR fica sobre branco: é o contraste que a câmera do banco precisa para ler. */}
        <div className="bg-white p-3">
          {transaction.qrCodeImageUrl ? (
            <img
              src={transaction.qrCodeImageUrl}
              alt="QR Code do Pix de R$ 39,90"
              className="h-48 w-48 object-contain sm:h-52 sm:w-52"
            />
          ) : (
            <div className="flex h-48 w-48 flex-col items-center justify-center p-2 text-night">
              <QrCode className="mb-2 h-24 w-24" />
              <span className="max-h-12 overflow-hidden break-all font-mono text-[10px]">
                {transaction.qrCode ? transaction.qrCode.slice(0, 40) + "..." : "Carregando QR Code..."}
              </span>
            </div>
          )}
        </div>
        <span className="text-[0.8125rem] text-faint">
          No computador? Escaneie com o app do banco no celular.
        </span>
      </div>

      <div>
        <h2 className="eyebrow text-faint">Como pagar</h2>
        <ol className="mt-5 space-y-4 text-small text-mist">
          {[
            <>Abra o app do seu banco e escolha <strong className="text-cream">Pix Copia e Cola</strong>.</>,
            <>Cole o código e confirme o pagamento de <strong className="text-cream">R$ 39,90</strong>. O recebedor aparece como Ebanx.</>,
            <>Pode voltar para esta tela: ela percebe o pagamento sozinha, em poucos segundos.</>,
          ].map((passo, i) => (
            <li key={i} className="flex items-baseline gap-4">
              <span className="eyebrow shrink-0 text-amber">{String(i + 1).padStart(2, "0")}</span>
              <span>{passo}</span>
            </li>
          ))}
        </ol>
      </div>

      {onCancel && (
        <div className="text-center">
          <button
            type="button"
            onClick={onCancel}
            className="text-[0.8125rem] text-faint underline underline-offset-2 hover:text-cream"
          >
            Voltar e trocar a forma de pagamento
          </button>
        </div>
      )}
    </div>
  );
};
