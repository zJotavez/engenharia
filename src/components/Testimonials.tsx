import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TESTIMONIALS } from '../data.ts';
import { Testimonial } from '../types.ts';
import { IconRenderer } from './IconRenderer.tsx';

interface TestimonialsProps {
  testimonials?: Testimonial[];
}

export const Testimonials: React.FC<TestimonialsProps> = ({ testimonials = TESTIMONIALS }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setCurrentIndex(0);
  }, [testimonials]);

  const startAutoRotation = () => {
    stopAutoRotation();
    if (testimonials.length <= 1) return;
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 7000);
  };
  const stopAutoRotation = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  useEffect(() => {
    startAutoRotation();
    return () => stopAutoRotation();
  }, [testimonials]);

  const handlePrev = () => {
    stopAutoRotation();
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    startAutoRotation();
  };
  const handleNext = () => {
    stopAutoRotation();
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    startAutoRotation();
  };

  const currentTestimonial = testimonials[currentIndex] || testimonials[0] || { name: '', role: '', company: '', feedback: '', avatarUrl: '', rating: 5 };

  return (
    <section id="depoimentos" className="relative py-20 lg:py-32 bg-[#071B35] overflow-hidden">
      <div className="absolute top-1/2 left-10 w-64 h-64 bg-[#1A5296]/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute inset-0 z-0 opacity-[0.03] steel-brushed" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">

        {/* Section Header */}
        <div className="text-center mb-16 lg:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 bg-[#2563EB]/10 rounded-full border border-[#2563EB]/35 text-xs font-mono font-bold text-[#B8C4D0] tracking-wider uppercase mb-4"
          >
            <span>Opiniões Validadas</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-['Helvetica_Neue',_sans-serif] font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-none uppercase"
          >
            Quem deposita confiança em <span className="text-[#2563EB]">nossas estruturas</span>
          </motion.h2>
          <p className="font-sans text-[#B8C4D0]/70 text-sm sm:text-base max-w-2xl mx-auto mt-4 leading-relaxed">
            Consulte o feedback autêntico de diretores de engenharia e coordenadores de infraestrutura de grandes multinacionais.
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-[#1A5296] to-[#3B82F6] mx-auto mt-6 rounded-full" />
        </div>

        {/* Testimonial Slider — sem foto/avatar */}
        <div className="relative max-w-4xl mx-auto">
          <div className="relative min-h-[320px] sm:min-h-[260px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5 }}
                className="glass-panel p-8 sm:p-12 rounded-2xl border border-[#1A5296]/25 shadow-2xl"
              >
                {/* Stars + Quote decoration */}
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-1">
                    {Array.from({ length: currentTestimonial.rating }).map((_, i) => (
                      <IconRenderer key={i} name="Star" size={15} className="fill-[#F59E0B] text-[#F59E0B]" />
                    ))}
                  </div>
                  <span className="font-serif text-5xl text-[#1A5296]/30 leading-none">"</span>
                </div>

                {/* Feedback text */}
                <p className="font-sans text-sm sm:text-base text-[#B8C4D0] leading-relaxed italic mb-8">
                  {currentTestimonial.feedback}
                </p>

                {/* Corporate identity — SEM foto/avatar */}
                <div className="pt-6 border-t border-[#1A5296]/15">
                  {/* Linha decorativa */}
                  <div className="w-8 h-0.5 bg-[#2563EB] mb-4" />
                  <h4 className="font-display font-bold text-base sm:text-lg text-white">
                    {currentTestimonial.name}
                  </h4>
                  <p className="text-xs text-[#1A5296] font-semibold uppercase tracking-wider mt-1">
                    {currentTestimonial.role}
                  </p>
                  <p className="text-xs text-[#B8C4D0]/55 font-medium mt-0.5 tracking-wide">
                    {currentTestimonial.company}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8 max-w-xs mx-auto">
            <button
              onClick={handlePrev}
              id="testimonial-prev-button"
              className="p-3 bg-[#071B35] border border-[#1A5296]/20 hover:border-[#1A5296] rounded-lg text-[#B8C4D0] hover:text-white transition-all shadow-md active:scale-95"
              aria-label="Depoimento anterior"
            >
              <IconRenderer name="ChevronLeft" size={20} />
            </button>

            <div className="flex items-center gap-2">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    stopAutoRotation();
                    setCurrentIndex(i);
                    startAutoRotation();
                  }}
                  id={`testimonial-dot-${i}`}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    currentIndex === i ? 'bg-[#2563EB] w-6' : 'bg-[#1A5296]/20 hover:bg-[#1A5296]/45 w-2.5'
                  }`}
                  aria-label={`Ir para depoimento ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              id="testimonial-next-button"
              className="p-3 bg-[#071B35] border border-[#1A5296]/20 hover:border-[#1A5296] rounded-lg text-[#B8C4D0] hover:text-white transition-all shadow-md active:scale-95"
              aria-label="Próximo depoimento"
            >
              <IconRenderer name="ChevronRight" size={20} />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
