import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { IconRenderer } from './IconRenderer.tsx';

interface HeaderProps {
  activeSection: string;
}

export const Header: React.FC<HeaderProps> = ({ activeSection }) => {
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

  // Menu reduzido — sem Diferenciais e Depoimentos
  const navItems = [
    { id: 'home', label: 'Home', href: '#home' },
    { id: 'sobre', label: 'Sobre Nós', href: '#sobre' },
    { id: 'servicos', label: 'Serviços', href: '#servicos' },
    { id: 'projetos', label: 'Projetos', href: '#projetos' },
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
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Brand Logo */}
        <a href="#home" id="nav-brand-logo" className="flex items-center gap-3 group select-none">
          <div className="w-10 h-10 bg-[#1A5296] flex items-center justify-center border border-white/10 relative overflow-hidden shadow-lg transition-transform duration-300 group-hover:scale-105">
            <div className="w-6 h-6 border-2 border-white rotate-45 flex items-center justify-center transition-transform duration-500 group-hover:rotate-135">
              <div className="w-2 h-2 bg-white animate-pulse"></div>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-['Helvetica_Neue',_sans-serif] font-extrabold text-xl tracking-tight leading-none text-white">
              MV ENGENHARIA
            </span>
            <span className="text-[9px] uppercase tracking-[0.3em] font-bold text-[#B8C4D0]/70 mt-1">
              Construções Industriais
            </span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav id="desktop-navbar" className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.id)}
                className={`relative px-4 py-2 font-sans font-semibold text-xs uppercase tracking-widest transition-colors duration-300 rounded-md ${
                  isActive ? 'text-[#2563EB]' : 'text-[#B8C4D0] hover:text-white'
                }`}
              >
                <span>{item.label}</span>
                {isActive && (
                  <motion.div
                    layoutId="activeUnderline"
                    className="absolute bottom-0 left-4 right-4 h-0.5 bg-[#2563EB] rounded-full"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
              </a>
            );
          })}
        </nav>

        {/* Action Button & Contact Info */}
        <div className="hidden lg:flex items-center gap-6">
          <div className="flex flex-col text-right">
            <a
              href="tel:+5585999990000"
              className="font-mono text-xs text-[#B8C4D0] hover:text-[#2563EB] transition-colors flex items-center gap-1.5 justify-end"
            >
              <IconRenderer name="Phone" size={11} className="text-[#2563EB]" />
              +55 (85) 99999-0000
            </a>
            <span className="text-[10px] text-[#7B8EA3] uppercase tracking-wider">Atendimento Nacional</span>
          </div>

          <a
            href="#contato"
            onClick={(e) => handleNavClick(e, 'contato')}
            id="nav-cta-button"
            className="px-6 py-2.5 border border-[#2563EB] text-white bg-[#2563EB]/10 hover:bg-[#2563EB] text-[12px] font-bold uppercase tracking-wider transition-all duration-300 flex items-center gap-2"
          >
            <span>Orçamento</span>
            <IconRenderer name="ArrowRight" size={12} />
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
                  href="tel:+5585999990000"
                  className="flex items-center gap-3 font-mono text-sm text-[#B8C4D0] py-2"
                >
                  <IconRenderer name="Phone" size={16} className="text-[#2563EB]" />
                  <span>+55 (85) 99999-0000</span>
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
