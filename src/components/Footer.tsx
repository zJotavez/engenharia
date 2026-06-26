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
          <a href="#home" className="flex items-center gap-3 xl:gap-4 group select-none">
            <img 
              src="/assets/images/logo-icon.webp" 
              alt="Metaloworld Logo" 
              title="METALOWORLD"
              className="w-[56px] h-[56px] lg:w-[64px] lg:h-[64px] object-contain transition-transform duration-300 group-hover:scale-105" 
            />
            <div className="flex flex-col">
              <span className="font-['Helvetica_Neue',_sans-serif] font-extrabold text-[21px] lg:text-[23px] tracking-tight leading-none text-white">
                METALOWORLD
              </span>
              <span className="text-[9.5px] lg:text-[10px] uppercase tracking-[0.3em] font-bold text-[#C4CCD4]/70 mt-1">
                Soluções Industriais
              </span>
            </div>
          </a>

          <p className="font-sans text-xs sm:text-sm text-brand-silver/70 leading-relaxed">
            Conectamos indústrias a equipas altamente qualificadas e soluções técnicas nas áreas de metalomecânica, soldadura, montagem, decapagem e reparação naval em toda a Europa.
          </p>

          {/* Phone & WhatsApp Contacts */}
          <div className="space-y-2.5 font-sans pt-1">
            <a 
              href="tel:+351923352934" 
              className="flex items-center gap-2 text-xs sm:text-sm text-brand-silver/85 hover:text-[#2563EB] transition-colors"
            >
              <IconRenderer name="Phone" size={14} className="text-[#2563EB]" />
              <span>Telefone: +351 923 352 934</span>
            </a>
            <a 
              href="https://wa.me/351923352934?text=Ol%C3%A1!%20Gostaria%20de%20obter%20mais%20informa%C3%A7%C3%B5es%20sobre%20os%20servi%C3%A7os%20da%20METALOWORLD."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs sm:text-sm text-brand-silver/85 hover:text-emerald-400 transition-colors"
            >
              <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" className="text-emerald-500">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.704 1.459h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              <span>WhatsApp: +351 923 352 934</span>
            </a>
          </div>

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
