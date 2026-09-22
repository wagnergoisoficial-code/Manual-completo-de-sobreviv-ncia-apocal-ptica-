import { QuizQuestion, Chapter, Bonus } from './types';

// Link do checkout. Hoje é um Payment Link do Stripe; o nome da constante é genérico de
// propósito, para que trocar de processador de novo não espalhe renomeação pelo código.
export const CHECKOUT_URL = import.meta.env.VITE_CHECKOUT_URL || "https://buy.stripe.com/8x2fZiesE5Zteuy9tpgA800";

// Link ou ID do Vídeo do YouTube para a VSL
// VOCÊ PODE COLOCAR SEU LINK DO YOUTUBE DIRETAMENTE ENTRE AS ASPAS ABAIXO:
// Exemplo: "export const YOUTUBE_VIDEO_URL = import.meta.env.VITE_YOUTUBE_URL || "COLE_AQUI_SEU_LINK_DO_YOUTUBE";" ou apenas "SEU_CODIGO"
export const YOUTUBE_VIDEO_URL = import.meta.env.VITE_YOUTUBE_URL || "https://www.youtube-nocookie.com/embed/l-aEepzAjvI?rel=0&modestbranding=1";

// Thumbnail da VSL. Vazio = usa o frame do próprio vídeo no YouTube; preencha com a URL
// de uma imagem sua (ou VITE_VSL_POSTER) para trocar por um thumbnail feito à mão.
export const VSL_POSTER_URL = import.meta.env.VITE_VSL_POSTER || "";

export const EBOOK_TITLE = "Manual Completo de Sobrevivência Apocalíptica";
export const EBOOK_SUBTITLE = "A plataforma que transforma a preparação da sua casa em um plano com passos marcados.";

/**
 * O que já aconteceu no Brasil — a seção logo depois do topo.
 *
 * Fatos públicos e conferíveis, contados sem adjetivo. Nada aqui pode ser exagerado: a
 * página fala com uma família comum, e o que convence essa família é reconhecer o que ela
 * mesma viu no jornal, não um cenário de fim do mundo.
 */
export const JA_ACONTECEU = [
  {
    quando: "Greve dos caminhoneiros, 2018",
    oQue: "Em poucos dias, postos sem combustível e prateleiras vazias.",
  },
  {
    quando: "Amapá, 2020",
    oQue: "A maior parte do estado ficou dias sem luz, com racionamento de energia por semanas.",
  },
  {
    quando: "Rio Grande do Sul, 2024",
    oQue: "Enchentes deixaram bairros e cidades inteiras sem água potável.",
  },
] as const;

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

/**
 * O diagnóstico, em linguagem de casa.
 *
 * Cada pergunta é uma situação que a pessoa consegue imaginar na própria cozinha, e cada
 * resposta é algo que ela diria em voz alta — nada de termo técnico. As notas (10, 40–50,
 * 100) são as mesmas de antes, porque é delas que sai o resultado.
 */
export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    category: "water_food",
    question: "Se a água da rua parar hoje, quantos dias sua casa aguenta?",
    options: [
      { text: "Nenhum. Compro água quando preciso.", points: 10, feedback: "A água acaba no primeiro dia." },
      { text: "Uns 2 ou 3 dias.", points: 40, feedback: "Dá para os primeiros dias, não para uma falta longa." },
      { text: "Mais de uma semana, e sei deixar a água segura para beber.", points: 100, feedback: "A água está resolvida." }
    ]
  },
  {
    id: 2,
    category: "energy",
    question: "Se faltar luz por 3 dias, o que acontece na sua casa?",
    options: [
      { text: "Ficamos no escuro e a comida da geladeira estraga.", points: 10, feedback: "Sem luz, a casa para." },
      { text: "Temos lanterna, mas a comida da geladeira se perde.", points: 50, feedback: "A luz está resolvida; a comida, não." },
      { text: "Temos lanterna, pilhas e comida que não precisa de geladeira.", points: 100, feedback: "A casa segue funcionando." }
    ]
  },
  {
    id: 3,
    category: "comm_info",
    question: "Se o celular e a internet pararem, como vocês ficam sabendo das notícias e se encontram?",
    options: [
      { text: "Não teríamos como saber de nada.", points: 10, feedback: "Sem notícia e sem contato." },
      { text: "Temos um rádio, mas não combinamos nada entre nós.", points: 45, feedback: "Há notícia, mas não há plano." },
      { text: "Temos rádio a pilha e um lugar combinado para nos encontrarmos.", points: 100, feedback: "Notícia e plano, os dois." }
    ]
  },
  {
    id: 4,
    category: "medical",
    question: "Se alguém se machucar em casa e a ambulância demorar, você sabe o que fazer?",
    options: [
      { text: "Não. Eu ligaria e esperaria.", points: 10, feedback: "Tudo depende do socorro chegar." },
      { text: "Tenho uma caixa de primeiros socorros, mas não sei usar direito.", points: 40, feedback: "O material existe; falta saber usar." },
      { text: "Tenho a caixa completa e sei o básico de primeiros socorros.", points: 100, feedback: "Dá para cuidar até o socorro chegar." }
    ]
  },
  {
    id: 5,
    category: "tactical",
    question: "Se a Defesa Civil pedir para sair de casa agora, sua família sabe o que levar e para onde ir?",
    options: [
      { text: "Não. A gente decidiria na hora.", points: 10, feedback: "A decisão fica para o pior momento." },
      { text: "Sabemos para onde ir, mas nada está separado.", points: 45, feedback: "Há destino, mas a saída atrasa." },
      { text: "Sim. A mochila está pronta e o destino está combinado.", points: 100, feedback: "A família sai em minutos." }
    ]
  }
];

export const BONUSES: Bonus[] = [
  {
    id: 1,
    title: "Guia de Comunicação sem Internet e sem Celular",
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
    title: "Farmácia Doméstica de Emergência",
    value: "Grátis",
    description: "Como estocar antibióticos veterinários de forma segura, dosagens para humanos e o catálogo de plantas medicinais de alto rendimento atestadas por estudos de medicina de combate.",
    badge: "SOBREVIVÊNCIA BIOLÓGICA"
  }
];

/**
 * As perguntas que decidem a compra, na ordem em que a dúvida aparece.
 *
 * Primeiro o que é (e o que não é — o nome "apocalíptica" assusta quem só quer se prevenir
 * de um apagão), depois se serve para a casa da pessoa, e por fim preço, entrega e
 * garantia. A primeira fica aberta: é a objeção que mais afasta.
 */
export const FAQS = [
  {
    question: "É só para fim do mundo?",
    answer: "Não. Apesar do nome, o foco é o que já aconteceu no Brasil: apagão, enchente, falta de água e mercado vazio."
  },
  {
    question: "Estou comprando apenas um e-book?",
    answer: "Não. Você recebe a plataforma completa do Método 5P — área de membros com os 5 módulos, checklists e ferramentas — e, dentro dela, o Manual Completo em PDF para baixar, além dos 3 bônus."
  },
  {
    question: "Moro em apartamento. Serve?",
    answer: "Serve. O manual tem um capítulo específico para apartamento."
  },
  {
    question: "Vou gastar muito com equipamento?",
    answer: "Não. O plano começa pelo que você já tem em casa e mostra o que falta."
  },
  {
    question: "É assinatura?",
    answer: "Não. É pagamento único, sem mensalidade: você paga uma vez e o acesso é vitalício, com as atualizações e os novos módulos inclusos."
  },
  {
    question: "Como funciona o acesso depois que eu pago?",
    answer: "O pagamento é processado pelo Stripe; esta página não recebe pagamentos. Assim que ele é confirmado, você recebe por e-mail o login e a senha, com tudo já liberado. No Pix a confirmação costuma ser em minutos."
  },
  {
    question: "E se não servir para mim?",
    answer: "Você tem 7 dias de garantia. Basta escrever para o nosso suporte por e-mail e devolvemos o valor integralmente."
  }
];
