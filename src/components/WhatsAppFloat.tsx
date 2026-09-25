import React, { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Botão flutuante do WhatsApp.
 *
 * É verde, e não âmbar, de propósito. O âmbar desta página significa uma coisa só —
 * "comprar" —, e um botão de suporte com a mesma cor passa a disputar atenção com o
 * CTA em vez de socorrer quem travou. O verde com o glifo é lido sem ninguém precisar
 * ler: quem reconhece, reconhece de longe; quem não precisa, ignora.
 *
 * É a mesma licença que os prints dos depoimentos já tomam — deixar entrar um pedaço
 * visual de fora quando é justamente o "de fora" que faz a peça funcionar.
 */

/** Só dígitos: país, DDD e número. É o formato que o wa.me exige. +55 17 99130-7454 */
const NUMERO = '5517991307454';

/**
 * A conversa já começa dizendo de onde a pessoa veio.
 *
 * Sem isto, do outro lado chega um "oi" sem contexto e a resposta demora mais uma
 * rodada — justo com quem estava a um passo de comprar e parou para perguntar.
 */
const MENSAGEM = 'Olá! Vim da página do Manual Completo de Sobrevivência e tenho uma dúvida.';

/**
 * A marca das ações que este botão não tem o direito de cobrir.
 *
 * Ela viaja junto da pílula âmbar cheia (ver PILL_VARIANTS.solid), que nas duas páginas
 * é sempre a mesma coisa: comprar, pagar, copiar o código do Pix. São botões de largura
 * total, então mais cedo ou mais tarde um deles passa rolando por baixo do canto onde
 * este aqui mora — e um toque perdido ali custa a venda inteira.
 */
export const ACAO_CRITICA = 'acao-critica';

/** Folga em volta do botão. Encostar já conta como cobrir. */
const FOLGA = 8;

interface WhatsAppFloatProps {
  /**
   * A página de vendas tem a pílula fixa de compra no rodapé do celular, e o botão sobe
   * para não dividir o canto com ela. O checkout não tem barra nenhuma: lá ele fica no
   * canto de baixo mesmo.
   */
  acimaDaBarraDeCompra?: boolean;
}

export default function WhatsAppFloat({ acimaDaBarraDeCompra = false }: WhatsAppFloatProps) {
  /**
   * A moldura é quem é medida, e ela nunca se transforma.
   *
   * Medir o próprio botão não funcionaria: ele encolhe ao se recolher e cresce no hover,
   * e getBoundingClientRect enxerga transform. Encolher na saída pode tirá-lo da colisão
   * que o mandou sair — aí ele volta, colide de novo e pisca sem parar. A moldura tem
   * posição e tamanho fixos; o botão lá dentro faz o que quiser.
   */
  const ref = useRef<HTMLDivElement>(null);
  const [recolhido, setRecolhido] = useState<boolean>(false);

  /**
   * Some enquanto uma ação crítica estiver debaixo dele, e volta assim que ela passa.
   *
   * O teste é de sobreposição, não de "está na tela": a pílula fixa da página de vendas
   * fica visível o tempo todo e nunca encosta neste canto — se bastasse aparecer, o
   * botão do WhatsApp viveria escondido no celular, que é justamente onde ele serve.
   */
  const medir = useCallback(() => {
    const botao = ref.current;
    if (!botao) return;

    const meu = botao.getBoundingClientRect();
    const cobre = Array.from(document.getElementsByClassName(ACAO_CRITICA)).some((alvo) => {
      const dele = alvo.getBoundingClientRect();
      if (dele.width === 0 && dele.height === 0) return false;
      return (
        dele.left < meu.right + FOLGA &&
        dele.right > meu.left - FOLGA &&
        dele.top < meu.bottom + FOLGA &&
        dele.bottom > meu.top - FOLGA
      );
    });

    setRecolhido(cobre);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', medir, { passive: true });
    window.addEventListener('resize', medir);
    return () => {
      window.removeEventListener('scroll', medir);
      window.removeEventListener('resize', medir);
    };
  }, [medir]);

  // Sem lista de dependências de propósito: no checkout a tela troca sem ninguém rolar
  // nada (formulário → QR Code → acesso liberado), e a cada troca os botões mudam de
  // lugar. Medir a cada render é o que cobre esse caso; é uma conta de quatro números.
  useEffect(medir);

  return (
    /*
      z-40 e não z-50: os termos e a política do checkout abrem numa camada z-50, e um
      botão de WhatsApp furando o modal por cima é lixo visual.

      A moldura não recebe toque em lugar nenhum — só o botão dentro dela. Sem isso o
      canto inteiro engoliria toques destinados ao que está por baixo, inclusive com o
      botão já recolhido.
    */
    <div
      ref={ref}
      className={`pointer-events-none fixed right-4 z-40 h-14 w-14 md:right-6 md:bottom-6 ${
        acimaDaBarraDeCompra ? 'bottom-24' : 'bottom-6'
      }`}
      style={{ marginBottom: 'env(safe-area-inset-bottom)' }}
    >
      <a
        href={`https://wa.me/${NUMERO}?text=${encodeURIComponent(MENSAGEM)}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Tirar uma dúvida pelo WhatsApp"
        aria-hidden={recolhido}
        tabIndex={recolhido ? -1 : undefined}
        className={`flex h-full w-full items-center justify-center rounded-full bg-[#25d366] text-white shadow-[0_8px_28px_rgba(0,0,0,0.45)] transition-all duration-200 ${
          recolhido
            ? 'scale-90 opacity-0'
            : 'pointer-events-auto opacity-100 hover:scale-105 active:scale-95'
        }`}
      >
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          focusable="false"
          className="h-7 w-7 fill-current"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0 0 20.885 3.4" />
        </svg>
      </a>
    </div>
  );
}
