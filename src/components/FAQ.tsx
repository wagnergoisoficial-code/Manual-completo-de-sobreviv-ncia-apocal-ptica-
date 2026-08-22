import React, { useState } from 'react';
import { FAQS } from '../data';
import { Plus, Minus } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <div className="max-w-4xl mx-auto" id="faq-module">

      <div className="text-center mb-16">
        <span className="font-mono text-tag uppercase text-outline block mb-5">[ Dúvidas críticas ]</span>
        <h2 className="font-display text-headline uppercase text-ink">Protocolos e respostas</h2>
      </div>

      <div className="border-t border-hairline">
        {FAQS.map((faq, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div key={idx} className="border-b border-hairline">
              <button
                onClick={() => setOpenIdx(isOpen ? null : idx)}
                className="w-full py-6 flex items-start justify-between gap-6 text-left cursor-pointer group"
                aria-expanded={isOpen}
              >
                <span className="flex items-baseline gap-4 min-w-0">
                  <span className="font-mono text-tag text-outline-dim shrink-0 tabular-nums">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <span className={`font-display font-bold uppercase tracking-tight text-[15px] md:text-[17px] leading-snug transition-colors ${isOpen ? 'text-signal' : 'text-ink group-hover:text-signal-soft'}`}>
                    {faq.question}
                  </span>
                </span>
                {isOpen
                  ? <Minus className="w-4 h-4 text-signal shrink-0 mt-0.5" />
                  : <Plus className="w-4 h-4 text-outline shrink-0 mt-0.5 group-hover:text-ink transition-colors" />}
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.28, ease: 'easeOut' }}
                    className="overflow-hidden"
                  >
                    <p className="text-bodysm text-ink-dim leading-relaxed pb-7 md:pl-10 md:pr-12">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

    </div>
  );
}
