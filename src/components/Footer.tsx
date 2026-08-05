import React, { useState, useEffect, useRef } from 'react';
import { IconRenderer } from './IconRenderer.tsx';
import { GeneralSettings } from '../types.ts';

interface FooterProps {
  settings: GeneralSettings;
}

/* ─────────────────────────────────────────────────
   Privacy Policy Modal Component
   ───────────────────────────────────────────────── */
const PrivacyPolicyModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  // Close on ESC key
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      style={{ animation: 'fadeIn 0.25s ease-out' }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md" />

      {/* Modal Container */}
      <div
        ref={modalRef}
        className="relative z-10 w-full max-w-3xl max-h-[90vh] rounded-2xl border border-white/10 bg-gradient-to-b from-[#0a1628] to-[#050f1e] shadow-2xl shadow-black/50 flex flex-col"
        style={{ animation: 'slideUp 0.35s cubic-bezier(0.16, 1, 0.3, 1)' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 sm:px-8 py-5 border-b border-white/10 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#2563EB]/20 border border-[#2563EB]/30 flex items-center justify-center">
              <IconRenderer name="Shield" size={16} className="text-[#2563EB]" />
            </div>
            <div>
              <h2 className="font-display font-bold text-base sm:text-lg text-white tracking-tight">
                Política de Privacidade
              </h2>
              <p className="text-[10px] sm:text-xs text-brand-silver/50 mt-0.5">
                Última atualização: 04 de agosto de 2026
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 hover:border-white/20 transition-all duration-200 group"
            aria-label="Fechar Política de Privacidade"
          >
            <IconRenderer name="X" size={16} className="text-brand-silver/60 group-hover:text-white transition-colors" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto flex-1 px-6 sm:px-8 py-6 space-y-6 privacy-scroll">

          <p className="text-sm text-brand-silver/80 leading-relaxed">
            A Metaloworld respeita a privacidade dos seus utilizadores e compromete-se a proteger os seus dados pessoais, em conformidade com o Regulamento (UE) 2016/679 (RGPD) e a legislação portuguesa aplicável.
          </p>

          {/* Section 1 */}
          <section className="space-y-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-md bg-[#2563EB]/15 text-[#2563EB] text-[11px] font-mono font-bold border border-[#2563EB]/20">1</span>
              Responsável pelo tratamento dos dados
            </h3>
            <p className="text-sm text-brand-silver/70 leading-relaxed pl-8">
              A Metaloworld é responsável pelo tratamento dos dados pessoais recolhidos através do website, formulários de contacto, campanhas publicitárias e outros meios de comunicação.
            </p>
            <div className="pl-8 space-y-1">
              <p className="text-sm text-brand-silver/70"><span className="text-brand-silver/90 font-medium">Website:</span> <a href="https://www.metaloworld.com" target="_blank" rel="noopener noreferrer" className="text-[#2563EB] hover:underline">https://www.metaloworld.com</a></p>
              <p className="text-sm text-brand-silver/70"><span className="text-brand-silver/90 font-medium">E-mail:</span> <a href="mailto:suporte@metaloworld.com" className="text-[#2563EB] hover:underline">suporte@metaloworld.com</a></p>
            </div>
          </section>

          {/* Section 2 */}
          <section className="space-y-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-md bg-[#2563EB]/15 text-[#2563EB] text-[11px] font-mono font-bold border border-[#2563EB]/20">2</span>
              Que dados recolhemos?
            </h3>
            <p className="text-sm text-brand-silver/70 leading-relaxed pl-8">Podemos recolher os seguintes dados pessoais:</p>
            <ul className="pl-12 space-y-1.5 text-sm text-brand-silver/70 list-none">
              {['Nome', 'Empresa', 'Endereço de e-mail', 'Número de telefone', 'Informações fornecidas em pedidos de orçamento', 'Serviço pretendido', 'Endereço IP', 'Dados de navegação no website', 'Informações recolhidas através de cookies'].map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-[#2563EB]/60 mt-2 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </section>

          {/* Section 3 */}
          <section className="space-y-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-md bg-[#2563EB]/15 text-[#2563EB] text-[11px] font-mono font-bold border border-[#2563EB]/20">3</span>
              Finalidade da recolha dos dados
            </h3>
            <p className="text-sm text-brand-silver/70 leading-relaxed pl-8">Os dados pessoais são utilizados para:</p>
            <ul className="pl-12 space-y-1.5 text-sm text-brand-silver/70 list-none">
              {[
                'Responder a pedidos de orçamento;',
                'Entrar em contacto com potenciais clientes;',
                'Prestar informações sobre os nossos serviços;',
                'Elaborar propostas comerciais;',
                'Melhorar os nossos serviços;',
                'Cumprir obrigações legais;',
                'Efetuar ações de marketing, mediante consentimento quando exigido por lei.'
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-[#2563EB]/60 mt-2 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </section>

          {/* Section 4 */}
          <section className="space-y-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-md bg-[#2563EB]/15 text-[#2563EB] text-[11px] font-mono font-bold border border-[#2563EB]/20">4</span>
              Base legal
            </h3>
            <p className="text-sm text-brand-silver/70 leading-relaxed pl-8">O tratamento dos dados é realizado com base em:</p>
            <ul className="pl-12 space-y-1.5 text-sm text-brand-silver/70 list-none">
              {[
                'Consentimento do titular dos dados;',
                'Execução de diligências pré-contratuais;',
                'Cumprimento de obrigações legais;',
                'Interesse legítimo da Metaloworld.'
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-[#2563EB]/60 mt-2 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </section>

          {/* Section 5 */}
          <section className="space-y-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-md bg-[#2563EB]/15 text-[#2563EB] text-[11px] font-mono font-bold border border-[#2563EB]/20">5</span>
              Meta (Facebook e Instagram)
            </h3>
            <p className="text-sm text-brand-silver/70 leading-relaxed pl-8">
              Quando preenche um formulário através dos anúncios da Meta (Facebook ou Instagram), os seus dados são enviados à Metaloworld para que possamos responder ao seu pedido de contacto ou orçamento.
            </p>
            <p className="text-sm text-brand-silver/70 leading-relaxed pl-8">
              Os dados recolhidos serão utilizados exclusivamente para esse fim.
            </p>
          </section>

          {/* Section 6 */}
          <section className="space-y-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-md bg-[#2563EB]/15 text-[#2563EB] text-[11px] font-mono font-bold border border-[#2563EB]/20">6</span>
              WhatsApp
            </h3>
            <p className="text-sm text-brand-silver/70 leading-relaxed pl-8">
              Ao contactar a Metaloworld através do WhatsApp, os seus dados serão tratados apenas para responder ao seu pedido de informação, orçamento ou assistência.
            </p>
          </section>

          {/* Section 7 */}
          <section className="space-y-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-md bg-[#2563EB]/15 text-[#2563EB] text-[11px] font-mono font-bold border border-[#2563EB]/20">7</span>
              Google Analytics
            </h3>
            <p className="text-sm text-brand-silver/70 leading-relaxed pl-8">
              O nosso website pode utilizar o Google Analytics para compreender a forma como os visitantes utilizam o website e melhorar continuamente a experiência do utilizador.
            </p>
            <p className="text-sm text-brand-silver/70 leading-relaxed pl-8">
              Estas informações são recolhidas de forma agregada e não identificam diretamente o utilizador.
            </p>
          </section>

          {/* Section 8 */}
          <section className="space-y-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-md bg-[#2563EB]/15 text-[#2563EB] text-[11px] font-mono font-bold border border-[#2563EB]/20">8</span>
              Meta Pixel
            </h3>
            <p className="text-sm text-brand-silver/70 leading-relaxed pl-8">
              O website poderá utilizar o Meta Pixel para medir o desempenho das campanhas publicitárias e apresentar anúncios mais relevantes aos utilizadores.
            </p>
          </section>

          {/* Section 9 */}
          <section className="space-y-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-md bg-[#2563EB]/15 text-[#2563EB] text-[11px] font-mono font-bold border border-[#2563EB]/20">9</span>
              Cookies
            </h3>
            <p className="text-sm text-brand-silver/70 leading-relaxed pl-8">O website utiliza cookies para:</p>
            <ul className="pl-12 space-y-1.5 text-sm text-brand-silver/70 list-none">
              {[
                'Melhorar a experiência de navegação;',
                'Medir estatísticas de utilização;',
                'Personalizar conteúdos;',
                'Avaliar o desempenho das campanhas publicitárias.'
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-[#2563EB]/60 mt-2 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="text-sm text-brand-silver/70 leading-relaxed pl-8">
              O utilizador pode gerir ou desativar os cookies através das definições do navegador.
            </p>
          </section>

          {/* Section 10 */}
          <section className="space-y-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-md bg-[#2563EB]/15 text-[#2563EB] text-[11px] font-mono font-bold border border-[#2563EB]/20">10</span>
              Partilha de dados
            </h3>
            <p className="text-sm text-brand-silver/70 leading-relaxed pl-8">
              A Metaloworld não vende nem cede os seus dados pessoais a terceiros.
            </p>
            <p className="text-sm text-brand-silver/70 leading-relaxed pl-8">Os dados apenas poderão ser partilhados quando necessário com:</p>
            <ul className="pl-12 space-y-1.5 text-sm text-brand-silver/70 list-none">
              {[
                'Prestadores de serviços tecnológicos;',
                'Plataformas publicitárias (Meta);',
                'Serviços de alojamento do website;',
                'Autoridades competentes quando exigido por lei.'
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-[#2563EB]/60 mt-2 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </section>

          {/* Section 11 */}
          <section className="space-y-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-md bg-[#2563EB]/15 text-[#2563EB] text-[11px] font-mono font-bold border border-[#2563EB]/20">11</span>
              Conservação dos dados
            </h3>
            <p className="text-sm text-brand-silver/70 leading-relaxed pl-8">
              Os dados pessoais serão conservados apenas pelo período necessário para cumprir as finalidades para as quais foram recolhidos ou enquanto existir obrigação legal.
            </p>
          </section>

          {/* Section 12 */}
          <section className="space-y-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-md bg-[#2563EB]/15 text-[#2563EB] text-[11px] font-mono font-bold border border-[#2563EB]/20">12</span>
              Direitos do titular dos dados
            </h3>
            <p className="text-sm text-brand-silver/70 leading-relaxed pl-8">Nos termos do RGPD, o titular dos dados pode, a qualquer momento:</p>
            <ul className="pl-12 space-y-1.5 text-sm text-brand-silver/70 list-none">
              {[
                'Solicitar acesso aos seus dados;',
                'Solicitar a retificação dos dados;',
                'Solicitar o apagamento dos dados;',
                'Solicitar a limitação do tratamento;',
                'Opor-se ao tratamento;',
                'Solicitar a portabilidade dos dados;',
                'Retirar o consentimento anteriormente concedido.'
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-[#2563EB]/60 mt-2 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </section>

          {/* Section 13 */}
          <section className="space-y-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-md bg-[#2563EB]/15 text-[#2563EB] text-[11px] font-mono font-bold border border-[#2563EB]/20">13</span>
              Segurança
            </h3>
            <p className="text-sm text-brand-silver/70 leading-relaxed pl-8">
              A Metaloworld adota medidas técnicas e organizativas adequadas para proteger os dados pessoais contra acessos não autorizados, perda, destruição ou divulgação.
            </p>
          </section>

          {/* Section 14 */}
          <section className="space-y-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-md bg-[#2563EB]/15 text-[#2563EB] text-[11px] font-mono font-bold border border-[#2563EB]/20">14</span>
              Contacto
            </h3>
            <p className="text-sm text-brand-silver/70 leading-relaxed pl-8">
              Para qualquer questão relacionada com esta Política de Privacidade ou com o tratamento dos seus dados pessoais, poderá contactar-nos através de:
            </p>
            <div className="pl-8 mt-3 p-4 rounded-xl bg-white/[0.03] border border-white/10 space-y-2">
              <p className="text-sm font-bold text-white">Metaloworld</p>
              <p className="text-sm text-brand-silver/70 flex items-center gap-2">
                <span>📧</span>
                <a href="mailto:suporte@metaloworld.com" className="text-[#2563EB] hover:underline">suporte@metaloworld.com</a>
              </p>
              <p className="text-sm text-brand-silver/70 flex items-center gap-2">
                <span>🌐</span>
                <a href="https://www.metaloworld.com" target="_blank" rel="noopener noreferrer" className="text-[#2563EB] hover:underline">https://www.metaloworld.com</a>
              </p>
            </div>
          </section>

        </div>

        {/* Footer of Modal */}
        <div className="flex items-center justify-between px-6 sm:px-8 py-4 border-t border-white/10 shrink-0">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-[9px] font-mono font-bold text-emerald-400 tracking-widest uppercase">
              RGPD Compliant
            </span>
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[9px] font-mono font-bold text-brand-silver tracking-widest uppercase">
              UE 2016/679
            </span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-[#2563EB]/15 border border-[#2563EB]/25 text-xs font-semibold text-[#2563EB] hover:bg-[#2563EB]/25 hover:border-[#2563EB]/40 transition-all duration-200"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};


interface FooterProps {
  settings: GeneralSettings;
  isPrivacyOpen?: boolean;
  onPrivacyToggle?: (isOpen: boolean) => void;
}

export const Footer: React.FC<FooterProps> = ({ settings, isPrivacyOpen: externalIsPrivacyOpen, onPrivacyToggle }) => {
  const currentYear = new Date().getFullYear();
  const [internalIsPrivacyOpen, setInternalIsPrivacyOpen] = useState(false);

  const isPrivacyOpen = externalIsPrivacyOpen !== undefined ? externalIsPrivacyOpen : internalIsPrivacyOpen;
  const setIsPrivacyOpen = (isOpen: boolean) => {
    if (onPrivacyToggle) {
      onPrivacyToggle(isOpen);
    } else {
      setInternalIsPrivacyOpen(isOpen);
    }
  };

  const links = {
    empresa: [
      { label: 'Início', href: '#home' },
      { label: 'Sobre Nós', href: '#sobre' },
      { label: 'Diferenciais', href: '#diferenciais' },
      { label: 'Como Funciona', href: '#como-funciona' },
      { label: 'Banco de Talentos', href: '#talentos' },
    ],
    servicos: [
      { label: 'Soldadura Industrial', href: '#servicos' },
      { label: 'Montagem Industrial', href: '#servicos' },
      { label: 'Serralharia Mecânica', href: '#servicos' },
      { label: 'Decapagem e Pintura', href: '#servicos' },
      { label: 'Instalações de TI', href: '#servicos' },
      { label: 'Reparação Naval', href: '#servicos' },
    ],
    legal: [
      { label: 'Parcerias Estratégicas', href: '#contato' },
      { label: 'Compliance & Segurança', href: '#contato' },
      { label: 'Política de Privacidade', href: '#', isPrivacy: true },
      { label: 'Código de Conduta', href: '#' },
    ],
  };

  return (
    <footer className="relative bg-brand-deep border-t border-brand-metallic/15 overflow-hidden">
      {/* Visual steel grid overlay */}
      <div className="absolute inset-0 z-0 opacity-[0.02] steel-brushed" />

      {/* Primary columns */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16 sm:py-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 text-left">
        
        {/* Brand Information Column */}
        <div className="lg:col-span-4 space-y-6">
          <a href="#home" className="flex items-center gap-3 xl:gap-4 group select-none">
            <img 
              src="/assets/images/logo-icon.webp" 
              alt="Metaloworld Logo" 
              title="METALOWORLD"
              className="w-[56px] h-[56px] lg:w-[64px] lg:h-[64px] object-contain transition-transform duration-300 group-hover:scale-105" 
            />
            <div className="flex flex-col">
              <span className="font-['Helvetica_Neue',_sans-serif] font-extrabold text-[21px] lg:text-[23px] tracking-tight leading-none text-white">
                METALOWORLD
              </span>
              <span className="text-[9.5px] lg:text-[10px] uppercase tracking-[0.3em] font-bold text-[#C4CCD4]/70 mt-1">
                Soluções Industriais
              </span>
            </div>
          </a>

          <p className="font-sans text-xs sm:text-sm text-brand-silver/70 leading-relaxed">
            Conectamos indústrias a equipas altamente qualificadas e soluções técnicas nas áreas de metalomecânica, soldadura, montagem, decapagem e reparação naval em toda a Europa.
          </p>

          {/* Phone & WhatsApp Contacts */}
          <div className="space-y-2.5 font-sans pt-1">
            <a 
              href="tel:+351923352934" 
              className="flex items-center gap-2 text-xs sm:text-sm text-brand-silver/85 hover:text-[#2563EB] transition-colors"
            >
              <IconRenderer name="Phone" size={14} className="text-[#2563EB]" />
              <span>Telefone: +351 923 352 934</span>
            </a>
            <a 
              href="https://wa.me/351923352934?text=Ol%C3%A1!%20Gostaria%20de%20obter%20mais%20informa%C3%A7%C3%B5es%20sobre%20os%20servi%C3%A7os%20da%20METALOWORLD."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs sm:text-sm text-brand-silver/85 hover:text-emerald-400 transition-colors"
            >
              <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" className="text-emerald-500">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.704 1.459h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              <span>WhatsApp: +351 923 352 934</span>
            </a>
          </div>

          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[9px] font-mono font-bold text-brand-silver tracking-widest uppercase">
              Atuação Internacional
            </span>
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[9px] font-mono font-bold text-brand-silver tracking-widest uppercase">
              ISO 9001:2015
            </span>
          </div>
        </div>

        {/* Quick Links Site Column */}
        <div className="lg:col-span-2 space-y-4">
          <h4 className="font-display font-bold text-xs uppercase tracking-widest text-[#f59e0b]">Empresa</h4>
          <ul className="space-y-2.5">
            {links.empresa.map((link, i) => (
              <li key={i}>
                <a href={link.href} className="font-sans text-xs sm:text-sm text-brand-silver/80 hover:text-white transition-colors">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Solutions Column */}
        <div className="lg:col-span-3 space-y-4">
          <h4 className="font-display font-bold text-xs uppercase tracking-widest text-brand-silver">Serviços Executados</h4>
          <ul className="space-y-2.5">
            {links.servicos.map((link, i) => (
              <li key={i}>
                <a href={link.href} className="font-sans text-xs sm:text-sm text-brand-silver/80 hover:text-white transition-colors">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Technical/Compliance Column */}
        <div className="lg:col-span-3 space-y-4">
          <h4 className="font-display font-bold text-xs uppercase tracking-widest text-brand-silver font-sans">Legal &amp; Parcerias</h4>
          <ul className="space-y-2.5">
            {links.legal.map((link, i) => (
              <li key={i}>
                {'isPrivacy' in link && link.isPrivacy ? (
                  <button
                    onClick={() => setIsPrivacyOpen(true)}
                    className="font-sans text-xs sm:text-sm text-brand-silver/80 hover:text-white transition-colors cursor-pointer bg-transparent border-none p-0 text-left"
                    id="privacy-policy-trigger"
                  >
                    {link.label}
                  </button>
                ) : (
                  <a href={link.href} className="font-sans text-xs sm:text-sm text-brand-silver/80 hover:text-white transition-colors">
                    {link.label}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>

      </div>

      {/* Core certification seals & regulatory highlights */}
      <div className="relative z-10 border-t border-brand-metallic/10 bg-[#020a14] py-8 px-6 text-left">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <p className="font-sans text-[11px] sm:text-xs text-brand-silver/50 leading-relaxed max-w-2xl">
            Aviso de Conformidade: Todos os serviços são executados por equipas qualificadas sob rígidas diretrizes europeias de segurança no trabalho e normas técnicas aplicáveis de qualidade industrial.
          </p>
          
          {/* Regulatory certifications logos as inline tags */}
          <div className="flex gap-2.5">
            <span className="px-2 py-1 bg-white/5 rounded border border-white/10 text-[9px] font-mono text-brand-silver tracking-wider uppercase">
              ASME CERTIFIED
            </span>
            <span className="px-2 py-1 bg-white/5 rounded border border-white/10 text-[9px] font-mono text-brand-silver tracking-wider uppercase">
              EN COMPLIANT
            </span>
          </div>
        </div>
      </div>

      {/* Deep Copyright section */}
      <div className="relative z-10 py-6 border-t border-brand-metallic/5 bg-[#01060e] px-6 text-left">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-sans text-[11px] sm:text-xs text-[#B8C4D0]/40">
            &copy; {currentYear} METALOWORLD. Todos os direitos reservados.
          </p>
        </div>
      </div>

      {/* Privacy Policy Modal */}
      <PrivacyPolicyModal isOpen={isPrivacyOpen} onClose={() => setIsPrivacyOpen(false)} />
    </footer>
  );
};
