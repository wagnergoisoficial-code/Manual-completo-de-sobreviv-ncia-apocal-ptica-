import React, { useState } from 'react';
import { FAQS } from '../data';
import { motion, AnimatePresence } from 'motion/react';

/**
 * Quatro perguntas, sem moldura e sem ícone. A linha de base é a única separação: a
 * pergunta aberta fica âmbar, e isso basta para dizer onde a pessoa está.
 */
export default function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <ul className="border-t border-cream/10" id="faq-module">
      {FAQS.map((faq, idx) => {
        const isOpen = openIdx === idx;
        return (
          <li key={idx} className="border-b border-cream/10">
            <button
              onClick={() => setOpenIdx(isOpen ? null : idx)}
              aria-expanded={isOpen}
              className="group flex w-full cursor-pointer items-center justify-between gap-6 py-5 text-left"
            >
              <span
                className={`text-title transition-colors ${isOpen ? 'text-amber' : 'text-cream group-hover:text-amber'}`}
              >
                {faq.question}
              </span>
              <span
                aria-hidden="true"
                className={`relative h-3 w-3 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`}
              >
                <span className={`absolute left-0 top-1/2 h-px w-3 -translate-y-1/2 ${isOpen ? 'bg-amber' : 'bg-faint'}`} />
                <span className={`absolute left-1/2 top-0 h-3 w-px -translate-x-1/2 ${isOpen ? 'bg-amber' : 'bg-faint'}`} />
              </span>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.26, ease: 'easeOut' }}
                  className="overflow-hidden"
                >
                  <p className="max-w-2xl pb-6 text-small text-mist">{faq.answer}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        );
      })}
    </ul>
  );
}
