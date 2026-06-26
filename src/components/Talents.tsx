import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { IconRenderer } from './IconRenderer.tsx';
import { GeneralSettings } from '../types.ts';

interface TalentsProps {
  settings: GeneralSettings;
}

export const Talents: React.FC<TalentsProps> = ({ settings }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    field: '',
    experience: '',
  });

  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [isHuman, setIsHuman] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type !== 'application/pdf') {
        setErrors((prev) => ({ ...prev, resume: 'Apenas arquivos PDF são permitidos.' }));
        setResumeFile(null);
      } else if (file.size > 5 * 1024 * 1024) {
        setErrors((prev) => ({ ...prev, resume: 'O arquivo deve ter no máximo 5MB.' }));
        setResumeFile(null);
      } else {
        setResumeFile(file);
        setErrors((prev) => ({ ...prev, resume: '' }));
      }
    }
  };

  const validate = () => {
    const tempErrors: Record<string, string> = {};
    if (!formData.name.trim()) tempErrors.name = 'O nome completo é obrigatório';
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      tempErrors.email = 'O e-mail é obrigatório';
    } else if (!emailRegex.test(formData.email)) {
      tempErrors.email = 'Insira um e-mail válido';
    }

    if (!formData.phone.trim()) tempErrors.phone = 'O telefone / WhatsApp é obrigatório';
    if (!formData.field) tempErrors.field = 'Selecione uma área de atuação';
    if (!formData.experience.trim()) tempErrors.experience = 'Por favor, descreva brevemente o seu perfil';
    if (!resumeFile) tempErrors.resume = 'O envio do currículo em PDF é obrigatório';
    if (!isHuman) tempErrors.isHuman = 'Por favor, confirme a declaração acima';

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    // Envio direto via Mailto e Feedback Instantâneo
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);

      const subject = `[Candidatura] Banco de Talentos - ${formData.name} (${formData.field})`;
      const body = `Olá equipa de Recrutamento da METALOWORLD,

Gostaria de registar o meu currículo no vosso Banco de Talentos para futuras oportunidades. Seguem abaixo os meus detalhes profissionais:

--------------------------------------------------
DADOS DO PROFISSIONAL
--------------------------------------------------
Nome Completo: ${formData.name}
E-mail de Contacto: ${formData.email}
Telefone / WhatsApp: ${formData.phone}
Área de Atuação Principal: ${formData.field}

--------------------------------------------------
RESUMO DA EXPERIÊNCIA E CERTIFICAÇÕES
--------------------------------------------------
${formData.experience}

* Anexei o meu currículo em formato PDF ("${resumeFile?.name || 'Curriculo.pdf'}") a este e-mail.
--------------------------------------------------

Fico à inteira disposição para prestar esclarecimentos adicionais e participar de futuros processos de seleção.

Atenciosamente,
${formData.name}`;

      const mailtoUrl = `mailto:${settings.email || 'suporte@metaloworld.pt'}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      
      // Abre o cliente de e-mail padrão do usuário de forma direta e sem atrasos
      window.location.href = mailtoUrl;

      // Limpa os campos após o envio
      setFormData({
        name: '',
        email: '',
        phone: '',
        field: '',
        experience: '',
      });
      setResumeFile(null);
      setIsHuman(false);

      // Fecha o modal de sucesso após alguns segundos
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 7000);
    }, 1000);
  };

  return (
    <section id="talentos" className="relative py-20 lg:py-32 bg-[#061830] overflow-hidden scroll-mt-20 lg:scroll-mt-24">
      {/* Background flares & visual aesthetics */}
      <div className="absolute inset-0 z-0 opacity-[0.02] steel-brushed pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-[#2563EB]/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="relative z-10 max-w-3xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 bg-[#2563EB]/10 rounded-full border border-[#2563EB]/30 text-xs font-mono font-bold text-[#B8C4D0] tracking-wider uppercase mb-4"
          >
            <span>Trabalhe Conosco</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-['Helvetica_Neue',_sans-serif] font-extrabold text-3xl sm:text-4xl text-white tracking-tight uppercase"
          >
            Banco de <span className="text-[#2563EB]">Talentos</span>
          </motion.h2>
          
          <p className="font-sans text-[#B8C4D0]/70 text-sm sm:text-base max-w-lg mx-auto mt-3 leading-relaxed">
            Cadastre o seu perfil profissional de forma rápida e faça parte da nossa rede de especialistas aptos para atuar na Europa.
          </p>
          <div className="w-12 h-1 bg-[#2563EB] mx-auto mt-4 rounded-full" />
        </div>

        {/* Talent Registration Form Card with Glassmorphism */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative overflow-hidden bg-gradient-to-br from-[#081a33]/90 to-[#040e1b]/95 border border-white/10 p-6 sm:p-10 rounded-2xl shadow-[0_20px_50px_rgba(2,10,23,0.9)] backdrop-blur-md text-left"
        >
          {/* Subtle decoration lines inside the card */}
          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#2563EB]/50 to-transparent" />
          
          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* Grid 2 Columns for fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Nome Completo */}
              <div>
                <label htmlFor="talent-name" className="block font-sans text-[11px] font-bold text-[#B8C4D0]/90 uppercase tracking-wider mb-2">
                  Nome Completo *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#2563EB]/70">
                    <IconRenderer name="Users" size={15} />
                  </div>
                  <input
                    type="text"
                    id="talent-name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full bg-[#030a14]/80 border pl-10 pr-4 py-2.5 rounded-lg text-sm text-white font-sans placeholder-white/20 focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/15 transition-all ${
                      errors.name ? 'border-red-500/80 focus:ring-red-500/10' : 'border-white/10'
                    }`}
                    placeholder="O seu nome completo"
                  />
                </div>
                {errors.name && <p className="text-[10px] text-red-400 font-medium mt-1 pl-1">{errors.name}</p>}
              </div>

              {/* Área de Atuação Dropdown */}
              <div>
                <label htmlFor="field" className="block font-sans text-[11px] font-bold text-[#B8C4D0]/90 uppercase tracking-wider mb-2">
                  Área de Atuação *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#2563EB]/70">
                    <IconRenderer name="Hammer" size={15} />
                  </div>
                  <select
                    id="field"
                    name="field"
                    value={formData.field}
                    onChange={handleChange}
                    className={`w-full bg-[#030a14]/80 appearance-none border pl-10 pr-10 py-2.5 rounded-lg text-sm text-white font-sans focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/15 transition-all ${
                      errors.field ? 'border-red-500/80 focus:ring-red-500/10' : 'border-white/10'
                    }`}
                  >
                    <option value="" disabled>Selecione a sua área</option>
                    <option value="Soldadura">Soldadura</option>
                    <option value="Montagem Industrial">Montagem Industrial</option>
                    <option value="Serralharia">Serralharia</option>
                    <option value="Decapagem / Tratamento de Superfícies">Decapagem / Tratamento</option>
                    <option value="Instalações de TI">Instalações de TI</option>
                    <option value="Construção e Reparação Naval">Construção & Reparação Naval</option>
                    <option value="Outra Área Industrial">Outra Área Industrial</option>
                  </select>
                  <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-[#2563EB]/80 font-bold text-xs">▼</div>
                </div>
                {errors.field && <p className="text-[10px] text-red-400 font-medium mt-1 pl-1">{errors.field}</p>}
              </div>
            </div>

            {/* Email e Telefone */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* E-mail */}
              <div>
                <label htmlFor="talent-email" className="block font-sans text-[11px] font-bold text-[#B8C4D0]/90 uppercase tracking-wider mb-2">
                  E-mail *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#2563EB]/70">
                    <IconRenderer name="Mail" size={15} />
                  </div>
                  <input
                    type="email"
                    id="talent-email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full bg-[#030a14]/80 border pl-10 pr-4 py-2.5 rounded-lg text-sm text-white font-sans placeholder-white/20 focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/15 transition-all ${
                      errors.email ? 'border-red-500/80 focus:ring-red-500/10' : 'border-white/10'
                    }`}
                    placeholder="exemplo@email.com"
                  />
                </div>
                {errors.email && <p className="text-[10px] text-red-400 font-medium mt-1 pl-1">{errors.email}</p>}
              </div>

              {/* Telefone / WhatsApp */}
              <div>
                <label htmlFor="talent-phone" className="block font-sans text-[11px] font-bold text-[#B8C4D0]/90 uppercase tracking-wider mb-2">
                  Telefone / WhatsApp *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#2563EB]/70">
                    <IconRenderer name="Phone" size={15} />
                  </div>
                  <input
                    type="text"
                    id="talent-phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`w-full bg-[#030a14]/80 border pl-10 pr-4 py-2.5 rounded-lg text-sm text-white font-sans placeholder-white/20 focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/15 transition-all ${
                      errors.phone ? 'border-red-500/80 focus:ring-red-500/10' : 'border-white/10'
                    }`}
                    placeholder="Ex: +351 912 345 678"
                  />
                </div>
                {errors.phone && <p className="text-[10px] text-red-400 font-medium mt-1 pl-1">{errors.phone}</p>}
              </div>
            </div>

            {/* Resumo da Experiência e Certificações */}
            <div>
              <label htmlFor="talent-experience" className="block font-sans text-[11px] font-bold text-[#B8C4D0]/90 uppercase tracking-wider mb-2">
                Resumo Profissional, Experiência e Certificações *
              </label>
              <div className="relative">
                <div className="absolute top-3.5 left-3.5 pointer-events-none text-[#2563EB]/70">
                  <IconRenderer name="CalendarRange" size={15} />
                </div>
                <textarea
                  id="talent-experience"
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  rows={3}
                  className={`w-full bg-[#030a14]/80 border pl-10 pr-4 py-2.5 rounded-lg text-sm text-white font-sans placeholder-white/20 focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/15 transition-all ${
                    errors.experience ? 'border-red-500/80 focus:ring-red-500/10' : 'border-white/10'
                  }`}
                  placeholder="Ex: 5 anos de experiência em soldadura TIG de tubagens de alta pressão. Possuo homologação ativa pela norma EN ISO 9606-1 e certificado TÜV."
                />
              </div>
              {errors.experience && <p className="text-[10px] text-red-400 font-medium mt-1 pl-1">{errors.experience}</p>}
            </div>

            {/* Upload do Currículo (PDF) */}
            <div>
              <label htmlFor="resume" className="block font-sans text-[11px] font-bold text-[#B8C4D0]/90 uppercase tracking-wider mb-2">
                Currículo em PDF *
              </label>
              <div className={`relative w-full border border-dashed rounded-lg p-5 bg-[#030a14]/40 hover:bg-[#030a14]/75 transition-all flex flex-col items-center justify-center cursor-pointer ${
                errors.resume ? 'border-red-500/50 hover:border-red-500/80' : 'border-white/10 hover:border-[#2563EB]/60'
              }`}>
                <input
                  type="file"
                  id="resume"
                  accept=".pdf"
                  onChange={handleFileChange}
                  className="absolute inset-0 opacity-0 cursor-pointer z-10"
                />
                <svg className="w-7 h-7 text-[#2563EB] mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                </svg>
                <span className="text-xs text-white font-medium mb-1 text-center px-4">
                  {resumeFile ? `✓ ${resumeFile.name}` : 'Arraste ou clique para anexar o seu Currículo (PDF)'}
                </span>
                <span className="text-[9px] text-[#B8C4D0]/40 font-mono">PDF de até 5MB</span>
              </div>
              {errors.resume && <p className="text-[10px] text-red-400 font-medium mt-1 pl-1">{errors.resume}</p>}
            </div>

            {/* Checkbox Amigável de Confirmação Humana */}
            <div className="pt-2">
              <label className="flex items-start gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={isHuman}
                  onChange={(e) => {
                    setIsHuman(e.target.checked);
                    if (errors.isHuman) setErrors((prev) => ({ ...prev, isHuman: '' }));
                  }}
                  className="mt-0.5 w-4.5 h-4.5 rounded border-white/10 bg-[#030a14] text-[#2563EB] focus:ring-[#2563EB]/40 focus:ring-offset-0 focus:ring-1"
                />
                <span className="text-xs text-[#B8C4D0]/80 group-hover:text-white transition-colors leading-snug select-none">
                  Confirmo que pretendo registar os meus dados profissionais no Banco de Talentos da METALOWORLD.
                </span>
              </label>
              {errors.isHuman && <p className="text-[10px] text-red-400 font-medium mt-1 pl-1">{errors.isHuman}</p>}
            </div>

            {/* Botão de Envio */}
            <div className="pt-3">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 bg-[#2563EB] hover:bg-[#1d4ed8] active:scale-[0.99] text-white font-sans font-bold text-xs tracking-wider rounded-lg transition-all uppercase flex items-center justify-center gap-2 shadow-lg shadow-[#2563EB]/15 hover:shadow-[#2563EB]/25 disabled:opacity-60"
              >
                {isSubmitting ? (
                  <span>A Processar Candidatura...</span>
                ) : (
                  <>
                    <IconRenderer name="Send" size={13} />
                    <span>Enviar Candidatura por E-mail</span>
                  </>
                )}
              </button>
              <p className="text-center text-[9px] text-[#B8C4D0]/40 font-sans mt-2">
                * Nota: Ao submeter, o seu leitor de e-mail será aberto com a mensagem pronta. Lembre-se de anexar o seu PDF antes de enviar.
              </p>
            </div>

          </form>
        </motion.div>

        {/* Success / Mailto Notification Overlay */}
        <AnimatePresence>
          {submitSuccess && (
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="fixed bottom-6 right-6 z-55 max-w-sm w-full bg-[#0a1e38] border border-[#2563EB]/40 shadow-[0_15px_40px_rgba(3,15,35,0.9)] p-6 rounded-xl flex items-start gap-4"
            >
              <div className="w-10 h-10 rounded-full bg-[#2563EB]/20 flex items-center justify-center text-[#2563EB] shrink-0">
                <IconRenderer name="Check" size={20} className="text-white" />
              </div>
              <div className="text-left space-y-1">
                <span className="font-mono text-[9px] text-[#2563EB] font-bold uppercase tracking-wider block">ENVIO_DIRETO_INICIADO</span>
                <h4 className="font-display font-bold text-sm text-white">
                  Candidatura Preparada!
                </h4>
                <p className="font-sans text-xs text-[#B8C4D0] leading-relaxed">
                  O seu cliente de e-mail foi aberto com os seus dados prontos para envio. Por favor, <strong>verifique se o ficheiro PDF do seu currículo está anexado</strong> na mensagem e clique em enviar no seu leitor de e-mail.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};
