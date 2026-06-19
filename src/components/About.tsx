import React, { useState } from 'react';
import { motion } from 'motion/react';
import { TIMELINE_ITEMS } from '../data.ts';
import { IconRenderer } from './IconRenderer.tsx';

export const About: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(TIMELINE_ITEMS.length - 1);

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
              <div className="absolute bottom-6 left-6 right-6 p-4 glass-panel rounded-xl border border-brand-silver/15">
                <span className="font-mono text-xs text-brand-metallic font-bold uppercase tracking-wider block mb-1">
                  Capacidade Instalada
                </span>
                <span className="text-sm font-sans font-medium text-white block">
                  Pátio fabril moderno de 12.000m² equipado com pontes rolantes de 30 toneladas.
                </span>
              </div>
            </div>

            {/* Industrial design frame corners */}
            <div className="absolute -top-3 -left-3 w-10 h-10 border-t-2 border-l-2 border-brand-metallic pointer-events-none rounded-tl-lg" />
            <div className="absolute -bottom-3 -right-3 w-10 h-10 border-b-2 border-r-2 border-brand-metallic pointer-events-none rounded-br-lg" />
          </motion.div>

          {/* Right Column: Narrative Texts */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 flex flex-col gap-6"
          >
            <h3 className="font-display font-bold text-xl sm:text-2xl text-white">
              De uma serralharia de precisão para a liderança em Engenharia EPC e Estruturas de Grande Porte.
            </h3>
            
            <p className="font-sans text-brand-silver/90 leading-relaxed text-sm sm:text-base">
              A <strong>Metaloworld & Construções Industriais</strong> consolidou sua marca no mercado desenvolvendo soluções sob medida para setores de alta exigibilidade técnica, como o logístico portuário, petroquímico, químico, naval e offshore.
            </p>
            
            <p className="font-sans text-brand-silver/80 leading-relaxed text-sm sm:text-base">
              Nosso compromisso consiste em fundir <strong>engenharia de cálculo avançada</strong> à prática de manufatura rigorosa. Entregamos projetos completamente em conformidade com as exigentes normas AWS, ASME e ABNT. Seja no desenvolvimento de uma superestrutura logística de dezenas de toneladas ou na soldadura de tubagem de alta pressão, a precisão e a segurança absoluta são os nossos pilares imutáveis.
            </p>

            {/* Core commitments checkboxes row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              <div className="flex items-center gap-3">
                <IconRenderer name="CheckCircle2" className="text-brand-metallic" size={18} />
                <span className="font-sans text-sm text-white font-medium">Equipes 100% Próprias e CLT</span>
              </div>
              <div className="flex items-center gap-3">
                <IconRenderer name="CheckCircle2" className="text-brand-metallic" size={18} />
                <span className="font-sans text-sm text-white font-medium">Seguro Garantia e Responsabilidade Civil</span>
              </div>
              <div className="flex items-center gap-3">
                <IconRenderer name="CheckCircle2" className="text-brand-metallic" size={18} />
                <span className="font-sans text-sm text-white font-medium">Rastreabilidade Total de Matérias-Primas</span>
              </div>
              <div className="flex items-center gap-3">
                <IconRenderer name="CheckCircle2" className="text-brand-metallic" size={18} />
                <span className="font-sans text-sm text-white font-medium">Engenharia Digital 3D (BIM) Integrada</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Interactive Milestone Timeline */}
        <div className="mt-20 lg:mt-32">
          <div className="text-center mb-10">
            <h4 className="font-display font-extrabold text-sm tracking-widest text-brand-metallic uppercase">
              NOSSOS PRINCIPAIS MARCOS DE CRESCIMENTO
            </h4>
            <p className="text-xs text-brand-silver/60 mt-1">
              Clique nos nós correspondentes para explorar a nossa jornada evolutiva
            </p>
          </div>

          {/* Timeline Nodes Row */}
          <div className="relative max-w-5xl mx-auto py-8">
            {/* Main horizontal connector line */}
            <div className="absolute top-1/2 left-4 right-4 h-0.5 bg-brand-metallic/20 -translate-y-1/2 z-0 hidden md:block" />
            
            {/* Active horizontal highlighted progression line */}
            <div 
              className="absolute top-1/2 left-4 h-0.5 bg-gradient-to-r from-brand-metallic to-brand-silver -translate-y-1/2 z-0 hidden md:block transition-all duration-500" 
              style={{ width: `${(activeStep / (TIMELINE_ITEMS.length - 1)) * 96}%` }} 
            />

            <div className="grid grid-cols-1 md:grid-cols-5 gap-6 relative z-10">
              {TIMELINE_ITEMS.map((item, index) => {
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
                <span className="font-mono text-2xl font-black text-brand-metallic">{TIMELINE_ITEMS[activeStep].year}</span>
                <h5 className="font-display font-extrabold text-base sm:text-lg text-white">
                  {TIMELINE_ITEMS[activeStep].title}
                </h5>
              </div>
              {TIMELINE_ITEMS[activeStep].milestone && (
                <span className="px-2.5 py-0.5 rounded bg-brand-metallic/20 text-brand-silver border border-brand-metallic/30 font-mono text-[10px] font-bold uppercase tracking-wider">
                  Marco Histórico
                </span>
              )}
            </div>
            
            <p className="font-sans text-sm sm:text-base text-brand-silver leading-relaxed">
              {TIMELINE_ITEMS[activeStep].description}
            </p>
          </motion.div>
        </div>

      </div>
    </section>
  );
};
