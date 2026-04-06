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
    title: 'Por Que o Seu Site Demora para Carregar — e Quanto Isso Está Te Custando',
    excerpt:
      'Um site lento não é só frustrante: é dinheiro indo embora. Entenda, de forma simples, o que faz um site ser rápido ou lento — e por que isso importa muito mais do que parece.',
    tags: ['Performance', 'Web', 'Experiência do Usuário'],
    accentColor: 'border-cyan-500/20',
    content: [
      {
        type: 'paragraph',
        text: 'Imagine entrar numa loja e esperar seis segundos na porta antes de alguém te deixar entrar. Você provavelmente viraria e iria embora. É exatamente isso que acontece quando um site demora para carregar. Estudos do Google mostram que mais da metade dos visitantes abandonam uma página se ela não abre em menos de três segundos. Velocidade não é um detalhe técnico — é a diferença entre ter ou perder um cliente.',
      },
      {
        type: 'heading',
        text: 'O boletim escolar do seu site',
      },
      {
        type: 'paragraph',
        text: 'O Google tem uma ferramenta chamada Lighthouse que funciona exatamente como um boletim escolar para sites. Ela avalia velocidade, acessibilidade, boas práticas e presença no buscador — e dá uma nota de 0 a 100 em cada categoria. Sites com notas altas aparecem melhor nas pesquisas e oferecem uma experiência muito mais agradável para quem visita. Todos os projetos que entregamos saem com nota máxima. Não porque é bonito no papel, mas porque isso impacta diretamente os resultados de quem nos contrata.',
      },
      {
        type: 'callout',
        text: 'Uma melhora de apenas 1 segundo no tempo de carregamento pode aumentar as conversões em até 27%, segundo dados da Deloitte. Para um negócio faturando R$ 50 mil por mês, isso representa mais de R$ 13 mil extras por ano — sem mudar absolutamente nada no produto.',
      },
      {
        type: 'heading',
        text: 'A pizza pronta vs. os ingredientes crus',
      },
      {
        type: 'paragraph',
        text: 'Quando você pede uma pizza, o restaurante prepara tudo na cozinha e entrega pronta. Seria absurdo te mandar os ingredientes crus para montar em casa. Mas é exatamente isso que sites lentos fazem — enviam um monte de código bruto para o seu celular ou computador processar. A tecnologia que usamos prepara tudo no servidor e entrega o resultado final, pronto para exibir. O visitante recebe a pizza pronta, não os ingredientes. O carregamento cai drasticamente e a experiência fica muito mais fluida.',
      },
      {
        type: 'heading',
        text: 'Imagens: o maior vilão invisível',
      },
      {
        type: 'paragraph',
        text: 'Sabe quando uma foto demora para aparecer e a página fica "pulando" enquanto carrega? Isso acontece porque a imagem não foi otimizada — e prejudica tanto quem visita quanto o ranqueamento no Google. A solução envolve algumas práticas simples que, juntas, fazem uma diferença enorme:',
      },
      {
        type: 'list',
        items: [
          'Converter imagens para formatos modernos que pesam até 60% menos sem perder qualidade visível',
          'Definir o espaço que a imagem vai ocupar antes de ela carregar, para a página não pular',
          'Carregar primeiro a imagem mais importante da tela — o restante vem depois',
          'Usar carregamento progressivo: a imagem aparece suavemente, sem salto brusco',
        ],
      },
      {
        type: 'heading',
        text: 'O servidor mais perto de você',
      },
      {
        type: 'paragraph',
        text: 'Quando você acessa um site hospedado num servidor em São Paulo e está em Manaus, os dados precisam percorrer essa distância — e isso adiciona tempo de espera. Existe uma solução chamada Edge Network: em vez de um único servidor central, há dezenas espalhados pelo mundo. O acesso de cada visitante é direcionado automaticamente para o mais próximo. O resultado é um site que parece instantâneo, não importa onde a pessoa esteja.',
      },
      {
        type: 'callout',
        text: 'Velocidade, design bonito e bom ranqueamento no Google não são coisas opostas. No Mezzold, performance faz parte do projeto desde o primeiro dia — não é um ajuste que vem no final.',
      },
    ],
  },

  {
    slug: 'micro-saas-do-zero-ao-lancamento',
    category: 'PRODUTO',
    categoryColor: 'text-blue-400 border-blue-500/30 bg-blue-500/5',
    date: '03 Março 2026',
    readTime: '6 min',
    title: 'Como Criar um Produto Digital que Gera Receita Todo Mês — Mesmo Quando Você Não Está Trabalhando',
    excerpt:
      'Você cria o produto uma vez e recebe por ele todos os meses. Esse é o modelo por trás de ferramentas como Notion, Spotify e Canva. Aqui explicamos como funciona e como transformamos uma ideia em produto real em menos de seis semanas.',
    tags: ['Produto Digital', 'SaaS', 'Empreendedorismo'],
    accentColor: 'border-blue-500/20',
    content: [
      {
        type: 'paragraph',
        text: 'Existe um modelo de negócio que mudou completamente a forma como software é criado e vendido. Ele tem um nome técnico — SaaS, de "Software as a Service" — mas o conceito é simples: você cria um programa uma vez e as pessoas pagam mensalmente para continuar usando. Notion, Spotify, Canva, Adobe, Microsoft Office — todos funcionam assim. A grande vantagem é a previsibilidade: ao contrário de um projeto que paga uma vez, esse modelo gera receita todo mês, mesmo nos dias em que você não trabalha.',
      },
      {
        type: 'heading',
        text: 'Você não precisa atender milhões de pessoas',
      },
      {
        type: 'paragraph',
        text: 'Um erro muito comum é achar que um produto digital precisa ser enorme para valer a pena. Não precisa. Um produto focado que resolve muito bem um problema específico para 200 clientes pagando R$ 97 por mês já representa quase R$ 20 mil de receita mensal previsível. Com 500 clientes, são R$ 48 mil. O segredo não está no tamanho do mercado, mas na clareza do problema que você resolve.',
      },
      {
        type: 'callout',
        text: 'O maior erro de quem quer criar um produto digital é passar meses desenvolvendo antes de conversar com qualquer cliente em potencial. Valide a ideia primeiro — descubra se alguém pagaria por ela antes de construir. O código vem depois.',
      },
      {
        type: 'heading',
        text: 'De ideia a produto em seis semanas',
      },
      {
        type: 'paragraph',
        text: 'Antigamente, criar um produto digital exigia uma equipe grande de engenheiros, servidores próprios e meses de trabalho. Hoje, com as ferramentas certas, dois desenvolvedores conseguem construir e lançar um produto completo em semanas. O que usamos resolve cada parte do problema de forma simples:',
      },
      {
        type: 'list',
        items: [
          'A parte visual e as regras de negócio ficam no mesmo lugar, sem precisar de sistemas separados',
          'Banco de dados, login de usuários e armazenamento de arquivos prontos para usar, sem configurar servidores',
          'Todo o sistema de pagamentos e cobranças mensais automáticas com integração simples',
          'Publicação automática a cada atualização, sem precisar de um time de infraestrutura',
          'Emails de confirmação, cobrança e boas-vindas enviados automaticamente, com visual profissional',
        ],
      },
      {
        type: 'heading',
        text: 'O dinheiro cai na conta automaticamente',
      },
      {
        type: 'paragraph',
        text: 'A parte de pagamentos é onde muita gente trava. Felizmente, as ferramentas atuais resolvem isso de forma quase completa. O sistema cuida das cobranças mensais automáticas, das falhas de cartão com novas tentativas, das notas fiscais e até de um portal onde o próprio cliente gerencia a assinatura — upgrade, downgrade, cancelamento — sem precisar acionar nenhum suporte. Você configura uma vez e o processo funciona sozinho.',
      },
      {
        type: 'heading',
        text: 'Os primeiros clientes não aparecem sozinhos',
      },
      {
        type: 'paragraph',
        text: 'Produto pronto não significa clientes na porta. Os primeiros usuários de produtos que acompanhamos vieram sempre de três lugares: uma publicação honesta no Product Hunt no dia do lançamento, uma explicação clara nas redes sociais focada no problema resolvido — não no produto em si — e presença nas comunidades onde o público-alvo já conversa. A tecnologia resolve o produto. A comunicação conecta esse produto às pessoas certas.',
      },
      {
        type: 'callout',
        text: 'Receita recorrente muda a lógica do negócio: em vez de correr atrás de novos clientes o tempo todo, você foca em entregar valor para quem já paga — e o faturamento cresce de forma previsível, mês após mês.',
      },
    ],
  },

  {
    slug: 'motion-design-interfaces-que-vivem',
    category: 'DESIGN',
    categoryColor: 'text-violet-400 border-violet-500/30 bg-violet-500/5',
    date: '18 Fevereiro 2026',
    readTime: '5 min',
    title: 'Por Que Alguns Sites Parecem Vivos — e Como Esse Efeito é Criado',
    excerpt:
      'Sabe aquela sensação de que um site tem personalidade, que responde ao seu toque de forma natural? Isso não é sorte. É uma decisão de design muito precisa — e neste artigo explicamos como funciona.',
    tags: ['Design', 'Animação', 'Experiência do Usuário'],
    accentColor: 'border-violet-500/20',
    content: [
      {
        type: 'paragraph',
        text: 'Pense nos aplicativos e sites que você mais gosta de usar. Provavelmente eles têm algo em comum: respondem ao seu toque de forma suave, os elementos aparecem com elegância, nada parece brusco ou robótico. Isso não é coincidência — é o resultado de decisões muito conscientes sobre como e quando as coisas se movem. Essa disciplina tem um nome: Motion Design.',
      },
      {
        type: 'heading',
        text: 'A diferença entre mecânico e natural',
      },
      {
        type: 'paragraph',
        text: 'Pense na diferença entre um elevador de carga e uma porta de carro de luxo. Os dois abrem e fecham, mas um parece rígido e o outro parece fluido. A maioria dos sites usa o equivalente ao elevador de carga: animações que se movem na mesma velocidade do começo ao fim, como um objeto deslizando num trilho. O que fazemos é baseado em física real — o elemento acelera no início e desacelera naturalmente no final, como objetos do mundo real se comportam. O resultado é uma interface que parece viva, não programada.',
      },
      {
        type: 'heading',
        text: 'O ritmo que ninguém percebe conscientemente',
      },
      {
        type: 'paragraph',
        text: 'Quando vários elementos precisam aparecer juntos — uma lista de cards ou uma grade de produtos — fazer tudo aparecer ao mesmo tempo parece abrupto, quase agressivo. A solução é fazer cada elemento aparecer com um pequeno atraso em relação ao anterior, criando uma sensação de cascata elegante. O segredo está na sutileza: uma diferença de 60 a 80 milissegundos entre cada item já é suficiente. Mais do que isso começa a parecer lento. Menos do que isso e o efeito some. É uma questão de ritmo.',
      },
      {
        type: 'callout',
        text: 'A melhor animação é aquela que você sente, mas não consegue descrever exatamente o que aconteceu. Se o usuário para para assistir à animação, ela está lenta demais.',
      },
      {
        type: 'heading',
        text: 'Os detalhes que ninguém nota, mas todo mundo sente',
      },
      {
        type: 'paragraph',
        text: 'Micro-interações são as pequenas respostas visuais do site ao que você faz: o botão que pressiona levemente quando clicado, o ícone que muda ao concluir uma ação, o campo de texto que sinaliza sutilmente quando há um erro. Individualmente, cada uma parece irrelevante. Juntas, elas constroem a sensação de que o produto foi feito com cuidado — e isso cria confiança. As pessoas confiam mais em produtos que parecem polidos, mesmo sem saber exatamente por quê.',
      },
      {
        type: 'list',
        items: [
          'Botões com escala sutil no clique — confirma que o sistema recebeu o comando',
          'Cards que se elevam e iluminam no hover — indica claramente que o elemento é clicável',
          'Transições suaves entre páginas — eliminam a sensação de salto brusco entre telas',
          'Ícones que animam ao confirmar ações — copiar, salvar, enviar com feedback visual imediato',
        ],
      },
      {
        type: 'heading',
        text: 'Quando o design vai além do que o olho nu percebe',
      },
      {
        type: 'paragraph',
        text: 'Alguns efeitos visuais que usamos — gradientes animados em tempo real, partículas em movimento, distorções suaves de fundo — não são possíveis com técnicas comuns de design para web. Usamos uma tecnologia que roda diretamente na placa de vídeo do computador, calculando a cor de cada pixel da tela em tempo real. O resultado são efeitos cinematográficos que rodam com fluidez absoluta e sem impactar a velocidade do resto do site.',
      },
      {
        type: 'heading',
        text: 'Design bonito que funciona para todo mundo',
      },
      {
        type: 'paragraph',
        text: 'Algumas pessoas têm condições de saúde que tornam animações intensas desconfortáveis ou até perigosas — como epilepsia ou sensibilidade a movimentos. Por isso, todos os nossos projetos detectam automaticamente quando o usuário configurou o dispositivo para reduzir movimentos e adaptam a experiência de acordo. Design premium não ignora quem tem necessidades específicas. Pelo contrário: considera essas pessoas desde o início.',
      },
    ],
  },

  {
    slug: 'automacao-dashboards-24-7',
    category: 'AUTOMAÇÃO',
    categoryColor: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/5',
    date: '10 Fevereiro 2026',
    readTime: '6 min',
    title: 'Chega de Planilha: Como Ver os Números do Seu Negócio em Tempo Real Muda Tudo',
    excerpt:
      'Imagine ver o faturamento do dia atualizar na tela no exato momento em que a venda acontece. Sem pedir relatório para ninguém. Sem esperar o fim do mês. É isso que construímos — e aqui explicamos como.',
    tags: ['Automação', 'Dashboard', 'Gestão'],
    accentColor: 'border-emerald-500/20',
    content: [
      {
        type: 'paragraph',
        text: 'Toda empresa gera dados o tempo todo: vendas, pedidos, atendimentos, estoque, campanhas. O problema é que, na maioria dos negócios, essas informações ficam espalhadas em planilhas, sistemas diferentes e emails — e alguém precisa juntar tudo manualmente para ter uma visão do que está acontecendo. Esse processo é lento, caro e cheio de erros. E existe uma forma muito melhor de fazer isso.',
      },
      {
        type: 'heading',
        text: 'O que é um dashboard em tempo real',
      },
      {
        type: 'paragraph',
        text: 'Um dashboard é uma tela única que mostra os números mais importantes do negócio, atualizada automaticamente, sem que ninguém precise fazer nada. "Em tempo real" significa exatamente isso: quando uma venda acontece, o número aparece na tela em questão de segundos. Não no próximo relatório semanal. Não depois de alguém atualizar a planilha. Agora. É a diferença entre dirigir olhando pelo retrovisor e enxergar a estrada à sua frente.',
      },
      {
        type: 'callout',
        text: 'Um cliente do setor de logística reduziu 12 horas semanais de trabalho manual para um processo automatizado que roda em 4 minutos. A equipe parou de criar planilhas e começou a tomar decisões — que é o trabalho que realmente importa.',
      },
      {
        type: 'heading',
        text: 'Como os dados chegam até a tela sem ninguém enviar',
      },
      {
        type: 'paragraph',
        text: 'Pense numa agência de correios muito eficiente. Quando algo importante acontece — uma venda é concluída, um pedido muda de status, um atendimento é aberto — uma mensagem é automaticamente enviada para todos os sistemas que precisam saber disso. O dashboard é um desses destinatários: ao receber a mensagem, ele atualiza os números imediatamente. Nenhuma pessoa precisou intervir. Nenhum dado se perdeu no caminho.',
      },
      {
        type: 'heading',
        text: 'Conectar o que você já usa, não substituir tudo',
      },
      {
        type: 'paragraph',
        text: 'A maioria das empresas já usa várias ferramentas: um sistema de vendas, uma plataforma de pagamentos, um CRM, talvez alguma ferramenta de atendimento. Dashboards modernos se conectam a todas essas fontes ao mesmo tempo e consolidam tudo em um só lugar. Não é preciso abandonar o que já funciona — apenas fazer com que as peças conversem entre si.',
      },
      {
        type: 'list',
        items: [
          'Vendas de qualquer plataforma de pagamento aparecem automaticamente no painel',
          'O funil de vendas do CRM atualiza em tempo real, sem ninguém precisar registrar manualmente',
          'Relatórios chegam por email toda segunda-feira de manhã, sem ninguém precisar gerar',
          'Alertas automáticos avisam quando uma métrica importante cai abaixo do esperado',
        ],
      },
      {
        type: 'heading',
        text: 'E quando algo der errado?',
      },
      {
        type: 'paragraph',
        text: 'Integrações dependem de sistemas externos — e sistemas externos às vezes ficam fora do ar por alguns minutos. Um sistema bem construído não perde nenhum dado nesse cenário. Se o destino não responde, a mensagem aguarda numa fila e tenta novamente com intervalos crescentes. Para o usuário final, é completamente transparente. Para o negócio, significa zero perda de informação, mesmo em momentos de instabilidade.',
      },
      {
        type: 'heading',
        text: 'O que muda de verdade quando você tem isso',
      },
      {
        type: 'paragraph',
        text: 'Quando automatizamos o processo de um cliente de logística, três coisas aconteceram ao mesmo tempo: as 12 horas semanais de trabalho manual viraram 4 minutos de processamento automático; os erros de digitação que geravam retrabalho desapareceram; e a gestão passou a tomar decisões com base nos dados do dia, não da semana anterior. O custo operacional caiu. A qualidade das decisões subiu. Esse é o impacto real da automação — não é sobre tecnologia, é sobre liberar pessoas para fazerem o que realmente faz diferença.',
      },
      {
        type: 'callout',
        text: 'Nenhum gestor deveria passar horas copiando dados entre sistemas. Esse tempo tem um valor enorme — e deveria ser usado em estratégia, relacionamento e crescimento.',
      },
    ],
  },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug);
}
