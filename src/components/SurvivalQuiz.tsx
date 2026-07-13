import React, { useState } from 'react';
import { QUIZ_QUESTIONS } from '../data';
import { QuizQuestion } from '../types';
import { ShieldAlert, ShieldCheck, ArrowRight, RotateCcw, AlertTriangle, BookOpen, CheckCircle, BarChart3 } from 'lucide-react';
import { motion } from 'motion/react';

export default function SurvivalQuiz() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState<boolean>(false);

  const activeQuestion = QUIZ_QUESTIONS[currentQuestionIndex];

  const handleSelectOption = (points: number) => {
    const updatedAnswers = [...answers, points];
    setAnswers(updatedAnswers);

    if (currentQuestionIndex < QUIZ_QUESTIONS.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setShowResults(true);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setShowResults(false);
  };

  const totalScore = answers.reduce((acc, curr) => acc + curr, 0);
  const maxScore = QUIZ_QUESTIONS.length * 100;
  const scorePercentage = Math.round((totalScore / maxScore) * 100);

  // Determine diagnostic
  let diagnosticTitle = "";
  let diagnosticDesc = "";
  let diagnosticColor = "";
  let diagnosticIcon = <AlertTriangle className="w-12 h-12 text-survival-red" />;

  if (totalScore <= 150) {
    diagnosticTitle = "Vulnerabilidade Sistêmica Crítica";
    diagnosticDesc = "Você faz parte dos 99% da população civil que depende integralmente da estabilidade governamental e logística de mercado. Em um cenário de colapso de infraestrutura superior a 72 horas, sua taxa de sobrevivência seria estatisticamente marginal. Sua maior fragilidade é a dependência centralizada de redes públicas.";
    diagnosticColor = "border-survival-red/40 bg-survival-red/5 text-survival-red";
    diagnosticIcon = <ShieldAlert className="w-12 h-12 text-survival-red" />;
  } else if (totalScore <= 350) {
    diagnosticTitle = "Autonomia Parcial e Instável";
    diagnosticDesc = "Você já possui uma consciência superior e deu os primeiros passos práticos. Contudo, suas estratégias sofrem com a falta de redundância tática. Sem um plano estruturado para blackouts prolongados ou emergências médicas complexas, sua estrutura sofreria um estresse insustentável a médio prazo.";
    diagnosticColor = "border-survival-amber/40 bg-survival-amber/5 text-survival-amber";
    diagnosticIcon = <AlertTriangle className="w-12 h-12 text-survival-amber" />;
  } else {
    diagnosticTitle = "Estrategista Avançado & Autônomo";
    diagnosticDesc = "Parabéns. Sua mentalidade está alinhada à autonomia real de recursos. Você compreende a física por trás da sobrevivência e a importância das comunicações eletromagnéticas e medicina de campo. Suas vulnerabilidades residem nos detalhes finos de infiltração urbana e otimização de suprimentos.";
    diagnosticColor = "border-survival-light/40 bg-survival-light/5 text-survival-light";
    diagnosticIcon = <ShieldCheck className="w-12 h-12 text-survival-light" />;
  }

  // Categories map for analysis
  const categoriesMap = {
    water_food: { name: "Autonomia Hídrica/Alimentar", chapter: "Capítulo 2" },
    energy: { name: "Independência Energética", chapter: "Capítulo 1 e 2" },
    comm_info: { name: "Inteligência Eletromagnética", chapter: "Capítulo 3" },
    medical: { name: "Medicina de Linha de Frente", chapter: "Capítulo 4" },
    tactical: { name: "Infiltração e Defesa de Perímetro", chapter: "Capítulo 5" }
  };

  return (
    <div className="bg-zinc-950/40 border border-zinc-900 rounded-2xl p-6 sm:p-10 shadow-[0_24px_60px_rgba(0,0,0,0.8)] backdrop-blur-xl max-w-3xl mx-auto relative overflow-hidden" id="diagnostic-matrix">
      {/* Decorative ambient background */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-survival-amber/5 rounded-full blur-3xl pointer-events-none" />
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-5 border-b border-zinc-900 pb-6 mb-8 relative z-10">
        <div>
          <span className="text-[10px] font-mono text-survival-amber tracking-widest uppercase block mb-1 font-bold">
            MATRIZ COGNITIVA // DIAGNÓSTICO EM TEMPO REAL
          </span>
          <h2 className="text-xl sm:text-2xl font-display font-extrabold text-white tracking-wider uppercase">
            ESTIMATIVA DE RESILIÊNCIA CIVIL
          </h2>
        </div>
        {!showResults && (
          <div className="text-[10px] font-mono text-zinc-400 bg-zinc-900/80 px-3.5 py-2 border border-zinc-800 rounded-lg shadow-sm font-bold">
            PILAR ATIVO: 0{currentQuestionIndex + 1} / 0{QUIZ_QUESTIONS.length}
          </div>
        )}
      </div>

      {!showResults ? (
        /* Quiz Questions Flow */
        <div className="relative z-10">
          {/* Progress dots bar */}
          <div className="flex gap-2.5 mb-8">
            {QUIZ_QUESTIONS.map((_, i) => (
              <div 
                key={i}
                className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${
                  i < currentQuestionIndex 
                    ? 'bg-survival-light shadow-[0_0_8px_rgba(34,197,94,0.3)]' 
                    : i === currentQuestionIndex 
                    ? 'bg-survival-amber animate-pulse shadow-[0_0_10px_rgba(245,158,11,0.5)]' 
                    : 'bg-zinc-800/60'
                }`}
              />
            ))}
          </div>

          <div className="mb-8 space-y-2">
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest font-bold block">
              CATEGORIA: {categoriesMap[activeQuestion.category].name}
            </span>
            <h3 className="text-lg sm:text-2xl font-display font-extrabold text-white leading-tight">
              {activeQuestion.question}
            </h3>
          </div>

          <div className="flex flex-col gap-3.5">
            {activeQuestion.options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleSelectOption(option.points)}
                className="w-full text-left p-4.5 rounded-xl bg-zinc-900/20 hover:bg-survival-green/10 border border-zinc-900 hover:border-survival-green/40 transition-all duration-300 group flex items-start gap-4 cursor-pointer relative overflow-hidden"
              >
                {/* Subtle hover effect light */}
                <div className="absolute inset-0 bg-gradient-to-r from-survival-green/0 via-survival-green/5 to-survival-green/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="w-6 h-6 rounded-lg border border-zinc-800 bg-zinc-950/80 flex items-center justify-center text-xs font-mono text-zinc-500 group-hover:border-survival-light group-hover:text-survival-light transition-all shrink-0 mt-0.5 shadow-inner">
                  {idx === 0 ? 'A' : idx === 1 ? 'B' : 'C'}
                </div>
                <div className="flex-1 relative z-10">
                  <span className="text-zinc-300 group-hover:text-white font-sans text-sm sm:text-base font-semibold transition-colors duration-200">
                    {option.text}
                  </span>
                </div>
                <ArrowRight className="w-4.5 h-4.5 text-zinc-600 group-hover:text-survival-light transition-all group-hover:translate-x-1 shrink-0 mt-1 relative z-10" />
              </button>
            ))}
          </div>
        </div>
      ) : (
        /* Diagnostic Results Output */
        <motion.div 
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="space-y-8 relative z-10"
        >
          {/* Circular/Percentage meter */}
          <div className="flex flex-col sm:flex-row items-center gap-8 p-6 sm:p-8 rounded-2xl bg-zinc-900/20 border border-zinc-900/80 backdrop-blur-sm relative overflow-hidden">
            <div className="absolute -right-16 -bottom-16 w-40 h-40 bg-zinc-800/5 rounded-full blur-2xl pointer-events-none" />
            
            <div className="relative w-32 h-32 flex items-center justify-center shrink-0">
              {/* Circular SVG progress */}
              <svg className="absolute w-full h-full transform -rotate-90">
                <circle cx="64" cy="64" r="56" stroke="#18181b" strokeWidth="8" fill="transparent" />
                <circle 
                  cx="64" 
                  cy="64" 
                  r="56" 
                  stroke={totalScore <= 150 ? "#ef4444" : totalScore <= 350 ? "#f59e0b" : "#22c55e"} 
                  strokeWidth="8" 
                  fill="transparent" 
                  strokeDasharray={2 * Math.PI * 56}
                  strokeDashoffset={2 * Math.PI * 56 * (1 - scorePercentage / 100)}
                  strokeLinecap="round"
                  className="transition-all duration-1000"
                />
              </svg>
              <div className="text-center relative z-10">
                <span className="text-3xl sm:text-4xl font-mono font-black text-white block tracking-tighter">
                  {scorePercentage}%
                </span>
                <span className="text-[8px] font-mono text-zinc-500 uppercase tracking-widest block font-bold mt-1">
                  ÍNDICE COGNITIVO
                </span>
              </div>
            </div>

            <div className="flex-1 text-center sm:text-left space-y-2">
              <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest font-bold block">RESULTADO DO DIAGNÓSTICO</span>
              <h3 className="text-xl sm:text-2xl font-display font-black text-white uppercase tracking-wider">
                {diagnosticTitle}
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-sans font-medium">
                {diagnosticDesc}
              </p>
            </div>
          </div>

          {/* Breakdown / Remedies by Chapter */}
          <div className="space-y-4">
            <h4 className="text-[10px] font-mono text-zinc-400 tracking-widest uppercase font-bold flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-survival-amber" />
              ANÁLISE DE VULNERABILIDADES & CONTRAMEDIDAS
            </h4>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {QUIZ_QUESTIONS.map((q, idx) => {
                const answerPoints = answers[idx] || 0;
                const isFail = answerPoints <= 40;
                const cat = categoriesMap[q.category];
                return (
                  <div key={q.id} className="p-5 rounded-xl bg-zinc-900/10 border border-zinc-900 flex flex-col justify-between transition-colors hover:border-zinc-800">
                    <div>
                      <div className="flex justify-between items-center mb-2.5">
                        <span className="text-[9px] font-mono text-zinc-500 uppercase font-bold tracking-wider">{cat.name}</span>
                        <span className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded-md ${
                          answerPoints === 100 
                            ? 'bg-survival-green/20 text-survival-light border border-survival-green/30' 
                            : answerPoints > 10 
                            ? 'bg-survival-amber/10 text-survival-amber border border-survival-amber/20' 
                            : 'bg-survival-red/10 text-survival-red border border-survival-red/20'
                        }`}>
                          {answerPoints}/100 PTS
                        </span>
                      </div>
                      <p className="text-xs text-zinc-400 leading-relaxed font-sans font-medium">
                        {q.options[answers[idx] === 10 ? 0 : answers[idx] === 100 ? 2 : 1]?.feedback || ""}
                      </p>
                    </div>
                    {isFail && (
                      <div className="mt-4 pt-3.5 border-t border-zinc-900 flex items-center justify-between text-[10px] font-mono text-survival-amber">
                        <span className="flex items-center gap-1.5 font-bold">
                          <BookOpen className="w-3.5 h-3.5" />
                          SOLUÇÃO: {cat.chapter}
                        </span>
                        <a href="#chapters-module" className="underline decoration-dotted hover:text-white transition-colors">
                          Ver no Manual
                        </a>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Action Pitch Callout */}
          <div className="p-6 border border-survival-amber/25 bg-survival-amber/5 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-survival-amber" />
            <div className="space-y-1.5 text-center md:text-left">
              <span className="text-[9px] font-mono text-survival-amber font-bold tracking-widest uppercase block">
                ▲ RECOMENDAÇÃO TÁTICA IMEDIATA
              </span>
              <h4 className="text-white font-display font-extrabold text-sm sm:text-base uppercase tracking-wider">
                CORRIJA AS LACUNAS DA SUA MATRIZ DE RESILIÊNCIA
              </h4>
              <p className="text-xs text-zinc-400 max-w-lg font-sans font-medium">
                O <strong>Manual Completo de Sobrevivência Apocalíptica</strong> cobre detalhadamente cada uma das fraquezas reveladas no diagnóstico. Fortaleça sua autonomia enquanto a estabilidade pública ainda vigora.
              </p>
            </div>
            <a 
              href="#pricing-module"
              className="w-full md:w-auto px-6 py-3.5 rounded-xl bg-survival-amber hover:bg-amber-500 text-black font-display font-black text-xs uppercase tracking-wider text-center transition-all duration-300 shrink-0 shadow-lg shadow-survival-amber/10 hover:scale-[1.02]"
            >
              CORRIGIR MINHA MATRIZ AGORA
            </a>
          </div>

          <div className="text-center pt-2">
            <button 
              onClick={restartQuiz}
              className="inline-flex items-center gap-2 text-xs font-mono text-zinc-500 hover:text-zinc-300 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5 animate-spin-slow" />
              Reiniciar Análise
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
