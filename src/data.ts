import { QuizQuestion, Chapter, Bonus, Testimonial } from './types';

export const EBOOK_TITLE = "Manual Completo de Sobrevivência Apocalíptica";
export const EBOOK_SUBTITLE = "O guia definitivo de autonomia tática e resiliência civil para mentes estratégicas contemporâneas.";

export const CHAPTERS: Chapter[] = [
  {
    number: 1,
    title: "O Colapso de Redes Complexas",
    subtitle: "A Anatomia da Interrupção de Cadeia de Suprimentos",
    description: "Uma análise analítica detalhada sobre como o efeito cascata derruba a rede elétrica (Grid-Down), o fornecimento de água potável e a distribuição logística alimentar em menos de 72 horas.",
    topics: [
      "A teoria do caos aplicada às redes de energia hiperconectadas",
      "O protocolo de isolamento térmico residencial imediato",
      "Como identificar os primeiros 3 sinais invisíveis de desabastecimento urbano"
    ]
  },
  {
    number: 2,
    title: "Autonomia Hídrica e Nutrição Pragmática",
    subtitle: "Termodinâmica da Conservação Alimentar Sem Eletricidade",
    description: "Métodos avançados de purificação molecular da água e conservação de macronutrientes sob condições climáticas adversas ou escassez absoluta de recursos industriais.",
    topics: [
      "Filtração de múltiplos estágios por gravidade e carvão ativado ativado",
      "A física da preservação calórica: secagem, salga e fermentação off-grid",
      "Fontes alternativas de micronutrientes resilientes na flora urbana"
    ]
  },
  {
    number: 3,
    title: "Criptografia Analógica e Redes Silenciosas",
    subtitle: "Comunicações Resilientes com Rádios VHF/UHF e Ondas Curtas",
    description: "Como estabelecer redes de comunicação privada com rádio amador (Baofeng, rádios de ondas curtas) e codificar dados em canais abertos contra monitoramento eletrônico.",
    topics: [
      "Configuração e calibração de antenas de emergência com fios comuns",
      "O protocolo de comunicação por bursts e segurança de localização",
      "Tabelas de frequências internacionais de resgate (HF/VHF/UHF)"
    ]
  },
  {
    number: 4,
    title: "Farmácia de Emergência e Cirurgia de Campo",
    subtitle: "Protocolos Clínicos de Linha de Frente sem Apoio Institucional",
    description: "Gerenciamento de ferimentos graves, controle de infecções sem antibióticos convencionais e fitoterapia de espectro amplo fundamentada cientificamente.",
    topics: [
      "Estancamento de hemorragia severa e uso estratégico de torniquetes",
      "Antibióticos alternativos veterinários e naturais: dosagem e espectro",
      "Procedimentos estéreis em ambientes contaminados"
    ]
  },
  {
    number: 5,
    title: "Psicologia de Massas e Defesa de Perímetro",
    subtitle: "A Dinâmica Comportamental no Caos Sistêmico",
    description: "Desenvolvimento de inteligência situacional, minimização de assinatura de calor/luz e estabelecimento de perímetros defensivos comunitários discretos.",
    topics: [
      "Doutrina do 'Homem Cinzento' (Gray Man) em centros metropolitanos",
      "Sistemas de alerta passivos e fortificação furtiva de abrigos",
      "Mediação de crises, liderança tática e coesão social comunitária"
    ]
  }
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    category: "water_food",
    question: "Em caso de colapso repentino da rede de abastecimento urbano, qual é a sua autonomia hídrica real?",
    options: [
      { text: "Nenhuma. Dependo de compras diárias ou galões de água mineral.", points: 10, feedback: "Vulnerabilidade Crítica: Você é altamente dependente da infraestrutura pública para o insumo mais básico." },
      { text: "Possuo reservas de água potável para no máximo 3 a 5 dias.", points: 40, feedback: "Vulnerabilidade Moderada: Você tem uma janela de adaptação curta, mas insuficiente para crises prolongadas." },
      { text: "Possuo sistemas de captação de chuva e purificação ativa de múltiplos estágios para meses.", points: 100, feedback: "Resiliência Excelente: Sua infraestrutura de captação e esterilização está alinhada a padrões táticos." }
    ]
  },
  {
    id: 2,
    category: "energy",
    question: "Se a rede elétrica falhar por mais de 2 semanas (cenário Grid-Down), como lidaria com a conservação e energia?",
    options: [
      { text: "Toda a comida estragaria no congelador e eu ficaria sem iluminação ou carregamento.", points: 10, feedback: "Sem Autonomia: A falta de refrigeração e iluminação causará colapso alimentar imediato." },
      { text: "Tenho baterias portáteis ou gerador básico a combustível para 2 ou 3 dias de emergência.", points: 50, feedback: "Autonomia Limitada: Dependência de combustíveis fósseis que desaparecerão rapidamente do mercado." },
      { text: "Tenho microgeração solar independente de rede com banco de baterias LiFePO4 e inversores off-grid.", points: 100, feedback: "Autonomia Soberana: Você possui uma minirrede fechada, essencial para o longo prazo." }
    ]
  },
  {
    id: 3,
    category: "comm_info",
    question: "Sem internet celular, fibra óptica ou redes móveis, como você receberia informações cruciais ou falaria com aliados?",
    options: [
      { text: "Ficaria totalmente incomunicável e sem saber o que está ocorrendo lá fora.", points: 10, feedback: "Blackout Cognitivo: Sem dados táticos, você operará às cegas no caos." },
      { text: "Faria uso de walkie-talkies brinquedo ou esperaria por notícias impressas / megafone de autoridades.", points: 45, feedback: "Autonomia Frágil: Alcance extremamente reduzido e dependência de canais sob controle estatal." },
      { text: "Opero rádio PX/PY de alta frequência com antenas direcionais e conheço frequências de ondas curtas.", points: 100, feedback: "Autonomia Forte: Você tem inteligência eletromagnética ativa capaz de cruzar fronteiras." }
    ]
  },
  {
    id: 4,
    category: "medical",
    question: "Se um membro de seu grupo sofrer uma hemorragia arterial severa ou infecção aguda profunda sem hospitais disponíveis:",
    options: [
      { text: "Chamaria o socorro de emergência clássico (SAMU/bombeiros) e aguardaria.", points: 10, feedback: "Risco Letal: Em colapsos, o tempo de resposta institucional cessa por completo." },
      { text: "Tenho uma maleta de primeiros socorros padrão com curativos comuns e esparadrapo.", points: 40, feedback: "Insuficiência Médica: Gazes comuns não contêm sangramentos arteriais severos ou infecções bacterianas." },
      { text: "Possuo kit APH tático (torniquetes, agentes hemostáticos, selos de tórax) e antibióticos estocados.", points: 100, feedback: "Autonomia Médica: Nível tático avançado. Capacidade real de preservação da vida." }
    ]
  },
  {
    id: 5,
    category: "tactical",
    question: "Qual é a sua postura estratégica em termos de mobilidade e segurança perimetral urbana?",
    options: [
      { text: "Ficaria no meu apartamento convencional acreditando que os portões de ferro do condomínio seguram invasões.", points: 10, feedback: "Alvo Estático: Prédios e condomínios tornam-se armadilhas térmicas e de fome em poucos dias." },
      { text: "Tenho um veículo abastecido e planejo fugir para o interior assim que o pânico começar nas rodovias.", points: 45, feedback: "Risco Logístico: Rodovias congestionadas tornam-se zonas vermelhas de emboscada e retenção física." },
      { text: "Adoto a filosofia do 'Homem Cinzento' com abrigo fortificado furtivamente e rotas alternativas de escape a pé mapeadas.", points: 100, feedback: "Estrategista Avançado: Mobilidade furtiva e fortificação invisível de baixo perfil." }
    ]
  }
];

export const BONUSES: Bonus[] = [
  {
    id: 1,
    title: "O Guia Secreto de Telecomunicações Resilientes",
    value: "R$ 97,00",
    description: "O atlas definitivo contendo o mapa de frequências oficiais do governo, frequências militares ativas e o manual prático para montar receptores de ondas curtas usando sucatas eletrônicas.",
    badge: "EXCLUSIVO DE HOJE"
  },
  {
    id: 2,
    title: "Checklist do Protocolo de Evacuação de 72 Horas",
    value: "R$ 49,00",
    description: "Um infográfico tático de ação imediata em formato PDF. Um fluxograma contendo passos milimetricamente calculados para as primeiras 72 horas pós-desastre cibernético ou financeiro.",
    badge: "ESSENCIAL"
  },
  {
    id: 3,
    title: "Guia da Farmácia Natural e Antibióticos de Emergência",
    value: "R$ 79,00",
    description: "Como estocar antibióticos veterinários de forma segura, dosagens para humanos e o catálogo de plantas medicinais de alto rendimento atestadas por estudos de medicina de combate.",
    badge: "SOBREVIVÊNCIA BIOLÓGICA"
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: "Cel. Roberto M. Menezes",
    role: "Analista de Riscos Geopolíticos & Ex-Oficial de Operações Especiais",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=120&auto=format&fit=crop",
    quote: "Este material preenche uma lacuna que a maioria das literaturas peca por ignorar: a análise de sistemas complexos. O manual não propõe fanatismos irreais de bunker; propõe planos de contingência civil sob altíssima pressão analítica. Uma obra-prima de engenharia social e tática militar civil.",
    verified: true
  },
  {
    id: 2,
    name: "Dra. Carolina Alencar",
    role: "Pesquisadora de Resiliência Urbana e Medicina de Resgate",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=120&auto=format&fit=crop",
    quote: "A seção de autonomia alimentar e potabilização de água por gravidade utiliza termos físicos e químicos de precisão cirúrgica. É um verdadeiro compêndio acadêmico voltado para a prática extrema. Essencial para acadêmicos, engenheiros e qualquer pessoa dotada de visão de futuro.",
    verified: true
  },
  {
    id: 3,
    name: "Arthur S. Guttemberg",
    role: "Investidor de Risco e Entusiasta de Tecnologias Descentralizadas",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=120&auto=format&fit=crop",
    quote: "No mercado financeiro, nos preparamos para cisnes negros. Na vida real, a lógica é exatamente a mesma. O capítulo sobre criptografia e rádios off-grid se assemelha a protocolos de redes Mesh descentralizadas. Leitura obrigatória para os cérebros fora da curva.",
    verified: true
  }
];

export const FAQS = [
  {
    question: "O que realmente este e-book ensina?",
    answer: "O Manual Completo de Sobrevivência Apocalíptica ensina um sistema integrado de auto-defesa e autossuficiência civil. Você aprenderá: 1) Purificação molecular de água contaminada sem filtros comerciais; 2) Preservação de calorias e macronutrientes em cenários de Grid-Down (rede elétrica desligada); 3) Comunicações analógicas criptografadas off-grid com rádios amadores de baixo custo; 4) Protocolos de APH tático, estancamento de hemorragia severa e controle cirúrgico de infecções sem hospitais; 5) A doutrina de ocultamento urbano 'Homem Cinzento' para transitar por zonas de conflito de forma invisível. É um plano tático pragmático, livre de teorias e focado em engenharia de sobrevivência pura."
  },
  {
    question: "Como este manual resolve o problema do desabastecimento de água e comida?",
    answer: "Em vez de sugerir estoques caros e vulneráveis, o manual ensina a física por trás dos recursos. Você aprenderá a construir um dessalinizador e filtro de gravidade de fluxo contínuo usando insumos descartáveis, e a dominar técnicas de desidratação e fermentação natural off-grid. Isso garante que você e sua família tenham água potável e nutrição estável infinitamente, mesmo que as distribuidoras colapsem por completo."
  },
  {
    question: "Não entendo nada de rádio ou frequências. Vou conseguir me comunicar?",
    answer: "Sim. O manual foi escrito com linguagem direta e passo a passo cirúrgico. Nós removemos a complexidade acadêmica e entregamos diagramas visuais prontos para uso. Você aprenderá exatamente quais botões apertar no seu rádio, quais antenas improvisadas esticar no telhado e quais frequências de ondas curtas sintonizar para receber notícias reais quando a internet e as redes celulares forem cortadas."
  },
  {
    question: "O que fazer em caso de ferimentos graves ou infecções se os hospitais pararem?",
    answer: "O manual dedica um módulo inteiro aos protocolos clínicos de linha de frente. Você aprenderá a improvisar torniquetes funcionais, estancar hemorragias arteriais sob extrema pressão, realizar suturas básicas e estocar/utilizar antibióticos de amplo espectro com segurança. É o escudo biológico que separa a vida da morte em um blackout institucional."
  },
  {
    question: "Como receberei o manual?",
    answer: "O envio é 100% digital, imediato e totalmente automatizado. Assim que sua inscrição for confirmada pelo nosso sistema de pagamento seguro (seja por PIX ou Cartão de Crédito), você receberá um e-mail com o link de acesso seguro e as instruções para download imediato do e-book e de todos os bônus incluídos."
  },
  {
    question: "E se eu sentir que o conteúdo é avançado demais ou não serve para mim?",
    answer: "Oferecemos uma garantia incondicional de 7 dias. Se por qualquer motivo você julgar que as instruções e diagramas contidos no manual não elevam seu patamar de segurança e preparação, basta entrar em contato com o nosso suporte por e-mail para receber o reembolso integral de 100% do seu investimento de forma simples e rápida."
  }
];
