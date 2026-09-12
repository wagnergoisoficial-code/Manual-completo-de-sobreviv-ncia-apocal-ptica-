import React from 'react';
import { HandArrow, HandNote } from './Annotation';
import claudioMariotto from '../assets/images/depoimento-claudio-mariotto.jpeg';

/**
 * Prova social em print, não em citação diagramada.
 *
 * Um depoimento reescrito na tipografia da página vira texto de marketing — qualquer um
 * inventa. O print cru do comentário, com a foto e o nome da pessoa, é a única forma que
 * não dá para falsificar de graça. Por isso as imagens entram sem tratamento: nada de
 * inverter cor ou escurecer para "combinar" com a página. O contraste do balão claro
 * sobre o preto é justamente o que denuncia que aquilo veio de outro lugar.
 *
 * A inclinação e o deslocamento de cada print são fixos, definidos um a um na lista
 * abaixo — não sorteados. Aleatório de verdade gera sobreposição feia e muda a cada
 * render; o que parece descuidado aqui foi medido.
 */

interface Depoimento {
  src: string;
  /** O texto do print, para quem lê com leitor de tela — e para o Google. */
  alt: string;
  /** Graus de inclinação. Nunca zero: print reto perde a sensação de objeto solto. */
  tilt: number;
  /** Deslocamento vertical no desktop, para a fileira não virar uma linha reta. */
  offset?: string;
}

const DEPOIMENTOS: Depoimento[] = [
  {
    src: claudioMariotto,
    alt: 'Comentário de Claudio Mariotto: “Comprei! Material claro, objetivo e direto! Me chamou a atenção as falas para o equilíbrio emocional enquanto os protocolos são aplicados.”',
    tilt: -1.6,
  },
];

interface TestimonialsProps {
  /**
   * A anotação manuscrita pede margem para existir.
   *
   * Na página de vendas ela tem a largura toda e funciona. Na coluna estreita do
   * checkout ela cai por cima do print — e anotação que atropela o que comenta deixa
   * de ser charme e vira defeito. Lá ela sai.
   */
  comAnotacao?: boolean;
}

export default function Testimonials({ comAnotacao = true }: TestimonialsProps) {
  return (
    <div className="relative">
      {comAnotacao && (
        <div className="pointer-events-none absolute -top-2 right-0 z-10 hidden w-48 lg:block">
          <HandNote tilt={5} className="text-[1.4rem] leading-tight">
            Gente de verdade, print sem retoque.
          </HandNote>
          <HandArrow className="ml-4 mt-1 h-16 w-11 text-cream/70" />
        </div>
      )}

      <div className="flex flex-col items-center gap-12 lg:flex-row lg:flex-wrap lg:items-start lg:justify-center lg:gap-x-10 lg:gap-y-16">
        {DEPOIMENTOS.map((depoimento) => (
          <figure
            key={depoimento.src}
            className={`group relative mx-auto w-full max-w-[560px] ${depoimento.offset ?? ''}`}
            style={{ transform: `rotate(${depoimento.tilt}deg)` }}
          >
            {/* A mesma luz quente do resto da página, para o print não flutuar no vazio. */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -inset-6 bg-[radial-gradient(ellipse_at_center,rgba(243,179,64,0.16),transparent_70%)] blur-2xl"
            />
            <img
              src={depoimento.src}
              alt={depoimento.alt}
              loading="lazy"
              decoding="async"
              className="relative block w-full shadow-[0_20px_50px_rgba(0,0,0,0.6)] ring-1 ring-cream/10 transition-transform duration-500 ease-out group-hover:rotate-[0.6deg] group-hover:scale-[1.015]"
            />
          </figure>
        ))}
      </div>
    </div>
  );
}
