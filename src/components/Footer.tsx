import React from 'react';
import { IconRenderer } from './IconRenderer.tsx';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const links = {
    empresa: [
      { label: 'Início', href: '#inicio' },
      { label: 'Sobre Nós', href: '#sobre' },
      { label: 'Diferenciais de Qualidade', href: '#diferenciais' },
      { label: 'História & Marcos', href: '#sobre' },
    ],
    servicos: [
      { label: 'Estruturas Metálicas', href: '#servicos' },
      { label: 'Construção Naval', href: '#servicos' },
      { label: 'Tubagem Industrial', href: '#servicos' },
      { label: 'Serralheria Fina', href: '#servicos' },
      { label: 'Construção Civil Pesada', href: '#servicos' },
    ],
    legal: [
      { label: 'Termos de Engenharia', href: '#contato' },
      { label: 'Compliance & Direitos', href: '#contato' },
      { label: 'Sitemap Geral', href: '#' },
      { label: 'Garantia de Acidente Zero', href: '#diferenciais' },
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
          <a href="#inicio" className="flex items-center gap-3 group select-none">
            <img 
              src="/assets/images/logo-icon.png" 
              alt="Metaloworld Logo" 
              className="w-10 h-10 object-contain transition-transform duration-300 group-hover:scale-105" 
            />
            <div className="flex flex-col">
              <span className="font-['Helvetica_Neue',_sans-serif] font-extrabold text-xl tracking-tight leading-none text-white">
                METALOWORLD
              </span>
              <span className="text-[9px] uppercase tracking-[0.3em] font-bold text-[#C4CCD4]/70 mt-1">
                Construções Industriais
              </span>
            </div>
          </a>

          <p className="font-sans text-xs sm:text-sm text-brand-silver/70 leading-relaxed">
            Líderes nacionais na fabricação e montagem de estruturas metálicas complexas, reparos marítimos avançados, serralherias certificadas e bases de concreto de alta rigidez.
          </p>

          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[9px] font-mono font-bold text-brand-silver tracking-widest uppercase">
              CREA REGISTRO: N-41002
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
          <h4 className="font-display font-bold text-xs uppercase tracking-widest text-brand-silver font-sans">Legal & Rastreabilidade</h4>
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
            Aviso de Licenciamentos: Todo o chapeamento estrutural, tubagem de processo e ligas estruturais utilizadas são auditados em controle laboratorial antes da solda. Serviços executados por profissionais CLT qualificados de acordo com diretrizes do MTE.
          </p>
          
          {/* Regulatory certifications logos as inline tags */}
          <div className="flex gap-2.5">
            <span className="px-2 py-1 bg-white/5 rounded border border-white/10 text-[9px] font-mono text-brand-silver tracking-wider uppercase">
              ASME CERTIFIED
            </span>
            <span className="px-2 py-1 bg-white/5 rounded border border-white/10 text-[9px] font-mono text-brand-silver tracking-wider uppercase">
              AWS COMPLIANT
            </span>
          </div>
        </div>
      </div>

      {/* Deep Copyright section */}
      <div className="relative z-10 py-6 border-t border-brand-metallic/5 bg-[#01060e] px-6 text-left">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-sans text-[11px] sm:text-xs text-[#B8C4D0]/40">
            &copy; {currentYear} Metaloworld &amp; Construções Industriais Ltda. CNPJ: 14.120.002/0001-35. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};
