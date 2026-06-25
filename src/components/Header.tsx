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

    if (targetId === 'home') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
      return;
    }

    const element = document.getElementById(targetId);
    if (element) {
      const isLargeScreen = window.innerWidth >= 1024;
      const calculatedHeaderHeight = isLargeScreen ? 96 : 80;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - calculatedHeaderHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  const navItems = [
    { id: 'home', label: 'Home', href: '#home' },
    { id: 'sobre', label: 'Sobre', href: '#sobre' },
    { id: 'servicos', label: 'Serviços', href: '#servicos' },
    { id: 'como-funciona', label: 'Como Funciona', href: '#como-funciona' },
    { id: 'projetos', label: 'Projetos', href: '#projetos' },
    { id: 'talentos', label: 'Talentos', href: '#talentos' },
    { id: 'contato', label: 'Contato', href: '#contato' },
  ];

  return (
    <header
      id="main-nav-header"
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isScrolled
          ? 'py-3 bg-[#050f1e]/92 backdrop-blur-md shadow-lg border-b border-[#1A5296]/15'
          : 'py-6 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 xl:px-6 flex items-center justify-between gap-3">
        {/* Brand Logo */}
        <a href="#home" id="nav-brand-logo" className="flex items-center gap-2 xl:gap-3 group select-none shrink-0">
          <img 
            src="/assets/images/logo-icon.webp" 
            alt="Metaloworld Logo" 
            className="w-10 h-10 object-contain transition-transform duration-300 group-hover:scale-105" 
          />
          <div className="flex flex-col">
            <span className="font-['Helvetica_Neue',_sans-serif] font-extrabold text-xl tracking-tight leading-none text-white whitespace-nowrap">
              METALOWORLD
            </span>
            <span className="text-[9px] uppercase tracking-[0.3em] font-bold text-[#B8C4D0]/70 mt-1 whitespace-nowrap">
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
        <div className="hidden lg:flex items-center gap-3 xl:gap-5 shrink-0">
          <div className="flex flex-col text-right">
            <a
              href={`tel:${phoneRaw}`}
              className="font-mono text-[11px] xl:text-xs text-[#B8C4D0] hover:text-[#2563EB] transition-colors flex items-center gap-1.5 justify-end whitespace-nowrap"
            >
              <IconRenderer name="Phone" size={11} className="text-[#2563EB]" />
              {phone}
            </a>
            <span className="text-[9px] text-[#7B8EA3] uppercase tracking-wider whitespace-nowrap">Atendimento na Europa</span>
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
              <div className="pt-4 pb-2 flex flex-col gap-4">
                <a
                  href={`tel:${phoneRaw}`}
                  className="flex items-center gap-3 font-mono text-sm text-[#B8C4D0] py-2"
                >
                  <IconRenderer name="Phone" size={16} className="text-[#2563EB]" />
                  <span>{phone}</span>
                </a>
                <a
                  href="#contato"
                  onClick={(e) => handleNavClick(e, 'contato')}
                  className="w-full py-3 bg-[#2563EB] hover:bg-[#1A5296] text-white font-sans font-bold text-xs uppercase tracking-wider transition-all text-center flex items-center justify-center gap-2"
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
