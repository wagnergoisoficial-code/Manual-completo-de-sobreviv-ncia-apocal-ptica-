import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { YOUTUBE_VIDEO_URL, VSL_POSTER_URL } from '../data';

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

/**
 * Domínios que o player do YouTube busca ao abrir. Conectar a eles no primeiro sinal de
 * intenção — o mouse chegando no quadro, o dedo encostando — tira o handshake de TLS do
 * caminho crítico: quando o clique acontece, a conexão já está de pé.
 */
const PLAYER_ORIGINS = [
  'https://www.youtube-nocookie.com',
  'https://www.google.com',
  'https://googleads.g.doubleclick.net',
  'https://static.doubleclick.net',
];

let hasWarmedUp = false;

function warmUpPlayer(): void {
  if (hasWarmedUp || typeof document === 'undefined') return;
  hasWarmedUp = true;

  for (const href of PLAYER_ORIGINS) {
    const link = document.createElement('link');
    link.rel = 'preconnect';
    link.href = href;
    link.crossOrigin = '';
    document.head.appendChild(link);
  }
}

/**
 * O quadro do vídeo: recorte de canto reto, sem cartão e sem sombra.
 *
 * A luz âmbar por trás é o que assenta a tela na fotografia do hero — sem ela o vídeo
 * flutua como um bloco colado por cima da imagem.
 */
function Screen({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative" id="vsl-module">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-8 sm:-inset-14 bg-[radial-gradient(ellipse_at_center,rgba(243,179,64,0.16),transparent_68%)] blur-2xl"
      />
      <div className="relative aspect-video w-full overflow-hidden bg-coal ring-1 ring-cream/12">
        {children}
      </div>
    </div>
  );
}

/** O botão de play: círculo âmbar. A mesma pílula dos CTAs, fechada. */
function PlayDisc() {
  return (
    <span className="flex h-16 w-16 sm:h-[4.5rem] sm:w-[4.5rem] items-center justify-center rounded-full bg-amber text-night transition-transform duration-300 group-hover:scale-105">
      <Play className="h-6 w-6 translate-x-0.5 fill-current" />
    </span>
  );
}

/**
 * Fachada do vídeo: um thumbnail nosso que abre o player numa camada por cima da página.
 *
 * O iframe embutido direto no hero carregava junto o "Assista no YouTube" — um convite
 * para sair da página de vendas bem no meio da decisão, e voltar dali é raro. Aqui o vídeo
 * abre por cima; ao fechar, a pessoa continua exatamente onde parou, com o CTA logo abaixo.
 */
function YouTubeFacade({ youtubeId }: { youtubeId: string }) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isPlayerLoaded, setIsPlayerLoaded] = useState<boolean>(false);

  // O hover não existe no celular, e é justamente lá que a espera dói mais. Depois que a
  // página assenta, a conexão é aberta de qualquer jeito — o vídeo é o centro do hero,
  // não um recurso secundário que talvez ninguém use.
  useEffect(() => {
    const timer = setTimeout(warmUpPlayer, 2500);
    return () => clearTimeout(timer);
  }, []);

  // Nem todo vídeo tem versão maxres; o hqdefault existe sempre.
  const [posterSrc, setPosterSrc] = useState<string>(VSL_POSTER_URL || `https://i.ytimg.com/vi/${youtubeId}/maxresdefault.jpg`);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false);
    };
    // Sem isto a página rola atrás da camada enquanto o vídeo está aberto.
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    // Rede de segurança: se o onLoad do iframe nunca vier — conexão ruim, bloqueador,
    // player recusado —, um spinner girando para sempre é pior do que a espera. Passados
    // 8 segundos ele sai do caminho e entrega a tela ao YouTube, seja lá o que ele mostre.
    const giveUp = setTimeout(() => setIsPlayerLoaded(true), 8000);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
      clearTimeout(giveUp);
    };
  }, [isOpen]);

  return (
    <>
      <Screen>
        <button
          type="button"
          onClick={() => {
            setIsPlayerLoaded(false);
            setIsOpen(true);
          }}
          onPointerEnter={warmUpPlayer}
          onFocus={warmUpPlayer}
          onTouchStart={warmUpPlayer}
          aria-label="Assistir à apresentação"
          className="group absolute inset-0 h-full w-full cursor-pointer"
        >
          <img
            src={posterSrc}
            alt=""
            aria-hidden="true"
            /* O poster é a primeira imagem que a pessoa vê no hero: adiar a carga dele
               atrasa justamente o que convence a clicar. */
            loading="eager"
            fetchPriority="high"
            onError={() => setPosterSrc(`https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg`)}
            className="absolute inset-0 h-full w-full object-cover opacity-95 transition-opacity duration-300 group-hover:opacity-100"
          />
          {/* O thumbnail é desenhado: headline, marca e composição próprias, e o centro
              dele é onde mora a frase. Um disco no meio cobria justamente o "PLANO?".
              O controle desce para o canto, sobre a vinheta — a arte fica inteira e o
              quadro todo continua clicável. */}
          <span className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-night/85 via-night/35 to-transparent" />
          <span className="absolute bottom-4 left-4 flex items-center gap-3 rounded-full bg-amber py-2.5 pl-3.5 pr-5 text-night transition-transform duration-300 group-hover:scale-[1.04] sm:bottom-6 sm:left-6">
            <Play className="h-4 w-4 translate-x-[1px] fill-current" />
            <span className="text-[0.875rem] font-semibold tracking-[-0.01em]">Assistir</span>
          </span>
        </button>
      </Screen>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            role="dialog"
            aria-modal="true"
            aria-label="Apresentação em vídeo"
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-[70] flex items-center justify-center bg-night/96 p-4 backdrop-blur-sm sm:p-8"
          >
            {/* O clique dentro do quadro não pode fechar o que a pessoa veio ver. */}
            <div className="w-full max-w-5xl" onClick={(event) => event.stopPropagation()}>
              <div className="mb-3 flex items-center justify-between gap-4">
                <span className="eyebrow text-mist">Apresentação</span>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="flex cursor-pointer items-center gap-2 rounded-full border border-cream/25 px-4 py-2 text-[0.8125rem] font-medium text-mist transition-colors hover:border-amber hover:text-amber"
                >
                  Fechar
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
              <div className="relative aspect-video bg-black ring-1 ring-cream/12">
                {!isPlayerLoaded && (
                  <span className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-4 bg-black">
                    <span className="h-9 w-9 animate-spin rounded-full border-2 border-cream/20 border-t-amber" />
                    <span className="eyebrow text-faint">Carregando o vídeo</span>
                  </span>
                )}
                <iframe
                  onLoad={() => setIsPlayerLoaded(true)}
                  className="h-full w-full border-0"
                  src={`https://www.youtube-nocookie.com/embed/${youtubeId}?rel=0&modestbranding=1&autoplay=1&playsinline=1`}
                  title="Vídeo de Apresentação"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default function VSLPlayer() {
  const youtubeId = extractYouTubeId(YOUTUBE_VIDEO_URL);

  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const progressPercent = (currentTime / TOTAL_DURATION) * 100;

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

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
    return <YouTubeFacade youtubeId={youtubeId} />;
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
    <Screen>
      <div className="absolute inset-0 flex flex-col">

        <div className="flex items-center justify-between px-5 py-3.5">
          <span className="eyebrow text-amber">{activeSlide.badge}</span>
          <span className="text-[0.75rem] tabular-nums text-faint">
            {formatTime(currentTime)} / {formatTime(TOTAL_DURATION)}
          </span>
        </div>

        <div className="flex flex-1 flex-col items-center justify-center px-6 text-center sm:px-14">
          <AnimatePresence mode="wait">
            {!isPlaying && currentTime === 0 ? (
              <motion.button
                key="play-prompt"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsPlaying(true)}
                className="group flex cursor-pointer flex-col items-center gap-5"
                id="play-overlay"
              >
                <PlayDisc />
                <span className="eyebrow text-cream/85">Iniciar apresentação</span>
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
                <h3 className="text-title uppercase text-amber">{activeSlide.title}</h3>
                <p className="text-small font-medium text-cream">{activeSlide.subtitle}</p>
                <p className="hidden text-small text-mist sm:block">{activeSlide.copy}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div>
          <div className="relative h-1 w-full cursor-pointer bg-slate" onClick={handleProgressBarClick}>
            <div className="h-full bg-amber" style={{ width: `${progressPercent}%` }} />
            {VSL_SLIDES.map((slide) => (
              <span
                key={slide.timeStart}
                className="absolute top-0 bottom-0 w-px bg-night"
                style={{ left: `${(slide.timeStart / TOTAL_DURATION) * 100}%` }}
              />
            ))}
          </div>
          <div className="flex items-center gap-4 px-5 py-3.5">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              aria-label={isPlaying ? 'Pausar' : 'Reproduzir'}
              className="cursor-pointer text-cream transition-colors hover:text-amber"
            >
              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 fill-current" />}
            </button>
            <button
              onClick={() => setIsMuted(!isMuted)}
              aria-label={isMuted ? 'Ativar som' : 'Silenciar'}
              className="cursor-pointer text-cream transition-colors hover:text-amber"
            >
              {isMuted ? <VolumeX className="h-4 w-4 text-faint" /> : <Volume2 className="h-4 w-4" />}
            </button>
          </div>
        </div>

      </div>
    </Screen>
  );
}
