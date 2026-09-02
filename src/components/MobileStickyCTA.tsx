import React, { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import CheckoutLink from './CheckoutLink';

/**
 * Barra de compra fixa no rodapé, só no celular.
 *
 * Ela não aparece de cara: enquanto o hero está na tela, o botão amarelo grande já está à
 * mão e a barra seria só ruído sobre a headline. Assim que a pessoa rola e deixa esse botão
 * para trás, o preço volta a ficar a um toque de distância pelo resto da página.
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

  // A seção de oferta é um bloco amarelo inteiro, com o CTA principal dentro. Uma barra
  // amarela por cima dele desapareceria no fundo e brigaria com o próprio botão.
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
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="md:hidden fixed inset-x-0 bottom-0 z-50 border-t border-signal-deep"
          style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
        >
          <CheckoutLink
            from="CTA Barra Fixa"
            className="flex items-center justify-center gap-2.5 bg-signal active:bg-signal-soft text-black font-mono text-tag font-bold uppercase whitespace-nowrap px-4 py-4 transition-colors"
          >
            R$&nbsp;39,90 · Entrar
            <ArrowRight className="w-4 h-4 shrink-0" strokeWidth={2.5} />
          </CheckoutLink>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
