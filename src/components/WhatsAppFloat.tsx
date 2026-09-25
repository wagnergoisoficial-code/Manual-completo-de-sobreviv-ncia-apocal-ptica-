import React from 'react';

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

export default function WhatsAppFloat() {
  return (
    <a
      href={`https://wa.me/${NUMERO}?text=${encodeURIComponent(MENSAGEM)}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Tirar uma dúvida pelo WhatsApp"
      /*
        No celular ele sobe para 6rem: embaixo dele passa a pílula fixa de compra, e as
        duas no mesmo canto viravam um toque errado garantido. A altura é fixa nos dois
        estados — a pílula vai e volta conforme a rolagem, e um botão que pula de lugar
        sozinho é pior do que um botão com folga embaixo.
      */
      className="fixed bottom-24 right-4 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25d366] text-white shadow-[0_8px_28px_rgba(0,0,0,0.45)] transition-transform duration-200 hover:scale-105 active:scale-95 md:bottom-6 md:right-6"
      style={{ marginBottom: 'env(safe-area-inset-bottom)' }}
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
  );
}
