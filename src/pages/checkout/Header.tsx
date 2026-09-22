import React from "react";
import { Lock } from "lucide-react";
import { PeakMark } from "../../components/Header";

/**
 * O topo do checkout: a mesma marca da página de vendas, e nada para clicar.
 *
 * É o mesmo pico e a mesma "Sobrevivência Real" que a pessoa acabou de ver — o sinal de
 * que continua no mesmo lugar, comprando o mesmo produto. Diferente de lá, a marca aqui
 * não é link: nesta página não existe outro destino além de pagar.
 */
export const Header: React.FC = () => {
  return (
    <header className="border-b border-cream/10">
      <div className="mx-auto flex max-w-[1160px] items-center justify-between gap-6 px-6 py-4 sm:px-10 sm:py-5">
        <span className="flex items-center gap-3.5 whitespace-nowrap text-cream">
          <PeakMark />
          <span className="eyebrow">Sobrevivência Real</span>
        </span>

        {/* No celular a frase não cabe ao lado da marca sem quebrar as duas: fica o cadeado. */}
        <span className="flex items-center gap-2 text-[0.8125rem] text-faint">
          <Lock className="h-3.5 w-3.5 shrink-0" strokeWidth={2} aria-hidden="true" />
          <span className="sr-only sm:not-sr-only">Pagamento seguro</span>
        </span>
      </div>
    </header>
  );
};
