import React from "react";
import seloGarantia from "../../assets/images/selo-garantia-7-dias.png";

/**
 * O selo de 7 dias, com o mesmo texto da seção "A oferta" da página de vendas.
 *
 * Fica logo abaixo do botão de pagar, e não perto do preço: a dúvida que ele responde —
 * "e se eu me arrepender?" — aparece no instante de confirmar, não quando se lê o valor.
 */
export const Garantia: React.FC = () => (
  <div className="flex items-center gap-5 border-t border-cream/10 pt-7">
    <img
      src={seloGarantia}
      alt="Selo de 7 dias de garantia"
      width={120}
      height={120}
      loading="lazy"
      decoding="async"
      className="h-20 w-20 shrink-0 drop-shadow-[0_10px_24px_rgba(0,0,0,0.55)] sm:h-24 sm:w-24"
    />
    <div>
      <p className="text-title text-cream">Risco zero por 7 dias</p>
      <p className="mt-2 text-small text-mist">
        Entre, use a plataforma e baixe o manual. Se não servir, é só pedir e devolvemos o
        valor integralmente — sem precisar justificar.
      </p>
    </div>
  </div>
);
