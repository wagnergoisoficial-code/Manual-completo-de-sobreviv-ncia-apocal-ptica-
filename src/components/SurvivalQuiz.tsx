import React, { useState } from 'react';
import { QUIZ_QUESTIONS } from '../data';
import BuyButton from './BuyButton';
import { trackPixel } from '../pixel';
import { RotateCcw } from 'lucide-react';
import { motion } from 'motion/react';

/**
 * O diagnóstico é a única parte interativa da página — e a única que dispara o evento
 * Lead. Por isso ele sobrevive ao enxugamento, mas sem a moldura, o cabeçalho técnico e
 * a tabela de laudos que tinha antes: pergunta, três respostas e uma nota. O texto longo
 * de cada vulnerabilidade saiu; quem quer o detalhe entra na plataforma.
 *
 * As perguntas e o resultado falam a língua de uma família comum: situações da própria
 * casa, respostas que a pessoa diria em voz alta, e nenhum termo técnico.
 */

/** O nome de cada área no resultado — o assunto da pergunta, dito do jeito mais simples. */
const CATEGORIES = {
  water_food: { name: 'Água' },
  energy: { name: 'Luz e comida' },
  comm_info: { name: 'Notícias e contato' },
  medical: { name: 'Primeiros socorros' },
  tactical: { name: 'Plano de saída' },
} as const;

/**
 * Em vez de nota de 0 a 100, uma palavra. "40/100" pede uma conta; "Em parte" a pessoa
 * entende na hora — e é o que a faz querer fechar o que falta.
 */
function situacao(points: number) {
  if (points >= 100) return 'Pronto';
  if (points > 10) return 'Em parte';
  return 'Falta';
}

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

  const diagnosis =
    totalScore <= 150
      ? { title: 'Sua casa ainda depende de tudo funcionar', text: 'Se a luz ou a água faltarem por mais de um dia, vocês ficam sem plano. O essencial dá para resolver em uma tarde.' }
      : totalScore <= 350
        ? { title: 'Sua casa está no meio do caminho', text: 'Vocês aguentam alguns dias, mas ainda há buracos — e são eles que pesam quando a falta dura mais.' }
        : { title: 'Sua casa está bem preparada', text: 'O essencial já existe. O plano ajuda a conferir o que falta e a manter tudo em dia.' };

  if (showResults) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>

        <div className="flex flex-col gap-6 sm:flex-row sm:items-baseline sm:gap-10">
          <span className="text-[3.5rem] font-semibold leading-none tracking-[-0.04em] tabular-nums text-amber sm:text-[4.5rem]">
            {scorePercentage}<span className="align-top text-[0.35em]">%</span>
          </span>
          <div className="max-w-md">
            <h3 className="text-title text-cream">{diagnosis.title}</h3>
            <p className="mt-2 text-small text-mist">{diagnosis.text}</p>
          </div>
        </div>

        <ul className="mt-10 border-t border-cream/10">
          {QUIZ_QUESTIONS.map((question, idx) => {
            const points = answers[idx] || 0;
            const category = CATEGORIES[question.category];
            return (
              <li
                key={question.id}
                className="flex items-center gap-5 border-b border-cream/10 py-3.5"
              >
                <span className="min-w-0 flex-1 text-small text-cream">{category.name}</span>
                <span className="h-[3px] w-16 shrink-0 bg-cream/12 sm:w-28">
                  <span
                    className={`block h-full ${points === 100 ? 'bg-amber' : points > 10 ? 'bg-amber/55' : 'bg-cream/25'}`}
                    style={{ width: `${points}%` }}
                  />
                </span>
                <span className="w-16 shrink-0 text-right text-[0.8125rem] text-faint">
                  {situacao(points)}
                </span>
              </li>
            );
          })}
        </ul>

        <div className="mt-10 flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
          <BuyButton from="CTA Quiz">Ver o plano completo — R$ 39,90</BuyButton>
          <button
            onClick={restartQuiz}
            className="inline-flex cursor-pointer items-center gap-2 text-[0.8125rem] text-faint transition-colors hover:text-cream"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            Refazer
          </button>
        </div>

      </motion.div>
    );
  }

  return (
    <div>
      {/* Progresso segmentado: onde a pessoa está, sem contador nem rótulo técnico. */}
      <div className="mb-8 flex gap-1.5">
        {QUIZ_QUESTIONS.map((_, i) => (
          <span
            key={i}
            className={`h-[3px] flex-1 transition-colors duration-500 ${
              i <= currentQuestionIndex ? 'bg-amber' : 'bg-cream/12'
            }`}
          />
        ))}
      </div>

      <h3 className="max-w-2xl text-title text-cream">{activeQuestion.question}</h3>

      <ul className="mt-7 border-t border-cream/10">
        {activeQuestion.options.map((option, idx) => (
          <li key={idx} className="border-b border-cream/10">
            <button
              onClick={() => handleSelectOption(option.points)}
              className="group flex w-full cursor-pointer items-start gap-4 py-5 text-left transition-colors"
            >
              <span className="mt-[3px] text-[0.8125rem] font-medium text-faint transition-colors group-hover:text-amber">
                {String.fromCharCode(65 + idx)}
              </span>
              <span className="text-small text-mist transition-colors group-hover:text-cream">
                {option.text}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
