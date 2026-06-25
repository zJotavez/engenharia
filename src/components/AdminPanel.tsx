import React, { useState, useEffect } from 'react';
import { 
  Save, 
  LogOut, 
  Plus, 
  Trash2, 
  Briefcase, 
  FileText, 
  Clock, 
  BarChart2, 
  MessageSquare,
  Lock,
  Settings,
  Upload,
  Image as ImageIcon
} from 'lucide-react';
import { Service, Project, TimelineItem, StatItem, Testimonial, GeneralSettings } from '../types.ts';

// Initial data as fallback
import { SERVICES, PROJECTS, TIMELINE_ITEMS, STATS, TESTIMONIALS, GENERAL_SETTINGS } from '../data.ts';

interface ImageUploaderProps {
  currentValue: string;
  onUploadSuccess: (url: string) => void;
  password: string;
  label?: string;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ currentValue, onUploadSuccess, password, label }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setError('');
    setSuccess(false);

    const formData = new FormData();
    formData.append('image', file);
    formData.append('password', password);

    try {
      const response = await fetch('/api/upload.php', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (response.ok && result.status === 'success') {
        onUploadSuccess(result.url);
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      } else {
        setError(result.message || 'Erro ao fazer upload da imagem.');
      }
    } catch (err) {
      console.error('Upload error:', err);
      setError('Erro de rede ou permissão ao tentar enviar a imagem.');
    } finally {
      setIsUploading(false);
      e.target.value = '';
    }
  };

  return (
    <div className="space-y-1.5 mt-1">
      {label && <span className="block text-[10px] font-mono font-bold uppercase tracking-wider text-gray-400 mb-1">{label}</span>}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
        {currentValue ? (
          <div className="relative w-12 h-12 rounded border border-blue-500/20 bg-[#0a1e3c]/40 overflow-hidden flex-shrink-0 flex items-center justify-center">
            <img 
              src={currentValue} 
              alt="Preview" 
              className="w-full h-full object-cover" 
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }} 
            />
          </div>
        ) : (
          <div className="w-12 h-12 rounded border border-dashed border-blue-500/20 bg-[#0a1e3c]/20 flex items-center justify-center flex-shrink-0">
            <ImageIcon className="text-blue-500/40" size={18} />
          </div>
        )}
        <div className="flex-1 flex gap-2 items-center">
          <label className="flex items-center gap-1.5 bg-[#0a1e3c]/60 border border-blue-500/20 hover:border-blue-500/40 text-blue-400 hover:text-white px-3 py-2 rounded text-xs font-bold uppercase cursor-pointer transition-all select-none flex-shrink-0">
            <Upload size={12} />
            {isUploading ? 'Enviando...' : 'Carregar'}
            <input 
              type="file" 
              accept="image/*" 
              onChange={handleFileChange} 
              className="hidden" 
              disabled={isUploading}
            />
          </label>
          <input
            type="text"
            value={currentValue}
            onChange={(e) => onUploadSuccess(e.target.value)}
            placeholder="URL ou caminho relativo"
            className="flex-1 min-w-0 bg-[#0a1e3c]/60 border border-blue-500/10 rounded px-3 py-2 text-xs focus:outline-none focus:border-blue-500/40 text-white font-mono"
          />
        </div>
      </div>
      {error && <p className="text-red-500 text-[10px] font-semibold mt-1">{error}</p>}
      {success && <p className="text-emerald-500 text-[10px] font-semibold mt-1">Upload concluído!</p>}
    </div>
  );
};

interface AdminPanelProps {
  onClose: () => void;
  generalSettings: GeneralSettings;
  setGeneralSettings: (settings: GeneralSettings) => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ onClose, generalSettings, setGeneralSettings }) => {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [activeTab, setActiveTab] = useState<'general' | 'services' | 'projects' | 'timeline' | 'stats' | 'testimonials'>('general');
  
  // App states for editing
  const [services, setServices] = useState<Service[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [timeline, setTimeline] = useState<TimelineItem[]>([]);
  const [stats, setStats] = useState<StatItem[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [general, setGeneral] = useState<GeneralSettings>(generalSettings);

  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<{ type: 'success' | 'error' | ''; message: string }>({ type: '', message: '' });

  // Load data from server or use static fallback
  useEffect(() => {
    fetch('/data.json')
      .then(res => {
        if (res.ok) return res.json();
        throw new Error('Using local fallback data');
      })
      .then(data => {
        setServices(data.services || SERVICES);
        setProjects(data.projects || PROJECTS);
        setTimeline(data.timeline || TIMELINE_ITEMS);
        setStats(data.stats || STATS);
        setTestimonials(data.testimonials || TESTIMONIALS);
        setGeneral(data.general || GENERAL_SETTINGS);
      })
      .catch(err => {
        console.warn('Could not fetch data.json, using local static data:', err);
        setServices(SERVICES);
        setProjects(PROJECTS);
        setTimeline(TIMELINE_ITEMS);
        setStats(STATS);
        setTestimonials(TESTIMONIALS);
      });

    // Check if password was already saved in session
    const savedPass = localStorage.getItem('mv_admin_pass');
    if (savedPass) {
      setPassword(savedPass);
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === '#admiguel1817A') {
      setIsAuthenticated(true);
      setLoginError('');
      localStorage.setItem('mv_admin_pass', password);
    } else {
      setLoginError('Senha incorreta! Digite a senha administrativa correta.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPassword('');
    localStorage.removeItem('mv_admin_pass');
    onClose();
  };

  const handleSaveAll = async () => {
    setIsSaving(true);
    setSaveStatus({ type: '', message: '' });

    const payload = {
      password,
      data: {
        services,
        projects,
        timeline,
        stats,
        testimonials,
        general
      }
    };

    try {
      const response = await fetch('/api/save.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const result = await response.json();

      if (response.ok && result.status === 'success') {
        setSaveStatus({ type: 'success', message: 'Todas as alterações foram publicadas com sucesso na Hostinger!' });
        setGeneralSettings(general); // Atualiza o estado global no App.tsx
        setTimeout(() => setSaveStatus({ type: '', message: '' }), 5000);
      } else {
        setSaveStatus({ type: 'error', message: result.message || 'Erro ao publicar dados no servidor.' });
      }
    } catch (error) {
      console.error('Error saving data:', error);
      setSaveStatus({ type: 'error', message: 'Erro de rede ou permissão. O servidor aceita requisições PHP?' });
    } finally {
      setIsSaving(false);
    }
  };

  // Helper functions to manage items
  const updateGeneralField = (field: keyof GeneralSettings, value: string) => {
    setGeneral(prev => ({ ...prev, [field]: value }));
  };

  const updateService = (index: number, field: keyof Service, value: any) => {
    const updated = [...services];
    updated[index] = { ...updated[index], [field]: value };
    setServices(updated);
  };

  const addService = () => {
    const newService: Service = {
      id: `srv-${Date.now()}`,
      title: 'Novo Serviço',
      description: 'Descrição curta do serviço.',
      detailedDescription: 'Descrição detalhada sobre o serviço para o modal.',
      features: ['Característica 1', 'Característica 2'],
      iconName: 'Layers',
      image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=1200',
      category: 'engenharia'
    };
    setServices([...services, newService]);
  };

  const deleteService = (index: number) => {
    if (confirm('Tem certeza de que deseja excluir este serviço?')) {
      setServices(services.filter((_, i) => i !== index));
    }
  };

  const updateProject = (index: number, field: keyof Project, value: any) => {
    const updated = [...projects];
    updated[index] = { ...updated[index], [field]: value };
    setProjects(updated);
  };

  const addProject = () => {
    const newProj: Project = {
      id: `p-${Date.now()}`,
      title: 'Novo Projeto Industrial',
      category: 'Soldadura',
      description: 'Resumo executivo do projeto.',
      client: 'Nome do Cliente S.A.',
      service: 'Serviço Prestado',
      location: 'Lisboa - Portugal',
      year: 'Apto para Execução',
      gallery: ['https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=1200'],
      keySpec: 'Especificação Chave (Ex: 500 Toneladas)'
    };
    setProjects([...projects, newProj]);
  };

  const deleteProject = (index: number) => {
    if (confirm('Tem certeza de que deseja excluir este projeto?')) {
      setProjects(projects.filter((_, i) => i !== index));
    }
  };

  const updateTimeline = (index: number, field: keyof TimelineItem, value: any) => {
    const updated = [...timeline];
    updated[index] = { ...updated[index], [field]: value };
    setTimeline(updated);
  };

  const addTimeline = () => {
    const newItem: TimelineItem = {
      year: `Fase ${timeline.length + 1}`,
      title: 'Nova Fase Estrutural',
      description: 'Descreva as metas e conquistas desta fase.',
      milestone: false
    };
    setTimeline([...timeline, newItem]);
  };

  const deleteTimeline = (index: number) => {
    if (confirm('Tem certeza de que deseja excluir esta fase?')) {
      setTimeline(timeline.filter((_, i) => i !== index));
    }
  };

  const updateStat = (index: number, field: keyof StatItem, value: any) => {
    const updated = [...stats];
    updated[index] = { ...updated[index], [field]: value };
    setStats(updated);
  };

  const updateTestimonial = (index: number, field: keyof Testimonial, value: any) => {
    const updated = [...testimonials];
    updated[index] = { ...updated[index], [field]: value };
    setTestimonials(updated);
  };

  const addTestimonial = () => {
    const newTest: Testimonial = {
      id: `t-${Date.now()}`,
      name: 'Nome do Executivo',
      role: 'Cargo',
      company: 'Nome da Empresa S.A.',
      feedback: 'Depoimento ou feedback sobre a parceria.',
      avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=120',
      rating: 5
    };
    setTestimonials([...testimonials, newTest]);
  };

  const deleteTestimonial = (index: number) => {
    if (confirm('Tem certeza de que deseja excluir este depoimento?')) {
      setTestimonials(testimonials.filter((_, i) => i !== index));
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#050f1e] flex items-center justify-center px-6 relative overflow-hidden text-white">
        <div className="absolute top-[-20%] right-[-20%] w-[600px] h-[600px] bg-[#1A5296] opacity-15 rounded-full blur-[140px]" />
        <div className="absolute bottom-[-20%] left-[-20%] w-[600px] h-[600px] bg-[#2563EB] opacity-10 rounded-full blur-[140px]" />
        
        <div className="max-w-md w-full glass-panel p-8 sm:p-10 rounded-2xl border border-blue-500/20 shadow-2xl relative z-10">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-blue-600/10 border border-blue-500/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Lock className="text-blue-500" size={28} />
            </div>
            <h1 className="font-['Helvetica_Neue',_sans-serif] font-black text-2xl tracking-tight uppercase">
              MV Engenharia
            </h1>
            <p className="text-xs font-mono text-gray-400 mt-1 uppercase tracking-wider">
              Painel de Administração Estático
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-xs font-mono font-bold uppercase tracking-wider text-gray-300 mb-2">
                Senha Administrativa
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Insira a senha do site"
                className="w-full bg-[#0a1e3c]/60 border border-blue-500/20 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-blue-500/60 transition-all font-mono"
                required
              />
              {loginError && (
                <p className="text-red-500 text-xs mt-2 font-medium">{loginError}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-3 text-sm font-semibold tracking-wide uppercase transition-colors shadow-lg shadow-blue-600/20 cursor-pointer"
            >
              Entrar no Painel
            </button>
          </form>

          <div className="mt-8 text-center">
            <button 
              onClick={onClose} 
              className="text-xs text-gray-400 hover:text-white transition-colors cursor-pointer"
            >
              ← Voltar para o Site
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050f1e] text-white flex flex-col font-sans">
      {/* Header do Painel */}
      <header className="bg-[#071B35]/80 border-b border-blue-500/10 backdrop-blur-md px-6 py-4 sticky top-0 z-40 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600/15 border border-blue-500/20 rounded-xl flex items-center justify-center">
            <Lock className="text-blue-500" size={18} />
          </div>
          <div>
            <h2 className="font-bold text-sm tracking-tight leading-none">MV ENGENHARIA</h2>
            <span className="text-[10px] font-mono text-blue-400 uppercase tracking-widest">Painel Administrativo</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleSaveAll}
            disabled={isSaving}
            className={`flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 text-white px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors shadow-lg cursor-pointer ${isSaving ? 'animate-pulse' : ''}`}
          >
            <Save size={14} />
            {isSaving ? 'Publicando...' : 'Salvar Alterações'}
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-600/15 border border-red-500/20 hover:bg-red-600 text-red-400 hover:text-white px-3 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
          >
            <LogOut size={14} />
            Sair
          </button>
        </div>
      </header>

      {/* Mensagem de Feedback de Publicação */}
      {saveStatus.message && (
        <div className={`p-4 text-center text-xs font-mono tracking-wide ${saveStatus.type === 'success' ? 'bg-emerald-600/20 text-emerald-400 border-b border-emerald-500/20' : 'bg-rose-600/20 text-rose-400 border-b border-rose-500/20'}`}>
          {saveStatus.message}
        </div>
      )}

      {/* Main Body */}
      <div className="flex flex-col lg:flex-row flex-1">
        {/* Menu Lateral */}
        <aside className="w-full lg:w-64 bg-[#071b35]/30 border-r border-blue-500/5 p-6 flex flex-col gap-2">
          <button
            onClick={() => setActiveTab('general')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${activeTab === 'general' ? 'bg-blue-600/15 border border-blue-500/35 text-white' : 'text-gray-400 hover:text-white hover:bg-white/5 border border-transparent'}`}
          >
            <Settings size={16} />
            Configurações Gerais
          </button>
          <button
            onClick={() => setActiveTab('services')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${activeTab === 'services' ? 'bg-blue-600/15 border border-blue-500/35 text-white' : 'text-gray-400 hover:text-white hover:bg-white/5 border border-transparent'}`}
          >
            <Briefcase size={16} />
            Serviços ({services.length})
          </button>
          <button
            onClick={() => setActiveTab('projects')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${activeTab === 'projects' ? 'bg-blue-600/15 border border-blue-500/35 text-white' : 'text-gray-400 hover:text-white hover:bg-white/5 border border-transparent'}`}
          >
            <FileText size={16} />
            Projetos ({projects.length})
          </button>
          <button
            onClick={() => setActiveTab('timeline')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${activeTab === 'timeline' ? 'bg-blue-600/15 border border-blue-500/35 text-white' : 'text-gray-400 hover:text-white hover:bg-white/5 border border-transparent'}`}
          >
            <Clock size={16} />
            Fases de Estruturação ({timeline.length})
          </button>
          <button
            onClick={() => setActiveTab('stats')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${activeTab === 'stats' ? 'bg-blue-600/15 border border-blue-500/35 text-white' : 'text-gray-400 hover:text-white hover:bg-white/5 border border-transparent'}`}
          >
            <BarChart2 size={16} />
            Estatísticas ({stats.length})
          </button>
          <button
            onClick={() => setActiveTab('testimonials')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${activeTab === 'testimonials' ? 'bg-blue-600/15 border border-blue-500/35 text-white' : 'text-gray-400 hover:text-white hover:bg-white/5 border border-transparent'}`}
          >
            <MessageSquare size={16} />
            Depoimentos ({testimonials.length})
          </button>

          <div className="mt-auto pt-6 border-t border-blue-500/5 hidden lg:block text-[10px] text-gray-500 font-mono">
            <p>MV Engenharia &copy; {new Date().getFullYear()}</p>
            <p className="mt-1">Dica: Lembre-se de clicar em "Salvar Alterações" no topo para aplicar as mudanças ao site.</p>
          </div>
        </aside>

        {/* Área de Edição */}
        <main className="flex-1 p-6 sm:p-10 max-h-[calc(100vh-73px)] overflow-y-auto">
          
          {/* TAB 0: CONFIGURAÇÕES GERAIS */}
          {activeTab === 'general' && (
            <div className="space-y-6">
              <div className="border-b border-blue-500/10 pb-4 mb-6">
                <h3 className="font-extrabold text-lg uppercase">Configurações Gerais do Site</h3>
                <p className="text-xs text-gray-400">Edite as informações básicas do site, como textos do Hero (Dobra inicial), dados de contato e informações institucionais.</p>
              </div>

              {/* Seção 1: Dobra Inicial (Hero) */}
              <div className="glass-panel p-6 rounded-xl border border-blue-500/10 space-y-4">
                <h4 className="font-mono text-xs tracking-wider text-blue-500 font-bold uppercase border-b border-blue-500/5 pb-2">1. Dobra Inicial (Hero)</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-gray-400 mb-1">Título do Hero (Início)</label>
                    <input
                      type="text"
                      value={general.heroTitle || ''}
                      onChange={(e) => updateGeneralField('heroTitle', e.target.value)}
                      placeholder="Ex: Engenharia e"
                      className="w-full bg-[#0a1e3c]/60 border border-blue-500/10 rounded px-3 py-2 text-xs focus:outline-none focus:border-blue-500/40 text-white font-sans"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-gray-400 mb-1">Destaque do Hero (Texto Azul)</label>
                    <input
                      type="text"
                      value={general.heroHighlight || ''}
                      onChange={(e) => updateGeneralField('heroHighlight', e.target.value)}
                      placeholder="Ex: Estruturas Metálicas"
                      className="w-full bg-[#0a1e3c]/60 border border-blue-500/10 rounded px-3 py-2 text-xs focus:outline-none focus:border-blue-500/40 text-white font-sans"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-gray-400 mb-1">Texto do Botão (CTA)</label>
                    <input
                      type="text"
                      value={general.heroCtaText || ''}
                      onChange={(e) => updateGeneralField('heroCtaText', e.target.value)}
                      className="w-full bg-[#0a1e3c]/60 border border-blue-500/10 rounded px-3 py-2 text-xs focus:outline-none focus:border-blue-500/40 text-white font-sans"
                    />
                  </div>
                  <div>
                    <ImageUploader
                      label="Imagem do Hero (Dobra Inicial)"
                      currentValue={general.heroImage || ''}
                      onUploadSuccess={(url) => updateGeneralField('heroImage', url)}
                      password={password}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-gray-400 mb-1">Subtítulo do Hero</label>
                  <textarea
                    value={general.heroSubtitle || ''}
                    onChange={(e) => updateGeneralField('heroSubtitle', e.target.value)}
                    rows={3}
                    className="w-full bg-[#0a1e3c]/60 border border-blue-500/10 rounded px-3 py-2 text-xs focus:outline-none focus:border-blue-500/40 text-white"
                  />
                </div>
              </div>

              {/* Seção 2: Contatos de Negócios */}
              <div className="glass-panel p-6 rounded-xl border border-blue-500/10 space-y-4">
                <h4 className="font-mono text-xs tracking-wider text-blue-500 font-bold uppercase border-b border-blue-500/5 pb-2">2. Canais de Contato</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-gray-400 mb-1">Telefone Exibido (Header/Footer/Contato)</label>
                    <input
                      type="text"
                      value={general.phone || ''}
                      onChange={(e) => updateGeneralField('phone', e.target.value)}
                      placeholder="Ex: +55 (85) 99999-0000"
                      className="w-full bg-[#0a1e3c]/60 border border-blue-500/10 rounded px-3 py-2 text-xs focus:outline-none focus:border-blue-500/40 text-white font-sans"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-gray-400 mb-1">Telefone Apenas Números (WhatsApp / Links tel:)</label>
                    <input
                      type="text"
                      value={general.phoneRaw || ''}
                      onChange={(e) => updateGeneralField('phoneRaw', e.target.value)}
                      placeholder="Ex: +5585999990000"
                      className="w-full bg-[#0a1e3c]/60 border border-blue-500/10 rounded px-3 py-2 text-xs focus:outline-none focus:border-blue-500/40 text-white font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-gray-400 mb-1">E-mail Principal (Projetos)</label>
                    <input
                      type="email"
                      value={general.email || ''}
                      onChange={(e) => updateGeneralField('email', e.target.value)}
                      className="w-full bg-[#0a1e3c]/60 border border-blue-500/10 rounded px-3 py-2 text-xs focus:outline-none focus:border-blue-500/40 text-white font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-gray-400 mb-1">E-mail Secundário (Comercial)</label>
                    <input
                      type="email"
                      value={general.emailComercial || ''}
                      onChange={(e) => updateGeneralField('emailComercial', e.target.value)}
                      className="w-full bg-[#0a1e3c]/60 border border-blue-500/10 rounded px-3 py-2 text-xs focus:outline-none focus:border-blue-500/40 text-white font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* Seção 3: Localização e Endereço */}
              <div className="glass-panel p-6 rounded-xl border border-blue-500/10 space-y-4">
                <h4 className="font-mono text-xs tracking-wider text-blue-500 font-bold uppercase border-b border-blue-500/5 pb-2">3. Endereço e Localização</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-gray-400 mb-1">Logradouro / Avenida / Número</label>
                    <input
                      type="text"
                      value={general.address || ''}
                      onChange={(e) => updateGeneralField('address', e.target.value)}
                      placeholder="Ex: Av. Francisco Sá, 5100 — Barra do Ceará"
                      className="w-full bg-[#0a1e3c]/60 border border-blue-500/10 rounded px-3 py-2 text-xs focus:outline-none focus:border-blue-500/40 text-white font-sans"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-gray-400 mb-1">Cidade, Estado e CEP</label>
                    <input
                      type="text"
                      value={general.addressCity || ''}
                      onChange={(e) => updateGeneralField('addressCity', e.target.value)}
                      placeholder="Ex: Fortaleza - CE, CEP: 60310-002"
                      className="w-full bg-[#0a1e3c]/60 border border-blue-500/10 rounded px-3 py-2 text-xs focus:outline-none focus:border-blue-500/40 text-white font-sans"
                    />
                  </div>
                </div>
              </div>

              {/* Seção 4: Dados Institucionais e Links de Redes */}
              <div className="glass-panel p-6 rounded-xl border border-blue-500/10 space-y-4">
                <h4 className="font-mono text-xs tracking-wider text-blue-500 font-bold uppercase border-b border-blue-500/5 pb-2">4. Identificação &amp; Redes Sociais</h4>
                
                {/* Removido CREA e CNPJ para alinhar à estrutura europeia da METALOWORLD */}

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-gray-400 mb-1">Link do Facebook</label>
                    <input
                      type="text"
                      value={general.facebook || ''}
                      onChange={(e) => updateGeneralField('facebook', e.target.value)}
                      className="w-full bg-[#0a1e3c]/60 border border-blue-500/10 rounded px-3 py-2 text-xs focus:outline-none focus:border-blue-500/40 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-gray-400 mb-1">Link do Instagram</label>
                    <input
                      type="text"
                      value={general.instagram || ''}
                      onChange={(e) => updateGeneralField('instagram', e.target.value)}
                      className="w-full bg-[#0a1e3c]/60 border border-blue-500/10 rounded px-3 py-2 text-xs focus:outline-none focus:border-blue-500/40 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-gray-400 mb-1">Link do LinkedIn</label>
                    <input
                      type="text"
                      value={general.linkedin || ''}
                      onChange={(e) => updateGeneralField('linkedin', e.target.value)}
                      className="w-full bg-[#0a1e3c]/60 border border-blue-500/10 rounded px-3 py-2 text-xs focus:outline-none focus:border-blue-500/40 text-white"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 1: SERVIÇOS */}
          {activeTab === 'services' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-blue-500/10 pb-4 mb-6">
                <div>
                  <h3 className="font-extrabold text-lg uppercase">Gerenciar Serviços</h3>
                  <p className="text-xs text-gray-400">Edite ou crie as seções de especialidades mostradas na página inicial.</p>
                </div>
                <button
                  onClick={addService}
                  className="flex items-center gap-1 bg-blue-600/20 border border-blue-500/30 hover:bg-blue-600 hover:border-blue-600 text-blue-400 hover:text-white px-3 py-1.5 rounded-lg text-xs font-bold uppercase transition-all cursor-pointer"
                >
                  <Plus size={14} />
                  Adicionar
                </button>
              </div>

              <div className="space-y-6">
                {services.map((service, index) => (
                  <div key={service.id} className="glass-panel p-6 rounded-xl border border-blue-500/10 space-y-4">
                    <div className="flex items-center justify-between border-b border-blue-500/5 pb-3">
                      <span className="font-mono text-[10px] tracking-wider text-blue-500 font-bold uppercase">Serviço #{index + 1}</span>
                      <button
                        onClick={() => deleteService(index)}
                        className="text-rose-500 hover:text-rose-400 hover:bg-rose-500/15 p-1.5 rounded-lg transition-colors cursor-pointer"
                        title="Excluir serviço"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-gray-400 mb-1">Título do Serviço</label>
                        <input
                          type="text"
                          value={service.title}
                          onChange={(e) => updateService(index, 'title', e.target.value)}
                          className="w-full bg-[#0a1e3c]/60 border border-blue-500/10 rounded px-3 py-2 text-xs focus:outline-none focus:border-blue-500/40 text-white font-sans"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-gray-400 mb-1">Categoria</label>
                        <select
                          value={service.category}
                          onChange={(e) => updateService(index, 'category', e.target.value as 'engenharia' | 'tecnologia')}
                          className="w-full bg-[#0a1e3c]/60 border border-blue-500/10 rounded px-3 py-2 text-xs focus:outline-none focus:border-blue-500/40 text-white"
                        >
                          <option value="engenharia">Engenharia & Obras Civis</option>
                          <option value="tecnologia">Segurança Eletrônica & Redes</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
                      <div>
                        <ImageUploader
                          label="Imagem do Serviço"
                          currentValue={service.image || ''}
                          onUploadSuccess={(url) => updateService(index, 'image', url)}
                          password={password}
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-gray-400 mb-1">Icone do Lucide (Ex: Layers, Anchor, Cpu, Flame)</label>
                        <input
                          type="text"
                          value={service.iconName}
                          onChange={(e) => updateService(index, 'iconName', e.target.value)}
                          className="w-full bg-[#0a1e3c]/60 border border-blue-500/10 rounded px-3 py-2 text-xs focus:outline-none focus:border-blue-500/40 text-white font-mono"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-gray-400 mb-1">Descrição Curta (Card)</label>
                      <textarea
                        value={service.description}
                        onChange={(e) => updateService(index, 'description', e.target.value)}
                        rows={2}
                        className="w-full bg-[#0a1e3c]/60 border border-blue-500/10 rounded px-3 py-2 text-xs focus:outline-none focus:border-blue-500/40 text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-gray-400 mb-1">Descrição Completa (Modal Detalhado)</label>
                      <textarea
                        value={service.detailedDescription}
                        onChange={(e) => updateService(index, 'detailedDescription', e.target.value)}
                        rows={3}
                        className="w-full bg-[#0a1e3c]/60 border border-blue-500/10 rounded px-3 py-2 text-xs focus:outline-none focus:border-blue-500/40 text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-gray-400 mb-1">Características do Serviço (uma por linha)</label>
                      <textarea
                        value={service.features.join('\n')}
                        onChange={(e) => updateService(index, 'features', e.target.value.split('\n'))}
                        rows={3}
                        className="w-full bg-[#0a1e3c]/60 border border-blue-500/10 rounded px-3 py-2 text-xs focus:outline-none focus:border-blue-500/40 text-white font-sans"
                        placeholder="Característica 1&#10;Característica 2"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: PROJETOS */}
          {activeTab === 'projects' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-blue-500/10 pb-4 mb-6">
                <div>
                  <h3 className="font-extrabold text-lg uppercase">Gerenciar Projetos / Capacidade Operacional</h3>
                  <p className="text-xs text-gray-400">Edite os projetos e soluções que a METALOWORLD está apta a assumir no painel principal.</p>
                </div>
                <button
                  onClick={addProject}
                  className="flex items-center gap-1 bg-blue-600/20 border border-blue-500/30 hover:bg-blue-600 hover:border-blue-600 text-blue-400 hover:text-white px-3 py-1.5 rounded-lg text-xs font-bold uppercase transition-all cursor-pointer"
                >
                  <Plus size={14} />
                  Adicionar
                </button>
              </div>

              <div className="space-y-6">
                {projects.map((proj, index) => (
                  <div key={proj.id} className="glass-panel p-6 rounded-xl border border-blue-500/10 space-y-4">
                    <div className="flex items-center justify-between border-b border-blue-500/5 pb-3">
                      <span className="font-mono text-[10px] tracking-wider text-blue-500 font-bold uppercase">Projeto #{index + 1}</span>
                      <button
                        onClick={() => deleteProject(index)}
                        className="text-rose-500 hover:text-rose-400 hover:bg-rose-500/15 p-1.5 rounded-lg transition-colors cursor-pointer"
                        title="Excluir projeto"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-gray-400 mb-1">Título do Projeto / Solução</label>
                        <input
                          type="text"
                          value={proj.title}
                          onChange={(e) => updateProject(index, 'title', e.target.value)}
                          className="w-full bg-[#0a1e3c]/60 border border-blue-500/10 rounded px-3 py-2 text-xs focus:outline-none focus:border-blue-500/40 text-white font-sans"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-gray-400 mb-1">Categoria/Filtro</label>
                        <input
                          type="text"
                          value={proj.category}
                          onChange={(e) => updateProject(index, 'category', e.target.value)}
                          placeholder="Ex: Soldadura, Montagem Industrial, Serralharia, Naval, etc."
                          className="w-full bg-[#0a1e3c]/60 border border-blue-500/10 rounded px-3 py-2 text-xs focus:outline-none focus:border-blue-500/40 text-white font-sans"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div>
                        <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-gray-400 mb-1">Cliente</label>
                        <input
                          type="text"
                          value={proj.client}
                          onChange={(e) => updateProject(index, 'client', e.target.value)}
                          className="w-full bg-[#0a1e3c]/60 border border-blue-500/10 rounded px-3 py-2 text-xs focus:outline-none focus:border-blue-500/40 text-white font-sans"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-gray-400 mb-1">Localização</label>
                        <input
                          type="text"
                          value={proj.location}
                          onChange={(e) => updateProject(index, 'location', e.target.value)}
                          className="w-full bg-[#0a1e3c]/60 border border-blue-500/10 rounded px-3 py-2 text-xs focus:outline-none focus:border-blue-500/40 text-white font-sans"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-gray-400 mb-1">Status / Ano (Ex: Apto para Execução)</label>
                        <input
                          type="text"
                          value={proj.year}
                          onChange={(e) => updateProject(index, 'year', e.target.value)}
                          className="w-full bg-[#0a1e3c]/60 border border-blue-500/10 rounded px-3 py-2 text-xs focus:outline-none focus:border-blue-500/40 text-white font-mono"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-gray-400 mb-1">Dados Chave (Ex: Peso de aço, m³)</label>
                        <input
                          type="text"
                          value={proj.keySpec}
                          onChange={(e) => updateProject(index, 'keySpec', e.target.value)}
                          className="w-full bg-[#0a1e3c]/60 border border-blue-500/10 rounded px-3 py-2 text-xs focus:outline-none focus:border-blue-500/40 text-white font-mono"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-gray-400 mb-1">Serviço Técnico Detalhado</label>
                      <input
                        type="text"
                        value={proj.service}
                        onChange={(e) => updateProject(index, 'service', e.target.value)}
                        className="w-full bg-[#0a1e3c]/60 border border-blue-500/10 rounded px-3 py-2 text-xs focus:outline-none focus:border-blue-500/40 text-white font-sans"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-gray-400 mb-1">Descrição do Projeto</label>
                      <textarea
                        value={proj.description}
                        onChange={(e) => updateProject(index, 'description', e.target.value)}
                        rows={2}
                        className="w-full bg-[#0a1e3c]/60 border border-blue-500/10 rounded px-3 py-2 text-xs focus:outline-none focus:border-blue-500/40 text-white font-sans"
                      />
                    </div>

                    <div className="space-y-3">
                      <ImageUploader
                        label="Imagem Principal do Projeto (Capa)"
                        currentValue={proj.gallery[0] || ''}
                        onUploadSuccess={(url) => {
                          const updatedGallery = [...proj.gallery];
                          updatedGallery[0] = url;
                          updateProject(index, 'gallery', updatedGallery);
                        }}
                        password={password}
                      />
                      <div>
                        <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-gray-400 mb-1">Outras Imagens da Galeria (uma URL por linha)</label>
                        <textarea
                          value={proj.gallery.join('\n')}
                          onChange={(e) => updateProject(index, 'gallery', e.target.value.split('\n'))}
                          rows={2}
                          className="w-full bg-[#0a1e3c]/60 border border-blue-500/10 rounded px-3 py-2 text-xs focus:outline-none focus:border-blue-500/40 text-white font-mono"
                          placeholder="https://imagem1.jpg&#10;https://imagem2.jpg"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: TIMELINE */}
          {activeTab === 'timeline' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-blue-500/10 pb-4 mb-6">
                <div>
                  <h3 className="font-extrabold text-lg uppercase">Estruturação Operacional (Fases)</h3>
                  <p className="text-xs text-gray-400">Edite as etapas de estruturação e fases operacionais mostradas na seção "Sobre".</p>
                </div>
                <button
                  onClick={addTimeline}
                  className="flex items-center gap-1 bg-blue-600/20 border border-blue-500/30 hover:bg-blue-600 hover:border-blue-600 text-blue-400 hover:text-white px-3 py-1.5 rounded-lg text-xs font-bold uppercase transition-all cursor-pointer"
                >
                  <Plus size={14} />
                  Adicionar
                </button>
              </div>

              <div className="space-y-6">
                {timeline.map((item, index) => (
                  <div key={index} className="glass-panel p-6 rounded-xl border border-blue-500/10 space-y-4">
                    <div className="flex items-center justify-between border-b border-blue-500/5 pb-3">
                      <span className="font-mono text-[10px] tracking-wider text-blue-500 font-bold uppercase">Fase #{index + 1}</span>
                      <button
                        onClick={() => deleteTimeline(index)}
                        className="text-rose-500 hover:text-rose-400 hover:bg-rose-500/15 p-1.5 rounded-lg transition-colors cursor-pointer"
                        title="Excluir marco"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-gray-400 mb-1">Fase (Ex: Fase 1 - Máx. 6 caract.)</label>
                        <input
                          type="text"
                          value={item.year}
                          onChange={(e) => updateTimeline(index, 'year', e.target.value)}
                          className="w-full bg-[#0a1e3c]/60 border border-blue-500/10 rounded px-3 py-2 text-xs focus:outline-none focus:border-blue-500/40 text-white font-mono"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-gray-400 mb-1">Título do Evento</label>
                        <input
                          type="text"
                          value={item.title}
                          onChange={(e) => updateTimeline(index, 'title', e.target.value)}
                          className="w-full bg-[#0a1e3c]/60 border border-blue-500/10 rounded px-3 py-2 text-xs focus:outline-none focus:border-blue-500/40 text-white font-sans"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-gray-400 mb-1">Destaque da Conquista (Descrição)</label>
                      <textarea
                        value={item.description}
                        onChange={(e) => updateTimeline(index, 'description', e.target.value)}
                        rows={2}
                        className="w-full bg-[#0a1e3c]/60 border border-blue-500/10 rounded px-3 py-2 text-xs focus:outline-none focus:border-blue-500/40 text-white font-sans"
                      />
                    </div>

                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id={`milestone-${index}`}
                        checked={item.milestone || false}
                        onChange={(e) => updateTimeline(index, 'milestone', e.target.checked)}
                        className="rounded border-blue-500/20 bg-[#0a1e3c]/60 text-blue-500 focus:ring-0 focus:ring-offset-0 cursor-pointer"
                      />
                      <label htmlFor={`milestone-${index}`} className="text-xs text-gray-300 font-medium select-none cursor-pointer">
                        Destacar como "Fase Estrutural"
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: STATS */}
          {activeTab === 'stats' && (
            <div className="space-y-6">
              <div className="border-b border-blue-500/10 pb-4 mb-6">
                <h3 className="font-extrabold text-lg uppercase">Editar Números e Estatísticas</h3>
                <p className="text-xs text-gray-400">Edite as conquistas numéricas exibidas na parte inferior do site.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {stats.map((stat, index) => (
                  <div key={stat.id} className="glass-panel p-6 rounded-xl border border-blue-500/10 space-y-4">
                    <span className="font-mono text-[10px] tracking-wider text-blue-500 font-bold uppercase">Número #{index + 1}</span>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-gray-400 mb-1">Valor Numérico</label>
                        <input
                          type="number"
                          value={stat.value}
                          onChange={(e) => updateStat(index, 'value', parseInt(e.target.value) || 0)}
                          className="w-full bg-[#0a1e3c]/60 border border-blue-500/10 rounded px-3 py-2 text-xs focus:outline-none focus:border-blue-500/40 text-white font-mono"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-gray-400 mb-1">Sufixo (Ex: +, %)</label>
                        <input
                          type="text"
                          value={stat.suffix}
                          onChange={(e) => updateStat(index, 'suffix', e.target.value)}
                          className="w-full bg-[#0a1e3c]/60 border border-blue-500/10 rounded px-3 py-2 text-xs focus:outline-none focus:border-blue-500/40 text-white font-mono"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-gray-400 mb-1">Rótulo / Título Principal</label>
                      <input
                        type="text"
                        value={stat.label}
                        onChange={(e) => updateStat(index, 'label', e.target.value)}
                        className="w-full bg-[#0a1e3c]/60 border border-blue-500/10 rounded px-3 py-2 text-xs focus:outline-none focus:border-blue-500/40 text-white font-sans"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-gray-400 mb-1">Subtítulo Explicativo</label>
                      <input
                        type="text"
                        value={stat.subLabel}
                        onChange={(e) => updateStat(index, 'subLabel', e.target.value)}
                        className="w-full bg-[#0a1e3c]/60 border border-blue-500/10 rounded px-3 py-2 text-xs focus:outline-none focus:border-blue-500/40 text-white font-sans"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: DEPOIMENTOS */}
          {activeTab === 'testimonials' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-blue-500/10 pb-4 mb-6">
                <div>
                  <h3 className="font-extrabold text-lg uppercase">Gerenciar Depoimentos</h3>
                  <p className="text-xs text-gray-400">Edite ou adicione recomendações de clientes e parceiros industriais.</p>
                </div>
                <button
                  onClick={addTestimonial}
                  className="flex items-center gap-1 bg-blue-600/20 border border-blue-500/30 hover:bg-blue-600 hover:border-blue-600 text-blue-400 hover:text-white px-3 py-1.5 rounded-lg text-xs font-bold uppercase transition-all cursor-pointer"
                >
                  <Plus size={14} />
                  Adicionar
                </button>
              </div>

              <div className="space-y-6">
                {testimonials.map((test, index) => (
                  <div key={test.id} className="glass-panel p-6 rounded-xl border border-blue-500/10 space-y-4">
                    <div className="flex items-center justify-between border-b border-blue-500/5 pb-3">
                      <span className="font-mono text-[10px] tracking-wider text-blue-500 font-bold uppercase">Depoimento #{index + 1}</span>
                      <button
                        onClick={() => deleteTestimonial(index)}
                        className="text-rose-500 hover:text-rose-400 hover:bg-rose-500/15 p-1.5 rounded-lg transition-colors cursor-pointer"
                        title="Excluir depoimento"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-gray-400 mb-1">Nome</label>
                        <input
                          type="text"
                          value={test.name}
                          onChange={(e) => updateTestimonial(index, 'name', e.target.value)}
                          className="w-full bg-[#0a1e3c]/60 border border-blue-500/10 rounded px-3 py-2 text-xs focus:outline-none focus:border-blue-500/40 text-white font-sans"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-gray-400 mb-1">Cargo</label>
                        <input
                          type="text"
                          value={test.role}
                          onChange={(e) => updateTestimonial(index, 'role', e.target.value)}
                          className="w-full bg-[#0a1e3c]/60 border border-blue-500/10 rounded px-3 py-2 text-xs focus:outline-none focus:border-blue-500/40 text-white font-sans"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-gray-400 mb-1">Empresa</label>
                        <input
                          type="text"
                          value={test.company}
                          onChange={(e) => updateTestimonial(index, 'company', e.target.value)}
                          className="w-full bg-[#0a1e3c]/60 border border-blue-500/10 rounded px-3 py-2 text-xs focus:outline-none focus:border-blue-500/40 text-white font-sans"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-gray-400 mb-1">Foto Avatar URL</label>
                        <input
                          type="text"
                          value={test.avatarUrl}
                          onChange={(e) => updateTestimonial(index, 'avatarUrl', e.target.value)}
                          className="w-full bg-[#0a1e3c]/60 border border-blue-500/10 rounded px-3 py-2 text-xs focus:outline-none focus:border-blue-500/40 text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-gray-400 mb-1">Estrelas (Avaliação 1-5)</label>
                        <input
                          type="number"
                          min={1}
                          max={5}
                          value={test.rating}
                          onChange={(e) => updateTestimonial(index, 'rating', parseInt(e.target.value) || 5)}
                          className="w-full bg-[#0a1e3c]/60 border border-blue-500/10 rounded px-3 py-2 text-xs focus:outline-none focus:border-blue-500/40 text-white font-mono"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-gray-400 mb-1">Depoimento Escrito</label>
                      <textarea
                        value={test.feedback}
                        onChange={(e) => updateTestimonial(index, 'feedback', e.target.value)}
                        rows={3}
                        className="w-full bg-[#0a1e3c]/60 border border-blue-500/10 rounded px-3 py-2 text-xs focus:outline-none focus:border-blue-500/40 text-white font-sans"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
