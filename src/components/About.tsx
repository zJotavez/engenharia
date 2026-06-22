import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { TIMELINE_ITEMS } from '../data.ts';
import { TimelineItem } from '../types.ts';
import { IconRenderer } from './IconRenderer.tsx';

interface AboutProps {
  timeline?: TimelineItem[];
}

export const About: React.FC<AboutProps> = ({ timeline = TIMELINE_ITEMS }) => {
  const [activeStep, setActiveStep] = useState<number>(timeline.length - 1);

  // If timeline changes (e.g. loaded dynamically), reset activeStep to last element
  useEffect(() => {
    if (timeline.length > 0) {
      setActiveStep(timeline.length - 1);
    }
  }, [timeline]);

  const currentStep = timeline[activeStep] || timeline[timeline.length - 1] || { year: '', title: '', description: '', milestone: false };

  return (
    <section id="sobre" className="relative py-20 lg:py-32 bg-[#071B35] overflow-hidden">
      {/* Decorative metal texture background element */}
      <div className="absolute inset-0 z-0 opacity-[0.03] steel-brushed" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center mb-16 lg:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 bg-[#1D5A9E]/10 rounded-full border border-[#1D5A9E]/35 text-xs font-mono font-bold text-[#C4CCD4] tracking-wider uppercase mb-4"
          >
            <span>Tradição & Visão</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-['Helvetica_Neue',_sans-serif] font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-tight uppercase"
          >
            A Solidez da <span className="text-[#1D5A9E]">Engenharia Industrial</span> Pesada
          </motion.h2>
          <div className="w-16 h-1 bg-[#1D5A9E] mx-auto mt-6 rounded-full" />
        </div>

        {/* Double Column Introduction */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-24">
          
          {/* Left Column: Image with Industrial Frame & Quality Badges */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-brand-silver/10 glow-industrial-blue group">
              <img
                src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=1200"
                alt="Metaloworld Corporativo"
                className="w-full h-[350px] sm:h-[450px] object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-deep via-brand-deep/20 to-transparent" />
              
              {/* Overlay Glass Badge inside Image */}
              <div className="absolute bottom-6 left-6 right-6 glass-panel-light p-4 rounded-xl border border-white/10 flex items-center gap-4">
                <div className="w-12 h-12 bg-brand-metallic rounded-lg flex items-center justify-center text-white shadow-md">
                  <IconRenderer name="Building" size={22} />
                </div>
                <div>
                  <h4 className="font-bold text-xs text-white uppercase tracking-wider">Qualidade Homologada</h4>
                  <p className="text-[10px] text-brand-silver/80 mt-0.5">Certificação sob padrões exigidos</p>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Right Column: Mission and Industrial Statement */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-7 space-y-6"
          >
            <h3 className="font-display font-extrabold text-xl sm:text-2xl text-white uppercase leading-snug tracking-tight">
              Construindo os alicerces físicos da indústria pesada moderna
            </h3>
            
            <p className="font-sans text-sm sm:text-base text-brand-silver/85 leading-relaxed">
              Desde 2011, atuamos como parceiros estratégicos no fornecimento de soluções complexas em estruturas de aço, caldeiraria e construção civil industrial. Nossa trajetória é pautada pelo compromisso indissolúvel com a segurança operacional, rastreabilidade completa de insumos e exatidão geométrica.
            </p>
            
            <p className="font-sans text-sm sm:text-base text-brand-silver/70 leading-relaxed">
              Investimos constantemente em engenharia própria de alto nível (BIM e modelagem paramétrica) e tecnologia fabril automatizada. Isso nos permite encurtar cronogramas de montagem de campo sem jamais comprometer os coeficientes de segurança estrutural.
            </p>
            
            {/* Checklist of core pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-brand-metallic/15">
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-brand-metallic/20 border border-brand-metallic/40 flex items-center justify-center text-white">
                  <IconRenderer name="Check" size={10} />
                </div>
                <span className="text-xs font-mono font-bold text-white uppercase tracking-wide">Soldadores Certificados</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-brand-metallic/20 border border-brand-metallic/40 flex items-center justify-center text-white">
                  <IconRenderer name="Check" size={10} />
                </div>
                <span className="text-xs font-mono font-bold text-white uppercase tracking-wide">Rastreabilidade Total</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-brand-metallic/20 border border-brand-metallic/40 flex items-center justify-center text-white">
                  <IconRenderer name="Check" size={10} />
                </div>
                <span className="text-xs font-mono font-bold text-white uppercase tracking-wide">ISO 9001:2015 em Curso</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-brand-metallic/20 border border-brand-metallic/40 flex items-center justify-center text-white">
                  <IconRenderer name="Check" size={10} />
                </div>
                <span className="text-xs font-mono font-bold text-white uppercase tracking-wide">Segurança NR-34 / NR-35</span>
              </div>
            </div>
          </motion.div>
          
        </div>

        {/* Timeline block */}
        <div className="mt-16 border-t border-brand-metallic/10 pt-16">
          <div className="text-center mb-12">
            <h4 className="font-mono text-xs font-bold text-brand-silver/60 uppercase tracking-widest">Nossa Jornada de Evolução</h4>
          </div>

          {/* Stepper Timeline Navigation */}
          <div className="relative max-w-4xl mx-auto px-4 mb-8">
            {/* Timeline Progress Bar Line */}
            <div className="absolute top-1/2 left-4 right-4 h-0.5 bg-brand-metallic/25 -translate-y-1/2 z-0 hidden md:block" />
            <div 
              className="absolute top-1/2 left-4 h-0.5 bg-gradient-to-r from-brand-metallic to-brand-silver -translate-y-1/2 z-0 hidden md:block transition-all duration-500" 
              style={{ width: `${(activeStep / (timeline.length - 1)) * 96}%` }} 
            />

            <div className="grid grid-cols-1 md:grid-cols-5 gap-6 relative z-10">
              {timeline.map((item, index) => {
                const isActive = activeStep === index;
                return (
                  <div
                    key={index}
                    onClick={() => setActiveStep(index)}
                    className="flex flex-col items-center cursor-pointer group"
                  >
                    {/* Circle Node */}
                    <div
                      className={`w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all duration-300 shadow-md ${
                        isActive
                          ? 'bg-brand-metallic border-white text-white scale-110 glow-industrial-blue'
                          : 'bg-brand-deep/80 border-brand-metallic/40 text-brand-silver hover:border-brand-metallic hover:text-white'
                      }`}
                    >
                      <span className="font-mono font-bold text-xs">{item.year}</span>
                    </div>

                    {/* Small vertical title on card */}
                    <span
                      className={`text-xs font-sans font-bold text-center mt-3 tracking-wide transition-colors duration-300 ${
                        isActive ? 'text-white' : 'text-brand-silver/50 group-hover:text-brand-silver'
                      }`}
                    >
                      {item.title}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Detailed step description card */}
          <motion.div
            key={activeStep}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="max-w-3xl mx-auto mt-8 glass-panel p-6 sm:p-8 rounded-xl border border-brand-metallic/25 shadow-xl select-none"
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-brand-metallic/15 pb-4 mb-4">
              <div className="flex items-center gap-3">
                <span className="font-mono text-2xl font-black text-brand-metallic">{currentStep.year}</span>
                <h5 className="font-display font-extrabold text-base sm:text-lg text-white">
                  {currentStep.title}
                </h5>
              </div>
              {currentStep.milestone && (
                <span className="px-2.5 py-0.5 rounded bg-brand-metallic/20 text-brand-silver border border-brand-metallic/30 font-mono text-[10px] font-bold uppercase tracking-wider">
                  Marco Histórico
                </span>
              )}
            </div>
            
            <p className="font-sans text-sm sm:text-base text-brand-silver leading-relaxed">
              {currentStep.description}
            </p>
          </motion.div>
        </div>

      </div>
    </section>
  );
};
