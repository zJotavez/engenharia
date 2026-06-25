import { Service, Project, TimelineItem, Testimonial, Differential, StatItem, GeneralSettings } from './types.ts';

export const SERVICES: Service[] = [
  {
    id: 'soldadura',
    title: 'Soldadura Industrial e Homologada',
    description: 'Profissionais certificados em processos MIG/MAG, TIG e Elétrodo para projetos de elevada exigência mecânica.',
    detailedDescription: 'Disponibilizamos soldadores altamente experientes e certificados pelas normas EN e ASME. A nossa equipa executa trabalhos de soldadura em tubagens de alta pressão, estruturas metálicas pesadas e componentes navais, com garantia de controlo de qualidade rigoroso (ensaios não destrutivos).',
    features: [
      'Soldadura TIG, MIG/MAG e Elétrodo Revestido',
      'Profissionais homologados sob normas EN/ASME',
      'Soldadura de ligas especiais, inox e aço carbono',
      'Ensaios não destrutivos (NDT) e controlo de qualidade'
    ],
    iconName: 'Cpu',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=1200',
    category: 'engenharia'
  },
  {
    id: 'montagem-industrial',
    title: 'Montagem Industrial e Mecânica',
    description: 'Equipas especializadas para montagem de linhas de produção, equipamentos pesados e estruturas industriais.',
    detailedDescription: 'Fornecemos mecânicos de montagem e técnicos qualificados para montagem de equipamentos industriais, pipe racks, condutas e sistemas de processo. Atuação focada no cumprimento ágil de cronogramas e paradas de manutenção industrial.',
    features: [
      'Montagem de equipamentos de processo e máquinas',
      'Equipas ágeis para paradas de fábrica',
      'Montagem de estruturas metálicas e tubagem',
      'Segurança operacional rigorosa nas intervenções'
    ],
    iconName: 'Layers',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=1200',
    category: 'engenharia'
  },
  {
    id: 'serralharia',
    title: 'Serralharia Mecânica e Civil',
    description: 'Profissionais para fabricação e montagem de componentes metálicos, acessos e estruturas sob medida.',
    detailedDescription: 'Soluções de serralharia para suporte de processos industriais ou construção. Disponibilizamos serralheiros experientes na leitura de desenho técnico, corte, dobra e montagem de tubagens, escadas marinheiro, guarda-corpos e estruturas de proteção.',
    features: [
      'Leitura avançada de esquemas e desenhos técnicos',
      'Montagem de escadas, guarda-corpos and acessos de segurança',
      'Trabalhos em aço carbono, inox e alumínio',
      'Apoio especializado a canteiros de obra'
    ],
    iconName: 'Hammer',
    image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=1200',
    category: 'engenharia'
  },
  {
    id: 'decapagem',
    title: 'Decapagem e Tratamento de Superfícies',
    description: 'Especialistas em decapagem a jato abrasivo e aplicação de revestimentos anticorrosivos industriais.',
    detailedDescription: 'Equipas técnicas focadas na preparação de superfícies de aço para pintura e tratamentos de proteção. Executamos decapagem por jato de areia ou granalha, limpeza química e pintura industrial de alta espessura para estruturas sujeitas a intempéries ou corrosão severa.',
    features: [
      'Decapagem por jato abrasivo (granalha/areia)',
      'Pintura industrial com especificações anticorrosivas',
      'Preparação e limpeza mecânica de superfícies de aço',
      'Prolongamento da vida útil de ativos industriais'
    ],
    iconName: 'Shield',
    image: 'https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&q=80&w=1200',
    category: 'engenharia'
  },
  {
    id: 'instalacoes-ti',
    title: 'Instalações de TI e Infraestruturas de Comunicação',
    description: 'Técnicos para implantação de redes estruturadas, fibra ótica, sistemas de videovigilância e controle de acessos.',
    detailedDescription: 'Implementação de infraestruturas tecnológicas para fábricas, portos e edifícios corporativos. Oferecemos especialistas em cabeamento estruturado, fusão de fibra ótica, redes de comunicação industrial, sistemas de CFTV IP inteligentes e controle eletrónico de acessos.',
    features: [
      'Cabeamento estruturado e redes de fibra ótica',
      'Instalação de CFTV IP e controlo de acessos corporativos',
      'Sistemas de alarme e segurança perimetral',
      'Comunicação integrada para automação fabril'
    ],
    iconName: 'Network',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=1200',
    category: 'tecnologia'
  },
  {
    id: 'construcao-reparacao-naval',
    title: 'Construção e Reparação Naval',
    description: 'Mão de obra qualificada para reparos estruturais de convés, caldeiraria naval pesada e tubagens marítimas.',
    detailedDescription: 'Fornecemos equipas experientes para atuar em estaleiros de reparação naval e navios offshore. Soldadores e caldeireiros certificados pelas sociedades de classificação internacional para execução de reparação de chapeamento de casco, cavernas, ramais de tubagem e estruturas marítimas.',
    features: [
      'Reparações estruturais de chapeamento de cascos',
      'Soldadura certificada sob registro de classe naval',
      'Caldeiraria naval pesada e manutenção offshore',
      'Montagem de sistemas de tubagem marítima'
    ],
    iconName: 'Anchor',
    image: 'https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?auto=format&fit=crop&q=80&w=1200',
    category: 'engenharia'
  }
];

export const PROJECTS: Project[] = [
  {
    id: 'p1',
    title: 'Montagem de Pipe Racks e Superestruturas Portuárias',
    category: 'Montagem Industrial',
    description: 'Capacitação completa para mobilização de equipas especializadas na montagem de galpões e pipe-racks treliçados de transporte de minério. Garantimos precisão geométrica e um serviço incrível sob condições climáticas exigentes.',
    client: 'EuroLogistics S.A.',
    service: 'Prontos para assumir montagens e soldadura homologada',
    location: 'Porto de Sines - Portugal',
    year: 'Apto para Execução',
    gallery: [
      '/assets/images/pipe-racks-portuarios.webp',
      'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=1200'
    ],
    keySpec: '1.450 Toneladas de Aço'
  },
  {
    id: 'p2',
    title: 'Manutenção Estrutural e Reforma de Deck de Plataformas',
    category: 'Construção Naval',
    description: 'Prontos para fornecer caldeireiros e soldadores certificados para reparação estrutural de chapeamento de convés e cascos sob rígido controlo de sociedades classificadoras.',
    client: 'Iberian Drilling Corp.',
    service: 'Capazes de mobilizar soldadores de classe naval',
    location: 'Estaleiro Naval de Vigo - Espanha',
    year: 'Apto para Execução',
    gallery: [
      'https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=1200'
    ],
    keySpec: '120 Toneladas Substituídas'
  },
  {
    id: 'p3',
    title: 'Ramais de Vapor e Alta Pressão para Linhas de Processo',
    category: 'Soldadura',
    description: 'Capacidade técnica para mobilizar soldadores TIG qualificados em aço carbono, inox e cromo-molibdênio para a execução de linhas de processo a alta pressão com índice zero de falhas.',
    client: 'Química del Sur S.A.',
    service: 'Solução em soldadura em tubagens sob pressão',
    location: 'Polo Industrial de Tarragona - Espanha',
    year: 'Apto para Execução',
    gallery: [
      'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=1200'
    ],
    keySpec: '3.200 Metros de Linhas'
  },
  {
    id: 'p4',
    title: 'Lançamento de Redes e Comunicação Industrial em Fábrica',
    category: 'Instalações de TI',
    description: 'Prontos para direcionar técnicos especializados no lançamento de redes estruturadas, fusão de fibra ótica e CFTV IP para ambientes industriais exigentes de alta segurança.',
    client: 'Iberia Auto Parts',
    service: 'Fornecimento de técnicos de infraestrutura de TI',
    location: 'Polo Industrial de Aveiro - Portugal',
    year: 'Apto para Execução',
    gallery: [
      'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1200'
    ],
    keySpec: '12.000m Cabeamento Ótico'
  },
  {
    id: 'p5',
    title: 'Serralharia Técnica de Acessos e Proteções de Segurança',
    category: 'Serralharia',
    description: 'Capacidade de fornecimento de serralheiros industriais para fabricação local e montagem de acessos de segurança, escadas marinheiro e guarda-corpos normatizados.',
    client: 'AgroAliança Silos S.A.',
    service: 'Solução sob medida em serralharia industrial',
    location: 'Terminal Logístico de Sevilha - Espanha',
    year: 'Apto para Execução',
    gallery: [
      'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1513828742140-ccaa2ecf32e9?auto=format&fit=crop&q=80&w=1200'
    ],
    keySpec: '42 Escadas de Segurança'
  },
  {
    id: 'p6',
    title: 'Decapagem Abrasiva e Pintura Anticorrosiva em Estruturas',
    category: 'Decapagem',
    description: 'Prontos para fornecer equipas especializadas em decapagem abrasiva por jato e aplicação de revestimentos de pintura industrial anticorrosiva de alta performance.',
    client: 'Portos do Norte S.A.',
    service: 'Fornecimento de técnicos de decapagem e jateamento',
    location: 'Terminal de Cargas do Porto - Portugal',
    year: 'Apto para Execução',
    gallery: [
      'https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=1200'
    ],
    keySpec: '18.000 m² de Tratamento'
  }
];

export const TIMELINE_ITEMS: TimelineItem[] = [
  {
    year: 'Fase 1',
    title: 'Fundação e Propósito',
    description: 'Criação da METALOWORLD em 2026 com a missão de colmatar a escassez de profissionais qualificados no setor industrial da Europa, oferecendo soluções com precisão técnica.',
    milestone: true
  },
  {
    year: 'Fase 2',
    title: 'Homologação e Rigor',
    description: 'Desenvolvimento de uma rigorosa rede de triagem, avaliação e homologação dos melhores soldadores, montadores e técnicos da indústria sob padrões europeus.',
    milestone: false
  },
  {
    year: 'Fase 3',
    title: 'Lançamento Operacional',
    description: 'Início das mobilizações ágeis de equipas técnicas em Portugal e Espanha, atendendo paradas industriais e projetos com eficiência imediata e serviço incrível.',
    milestone: false
  },
  {
    year: 'Fase 4',
    title: 'Expansão na Europa',
    description: 'Alargamento da logística de mobilização para toda a União Europeia, conectando grandes empresas aos profissionais ideais para cada desafio industrial.',
    milestone: true
  },
  {
    year: 'Fase 5',
    title: 'Liderança e Visão',
    description: 'Consolidação como a maior referência em rede de soluções técnicas industriais da Europa, pautada por acidentes zero, qualidade absoluta e parcerias sólidas.',
    milestone: true
  }
];

export const DIFFERENTIALS: Differential[] = [
  {
    id: 'd1',
    title: 'Mão de Obra Certificada',
    description: 'Profissionais rigorosamente qualificados e alinhados às normas técnicas, de segurança e qualidade.',
    iconName: 'Users'
  },
  {
    id: 'd2',
    title: 'Flexibilidade Operacional',
    description: 'Atendimento ágil para demandas temporárias, grandes projetos e paradas industriais.',
    iconName: 'CalendarRange'
  },
  {
    id: 'd3',
    title: 'Atuação Internacional',
    description: 'Atendimento estruturado em Portugal, Espanha e demais países da Europa.',
    iconName: 'Globe2'
  },
  {
    id: 'd4',
    title: 'Foco na Produtividade',
    description: 'Reduzimos a complexidade operacional para que nossos clientes possam concentrar esforços em seu negócio principal.',
    iconName: 'CheckCircle2'
  }
];

export const STATS: StatItem[] = [
  {
    id: 's1',
    value: 100,
    suffix: '%',
    label: 'Projetos Prontos para Atender',
    subLabel: 'Grande flexibilidade de mobilização'
  },
  {
    id: 's2',
    value: 2026,
    suffix: '',
    label: 'Ano de Fundação',
    subLabel: 'Com rigor técnico e segurança máxima'
  },
  {
    id: 's3',
    value: 100,
    suffix: '%',
    label: 'Serviço Incrível Garantido',
    subLabel: 'Execução de alta performance'
  },
  {
    id: 's4',
    value: 100,
    suffix: '%',
    label: 'Profissionais Certificados',
    subLabel: 'Alinhamento completo às normas europeias'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Eng. Roberto Vasconcelos',
    role: 'Diretor de Expansão e Infraestrutura',
    company: 'EuroLogistics S.A. (Portugal)',
    feedback: 'O prazo para montagem dos Pipe Racks do porto era muito curto. A METALOWORLD forneceu equipas qualificadas que realizaram o trabalho de montagem e soldadura com precisão cirúrgica, concluindo o cronograma dois dias antes do previsto. Parceiro estratégico indispensável.',
    avatarUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=120&h=120',
    rating: 5
  },
  {
    id: 't2',
    name: 'Dra. Sandra de Medeiros',
    role: 'Coordenadora Geral de Engenharia de Fábricas',
    company: 'Química del Sur S.A. (Espanha)',
    feedback: 'O nível de qualificação dos soldadores e mecânicos fornecidos para a nossa parada de fábrica foi excelente. Toda a documentação técnica e certificados de ensaios foram fornecidos de forma ágil, permitindo cumprir as exigências de auditoria do nosso compliance global.',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=120&h=120',
    rating: 5
  },
  {
    id: 't3',
    name: 'Comandante Heitor S. Peixoto',
    role: 'Gerente Executivo de Frotas Offshore',
    company: 'Iberian Shipping Group (Vigo)',
    feedback: 'Tivemos uma quebra crítica estrutural num navio cargueiro e precisávamos de soldadores certificados com mobilização imediata. A METALOWORLD estruturou a equipa em poucas horas, e o navio voltou a operar em tempo recorde, minimizando o nosso prejuízo por inatividade.',
    avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=120&h=120',
    rating: 5
  }
];

export const GENERAL_SETTINGS: GeneralSettings = {
  heroTitle: 'Soluções Técnicas e ',
  heroHighlight: 'Equipas Qualificadas',
  heroSubtitle: 'Conectamos a sua empresa aos profissionais certos para execução de projetos industriais, metalomecânicos, construção e naval em toda a Europa. Foco em precisão, segurança e produtividade.',
  heroCtaText: 'Falar com um Especialista',
  heroImage: '/assets/images/hero-industrial-team.png',
  phone: '+351 912 345 678',
  phoneRaw: '+351912345678',
  email: 'suporte@metaloworld.pt',
  emailComercial: 'suporte@metaloworld.pt',
  address: 'Atendimento Comercial e Mobilização Técnica',
  addressCity: 'Portugal, Espanha e Europa',
  crea: '',
  cnpj: '',
  facebook: 'https://www.facebook.com/metaloworld',
  instagram: 'https://www.instagram.com/metaloworld',
  linkedin: 'https://www.linkedin.com/company/metaloworld'
};
