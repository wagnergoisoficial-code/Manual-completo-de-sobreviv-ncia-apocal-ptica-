import React from 'react';
import { HandArrow, HandNote } from './Annotation';
import claudioMariotto from '../assets/images/depoimento-claudio-mariotto.jpeg';
import herminioMacamo from '../assets/images/depoimento-herminio-macamo.jpeg';
import natanaelLopes from '../assets/images/depoimento-natanael-lopes.jpeg';
import marquinhos from '../assets/images/depoimento-marquinhos.jpeg';
import heitorSantos from '../assets/images/depoimento-heitor-santos.jpeg';
import natanJunior from '../assets/images/depoimento-natan-junior.jpeg';
import claraCristina from '../assets/images/depoimento-clara-cristina.jpeg';
import compradorAnonimo from '../assets/images/depoimento-comprador-anonimo.jpeg';
import maralisa from '../assets/images/depoimento-maralisa.jpeg';
import naty from '../assets/images/depoimento-naty.jpeg';
import marcosVinicius from '../assets/images/depoimento-marcos-vinicius.jpeg';

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

/**
 * COMO ACRESCENTAR UM PRINT
 *
 *   1. Salve a imagem em src/assets/images/ (ex.: depoimento-nome-sobrenome.jpeg).
 *   2. Importe no topo deste arquivo, como o do Claudio.
 *   3. Acrescente uma entrada abaixo, com o texto do print no alt e uma inclinação
 *      diferente das vizinhas (entre -2 e 2, nunca zero). Um offset como 'lg:mt-14' em
 *      prints alternados quebra a linha reta da fileira no computador.
 *
 * Só print real, de comprador real. No computador eles se arrumam em fileiras de dois;
 * no celular, um embaixo do outro.
 */
const DEPOIMENTOS: Depoimento[] = [
  {
    src: claudioMariotto,
    alt: 'Comentário de Claudio Mariotto: “Comprei! Material claro, objetivo e direto! Me chamou a atenção as falas para o equilíbrio emocional enquanto os protocolos são aplicados.”',
    tilt: -1.6,
  },
  {
    src: herminioMacamo,
    alt: 'Mensagem de Herminio Macamo no WhatsApp: “Olá, gostei do conteúdo, ficou muito bom, obrigado por esta informação, minha esposa que me falou dessa plataforma e o livro, informação bem importante que merece nossa total atenção.”',
    tilt: 1.4,
    offset: 'lg:mt-14',
  },
  {
    src: natanaelLopes,
    alt: 'Mensagem de Natanael Lopes no WhatsApp: “O material é muito bom mesmo! Conteúdo completo, fácil de entender e muito útil para quem quer começar a se preparar. Gostei bastante!”',
    tilt: -1.1,
  },
  {
    src: marquinhos,
    alt: 'Mensagem de Marquinhos no WhatsApp: “Eu achava que estava preparado até conhecer esse material. O Método me mostrou muita coisa que eu estava deixando passar. Gostei demais da compra!”',
    tilt: 1.7,
    offset: 'lg:mt-10',
  },
  {
    src: heitorSantos,
    alt: 'Mensagem de Heitor Santos no WhatsApp: “Já comprei outros conteúdos desse nicho, mas esse foi de longe o melhor material que encontrei até agora. Muito completo, prático e bem feito. Superou minhas expectativas!”',
    tilt: -1.9,
  },
  {
    src: natanJunior,
    alt: 'Mensagem de Natan Júnior no WhatsApp: “Boa tarde! Passei só para dizer que gostei muito do material. É completo, fácil de entender e a plataforma me surpreendeu bastante. Parabéns pelo trabalho!”',
    tilt: 1.2,
    offset: 'lg:mt-16',
  },
  {
    src: claraCristina,
    alt: 'Mensagem de Clara Cristina no WhatsApp: “Olá, tudo bem? Estou muito satisfeita com o material. Dá para perceber que foi feito com muita pesquisa e cuidado. Tem muita informação útil reunida em um só lugar. Gostei muito!”',
    tilt: -1.4,
  },
  {
    /* O print deste chega sem nome salvo, só com o número. Ver a observação no fim
       deste arquivo antes de publicar. */
    src: compradorAnonimo,
    alt: 'Mensagem de um comprador no WhatsApp: “Olá, como vai? Comprei o material e estou gostando muito. Tem muita informação importante que eu nem imaginava. Foi uma ótima compra, parabéns pelo trabalho!”',
    tilt: 1.8,
    offset: 'lg:mt-12',
  },
  {
    src: maralisa,
    alt: 'Mensagem de Maralisa no WhatsApp: “Comprei o Método e gostei muito. O conteúdo é simples, prático e me ajudou a entender por onde começar minha preparação. Valeu muito a pena!”',
    tilt: -1.2,
  },
  {
    src: naty,
    alt: 'Mensagem de Naty no WhatsApp: “Foi uma das melhores compras que fiz. O Método abriu meus olhos para coisas que eu nunca tinha pensado antes. Conteúdo muito completo e a plataforma é excelente. Recomendo!”',
    tilt: 1.5,
    offset: 'lg:mt-14',
  },
  {
    src: marcosVinicius,
    alt: 'Mensagem de Marcos Vinicius no WhatsApp: “Olá, boa tarde! Queria agradecer pelo material. Estou lendo e realmente me surpreendeu pela quantidade de informações importantes. A plataforma também ficou muito boa. Excelente trabalho!”',
    tilt: -1.7,
  },
];

/*
  DUAS COISAS PARA RESOLVER FORA DO CÓDIGO

  · Três prints — Marquinhos, Maralisa e Naty — dizem "Método 4P" na imagem. A página
    vende o Método 5P, com 5 módulos, e escreve 5P em todo lugar. Quem lê os dois no
    mesmo rolar percebe. Não dá para corrigir daqui: ou os prints são refeitos, ou esses
    três saem. Nos alt eu escrevi só "o Método", para o texto não repetir o erro.

  · O print do comprador sem nome mostra o telefone dele inteiro no cabeçalho, e isso
    vai ao ar para qualquer visitante. Cortar a faixa de cima da imagem resolve e não
    tira nada da prova — o que convence é o balão, não o cabeçalho.
*/

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
            className={`group relative mx-auto w-full max-w-[560px] lg:mx-0 lg:w-[calc(50%-1.25rem)] ${depoimento.offset ?? ''}`}
            style={{ transform: `rotate(${depoimento.tilt}deg)` }}
          >
            {/* A mesma luz quente do resto da página, para o print não flutuar no vazio. */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -inset-6 bg-[radial-gradient(ellipse_at_center,rgba(245,158,11,0.16),transparent_70%)] blur-2xl"
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
