import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { IconRenderer } from './IconRenderer.tsx';
import { GeneralSettings } from '../types.ts';

interface HeroProps {
  settings: GeneralSettings;
}

export const Hero: React.FC<HeroProps> = ({ settings }) => {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  // Parallax cinematográfico: imagem sobe + zoom progressivo ao scroll
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '22%']);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.14]);
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '-10%']);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);

  const checkmarks = [
    { label: 'Segurança Absoluta', sub: 'Certificação Rígida' },
    { label: 'Soberania de Qualidade', sub: 'Normas ASME / AWS' },
    { label: 'Compromisso com Prazos', sub: 'Multa em Contrato' },
    { label: 'Engenharia Especializada', sub: 'Equipe de Mestres BIM' },
  ];

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative min-h-[95vh] lg:min-h-screen flex items-center justify-center overflow-hidden bg-[#050f1e] pt-24"
    >
      {/* ── Background com Parallax + Zoom Cinematográfico ── */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.img
          src={settings.heroImage}
          alt="Metalomecânica"
          fetchPriority="high"
          loading="eager"
          className="absolute inset-[-6%] w-[112%] h-[112%] object-cover object-center"
          style={{
            y: bgY,
            scale: bgScale,
            willChange: 'transform',
          }}
        />
        {/* Gradientes de profundidade */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#050f1e]/96 via-[#050f1e]/82 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050f1e] via-transparent to-[#050f1e]/35" />
        {/* Glow elétrico */}
        <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-[#1A5296]/18 rounded-full blur-[140px] animate-pulse-slow" />
      </div>

      {/* Steel mesh */}
      <div className="absolute inset-0 z-0 opacity-[0.05] steel-brushed" />

      {/* ── Conteúdo com parallax de saída ── */}
      <motion.div
        className="relative z-10 max-w-7xl mx-auto px-6 w-full py-12 lg:py-20 flex flex-col justify-center"
        style={{ y: contentY, opacity: contentOpacity, willChange: 'transform, opacity' }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

          {/* Left Column */}
          <div className="lg:col-span-7 text-left space-y-6">

            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#2563EB]/10 border border-[#2563EB]/30 text-xs font-mono font-bold text-[#B8C4D0] tracking-wider uppercase mb-2"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span>Infraestrutura &amp; Obras Corporativas</span>
            </motion.div>

            {/* H1 */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-['Helvetica_Neue',_sans-serif] font-black text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.06] uppercase"
            >
              {settings.heroTitle}{' '}
              <span className="text-[#2563EB]">{settings.heroHighlight}</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="font-sans text-base sm:text-lg text-[#B8C4D0]/90 leading-relaxed max-w-xl"
            >
              {settings.heroSubtitle}
            </motion.p>

            {/* CTA — apenas Solicitar Orçamento */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="pt-4"
            >
              <a
                href="#contato"
                id="hero-cta-quote"
                className="inline-flex items-center gap-3 px-8 py-4 bg-[#2563EB] hover:bg-[#1A5296] text-white font-sans font-bold text-xs uppercase tracking-widest shadow-2xl shadow-blue-950/50 border-b-2 border-white/20 transition-all duration-300 hover:-translate-y-0.5"
              >
                <span>{settings.heroCtaText}</span>
                <IconRenderer name="ArrowRight" size={14} />
              </a>
            </motion.div>
          </div>

          {/* Right Column — Industrial Visual */}
          <div className="lg:col-span-5 relative flex items-center justify-center py-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative w-full aspect-square max-w-[360px] sm:max-w-[400px] border border-white/5 rounded-full flex items-center justify-center"
            >
              <div className="absolute w-4/5 h-4/5 border border-[#2563EB]/20 rounded-full animate-pulse" />

              <div className="w-64 h-80 bg-gradient-to-br from-[#1E2328] to-[#050f1e] border border-white/10 shadow-2xl relative select-none">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#1A5296] to-[#3B82F6]" />
                <div className="p-6 text-left">
                  <div className="h-12 border-l-2 border-[#2563EB] pl-4 flex flex-col justify-center">
                    <span className="text-[10px] text-[#7B8EA3] uppercase tracking-wider font-mono">Status Operacional</span>
                    <span className="text-xs font-mono text-emerald-400">ENGINE_LIVE_PORTFOLIO</span>
                  </div>
                  <div className="mt-8 space-y-3">
                    <div className="h-1 w-full bg-white/5" />
                    <div className="h-1 w-2/3 bg-white/5" />
                    <div className="h-1 w-5/6 bg-[#2563EB]/30 animate-pulse" />
                  </div>
                  <div className="mt-8 grid grid-cols-2 gap-2 text-[10px] font-mono opacity-40">
                    <div>COORD_X: 41.229</div>
                    <div>COORD_Y: -8.115</div>
                    <div>FREQ: 60Hz</div>
                    <div>LOAD_ST: MAX</div>
                  </div>
                </div>
                <div className="absolute bottom-0 right-0 p-4">
                  <div className="w-12 h-12 bg-[#2563EB]/10 border border-[#2563EB]/20 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-[#2563EB] animate-ping" />
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-2 -left-4 p-4 bg-[#0D3561]/90 border border-white/20 backdrop-blur-md shadow-lg text-left select-none">
                <span className="text-[10px] block opacity-60 uppercase font-mono tracking-wider">Padrão Técnico</span>
                <span className="text-base sm:text-lg font-black tracking-tight text-white leading-tight">ISO 9001:2015</span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 lg:mt-24"
        >
          {checkmarks.map((badge, idx) => (
            <div
              key={idx}
              className="glass-panel p-4 rounded-lg flex items-center gap-3 border border-[#B8C4D0]/12 hover:border-[#1A5296]/40 transition-colors duration-300"
            >
              <div className="w-8 h-8 rounded-full bg-[#1A5296]/20 flex items-center justify-center">
                <IconRenderer name="Check" size={16} className="text-white" />
              </div>
              <div className="flex flex-col">
                <span className="font-display font-bold text-sm text-white leading-tight">{badge.label}</span>
                <span className="text-[10px] text-[#B8C4D0]/60 tracking-wider uppercase font-mono mt-0.5">{badge.sub}</span>
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Bottom gradient border */}
      <div className="absolute bottom-0 left-0 w-full h-[3px] bg-gradient-to-r from-[#050f1e] via-[#2563EB] to-[#050f1e]" />
    </section>
  );
};
