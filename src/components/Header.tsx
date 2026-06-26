import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { IconRenderer } from './IconRenderer.tsx';

interface HeaderProps {
  activeSection: string;
  phone: string;
  phoneRaw: string;
}

export const Header: React.FC<HeaderProps> = ({ activeSection, phone, phoneRaw }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);

    // Pequeno atraso para dar tempo ao menu mobile drawer de iniciar sua transição de fechamento,
    // garantindo que a rolagem suave seja executada corretamente e sem conflitos de layout no mobile.
    setTimeout(() => {
      if (targetId === 'home') {
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
        window.history.pushState(null, '', '/');
        return;
      }

      const element = document.getElementById(targetId);
      if (element) {
        const isLargeScreen = window.innerWidth >= 1024;
        const calculatedHeaderHeight = isLargeScreen ? 104 : 90;
        const elementPosition = element.getBoundingClientRect().top + window.scrollY;
        const offsetPosition = elementPosition - calculatedHeaderHeight;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });

        const path = targetId === 'talentos' ? 'banco-de-talentos' : targetId;
        window.history.pushState(null, '', `/${path}`);
      }
    }, 100);
  };

  const navItems = [
    { id: 'home', label: 'Início', href: '#home' },
    { id: 'sobre', label: 'Sobre', href: '#sobre' },
    { id: 'servicos', label: 'Serviços', href: '#servicos' },
    { id: 'como-funciona', label: 'Como Funciona', href: '#como-funciona' },
    { id: 'projetos', label: 'Projetos', href: '#projetos' },
    { id: 'talentos', label: 'Banco de Talentos', href: '#talentos' },
    { id: 'contato', label: 'Contato', href: '#contato' },
  ];

  return (
    <header
      id="main-nav-header"
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isScrolled
          ? 'py-2 bg-[#050f1e]/92 backdrop-blur-md shadow-lg border-b border-[#1A5296]/15'
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 xl:px-6 flex items-center justify-between gap-3">
        {/* Brand Logo */}
        <a href="#home" onClick={(e) => handleNavClick(e, 'home')} id="nav-brand-logo" className="flex items-center gap-3 xl:gap-4 group select-none shrink-0">
          <img 
            src="/assets/images/logo-icon.webp" 
            alt="Metaloworld Logo" 
            title="METALOWORLD — Soluções Industriais"
            className="w-[74px] h-[74px] lg:w-[86px] lg:h-[86px] object-contain transition-transform duration-300 group-hover:scale-105" 
          />
          <div className="flex flex-col">
            <span className="font-['Helvetica_Neue',_sans-serif] font-extrabold text-[25px] lg:text-[28px] tracking-tight leading-none text-white whitespace-nowrap">
              METALOWORLD
            </span>
            <span className="text-[11px] lg:text-[12.5px] uppercase tracking-[0.3em] font-bold text-[#B8C4D0]/70 mt-1 whitespace-nowrap">
              Soluções Industriais
            </span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav id="desktop-navbar" className="hidden lg:flex items-center gap-0.5 xl:gap-1.5 shrink min-w-0">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.id)}
                className={`relative px-2 xl:px-3 py-1.5 font-sans font-semibold text-[11px] xl:text-xs uppercase tracking-wider transition-colors duration-300 rounded-md whitespace-nowrap ${
                  isActive ? 'text-[#2563EB]' : 'text-[#B8C4D0] hover:text-white'
                }`}
              >
                <span>{item.label}</span>
                {isActive && (
                  <motion.div
                    layoutId="activeUnderline"
                    className="absolute bottom-0 left-2 right-2 h-0.5 bg-[#2563EB] rounded-full"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
              </a>
            );
          })}
        </nav>

        {/* Action Button & Contact Info */}
        <div className="hidden lg:flex items-center gap-3 xl:gap-4 shrink-0">
          <div className="flex flex-col text-right">
            <a
              href={`tel:${phoneRaw}`}
              className="font-mono text-[11px] xl:text-xs text-[#B8C4D0] hover:text-[#2563EB] transition-colors flex items-center gap-1.5 justify-end whitespace-nowrap"
            >
              <IconRenderer name="Phone" size={11} className="text-[#2563EB]" />
              {phone}
            </a>
            <span className="text-[9px] text-[#7B8EA3] uppercase tracking-wider whitespace-nowrap font-sans">Atendimento na Europa</span>
          </div>

          <a
            href="#contato"
            onClick={(e) => handleNavClick(e, 'contato')}
            id="nav-cta-button"
            className="px-2.5 xl:px-4 py-2 border border-[#2563EB] text-white bg-[#2563EB]/10 hover:bg-[#2563EB] text-[10px] xl:text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center gap-1 shrink-0 whitespace-nowrap"
          >
            <span>Orçamento</span>
            <IconRenderer name="ArrowRight" size={12} className="shrink-0" />
          </a>
        </div>

        {/* Mobile Menu Toggler */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          id="mobile-menu-toggler"
          className="lg:hidden p-2 text-[#B8C4D0] hover:text-white focus:outline-none transition-colors"
          aria-label="Abrir menu"
        >
          <IconRenderer name={isMobileMenuOpen ? 'X' : 'Menu'} size={24} />
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden w-full bg-[#050f1e]/95 backdrop-blur-lg border-b border-[#1A5296]/20"
          >
            <div className="px-6 py-4 flex flex-col gap-3">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.id)}
                  className={`py-3.5 border-b border-[#1A5296]/10 font-sans font-semibold text-sm uppercase tracking-widest flex justify-between items-center ${
                    activeSection === item.id ? 'text-[#2563EB]' : 'text-[#B8C4D0]'
                  }`}
                >
                  <span>{item.label}</span>
                  {activeSection === item.id && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB]" />
                  )}
                </a>
              ))}
              <div className="pt-4 pb-2 flex flex-col gap-3">
                <a
                  href={`tel:${phoneRaw}`}
                  className="flex items-center gap-3 font-mono text-sm text-[#B8C4D0] py-2"
                >
                  <IconRenderer name="Phone" size={16} className="text-[#2563EB]" />
                  <span>{phone}</span>
                </a>
                <a
                  href="https://wa.me/351923352934?text=Ol%C3%A1!%20Gostaria%20de%20obter%20mais%20informa%C3%A7%C3%B5es%20sobre%20os%20servi%C3%A7os%20da%20METALOWORLD."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-sans font-bold text-xs uppercase tracking-wider transition-all text-center flex items-center justify-center gap-2 rounded"
                >
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.704 1.459h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  <span>Conversar no WhatsApp</span>
                </a>
                <a
                  href="#contato"
                  onClick={(e) => handleNavClick(e, 'contato')}
                  className="w-full py-3 bg-[#2563EB] hover:bg-[#1A5296] text-white font-sans font-bold text-xs uppercase tracking-wider transition-all text-center flex items-center justify-center gap-2 rounded"
                >
                  <span>Solicitar Orçamento</span>
                  <IconRenderer name="ArrowRight" size={14} />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
