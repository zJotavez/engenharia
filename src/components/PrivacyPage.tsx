import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { IconRenderer } from './IconRenderer.tsx';
import { GeneralSettings } from '../types.ts';

interface PrivacyPageProps {
  settings: GeneralSettings;
  onBackToHome: () => void;
}

export const PrivacyPage: React.FC<PrivacyPageProps> = ({ settings, onBackToHome }) => {
  useEffect(() => {
    document.title = "Política de Privacidade | METALOWORLD";
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const sections = [
    {
      id: 1,
      title: 'Responsável pelo tratamento dos dados',
      content: (
        <div className="space-y-3">
          <p className="text-sm sm:text-base text-brand-silver/80 leading-relaxed">
            A Metaloworld é responsável pelo tratamento dos dados pessoais recolhidos através do website, formulários de contacto, campanhas publicitárias e outros meios de comunicação.
          </p>
          <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 space-y-2 font-sans">
            <p className="text-sm text-brand-silver/80"><span className="text-white font-semibold">Website:</span> <a href="https://www.metaloworld.com" target="_blank" rel="noopener noreferrer" className="text-[#2563EB] hover:underline">https://www.metaloworld.com</a></p>
            <p className="text-sm text-brand-silver/80"><span className="text-white font-semibold">E-mail:</span> <a href={`mailto:${settings.email || 'suporte@metaloworld.com'}`} className="text-[#2563EB] hover:underline">{settings.email || 'suporte@metaloworld.com'}</a></p>
          </div>
        </div>
      )
    },
    {
      id: 2,
      title: 'Que dados recolhemos?',
      content: (
        <div className="space-y-3">
          <p className="text-sm sm:text-base text-brand-silver/80 leading-relaxed">Podemos recolher os seguintes dados pessoais:</p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-sm text-brand-silver/80">
            {[
              'Nome completo',
              'Empresa / Organização',
              'Endereço de e-mail',
              'Número de telefone / WhatsApp',
              'Informações fornecidas em pedidos de orçamento',
              'Serviço pretendido',
              'Endereço IP',
              'Dados de navegação no website',
              'Informações recolhidas através de cookies'
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-2.5 p-2.5 rounded-lg bg-white/[0.02] border border-white/5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB] shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )
    },
    {
      id: 3,
      title: 'Finalidade da recolha dos dados',
      content: (
        <div className="space-y-3">
          <p className="text-sm sm:text-base text-brand-silver/80 leading-relaxed">Os dados pessoais são utilizados para:</p>
          <ul className="space-y-2 text-sm text-brand-silver/80">
            {[
              'Responder a pedidos de orçamento;',
              'Entrar em contacto com potenciais clientes;',
              'Prestar informações sobre os nossos serviços de engenharia e soluções industriais;',
              'Elaborar propostas comerciais customizadas;',
              'Melhorar continuamente os nossos serviços;',
              'Cumprir obrigações legais e regulamentares;',
              'Efetuar ações de marketing, mediante consentimento quando exigido por lei.'
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB] mt-2 shrink-0" />
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )
    },
    {
      id: 4,
      title: 'Base legal',
      content: (
        <div className="space-y-3">
          <p className="text-sm sm:text-base text-brand-silver/80 leading-relaxed">O tratamento dos dados é realizado com base em:</p>
          <ul className="space-y-2 text-sm text-brand-silver/80">
            {[
              'Consentimento do titular dos dados;',
              'Execução de diligências pré-contratuais a pedido do utilizador;',
              'Cumprimento de obrigações legais;',
              'Interesse legítimo da Metaloworld na gestão das suas relações comerciais.'
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB] mt-2 shrink-0" />
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )
    },
    {
      id: 5,
      title: 'Meta (Facebook e Instagram)',
      content: (
        <p className="text-sm sm:text-base text-brand-silver/80 leading-relaxed">
          Quando preenche um formulário através dos anúncios da Meta (Facebook ou Instagram), os seus dados são enviados à Metaloworld para que possamos responder ao seu pedido de contacto ou orçamento. Os dados recolhidos serão utilizados exclusivamente para esse fim.
        </p>
      )
    },
    {
      id: 6,
      title: 'WhatsApp',
      content: (
        <p className="text-sm sm:text-base text-brand-silver/80 leading-relaxed">
          Ao contactar a Metaloworld através do WhatsApp, os seus dados serão tratados apenas para responder ao seu pedido de informação, orçamento ou assistência técnica.
        </p>
      )
    },
    {
      id: 7,
      title: 'Google Analytics',
      content: (
        <p className="text-sm sm:text-base text-brand-silver/80 leading-relaxed">
          O nosso website pode utilizar o Google Analytics para compreender a forma como os visitantes utilizam o website e melhorar continuamente a experiência do utilizador. Estas informações são recolhidas de forma agregada e anónima, não identificando diretamente o utilizador.
        </p>
      )
    },
    {
      id: 8,
      title: 'Meta Pixel',
      content: (
        <p className="text-sm sm:text-base text-brand-silver/80 leading-relaxed">
          O website poderá utilizar o Meta Pixel para medir o desempenho das campanhas publicitárias e apresentar anúncios mais relevantes aos utilizadores interessados em soluções industriais.
        </p>
      )
    },
    {
      id: 9,
      title: 'Cookies',
      content: (
        <div className="space-y-3">
          <p className="text-sm sm:text-base text-brand-silver/80 leading-relaxed">O website utiliza cookies para:</p>
          <ul className="space-y-2 text-sm text-brand-silver/80">
            {[
              'Melhorar a experiência de navegação;',
              'Medir estatísticas anónimas de utilização;',
              'Personalizar conteúdos institucionais;',
              'Avaliar o desempenho das campanhas publicitárias.'
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB] mt-2 shrink-0" />
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
          <p className="text-xs text-brand-silver/60 pt-2">
            O utilizador pode gerir ou desativar os cookies a qualquer momento através das definições do seu navegador.
          </p>
        </div>
      )
    },
    {
      id: 10,
      title: 'Partilha de dados',
      content: (
        <div className="space-y-3">
          <p className="text-sm sm:text-base text-brand-silver/80 leading-relaxed">
            A Metaloworld não vende nem cede os seus dados pessoais a terceiros para fins comerciais.
          </p>
          <p className="text-sm text-brand-silver/80">Os dados apenas poderão ser partilhados quando estritamente necessário com:</p>
          <ul className="space-y-2 text-sm text-brand-silver/80">
            {[
              'Prestadores de serviços tecnológicos e alojamento;',
              'Plataformas publicitárias (Meta, Google);',
              'Autoridades competentes quando exigido por lei.'
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB] mt-2 shrink-0" />
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )
    },
    {
      id: 11,
      title: 'Conservação dos dados',
      content: (
        <p className="text-sm sm:text-base text-brand-silver/80 leading-relaxed">
          Os dados pessoais serão conservados apenas pelo período estritamente necessário para cumprir as finalidades para as quais foram recolhidos ou enquanto existir obrigação legal ou regulamentar de conservação.
        </p>
      )
    },
    {
      id: 12,
      title: 'Direitos do titular dos dados',
      content: (
        <div className="space-y-3">
          <p className="text-sm sm:text-base text-brand-silver/80 leading-relaxed">Nos termos do RGPD, o titular dos dados pode, a qualquer momento, exercer os seguintes direitos:</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-sm text-brand-silver/80">
            {[
              'Acesso aos seus dados pessoais',
              'Retificação de dados incorretos',
              'Apagamento dos dados (direito ao esquecimento)',
              'Limitação do tratamento',
              'Oposição ao tratamento',
              'Portabilidade dos dados',
              'Retirada de consentimento a qualquer momento'
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2.5 p-2.5 rounded-lg bg-white/[0.02] border border-white/5">
                <IconRenderer name="Check" size={14} className="text-emerald-400 shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      )
    },
    {
      id: 13,
      title: 'Segurança',
      content: (
        <p className="text-sm sm:text-base text-brand-silver/80 leading-relaxed">
          A Metaloworld adota medidas técnicas e organizativas adequadas (incluindo encriptação SSL/TLS, firewalls e controlos de acesso) para proteger os dados pessoais contra acessos não autorizados, perda, destruição ou divulgação acidental.
        </p>
      )
    },
    {
      id: 14,
      title: 'Contacto para questões de privacidade',
      content: (
        <div className="space-y-4">
          <p className="text-sm sm:text-base text-brand-silver/80 leading-relaxed">
            Para exercer os seus direitos ou para esclarecer qualquer questão relacionada com esta Política de Privacidade, entre em contacto direto com a nossa equipa de conformidade:
          </p>
          <div className="p-5 rounded-2xl bg-gradient-to-r from-[#0a1c36] to-[#08172b] border border-[#2563EB]/30 space-y-3">
            <h4 className="font-display font-bold text-white text-base">METALOWORLD — Soluções Industriais</h4>
            <div className="space-y-2 text-sm text-brand-silver/80">
              <p className="flex items-center gap-3">
                <IconRenderer name="Mail" size={16} className="text-[#2563EB]" />
                <a href={`mailto:${settings.email || 'suporte@metaloworld.com'}`} className="text-white hover:text-[#2563EB] font-medium transition-colors">
                  {settings.email || 'suporte@metaloworld.com'}
                </a>
              </p>
              <p className="flex items-center gap-3">
                <IconRenderer name="Phone" size={16} className="text-[#2563EB]" />
                <a href={`tel:${settings.phoneRaw || '+351923352934'}`} className="text-white hover:text-[#2563EB] font-medium transition-colors">
                  {settings.phone || '+351 923 352 934'}
                </a>
              </p>
              <p className="flex items-center gap-3">
                <IconRenderer name="Globe2" size={16} className="text-[#2563EB]" />
                <a href="https://www.metaloworld.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#2563EB] font-medium transition-colors">
                  https://www.metaloworld.com
                </a>
              </p>
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="relative min-h-screen bg-[#050f1e] text-white selection:bg-[#2563EB]/40 selection:text-white overflow-x-hidden">
      
      {/* Background ambient lighting */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-[#1A5296] opacity-15 rounded-full blur-[160px]" />
        <div className="absolute top-[40%] right-[-10%] w-[500px] h-[500px] bg-[#2563EB] opacity-10 rounded-full blur-[150px]" />
        <div className="absolute inset-0 opacity-[0.03] steel-brushed" />
      </div>

      {/* Header bar with Back Button */}
      <header className="sticky top-0 z-50 py-4 bg-[#050f1e]/90 backdrop-blur-md border-b border-white/10 shadow-lg">
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          <button
            onClick={onBackToHome}
            className="flex items-center gap-2.5 px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-brand-silver hover:text-white transition-all text-xs font-bold uppercase tracking-wider group"
            id="privacy-back-button"
          >
            <IconRenderer name="ArrowLeft" size={16} className="group-hover:-translate-x-1 transition-transform" />
            <span>Voltar ao Início</span>
          </button>

          <a href="/" onClick={(e) => { e.preventDefault(); onBackToHome(); }} className="flex items-center gap-3">
            <img src="/assets/images/logo-icon.webp" alt="Metaloworld" className="w-10 h-10 object-contain" />
            <span className="font-['Helvetica_Neue',_sans-serif] font-extrabold text-lg tracking-tight text-white hidden sm:inline">
              METALOWORLD
            </span>
          </a>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="relative z-10 max-w-4xl mx-auto px-6 py-12 lg:py-20 text-left">
        
        {/* Page Title & Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-4 mb-12 border-b border-white/10 pb-8"
        >
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
              <IconRenderer name="Shield" size={14} />
              RGPD COMPLIANT
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-brand-silver uppercase tracking-wider">
              UE 2016/679
            </span>
          </div>

          <h1 className="font-['Helvetica_Neue',_sans-serif] font-extrabold text-3xl sm:text-5xl text-white tracking-tight uppercase">
            Política de <span className="text-[#2563EB]">Privacidade</span>
          </h1>

          <p className="text-xs sm:text-sm text-brand-silver/60 font-mono">
            Última atualização: 04 de agosto de 2026 • METALOWORLD Soluções Industriais
          </p>

          <p className="text-base text-brand-silver/90 leading-relaxed pt-2">
            A Metaloworld respeita a privacidade de todos os utilizadores e clientes, comprometendo-se rigorosamente a proteger os seus dados pessoais em conformidade com o Regulamento (UE) 2016/679 (RGPD) e a legislação europeia e portuguesa aplicável.
          </p>
        </motion.div>

        {/* Section Cards */}
        <div className="space-y-8">
          {sections.map((section, idx) => (
            <motion.section
              key={section.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.4, delay: idx * 0.03 }}
              className="p-6 sm:p-8 rounded-2xl bg-brand-deep/80 border border-white/10 hover:border-[#2563EB]/40 transition-all shadow-xl space-y-4"
            >
              <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-3">
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-[#2563EB]/20 text-[#2563EB] text-xs font-mono font-extrabold border border-[#2563EB]/30 shrink-0">
                  {section.id}
                </span>
                <span>{section.title}</span>
              </h2>

              <div className="pl-0 sm:pl-11">
                {section.content}
              </div>
            </motion.section>
          ))}
        </div>

        {/* Bottom Back Button */}
        <div className="pt-12 text-center">
          <button
            onClick={onBackToHome}
            className="px-8 py-4 rounded-xl bg-[#2563EB] hover:bg-[#1d4ed8] text-white font-sans font-bold text-sm uppercase tracking-wider transition-all inline-flex items-center gap-3 shadow-xl shadow-[#2563EB]/20 hover:scale-105 active:scale-95"
          >
            <IconRenderer name="ArrowLeft" size={18} />
            <span>Voltar à Página Principal</span>
          </button>
        </div>

      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 bg-[#020a14] py-8 px-6 text-center text-xs text-brand-silver/50">
        <p>&copy; {new Date().getFullYear()} METALOWORLD. Todos os direitos reservados. Conformidade com o Regulamento Geral sobre a Proteção de Dados (RGPD).</p>
      </footer>

    </div>
  );
};
