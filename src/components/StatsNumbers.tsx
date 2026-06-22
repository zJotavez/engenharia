import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { STATS } from '../data.ts';
import { StatItem } from '../types.ts';
import { IconRenderer } from './IconRenderer.tsx';

interface StatsNumbersProps {
  stats?: StatItem[];
}

// Animated Count component powered by Intersection Observer
export const ActiveCounter: React.FC<{ value: number; suffix: string }> = ({ value, suffix }) => {
  const [count, setCount] = useState<number>(0);
  const elementRef = useRef<HTMLDivElement | null>(null);
  const hasAnimated = useRef<boolean>(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          let startTime: number | null = null;
          const duration = 1600; // 1.6 seconds animation

          const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            
            // Easing function outQuad
            const easeProgress = progress * (2 - progress);
            const currentCount = Math.floor(easeProgress * value);
            
            setCount(currentCount);

            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              setCount(value);
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) observer.observe(elementRef.current);
    return () => {
      if (elementRef.current) observer.unobserve(elementRefRef.current || elementRef.current);
    };
  }, [value]);

  const elementRefRef = elementRef; // safe tracking

  return (
    <div ref={elementRef} className="font-sans font-black text-4xl sm:text-5xl lg:text-5.5xl text-white tracking-tight leading-none uppercase">
      {count}
      <span className="text-[#1D5A9E] text-3xl sm:text-4xl lg:text-5.5xl ml-1">{suffix}</span>
    </div>
  );
};

export const StatsNumbers: React.FC<StatsNumbersProps> = ({ stats = STATS }) => {
  return (
    <section className="relative py-20 bg-[#071B35] overflow-hidden">
      {/* Heavy mesh grid background with custom radial center lighting */}
      <div className="absolute inset-0 z-0 opacity-[0.05] steel-brushed" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#030d1a] via-transparent to-[#030d1a] z-0" />
      
      {/* Industrial centered lighting background ring */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#1D5A9E]/10 rounded-full blur-[140px] pointer-events-none z-0" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 text-center">
          {stats.map((stat, idx) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: idx * 0.1 }}
              className="relative p-6 px-4 rounded-xl bg-white/5 border border-[#1D5A9E]/15 hover:border-[#1D5A9E]/40 transition-colors duration-300"
            >
              {/* Vertical alignment */}
              <div className="space-y-4">
                
                {/* Reactive Counter */}
                <ActiveCounter value={stat.value} suffix={stat.suffix} />
                
                {/* Underline metallic accent */}
                <div className="w-10 h-0.5 bg-[#1D5A9E] mx-auto rounded-full" />

                {/* Typography labels */}
                <div className="space-y-1">
                  <h4 className="font-sans font-bold text-xs sm:text-sm text-white uppercase tracking-wider leading-snug">
                    {stat.label}
                  </h4>
                  <p className="font-sans text-[10px] sm:text-xs text-[#C4CCD4]/50 tracking-wide">
                    {stat.subLabel}
                  </p>
                </div>
              </div>

              {/* Top ambient glowing dot */}
              <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-8 h-[2px] bg-[#1D5A9E]/50 blur-[1px]" />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
