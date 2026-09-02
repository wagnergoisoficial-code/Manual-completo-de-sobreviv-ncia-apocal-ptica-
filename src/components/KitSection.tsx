import React from 'react';
import { BONUSES } from '../data';
import { Check } from 'lucide-react';
import manualCover from '../assets/images/manual_cover_1783965348887.jpg';

/** Miniatura da plataforma: um diagrama tipográfico da área de membros, não um screenshot. */
const CHECKLIST_PREVIEW = [
  { label: 'Reserva de água', done: '03', total: '07' },
  { label: 'Kit médico', done: '05', total: '09' },
  { label: 'Evacuação 72h', done: '00', total: '12' },
];

const SPECS = [
  { key: 'Autor', value: 'Wagner Gois' },
  { key: 'Preço', value: 'R$\u00a039,90' },
  { key: 'Acesso', value: 'Vitalício' },
  { key: 'Envio', value: 'Imediato' },
];

export default function KitSection() {
  return (
    <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-20 items-center">

      {/* Composição: o objeto físico e a tela */}
      <div className="order-2 md:order-1 relative">
        <div className="relative z-10 w-3/4 aspect-[2/3] border border-hairline bg-surface mx-auto md:ml-0 md:mr-auto">
          <img
            src={manualCover}
            alt="Capa do Manual Completo de Sobrevivência Apocalíptica"
            className="w-full h-full object-cover grayscale-[0.15] contrast-110"
            referrerPolicy="no-referrer"
          />
        </div>

        <div className="md:absolute md:-bottom-12 md:-right-2 md:w-2/3 mt-6 md:mt-0 border border-hairline bg-surface-highest z-20">
          <div className="flex items-center gap-1.5 px-3 h-7 border-b border-hairline bg-surface-lowest">
            <span className="w-1.5 h-1.5 bg-outline-dim" />
            <span className="w-1.5 h-1.5 bg-outline-dim" />
            <span className="w-1.5 h-1.5 bg-outline-dim" />
            <span className="font-mono text-tag text-outline uppercase ml-2 truncate">plataforma / meu plano</span>
          </div>
          <div className="p-4 bg-surface-lowest">
            {CHECKLIST_PREVIEW.map((item) => (
              <div key={item.label} className="flex items-center justify-between gap-4 py-2 border-b border-hairline last:border-b-0">
                <span className="font-mono text-tag uppercase text-ink-dim truncate">{item.label}</span>
                <span className="font-mono text-tag tabular-nums text-tactical shrink-0">
                  {item.done}/{item.total}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Argumento */}
      <div className="order-1 md:order-2">
        <span className="font-mono text-tag uppercase text-signal block mb-6">[ O produto e o que vem junto ]</span>
        <h2 className="font-display text-display uppercase text-ink mb-8">
          A plataforma executa. O manual acompanha.
        </h2>
        <p className="text-body text-ink-dim mb-10">
          O trabalho acontece na plataforma: é lá que você marca os checklists, monta o plano de
          evacuação e acompanha o que já está pronto na sua casa. O pilar do Planejamento, aliás,
          só existe ali dentro — plano nenhum se mantém vivo num PDF parado. O manual vem junto
          como seguro: o mesmo conteúdo no seu aparelho, para o dia em que não houver internet nem
          energia para abrir plataforma alguma.
        </p>

        <ul className="mb-10">
          {BONUSES.map((bonus) => (
            <li key={bonus.id} className="flex items-start gap-4 py-5 border-t border-hairline last:border-b last:border-hairline">
              <Check className="w-4 h-4 text-tactical shrink-0 mt-1" strokeWidth={2.5} />
              <div className="min-w-0">
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <h4 className="font-display font-bold text-ink">{bonus.title}</h4>
                  <span className="font-mono text-tag uppercase text-signal">[{bonus.badge}]</span>
                </div>
                <p className="text-bodysm text-ink-dim mt-1.5">{bonus.description}</p>
              </div>
            </li>
          ))}
        </ul>

        {/* Ficha técnica */}
        <dl className="grid grid-cols-2 sm:grid-cols-4 border-t border-hairline">
          {SPECS.map((spec) => (
            <div key={spec.key} className="py-4 pr-4 border-b border-hairline">
              <dt className="font-mono text-tag uppercase text-outline">{spec.key}</dt>
              <dd className="font-mono text-tag uppercase text-ink mt-1.5">{spec.value}</dd>
            </div>
          ))}
        </dl>
      </div>

    </div>
  );
}
