import React from 'react';
import { IconRenderer } from './IconRenderer.tsx';
import { GeneralSettings } from '../types.ts';

interface FooterProps {
  settings: GeneralSettings;
}

export const Footer: React.FC<FooterProps> = ({ settings }) => {
  const currentYear = new Date().getFullYear();

  const links = {
    empresa: [
      { label: 'Início', href: '#home' },
      { label: 'Sobre Nós', href: '#sobre' },
      { label: 'Diferenciais', href: '#diferenciais' },
      { label: 'Como Funciona', href: '#como-funciona' },
      { label: 'Banco de Talentos', href: '#talentos' },
    ],
    servicos: [
      { label: 'Soldadura Industrial', href: '#servicos' },
      { label: 'Montagem Industrial', href: '#servicos' },
      { label: 'Serralharia Mecânica', href: '#servicos' },
      { label: 'Decapagem e Pintura', href: '#servicos' },
      { label: 'Instalações de TI', href: '#servicos' },
      { label: 'Reparação Naval', href: '#servicos' },
    ],
    legal: [
      { label: 'Parcerias Estratégicas', href: '#contato' },
      { label: 'Compliance & Segurança', href: '#contato' },
      { label: 'Política de Privacidade', href: '#' },
      { label: 'Código de Conduta', href: '#' },
    ],
  };

  return (
    <footer className="relative bg-brand-deep border-t border-brand-metallic/15 overflow-hidden">
      {/* Visual steel grid overlay */}
      <div className="absolute inset-0 z-0 opacity-[0.02] steel-brushed" />

      {/* Primary columns */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16 sm:py-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 text-left">
        
        {/* Brand Information Column */}
        <div className="lg:col-span-4 space-y-6">
          <a href="#home" className="flex items-center gap-3 group select-none">
            <img 
              src="/assets/images/logo-icon.webp" 
              alt="Metaloworld Logo" 
              className="w-10 h-10 object-contain transition-transform duration-300 group-hover:scale-105" 
            />
            <div className="flex flex-col">
              <span className="font-['Helvetica_Neue',_sans-serif] font-extrabold text-xl tracking-tight leading-none text-white">
                METALOWORLD
              </span>
              <span className="text-[9px] uppercase tracking-[0.3em] font-bold text-[#C4CCD4]/70 mt-1">
                Soluções Industriais
              </span>
            </div>
          </a>

          <p className="font-sans text-xs sm:text-sm text-brand-silver/70 leading-relaxed">
            Conectamos indústrias a equipas altamente qualificadas e soluções técnicas nas áreas de metalomecânica, soldadura, montagem, decapagem e reparação naval em toda a Europa.
          </p>

          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[9px] font-mono font-bold text-brand-silver tracking-widest uppercase">
              Atuação Internacional
            </span>
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[9px] font-mono font-bold text-brand-silver tracking-widest uppercase">
              ISO 9001:2015
            </span>
          </div>
        </div>

        {/* Quick Links Site Column */}
        <div className="lg:col-span-2 space-y-4">
          <h4 className="font-display font-bold text-xs uppercase tracking-widest text-[#f59e0b]">Empresa</h4>
          <ul className="space-y-2.5">
            {links.empresa.map((link, i) => (
              <li key={i}>
                <a href={link.href} className="font-sans text-xs sm:text-sm text-brand-silver/80 hover:text-white transition-colors">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Solutions Column */}
        <div className="lg:col-span-3 space-y-4">
          <h4 className="font-display font-bold text-xs uppercase tracking-widest text-brand-silver">Serviços Executados</h4>
          <ul className="space-y-2.5">
            {links.servicos.map((link, i) => (
              <li key={i}>
                <a href={link.href} className="font-sans text-xs sm:text-sm text-brand-silver/80 hover:text-white transition-colors">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Technical/Compliance Column */}
        <div className="lg:col-span-3 space-y-4">
          <h4 className="font-display font-bold text-xs uppercase tracking-widest text-brand-silver font-sans">Legal &amp; Parcerias</h4>
          <ul className="space-y-2.5">
            {links.legal.map((link, i) => (
              <li key={i}>
                <a href={link.href} className="font-sans text-xs sm:text-sm text-brand-silver/80 hover:text-white transition-colors">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

      </div>

      {/* Core certification seals & regulatory highlights */}
      <div className="relative z-10 border-t border-brand-metallic/10 bg-[#020a14] py-8 px-6 text-left">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <p className="font-sans text-[11px] sm:text-xs text-brand-silver/50 leading-relaxed max-w-2xl">
            Aviso de Conformidade: Todos os serviços são executados por equipas qualificadas sob rígidas diretrizes europeias de segurança no trabalho e normas técnicas aplicáveis de qualidade industrial.
          </p>
          
          {/* Regulatory certifications logos as inline tags */}
          <div className="flex gap-2.5">
            <span className="px-2 py-1 bg-white/5 rounded border border-white/10 text-[9px] font-mono text-brand-silver tracking-wider uppercase">
              ASME CERTIFIED
            </span>
            <span className="px-2 py-1 bg-white/5 rounded border border-white/10 text-[9px] font-mono text-brand-silver tracking-wider uppercase">
              EN COMPLIANT
            </span>
          </div>
        </div>
      </div>

      {/* Deep Copyright section */}
      <div className="relative z-10 py-6 border-t border-brand-metallic/5 bg-[#01060e] px-6 text-left">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-sans text-[11px] sm:text-xs text-[#B8C4D0]/40">
            &copy; {currentYear} METALOWORLD. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};
