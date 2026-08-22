import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { YOUTUBE_VIDEO_URL } from '../data';

interface VSLSlide {
  timeStart: number;
  timeEnd: number;
  title: string;
  badge: string;
  subtitle: string;
  copy: string;
}

function extractYouTubeId(url: string): string | null {
  if (!url) return null;
  const match = url.match(/(?:youtu\.be\/|youtube(?:-nocookie)?\.com\/(?:embed\/|v\/|shorts\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
  if (match) return match[1];
  if (/^[\w-]{11}$/.test(url.trim())) return url.trim();
  return null;
}

const VSL_SLIDES: VSLSlide[] = [
  {
    timeStart: 0,
    timeEnd: 10,
    title: "A ILUSÃO DE ESTABILIDADE",
    badge: "ANÁLISE INICIAL",
    subtitle: "Por que o sistema global em que você confia está pendurado por um fio?",
    copy: "Nossa civilização moderna baseia-se em entregas 'just-in-time'. Não há estoques reais. Um atraso de 3 dias no diesel zera as prateleiras de qualquer supermercado metropolitano."
  },
  {
    timeStart: 10,
    timeEnd: 25,
    title: "O PONTO DE RUPTURA: 72 HORAS",
    badge: "ANÁLISE DE VULNERABILIDADE",
    subtitle: "A velocidade assustadora do pânico social generalizado.",
    copy: "Nas primeiras 12 horas, as pessoas acreditam ser uma oscilação temporária. Em 24 horas, os saques começam. Em 72 horas, as instituições tradicionais deixam de existir para fins práticos. O que você fará?"
  },
  {
    timeStart: 25,
    timeEnd: 45,
    title: "A REVOLUÇÃO COGNITIVA",
    badge: "ELITE INTELECTUAL",
    subtitle: "Por que bunkers bilionários são apenas túmulos luxuosos?",
    copy: "Verdadeiros estrategistas não dependem de paredes grossas, mas sim de conhecimento técnico portátil. O verdadeiro bunker está gravado no seu intelecto, na sua capacidade de decodificar o caos."
  },
  {
    timeStart: 45,
    timeEnd: 65,
    title: "MANUAL COMPLETO DE SOBREVIVÊNCIA APOCALÍPTICA",
    badge: "O GRANDE RESET PESSOAL",
    subtitle: "A plataforma completa de preparação + o Manual em PDF.",
    copy: "Não é só um e-book. É uma plataforma com 5 módulos, checklists e ferramentas para executar passo a passo — e o manual em PDF para consultar quando não houver internet."
  },
  {
    timeStart: 65,
    timeEnd: 85,
    title: "TELECOM OFF-GRID",
    badge: "PODER DA INFORMAÇÃO",
    subtitle: "Sua própria rede privada em frequências raras.",
    copy: "Quando os servidores caírem e o sinal de celular sumir, as ondas curtas e o rádio analógico criptografado serão a única voz da verdade. Aprenda a programar frequências secretas."
  },
  {
    timeStart: 85,
    timeEnd: 110,
    title: "O PROTOCOLO DO HOMEM CINZENTO",
    badge: "TÁTICA E INFILTRAÇÃO",
    subtitle: "Como transitar pelo caos de maneira totalmente invisível.",
    copy: "Aprenda a não chamar atenção. Sem uniformes chamativos ou agressividade inútil. O verdadeiro sobrevivente urbano passa desapercebido pelas multidões desesperadas."
  },
  {
    timeStart: 110,
    timeEnd: 135,
    title: "AUTONOMIA TÁTICA",
    badge: "ACESSO VITALÍCIO",
    subtitle: "Acesso vitalício à plataforma, ao manual e aos bônus.",
    copy: "Login liberado na hora, novos módulos e atualizações sem pagar de novo, e o manual em PDF para baixar. Tudo para proteger sua família em qualquer cenário."
  }
];

const TOTAL_DURATION = 135;

/** Moldura editorial: hairline de 1px, canto reto, zero sombra. */
function PlayerFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full max-w-4xl mx-auto" id="vsl-module">
      <div className="flex items-center justify-between border border-b-0 border-hairline bg-surface-lowest px-4 py-2.5 font-mono text-tag uppercase">
        <span className="flex items-center gap-2 text-ink-dim">
          <span className="w-1.5 h-1.5 bg-alert animate-pulse" />
          Transmissão 01
        </span>
        <span className="hidden sm:inline text-outline">Assista antes de decidir</span>
      </div>
      <div className="relative border border-hairline bg-surface-lowest aspect-video overflow-hidden">
        {children}
      </div>
    </div>
  );
}

export default function VSLPlayer() {
  const youtubeId = extractYouTubeId(YOUTUBE_VIDEO_URL);

  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const progressPercent = (currentTime / TOTAL_DURATION) * 100;

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (youtubeId) return; // com vídeo real, quem conta o tempo é o YouTube
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= TOTAL_DURATION) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, youtubeId]);

  if (youtubeId) {
    return (
      <PlayerFrame>
        <iframe
          className="w-full h-full border-0"
          src={`https://www.youtube-nocookie.com/embed/${youtubeId}?rel=0&modestbranding=1&autoplay=0`}
          title="Vídeo de Apresentação"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </PlayerFrame>
    );
  }

  /* Fallback: sem link de YouTube configurado, a apresentação roda em texto. */
  const activeSlide =
    VSL_SLIDES.find((slide) => currentTime >= slide.timeStart && currentTime < slide.timeEnd) || VSL_SLIDES[0];

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleProgressBarClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const newTime = Math.floor(((e.clientX - rect.left) / rect.width) * TOTAL_DURATION);
    setCurrentTime(Math.min(TOTAL_DURATION, Math.max(0, newTime)));
  };

  return (
    <PlayerFrame>
      <div className="absolute inset-0 flex flex-col">

        <div className="flex justify-between items-center px-5 py-3 border-b border-hairline font-mono text-tag uppercase">
          <span className="text-signal">[{activeSlide.badge}]</span>
          <span className="text-outline tabular-nums">{formatTime(currentTime)} / {formatTime(TOTAL_DURATION)}</span>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center text-center px-6 sm:px-16">
          <AnimatePresence mode="wait">
            {!isPlaying && currentTime === 0 ? (
              <motion.button
                key="play-prompt"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsPlaying(true)}
                className="flex flex-col items-center gap-5 cursor-pointer group"
                id="play-overlay"
              >
                <span className="w-16 h-16 border border-signal flex items-center justify-center text-signal group-hover:bg-signal group-hover:text-black transition-colors">
                  <Play className="w-6 h-6 fill-current translate-x-0.5" />
                </span>
                <span className="font-display text-subhead uppercase text-ink">Iniciar apresentação</span>
              </motion.button>
            ) : (
              <motion.div
                key={activeSlide.title}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35 }}
                className="max-w-2xl space-y-3"
              >
                <h3 className="font-display text-subhead uppercase text-signal">{activeSlide.title}</h3>
                <p className="text-bodysm text-ink font-medium">{activeSlide.subtitle}</p>
                <p className="text-tag sm:text-bodysm text-ink-dim leading-relaxed">{activeSlide.copy}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="border-t border-hairline">
          <div className="h-1 w-full bg-surface-high cursor-pointer relative" onClick={handleProgressBarClick}>
            <div className="h-full bg-signal" style={{ width: `${progressPercent}%` }} />
            {VSL_SLIDES.map((slide) => (
              <span
                key={slide.timeStart}
                className="absolute top-0 bottom-0 w-px bg-void"
                style={{ left: `${(slide.timeStart / TOTAL_DURATION) * 100}%` }}
              />
            ))}
          </div>
          <div className="flex items-center gap-4 px-5 py-3">
            <button onClick={() => setIsPlaying(!isPlaying)} className="text-ink hover:text-signal transition-colors cursor-pointer">
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
            </button>
            <button onClick={() => setIsMuted(!isMuted)} className="text-ink hover:text-signal transition-colors cursor-pointer">
              {isMuted ? <VolumeX className="w-4 h-4 text-alert" /> : <Volume2 className="w-4 h-4" />}
            </button>
            <span className="font-mono text-tag text-outline uppercase ml-auto">Stream seguro</span>
          </div>
        </div>

      </div>
    </PlayerFrame>
  );
}
