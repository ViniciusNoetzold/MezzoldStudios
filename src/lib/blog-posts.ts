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
    date: '15 Março 2026',
    readTime: '4 min',
    title: 'Seu Site Está Perdendo Clientes Agora Mesmo — e Você Provavelmente Não Sabe',
    excerpt:
      'Cada segundo a mais no carregamento custa entre 7% e 20% das suas conversões. Não é achismo — é dado do Google. Se o seu site demora mais de 3 segundos, você já perdeu metade dos visitantes antes de eles verem qualquer coisa.',
    tags: ['Performance', 'Web', 'Conversão'],
    accentColor: 'border-cyan-500/20',
    content: [
      {
        type: 'paragraph',
        text: 'Você já parou para pensar quantas pessoas abriram o seu site hoje e fecharam antes de ver qualquer coisa? Não porque o produto era ruim, não porque o preço era alto — simplesmente porque a página demorou três, quatro, cinco segundos para carregar. O Google mapeou esse comportamento com precisão: 53% dos usuários mobile abandonam um site que demora mais de 3 segundos. Em desktop, a tolerância é um pouco maior — mas a paciência ainda é curta. Velocidade não é um detalhe técnico. É a primeira impressão do seu negócio.',
      },
      {
        type: 'heading',
        text: 'A nota que o Google dá pro seu site — e por que ela importa',
      },
      {
        type: 'paragraph',
        text: 'O Google tem uma ferramenta chamada Lighthouse que funciona como um diagnóstico completo do seu site. Ela avalia velocidade, acessibilidade, boas práticas e presença orgânica — e entrega uma nota de 0 a 100 em cada categoria. Mas o mais importante: essa nota influencia diretamente onde você aparece nas buscas. Um site com nota baixa compete em desvantagem com concorrentes mais rápidos, mesmo que o seu produto seja superior. Todos os projetos que entregamos atingem nota 95+ no Lighthouse. Não como métrica de vaidade — como garantia de que o site vai trabalhar por você, não contra você.',
      },
      {
        type: 'callout',
        text: 'Dado da Deloitte Digital: melhorar 0,1 segundo no tempo de carregamento aumenta as conversões em 8% no varejo e 10% no B2B. Para um negócio faturando R$ 100 mil por mês, um site 1 segundo mais rápido pode representar R$ 80 mil a mais por ano — sem mudar produto, preço ou marketing.',
      },
      {
        type: 'heading',
        text: 'Por que a maioria dos sites é lenta — e o que fazemos diferente',
      },
      {
        type: 'paragraph',
        text: 'Sites lentos geralmente têm o mesmo problema: foram construídos para parecer bonitos na tela do designer, não para carregar rápido no celular de um cliente. Imagens não otimizadas, código desnecessário sendo carregado antes do que o usuário vai ver, fontes externas que bloqueiam a renderização — cada um desses problemas adiciona milissegundos que se acumulam. A tecnologia que usamos resolve isso de forma estrutural: o servidor já entrega o conteúdo pré-processado, como uma pizza pronta em vez de ingredientes crus. O visitante vê a página quase instantaneamente, independente da velocidade da conexão.',
      },
      {
        type: 'heading',
        text: 'Imagens: o maior vilão que ninguém vê',
      },
      {
        type: 'paragraph',
        text: 'Na maioria dos sites, as imagens respondem por 60% a 80% do peso total da página. Uma foto de produto tirada com iPhone e enviada direto ao site pode ter 4 MB — quando otimizada corretamente, a mesma imagem pesa menos de 200 KB com qualidade visual idêntica. Além do tamanho, há outra questão crítica: quando a imagem carrega depois do texto, a página "pula" — o que o Google chama de Cumulative Layout Shift, um dos fatores mais penalizados no ranking de busca. Nosso processo elimina isso na raiz.',
      },
      {
        type: 'list',
        items: [
          'Conversão automática para WebP/AVIF — até 70% menor sem perda de qualidade visível',
          'Dimensões reservadas antes do carregamento — zero "pulos" de layout durante a navegação',
          'Carregamento prioritário da imagem principal — o que o usuário vê primeiro aparece primeiro',
          'Lazy loading inteligente — o resto carrega só quando o usuário rola até lá',
        ],
      },
      {
        type: 'heading',
        text: 'O servidor mais próximo do seu cliente',
      },
      {
        type: 'paragraph',
        text: 'Dados precisam percorrer distância física até chegar ao dispositivo do usuário. Um site hospedado em São Paulo que recebe visitas de Porto Alegre, Manaus e Nova York entrega experiências muito diferentes para cada um desses visitantes — a menos que use uma Edge Network. Em vez de um único servidor central, existem dezenas de pontos de presença espalhados pelo mundo. O acesso de cada visitante é roteado automaticamente para o ponto mais próximo. O resultado prático: um site que carrega em menos de 200 milissegundos para qualquer pessoa, em qualquer lugar.',
      },
      {
        type: 'callout',
        text: 'Performance não é uma feature opcional — é a fundação. Um site com design extraordinário que demora 5 segundos para carregar vai perder para um site mediano que abre em 1 segundo. Nos projetos que construímos, performance é parte do escopo desde o dia zero, não um ajuste de última hora.',
      },
    ],
  },

  {
    slug: 'micro-saas-do-zero-ao-lancamento',
    category: 'PRODUTO',
    categoryColor: 'text-blue-400 border-blue-500/30 bg-blue-500/5',
    date: '03 Março 2026',
    readTime: '6 min',
    title: 'Como Transformar uma Ideia em Receita Mensal Recorrente em Menos de 6 Semanas',
    excerpt:
      'Você não precisa de uma equipe de 20 pessoas nem de anos de desenvolvimento para lançar um produto digital lucrativo. Com a abordagem certa, dois desenvolvedores constroem e lançam um Micro SaaS completo em menos de seis semanas — e o caixa começa a entrar no mês seguinte.',
    tags: ['Produto Digital', 'SaaS', 'Receita Recorrente'],
    accentColor: 'border-blue-500/20',
    content: [
      {
        type: 'paragraph',
        text: 'Existe um modelo de negócio que virou a lógica do mercado de software de cabeça para baixo. Em vez de vender uma vez e torcer para o cliente voltar, você constrói o produto uma vez — e recebe por ele todos os meses, enquanto dorme, viaja ou trabalha em outra coisa. É o modelo por trás do Notion, do Spotify, do Canva. E o que poucos percebem: você não precisa construir o próximo Spotify. Um produto resolvendo um problema específico para 300 clientes pagando R$ 97 por mês já é quase R$ 30 mil de receita previsível todo mês. Com 500 clientes, R$ 48 mil.',
      },
      {
        type: 'heading',
        text: 'O erro que mata 90% dos produtos antes do lançamento',
      },
      {
        type: 'paragraph',
        text: 'O cemitério de produtos digitais está cheio de ideias brilhantes que morreram antes de chegar ao mercado. O padrão é sempre o mesmo: o fundador passa meses desenvolvendo, polindo funcionalidades, preparando o sistema perfeito — e quando finalmente lança, descobre que ninguém estava disposto a pagar pelo que ele construiu. A causa não é falta de talento técnico. É falta de validação antes de escrever a primeira linha de código. A pergunta mais importante não é "consigo construir isso?" — é "alguém me pagaria por isso agora?"',
      },
      {
        type: 'callout',
        text: 'Regra de ouro da validação: antes de construir, consiga pelo menos 10 pessoas dispostas a pagar antes de o produto existir. Se você não consegue convencer 10 pessoas com uma conversa honesta sobre o problema que resolve, construir o produto não vai mudar isso.',
      },
      {
        type: 'heading',
        text: 'De ideia validada a produto no ar em seis semanas',
      },
      {
        type: 'paragraph',
        text: 'Com as ferramentas certas e a metodologia adequada, o ciclo de desenvolvimento é muito mais curto do que parece. O que levava seis meses e uma equipe de dez pessoas agora leva seis semanas com dois desenvolvedores experientes. A razão é simples: infraestrutura que antes precisava ser construída do zero — autenticação, banco de dados, emails, armazenamento de arquivos, cobranças — hoje é configurada em horas, não em semanas. Isso libera o time para focar no que realmente diferencia o produto: a lógica de negócio e a experiência do usuário.',
      },
      {
        type: 'list',
        items: [
          'Semana 1–2: Wireframes, validação técnica e setup de infraestrutura',
          'Semana 3–4: Desenvolvimento das funcionalidades core e sistema de pagamentos',
          'Semana 5: Testes com usuários beta, ajustes de UX e refinamento',
          'Semana 6: Deploy em produção, onboarding e estratégia de lançamento',
        ],
      },
      {
        type: 'heading',
        text: 'O dinheiro que cai na conta sem você fazer nada',
      },
      {
        type: 'paragraph',
        text: 'A parte mais poderosa do modelo de assinatura é o que acontece depois do lançamento. O sistema de cobranças funciona sozinho: cobra mensalmente, tenta novamente em caso de falha no cartão, emite recibos automaticamente, e ainda oferece um portal onde o próprio cliente gerencia sua assinatura sem precisar acionar o suporte. Você acorda na manhã e o dashboard já mostra quantas pessoas pagaram. Não há nota fiscal para emitir manualmente, não há boleto para acompanhar, não há inadimplência para perseguir. O produto trabalha enquanto você dorme.',
      },
      {
        type: 'heading',
        text: 'Os primeiros 100 clientes não aparecem por acaso',
      },
      {
        type: 'paragraph',
        text: 'Produto pronto não é produto vendido. Os primeiros clientes dos projetos que acompanhamos vieram sempre de três canais combinados: uma publicação honesta e específica no Product Hunt no dia do lançamento, uma campanha de conteúdo nas redes focada no problema que o produto resolve — não no produto em si — e presença ativa nas comunidades onde o público-alvo já está. Não existe atalho mágico. Mas existe um padrão que funciona quando executado com consistência.',
      },
      {
        type: 'callout',
        text: 'A diferença entre um freelancer e um fundador de SaaS não é técnica — é mental. Freelancer troca tempo por dinheiro. Fundador de SaaS constrói um ativo que gera renda independente do seu tempo. Os dois trabalhos têm o mesmo ponto de partida: uma habilidade. O que muda é a decisão de transformar essa habilidade em produto.',
      },
    ],
  },

  {
    slug: 'motion-design-interfaces-que-vivem',
    category: 'DESIGN',
    categoryColor: 'text-violet-400 border-violet-500/30 bg-violet-500/5',
    date: '18 Fevereiro 2026',
    readTime: '5 min',
    title: 'Por Que Alguns Sites Parecem Vivos — e o que Separa Design Comum de Design Extraordinário',
    excerpt:
      'Existe uma razão pela qual certos produtos digitais parecem premium mesmo antes de você ler uma palavra ou ver o preço. Não é o logo, não é a paleta de cores — é o movimento. E quando feito da forma certa, ele se torna a ferramenta mais poderosa de percepção de valor que existe.',
    tags: ['Design', 'Motion', 'Experiência do Usuário'],
    accentColor: 'border-violet-500/20',
    content: [
      {
        type: 'paragraph',
        text: 'Abra o site da Apple. Agora abra o site de um concorrente qualquer. Os dois têm produtos de qualidade, boas fotos e textos bem escritos. Mas um deles parece vivo — os elementos respondem ao scroll com elegância, os botões têm peso e textura no clique, as transições entre telas são fluidas como páginas de um livro bem encadernado. O outro parece montado. Essa diferença não é acidente nem magia. É a aplicação deliberada de uma disciplina chamada Motion Design — e ela impacta diretamente quanto o usuário confia no produto antes de tomar qualquer decisão.',
      },
      {
        type: 'heading',
        text: 'O que o movimento comunica que palavras não conseguem',
      },
      {
        type: 'paragraph',
        text: 'Animações não existem para impressionar. Existem para comunicar. Quando um botão pressiona levemente ao ser clicado, ele confirma ao usuário que o sistema recebeu o comando — eliminando a ansiedade de "será que funcionou?". Quando uma lista de itens aparece em cascata ao invés de todos de uma vez, o cérebro processa cada elemento separadamente, aumentando a retenção. Quando um elemento de erro balança suavemente em vez de simplesmente aparecer vermelho, a frustração diminui porque a resposta parece humana. Cada uma dessas micro-decisões de movimento é uma conversa silenciosa entre o produto e o usuário.',
      },
      {
        type: 'callout',
        text: 'Pesquisa do Nielsen Norman Group: interfaces com animações bem planejadas têm taxa de conclusão de tarefas 20% maior do que interfaces estáticas equivalentes. O usuário não percebe a animação conscientemente — ele só percebe que o produto parece mais fácil de usar.',
      },
      {
        type: 'heading',
        text: 'A física que separa animação amadora de animação profissional',
      },
      {
        type: 'paragraph',
        text: 'Pense na diferença entre um elevador de carga e uma porta de carro alemão. Os dois abrem e fecham, mas um parece mecânico e o outro parece preciso. A diferença está na curva de aceleração. Animações amadoras se movem em velocidade constante — como um objeto deslizando num trilho. Animações profissionais seguem a física do mundo real: o elemento acelera no início e desacelera suavemente no final, como objetos com massa e inércia. Esse princípio, chamado de easing, é o que separa um site que parece feito por um designer de um site que parece feito por um programador que aprendeu CSS ontem.',
      },
      {
        type: 'heading',
        text: 'O ritmo que o usuário sente mas não consegue nomear',
      },
      {
        type: 'paragraph',
        text: 'Quando múltiplos elementos precisam aparecer juntos — uma grade de cards, uma lista de features, uma seção de depoimentos — fazer tudo aparecer simultaneamente cria uma sensação de explosão visual. A solução é o stagger: cada elemento aparece com um intervalo de 60 a 80 milissegundos em relação ao anterior, criando uma cascata elegante. Abaixo desse intervalo, o efeito some. Acima, começa a parecer lento e chamativo — o pior dos dois mundos. Essa calibragem precisa é o que faz o usuário sentir que o produto foi feito com atenção, mesmo sem saber exatamente por quê.',
      },
      {
        type: 'list',
        items: [
          'Scroll-triggered animations — elementos que ganham vida conforme o usuário navega, não todos de uma vez',
          'Spring physics — animações baseadas em física real que parecem ter peso e resistência',
          'Gesture feedback — respostas táteis imediatas a cada interação do usuário',
          'State transitions — mudanças de estado (loading, success, error) que guiam sem interromper',
        ],
      },
      {
        type: 'heading',
        text: 'Quando o design vai além do que o olho consegue ver',
      },
      {
        type: 'paragraph',
        text: 'Alguns efeitos visuais que usamos nos nossos projetos — gradientes que reagem ao mouse em tempo real, partículas que respondem ao scroll, distorções de profundidade que seguem o cursor — não são possíveis com CSS ou JavaScript convencional. Rodam diretamente na placa de vídeo do computador, calculando a cor de cada pixel em tempo real a 60 quadros por segundo. O resultado são efeitos que parecem cinematográficos, que rodam com fluidez absoluta e que deixam uma impressão que dura muito além da primeira visita.',
      },
      {
        type: 'callout',
        text: 'A regra de ouro do Motion Design: a melhor animação é aquela que o usuário sente, mas não consegue descrever. Se ele para para assistir à animação, ela está lenta demais. Se ele não percebe que há animação, ela está perfeita. O movimento existe para servir a experiência — nunca para ser a experiência.',
      },
    ],
  },

  {
    slug: 'automacao-dashboards-24-7',
    category: 'AUTOMAÇÃO',
    categoryColor: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/5',
    date: '10 Fevereiro 2026',
    readTime: '6 min',
    title: 'Chega de Relatório Manual: Como Ver os Dados do Seu Negócio em Tempo Real Muda Decisões',
    excerpt:
      'Um gestor tomando decisões com dados de uma semana atrás é como um piloto voando olhando pelo retrovisor. Dashboards em tempo real eliminam o lag entre o que acontece no seu negócio e o que você sabe — e isso muda a qualidade de cada decisão que você toma.',
    tags: ['Automação', 'Dashboard', 'Business Intelligence'],
    accentColor: 'border-emerald-500/20',
    content: [
      {
        type: 'paragraph',
        text: 'Qual foi o seu faturamento ontem? Não o da semana passada — de ontem. Quantos novos clientes entraram hoje? Qual campanha está trazendo os leads que mais convertem? Se para responder qualquer dessas perguntas você precisa abrir uma planilha, ligar para alguém ou esperar até sexta-feira, você está gerindo um negócio no escuro. E no escuro, você não evita obstáculos — você tropeça neles depois que já causaram dano.',
      },
      {
        type: 'heading',
        text: 'O custo invisível do relatório manual',
      },
      {
        type: 'paragraph',
        text: 'Toda empresa tem alguém — às vezes mais de um — que passa horas toda semana coletando dados de sistemas diferentes, copiando para planilhas, calculando totais, montando apresentações. É um trabalho que parece produtivo mas não é: é um processo de transcrição manual que cria delay, introduz erros humanos e consome o tempo mais caro da empresa — o tempo de pessoas inteligentes que deveriam estar tomando decisões, não alimentando planilhas. Um cliente de logística que atendemos gastava 12 horas semanais nesse processo. Depois da automação: 4 minutos.',
      },
      {
        type: 'callout',
        text: '12 horas semanais × 50 semanas = 600 horas por ano. Se a pessoa que faz esse trabalho custa R$ 8.000 por mês, são R$ 28.800 gastos anualmente num processo que pode ser eliminado. Esse é o ROI básico da automação — antes de considerar as decisões melhores que os dados em tempo real permitem.',
      },
      {
        type: 'heading',
        text: 'Como os dados chegam à tela sem ninguém enviar',
      },
      {
        type: 'paragraph',
        text: 'O mecanismo por trás dos dashboards em tempo real funciona como um sistema de mensageria ultra-eficiente. Quando algo acontece no seu negócio — uma venda é aprovada, um pedido muda de status, um ticket de suporte é aberto — uma notificação é disparada automaticamente para todos os sistemas que precisam saber disso. O dashboard é um desses destinatários: assim que recebe o sinal, atualiza o número na tela. Nenhuma pessoa precisou intervir. Nenhum dado ficou preso num sistema isolado esperando alguém ir buscá-lo.',
      },
      {
        type: 'heading',
        text: 'Conectar o que você já usa, não substituir tudo',
      },
      {
        type: 'paragraph',
        text: 'Um dos maiores medos de quem pensa em automação é a disrupção: vai precisar trocar todos os sistemas, treinar a equipe do zero, passar meses em implementação. A realidade é diferente. Os dashboards que construímos se conectam às ferramentas que você já usa — seja qual for o seu sistema de vendas, ERP, CRM, plataforma de pagamentos ou ferramenta de atendimento. Os dados fluem entre os sistemas existentes e se consolidam num painel único. Você não troca o que funciona. Faz as peças conversarem.',
      },
      {
        type: 'list',
        items: [
          'Consolidação de vendas de qualquer plataforma em tempo real — sem exportar, sem copiar',
          'Funil de vendas atualizado automaticamente conforme negociações avançam no CRM',
          'Relatórios semanais entregues por email toda segunda às 7h — sem ninguém gerar manualmente',
          'Alertas automáticos quando uma métrica cai abaixo do threshold definido',
        ],
      },
      {
        type: 'heading',
        text: 'E quando o sistema cair?',
      },
      {
        type: 'paragraph',
        text: 'Qualquer integração que depende de sistemas externos vai, em algum momento, encontrar instabilidade. Um servidor fora do ar por alguns minutos, uma API com timeout, uma atualização que muda o comportamento esperado. Um sistema bem construído não perde dados nesses cenários. Toda mensagem que não consegue ser entregue fica numa fila persistente e é processada com backoff exponencial — tentativas com intervalos crescentes — até ter sucesso. Para o usuário final, é completamente invisível. Para o negócio, significa zero perda de dados em qualquer cenário.',
      },
      {
        type: 'heading',
        text: 'O que muda de verdade quando a informação é instantânea',
      },
      {
        type: 'paragraph',
        text: 'Quando o cliente de logística que mencionamos implementou o dashboard em tempo real, três coisas aconteceram simultaneamente: as 12 horas semanais de trabalho manual viraram 4 minutos de processamento automático; os erros de transcrição que geravam retrabalho e conflitos de dados desapareceram; e a diretoria passou a tomar decisões com base no que estava acontecendo naquele dia, não na semana anterior. A velocidade de resposta a problemas aumentou radicalmente. Uma queda nas vendas de segunda-feira era identificada e investigada na segunda-feira — não na reunião de sexta.',
      },
      {
        type: 'callout',
        text: 'Dado em tempo real não é luxo de empresa grande. É o mínimo que qualquer negócio sério precisa para competir. A diferença entre quem cresce e quem fica estagnado raramente é falta de esforço — é frequentemente falta de informação rápida o suficiente para agir quando ainda faz diferença.',
      },
    ],
  },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug);
}
