import React from "react";

interface FooterProps {
  onOpenTerms: () => void;
  onOpenPrivacy: () => void;
}

/**
 * O mesmo rodapé da página de vendas, com os termos e o contato do suporte.
 *
 * O desenho original trazia CNPJ e endereço que não eram da empresa — vieram prontos do
 * protótipo. Dado cadastral falso numa página de pagamento é pior do que nenhum: se um
 * dia forem necessários, entram aqui os verdadeiros.
 */
export const Footer: React.FC<FooterProps> = ({ onOpenTerms, onOpenPrivacy }) => (
  <footer className="border-t border-cream/10 py-12">
    <div className="mx-auto flex max-w-[1160px] flex-col gap-8 px-6 sm:px-10 md:flex-row md:items-start md:justify-between">
      <p className="max-w-lg text-[0.8125rem] leading-relaxed text-faint">
        Conteúdo informativo e educacional, voltado à preparação doméstica para emergências.
        Não substitui atendimento médico, socorro público nem orientação profissional.
      </p>

      <div className="space-y-3 text-[0.8125rem] text-faint md:text-right">
        <div className="flex flex-wrap gap-x-5 gap-y-2 md:justify-end">
          <button type="button" onClick={onOpenTerms} className="underline underline-offset-2 hover:text-cream">
            Termos de uso
          </button>
          <button type="button" onClick={onOpenPrivacy} className="underline underline-offset-2 hover:text-cream">
            Política de privacidade
          </button>
        </div>
        <p>
          Suporte:{" "}
          <a href="mailto:suporte@appmanualcompleto.com" className="text-mist hover:text-cream">
            suporte@appmanualcompleto.com
          </a>
        </p>
        <p>© {new Date().getFullYear()} Manual Completo de Sobrevivência Apocalíptica</p>
      </div>
    </div>
  </footer>
);
