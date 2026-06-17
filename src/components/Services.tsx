import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SERVICES } from '../data.ts';
import { Service } from '../types.ts';
import { IconRenderer } from './IconRenderer.tsx';

interface ServicesProps {
  onSelectService: (serviceTitle: string) => void;
}

// Faixas diagonais com texto em movimento infinito
const tickerWords = [
  'Engenharia Industrial',
  'Estruturas Metálicas',
  'Construção Naval',
  'Tubagem Industrial',
  'Obras de Grande Porte',
  'Segurança e Qualidade',
  'Excelência em Execução',
  'ISO 9001:2015',
  'AWS Certified',
  'Engenharia Industrial',
  'Estruturas Metálicas',
  'Construção Naval',
  'Tubagem Industrial',
  'Obras de Grande Porte',
  'Segurança e Qualidade',
  'Excelência em Execução',
];

const DiagonalTicker: React.FC<{ direction?: 'left' | 'right'; angle?: number }> = ({
  direction = 'left',
  angle = -12,
}) => {
  const words = [...tickerWords, ...tickerWords];
  const duration = direction === 'left' ? 28 : 32;

  return (
    <div
      className="absolute inset-x-[-10%] overflow-hidden pointer-events-none"
      style={{ transform: `rotate(${angle}deg)` }}
    >
      <div className="relative flex overflow-hidden py-3">
        <motion.div
          className="flex items-center gap-0 shrink-0"
          animate={{ x: direction === 'left' ? [0, '-50%'] : ['-50%', 0] }}
          transition={{ duration, repeat: Infinity, ease: 'linear' }}
        >
          {words.map((word, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-4 px-6 py-2 font-['Helvetica_Neue',_sans-serif] font-black text-sm uppercase tracking-[0.25em] whitespace-nowrap"
              style={{
                color: 'rgba(37, 99, 235, 0.18)',
                WebkitTextStroke: '1px rgba(37, 99, 235, 0.12)',
              }}
            >
              {word}
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: 'rgba(37, 99, 235, 0.3)' }}
              />
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export const Services: React.FC<ServicesProps> = ({ onSelectService }) => {
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const handleCtaRequest = (serviceTitle: string) => {
    setSelectedService(null);
    onSelectService(serviceTitle);
  };

  return (
    <section id="servicos" className="relative py-20 lg:py-32 bg-[#071B35] overflow-hidden scroll-mt-20 lg:scroll-mt-24">
      {/* Fade top */}
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#030d1a] to-transparent z-0" />
      <div className="absolute inset-0 z-0 opacity-[0.04] steel-brushed" />

      {/* ── X Diagonal Ticker Bands ── */}
      <div className="absolute inset-0 z-[1] overflow-hidden pointer-events-none" style={{ top: '15%', bottom: '15%' }}>
        {/* Faixa 1 — esquerda para direita */}
        <div className="absolute w-full" style={{ top: '20%' }}>
          <DiagonalTicker direction="right" angle={-10} />
        </div>
        {/* Faixa 2 — direita para esquerda */}
        <div className="absolute w-full" style={{ top: '55%' }}>
          <DiagonalTicker direction="left" angle={10} />
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">

        {/* Section Header */}
        <div className="text-center mb-16 lg:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 bg-[#2563EB]/10 rounded-full border border-[#2563EB]/35 text-xs font-mono font-bold text-[#B8C4D0] tracking-wider uppercase mb-4"
          >
            <span>Portfólio de Serviços</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-['Helvetica_Neue',_sans-serif] font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-none uppercase"
          >
            Engenharia e <span className="text-[#2563EB]">Serviços Industrializados</span>
          </motion.h2>
          <p className="font-sans text-[#B8C4D0]/70 text-sm sm:text-base max-w-3xl mx-auto mt-4 leading-relaxed">
            Nossas soluções contemplam todas as fases da infraestrutura industrial, desde o detalhamento de cálculo estático e dinâmico até a entrega "as-built" da semente operacional.
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-[#1A5296] to-[#3B82F6] mx-auto mt-6 rounded-full" />
        </div>

        {/* Responsive Grid (2 columns on mobile, 3 on tablet/desktop) */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 md:gap-8">
          {SERVICES.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              onClick={() => setSelectedService(service)}
              className="group relative h-[170px] sm:h-[250px] md:h-[400px] lg:h-[450px] overflow-hidden rounded-xl border border-[#B8C4D0]/10 hover:border-[#1A5296]/50 transition-all duration-300 shadow-xl hover:shadow-[#1A5296]/10 cursor-pointer"
            >
              {/* Card Image */}
              <div className="absolute inset-0 z-0">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.08] filter brightness-[0.4] group-hover:brightness-[0.35]"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050f1e] via-[#050f1e]/70 to-transparent" />
              </div>

              {/* Icon */}
              <div className="absolute top-2.5 left-2.5 sm:top-6 sm:left-6 z-10 w-7 h-7 sm:w-12 sm:h-12 rounded-lg bg-[#050f1e]/80 backdrop-blur-md border border-[#B8C4D0]/20 flex items-center justify-center text-[#1A5296] transition-all duration-300 group-hover:bg-[#2563EB] group-hover:text-white group-hover:scale-110">
                <IconRenderer name={service.iconName} size={14} className="sm:scale-150" />
              </div>

              {/* Content */}
              <div className="absolute inset-x-0 bottom-0 z-10 p-2.5 sm:p-6 flex flex-col justify-end h-full bg-gradient-to-t from-[#050f1e] via-[#050f1e]/90 to-transparent">
                <h3 className="font-display font-extrabold text-[10px] sm:text-base md:text-xl text-white mb-0.5 sm:mb-3 group-hover:text-[#3B82F6] transition-colors duration-300 line-clamp-2">
                  {service.title}
                </h3>
                <p className="font-sans text-[#B8C4D0]/80 text-[10px] sm:text-xs md:text-sm line-clamp-2 md:line-clamp-3 mb-4 hidden sm:block">
                  {service.description}
                </p>
                <button
                  id={`service-trigger-${service.id}`}
                  className="w-full py-3 bg-white/5 hover:bg-[#2563EB] hover:text-white text-[#B8C4D0] font-sans font-semibold text-xs rounded-md transition-all duration-300 flex items-center justify-center gap-2 border border-[#B8C4D0]/10 hover:border-[#2563EB] shadow-sm hidden sm:flex"
                >
                  <span>MÉTRICAS &amp; DETALHES</span>
                  <IconRenderer name="ArrowRight" size={12} />
                </button>
              </div>

              <div className="absolute inset-0 z-0 bg-[#1A5296]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.div>
          ))}
        </div>

        {/* Modal Drawer */}
        <AnimatePresence>
          {selectedService && (
            <div className="fixed inset-0 z-55 flex items-center justify-center px-4 py-6">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedService(null)}
                className="absolute inset-0 bg-[#050f1e]/90 backdrop-blur-sm"
              />
              <motion.div
                initial={{ scale: 0.95, opacity: 0, y: 30 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 30 }}
                transition={{ type: 'spring', duration: 0.5 }}
                className="relative w-full max-w-3xl max-h-[90vh] md:max-h-[85vh] flex flex-col bg-[#071B35] border border-[#1A5296]/35 shadow-2xl rounded-xl z-10 overflow-hidden"
              >
                {/* Header Image Area */}
                <div className="relative h-28 sm:h-56 shrink-0">
                  <img
                    src={selectedService.image}
                    alt={selectedService.title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#071B35] to-[#071B35]/20" />
                  
                  {/* Close button - Fixed size and touch area for Mobile */}
                  <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20">
                    <button
                      onClick={() => setSelectedService(null)}
                      className="p-2.5 sm:p-1.5 rounded-full bg-black/60 backdrop-blur-md text-white hover:bg-[#2563EB] transition-colors border border-white/20"
                      aria-label="Fechar"
                    >
                      <IconRenderer name="X" size={18} />
                    </button>
                  </div>
                  
                  <div className="absolute bottom-3 left-3 sm:bottom-6 sm:left-6 flex items-center gap-2 sm:gap-4">
                    <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-lg bg-[#1A5296] flex items-center justify-center text-white shadow-lg shrink-0">
                      <IconRenderer name={selectedService.iconName} size={16} className="sm:scale-150" />
                    </div>
                    <div>
                      <span className="text-[8px] sm:text-[10px] font-mono font-bold text-[#B8C4D0]/80 tracking-widest uppercase block">
                        Cópia de Engenharia
                      </span>
                      <h4 className="font-display font-extrabold text-xs sm:text-2xl text-white leading-tight">
                        {selectedService.title}
                      </h4>
                    </div>
                  </div>
                </div>

                {/* Content Area - Scrollable */}
                <div className="p-4 sm:p-8 space-y-4 sm:space-y-6 overflow-y-auto flex-1 text-left">
                  <div className="space-y-2 sm:space-y-4">
                    <h5 className="font-display font-bold text-xs sm:text-sm tracking-wider text-[#B8C4D0] uppercase">
                      Informações Gerais &amp; Capacidade
                    </h5>
                    <p className="font-sans text-xs sm:text-base text-[#B8C4D0]/90 leading-relaxed font-light">
                      {selectedService.detailedDescription}
                    </p>
                  </div>
                  <div className="space-y-2 sm:space-y-4">
                    <h5 className="font-display font-bold text-xs sm:text-sm tracking-wider text-[#B8C4D0] uppercase">
                      Escopo Técnico &amp; Entregáveis
                    </h5>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                      {selectedService.features.map((feature, index) => (
                        <div
                          key={index}
                          className="flex items-start gap-2 p-2.5 rounded-lg bg-white/3 border border-[#B8C4D0]/5 hover:border-[#1A5296]/20 transition-all duration-300"
                        >
                          <div className="mt-0.5 text-[#1A5296] shrink-0">
                            <IconRenderer name="Check" size={12} className="text-white sm:scale-125" />
                          </div>
                          <span className="font-sans text-xs sm:text-sm text-[#B8C4D0] leading-normal">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="p-3 sm:p-4 bg-[#081e39] rounded-lg border border-[#1A5296]/20 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
                    <div className="flex items-center gap-2.5 sm:gap-3">
                      <IconRenderer name="ShieldAlert" className="text-[#1A5296] shrink-0" size={18} />
                      <div className="flex flex-col">
                        <span className="font-mono text-[8px] sm:text-[10px] text-[#B8C4D0]/80 font-bold uppercase tracking-wider">
                          Normas Regulamentares Integradas
                        </span>
                        <span className="font-sans text-[10px] sm:text-xs text-[#B8C4D0]">
                          Soldadura homologada AWS D1.1, D1.5 e projeto estrutural ABNT NBR 8800.
                        </span>
                      </div>
                    </div>
                    <span className="shrink-0 px-2.5 py-1 rounded bg-[#010915] text-[8px] sm:text-[10px] font-mono font-bold text-white tracking-widest border border-white/10 uppercase">
                      Auditoria de Risco Zero
                    </span>
                  </div>
                </div>

                {/* Footer Area - Fixed */}
                <div className="p-4 sm:p-6 bg-[#071B35] border-t border-[#1A5296]/20 flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4 shrink-0">
                  <div className="flex flex-col text-center sm:text-left">
                    <span className="text-[8px] sm:text-[10px] font-mono text-[#B8C4D0]/60">Gostaria de falar com nossa engenharia?</span>
                    <span className="text-[10px] sm:text-xs font-sans text-white font-medium">Orçamentos e escopos técnicos completos</span>
                  </div>
                  <div className="flex gap-3 w-full sm:w-auto">
                    <button
                      onClick={() => handleCtaRequest(selectedService.title)}
                      id={`modal-request-${selectedService.id}`}
                      className="w-full sm:w-auto px-5 py-3 bg-[#2563EB] hover:bg-[#1A5296] text-white font-sans font-bold text-xs uppercase rounded-md border-b-2 border-white/20 transition-all tracking-wider flex items-center justify-center gap-2"
                    >
                      <IconRenderer name="Speech" size={13} />
                      <span>SOLICITAR ORÇAMENTO</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
