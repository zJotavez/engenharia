import { useState, useEffect } from 'react';
import { Header } from './components/Header.tsx';
import { Hero } from './components/Hero.tsx';
import { About } from './components/About.tsx';
import { Services } from './components/Services.tsx';
import { Differentials } from './components/Differentials.tsx';
import { Portfolio } from './components/Portfolio.tsx';
import { StatsNumbers } from './components/StatsNumbers.tsx';
import { Testimonials } from './components/Testimonials.tsx';
import { CtaSection } from './components/CtaSection.tsx';
import { Contact } from './components/Contact.tsx';
import { Footer } from './components/Footer.tsx';
import { AdminPanel } from './components/AdminPanel.tsx';
import { HowItWorks } from './components/HowItWorks.tsx';
import { Talents } from './components/Talents.tsx';

// Data types and defaults
import { Service, Project, TimelineItem, StatItem, Testimonial, GeneralSettings } from './types.ts';
import { SERVICES, PROJECTS, TIMELINE_ITEMS, STATS, TESTIMONIALS, GENERAL_SETTINGS } from './data.ts';

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('home');
  const [selectedServicePreset, setSelectedServicePreset] = useState<string>('');
  
  // Admin view toggle
  const [isAdminView, setIsAdminView] = useState(window.location.hash === '#admin');

  // Dynamic states
  const [services, setServices] = useState<Service[]>(SERVICES);
  const [projects, setProjects] = useState<Project[]>(PROJECTS);
  const [timeline, setTimeline] = useState<TimelineItem[]>(TIMELINE_ITEMS);
  const [stats, setStats] = useState<StatItem[]>(STATS);
  const [testimonials, setTestimonials] = useState<Testimonial[]>(TESTIMONIALS);
  const [generalSettings, setGeneralSettings] = useState<GeneralSettings>(GENERAL_SETTINGS);

  // Fetch dynamic content on mount
  useEffect(() => {
    fetch('/data.json?t=' + Date.now())
      .then(res => {
        if (res.ok) return res.json();
        throw new Error('Fallback to static data');
      })
      .then(data => {
        if (data.services) setServices(data.services);
        if (data.projects) setProjects(data.projects);
        if (data.timeline) setTimeline(data.timeline);
        if (data.stats) setStats(data.stats);
        if (data.testimonials) setTestimonials(data.testimonials);
        if (data.general) setGeneralSettings(data.general);
      })
      .catch(err => {
        console.log('Using static local fallback data:', err);
      });
  }, []);

  // Sync hash for admin view
  useEffect(() => {
    const handleHashChange = () => {
      setIsAdminView(window.location.hash === '#admin');
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Redirecionamento suave na montagem inicial baseada em URL limpa
  useEffect(() => {
    const path = window.location.pathname.replace('/', '');
    let targetId = '';
    if (path === 'sobre') targetId = 'sobre';
    else if (path === 'servicos') targetId = 'servicos';
    else if (path === 'como-funciona') targetId = 'como-funciona';
    else if (path === 'projetos') targetId = 'projetos';
    else if (path === 'banco-de-talentos') targetId = 'talentos';
    else if (path === 'contato') targetId = 'contato';

    if (targetId) {
      setTimeout(() => {
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
      }, 400);
    }
  }, []);

  // Implement Intersection Observer or scroll spy to highlight current menu section
  useEffect(() => {
    const sections = ['home', 'sobre', 'servicos', 'como-funciona', 'projetos', 'talentos', 'contato'];
    
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const offsetTop = el.offsetTop;
          const offsetHeight = el.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            
            // Atualizar a URL limpa de forma transparente na barra de navegação
            const path = section === 'home' ? '' : (section === 'talentos' ? 'banco-de-talentos' : section);
            const currentPath = window.location.pathname.replace('/', '');
            if (currentPath !== path) {
              window.history.replaceState(null, '', `/${path}`);
            }
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    // Initial trigger
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Custom callback to pre-fill the contact form and scroll to the contact form smoothly
  const handlePreSelectService = (serviceTitle: string) => {
    setSelectedServicePreset(serviceTitle);
    
    // Smooth scroll down to contact form anchor
    const contactSection = document.getElementById('contato');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (isAdminView) {
    return (
      <AdminPanel
        onClose={() => window.location.hash = ''}
        generalSettings={generalSettings}
        setGeneralSettings={setGeneralSettings}
      />
    );
  }

  return (
    <div className="relative min-h-screen bg-[#050f1e] text-white selection:bg-[#2563EB]/40 selection:text-white overflow-x-hidden">
      {/* ── Antigravity Ambient Background System ── */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Primary glow orb — top right */}
        <div className="absolute top-[-8%] right-[-8%] w-[700px] h-[700px] bg-[#1A5296] opacity-20 rounded-full blur-[160px]" />
        {/* Secondary glow orb — bottom left */}
        <div className="absolute bottom-[-5%] left-[-5%] w-[500px] h-[500px] bg-[#2563EB] opacity-12 rounded-full blur-[140px]" />
        {/* Tertiary accent — mid page */}
        <div className="absolute top-[45%] left-[30%] w-[300px] h-[300px] bg-[#0D3561] opacity-15 rounded-full blur-[100px] animate-pulse-slow" />
        {/* Steel brushed texture overlay */}
        <div className="absolute inset-0 opacity-[0.35] steel-brushed" />
        {/* Technical grid overlay */}
        <div className="absolute inset-0 opacity-[0.015] tech-grid" />
      </div>

      {/* Floating Header */}
      <Header activeSection={activeSection} phone={generalSettings.phone} phoneRaw={generalSettings.phoneRaw} />

      {/* Hero Section */}
      <Hero settings={generalSettings} />

      {/* About Section */}
      <About timeline={timeline} />

      {/* Services Section */}
      <Services services={services} onSelectService={handlePreSelectService} />

      {/* How It Works Section */}
      <HowItWorks />

      {/* Differentials Section */}
      <Differentials />

      {/* Portfolio Section */}
      <Portfolio projects={projects} onSelectProject={handlePreSelectService} />

      {/* Stats Numbers Block */}
      <StatsNumbers stats={stats} />

      {/* Testimonials Section */}
      <Testimonials testimonials={testimonials} />

      {/* Talent Pool Section */}
      <Talents settings={generalSettings} />

      {/* Final Call to Action Section */}
      <CtaSection />

      {/* Contact Form Section */}
      <Contact settings={generalSettings} selectedServicePreset={selectedServicePreset} />

      {/* Footer Section */}
      <Footer settings={generalSettings} />

      {/* Botão Flutuante do WhatsApp */}
      <a
        href="https://wa.me/351923352934?text=Ol%C3%A1!%20Gostaria%20de%20obter%20mais%20informa%C3%A7%C3%B5es%20sobre%20os%20servi%C3%A7os%20da%20METALOWORLD."
        target="_blank"
        rel="noopener noreferrer"
        title="Falar com a METALOWORLD"
        className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-emerald-600 text-white rounded-full shadow-2xl hover:bg-emerald-500 hover:scale-110 active:scale-95 transition-all duration-300 group border border-white/10"
        id="whatsapp-floating-button"
      >
        <span className="absolute inset-0 rounded-full bg-emerald-500/30 animate-ping group-hover:animate-none pointer-events-none" />
        <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor" className="relative z-10">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.704 1.459h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>
    </div>
  );
}
