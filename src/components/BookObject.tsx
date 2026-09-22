import React from 'react';
import manualCover from '../assets/images/capa-manual.jpg';

/**
 * O objeto: a capa tratada como produto físico, com perspectiva, lombada e a mesma luz
 * quente que atravessa a página. Não é um mockup flutuando — está apoiado numa sombra.
 *
 * Mora aqui, e não dentro da página de vendas, porque o checkout mostra o mesmo livro: é
 * o que faz a pessoa reconhecer, na hora de pagar, o produto que decidiu comprar.
 */
interface BookObjectProps {
  /** Outra versão da mesma capa — o checkout usa uma mais leve, para abrir rápido no celular. */
  src?: string;
  /** A largura do objeto. O padrão é o do hero da página de vendas. */
  className?: string;
}

export default function BookObject({
  src = manualCover,
  className = 'w-[68%] max-w-[340px] lg:w-[78%] lg:max-w-none',
}: BookObjectProps) {
  return (
    <div className={`relative mx-auto ${className}`}>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-16 bg-[radial-gradient(ellipse_at_50%_40%,rgba(243,179,64,0.20),transparent_66%)] blur-2xl"
      />
      <div className="relative [perspective:1600px]">
        <div className="relative [transform:rotateY(-13deg)_rotateX(2deg)] [transform-style:preserve-3d]">
          <img
            src={src}
            alt="Capa do Manual Completo de Sobrevivência Apocalíptica"
            className="relative block w-full shadow-[24px_36px_70px_rgba(0,0,0,0.7)]"
            referrerPolicy="no-referrer"
          />
          {/* Lombada: a borda que transforma uma imagem plana num objeto. */}
          <span
            aria-hidden="true"
            className="absolute inset-y-0 -left-[9px] w-[9px] bg-gradient-to-r from-night via-ash to-slate"
            style={{ transform: 'rotateY(-72deg)', transformOrigin: 'right center' }}
          />
          {/* Brilho da luz âmbar batendo na capa pela direita. */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(102deg,rgba(0,0,0,0.42),transparent_38%,rgba(255,200,92,0.14))]"
          />
        </div>
      </div>
      {/* Chão: a sombra que apoia o objeto. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-8 left-[6%] h-10 w-[88%] rounded-[50%] bg-black/55 blur-2xl"
      />
    </div>
  );
}
