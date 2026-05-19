export interface ProjectMeta {
  slug: string;
  title: string;
  catLabel: string;
  description: string;
  tags: string[];
  accent: 'red' | 'cyan' | 'emerald';
  tipo: string;
  ano: string;
  stack: string;
}

export const PROJECTS_META: ProjectMeta[] = [
  {
    slug: 'performance',
    title: 'Performance Benchmark Simulator',
    catLabel: '[ PERFORMANCE ]',
    description:
      'Analise a performance de qualquer site em tempo real. Visualize Core Web Vitals, TTFB, LCP e mais — com engine proprietária da Mezzold.',
    tags: ['WEB VITALS', 'LIGHTHOUSE', 'NEXT.JS'],
    accent: 'red',
    tipo: 'Ferramenta Web',
    ano: '2026',
    stack: 'Next.js / TS',
  },
  {
    slug: 'monitoring',
    title: 'Live Monitoring Dashboard',
    catLabel: '[ DASHBOARD ]',
    description:
      'Central de comando em tempo real com KPIs, gráficos animados e logs para operação digital.',
    tags: ['REAL TIME', 'DASHBOARD', 'CHARTS'],
    accent: 'cyan',
    tipo: 'Sistema Interno',
    ano: '2026',
    stack: 'React / WS',
  },
  {
    slug: 'ui-playground',
    title: 'UI Component Playground',
    catLabel: '[ DESIGN SYSTEM ]',
    description:
      'Ambiente interativo para testar componentes, variações de interface e padrões visuais.',
    tags: ['DESIGN SYSTEM', 'COMPONENTS', 'UI'],
    accent: 'emerald',
    tipo: 'Biblioteca Visual',
    ano: '2025',
    stack: 'React / Storybook',
  },
  {
    slug: 'iot-telemetry',
    title: 'IoT Telemetry Dashboard',
    catLabel: '[ DASHBOARD ]',
    description:
      'Monitoramento de hardware e telemetria via MQTT, visualizando tópicos, status e diagnóstico.',
    tags: ['IOT', 'MQTT', 'TELEMETRIA'],
    accent: 'cyan',
    tipo: 'Dados em Tempo Real',
    ano: '2025',
    stack: 'MQTT / React',
  },
  {
    slug: 'automation-flow',
    title: 'Automation Flow Visualizer',
    catLabel: '[ AUTOMAÇÃO ]',
    description:
      'Diagrama interativo de pipeline event-driven, com visualização de eventos e gargalos em tempo real.',
    tags: ['FLOW', 'EVENTS', 'NODES'],
    accent: 'red',
    tipo: 'Fluxo Operacional',
    ano: '2026',
    stack: 'Node.js / ReactFlow',
  },
  {
    slug: 'stack-configurator',
    title: 'Stack Configurator',
    catLabel: '[ CONSULTORIA ]',
    description:
      'Ferramenta para montar a stack ideal baseada em objetivo, orçamento e prazo do projeto.',
    tags: ['STACK', 'MVP', 'CONSULTORIA'],
    accent: 'red',
    tipo: 'Ferramenta Estratégica',
    ano: '2026',
    stack: 'React / TS',
  },
  {
    slug: 'code-quality',
    title: 'Code Quality Diff Viewer',
    catLabel: '[ AUTOMAÇÃO ]',
    description:
      'Visualizador interativo de antes e depois de refatorações, com comparação de qualidade de código.',
    tags: ['CODE', 'TYPESCRIPT', 'REFACTOR'],
    accent: 'emerald',
    tipo: 'Ferramenta Dev',
    ano: '2026',
    stack: 'TS / Next.js',
  },
  {
    slug: 'mezzlink',
    title: 'MezzLink — Encurtador de Links',
    catLabel: '[ PRODUTO DIGITAL ]',
    description:
      'Produto SaaS funcional com encurtamento de URLs, analytics e painel administrativo.',
    tags: ['NODE', 'ANALYTICS', 'SAAS'],
    accent: 'cyan',
    tipo: 'Produto Digital',
    ano: '2026',
    stack: 'Node / Analytics',
  },
];

export function getProjectBySlug(slug: string): ProjectMeta | null {
  return PROJECTS_META.find((p) => p.slug === slug) ?? null;
}
