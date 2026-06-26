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
    <section id="sobre" className="relative py-20 lg:py-32 bg-[#061830] overflow-hidden">
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
            className="inline-flex items-center gap-2 px-3 py-1 bg-[#2563EB]/10 rounded-full border border-[#2563EB]/30 text-xs font-mono font-bold text-[#B8C4D0] tracking-wider uppercase mb-4"
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
            Precisão Técnica e <span className="text-[#2563EB]">Eficiência Operacional</span>
          </motion.h2>
          <div className="w-16 h-1 bg-[#2563EB] mx-auto mt-6 rounded-full" />
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
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10 glow-industrial-blue group">
              <img
                src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=1200"
                alt="Estruturas metálicas em projeto industrial"
                title="Montagem de estruturas metálicas em Portugal da METALOWORLD"
                loading="lazy"
                className="w-full h-[350px] sm:h-[450px] object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#061830] via-[#061830]/20 to-transparent" />
              
              {/* Overlay Glass Badge inside Image */}
              <div className="absolute bottom-6 left-6 right-6 bg-[#030d1a]/85 backdrop-blur-md p-4 rounded-xl border border-white/10 flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-[#2563EB] to-[#1A5296] rounded-lg flex items-center justify-center text-white shadow-md">
                  <IconRenderer name="Building" size={22} />
                </div>
                <div>
                  <h4 className="font-bold text-xs text-white uppercase tracking-wider">Qualidade Homologada</h4>
                  <p className="text-[10px] text-[#B8C4D0]/80 mt-0.5">Certificação sob padrões exigidos</p>
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
              Unindo precisão técnica à eficiência operacional
            </h3>
            
            <p className="font-sans text-sm sm:text-base text-[#B8C4D0]/90 leading-relaxed">
              Somos especializados no fornecimento de profissionais altamente qualificados e na execução de soluções técnicas para os setores industrial, metalomecânico, construção e naval. A METALOWORLD conecta as empresas aos profissionais certos para a execução de cada projeto.
            </p>
            
            <p className="font-sans text-sm sm:text-base text-[#B8C4D0]/70 leading-relaxed">
              Atuamos com foco na qualidade, segurança e produtividade, oferecendo às empresas equipas preparadas para atender projetos de diferentes portes em toda a Europa. Reduzimos a complexidade operacional para que os nossos clientes se possam concentrar nos seus objetivos de negócio principais.
            </p>
            
            {/* Checklist of core pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-[#1A5296]/15">
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-[#2563EB]/25 border border-[#2563EB]/40 flex items-center justify-center text-white">
                  <IconRenderer name="Check" size={10} />
                </div>
                <span className="text-xs font-mono font-bold text-white uppercase tracking-wide">Profissionais Qualificados</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-[#2563EB]/25 border border-[#2563EB]/40 flex items-center justify-center text-white">
                  <IconRenderer name="Check" size={10} />
                </div>
                <span className="text-xs font-mono font-bold text-white uppercase tracking-wide">Atuação Internacional</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-[#2563EB]/25 border border-[#2563EB]/40 flex items-center justify-center text-white">
                  <IconRenderer name="Check" size={10} />
                </div>
                <span className="text-xs font-mono font-bold text-white uppercase tracking-wide">Flexibilidade Operacional</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-[#2563EB]/25 border border-[#2563EB]/40 flex items-center justify-center text-white">
                  <IconRenderer name="Check" size={10} />
                </div>
                <span className="text-xs font-mono font-bold text-white uppercase tracking-wide">Qualidade & Segurança</span>
              </div>
            </div>
          </motion.div>
          
        </div>

        {/* Timeline block */}
        <div className="mt-16 border-t border-[#1A5296]/10 pt-16">
          <div className="text-center mb-12">
            <h4 className="font-mono text-xs font-bold text-[#B8C4D0]/60 uppercase tracking-widest">A Nossa Estruturação Operacional</h4>
          </div>

          {/* Stepper Timeline Navigation */}
          <div className="relative max-w-4xl mx-auto px-4 mb-8">
            {/* Timeline Progress Bar Line */}
            <div className="absolute top-[32px] left-[10%] right-[10%] h-0.5 bg-[#1A5296]/20 z-0 hidden md:block" />
            <div 
              className="absolute top-[32px] left-[10%] h-0.5 bg-gradient-to-r from-[#2563EB] to-[#1A5296] z-0 hidden md:block transition-all duration-500" 
              style={{ width: `${(activeStep / (timeline.length - 1)) * 80}%` }} 
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
                      className={`w-16 h-16 rounded-full border-2 flex items-center justify-center transition-all duration-300 shadow-lg ${
                        isActive
                          ? 'bg-gradient-to-br from-[#2563EB] to-[#1A5296] border-white text-white scale-110 shadow-[0_0_15px_rgba(37,99,235,0.5)]'
                          : 'bg-[#030d1a]/90 border-white/10 text-[#B8C4D0]/70 hover:border-[#2563EB]/40 hover:text-white'
                      }`}
                    >
                      <span className="font-mono font-extrabold text-xs uppercase tracking-wide">{item.year}</span>
                    </div>

                    {/* Small vertical title on card */}
                    <span
                      className={`text-xs font-sans font-bold text-center mt-3.5 tracking-wide transition-colors duration-300 ${
                        isActive ? 'text-[#2563EB]' : 'text-[#B8C4D0]/50 group-hover:text-[#B8C4D0]'
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
            className="max-w-3xl mx-auto mt-10 bg-gradient-to-br from-[#081a33]/85 to-[#040e1b]/95 border border-white/10 p-6 sm:p-8 pl-8 sm:pl-10 rounded-2xl shadow-[0_20px_40px_rgba(2,10,23,0.8)] backdrop-blur-md relative overflow-hidden select-none"
          >
            {/* Decorative colored bar on left */}
            <div className="absolute top-0 bottom-0 left-0 w-[4px] bg-gradient-to-b from-[#2563EB] to-[#1A5296]" />

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-white/10 pb-4 mb-4">
              <div className="flex items-center gap-3">
                <span className="font-mono text-2xl font-black text-[#2563EB]">{currentStep.year}</span>
                <h5 className="font-display font-extrabold text-base sm:text-lg text-white">
                  {currentStep.title}
                </h5>
              </div>
              {currentStep.milestone && (
                <span className="px-2.5 py-0.5 rounded-full bg-[#2563EB]/10 text-[#3b82f6] border border-[#2563EB]/30 font-mono text-[9px] font-bold uppercase tracking-wider">
                  Fase Estrutural
                </span>
              )}
            </div>
            
            <p className="font-sans text-xs sm:text-sm text-[#B8C4D0]/80 leading-relaxed">
              {currentStep.description}
            </p>
          </motion.div>
        </div>

      </div>
    </section>
  );
};
