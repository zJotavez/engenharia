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
    fetch('/data.json')
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

  // Implement Intersection Observer or scroll spy to highlight current menu section
  useEffect(() => {
    const sections = ['home', 'sobre', 'servicos', 'projetos', 'contato'];
    
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const offsetTop = el.offsetTop;
          const offsetHeight = el.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
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

      {/* Differentials Section */}
      <Differentials />

      {/* Portfolio Section */}
      <Portfolio projects={projects} onSelectProject={handlePreSelectService} />

      {/* Stats Numbers Block */}
      <StatsNumbers stats={stats} />

      {/* Testimonials Section */}
      <Testimonials testimonials={testimonials} />

      {/* Final Call to Action Section */}
      <CtaSection />

      {/* Contact Form Section */}
      <Contact settings={generalSettings} selectedServicePreset={selectedServicePreset} />

      {/* Footer Section */}
      <Footer settings={generalSettings} />
    </div>
  );
}
