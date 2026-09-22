import React from "react";
import BookObject from "../../components/BookObject";
import capa from "../../assets/images/capa-manual-checkout.jpg";

/**
 * O produto, com as mesmas palavras e a mesma capa da página de vendas.
 *
 * Quem chega aqui acabou de decidir comprar o manual. Se a tela de pagamento mostra outro
 * nome, outra capa ou outro produto na frente, a pessoa hesita — e é na hesitação que ela
 * fecha a aba. Por isso o manual vem primeiro no título: é o produto principal, e a
 * plataforma vem junto com ele.
 */

export const TITULO = "Manual Completo de Sobrevivência Apocalíptica + Plataforma Método 5P";

/** A mesma lista da seção "A oferta" da página de vendas, sem citar os bônus pelo nome. */
const INCLUIDO = [
  ["Plataforma completa do Método 5P", "Os 5 módulos, os checklists e as ferramentas"],
  ["Manual Completo em PDF", "Para baixar e consultar sem internet"],
  ["3 bônus inclusos", "Liberados junto com o seu acesso"],
  ["Acesso vitalício", "Novos módulos e atualizações sem custo"],
] as const;

/**
 * O topo do celular: capa pequena, nome e preço — e nada mais.
 *
 * No celular a tela é curta, e o que importa é o formulário aparecer logo. Este resumo
 * confirma em uma linha de olhar o que está sendo comprado e por quanto; a lista completa
 * fica para baixo do botão, para quem ainda quiser conferir.
 */
export const ResumoCompacto: React.FC = () => (
  <div className="flex items-center gap-4 lg:hidden">
    <img
      src={capa}
      alt="Capa do Manual Completo de Sobrevivência Apocalíptica, de Wagner Gois"
      width={56}
      height={84}
      decoding="async"
      className="h-[84px] w-14 shrink-0 object-cover shadow-[0_10px_24px_rgba(0,0,0,0.55)] ring-1 ring-cream/10"
    />
    <div className="min-w-0">
      <h1 className="text-[0.9375rem] font-semibold leading-snug text-cream">{TITULO}</h1>
      <p className="mt-2 flex items-baseline gap-2">
        <span className="text-[1.375rem] font-semibold tracking-[-0.02em] text-cream">R$&nbsp;39,90</span>
        <span className="text-[0.8125rem] text-faint">pagamento único</span>
      </p>
    </div>
  </div>
);

/**
 * A oferta inteira.
 *
 * No computador é a coluna da esquerda: o livro, o título, o preço e o que está incluído,
 * lado a lado com o formulário. No celular o livro, o título e o preço já estão no resumo
 * do topo — então aqui aparece só a lista, abaixo do botão de pagar.
 */
export const OfertaCompleta: React.FC = () => (
  <div>
    <div className="hidden lg:block">
      <BookObject src={capa} className="w-[58%] max-w-[250px]" />

      <span className="eyebrow mt-16 block text-amber">A oferta</span>
      <h1 className="mt-5 text-title text-cream">{TITULO}</h1>

      <div className="mt-6 flex items-baseline gap-4">
        <span className="text-hero text-cream">R$&nbsp;39,90</span>
        <span className="text-small text-mist">uma vez só</span>
      </div>
      <p className="mt-4 text-small text-mist">
        Sem assinatura e sem mensalidade. Acesso imediato e vitalício.
      </p>
    </div>

    <h2 className="eyebrow text-faint lg:mt-10">O que você recebe</h2>
    <ul className="mt-5 border-t border-cream/10">
      {INCLUIDO.map(([titulo, detalhe]) => (
        <li key={titulo} className="flex items-baseline gap-4 border-b border-cream/10 py-4">
          <span aria-hidden="true" className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-amber" />
          <div className="min-w-0">
            <h3 className="text-title text-cream">{titulo}</h3>
            <p className="mt-1 text-small text-mist">{detalhe}</p>
          </div>
        </li>
      ))}
    </ul>
  </div>
);
