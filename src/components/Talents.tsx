import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { IconRenderer } from './IconRenderer.tsx';
import { GeneralSettings } from '../types.ts';

interface TalentsProps {
  settings: GeneralSettings;
}

export const Talents: React.FC<TalentsProps> = ({ settings }) => {
  const [formData, setFormData] = useState({
    name: '',
    birthDate: '',
    nationality: '',
    residenceCountry: '',
    phone: '',
    whatsapp: '',
    email: '',
    field: '',
    specialty: '',
    experienceYears: '',
    certifications: '',
    travelAvailability: '',
    interestCountries: '',
    message: '',
  });

  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [antispamValue, setAntispamValue] = useState({ num1: 0, num2: 0, userAnswer: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Generate random math challenge for spam protection on mount
  useEffect(() => {
    generateAntispam();
  }, []);

  const generateAntispam = () => {
    const num1 = Math.floor(Math.random() * 9) + 1;
    const num2 = Math.floor(Math.random() * 9) + 1;
    setAntispamValue({ num1, num2, userAnswer: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleAntispamChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAntispamValue((prev) => ({ ...prev, userAnswer: e.target.value }));
    if (errors.antispam) {
      setErrors((prev) => ({ ...prev, antispam: '' }));
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
    if (!formData.name.trim()) tempErrors.name = 'Nome completo é obrigatório';
    if (!formData.birthDate) tempErrors.birthDate = 'Data de nascimento é obrigatória';
    if (!formData.nationality.trim()) tempErrors.nationality = 'Nacionalidade é obrigatória';
    if (!formData.residenceCountry.trim()) tempErrors.residenceCountry = 'País onde reside é obrigatório';
    if (!formData.phone.trim()) tempErrors.phone = 'Telefone é obrigatório';
    if (!formData.whatsapp.trim()) tempErrors.whatsapp = 'WhatsApp é obrigatório';

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      tempErrors.email = 'E-mail é obrigatório';
    } else if (!emailRegex.test(formData.email)) {
      tempErrors.email = 'Insira um e-mail válido';
    }

    if (!formData.field) tempErrors.field = 'Área de atuação é obrigatória';
    if (!formData.specialty.trim()) tempErrors.specialty = 'Especialidade é obrigatória';
    if (!formData.experienceYears.trim()) tempErrors.experienceYears = 'Anos de experiência são obrigatórios';
    if (!formData.travelAvailability) tempErrors.travelAvailability = 'Disponibilidade para viagens é obrigatória';
    if (!formData.interestCountries.trim()) tempErrors.interestCountries = 'País de interesse é obrigatório';
    
    if (!resumeFile) {
      tempErrors.resume = 'O currículo em PDF é obrigatório';
    }

    // Antispam verification
    const expected = antispamValue.num1 + antispamValue.num2;
    if (parseInt(antispamValue.userAnswer) !== expected) {
      tempErrors.antispam = 'Resultado incorreto da verificação antispam';
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    // Simulate upload and email transmission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);

      // Construct mailto link with form details
      const subject = `Banco de Talentos - ${formData.name} (${formData.field})`;
      const body = `--- DADOS DE CADASTRO ---
Nome Completo: ${formData.name}
Data de Nascimento: ${formData.birthDate}
Nacionalidade: ${formData.nationality}
País Onde Reside: ${formData.residenceCountry}
Telefone: ${formData.phone}
WhatsApp: ${formData.whatsapp}
E-mail: ${formData.email}
Área de Atuação: ${formData.field}
Especialidade: ${formData.specialty}
Anos de Experiência: ${formData.experienceYears}
Certificações: ${formData.certifications || 'Nenhuma informada'}
Disponibilidade para Viagens: ${formData.travelAvailability}
País de Interesse para Atuação: ${formData.interestCountries}
Mensagem: ${formData.message || 'Nenhuma informada'}

* Nota: O candidato anexou o currículo: "${resumeFile?.name || 'Curriculo.pdf'}" *`;

      const mailtoUrl = `mailto:${settings.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      
      // Open default mail client
      window.location.href = mailtoUrl;

      // Reset success modal and clear inputs
      setTimeout(() => {
        setSubmitSuccess(false);
        setFormData({
          name: '',
          birthDate: '',
          nationality: '',
          residenceCountry: '',
          phone: '',
          whatsapp: '',
          email: '',
          field: '',
          specialty: '',
          experienceYears: '',
          certifications: '',
          travelAvailability: '',
          interestCountries: '',
          message: '',
        });
        setResumeFile(null);
        generateAntispam();
      }, 5000);
    }, 1800);
  };

  return (
    <section id="talentos" className="relative py-20 lg:py-32 bg-[#071B35] overflow-hidden scroll-mt-20 lg:scroll-mt-24">
      {/* Background flares */}
      <div className="absolute inset-0 z-0 opacity-[0.03] steel-brushed pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-[#1A5296]/8 rounded-full blur-[150px] pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 bg-[#2563EB]/10 rounded-full border border-[#2563EB]/35 text-xs font-mono font-bold text-[#B8C4D0] tracking-wider uppercase mb-4"
          >
            <span>Oportunidades</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-['Helvetica_Neue',_sans-serif] font-extrabold text-3xl sm:text-4xl text-white tracking-tight leading-none uppercase"
          >
            Banco de <span className="text-[#2563EB]">Talentos</span>
          </motion.h2>
          
          <p className="font-sans text-[#B8C4D0]/70 text-sm sm:text-base max-w-xl mx-auto mt-4 leading-relaxed">
            Faça parte da nossa rede de profissionais e seja considerado para futuras oportunidades em projetos industriais em toda a Europa.
          </p>
          <div className="w-16 h-1 bg-[#2563EB] mx-auto mt-5 rounded-full" />
        </div>

        {/* Talent Registration Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-[#050f1e]/85 border border-[#1A5296]/20 p-6 sm:p-10 rounded-xl shadow-2xl text-left"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Seção: Informações Pessoais */}
            <div className="space-y-4">
              <h3 className="font-display font-bold text-xs uppercase tracking-widest text-[#2563EB] border-b border-[#1A5296]/15 pb-2">
                Dados Pessoais
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="talent-name" className="block font-sans text-[11px] font-bold text-[#B8C4D0] uppercase tracking-wider mb-2">
                    Nome Completo *
                  </label>
                  <input
                    type="text"
                    id="talent-name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full bg-[#081729]/80 border py-3 px-4 rounded-lg text-sm text-white font-sans placeholder-[#B8C4D0]/20 focus:outline-none focus:border-[#2563EB] focus:bg-[#081729] focus:ring-1 focus:ring-[#2563EB] transition-all ${
                      errors.name ? 'border-red-500' : 'border-[#1A5296]/20'
                    }`}
                    placeholder="Seu nome completo"
                  />
                  {errors.name && <p className="text-[10px] text-red-500 font-medium mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label htmlFor="birthDate" className="block font-sans text-[11px] font-bold text-[#B8C4D0] uppercase tracking-wider mb-2">
                    Data de Nascimento *
                  </label>
                  <input
                    type="date"
                    id="birthDate"
                    name="birthDate"
                    value={formData.birthDate}
                    onChange={handleChange}
                    className={`w-full bg-[#081729]/80 border py-3 px-4 rounded-lg text-sm text-white font-sans focus:outline-none focus:border-[#2563EB] focus:bg-[#081729] focus:ring-1 focus:ring-[#2563EB] transition-all ${
                      errors.birthDate ? 'border-red-500' : 'border-[#1A5296]/20'
                    }`}
                  />
                  {errors.birthDate && <p className="text-[10px] text-red-500 font-medium mt-1">{errors.birthDate}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="nationality" className="block font-sans text-[11px] font-bold text-[#B8C4D0] uppercase tracking-wider mb-2">
                    Nacionalidade *
                  </label>
                  <input
                    type="text"
                    id="nationality"
                    name="nationality"
                    value={formData.nationality}
                    onChange={handleChange}
                    className={`w-full bg-[#081729]/80 border py-3 px-4 rounded-lg text-sm text-white font-sans placeholder-[#B8C4D0]/20 focus:outline-none focus:border-[#2563EB] focus:bg-[#081729] focus:ring-1 focus:ring-[#2563EB] transition-all ${
                      errors.nationality ? 'border-red-500' : 'border-[#1A5296]/20'
                    }`}
                    placeholder="Ex: Portuguesa, Espanhola, Brasileira"
                  />
                  {errors.nationality && <p className="text-[10px] text-red-500 font-medium mt-1">{errors.nationality}</p>}
                </div>

                <div>
                  <label htmlFor="residenceCountry" className="block font-sans text-[11px] font-bold text-[#B8C4D0] uppercase tracking-wider mb-2">
                    País onde Reside *
                  </label>
                  <input
                    type="text"
                    id="residenceCountry"
                    name="residenceCountry"
                    value={formData.residenceCountry}
                    onChange={handleChange}
                    className={`w-full bg-[#081729]/80 border py-3 px-4 rounded-lg text-sm text-white font-sans placeholder-[#B8C4D0]/20 focus:outline-none focus:border-[#2563EB] focus:bg-[#081729] focus:ring-1 focus:ring-[#2563EB] transition-all ${
                      errors.residenceCountry ? 'border-red-500' : 'border-[#1A5296]/20'
                    }`}
                    placeholder="Ex: Portugal, Espanha, Brasil"
                  />
                  {errors.residenceCountry && <p className="text-[10px] text-red-500 font-medium mt-1">{errors.residenceCountry}</p>}
                </div>
              </div>
            </div>

            {/* Seção: Contato */}
            <div className="space-y-4 pt-2">
              <h3 className="font-display font-bold text-xs uppercase tracking-widest text-[#2563EB] border-b border-[#1A5296]/15 pb-2">
                Contacto
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div>
                  <label htmlFor="talent-phone" className="block font-sans text-[11px] font-bold text-[#B8C4D0] uppercase tracking-wider mb-2">
                    Telefone *
                  </label>
                  <input
                    type="text"
                    id="talent-phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`w-full bg-[#081729]/80 border py-3 px-4 rounded-lg text-sm text-white font-sans placeholder-[#B8C4D0]/20 focus:outline-none focus:border-[#2563EB] focus:bg-[#081729] focus:ring-1 focus:ring-[#2563EB] transition-all ${
                      errors.phone ? 'border-red-500' : 'border-[#1A5296]/20'
                    }`}
                    placeholder="Ex: +351 912 345 678"
                  />
                  {errors.phone && <p className="text-[10px] text-red-500 font-medium mt-1">{errors.phone}</p>}
                </div>

                <div>
                  <label htmlFor="whatsapp" className="block font-sans text-[11px] font-bold text-[#B8C4D0] uppercase tracking-wider mb-2">
                    WhatsApp *
                  </label>
                  <input
                    type="text"
                    id="whatsapp"
                    name="whatsapp"
                    value={formData.whatsapp}
                    onChange={handleChange}
                    className={`w-full bg-[#081729]/80 border py-3 px-4 rounded-lg text-sm text-white font-sans placeholder-[#B8C4D0]/20 focus:outline-none focus:border-[#2563EB] focus:bg-[#081729] focus:ring-1 focus:ring-[#2563EB] transition-all ${
                      errors.whatsapp ? 'border-red-500' : 'border-[#1A5296]/20'
                    }`}
                    placeholder="Ex: +351 912 345 678"
                  />
                  {errors.whatsapp && <p className="text-[10px] text-red-500 font-medium mt-1">{errors.whatsapp}</p>}
                </div>

                <div>
                  <label htmlFor="talent-email" className="block font-sans text-[11px] font-bold text-[#B8C4D0] uppercase tracking-wider mb-2">
                    E-mail *
                  </label>
                  <input
                    type="email"
                    id="talent-email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full bg-[#081729]/80 border py-3 px-4 rounded-lg text-sm text-white font-sans placeholder-[#B8C4D0]/20 focus:outline-none focus:border-[#2563EB] focus:bg-[#081729] focus:ring-1 focus:ring-[#2563EB] transition-all ${
                      errors.email ? 'border-red-500' : 'border-[#1A5296]/20'
                    }`}
                    placeholder="seu.email@exemplo.com"
                  />
                  {errors.email && <p className="text-[10px] text-red-500 font-medium mt-1">{errors.email}</p>}
                </div>
              </div>
            </div>

            {/* Seção: Perfil Profissional */}
            <div className="space-y-4 pt-2">
              <h3 className="font-display font-bold text-xs uppercase tracking-widest text-[#2563EB] border-b border-[#1A5296]/15 pb-2">
                Perfil Profissional
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div>
                  <label htmlFor="field" className="block font-sans text-[11px] font-bold text-[#B8C4D0] uppercase tracking-wider mb-2">
                    Área de Atuação *
                  </label>
                  <div className="relative">
                    <select
                      id="field"
                      name="field"
                      value={formData.field}
                      onChange={handleChange}
                      className={`w-full bg-[#081729] appearance-none border py-3 px-4 rounded-lg text-sm text-white font-sans focus:outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB] transition-all ${
                        errors.field ? 'border-red-500' : 'border-[#1A5296]/20'
                      }`}
                    >
                      <option value="" disabled>Selecione</option>
                      <option value="Soldadura">Soldadura</option>
                      <option value="Montagem Industrial">Montagem Industrial</option>
                      <option value="Serralharia">Serralharia</option>
                      <option value="Decapagem / Tratamento">Decapagem / Tratamento</option>
                      <option value="Instalações de TI">Instalações de TI</option>
                      <option value="Construção e Reparação Naval">Construção & Reparação Naval</option>
                    </select>
                    <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-[#2563EB]">↓</div>
                  </div>
                  {errors.field && <p className="text-[10px] text-red-500 font-medium mt-1">{errors.field}</p>}
                </div>

                <div>
                  <label htmlFor="specialty" className="block font-sans text-[11px] font-bold text-[#B8C4D0] uppercase tracking-wider mb-2">
                    Especialidade *
                  </label>
                  <input
                    type="text"
                    id="specialty"
                    name="specialty"
                    value={formData.specialty}
                    onChange={handleChange}
                    className={`w-full bg-[#081729]/80 border py-3 px-4 rounded-lg text-sm text-white font-sans placeholder-[#B8C4D0]/20 focus:outline-none focus:border-[#2563EB] focus:bg-[#081729] focus:ring-1 focus:ring-[#2563EB] transition-all ${
                      errors.specialty ? 'border-red-500' : 'border-[#1A5296]/20'
                    }`}
                    placeholder="Ex: Soldador TIG Tubulação, Eletricista"
                  />
                  {errors.specialty && <p className="text-[10px] text-red-500 font-medium mt-1">{errors.specialty}</p>}
                </div>

                <div>
                  <label htmlFor="experienceYears" className="block font-sans text-[11px] font-bold text-[#B8C4D0] uppercase tracking-wider mb-2">
                    Anos de Experiência *
                  </label>
                  <input
                    type="number"
                    id="experienceYears"
                    name="experienceYears"
                    value={formData.experienceYears}
                    onChange={handleChange}
                    min="0"
                    className={`w-full bg-[#081729]/80 border py-3 px-4 rounded-lg text-sm text-white font-sans placeholder-[#B8C4D0]/20 focus:outline-none focus:border-[#2563EB] focus:bg-[#081729] focus:ring-1 focus:ring-[#2563EB] transition-all ${
                      errors.experienceYears ? 'border-red-500' : 'border-[#1A5296]/20'
                    }`}
                    placeholder="Ex: 5"
                  />
                  {errors.experienceYears && <p className="text-[10px] text-red-500 font-medium mt-1">{errors.experienceYears}</p>}
                </div>
              </div>

              <div>
                <label htmlFor="certifications" className="block font-sans text-[11px] font-bold text-[#B8C4D0] uppercase tracking-wider mb-2">
                  Certificações (Normas, Organismos Homologadores, etc.)
                </label>
                <input
                  type="text"
                  id="certifications"
                  name="certifications"
                  value={formData.certifications}
                  onChange={handleChange}
                  className="w-full bg-[#081729]/80 border border-[#1A5296]/20 py-3 px-4 rounded-lg text-sm text-white font-sans placeholder-[#B8C4D0]/20 focus:outline-none focus:border-[#2563EB] focus:bg-[#081729] focus:ring-1 focus:ring-[#2563EB] transition-all"
                  placeholder="Ex: Soldador qualificado ASME IX, Certificação TÜV, NR-35"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="travelAvailability" className="block font-sans text-[11px] font-bold text-[#B8C4D0] uppercase tracking-wider mb-2">
                    Disponibilidade para Viagens? *
                  </label>
                  <div className="relative">
                    <select
                      id="travelAvailability"
                      name="travelAvailability"
                      value={formData.travelAvailability}
                      onChange={handleChange}
                      className={`w-full bg-[#081729] appearance-none border py-3 px-4 rounded-lg text-sm text-white font-sans focus:outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB] transition-all ${
                        errors.travelAvailability ? 'border-red-500' : 'border-[#1A5296]/20'
                      }`}
                    >
                      <option value="" disabled>Selecione</option>
                      <option value="Sim">Sim, total disponibilidade</option>
                      <option value="Não">Não</option>
                    </select>
                    <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-[#2563EB]">↓</div>
                  </div>
                  {errors.travelAvailability && <p className="text-[10px] text-red-500 font-medium mt-1">{errors.travelAvailability}</p>}
                </div>

                <div>
                  <label htmlFor="interestCountries" className="block font-sans text-[11px] font-bold text-[#B8C4D0] uppercase tracking-wider mb-2">
                    País de Interesse para Atuação *
                  </label>
                  <input
                    type="text"
                    id="interestCountries"
                    name="interestCountries"
                    value={formData.interestCountries}
                    onChange={handleChange}
                    className={`w-full bg-[#081729]/80 border py-3 px-4 rounded-lg text-sm text-white font-sans placeholder-[#B8C4D0]/20 focus:outline-none focus:border-[#2563EB] focus:bg-[#081729] focus:ring-1 focus:ring-[#2563EB] transition-all ${
                      errors.interestCountries ? 'border-red-500' : 'border-[#1A5296]/20'
                    }`}
                    placeholder="Ex: Portugal, Espanha, Alemanha, Geral Europa"
                  />
                  {errors.interestCountries && <p className="text-[10px] text-red-500 font-medium mt-1">{errors.interestCountries}</p>}
                </div>
              </div>
            </div>

            {/* Seção: Arquivo de Currículo & Mensagem */}
            <div className="space-y-4 pt-2">
              <h3 className="font-display font-bold text-xs uppercase tracking-widest text-[#2563EB] border-b border-[#1A5296]/15 pb-2">
                Ficheiro & Mensagem
              </h3>

              <div>
                <label htmlFor="resume" className="block font-sans text-[11px] font-bold text-[#B8C4D0] uppercase tracking-wider mb-2">
                  Currículo em PDF *
                </label>
                <div className="relative w-full border border-dashed border-[#1A5296]/30 hover:border-[#2563EB]/80 rounded-lg p-4 bg-[#081729]/40 transition-colors flex flex-col items-center justify-center cursor-pointer">
                  <input
                    type="file"
                    id="resume"
                    accept=".pdf"
                    onChange={handleFileChange}
                    className="absolute inset-0 opacity-0 cursor-pointer z-10"
                  />
                  <IconRenderer name="Upload" size={24} className="text-[#B8C4D0] mb-2" />
                  <span className="text-xs text-white font-medium mb-1">
                    {resumeFile ? `Selecionado: ${resumeFile.name}` : 'Arraste ou clique para selecionar seu currículo (PDF)'}
                  </span>
                  <span className="text-[9px] text-[#B8C4D0]/40 font-mono">Tamanho máximo: 5MB</span>
                </div>
                {errors.resume && <p className="text-[10px] text-red-500 font-medium mt-1">{errors.resume}</p>}
              </div>

              <div>
                <label htmlFor="talent-message" className="block font-sans text-[11px] font-bold text-[#B8C4D0] uppercase tracking-wider mb-2">
                  Mensagem Adicional / Apresentação
                </label>
                <textarea
                  id="talent-message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={3}
                  className="w-full bg-[#081729]/80 border border-[#1A5296]/20 py-3 px-4 rounded-lg text-sm text-white font-sans placeholder-[#B8C4D0]/20 focus:outline-none focus:border-[#2563EB] focus:bg-[#081729] focus:ring-1 focus:ring-[#2563EB] transition-all"
                  placeholder="Se desejar, descreva um breve resumo da sua carreira ou alguma observação específica..."
                />
              </div>
            </div>

            {/* Proteção contra Spam & Envio */}
            <div className="p-4 bg-[#081e39] rounded-lg border border-[#1A5296]/20 flex flex-col sm:flex-row items-center justify-between gap-5 mt-6">
              <div className="flex items-center gap-3">
                <IconRenderer name="ShieldAlert" className="text-[#2563EB] shrink-0" size={20} />
                <div className="text-left space-y-1">
                  <span className="font-mono text-[9px] text-[#B8C4D0]/80 font-bold uppercase tracking-wider block">Verificação Humana Antispam</span>
                  <div className="flex items-center gap-2">
                    <span className="font-sans text-xs text-white">Quanto é {antispamValue.num1} + {antispamValue.num2}? *</span>
                    <input
                      type="number"
                      value={antispamValue.userAnswer}
                      onChange={handleAntispamChange}
                      className={`w-16 bg-[#050f1e] border py-1.5 px-2.5 rounded text-xs text-white focus:outline-none focus:border-[#2563EB] ${
                        errors.antispam ? 'border-red-500' : 'border-[#1A5296]/30'
                      }`}
                    />
                  </div>
                </div>
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto px-8 py-3.5 bg-[#2563EB] hover:bg-[#1A5296] text-white font-sans font-bold text-xs tracking-wider rounded border-b-2 border-white/20 transition-all uppercase flex items-center justify-center gap-2 shadow-md hover:shadow-[#2563EB]/20 disabled:opacity-50 min-h-[46px]"
              >
                {isSubmitting ? (
                  <span>A Processar...</span>
                ) : (
                  <>
                    <IconRenderer name="Send" size={13} />
                    <span>Cadastrar Currículo</span>
                  </>
                )}
              </button>
            </div>
            {errors.antispam && <p className="text-[10px] text-red-500 font-medium text-left mt-1">{errors.antispam}</p>}

          </form>
        </motion.div>

        {/* Success Alert */}
        <AnimatePresence>
          {submitSuccess && (
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="fixed bottom-6 right-6 z-55 max-w-sm w-full bg-[#081a31] border-2 border-[#2563EB] shadow-2.5xl p-6 rounded-xl flex items-start gap-4"
            >
              <div className="w-10 h-10 rounded-full bg-[#2563EB]/20 flex items-center justify-center text-[#2563EB] shrink-0">
                <IconRenderer name="Check" size={20} className="text-white" />
              </div>
              <div className="text-left space-y-1">
                <span className="font-mono text-[9px] text-[#2563EB] font-bold uppercase tracking-wider block">REGISTRO_TALENTO_OK</span>
                <h4 className="font-display font-bold text-sm text-white">
                  Candidatura Submetida!
                </h4>
                <p className="font-sans text-xs text-[#B8C4D0] leading-normal">
                  Os seus dados e currículo foram registados. A equipa de Recursos Humanos da METALOWORLD entrará em contacto assim que surgir uma oportunidade alinhada com o seu perfil.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};
