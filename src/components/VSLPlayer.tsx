import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize2, AlertTriangle, ShieldAlert, Sparkles, Activity, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface VSLSlide {
  timeStart: number;
  timeEnd: number;
  title: string;
  badge: string;
  subtitle: string;
  copy: string;
  bgStyle: string; // Tailwind class
  accentColor: string;
}

const VSL_SLIDES: VSLSlide[] = [
  {
    timeStart: 0,
    timeEnd: 10,
    title: "A ILUSÃO DE ESTABILIDADE",
    badge: "TRANSMISSÃO CRÍTICA",
    subtitle: "Por que o sistema global em que você confia está pendurado por um fio?",
    copy: "Nossa civilização moderna baseia-se em entregas 'just-in-time'. Não há estoques reais. Um atraso de 3 dias no diesel zera as prateleiras de qualquer supermercado metropolitano.",
    bgStyle: "bg-radial from-red-950/40 via-apoc-gray to-apoc-black",
    accentColor: "text-red-500 border-red-900/50"
  },
  {
    timeStart: 10,
    timeEnd: 25,
    title: "O PONTO DE RUPTURA: 72 HORAS",
    badge: "ANÁLISE DE VULNERABILIDADE",
    subtitle: "A velocidade assustadora do pânico social generalizado.",
    copy: "Nas primeiras 12 horas, as pessoas acreditam ser uma oscilação temporária. Em 24 horas, os saques começam. Em 72 horas, as instituições tradicionais deixam de existir para fins práticos. O que você fará?",
    bgStyle: "bg-radial from-amber-950/40 via-apoc-gray to-apoc-black",
    accentColor: "text-amber-500 border-amber-900/50"
  },
  {
    timeStart: 25,
    timeEnd: 45,
    title: "A REVOLUÇÃO COGNITIVA",
    badge: "ELITE INTELECTUAL",
    subtitle: "Por que bunkers bilionários são apenas túmulos luxuosos?",
    copy: "Verdadeiros estrategistas não dependem de paredes grossas, mas sim de conhecimento técnico portátil. O verdadeiro bunker está gravado no seu intelecto, na sua capacidade de decodificar o caos.",
    bgStyle: "bg-radial from-survival-green/40 via-apoc-gray to-apoc-black",
    accentColor: "text-survival-light border-green-900/50"
  },
  {
    timeStart: 45,
    timeEnd: 65,
    title: "MANUAL COMPLETO DE SOBREVIVÊNCIA APOCALÍPTICA",
    badge: "O GRANDE RESET PESSOAL",
    subtitle: "Apresentando o Manual Completo de Sobrevivência Apocalíptica.",
    copy: "Não é ficção científica. É um projeto passo a passo para redefinir sua independência. Desenvolvido para mentes estratégicas que enxergam as falhas estruturais do mundo de hoje.",
    bgStyle: "bg-radial from-zinc-900 via-apoc-gray to-apoc-black",
    accentColor: "text-white border-zinc-700/50"
  },
  {
    timeStart: 65,
    timeEnd: 85,
    title: "TECOM off-grid",
    badge: "PODER DA INFORMAÇÃO",
    subtitle: "Sua própria rede privada em frequências raras.",
    copy: "Quando os servidores caírem e o sinal de celular sumir, as ondas curtas e o rádio analógico criptografado serão a única voz da verdade. Aprenda a programar frequências secretas.",
    bgStyle: "bg-radial from-teal-950/40 via-apoc-gray to-apoc-black",
    accentColor: "text-teal-400 border-teal-900/50"
  },
  {
    timeStart: 85,
    timeEnd: 110,
    title: "O PROTOCOLO DO HOMEM CINZENTO",
    badge: "TÁTICA E INFILTRAÇÃO",
    subtitle: "Como transitar pelo caos de maneira totalmente invisível.",
    copy: "Aprenda a não chamar atenção. Sem uniformes chamativos ou agressividade inútil. O verdadeiro sobrevivente urbano passa desapercebido pelas multidões desesperadas.",
    bgStyle: "bg-radial from-zinc-950 via-apoc-gray to-apoc-black",
    accentColor: "text-gray-400 border-zinc-800"
  },
  {
    timeStart: 110,
    timeEnd: 135,
    title: "O APORTE INTELIGENTE",
    badge: "OFERTA HISTÓRICA",
    subtitle: "Acesso vitalício por uma fração do custo de um tanque de gasolina.",
    copy: "O valor regular de R$ 197,00 foi reduzido para apenas R$ 47,00 hoje. Um investimento marginal para uma autonomia tática que pode salvar a vida de sua família.",
    bgStyle: "bg-radial from-amber-950/30 via-apoc-gray to-apoc-black",
    accentColor: "text-survival-amber border-amber-900/40"
  }
];

export default function VSLPlayer() {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const totalDuration = 135; // Total length of VSL
  const progressPercent = (currentTime / totalDuration) * 100;
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-play / update time ticker
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= totalDuration) {
            setIsPlaying(false);
            return 0; // Reset
          }
          return prev + 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying]);

  // Find active slide based on current time
  const activeSlide = VSL_SLIDES.find(
    (slide) => currentTime >= slide.timeStart && currentTime < slide.timeEnd
  ) || VSL_SLIDES[0];

  const togglePlay = () => setIsPlaying(!isPlaying);
  const toggleMute = () => setIsMuted(!isMuted);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleProgressBarClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const newTime = Math.floor((clickX / width) * totalDuration);
    setCurrentTime(Math.min(totalDuration, Math.max(0, newTime)));
  };

  return (
    <div className="w-full max-w-4xl mx-auto" id="vsl-module">
      {/* Video Container Frame */}
      <div className="relative border border-zinc-800/80 rounded-2xl overflow-hidden shadow-[0_30px_70px_rgba(0,0,0,0.85)] bg-black aspect-video flex flex-col justify-between group transition-all duration-500 hover:border-zinc-700/60">
        
        {/* Cinematic Backdrop with scanning grid overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] bg-[size:100%_4px,6px_100%] pointer-events-none z-10 opacity-20" />

        {/* Ambient background styling based on active slide */}
        <div className={`absolute inset-0 transition-all duration-1000 ${activeSlide.bgStyle} z-0`} />

        {/* Top telemetry bar */}
        <div className="relative z-10 px-5 py-4 bg-gradient-to-b from-black/90 to-transparent flex justify-between items-center text-[10px] font-mono tracking-widest text-zinc-500">
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-survival-red opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-survival-red"></span>
            </span>
            <span className="text-zinc-200 font-bold uppercase tracking-widest">{activeSlide.badge}</span>
          </div>
          <div className="flex items-center gap-5">
            <span className="hidden sm:inline text-[9px] text-zinc-600 font-medium">SAT-INTEL: DECRYPTED_FILE // COD-771</span>
            <div className="flex items-center gap-1.5 bg-zinc-950/90 border border-zinc-800/80 px-3 py-1 rounded-lg text-survival-amber shadow-sm">
              <Clock className="w-3.5 h-3.5" />
              <span className="font-semibold">TIME INTRUSION: {formatTime(currentTime)}</span>
            </div>
          </div>
        </div>

        {/* Slide Content Area (VSL Video simulation) */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-6 sm:px-16 py-4">
          <AnimatePresence mode="wait">
            {!isPlaying && currentTime === 0 ? (
              /* Play Button Hub */
              <motion.div
                key="play-prompt"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                className="cursor-pointer flex flex-col items-center justify-center group/play gap-5"
                onClick={togglePlay}
                id="play-overlay"
              >
                <div className="w-22 h-22 rounded-full bg-gradient-to-br from-survival-light/20 to-survival-green/10 flex items-center justify-center border border-survival-light/40 shadow-[0_0_50px_rgba(34,197,94,0.15)] transition-all duration-500 group-hover/play:scale-105 group-hover/play:border-survival-light/80 group-hover/play:shadow-[0_0_60px_rgba(34,197,94,0.3)] relative">
                  <div className="absolute inset-2 rounded-full bg-survival-light flex items-center justify-center text-black">
                    <Play className="w-7 h-7 fill-current translate-x-0.5 text-black" />
                  </div>
                </div>
                <div className="text-center max-w-lg space-y-1">
                  <h3 className="text-white font-display text-lg sm:text-2xl font-black tracking-wider uppercase leading-tight">
                    INICIAR TRANSMISSÃO EXCLUSIVA
                  </h3>
                  <p className="text-zinc-400 text-xs font-sans leading-relaxed max-w-sm mx-auto">
                    Relatório estratégico confidencial sobre autonomia tática e contramedidas civis imediatas.
                  </p>
                </div>
              </motion.div>
            ) : (
              /* Active Animated Slide Content */
              <motion.div
                key={activeSlide.title}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="max-w-2xl flex flex-col items-center justify-center"
              >
                {/* Visual Audio Waveform Simulation */}
                {isPlaying && (
                  <div className="flex gap-1 h-6 items-end mb-5">
                    {[...Array(16)].map((_, i) => {
                      const heights = [8, 16, 24, 12, 18, 6, 22, 14, 20, 10, 16, 8, 18, 12, 22, 6];
                      const delay = i * 0.08;
                      return (
                        <motion.div
                          key={i}
                          animate={isMuted ? { height: 2 } : { height: [4, heights[i], 4] }}
                          transition={{
                            repeat: Infinity,
                            duration: 1.0,
                            delay: delay,
                            ease: "easeInOut"
                          }}
                          className={`w-1 rounded-full ${isMuted ? 'bg-zinc-700' : 'bg-survival-light'}`}
                        />
                      );
                    })}
                  </div>
                )}

                {/* Subtitle / Big Quote */}
                <h2 className={`font-display text-xl sm:text-3xl font-black tracking-wider leading-tight uppercase transition-colors duration-500 ${activeSlide.accentColor} mb-2.5`}>
                  {activeSlide.title}
                </h2>
                
                <p className="text-sm sm:text-xl text-zinc-200 font-medium max-w-xl italic mb-3 leading-snug">
                  "{activeSlide.subtitle}"
                </p>

                <p className="text-xs sm:text-sm text-zinc-400 max-w-md leading-relaxed font-sans font-medium">
                  {activeSlide.copy}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Dynamic Interactive Subtitle ticker at the bottom */}
        {isPlaying && (
          <div className="relative z-10 px-6 py-2.5 bg-black/85 border-t border-zinc-900/60 text-center min-h-[48px] flex items-center justify-center backdrop-blur-sm">
            <p className="text-xs sm:text-sm font-mono text-zinc-300 tracking-wide max-w-2xl leading-normal">
              <span className="text-survival-amber mr-1.5 font-bold">● VOICE NARRATION:</span>
              {activeSlide.copy}
            </p>
          </div>
        )}

        {/* Control Bar */}
        <div className="relative z-10 px-5 py-4 bg-gradient-to-t from-black via-black/95 to-black/80 flex flex-col gap-3 border-t border-zinc-900/60">
          
          {/* Progress Bar */}
          <div 
            className="h-1.5 w-full bg-zinc-800/80 rounded-full overflow-hidden cursor-pointer relative group/progress transition-all hover:h-2"
            onClick={handleProgressBarClick}
          >
            <div 
              className="h-full bg-survival-light rounded-full transition-all duration-300 shadow-[0_0_10px_rgba(34,197,94,0.5)]"
              style={{ width: `${progressPercent}%` }}
            />
            {/* Slide Markers */}
            {VSL_SLIDES.map((slide) => (
              <div 
                key={slide.timeStart}
                className="absolute top-0 bottom-0 w-0.5 bg-black/40"
                style={{ left: `${(slide.timeStart / totalDuration) * 100}%` }}
              />
            ))}
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button 
                onClick={togglePlay}
                className="p-2 rounded-lg bg-zinc-950/80 hover:bg-zinc-900 text-zinc-200 border border-zinc-800/80 transition-colors cursor-pointer shadow-sm flex items-center justify-center"
                title={isPlaying ? "Pausar" : "Reproduzir"}
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-zinc-200" />}
              </button>

              <button 
                onClick={toggleMute}
                className="p-2 rounded-lg bg-zinc-950/80 hover:bg-zinc-900 text-zinc-200 border border-zinc-800/80 transition-colors cursor-pointer shadow-sm flex items-center justify-center"
                title={isMuted ? "Desmutar" : "Mutar"}
              >
                {isMuted ? <VolumeX className="w-4 h-4 text-survival-red" /> : <Volume2 className="w-4 h-4" />}
              </button>

              <span className="text-xs font-mono text-zinc-400 font-bold ml-1">
                {formatTime(currentTime)} / {formatTime(totalDuration)}
              </span>
            </div>

            <div className="flex items-center gap-3">
              {isMuted && (
                <span className="text-[10px] font-mono font-extrabold text-survival-amber animate-pulse bg-survival-amber/10 border border-survival-amber/20 px-2.5 py-1 rounded-lg hidden sm:inline-block">
                  AUDIO MUTADO - CLIQUE NO BOTÃO DE SOM PARA OUVIR
                </span>
              )}
              <div className="text-[10px] font-mono text-zinc-500 bg-zinc-950/80 px-3 py-1.5 border border-zinc-900/80 rounded-lg flex items-center gap-1.5 shadow-sm font-semibold">
                <Activity className="w-3.5 h-3.5 text-survival-light animate-pulse" />
                <span>STREAM LINK SECURE</span>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Floating Action Hint */}
      {!isPlaying && (
        <div className="text-center mt-4">
          <span className="text-xs font-mono font-bold text-survival-amber border border-survival-amber/20 bg-survival-amber/10 px-4 py-2 rounded-xl inline-block shadow-sm animate-pulse tracking-wide">
            ▲ CLIQUE NO REPRODUTOR ACIMA PARA INICIAR A APRESENTAÇÃO
          </span>
        </div>
      )}
    </div>
  );
}
