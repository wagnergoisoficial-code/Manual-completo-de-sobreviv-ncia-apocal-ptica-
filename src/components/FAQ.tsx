import React, { useState } from 'react';
import { FAQS } from '../data';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const toggleFaq = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <div className="max-w-4xl mx-auto" id="faq-module">
      <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
        <span className="text-[10px] font-mono text-survival-amber tracking-widest uppercase font-bold bg-survival-amber/10 border border-survival-amber/20 px-3 py-1 rounded-full">
          PERGUNTAS FREQUENTES
        </span>
        <h2 className="text-2xl sm:text-4xl font-display font-black text-white mt-1 uppercase tracking-tight pt-2">
          RESPOSTAS A DÚVIDAS CRÍTICAS
        </h2>
        <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed max-w-lg mx-auto">
          Sanamos aqui os principais questionamentos e refutações de mentes críticas sobre a operacionalização do manual de contingência.
        </p>
      </div>

      <div className="space-y-4">
        {FAQS.map((faq, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div 
              key={idx}
              className={`border rounded-2xl overflow-hidden transition-all duration-300 backdrop-blur-md ${
                isOpen 
                  ? 'bg-zinc-900/40 border-zinc-800 shadow-[0_8px_30px_rgba(0,0,0,0.4)]' 
                  : 'bg-zinc-950/20 border-zinc-900 hover:border-zinc-800 hover:bg-zinc-900/10'
              }`}
            >
              <button
                onClick={() => toggleFaq(idx)}
                className="w-full text-left p-5 sm:p-6 flex justify-between items-center gap-4 focus:outline-none cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border transition-all ${
                    isOpen 
                      ? 'bg-survival-amber/10 border-survival-amber/30 text-survival-amber' 
                      : 'bg-zinc-950 border-zinc-900 text-zinc-500'
                  }`}>
                    <HelpCircle className="w-4.5 h-4.5" />
                  </div>
                  <span className="text-sm sm:text-base font-display font-extrabold text-zinc-100 uppercase tracking-wide leading-snug">
                    {faq.question}
                  </span>
                </div>
                
                <ChevronDown className={`w-5 h-5 text-zinc-500 shrink-0 transition-transform duration-300 ${isOpen ? 'transform rotate-180 text-survival-light' : ''}`} />
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                  >
                    <div className="px-6 pb-6 pt-1 text-xs sm:text-sm text-zinc-400 leading-relaxed font-sans font-medium border-t border-zinc-900/60 pl-17">
                      {faq.answer}
                    </div>
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
