import React, { useState } from 'react';
import { QUIZ_QUESTIONS } from '../data';
import CheckoutLink from './CheckoutLink';
import { trackPixel } from '../pixel';
import { ArrowRight, RotateCcw } from 'lucide-react';
import { motion } from 'motion/react';

// O `short` existe só para a largura do celular, onde o nome técnico completo não cabe
// no cabeçalho do quiz e era cortado com reticências.
const CATEGORIES = {
  water_food: { name: 'Autonomia hídrica e alimentar', short: 'Água e comida', module: 'Módulo 02' },
  energy: { name: 'Independência energética', short: 'Energia', module: 'Módulo 01' },
  comm_info: { name: 'Inteligência eletromagnética', short: 'Comunicação', module: 'Módulo 03' },
  medical: { name: 'Medicina de linha de frente', short: 'Saúde', module: 'Módulo 04' },
  tactical: { name: 'Infiltração e defesa de perímetro', short: 'Segurança', module: 'Módulo 05' },
} as const;

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
      const score = updatedAnswers.reduce((acc, curr) => acc + curr, 0);
      trackPixel('Lead', { content_name: 'Quiz de Resiliência', quiz_score: score });
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

  let diagnosticTitle = '';
  let diagnosticDesc = '';
  let scoreColor = '';

  if (totalScore <= 150) {
    diagnosticTitle = 'Vulnerabilidade sistêmica crítica';
    diagnosticDesc = 'Você depende integralmente da estabilidade das redes públicas e da logística de mercado. Num colapso de infraestrutura acima de 72 horas, não há plano B — cada frente do diagnóstico abaixo precisa ser construída do zero.';
    scoreColor = 'text-alert';
  } else if (totalScore <= 350) {
    diagnosticTitle = 'Autonomia parcial e instável';
    diagnosticDesc = 'Você já deu os primeiros passos práticos, mas sem redundância. Suas reservas resolvem dias, não semanas, e uma emergência médica ou um blackout prolongado colocaria a estrutura toda sob estresse insustentável.';
    scoreColor = 'text-signal';
  } else {
    diagnosticTitle = 'Estrategista avançado e autônomo';
    diagnosticDesc = 'Sua mentalidade já está alinhada à autonomia real de recursos. O que falta está nos detalhes finos: infiltração urbana, otimização de suprimentos e redundância de comunicação.';
    scoreColor = 'text-tactical';
  }

  return (
    <div className="border border-hairline bg-surface-high" id="diagnostic-matrix">

      {!showResults ? (
        <div className="p-6 sm:p-10">

          {/* Cabeçalho técnico */}
          <div className="flex justify-between items-baseline gap-4 border-b border-hairline pb-4 mb-8 font-mono text-tag uppercase">
            <span className="text-signal min-w-0">
              {/* No celular o contador à direita já diz em que cenário a pessoa está, então
                  o prefixo sai e sobra largura para o nome da frente aparecer inteiro. */}
              <span className="hidden sm:inline">
                [Cenário {String(currentQuestionIndex + 1).padStart(2, '0')} / {CATEGORIES[activeQuestion.category].name}]
              </span>
              <span className="sm:hidden">[{CATEGORIES[activeQuestion.category].short}]</span>
            </span>
            <span className="text-ink-dim tabular-nums shrink-0">
              {String(currentQuestionIndex + 1).padStart(2, '0')} / {String(QUIZ_QUESTIONS.length).padStart(2, '0')}
            </span>
          </div>

          {/* Barra segmentada */}
          <div className="flex gap-1 mb-8">
            {QUIZ_QUESTIONS.map((_, i) => (
              <span
                key={i}
                className={`h-0.5 flex-1 transition-colors duration-500 ${
                  i < currentQuestionIndex ? 'bg-tactical' : i === currentQuestionIndex ? 'bg-signal' : 'bg-surface-highest'
                }`}
              />
            ))}
          </div>

          <h3 className="font-display text-subhead text-ink mb-8">
            {activeQuestion.question}
          </h3>

          <div className="flex flex-col gap-3">
            {activeQuestion.options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleSelectOption(option.points)}
                className="w-full text-left p-5 sm:p-6 border border-hairline bg-surface hover:bg-surface-bright hover:border-signal transition-colors group flex items-center justify-between gap-5 cursor-pointer"
              >
                <span className="flex items-start gap-4 min-w-0">
                  <span className="font-mono text-tag text-outline group-hover:text-signal transition-colors shrink-0 pt-1">
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span className="text-bodysm text-ink">{option.text}</span>
                </span>
                <ArrowRight className="w-4 h-4 text-outline-dim group-hover:text-signal transition-colors shrink-0" />
              </button>
            ))}
          </div>

        </div>
      ) : (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>

          {/* Placar */}
          <div className="p-6 sm:p-10 border-b border-hairline">
            <span className="font-mono text-tag uppercase text-outline block mb-6">[Resultado do diagnóstico]</span>
            <div className="flex flex-col sm:flex-row gap-8 sm:gap-10 items-start">
              <div className="shrink-0">
                <span className={`font-display text-display leading-none tabular-nums ${scoreColor}`}>
                  {scorePercentage}<span className="text-[0.4em] align-top">%</span>
                </span>
                <span className="font-mono text-tag uppercase text-outline block mt-2">Índice de resiliência</span>
              </div>
              <div className="space-y-3">
                <h3 className="font-display text-subhead uppercase text-ink">{diagnosticTitle}</h3>
                <p className="text-bodysm text-ink-dim leading-relaxed">{diagnosticDesc}</p>
              </div>
            </div>
          </div>

          {/* Tabela de vulnerabilidades */}
          <div className="px-6 sm:px-10 pt-8">
            <span className="font-mono text-tag uppercase text-outline block mb-4">Vulnerabilidades por frente</span>
          </div>
          <div className="px-6 sm:px-10">
            {QUIZ_QUESTIONS.map((q, idx) => {
              const answerPoints = answers[idx] || 0;
              const isFail = answerPoints <= 40;
              const cat = CATEGORIES[q.category];
              const feedback = q.options[answerPoints === 10 ? 0 : answerPoints === 100 ? 2 : 1]?.feedback || '';
              return (
                <div key={q.id} className="py-5 border-t border-hairline grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-6">
                  <div className="md:col-span-4 flex items-baseline justify-between md:block gap-4">
                    <span className="font-mono text-tag uppercase text-ink">{cat.name}</span>
                    <span className={`font-mono text-tag tabular-nums md:block md:mt-1 ${
                      answerPoints === 100 ? 'text-tactical' : answerPoints > 10 ? 'text-signal' : 'text-alert'
                    }`}>
                      {String(answerPoints).padStart(3, '0')} / 100
                    </span>
                  </div>
                  <p className="md:col-span-6 text-bodysm text-ink-dim leading-relaxed">{feedback}</p>
                  <div className="md:col-span-2 md:text-right">
                    {isFail && (
                      <a href="#modulos" className="font-mono text-tag uppercase text-signal hover:text-signal-soft transition-colors">
                        → {cat.module}
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Ação */}
          <div className="p-6 sm:p-10 mt-4 border-t border-hairline bg-surface flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <p className="text-bodysm text-ink-dim max-w-md">
              Cada falha acima tem um módulo correspondente dentro da plataforma, com o checklist pronto para executar — e tudo também no Manual Completo em PDF. São R$ 39,90, uma vez só.
            </p>
            <CheckoutLink
              from="CTA Quiz"
              className="w-full sm:w-auto text-center bg-signal hover:bg-signal-soft text-black font-mono text-tag font-bold uppercase px-8 py-4 transition-colors shrink-0"
            >
              Corrigir minhas falhas — R$&nbsp;39,90
            </CheckoutLink>
          </div>

          <div className="px-6 sm:px-10 pb-8">
            <button
              onClick={restartQuiz}
              className="inline-flex items-center gap-2 font-mono text-tag uppercase text-outline hover:text-ink transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reiniciar análise
            </button>
          </div>

        </motion.div>
      )}

    </div>
  );
}
