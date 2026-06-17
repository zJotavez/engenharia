import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PROJECTS } from '../data.ts';
import { Project } from '../types.ts';
import { IconRenderer } from './IconRenderer.tsx';

interface PortfolioProps {
  onSelectProject: (serviceTitle: string) => void;
}

// Lightbox component
const Lightbox: React.FC<{ src: string; alt: string; onClose: () => void }> = ({ src, alt, onClose }) => (
  <AnimatePresence>
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/95 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.92, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.92, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 280, damping: 28 }}
        className="relative max-w-5xl w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute -top-10 right-0 p-2 text-white/60 hover:text-white transition-colors flex items-center gap-2 text-xs font-mono uppercase tracking-widest"
        >
          <IconRenderer name="X" size={16} />
          <span>Fechar</span>
        </button>
        <img
          src={src}
          alt={alt}
          className="w-full max-h-[80vh] object-contain rounded-lg shadow-2xl"
        />
      </motion.div>
    </motion.div>
  </AnimatePresence>
);

export const Portfolio: React.FC<PortfolioProps> = ({ onSelectProject }) => {
  const [activeFilter, setActiveFilter] = useState<string>('Todos');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [lightboxImg, setLightboxImg] = useState<{ src: string; alt: string } | null>(null);

  const filters = ['Todos', 'Estruturas Metálicas', 'Naval', 'Tubagem', 'Civil', 'Serralheria'];

  const filteredProjects = activeFilter === 'Todos'
    ? PROJECTS
    : PROJECTS.filter((project) => project.category === activeFilter);

  const handleConsultProject = (p: Project) => {
    setSelectedProject(null);
    onSelectProject(`Projeto similar a: ${p.title} (${p.category})`);
  };

  // Distribui alturas para criar efeito masonry
  const getMasonryHeight = (index: number): string => {
    const heights = ['h-[380px]', 'h-[480px]', 'h-[320px]', 'h-[460px]', 'h-[350px]', 'h-[420px]'];
    return heights[index % heights.length];
  };

  return (
    <section id="portfolio" className="relative py-20 lg:py-32 bg-[#071B35] overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-[0.03] steel-brushed" />
      <div className="absolute right-0 bottom-1/4 w-[500px] h-[500px] bg-[#1A5296]/5 rounded-full blur-[140px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">

        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 bg-[#2563EB]/10 rounded-full border border-[#2563EB]/35 text-xs font-mono font-bold text-[#B8C4D0] tracking-wider uppercase mb-4"
          >
            <span>Obras Entregues</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-['Helvetica_Neue',_sans-serif] font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-none uppercase"
          >
            Portfólio de <span className="text-[#2563EB]">Grandes Contratos</span>
          </motion.h2>
          <div className="w-16 h-1 bg-gradient-to-r from-[#1A5296] to-[#3B82F6] mx-auto mt-6 rounded-full" />
        </div>

        {/* Filter Toolbar */}
        <div className="flex flex-wrap justify-center items-center gap-2 mb-12">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              id={`portfolio-filter-${filter.toLowerCase().replace(/\s+/g, '-')}`}
              className={`px-4 py-2.5 rounded-md font-sans font-bold text-xs tracking-wider uppercase border transition-all duration-300 ${
                activeFilter === filter
                  ? 'bg-[#2563EB] border-[#2563EB] text-white shadow-lg shadow-blue-950/45'
                  : 'bg-[#0D3561]/10 border-white/10 text-[#B8C4D0] hover:border-white/25 hover:text-white'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* ── Masonry Gallery ── */}
        <motion.div layout className="columns-1 sm:columns-2 lg:columns-3 gap-5 space-y-5">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className={`group relative ${getMasonryHeight(index)} rounded-xl overflow-hidden border border-[#B8C4D0]/10 hover:border-[#1A5296]/45 transition-all shadow-xl bg-[#050f1e] cursor-pointer break-inside-avoid mb-5`}
                onClick={() => setSelectedProject(project)}
              >
                {/* Image with zoom on hover */}
                <img
                  src={project.gallery[0]}
                  alt={project.title}
                  className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-[1.07] filter brightness-[0.5] group-hover:brightness-[0.35]"
                  referrerPolicy="no-referrer"
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#050f1e] via-[#050f1e]/30 to-transparent" />

                {/* Hover overlay zoom icon */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                  <div className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center">
                    <IconRenderer name="ZoomIn" size={22} className="text-white" />
                  </div>
                </div>

                {/* Badges */}
                <div className="absolute top-4 inset-x-4 flex items-center justify-between z-10">
                  <span className="px-2.5 py-1 text-[10px] font-mono font-bold text-white uppercase tracking-widest bg-[#1A5296]/85 backdrop-blur-md rounded border border-white/20">
                    {project.category}
                  </span>
                  <span className="px-2.5 py-1 text-[10px] font-mono font-bold text-[#F59E0B] tracking-wider uppercase bg-black/80 backdrop-blur-md rounded border border-[#F59E0B]/30">
                    {project.keySpec}
                  </span>
                </div>

                {/* Title + CTA */}
                <div className="absolute inset-x-0 bottom-0 p-5 flex flex-col justify-end z-10">
                  <span className="text-[10px] font-mono text-[#B8C4D0]/55 uppercase tracking-widest block mb-1">
                    {project.client}
                  </span>
                  <h3 className="font-display font-extrabold text-base sm:text-lg text-white group-hover:text-[#3B82F6] transition-colors leading-tight mb-3">
                    {project.title}
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs text-[#1A5296] font-semibold tracking-wider uppercase group-hover:text-white transition-colors">
                    <span>Ver Ficha Técnica</span>
                    <IconRenderer name="ArrowRight" size={12} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* ── Modal Project Details ── */}
        <AnimatePresence>
          {selectedProject && (
            <div className="fixed inset-0 z-55 flex items-center justify-center px-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedProject(null)}
                className="absolute inset-0 bg-[#050f1e]/92 backdrop-blur-sm"
              />
              <motion.div
                initial={{ scale: 0.95, opacity: 0, y: 30 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 30 }}
                className="relative w-full max-w-4xl bg-[#071324] border border-[#1A5296]/30 shadow-2xl rounded-xl z-20 overflow-hidden"
              >
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  {/* Image + lightbox trigger */}
                  <div className="relative h-64 sm:h-80 lg:h-full min-h-[300px] group cursor-zoom-in">
                    <img
                      src={selectedProject.gallery[0]}
                      alt={selectedProject.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                      onClick={() => setLightboxImg({ src: selectedProject.gallery[0], alt: selectedProject.title })}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-[#071324]/80 via-transparent to-transparent" />

                    {/* Lightbox icon */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center">
                        <IconRenderer name="Maximize2" size={18} className="text-white" />
                      </div>
                    </div>

                    <div className="absolute top-4 left-4 p-3 bg-black/60 backdrop-blur-md rounded border border-white/10 text-left">
                      <span className="text-[9px] font-mono text-[#B8C4D0]/80 block uppercase tracking-widest leading-none">Cliente</span>
                      <span className="text-xs font-sans text-white font-bold block mt-1">{selectedProject.client}</span>
                    </div>
                    <div className="absolute bottom-4 left-4 p-3 bg-[#1A5296]/90 backdrop-blur-md rounded border border-white/20 text-left">
                      <span className="text-[9px] font-mono text-white/80 block uppercase tracking-widest leading-none">MÉTRICA CHAVE</span>
                      <span className="text-sm font-display text-white font-extrabold block mt-0.5">{selectedProject.keySpec}</span>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="p-6 sm:p-8 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-center mb-6">
                        <span className="px-2.5 py-0.5 text-[10px] font-mono font-bold text-[#F59E0B] border border-[#F59E0B]/20 bg-[#F59E0B]/10 rounded uppercase tracking-wider">
                          Construção Homologada
                        </span>
                        <button
                          onClick={() => setSelectedProject(null)}
                          className="p-1.5 rounded-full bg-white/5 text-[#B8C4D0] hover:text-white hover:bg-white/10 transition-colors"
                        >
                          <IconRenderer name="X" size={18} />
                        </button>
                      </div>

                      <h3 className="font-display font-extrabold text-xl sm:text-2xl text-white mb-2 leading-snug">
                        {selectedProject.title}
                      </h3>
                      <div className="w-12 h-1 bg-[#2563EB] rounded-full mb-6" />

                      <div className="grid grid-cols-2 gap-4 pb-6 border-b border-[#1A5296]/15 mb-6 text-left">
                        <div>
                          <span className="block font-mono text-[10px] text-[#B8C4D0]/50 uppercase">Setor / Serviço</span>
                          <span className="font-sans text-xs sm:text-sm text-white font-medium block mt-0.5">{selectedProject.category}</span>
                        </div>
                        <div>
                          <span className="block font-mono text-[10px] text-[#B8C4D0]/50 uppercase">Ano</span>
                          <span className="font-sans text-xs sm:text-sm text-white font-medium block mt-0.5">{selectedProject.year}</span>
                        </div>
                        <div>
                          <span className="block font-mono text-[10px] text-[#B8C4D0]/50 uppercase">Localização</span>
                          <span className="font-sans text-xs sm:text-sm text-white font-medium block mt-0.5">{selectedProject.location}</span>
                        </div>
                        <div>
                          <span className="block font-mono text-[10px] text-[#B8C4D0]/50 uppercase">Escopo</span>
                          <span className="font-sans text-xs sm:text-sm text-white font-medium block mt-0.5 leading-snug">{selectedProject.service}</span>
                        </div>
                      </div>

                      <div className="space-y-3 text-left">
                        <h4 className="font-display font-bold text-xs uppercase tracking-widest text-[#B8C4D0]">Relatório de Engenharia</h4>
                        <p className="font-sans text-xs sm:text-sm text-[#B8C4D0] leading-relaxed">{selectedProject.description}</p>
                      </div>
                    </div>

                    <div className="pt-8 mt-6 border-t border-[#1A5296]/15 flex flex-col sm:flex-row items-center gap-4">
                      <button
                        onClick={() => handleConsultProject(selectedProject)}
                        id="modal-project-apply-quote"
                        className="w-full sm:w-auto px-5 py-3 bg-[#1A5296] hover:bg-[#2563EB] text-white font-sans font-bold text-xs tracking-wider rounded-md transition-all uppercase flex items-center justify-center gap-2"
                      >
                        <IconRenderer name="Speech" size={13} />
                        <span>Solicitar Projeto Similar</span>
                      </button>
                      <button
                        onClick={() => setSelectedProject(null)}
                        className="w-full sm:w-auto px-5 py-3 bg-transparent hover:bg-white/5 text-[#B8C4D0] font-sans font-semibold text-xs rounded-md transition-all border border-[#B8C4D0]/20 hover:border-[#B8C4D0]/40 text-center uppercase"
                      >
                        Fechar Ficha
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Lightbox */}
        {lightboxImg && (
          <Lightbox
            src={lightboxImg.src}
            alt={lightboxImg.alt}
            onClose={() => setLightboxImg(null)}
          />
        )}
      </div>
    </section>
  );
};
