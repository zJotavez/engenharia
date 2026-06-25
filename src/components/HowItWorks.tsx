import React from 'react';
import { motion } from 'motion/react';
import { IconRenderer } from './IconRenderer.tsx';

interface Step {
  number: string;
  title: string;
  description: string;
  icon: string;
}

const STEPS: Step[] = [
  {
    number: '01',
    title: 'Apresentação da Necessidade',
    description: 'A sua empresa apresenta o escopo técnico do projeto, prazos e qualificações profissionais exigidas.',
    icon: 'Speech',
  },
  {
    number: '02',
    title: 'Definição da Solução Técnica',
    description: 'A METALOWORLD analisa a viabilidade, planeia a logística e identifica a melhor solução operacional.',
    icon: 'Layers',
  },
  {
    number: '03',
    title: 'Mobilização da Equipa',
    description: 'Uma equipa de profissionais rigorosamente qualificados e certificados é direcionada para o projeto.',
    icon: 'Users',
  },
  {
    number: '04',
    title: 'Execução e Acompanhamento',
    description: 'Execução das atividades industriais com foco em máxima qualidade, conformidade técnica, segurança e monitorização.',
    icon: 'CheckCircle2',
  },
];

export const HowItWorks: React.FC = () => {
  return (
    <section id="como-funciona" className="relative py-20 lg:py-32 bg-[#050f1e] overflow-hidden scroll-mt-20 lg:scroll-mt-24">
      {/* Background decoration */}
      <div className="absolute inset-0 z-0 opacity-[0.02] steel-brushed pointer-events-none" />
      
      {/* Light glow behind */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#1A5296]/8 rounded-full blur-[140px] pointer-events-none" />

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
            <span>Fluxo Operacional</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-['Helvetica_Neue',_sans-serif] font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-none uppercase"
          >
            Como <span className="text-[#2563EB]">Funciona</span>
          </motion.h2>
          <p className="font-sans text-[#B8C4D0]/70 text-sm sm:text-base max-w-2xl mx-auto mt-4 leading-relaxed">
            Um processo simplificado e corporativo desenhado para integrar equipas altamente qualificadas aos seus projetos com agilidade operacional e máxima conformidade.
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-[#1A5296] to-[#3B82F6] mx-auto mt-6 rounded-full" />
        </div>

        {/* Timeline Layout */}
        <div className="relative max-w-5xl mx-auto mt-12">
          
          {/* Horizontal Line Connector (Desktop only) */}
          <div className="absolute top-[52px] left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-[#1A5296]/20 via-[#2563EB]/50 to-[#1A5296]/20 z-0 hidden lg:block" />

          {/* Steps Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 lg:gap-6 relative z-10">
            {STEPS.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6, delay: index * 0.12 }}
                className="flex flex-col items-center text-center group"
              >
                {/* Icon Container with Animated Glowing Ring */}
                <div className="relative mb-6">
                  {/* Glowing background ring */}
                  <div className="absolute -inset-2 bg-gradient-to-r from-[#1A5296] to-[#2563EB] rounded-full opacity-0 group-hover:opacity-40 blur-md transition-all duration-500 scale-90 group-hover:scale-100" />
                  
                  {/* Circle Node */}
                  <div className="w-[104px] h-[104px] rounded-full bg-[#071B35] border border-[#1A5296]/30 flex items-center justify-center text-white relative z-10 group-hover:border-[#2563EB] transition-all duration-300 shadow-xl group-hover:-translate-y-1">
                    {/* Icon */}
                    <IconRenderer name={step.icon} size={32} className="text-[#B8C4D0] group-hover:text-white transition-colors duration-300" />
                    
                    {/* Step Number Tag */}
                    <span className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-[#2563EB] border border-[#050f1e] flex items-center justify-center font-mono text-[10px] font-black text-white shadow-md">
                      {step.number}
                    </span>
                  </div>
                </div>

                {/* Text Content */}
                <div className="space-y-2.5 max-w-[260px] lg:max-w-none">
                  <h3 className="font-display font-extrabold text-base sm:text-lg text-white group-hover:text-[#2563EB] transition-colors duration-300">
                    {step.title}
                  </h3>
                  <p className="font-sans text-xs sm:text-sm text-[#B8C4D0]/70 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Down Arrow Connector (Mobile only, except for the last step) */}
                {index < STEPS.length - 1 && (
                  <div className="lg:hidden mt-4 text-[#1A5296]/40 animate-bounce">
                    <IconRenderer name="ArrowRight" size={24} className="rotate-90" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>

        </div>

        {/* CTA final da seção */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-20 flex justify-center"
        >
          <a
            href="#contato"
            className="inline-flex items-center gap-3 px-8 py-3.5 bg-[#071B35] hover:bg-[#2563EB]/10 border border-[#2563EB]/40 hover:border-[#2563EB] text-white font-sans font-bold text-xs uppercase tracking-widest transition-all duration-300 hover:-translate-y-0.5 rounded shadow-lg"
          >
            <span>Apresentar uma Necessidade</span>
            <IconRenderer name="ArrowRight" size={12} />
          </a>
        </motion.div>

      </div>
    </section>
  );
};
