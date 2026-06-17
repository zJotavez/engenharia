import React from 'react';
import { motion } from 'motion/react';
import { IconRenderer } from './IconRenderer.tsx';

export const CtaSection: React.FC = () => {
  return (
    <section className="relative py-24 bg-[#071B35] overflow-hidden">
      {/* Metallic background image with heavy overlay blending */}
      <div className="absolute inset-0 z-0">
        <div
          className="w-full h-full bg-cover bg-center bg-no-repeat opacity-[0.16]"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1513828742140-ccaa2ecf32e9?auto=format&fit=crop&q=80&w=1920')`,
          }}
        />
        {/* Extreme dark blue overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#071B35] via-[#071B35]/95 to-[#051121]/90" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#071B35] to-transparent" />
      </div>

      {/* Floating active neon flares */}
      <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-[#1D5A9E]/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#0E3C6F]/20 rounded-full blur-[120px] pointer-events-none" />

      {/* Steel Mesh background texture */}
      <div className="absolute inset-0 z-0 opacity-[0.05] steel-brushed" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center space-y-8">
        
        {/* Quality Banner Check */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#f59e0b]/10 border border-[#f59e0b]/30 text-xs font-mono font-bold text-[#f59e0b] tracking-wider uppercase"
        >
          <span className="w-2 h-2 rounded-full bg-[#f59e0b] animate-ping" />
          <span>Atendimento prioritário para indústrias e comércio</span>
        </motion.div>

        {/* Headings */}
        <div className="space-y-4 max-w-3xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-['Helvetica_Neue',_sans-serif] font-black text-3.3xl sm:text-4.5xl text-white tracking-tight leading-tight uppercase"
          >
            Pronto para transformar seu projeto em realidade com máxima precisão?
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-sans text-[#C4CCD4]/80 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto"
          >
            Nossos engenheiros e projetistas estão prontos para compreender os escopos técnicos e cronogramas de sua obra. Fornecemos suporte global de ponta a ponta.
          </motion.p>
        </div>

        {/* Action button triggers for CRO */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <a
            href="#contato"
            id="cta-final-request"
            className="w-full sm:w-auto px-8 py-4 bg-[#1D5A9E] hover:bg-[#0E3C6F] text-white font-sans font-bold text-xs uppercase tracking-widest border-b-2 border-white/20 transition-all duration-300 flex items-center justify-center gap-3"
          >
            <IconRenderer name="Speech" size={14} />
            <span>SOLICITAR ORÇAMENTO DA OBRA</span>
          </a>

          <a
            href="https://api.whatsapp.com/send?phone=5585999990000&text=Olá!%20Gostaria%20de%20falar%20com%20um%20especialista%20da%20MV%20Engenharia%20sobre%20meu%20projeto."
            target="_blank"
            rel="noopener noreferrer"
            id="cta-final-whatsapp"
            className="w-full sm:w-auto px-8 py-4 bg-white/5 hover:bg-white/10 text-white border border-white/20 hover:border-white/50 font-sans font-bold text-xs uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2"
          >
            <IconRenderer name="Phone" size={14} className="text-[#C4CCD4]" />
            <span>FALE COM UM ESPECIALISTA NO WHATSAPP</span>
          </a>
        </motion.div>

        {/* Brief micro-information */}
        <p className="text-[10px] font-mono text-[#C4CCD4]/30 select-none uppercase tracking-widest">
          EMISSÃO IMEDIATA DE ART • ENGENHARIA DE PROJETOS PARCIAL OU EPC GLOBAL
        </p>

      </div>
    </section>
  );
};
