import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { IconRenderer } from './IconRenderer.tsx';

import { GeneralSettings } from '../types.ts';

interface ContactProps {
  settings: GeneralSettings;
  selectedServicePreset: string;
}

export const Contact: React.FC<ContactProps> = ({ settings, selectedServicePreset }) => {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    phone: '',
    email: '',
    service: '',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Sync preset selection when parent triggers a select
  useEffect(() => {
    if (selectedServicePreset) {
      setFormData((prev) => ({ ...prev, service: selectedServicePreset }));
    }
  }, [selectedServicePreset]);

  // Handle Input Changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Clear validation error when editing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  // Perform Validation
  const validate = () => {
    const tempErrors: Record<string, string> = {};
    if (!formData.name.trim()) tempErrors.name = 'Nome completo é obrigatório';
    if (!formData.company.trim()) tempErrors.company = 'Nome da empresa é obrigatório';
    
    // Simple phone match
    if (!formData.phone.trim()) {
      tempErrors.phone = 'Telefone para contato é obrigatório';
    } else if (formData.phone.replace(/\D/g, '').length < 10) {
      tempErrors.phone = 'Insira um telefone corporativo válido completo';
    }

    // Simple email match
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      tempErrors.email = 'E-mail para contato é obrigatório';
    } else if (!emailRegex.test(formData.email)) {
      tempErrors.email = 'Insira um endereço de e-mail corporativo válido';
    }

    if (!formData.service) tempErrors.service = 'Selecione uma categoria de serviço';
    if (!formData.message.trim() || formData.message.length < 10) {
      tempErrors.message = 'Descreva seu projeto com pelo menos 10 caracteres';
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  // Handle Form Submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    // Simulate sending data or forwarding parameters
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      
      // Auto close success modal after 5 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
        // Clear inputs after success
        setFormData({
          name: '',
          company: '',
          phone: '',
          email: '',
          service: '',
          message: '',
        });
      }, 5000);
    }, 1500);
  };

  // Pre-configured links for direct integration
  const whatsappUrl = `https://api.whatsapp.com/send?phone=${settings.phoneRaw}&text=Olá!%20Me%20chamo%20${encodeURIComponent(formData.name || 'Cliente')}%20da%20empresa%20${encodeURIComponent(formData.company || 'Investidor')}.%20Gostaria%20de%20solicitar%20um%20orçamento%20especificamente%20para%20${encodeURIComponent(formData.service || 'Projetos%20de%20Engenharia')}.%20Mensagem:%20${encodeURIComponent(formData.message || 'Gostaria%20de%20falar%20com%20nossos%20engenheiros.')}`;
  const mailtoUrl = `mailto:${settings.email}?subject=Solicitação%20de%20Orçamento%20-%20${encodeURIComponent(formData.company)}&body=Nome:%20${encodeURIComponent(formData.name)}%0D%0AEmpresa:%20${encodeURIComponent(formData.company)}%0D%0ATelefone:%20${encodeURIComponent(formData.phone)}%0D%0AServiço:%20${encodeURIComponent(formData.service)}%0D%0AMensagem:%20${encodeURIComponent(formData.message)}`;

  return (
    <section id="contato" className="relative py-20 lg:py-32 bg-[#071B35] overflow-hidden">
      {/* Visual background flares */}
      <div className="absolute top-1/2 right-1/4 w-80 h-80 bg-[#1D5A9E]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute inset-0 z-0 opacity-[0.03] steel-brushed" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center mb-16 lg:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 bg-[#1D5A9E]/10 rounded-full border border-[#1D5A9E]/35 text-xs font-mono font-bold text-[#C4CCD4] tracking-wider uppercase mb-4"
          >
            <span>Contato & Negociações</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-['Helvetica_Neue',_sans-serif] font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-none uppercase"
          >
            Vamos construir seu próximo <span className="text-[#1D5A9E]">marco industrial</span>
          </motion.h2>
          <div className="w-16 h-1 bg-[#1D5A9E] mx-auto mt-6 rounded-full" />
        </div>

        {/* Divided 2 Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Direct Corporate Information */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 space-y-8 text-left"
          >
            <div className="space-y-4">
              <h3 className="font-display font-extrabold text-2xl text-white">
                Metaloworld & Construções Industriais Ltda.
              </h3>
              <p className="font-sans text-brand-silver/80 text-sm sm:text-base leading-relaxed">
                Nossa diretoria e equipe comercial técnica estão preparadas para realizar reuniões presenciais ou videoconferências ágeis de escopo.
              </p>
            </div>

            {/* List links */}
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-brand-metallic/10 border border-brand-metallic/20 flex items-center justify-center text-brand-metallic shrink-0">
                  <IconRenderer name="MapPin" size={18} />
                </div>
                <div className="text-left space-y-0.5">
                  <span className="block font-mono text-[10px] text-brand-silver/50 uppercase tracking-wider">Complexo Industrial / Matriz</span>
                  <p className="font-sans text-sm text-white">
                    {settings.address}
                  </p>
                  <p className="font-sans text-xs text-brand-silver/60">
                    {settings.addressCity}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-brand-metallic/10 border border-brand-metallic/20 flex items-center justify-center text-brand-metallic shrink-0">
                  <IconRenderer name="Mail" size={18} />
                </div>
                <div className="text-left space-y-0.5">
                  <span className="block font-mono text-[10px] text-brand-silver/50 uppercase tracking-wider">E-mail de Projetos</span>
                  <a href={`mailto:${settings.email}`} className="font-mono text-sm text-brand-silver hover:text-white block transition-colors">
                    {settings.email}
                  </a>
                  {settings.emailComercial && (
                    <a href={`mailto:${settings.emailComercial}`} className="font-mono text-xs text-brand-silver/60 hover:text-white block transition-colors">
                      {settings.emailComercial}
                    </a>
                  )}
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-brand-metallic/10 border border-brand-metallic/20 flex items-center justify-center text-brand-metallic shrink-0">
                  <IconRenderer name="Phone" size={18} />
                </div>
                <div className="text-left space-y-0.5">
                  <span className="block font-mono text-[10px] text-brand-silver/50 uppercase tracking-wider">Telefone & WhatsApp</span>
                  <a href={`tel:${settings.phoneRaw}`} className="font-sans text-sm text-white font-medium block hover:text-brand-metallic transition-colors">
                    {settings.phone}
                  </a>
                  <p className="font-sans text-xs text-brand-silver/60">
                    Segunda a Sexta — 07h30 às 17h30
                  </p>
                </div>
              </div>
            </div>

            {/* Simulated Live Google Maps Area */}
            <div className="p-4 rounded-xl glass-panel border border-brand-metallic/20 relative overflow-hidden group">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <IconRenderer name="Building" size={16} className="text-brand-metallic" />
                  <span className="font-sans text-xs text-white font-bold">Unidade Sede & Pátio Fabril</span>
                </div>
                <span className="text-[10px] font-mono text-brand-silver/50 bg-white/5 px-2 py-0.5 rounded uppercase">Pátio 12.000m²</span>
              </div>
              
              {/* Map Illustration wrapper representation */}
              <div className="h-44 rounded-lg bg-[#0e3c6f]/20 border border-brand-metallic/15 overflow-hidden flex items-center justify-center relative">
                {/* Visual map nodes layout */}
                <div className="absolute inset-0 opacity-[0.25] pointer-events-none" style={{ backgroundImage: 'radial-gradient(rgba(29, 90, 158, 0.4) 1px, transparent 1px)', backgroundSize: '16px 16px' }} />
                
                {/* Visual target center node */}
                <div className="flex flex-col items-center justify-center gap-1.5 z-10">
                  <motion.div
                    animate={{ scale: [1, 1.15, 1] }}
                    transition={{ repeat: Infinity, duration: 2.5 }}
                    className="w-8 h-8 rounded-full bg-brand-metallic/35 flex items-center justify-center border border-brand-metallic"
                  >
                    <div className="w-3.5 h-3.5 rounded-full bg-brand-metallic border border-white" />
                  </motion.div>
                  <span className="font-mono text-[9px] text-white bg-brand-deep border border-brand-silver/20 px-2 py-0.5 rounded leading-none font-bold uppercase tracking-wider">
                    METALOWORLD Sede
                  </span>
                </div>
              </div>
            </div>

          </motion.div>

          {/* Right Column: Interactive Lead Capture Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 bg-brand-deep border border-brand-silver/10 hover:border-brand-metallic/35 transition-all p-6 sm:p-8 rounded-2xl shadow-xl hover:shadow-brand-metallic/5"
          >
            <h3 className="font-display font-bold text-lg sm:text-xl text-white mb-6 text-left border-b border-brand-metallic/10 pb-4">
              Formulário Técnico de Sondagem de Projetos
            </h3>

            <form onSubmit={handleSubmit} id="corporate-contact-form" className="space-y-5 text-left">
              
              {/* Double grid rows */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="name" className="block font-sans text-xs font-bold text-brand-silver uppercase tracking-wider mb-2">
                    Nome Completo *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full bg-[#081729]/80 border py-3 px-4 rounded-lg text-sm text-white font-sans placeholder-brand-silver/20 focus:outline-none focus:border-brand-metallic focus:bg-[#081729] focus:ring-1 focus:ring-brand-metallic transition-all ${
                      errors.name ? 'border-red-500' : 'border-brand-metallic/20'
                    }`}
                    placeholder="Ex: Dr. Leandro Albuquerque"
                  />
                  {errors.name && <p className="text-[10px] text-red-500 font-medium mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label htmlFor="company" className="block font-sans text-xs font-bold text-brand-silver uppercase tracking-wider mb-2">
                    Nome da Empresa *
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className={`w-full bg-[#081729]/80 border py-3 px-4 rounded-lg text-sm text-white font-sans placeholder-brand-silver/20 focus:outline-none focus:border-brand-metallic focus:bg-[#081729] focus:ring-1 focus:ring-brand-metallic transition-all ${
                      errors.company ? 'border-red-500' : 'border-brand-metallic/20'
                    }`}
                    placeholder="Ex: Petrobras S.A."
                  />
                  {errors.company && <p className="text-[10px] text-red-500 font-medium mt-1">{errors.company}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="phone" className="block font-sans text-xs font-bold text-brand-silver uppercase tracking-wider mb-2">
                    Telefone Corporativo *
                  </label>
                  <input
                    type="text"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`w-full bg-[#081729]/80 border py-3 px-4 rounded-lg text-sm text-white font-sans placeholder-brand-silver/20 focus:outline-none focus:border-brand-metallic focus:bg-[#081729] focus:ring-1 focus:ring-brand-metallic transition-all ${
                      errors.phone ? 'border-red-500' : 'border-brand-metallic/20'
                    }`}
                    placeholder="Ex: (85) 98888-7777"
                  />
                  {errors.phone && <p className="text-[10px] text-red-500 font-medium mt-1">{errors.phone}</p>}
                </div>

                <div>
                  <label htmlFor="email" className="block font-sans text-xs font-bold text-brand-silver uppercase tracking-wider mb-2">
                    E-mail Corporativo *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full bg-[#081729]/80 border py-3 px-4 rounded-lg text-sm text-white font-sans placeholder-brand-silver/20 focus:outline-none focus:border-brand-metallic focus:bg-[#081729] focus:ring-1 focus:ring-brand-metallic transition-all ${
                      errors.email ? 'border-red-500' : 'border-brand-metallic/20'
                    }`}
                    placeholder="Ex: diretor@petrobras.com"
                  />
                  {errors.email && <p className="text-[10px] text-red-500 font-medium mt-1">{errors.email}</p>}
                </div>
              </div>

              {/* Category dropdown preset selector */}
              <div>
                <label htmlFor="service" className="block font-sans text-xs font-bold text-brand-silver uppercase tracking-wider mb-2">
                  Serviço / Necessidade *
                </label>
                <div className="relative">
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className={`w-full bg-[#081729] appearance-none border py-3 px-4 rounded-lg text-sm text-white font-sans focus:outline-none focus:border-brand-metallic focus:ring-1 focus:ring-brand-metallic transition-all ${
                      errors.service ? 'border-red-500' : 'border-brand-metallic/20'
                    }`}
                  >
                    <option value="" disabled className="text-brand-silver/20">-- Selecione a categoria principal --</option>
                    <option value="Estruturas Metálicas de Alta Performance">Estruturas Metálicas de Grande Porte</option>
                    <option value="Construção e Reparação Naval">Construção & Reparação Naval</option>
                    <option value="Tubagem Industrial de Processo">Tubagem Industrial</option>
                    <option value="Serralheria Especializada Ferro e Inox">Serralheria Industrial Ferro & Inox</option>
                    <option value="Serralheria para Engenharia Civil">Serralheria Civil (Corporativa)</option>
                    <option value="Construção Civil Industrial Pesada">Construção Civil Pesada / Bases</option>
                    <option value="EPC Global / Soluções Chave na Mão">EPC Global / Turn-Key</option>
                  </select>
                  {/* Select arrow pointer */}
                  <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-brand-metallic">
                    ↓
                  </div>
                </div>
                {errors.service && <p className="text-[10px] text-red-500 font-medium mt-1">{errors.service}</p>}
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block font-sans text-xs font-bold text-brand-silver uppercase tracking-wider mb-2">
                  Especificações / Descrição do Projeto *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className={`w-full bg-[#081729]/80 border py-3 px-4 rounded-lg text-sm text-white font-sans placeholder-brand-silver/20 focus:outline-none focus:border-brand-metallic focus:bg-[#081729] focus:ring-1 focus:ring-brand-metallic transition-all ${
                    errors.message ? 'border-red-500' : 'border-brand-metallic/20'
                  }`}
                  placeholder="Descreva detalhes: metragem quadrada total, toneladas de aço estimadas, localização, cronograma de canteiro planejado..."
                />
                {errors.message && <p className="text-[10px] text-red-500 font-medium mt-1">{errors.message}</p>}
              </div>

              {/* Dual forward integration row */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-between items-center text-center">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  id="contact-submit-button"
                  className="w-full sm:w-auto px-8 py-3.5 bg-brand-metallic hover:bg-brand-metallic/90 text-white font-sans font-bold text-xs tracking-wider rounded-md transition-all uppercase flex items-center justify-center gap-2 shadow-md hover:shadow-brand-metallic/20 disabled:opacity-50 min-h-[46px]"
                >
                  {isSubmitting ? (
                    <span>Validando e Enviando...</span>
                  ) : (
                    <>
                      <IconRenderer name="Send" size={13} />
                      <span>ENVIAR FORMULÁRIO TÉCNICO</span>
                    </>
                  )}
                </button>

                {/* Direct forward buttons once user starts entering parameters */}
                <div className="flex flex-wrap items-center justify-center gap-2.5">
                  <span className="text-[10px] font-mono text-brand-silver/50 uppercase">Ou envie diretamente p/</span>
                  
                  <a
                    href={formData.service && formData.name ? whatsappUrl : 'https://api.whatsapp.com/send?phone=5585999990000'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 px-3 rounded bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#25D366] border border-[#25D366]/30 text-xs font-mono font-bold flex items-center gap-1.5 transition-all"
                  >
                    WhatsApp
                    <IconRenderer name="ExternalLink" size={10} />
                  </a>

                  <a
                    href={formData.company && formData.name ? mailtoUrl : 'mailto:contato@mvconstrucoes.com'}
                    className="p-2 px-3 rounded bg-white/5 hover:bg-white/10 text-brand-silver hover:text-white border border-white/10 text-xs font-mono font-bold flex items-center gap-1.5 transition-all"
                  >
                    E-mail
                    <IconRenderer name="ExternalLink" size={10} />
                  </a>
                </div>
              </div>

            </form>
          </motion.div>
        </div>

        {/* Real-time Validation / Successful modal feedback drawer */}
        <AnimatePresence>
          {submitSuccess && (
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="fixed bottom-6 right-6 z-55 max-w-sm w-full bg-[#081a31] border-2 border-brand-metallic shadow-2.5xl p-6 rounded-xl flex items-start gap-4"
            >
              <div className="w-10 h-10 rounded-full bg-brand-metallic/20 flex items-center justify-center text-brand-metallic shrink-0">
                <IconRenderer name="Check" size={20} className="text-white" />
              </div>
              <div className="text-left space-y-1">
                <span className="font-mono text-[9px] text-brand-metallic font-bold uppercase tracking-wider">MV_MENSAGEM_OK</span>
                <h4 className="font-display font-bold text-sm text-white">
                  Formulário Recebido com Sucesso!
                </h4>
                <p className="font-sans text-xs text-brand-silver leading-normal">
                  Nossos engenheiros técnicos de custos realizarão a triagem das especificações inseridas e entrarão em contato em até 4 horas úteis.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};
