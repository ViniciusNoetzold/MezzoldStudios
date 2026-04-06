export interface BlogPost {
  slug: string;
  category: string;
  categoryColor: string;
  date: string;
  readTime: string;
  title: string;
  excerpt: string;
  tags: string[];
  accentColor: string;
  content: Section[];
}

export interface Section {
  type: 'heading' | 'paragraph' | 'code' | 'list' | 'callout';
  text?: string;
  lang?: string;
  items?: string[];
}

export const posts: BlogPost[] = [
  {
    slug: 'nextjs-performance-extrema',
    category: 'PERFORMANCE',
    categoryColor: 'text-cyan-400 border-cyan-500/30 bg-cyan-500/5',
    date: 'Mar 2026',
    readTime: '5 min',
    title: 'Next.js e Performance Extrema: Como Construímos Sites que Pontuam 100 no Lighthouse',
    excerpt:
      'Server Components, Partial Prerendering e Edge Runtime — as estratégias que usamos para entregar sites com tempo de carregamento abaixo de 1s e Core Web Vitals perfeitos.',
    tags: ['Next.js', 'Web Vitals', 'SSR'],
    accentColor: 'border-cyan-500/20',
    content: [
      {
        type: 'paragraph',
        text: 'Performance não é um detalhe — é o produto. Sites lentos perdem usuários nos primeiros 3 segundos. No Mezzold, cada projeto começa com uma meta clara: Lighthouse 100 em todas as categorias. Aqui está o que realmente funciona.',
      },
      { type: 'heading', text: 'Server Components: menos JavaScript no cliente' },
      {
        type: 'paragraph',
        text: 'A maior revolução do Next.js 13+ foi os React Server Components. Com eles, toda a lógica de busca de dados e renderização pesada fica no servidor — o cliente recebe HTML puro, sem o bundle JS associado. Para páginas com muito conteúdo estático, isso reduz o JavaScript inicial em até 70%.',
      },
      {
        type: 'code',
        lang: 'tsx',
        text: `// Este componente roda APENAS no servidor — zero JS enviado ao cliente
async function ProductList() {
  const products = await db.query('SELECT * FROM products');
  return (
    <ul>
      {products.map(p => <li key={p.id}>{p.name}</li>)}
    </ul>
  );
}`,
      },
      { type: 'heading', text: 'Partial Prerendering (PPR)' },
      {
        type: 'paragraph',
        text: 'O PPR combina o melhor dos dois mundos: a parte estática da página é servida instantaneamente do CDN, enquanto as partes dinâmicas (carrinho, perfil do usuário) chegam via streaming em paralelo. O resultado é um TTFB abaixo de 50ms mesmo em páginas complexas.',
      },
      {
        type: 'callout',
        text: 'PPR está disponível a partir do Next.js 14 com a flag experimental. Em produção, já usamos em todos os projetos novos.',
      },
      { type: 'heading', text: 'Imagens: o maior inimigo do LCP' },
      {
        type: 'paragraph',
        text: 'O Largest Contentful Paint (LCP) é destruído por imagens mal otimizadas. A solução completa envolve três frentes:',
      },
      {
        type: 'list',
        items: [
          'Usar o componente <Image> do Next.js com priority={true} para a imagem acima da dobra',
          'Servir WebP ou AVIF em vez de PNG/JPG — redução de 40–60% no tamanho',
          'Definir width e height explícitos para evitar Cumulative Layout Shift (CLS)',
          'Usar placeholder="blur" para carregamento progressivo sem layout shift',
        ],
      },
      { type: 'heading', text: 'Edge Runtime: mais perto do usuário' },
      {
        type: 'paragraph',
        text: 'Rodar middleware e API routes no Edge (Vercel Edge Network, Cloudflare Workers) elimina a latência de cold start dos servidores Node.js e coloca o processamento a menos de 50ms do usuário em qualquer lugar do mundo. Para APIs simples de autenticação e redirecionamento, a diferença é visível.',
      },
      {
        type: 'code',
        lang: 'ts',
        text: `// middleware.ts — roda no Edge, não em Node.js
export const config = { runtime: 'edge' };

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token');
  if (!token) return NextResponse.redirect('/login');
  return NextResponse.next();
}`,
      },
      { type: 'heading', text: 'Resultado final' },
      {
        type: 'paragraph',
        text: 'Aplicando essas técnicas em conjunto — Server Components, PPR, otimização de imagens e Edge Runtime — todos os projetos recentes do Mezzold saíram do Lighthouse com Performance ≥ 98, Acessibilidade 100, Boas Práticas 100 e SEO 100. Performance não é sacrificada por design: os dois coexistem.',
      },
    ],
  },

  {
    slug: 'micro-saas-do-zero-ao-lancamento',
    category: 'PRODUTO',
    categoryColor: 'text-blue-400 border-blue-500/30 bg-blue-500/5',
    date: 'Fev 2026',
    readTime: '8 min',
    title: 'Micro SaaS do Zero ao Lançamento: Arquitetura, Billing e os Primeiros 100 Usuários',
    excerpt:
      'O passo a passo técnico que seguimos para lançar um produto SaaS em menos de 6 semanas — autenticação, Stripe, multi-tenancy e as decisões de arquitetura que fazem diferença a longo prazo.',
    tags: ['SaaS', 'Supabase', 'Stripe'],
    accentColor: 'border-blue-500/20',
    content: [
      {
        type: 'paragraph',
        text: 'Um Micro SaaS bem construído pode gerar receita recorrente com uma equipe de uma ou duas pessoas. A chave está nas decisões de arquitetura dos primeiros dias — escolhas erradas custam semanas de refatoração depois. Aqui está o blueprint que usamos.',
      },
      { type: 'heading', text: 'A stack que escolhemos (e por quê)' },
      {
        type: 'list',
        items: [
          'Next.js 16 — frontend e API routes em um único repositório',
          'Supabase — Postgres + Auth + Storage + Realtime sem servidor próprio',
          'Stripe — billing, webhooks e customer portal prontos para uso',
          'Vercel — deploy automático em cada push, zero DevOps',
          'Resend — emails transacionais com templates React',
        ],
      },
      { type: 'heading', text: 'Autenticação sem dor de cabeça' },
      {
        type: 'paragraph',
        text: 'Supabase Auth resolve login com email/senha, OAuth (Google, GitHub) e magic links em menos de uma hora de configuração. O mais importante: as políticas Row Level Security (RLS) do Postgres garantem que cada usuário só acesse os próprios dados — sem precisar de middleware customizado.',
      },
      {
        type: 'code',
        lang: 'sql',
        text: `-- RLS: cada usuário só vê os próprios projetos
CREATE POLICY "users_own_projects"
ON projects FOR ALL
USING (auth.uid() = user_id);`,
      },
      { type: 'heading', text: 'Multi-tenancy desde o início' },
      {
        type: 'paragraph',
        text: 'Para SaaS com equipes/organizações, a decisão de multi-tenancy precisa vir antes de escrever a primeira linha de feature. Usamos o modelo de coluna discriminante: todas as tabelas têm uma coluna organization_id, e o RLS filtra automaticamente pelo tenant ativo na sessão.',
      },
      {
        type: 'callout',
        text: 'Adicionar multi-tenancy depois que o banco já tem dados é um dos trabalhos mais dolorosos em SaaS. Planeje isso no dia zero.',
      },
      { type: 'heading', text: 'Billing com Stripe em 4 passos' },
      {
        type: 'list',
        items: [
          '1. Criar produtos e preços no dashboard do Stripe',
          '2. Criar Checkout Session via API ao clicar em "Assinar"',
          '3. Ouvir webhooks (checkout.session.completed, invoice.payment_failed) para atualizar o status no banco',
          '4. Exibir o Customer Portal para o usuário gerenciar a assinatura sem suporte manual',
        ],
      },
      { type: 'heading', text: 'Os primeiros 100 usuários' },
      {
        type: 'paragraph',
        text: 'Tecnicamente pronto não significa pronto para crescer. Os primeiros 100 usuários vieram de três frentes: post no Product Hunt no dia de lançamento, thread no Twitter/X explicando o problema que o produto resolve, e integração em comunidades do nicho (Reddit, Discord, grupos do LinkedIn). O produto resolve um problema real — o marketing só amplifica isso.',
      },
    ],
  },

  {
    slug: 'motion-design-interfaces-que-vivem',
    category: 'DESIGN',
    categoryColor: 'text-violet-400 border-violet-500/30 bg-violet-500/5',
    date: 'Jan 2026',
    readTime: '6 min',
    title: 'Motion Design em Produção: Como Criamos Interfaces que Parecem Vivas',
    excerpt:
      'Da teoria do motion até shaders GLSL em tempo real. Como usamos Framer Motion, Three.js e física de spring para criar experiências visuais que o usuário não esquece.',
    tags: ['Motion', 'Three.js', 'UX'],
    accentColor: 'border-violet-500/20',
    content: [
      {
        type: 'paragraph',
        text: 'A diferença entre um site bom e um site inesquecível quase sempre está no motion. Não em quantidade de animações — mas na qualidade e intenção de cada uma. Aqui está a filosofia e as ferramentas que usamos no Mezzold.',
      },
      { type: 'heading', text: 'Física de spring: o segredo da naturalidade' },
      {
        type: 'paragraph',
        text: 'Animações com duração fixa (ease-in-out 0.3s) sempre parecem mecânicas. Springs físicos — com damping e stiffness — criam movimento que desacelera naturalmente como objetos do mundo real. A biblioteca Motion (Framer Motion) implementa isso de forma simples.',
      },
      {
        type: 'code',
        lang: 'tsx',
        text: `<motion.div
  initial={{ y: 40, opacity: 0 }}
  animate={{ y: 0, opacity: 1 }}
  transition={{
    type: 'spring',
    damping: 25,    // resistência ao movimento
    stiffness: 300, // rigidez da mola
  }}
/>`,
      },
      { type: 'heading', text: 'Stagger: revelar conteúdo com ritmo' },
      {
        type: 'paragraph',
        text: 'Quando vários elementos precisam aparecer juntos, o stagger (atraso escalonado entre cada item) cria uma sensação de cascata elegante. O truque é manter o delay curto — 0.05s a 0.08s por item. Mais do que isso começa a parecer lento.',
      },
      {
        type: 'callout',
        text: 'Regra de ouro: se a animação total leva mais de 400ms, o usuário já a percebe como lenta. Sprint de animação, não maratona.',
      },
      { type: 'heading', text: 'WebGL e shaders: quando CSS não é suficiente' },
      {
        type: 'paragraph',
        text: 'Para efeitos que exigem computação por pixel — túneis de partículas, ruído procedural, distorções de imagem — usamos Three.js com shaders GLSL escritos à mão. O shader roda na GPU, não no thread JS, então não impacta a responsividade da UI.',
      },
      {
        type: 'list',
        items: [
          'Túnel de pontos animado (Contact section): shader GLSL com 96 camadas de anéis',
          'Canvas 3D da hero: perspectiva com rotateX/rotateZ e parallax por layer',
          'CardSpotlight: radial gradient em tempo real com useMotionValue',
          'GlowingEffect: conic-gradient animado via CSS custom properties',
        ],
      },
      { type: 'heading', text: 'A regra mais importante: respeitar o usuário' },
      {
        type: 'paragraph',
        text: 'Todos os efeitos pesados do Mezzold detectam prefers-reduced-motion e desligam animações automáticamente. RAF loops param quando o elemento sai da viewport via IntersectionObserver. Motion design premium não significa ignorar acessibilidade — significa executá-los os dois juntos.',
      },
    ],
  },

  {
    slug: 'automacao-dashboards-24-7',
    category: 'AUTOMAÇÃO',
    categoryColor: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/5',
    date: 'Dez 2025',
    readTime: '7 min',
    title: 'Dashboards e Automação: Transformando Dados Brutos em Decisões em Tempo Real',
    excerpt:
      'Como construímos painéis de alta performance com WebSockets, pipelines event-driven e integrações via API que eliminam trabalho manual e reduzem custos operacionais em até 60%.',
    tags: ['Automação', 'Node.js', 'APIs'],
    accentColor: 'border-emerald-500/20',
    content: [
      {
        type: 'paragraph',
        text: 'Dados brutos não têm valor — decisões têm. A diferença está em transformar números dispersos em visualizações acionáveis que chegam ao usuário certo, no momento certo, sem intervenção manual. É exatamente isso que construímos.',
      },
      { type: 'heading', text: 'Arquitetura event-driven: dados que fluem' },
      {
        type: 'paragraph',
        text: 'Em vez de polling constante (checar o banco a cada N segundos), usamos uma arquitetura orientada a eventos. Cada mudança relevante no sistema emite um evento. Os consumidores (dashboard, automações, notificações) reagem em tempo real — sem desperdício de recursos e sem latência artificial.',
      },
      {
        type: 'code',
        lang: 'ts',
        text: `// Publicar evento quando um pedido é criado
await eventBus.publish('order.created', {
  orderId: order.id,
  customerId: order.customerId,
  total: order.total,
});

// Consumidor: atualizar dashboard em tempo real
eventBus.subscribe('order.created', async (event) => {
  await dashboardService.incrementRevenue(event.total);
  await notifyTeam(event);
});`,
      },
      { type: 'heading', text: 'WebSockets: o dashboard que se atualiza sozinho' },
      {
        type: 'paragraph',
        text: 'O Supabase Realtime usa PostgreSQL LISTEN/NOTIFY sob o capô para transmitir mudanças de banco via WebSocket. No cliente, a UI reage automaticamente — sem reload, sem polling. Para painéis de operações, isso significa que o gestor vê o número atualizar no exato momento em que acontece.',
      },
      {
        type: 'callout',
        text: 'Um cliente reduziu a equipe de relatórios de 3 pessoas para 1 depois de substituir planilhas manuais por um dashboard em tempo real construído em 3 semanas.',
      },
      { type: 'heading', text: 'Integrações via API: conectando o ecossistema' },
      {
        type: 'list',
        items: [
          'Webhooks de entrada: receber dados de qualquer ferramenta (Stripe, HubSpot, WhatsApp) e processá-los automaticamente',
          'Webhooks de saída: notificar sistemas externos quando eventos críticos ocorrem',
          'Cron jobs: relatórios automáticos diários/semanais enviados por email sem intervenção humana',
          'Retry automático: filas com backoff exponencial garantem zero perda de dados em falhas temporárias',
        ],
      },
      { type: 'heading', text: 'Resultado: o que "60% de redução de custo" significa na prática' },
      {
        type: 'paragraph',
        text: 'Para um cliente de logística, substituímos 12 horas/semana de trabalho manual de consolidação de dados por um pipeline automatizado que roda em 4 minutos. O painel mostra KPIs de entrega, atrasos e custo por rota em tempo real. A equipe parou de criar planilhas e começou a tomar decisões — que é o trabalho que realmente importa.',
      },
    ],
  },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug);
}
