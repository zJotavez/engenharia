import React, { useRef, useState, useEffect } from 'react';
import { motion, useAnimationControls } from 'motion/react';

/* ── Dados dos cards — textos curtos e objetivos ── */
const CARDS = [
  {
    code: 'MV-01',
    title: 'Engenharia Especializada',
    text: 'Equipe técnica preparada para projetos industriais complexos.',
  },
  {
    code: 'MV-02',
    title: 'Segurança Operacional',
    text: 'Processos executados com rigor técnico e controle de risco.',
  },
  {
    code: 'MV-03',
    title: 'Controle de Qualidade',
    text: 'Materiais, execução e entrega acompanhados em cada etapa.',
  },
  {
    code: 'MV-04',
    title: 'Entrega Planejada',
    text: 'Cronograma claro, gestão eficiente e compromisso com prazos.',
  },
  {
    code: 'MV-05',
    title: 'Atendimento Estratégico',
    text: 'Soluções desenvolvidas de acordo com cada projeto.',
  },
  {
    code: 'MV-06',
    title: 'Atuação Nacional',
    text: 'Capacidade para atender obras industriais em diferentes regiões.',
  },
];

/* ── Card individual ── */
const DiffCard: React.FC<{ code: string; title: string; text: string }> = ({ code, title, text }) => (
  <div
    className="diff-card group shrink-0 w-[280px] sm:w-[300px] flex flex-col justify-between p-8 select-none"
    style={{
      background: 'rgba(10, 30, 60, 0.55)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      border: '1px solid rgba(59, 130, 246, 0.13)',
      borderRadius: '2px',
      transition: 'border-color 0.4s ease, box-shadow 0.4s ease, transform 0.4s ease',
    }}
    onMouseEnter={(e) => {
      (e.currentTarget as HTMLElement).style.borderColor = 'rgba(59, 130, 246, 0.32)';
      (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 40px rgba(37, 99, 235, 0.10), 0 0 0 1px rgba(59, 130, 246, 0.08)';
      (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px) scale(1.01)';
    }}
    onMouseLeave={(e) => {
      (e.currentTarget as HTMLElement).style.borderColor = 'rgba(59, 130, 246, 0.13)';
      (e.currentTarget as HTMLElement).style.boxShadow = 'none';
      (e.currentTarget as HTMLElement).style.transform = 'translateY(0) scale(1)';
    }}
  >
    {/* Topo: código técnico */}
    <div className="mb-6">
      <span
        className="font-mono text-[10px] tracking-[0.3em] uppercase"
        style={{ color: 'rgba(59, 130, 246, 0.5)', letterSpacing: '0.3em' }}
      >
        {code}
      </span>
      {/* Linha decorativa */}
      <div
        className="mt-3 h-px w-8 transition-all duration-500 group-hover:w-14"
        style={{ background: 'rgba(59, 130, 246, 0.4)' }}
      />
    </div>

    {/* Corpo */}
    <div className="space-y-3 flex-1">
      <h3
        className="font-['Helvetica_Neue',_sans-serif] font-bold leading-snug"
        style={{ fontSize: '16px', color: 'rgba(255,255,255,0.92)', letterSpacing: '-0.01em' }}
      >
        {title}
      </h3>
      <p
        className="font-sans leading-relaxed"
        style={{ fontSize: '13px', color: 'rgba(184, 196, 208, 0.60)', lineHeight: '1.65' }}
      >
        {text}
      </p>
    </div>
  </div>
);

/* ── Componente principal ── */
export const Differentials: React.FC = () => {
  const trackRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollStart = useRef(0);
  const [dragActive, setDragActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  // Triplicar cards para garantir loop visual perfeito
  const loopCards = [...CARDS, ...CARDS, ...CARDS];

  /* ── Auto-scroll via requestAnimationFrame ── */
  const speed = 0.55; // px por frame
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    const step = () => {
      if (!isPaused && !isDragging.current) {
        el.scrollLeft += speed;
        // Reset seamless quando passa 1/3
        const oneThird = el.scrollWidth / 3;
        if (el.scrollLeft >= oneThird * 2) {
          el.scrollLeft -= oneThird;
        }
      }
      rafRef.current = requestAnimationFrame(step);
    };

    rafRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafRef.current);
  }, [isPaused]);

  /* ── Drag (mouse) ── */
  const onMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    setDragActive(true);
    startX.current = e.clientX;
    scrollStart.current = trackRef.current?.scrollLeft ?? 0;
  };
  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !trackRef.current) return;
    e.preventDefault();
    const dx = e.clientX - startX.current;
    trackRef.current.scrollLeft = scrollStart.current - dx * 1.4;
  };
  const onMouseUp = () => {
    isDragging.current = false;
    setDragActive(false);
  };

  /* ── Drag (touch) ── */
  const onTouchStart = (e: React.TouchEvent) => {
    isDragging.current = true;
    startX.current = e.touches[0].clientX;
    scrollStart.current = trackRef.current?.scrollLeft ?? 0;
  };
  const onTouchMove = (e: React.TouchEvent) => {
    if (!isDragging.current || !trackRef.current) return;
    const dx = e.touches[0].clientX - startX.current;
    trackRef.current.scrollLeft = scrollStart.current - dx * 1.2;
  };
  const onTouchEnd = () => { isDragging.current = false; };

  return (
    <section
      id="diferenciais"
      className="relative overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #06182E 0%, #0A2544 55%, #06182E 100%)',
        paddingTop: '7rem',
        paddingBottom: '7rem',
      }}
    >
      {/* Texture sutil */}
      <div className="absolute inset-0 opacity-[0.025] steel-brushed pointer-events-none" />

      {/* Glow centralizado */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(37, 99, 235, 0.07) 0%, transparent 70%)',
        }}
      />

      {/* ── Header ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 mb-16 lg:mb-20">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="flex flex-col items-start gap-5"
        >
          {/* Label */}
          <span
            className="font-mono text-[10px] tracking-[0.28em] uppercase"
            style={{ color: 'rgba(59, 130, 246, 0.55)' }}
          >
            Por que a Metaloworld?
          </span>

          {/* Heading */}
          <h2
            className="font-['Helvetica_Neue',_sans-serif] font-black uppercase leading-[1.04] max-w-2xl"
            style={{
              fontSize: 'clamp(2rem, 4vw, 3.25rem)',
              color: '#fff',
              letterSpacing: '-0.02em',
            }}
          >
            Garantia Técnica e{' '}
            <span style={{ color: 'rgba(59, 130, 246, 0.9)' }}>Segurança Operacional</span>
          </h2>

          {/* Linha divisória */}
          <div
            className="h-px w-12"
            style={{ background: 'rgba(59, 130, 246, 0.4)' }}
          />
        </motion.div>
      </div>

      {/* ── Carrossel ── */}
      <div
        className="relative w-full"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => { setIsPaused(false); isDragging.current = false; setDragActive(false); }}
      >
        {/* Fade lateral esquerdo */}
        <div
          className="absolute left-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(90deg, #06182E 0%, transparent 100%)' }}
        />
        {/* Fade lateral direito */}
        <div
          className="absolute right-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(270deg, #06182E 0%, transparent 100%)' }}
        />

        {/* Track */}
        <div
          ref={trackRef}
          className={`flex gap-5 overflow-x-auto px-8 pb-6 ${dragActive ? 'cursor-grabbing' : 'cursor-grab'}`}
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch',
            userSelect: 'none',
          }}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseUp}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          {loopCards.map((card, i) => (
            <DiffCard key={i} {...card} />
          ))}
        </div>
      </div>

      {/* Hint drag */}
      <div className="relative z-10 mt-6 flex justify-center">
        <span
          className="font-mono text-[9px] tracking-[0.3em] uppercase"
          style={{ color: 'rgba(184, 196, 208, 0.22)' }}
        >
          — arraste para navegar —
        </span>
      </div>

      {/* ── CTA Premium ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 mt-20 lg:mt-28">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10"
          style={{
            borderTop: '1px solid rgba(59, 130, 246, 0.12)',
            paddingTop: '3rem',
          }}
        >
          {/* Texto */}
          <div className="max-w-xl space-y-4">
            <h3
              className="font-['Helvetica_Neue',_sans-serif] font-black leading-snug"
              style={{
                fontSize: 'clamp(1.35rem, 2.5vw, 1.75rem)',
                color: '#fff',
                letterSpacing: '-0.015em',
              }}
            >
              Segurança técnica em cada etapa da sua obra.
            </h3>
            <p
              className="font-sans leading-relaxed"
              style={{
                fontSize: '14px',
                color: 'rgba(184, 196, 208, 0.60)',
                maxWidth: '500px',
              }}
            >
              Da análise estrutural à execução final, entregamos soluções industriais com
              controle, precisão e responsabilidade.
            </p>
          </div>

          {/* Botão premium */}
          <a
            href="#contato"
            className="group shrink-0 inline-flex items-center gap-3 font-sans font-bold uppercase transition-all duration-300"
            style={{
              fontSize: '11px',
              letterSpacing: '0.18em',
              color: '#fff',
              padding: '14px 32px',
              border: '1px solid rgba(59, 130, 246, 0.45)',
              background: 'rgba(37, 99, 235, 0.08)',
              backdropFilter: 'blur(8px)',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = 'rgba(37, 99, 235, 0.22)';
              (e.currentTarget as HTMLElement).style.borderColor = 'rgba(59, 130, 246, 0.7)';
              (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = 'rgba(37, 99, 235, 0.08)';
              (e.currentTarget as HTMLElement).style.borderColor = 'rgba(59, 130, 246, 0.45)';
              (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
            }}
          >
            <span>FALAR COM UM ESPECIALISTA</span>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
};
