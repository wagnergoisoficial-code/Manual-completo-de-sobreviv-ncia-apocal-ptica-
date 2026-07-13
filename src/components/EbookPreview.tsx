import React, { useState } from 'react';
import { CHAPTERS } from '../data';
import { Chapter } from '../types';
import { ChevronRight, Radio, Compass, Shield, ShieldAlert, BookOpen, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function EbookPreview() {
  const [activeChapterIdx, setActiveChapterIdx] = useState<number>(0);

  const activeChapter = CHAPTERS[activeChapterIdx];

  const getChapterIcon = (num: number) => {
    switch (num) {
      case 1: return <Compass className="w-5 h-5 text-survival-red" />;
      case 2: return <BookOpen className="w-5 h-5 text-teal-400" />;
      case 3: return <Radio className="w-5 h-5 text-survival-amber" />;
      case 4: return <ShieldAlert className="w-5 h-5 text-emerald-400" />;
      case 5: return <Shield className="w-5 h-5 text-indigo-400" />;
      default: return <BookOpen className="w-5 h-5" />;
    }
  };

  return (
    <div className="max-w-5xl mx-auto" id="chapters-module">
      <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
        <span className="text-[10px] font-mono text-survival-light tracking-widest uppercase font-bold bg-survival-light/10 border border-survival-light/20 px-3 py-1 rounded-full">
          CONTEÚDO PROGRAMÁTICO DETALHADO
        </span>
        <h2 className="text-2xl sm:text-4xl font-display font-black text-white uppercase tracking-tight pt-2">
          O QUE VOCÊ VAI DOMINAR NO MANUAL?
        </h2>
        <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed max-w-lg mx-auto">
          Explore a grade curricular estruturada sob rigorosas metodologias de resiliência, engenharia improvisada e soberania de recursos civis.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Left Side: Chapter Selectors */}
        <div className="lg:col-span-5 flex flex-col gap-3">
          {CHAPTERS.map((chapter, idx) => {
            const isActive = idx === activeChapterIdx;
            return (
              <button
                key={chapter.number}
                onClick={() => setActiveChapterIdx(idx)}
                className={`w-full text-left p-4.5 rounded-xl border transition-all duration-300 flex items-center gap-4 cursor-pointer ${
                  isActive 
                    ? 'bg-zinc-900/60 border-survival-light shadow-[0_4px_20px_rgba(34,197,94,0.1)]' 
                    : 'bg-zinc-950/20 border-zinc-900 hover:border-zinc-800 hover:bg-zinc-900/20'
                }`}
              >
                <div className={`w-11 h-11 rounded-lg flex items-center justify-center shrink-0 border transition-all ${
                  isActive 
                    ? 'bg-survival-green/20 border-survival-light/40 shadow-inner' 
                    : 'bg-zinc-950 border-zinc-800'
                }`}>
                  <span className={`font-mono text-xs font-bold ${isActive ? 'text-survival-light' : 'text-zinc-500'}`}>
                    0{chapter.number}
                  </span>
                </div>

                <div className="flex-1 min-w-0">
                  <span className={`text-[9px] font-mono tracking-widest uppercase block ${isActive ? 'text-survival-light' : 'text-zinc-500'}`}>
                    MÓDULO {chapter.number}
                  </span>
                  <h3 className={`font-display text-sm sm:text-base font-extrabold truncate mt-0.5 ${isActive ? 'text-white' : 'text-zinc-350'}`}>
                    {chapter.title}
                  </h3>
                </div>

                <ChevronRight className={`w-4 h-4 shrink-0 transition-transform ${isActive ? 'text-survival-light translate-x-1' : 'text-zinc-600'}`} />
              </button>
            );
          })}
        </div>

        {/* Right Side: Active Chapter Deep Dive */}
        <div className="lg:col-span-7 bg-zinc-950/40 border border-zinc-900 rounded-2xl p-6 sm:p-10 flex flex-col justify-between relative overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.8)] min-h-[440px] backdrop-blur-xl">
          
          {/* Schematic graph wireframe vector backdrop */}
          <div className="absolute right-[-20px] bottom-[-20px] w-72 h-72 opacity-[0.03] pointer-events-none">
            <svg viewBox="0 0 100 100" className="w-full h-full text-white" stroke="currentColor" fill="none" strokeWidth="0.5">
              <circle cx="50" cy="50" r="40" />
              <circle cx="50" cy="50" r="30" />
              <circle cx="50" cy="50" r="20" />
              <line x1="50" y1="10" x2="50" y2="90" />
              <line x1="10" y1="50" x2="90" y2="50" strokeDasharray="2,2" />
              <polygon points="50,15 85,50 50,85 15,50" />
            </svg>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeChapter.number}
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              transition={{ duration: 0.35 }}
              className="space-y-7"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-zinc-950 border border-zinc-850 rounded-xl shadow-md">
                  {getChapterIcon(activeChapter.number)}
                </div>
                <div>
                  <span className="text-[9px] font-mono text-survival-amber tracking-widest uppercase block font-bold">
                    PROTOCOLO SEGURO // MÓDULO 0{activeChapter.number}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-display font-black text-white tracking-wider uppercase mt-0.5">
                    {activeChapter.title}
                  </h3>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-xs sm:text-sm font-bold text-zinc-200 uppercase tracking-wide">
                  {activeChapter.subtitle}
                </h4>
                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-sans font-medium">
                  {activeChapter.description}
                </p>
              </div>

              <div className="space-y-3.5 pt-2">
                <h5 className="text-[10px] font-mono text-zinc-500 tracking-widest uppercase font-bold">
                  TÓPICOS CRÍTICO-OPERACIONAIS DETALHADOS:
                </h5>
                <ul className="grid grid-cols-1 gap-3">
                  {activeChapter.topics.map((topic, i) => (
                    <li key={i} className="flex items-start gap-3.5 text-xs text-zinc-300">
                      <CheckCircle2 className="w-4 h-4 text-survival-light shrink-0 mt-0.5" />
                      <span className="leading-relaxed font-sans font-medium">{topic}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Static bottom bar */}
          <div className="border-t border-zinc-900 pt-5 mt-8 flex flex-col sm:flex-row justify-between items-center gap-2 text-[10px] font-mono text-zinc-500 font-semibold uppercase tracking-wider">
            <span>FORMATO: PDF DIGITAL / ACESSO COGNITIVO DIRETO</span>
            <span>CAPÍTULO DE SUPREMO INTERESSE TÁTICO</span>
          </div>

        </div>

      </div>
    </div>
  );
}
