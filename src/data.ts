import { QuizQuestion, Chapter, Bonus } from './types';

// Link de Checkout Oficial da Kiwify - Pode ser configurado pela variável VITE_KIWIFY_URL
export const KIWIFY_CHECKOUT_URL = import.meta.env.VITE_KIWIFY_URL || "https://pay.kiwify.com.br/jJXmZkl";

// Link ou ID do Vídeo do YouTube para a VSL
// VOCÊ PODE COLOCAR SEU LINK DO YOUTUBE DIRETAMENTE ENTRE AS ASPAS ABAIXO:
// Exemplo: "export const YOUTUBE_VIDEO_URL = import.meta.env.VITE_YOUTUBE_URL || "COLE_AQUI_SEU_LINK_DO_YOUTUBE";" ou apenas "SEU_CODIGO"
export const YOUTUBE_VIDEO_URL = import.meta.env.VITE_YOUTUBE_URL || "https://www.youtube-nocookie.com/embed/JN376P1nCZY?rel=0&modestbranding=1";

// Thumbnail da VSL. Vazio = usa o frame do próprio vídeo no YouTube; preencha com a URL
// de uma imagem sua (ou VITE_VSL_POSTER) para trocar por um thumbnail feito à mão.
export const VSL_POSTER_URL = import.meta.env.VITE_VSL_POSTER || "";

export const EBOOK_TITLE = "Manual Completo de Sobrevivência Apocalíptica";
export const EBOOK_SUBTITLE = "A plataforma que transforma a preparação da sua casa em um plano com passos marcados.";

export const CHAPTERS: Chapter[] = [
  {
    number: 1,
    tag: "PREVENÇÃO",
    title: "O Colapso de Redes Complexas",
    subtitle: "Como a falta chega antes do aviso",
    description: "Como um problema em um ponto só derruba luz, água e abastecimento em menos de 72 horas — e quais são os sinais que aparecem antes disso, enquanto ainda dá tempo de agir.",
    topics: [
      "Por que uma falha pequena vira apagão geral",
      "Como manter a casa habitável nas primeiras horas sem energia",
      "Os 3 sinais de desabastecimento que aparecem antes das prateleiras vazias"
    ]
  },
  {
    number: 2,
    tag: "PROVISÃO",
    title: "Autonomia Hídrica e Nutrição Pragmática",
    subtitle: "Água e comida sem depender da rede",
    description: "Como ter água potável em casa sem depender de galão, e como conservar comida quando a geladeira para de funcionar.",
    topics: [
      "Filtro de gravidade caseiro, montado em estágios com carvão ativado",
      "Secagem, salga e fermentação: comida que dura sem geladeira",
      "O que dá para comer do que já cresce perto de você"
    ]
  },
  {
    number: 3,
    tag: "PERSISTÊNCIA",
    title: "Comunicação Quando Tudo Sai do Ar",
    subtitle: "Rádio e ondas curtas, começando do zero",
    description: "Como continuar recebendo notícia e falando com a sua família quando o celular e a internet saírem do ar — com rádio barato, do jeito mais simples possível.",
    topics: [
      "Antena de emergência feita com fio comum",
      "Como falar pelo rádio sem entregar onde você está",
      "As frequências de resgate que valem a pena deixar anotadas"
    ]
  },
  {
    number: 4,
    tag: "PROTEÇÃO · SAÚDE",
    title: "Farmácia de Emergência e Cirurgia de Campo",
    subtitle: "Primeiros socorros quando o socorro demora",
    description: "O que fazer diante de um ferimento grave ou de uma infecção enquanto o socorro não chega — e o que vale a pena ter guardado em casa antes de precisar.",
    topics: [
      "Como estancar um sangramento grave e quando usar torniquete",
      "O que vale ter na farmacinha de emergência e como armazenar",
      "Como manter higiene mínima em ambiente sujo"
    ]
  },
  {
    number: 5,
    tag: "PROTEÇÃO · SEGURANÇA",
    title: "Psicologia de Massas e Defesa de Perímetro",
    subtitle: "Segurança sem chamar atenção",
    description: "Como não virar alvo: passar despercebido na rua, deixar a casa discreta e organizar a vizinhança antes que o clima esquente.",
    topics: [
      "O 'homem cinzento': transitar sem chamar atenção",
      "Proteger a casa sem transformá-la num alvo",
      "Como organizar vizinhos e evitar conflito"
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
    value: "Grátis",
    description: "O atlas definitivo contendo o mapa de frequências oficiais do governo, frequências militares ativas e o manual prático para montar receptores de ondas curtas usando sucatas eletrônicas.",
    badge: "EXCLUSIVO DE HOJE"
  },
  {
    id: 2,
    title: "Checklist do Protocolo de Evacuação de 72 Horas",
    value: "Grátis",
    description: "Um infográfico tático de ação imediata em formato PDF. Um fluxograma contendo passos milimetricamente calculados para as primeiras 72 horas pós-desastre cibernético ou financeiro.",
    badge: "ESSENCIAL"
  },
  {
    id: 3,
    title: "Guia da Farmácia Natural e Antibióticos de Emergência",
    value: "Grátis",
    description: "Como estocar antibióticos veterinários de forma segura, dosagens para humanos e o catálogo de plantas medicinais de alto rendimento atestadas por estudos de medicina de combate.",
    badge: "SOBREVIVÊNCIA BIOLÓGICA"
  }
];

/**
 * As quatro perguntas que decidem a compra: preço, o que é, como chega e o que acontece
 * se não servir. As demais foram cortadas — respondê-las aqui era repetir, em parágrafo,
 * o que a página já mostra.
 */
export const FAQS = [
  {
    question: "Quanto custa?",
    answer: "R$ 39,90, pagamento único. Não é assinatura e não tem mensalidade: você paga uma vez e o acesso é vitalício, com as atualizações e os novos módulos inclusos."
  },
  {
    question: "Estou comprando apenas um e-book?",
    answer: "Não. Você recebe a plataforma completa do Método 5P — área de membros com os 5 módulos, checklists e ferramentas — e, dentro dela, o Manual Completo em PDF para baixar, além dos 3 bônus."
  },
  {
    question: "Como funciona o acesso depois que eu pago?",
    answer: "A compra é finalizada na Kiwify; esta página não recebe pagamentos. Assim que o pagamento é confirmado, você recebe por e-mail o login e a senha, com tudo já liberado."
  },
  {
    question: "E se não servir para mim?",
    answer: "Você tem 7 dias de garantia. Basta escrever para o nosso suporte por e-mail e devolvemos os R$ 39,90 integralmente."
  }
];
