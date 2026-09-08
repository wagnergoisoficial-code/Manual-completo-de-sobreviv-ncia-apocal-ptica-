import React from 'react';

/**
 * A camada escrita à mão.
 *
 * São as únicas marcas da página que não obedecem à grade: entram tortas, por cima do
 * layout, como anotação de quem já leu o manual e rabiscou na margem. É o que separa
 * esta página de um template — e por isso são raras. Três em toda a página; a quarta
 * já viraria decoração.
 */

/** Traço curvo que liga uma anotação ao que ela comenta. */
export function HandArrow({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 60 96"
      fill="none"
      aria-hidden="true"
      className={`text-cream/55 ${className}`}
    >
      <path
        d="M52 4c6 26 1 48-14 62-5 5-12 9-19 12"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <path
        d="M28 70c-3 6-6 12-9 15m0 0c-4-1-8-2-12-2"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Sublinhado torto sob uma frase — a ênfase feita à mão, não com negrito. */
export function HandUnderline({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 220 14"
      fill="none"
      preserveAspectRatio="none"
      aria-hidden="true"
      className={`text-amber ${className}`}
    >
      <path
        d="M3 8.5c38-4 84-6.5 138-5.5 28 .5 52 2.5 76 5"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Texto manuscrito. `tilt` é o grau de desalinho — nunca zero, nunca simétrico. */
export function HandNote({
  children,
  tilt = -3,
  className = '',
}: {
  children: React.ReactNode;
  tilt?: number;
  className?: string;
}) {
  return (
    <p
      className={`hand text-cream/80 ${className}`}
      style={{ transform: `rotate(${tilt}deg)` }}
    >
      {children}
    </p>
  );
}
