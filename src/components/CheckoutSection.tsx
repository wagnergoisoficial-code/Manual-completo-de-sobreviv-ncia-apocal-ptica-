import React, { useState, useEffect } from 'react';
import { BONUSES } from '../data';
import { Shield, Sparkles, Clock, Check, CreditCard, QrCode, ClipboardCheck, ArrowRight, Loader2, Download, CheckCircle, BookOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import manualCover from '../assets/images/manual_cover_1783965348887.jpg';

export default function CheckoutSection() {
  const [paymentMethod, setPaymentMethod] = useState<'pix' | 'card'>('pix');
  const [buyerName, setBuyerName] = useState<string>('');
  const [buyerEmail, setBuyerEmail] = useState<string>('');
  const [cardNumber, setCardNumber] = useState<string>('');
  const [cardExpiry, setCardExpiry] = useState<string>('');
  const [cardCvv, setCardCvv] = useState<string>('');

  // Scarcity state
  const [timeLeft, setTimeLeft] = useState<number>(899); // 14:59 min
  const [spotsLeft, setSpotsLeft] = useState<number>(14);

  // Flow State
  const [checkoutStep, setCheckoutStep] = useState<'idle' | 'processing' | 'success'>('idle');
  const [processingLog, setProcessingLog] = useState<string>('');
  const [isCopied, setIsCopied] = useState<boolean>(false);

  // Timer loop
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          return 899; // loop back
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Spots decrease loop
  useEffect(() => {
    const interval = setInterval(() => {
      setSpotsLeft((prev) => {
        if (prev <= 3) return 3;
        return prev - Math.floor(Math.random() * 2);
      });
    }, 45000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleCopyPix = () => {
    navigator.clipboard.writeText("00020101021126580014br.gov.bcb.pix0136manualdesobrevivenciaapoc47reais0236FIMDOMUNDO");
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleSubmitCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (!buyerName || !buyerEmail) {
      alert("Por favor, preencha seu nome e e-mail para receber as chaves de descriptografia.");
      return;
    }

    setCheckoutStep('processing');
    
    // Simulate tactical mainframe encryption loading logs
    const logs = [
      "CONECTANDO AO GATEWAY DE CRIPTOGRAFIA...",
      "ESTABELECENDO CANAL SSL ASSIMÉTRICO...",
      "VERIFICANDO DISPONIBILIDADE NO BANCO DE DADOS SOBERANO...",
      "AUTENTICANDO CHAVES ASSINADAS DE SEGURANÇA...",
      "PAGAMENTO PROCESSADO COM SUCESSO!",
      "CRIPTOGRAFANDO E-BOOK 'MANUAL DE SOBREVIVÊNCIA APOCALÍPTICA' COM CHAVE AES-256...",
      "LIBERANDO LINKS DE ACESSO IMEDIATO..."
    ];

    let currentLogIndex = 0;
    setProcessingLog(logs[0]);

    const logInterval = setInterval(() => {
      currentLogIndex++;
      if (currentLogIndex < logs.length) {
        setProcessingLog(logs[currentLogIndex]);
      } else {
        clearInterval(logInterval);
        setCheckoutStep('success');
      }
    }, 800);
  };

  return (
    <div className="max-w-6xl mx-auto" id="pricing-module">
      {/* 2-Column layout: Left bonuses, Right pricing / Checkout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Bonuses */}
        <div className="lg:col-span-6 space-y-6">
          <div>
            <span className="text-[10px] font-mono text-survival-amber tracking-widest uppercase font-bold bg-survival-amber/10 border border-survival-amber/20 px-3 py-1 rounded-full">
              RECOMPENSAS EXCLUSIVAS // ACESSO IMEDIATO
            </span>
            <h3 className="text-xl sm:text-3xl font-display font-black text-white uppercase mt-4">
              Kit Tático de Suporte de Campo
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 mt-2 font-sans font-medium">
              Para garantir sua autonomia e segurança em qualquer escala de desastre, incluímos sem custo adicional estes protocolos de apoio estratégico:
            </p>
          </div>

          {/* Ebook Cover Showcase */}
          <div className="bg-zinc-950/40 border border-zinc-900 rounded-2xl p-6 flex flex-col sm:flex-row gap-6 items-center shadow-[0_20px_50px_rgba(0,0,0,0.8)] relative overflow-hidden group backdrop-blur-xl">
            {/* Ambient amber glow behind book */}
            <div className="absolute -left-10 -top-10 w-32 h-32 bg-survival-amber/10 rounded-full blur-2xl pointer-events-none" />
            
            {/* Book Cover Image container with 3D/shadow effect */}
            <div className="w-36 sm:w-40 shrink-0 aspect-[2/3] relative rounded-xl overflow-hidden border border-zinc-800 shadow-[0_0_30px_rgba(217,119,6,0.1)] group-hover:shadow-[0_0_45px_rgba(217,119,6,0.25)] transition-all duration-500 group-hover:scale-[1.02] transform">
              <img 
                src={manualCover} 
                alt="Manual Completo de Sobrevivência Apocalíptica" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            
            {/* Book specifications and title */}
            <div className="flex-1 space-y-3.5 text-center sm:text-left">
              <div>
                <span className="text-[9px] font-mono text-survival-amber font-bold tracking-widest uppercase block">
                  OBRA OFICIAL DE WAGNER GOIS
                </span>
                <h4 className="text-lg font-display font-extrabold text-white uppercase leading-tight mt-1">
                  Manual Completo de Sobrevivência Apocalíptica
                </h4>
                <p className="text-xs text-zinc-400 mt-1.5 leading-relaxed font-sans font-medium">
                  O compêndio definitivo contendo estratégias reais para proteger sua família quando tudo falhar.
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-3 pt-3 text-[10px] font-mono border-t border-zinc-900/60 font-semibold">
                <div>
                  <span className="text-zinc-500 block text-[9px] tracking-wider">AUTOR:</span>
                  <span className="text-zinc-200">WAGNER GOIS</span>
                </div>
                <div>
                  <span className="text-zinc-500 block text-[9px] tracking-wider">EDIÇÃO:</span>
                  <span className="text-survival-light">2ª REVISADA</span>
                </div>
                <div>
                  <span className="text-zinc-500 block text-[9px] tracking-wider">FORMATO:</span>
                  <span className="text-zinc-200">PDF DIGITAL</span>
                </div>
                <div>
                  <span className="text-zinc-500 block text-[9px] tracking-wider">ENVIO:</span>
                  <span className="text-survival-amber">IMEDIATO</span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {BONUSES.map((bonus) => (
              <div 
                key={bonus.id} 
                className="bg-zinc-900/10 border border-zinc-900 rounded-xl p-5.5 relative overflow-hidden group hover:border-zinc-800 transition-all duration-300 backdrop-blur-sm"
              >
                {/* Micro visual accent lines */}
                <div className="absolute top-0 left-0 w-1.5 h-full bg-survival-amber" />
                
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <span className="text-[9px] font-mono font-bold bg-survival-amber/10 text-survival-amber border border-survival-amber/20 px-2 py-0.5 rounded uppercase tracking-wider">
                      {bonus.badge}
                    </span>
                    <h4 className="text-base font-display font-bold text-white uppercase mt-2">
                      {bonus.title}
                    </h4>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-xs line-through text-zinc-600 font-mono block">
                      {bonus.value}
                    </span>
                    <span className="text-xs font-mono font-bold text-survival-light block">
                      GRÁTIS HOJE
                    </span>
                  </div>
                </div>

                <p className="text-xs text-zinc-400 mt-2 leading-relaxed font-sans font-medium">
                  {bonus.description}
                </p>
              </div>
            ))}
          </div>

          {/* Secure Trust Callout */}
          <div className="p-4.5 rounded-xl bg-zinc-950/30 border border-zinc-900/80 flex items-start gap-3.5">
            <Shield className="w-5 h-5 text-survival-light mt-0.5 shrink-0" />
            <div>
              <h5 className="text-xs font-bold text-zinc-200 uppercase">CANAL 100% SEGURO E CRIPTOGRAFADO</h5>
              <p className="text-[11px] text-zinc-500 leading-normal mt-1 font-sans font-medium">
                Seus dados de pagamento e e-mail estão protegidos por criptografia de ponta a ponta. Garantimos o envio imediato e absoluto anonimato fiscal.
              </p>
            </div>
          </div>
        </div>

        {/* Right Side: Pricing / Checkout Widget */}
        <div className="lg:col-span-6 bg-zinc-950/40 border border-zinc-900 rounded-2xl overflow-hidden shadow-[0_24px_60px_rgba(0,0,0,0.85)] relative backdrop-blur-xl">
          
          {/* Header Banner - Countdown timer */}
          <div className="bg-survival-green/10 border-b border-zinc-900 px-5 py-4 flex justify-between items-center text-xs font-mono">
            <div className="flex items-center gap-2 text-survival-light font-bold">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-survival-light opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-survival-light"></span>
              </span>
              <span className="tracking-wide">OFERTA EXPIRA EM:</span>
            </div>
            <div className="flex items-center gap-1.5 text-white font-bold bg-zinc-950 px-3 py-1.5 border border-zinc-900 rounded-lg shadow-sm">
              <Clock className="w-3.5 h-3.5 text-survival-amber" />
              <span>{formatTime(timeLeft)}</span>
            </div>
          </div>

          <div className="p-6 sm:p-10">
            <AnimatePresence mode="wait">
              {checkoutStep === 'idle' && (
                /* Step 1: Active Form & Pricing Pitch */
                <motion.div 
                  key="checkout-idle"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-7"
                >
                  {/* Big Pricing Pitch */}
                  <div className="text-center pb-6 border-b border-zinc-900/80 space-y-1.5">
                    <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest font-bold block">
                      INVESTIMENTO EM SEU MANUAL COMPLETO
                    </span>
                    <div className="flex items-center justify-center gap-3">
                      <span className="text-sm line-through text-zinc-600 font-mono">
                        R$ 422,00
                      </span>
                      <span className="text-3xl sm:text-4xl font-mono font-black text-white tracking-tighter">
                        R$ 47,00
                      </span>
                    </div>
                    <p className="text-xs text-survival-light font-mono font-bold">
                      Apenas R$ 47,00 no PIX ou 5x de R$ 10,15 no cartão de crédito.
                    </p>
                    <div className="pt-2">
                      <div className="inline-block bg-survival-red/10 border border-survival-red/20 px-3.5 py-1.5 rounded-lg text-[9px] text-survival-red font-mono font-bold animate-pulse">
                        ▲ RESTAM APENAS {spotsLeft} VAGAS COM DESCONTO ATIVO
                      </div>
                    </div>
                  </div>

                  {/* Form */}
                  <form onSubmit={handleSubmitCheckout} className="space-y-5">
                    {/* Inputs */}
                    <div className="space-y-4">
                      <div>
                        <label className="text-[9px] font-mono text-zinc-400 uppercase tracking-widest block mb-1.5 font-bold">
                          NOME DO OPERADOR / COMPRADOR *
                        </label>
                        <input 
                          type="text" 
                          required
                          value={buyerName}
                          onChange={(e) => setBuyerName(e.target.value)}
                          placeholder="Ex: Arthur Pendragon"
                          className="w-full bg-zinc-900/20 border border-zinc-900 focus:border-survival-light focus:ring-1 focus:ring-survival-light/30 rounded-xl px-4 py-3 text-sm text-zinc-100 placeholder-zinc-700 focus:outline-none transition-all font-sans font-semibold"
                        />
                      </div>

                      <div>
                        <label className="text-[9px] font-mono text-zinc-400 uppercase tracking-widest block mb-1.5 font-bold">
                          E-MAIL SEGURO PARA ENVIO DAS CHAVES *
                        </label>
                        <input 
                          type="email" 
                          required
                          value={buyerEmail}
                          onChange={(e) => setBuyerEmail(e.target.value)}
                          placeholder="seuemail@exemplo.com"
                          className="w-full bg-zinc-900/20 border border-zinc-900 focus:border-survival-light focus:ring-1 focus:ring-survival-light/30 rounded-xl px-4 py-3 text-sm text-zinc-100 placeholder-zinc-700 focus:outline-none transition-all font-sans font-semibold"
                        />
                      </div>
                    </div>

                    {/* Payment Method Selector */}
                    <div>
                      <span className="text-[9px] font-mono text-zinc-400 uppercase tracking-widest block mb-1.5 font-bold">
                        MÉTODO DE PAGAMENTO SEGURO
                      </span>
                      <div className="grid grid-cols-2 gap-3">
                        <button
                          type="button"
                          onClick={() => setPaymentMethod('pix')}
                          className={`py-3 px-3.5 border rounded-xl font-display font-extrabold text-[10px] uppercase flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm ${
                            paymentMethod === 'pix'
                              ? 'bg-survival-green/20 border-survival-light text-survival-light shadow-[0_0_15px_rgba(34,197,94,0.1)]'
                              : 'bg-zinc-900/20 border-zinc-900 text-zinc-500 hover:text-zinc-300'
                          }`}
                        >
                          <QrCode className="w-4 h-4" />
                          PIX IMEDIATO
                        </button>
                        <button
                          type="button"
                          onClick={() => setPaymentMethod('card')}
                          className={`py-3 px-3.5 border rounded-xl font-display font-extrabold text-[10px] uppercase flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm ${
                            paymentMethod === 'card'
                              ? 'bg-survival-green/20 border-survival-light text-survival-light shadow-[0_0_15px_rgba(34,197,94,0.1)]'
                              : 'bg-zinc-900/20 border-zinc-900 text-zinc-500 hover:text-zinc-300'
                          }`}
                        >
                          <CreditCard className="w-4 h-4" />
                          CARTÃO CRÉDITO
                        </button>
                      </div>
                    </div>

                    {/* Conditional Fields based on method */}
                    {paymentMethod === 'pix' ? (
                      <div className="p-5 bg-zinc-900/20 border border-zinc-900 rounded-xl text-center space-y-4">
                        <span className="text-[9px] font-mono text-survival-light uppercase font-bold tracking-widest block">
                          CHAVE COPIAR E COLAR / QR CODE SIMULADO
                        </span>
                        
                        <div className="flex justify-center py-2 bg-white/5 inline-block p-2 rounded-lg border border-zinc-800/80 max-w-[120px] mx-auto shadow-inner">
                          {/* A beautiful pixelated grid simulator representing a QR code */}
                          <div className="grid grid-cols-6 gap-0.5 w-20 h-20 bg-white p-1 rounded">
                            {[...Array(36)].map((_, i) => (
                              <div 
                                key={i} 
                                className={`w-full h-full ${
                                  (i * 7 + 13) % 5 === 0 || (i < 6 && i > 1) || (i % 6 === 0) || (i > 30)
                                    ? 'bg-black' 
                                    : 'bg-white'
                                }`} 
                              />
                            ))}
                          </div>
                        </div>

                        <div className="flex items-center gap-2 bg-zinc-950/80 px-3.5 py-2.5 border border-zinc-900 rounded-xl shadow-sm">
                          <input 
                            type="text" 
                            readOnly 
                            value="manual-de-sobrevivencia-pix-47-reais-fim-do-mundo"
                            className="bg-transparent text-[10px] font-mono text-zinc-450 flex-1 outline-none select-all"
                          />
                          <button
                            type="button"
                            onClick={handleCopyPix}
                            className="px-3 py-1.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-800 rounded-lg text-[9px] font-mono transition-colors flex items-center gap-1.5 shrink-0 cursor-pointer font-bold"
                          >
                            <ClipboardCheck className="w-3.5 h-3.5 text-survival-amber" />
                            {isCopied ? 'COPIADO' : 'COPIAR'}
                          </button>
                        </div>
                        <p className="text-[10px] text-zinc-500 font-sans font-semibold leading-relaxed">
                          A aprovação pelo Pix leva menos de 5 segundos. Copie o código acima e efetue o teste de simulação.
                        </p>
                      </div>
                    ) : (
                      <div className="p-5 bg-zinc-900/20 border border-zinc-900 rounded-xl space-y-3.5">
                        <span className="text-[9px] font-mono text-zinc-400 uppercase font-bold tracking-widest block">
                          DADOS DO CARTÃO DE CRÉDITO (SIMULAÇÃO)
                        </span>
                        <div className="space-y-3">
                          <div>
                            <input 
                              type="text" 
                              required={paymentMethod === 'card'}
                              placeholder="Número do Cartão (Simulado)"
                              value={cardNumber}
                              onChange={(e) => setCardNumber(e.target.value)}
                              className="w-full bg-zinc-950/85 border border-zinc-900 focus:border-survival-light focus:ring-1 focus:ring-survival-light/30 rounded-xl px-3.5 py-2.5 text-xs font-mono text-zinc-200 focus:outline-none transition-all placeholder-zinc-850"
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-3">
                            <input 
                              type="text" 
                              required={paymentMethod === 'card'}
                              placeholder="MM/AA"
                              value={cardExpiry}
                              onChange={(e) => setCardExpiry(e.target.value)}
                              className="w-full bg-zinc-950/85 border border-zinc-900 focus:border-survival-light focus:ring-1 focus:ring-survival-light/30 rounded-xl px-3.5 py-2.5 text-xs font-mono text-zinc-200 focus:outline-none transition-all placeholder-zinc-855"
                            />
                            <input 
                              type="password" 
                              maxLength={4}
                              required={paymentMethod === 'card'}
                              placeholder="CVV"
                              value={cardCvv}
                              onChange={(e) => setCardCvv(e.target.value)}
                              className="w-full bg-zinc-950/85 border border-zinc-900 focus:border-survival-light focus:ring-1 focus:ring-survival-light/30 rounded-xl px-3.5 py-2.5 text-xs font-mono text-zinc-200 focus:outline-none transition-all placeholder-zinc-855"
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Submit button */}
                    <button
                      type="submit"
                      className="w-full py-4 rounded-xl bg-survival-light hover:bg-green-500 text-black font-display font-black text-xs sm:text-sm uppercase tracking-wider transition-all duration-300 shadow-[0_6px_25px_rgba(34,197,94,0.15)] flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.01]"
                    >
                      ADQUIRIR ACESSO IMEDIATO + BÔNUS
                      <ArrowRight className="w-4.5 h-4.5" />
                    </button>
                  </form>

                  {/* Guaranteed Badge info */}
                  <div className="flex items-center gap-3.5 justify-center pt-2 text-[10px] text-zinc-500 font-semibold font-mono">
                    <span className="flex items-center gap-1">
                      <Check className="w-3.5 h-3.5 text-survival-light" />
                      7 Dias de Garantia
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Check className="w-3.5 h-3.5 text-survival-light" />
                      Canal Criptografado
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Check className="w-3.5 h-3.5 text-survival-light" />
                      Envio Digital Automático
                    </span>
                  </div>
                </motion.div>
              )}

              {checkoutStep === 'processing' && (
                /* Step 2: Mainframe Processing Logs */
                <motion.div 
                  key="checkout-processing"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="py-14 flex flex-col items-center justify-center text-center space-y-6"
                >
                  <Loader2 className="w-11 h-11 text-survival-light animate-spin" />
                  <div className="space-y-3">
                    <h3 className="text-white font-display font-black text-sm uppercase tracking-wider">
                      PROCESSANDO PEDIDO NO MAINFRAME...
                    </h3>
                    <div className="bg-zinc-950 border border-zinc-900 p-5 rounded-xl w-full max-w-sm mx-auto font-mono text-[9px] text-left text-survival-light space-y-1.5 select-none leading-normal shadow-inner">
                      <span className="text-zinc-600 block font-bold">[SYSTEM LOG]</span>
                      <span className="font-semibold block">{processingLog}</span>
                    </div>
                  </div>
                </motion.div>
              )}

              {checkoutStep === 'success' && (
                /* Step 3: Immersive Download & Preview Hub! */
                <motion.div 
                  key="checkout-success"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6 text-center py-2"
                >
                  <div className="w-16 h-16 bg-survival-green/20 border border-survival-light/40 rounded-2xl flex items-center justify-center mx-auto text-survival-light mb-4 shadow-inner">
                    <CheckCircle className="w-8 h-8" />
                  </div>

                  <div className="space-y-2">
                    <span className="text-[10px] font-mono text-survival-light uppercase tracking-widest font-bold bg-survival-light/10 border border-survival-light/20 px-3 py-1 rounded-full">
                      PAGAMENTO RECONHECIDO // CHAVES LIBERADAS
                    </span>
                    <h3 className="text-xl sm:text-2xl font-display font-black text-white uppercase tracking-wider pt-2">
                      ACESSO TOTAL LIBERADO COM SUCESSO!
                    </h3>
                    <p className="text-xs text-zinc-400 max-w-md mx-auto font-sans font-medium">
                      Olá <strong>{buyerName}</strong>, enviamos as chaves criptografadas e o link definitivo para o e-mail <strong>{buyerEmail}</strong>.
                    </p>
                  </div>

                  {/* Immediate Download Simulated File Widget */}
                  <div className="p-5 bg-zinc-900/10 border border-zinc-900 rounded-xl text-left space-y-4 max-w-sm mx-auto shadow-sm">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 bg-survival-green/10 border border-survival-light/30 text-survival-light rounded-lg">
                        <Download className="w-5 h-5" />
                      </div>
                      <div className="min-w-0">
                        <span className="text-[9px] font-mono text-zinc-500 uppercase block font-bold">ARQUIVO DESBLOQUEADO</span>
                        <h4 className="text-white font-sans text-xs font-bold truncate">
                          Manual_Sobrevivencia_Apoc_Full.pdf
                        </h4>
                      </div>
                    </div>

                    <a 
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        alert("Simulação de Download: Seu navegador iniciaria agora o download seguro do Manual de Sobrevivência Apocalíptica completo em formato PDF de 342 páginas e mapas de telecomunicações!");
                      }}
                      className="w-full py-3 rounded-xl bg-survival-light hover:bg-green-500 text-black font-display font-black text-xs uppercase tracking-wider text-center block transition-all duration-300 shadow-sm cursor-pointer"
                    >
                      DOWNLOAD DO MANUAL COMPLETO (.PDF)
                    </a>
                  </div>

                  {/* Immediate Chapter 1 Peek (Interactive ebook sandbox!) */}
                  <div className="border-t border-zinc-900 pt-6 text-left">
                    <span className="text-[9px] font-mono text-survival-amber uppercase tracking-widest block mb-2.5 font-bold">
                      LEITURA IMEDIATA // PREVIEW CAPÍTULO 1 DESBLOQUEADO
                    </span>
                    
                    <div className="bg-zinc-950/80 border border-zinc-900 p-5 rounded-xl h-44 overflow-y-auto font-sans text-xs text-zinc-400 leading-relaxed space-y-3.5 select-none scrollbar-thin shadow-inner font-medium">
                      <h5 className="font-display font-black text-white uppercase text-xs sm:text-sm border-b border-zinc-900 pb-2 flex items-center gap-1.5 tracking-wider">
                        <BookOpen className="w-4 h-4 text-survival-amber" />
                        Capítulo 1: O Colapso das Redes Complexas
                      </h5>
                      <p>
                        A sociedade contemporânea orgulha-se de sua infraestrutura digital. No entanto, essa interconectividade extrema é o seu maior calcanhar de Aquiles. Quando um ataque cibernético de grande escala ou um surto eletromagnético atinge o núcleo de processamento financeiro, os sistemas de compensação bancária caem imediatamente.
                      </p>
                      <p>
                        Sem transações digitais, os postos de combustíveis não conseguem faturar novas cargas. As transportadoras param. As prateleiras dos supermercados metropolitanos esvaziam-se em menos de 48 horas. A água encanada para de jorrar, pois as bombas de pressurização municipais dependem da eletricidade do grid.
                      </p>
                      <p>
                        Este é o cenário crítico. A sobrevivência tática começa quando você se desvincula psicologicamente e logisticamente do Estado...
                      </p>
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={() => setCheckoutStep('idle')}
                      className="text-xs font-mono text-zinc-500 hover:text-zinc-300 underline cursor-pointer font-bold"
                    >
                      Voltar para simular com outros dados
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>

      </div>
    </div>
  );
}
