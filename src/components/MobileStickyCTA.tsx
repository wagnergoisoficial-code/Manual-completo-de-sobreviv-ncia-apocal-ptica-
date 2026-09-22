import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import BuyButton from './BuyButton';

/**
 * Barra de compra fixa no rodapé, só no celular.
 *
 * Ela não aparece de cara: enquanto o hero está na tela, o botão âmbar grande já está à
 * mão e a barra seria só ruído sobre a headline. Assim que a pessoa rola e deixa esse botão
 * para trás, o caminho até o pagamento volta a ficar a um toque pelo resto da página.
 *
 * É uma pílula flutuante, não uma faixa colada na borda: a página inteira usa a pílula
 * para dizer "ação", e uma barra chapada de ponta a ponta esconderia o rodapé sob um
 * bloco que não pertence ao desenho.
 */

/** Altura de rolagem em que o CTA do hero já saiu do alcance do polegar. */
const SCROLL_THRESHOLD = 400;

export default function MobileStickyCTA() {
  const [isPastHero, setIsPastHero] = useState(false);
  const [isOfferVisible, setIsOfferVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsPastHero(window.scrollY > SCROLL_THRESHOLD);
    // Recarregar a página no meio da rolagem não pode esconder a barra.
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // A seção de oferta traz o CTA principal em tamanho grande. Uma pílula por cima dele
  // brigaria com o próprio botão que ela está tentando substituir.
  useEffect(() => {
    const offerSection = document.getElementById('oferta');
    if (!offerSection) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsOfferVisible(entry.isIntersecting),
      { threshold: 0 },
    );
    observer.observe(offerSection);
    return () => observer.disconnect();
  }, []);

  return (
    <AnimatePresence>
      {isPastHero && !isOfferVisible && (
        <motion.div
          initial={{ y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 24, opacity: 0 }}
          transition={{ duration: 0.22, ease: 'easeOut' }}
          /* O contêiner atravessa a tela inteira, mas só a pílula é visível. Sem
             desligar o ponteiro nele, toda a faixa inferior — inclusive o vazio dos dois
             lados do botão — engolia toques destinados ao que está por baixo. */
          className="pointer-events-none fixed inset-x-0 bottom-0 z-50 flex justify-center px-4 pb-4 md:hidden"
          style={{ paddingBottom: 'calc(1rem + env(safe-area-inset-bottom))' }}
        >
          {/* O preço vai junto: é a única coisa que a pessoa ainda não sabe quando chega aqui
              rolando a página, e é a que ela mais quer saber antes de tocar.
              Com o preço o texto fica longo, e nos 360px dos Android mais vendidos no Brasil
              a pílula quebrava em duas linhas. Menos margem interna aqui resolve sem mudar a
              forma. */}
          <BuyButton from="CTA Barra Fixa" className="pointer-events-auto px-5! shadow-[0_8px_32px_rgba(0,0,0,0.55)]">
            R$ 39,90 · Quero preparar minha casa
          </BuyButton>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
