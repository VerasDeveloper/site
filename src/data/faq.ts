export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'preco',
    question: 'Quanto custa desenvolver um site?',
    answer:
      'Temos opções transparentes para começar: Plano Básico por R$ 640,00 (Pix à vista ou cartão de crédito), Plano Premium por R$ 1.100,00 (Pix à vista ou cartão de crédito) e Plano Mensal por R$ 89,90/mês com taxa de implantação de R$ 210,00. Para sistemas personalizados e plataformas completas, elaboramos um orçamento específico conforme o escopo.',
  },
  {
    id: 'prazo',
    question: 'Quanto tempo demora para entregar um projeto?',
    answer:
      'O prazo depende da complexidade do escopo. Projetos mais enxutos, como sites simples e landing pages com materiais definidos e aprovações ágeis, podem ser entregues em até um dia. Sistemas personalizados e plataformas completas passam por etapas estruturadas de planejamento e desenvolvimento com cronograma combinado previamente.',
  },
  {
    id: 'sistemas',
    question: 'Vocês desenvolvem sistemas personalizados?',
    answer:
      'Sim. Além de sites e landing pages, desenvolvemos sistemas web, painéis administrativos, fluxos de agendamento online e plataformas com banco de dados e regras pensadas exatamente para a rotina do seu negócio.',
  },
  {
    id: 'celulares',
    question: 'O site funciona em celulares?',
    answer:
      'Sim. Todos os projetos são desenvolvidos de forma responsiva, adaptando tipografia, layout, navegação e interações para oferecer uma experiência confortável em celulares, tablets e computadores.',
  },
  {
    id: 'alteracoes',
    question: 'Posso solicitar alterações depois da entrega?',
    answer:
      'Sim. Como o projeto é pensado para acompanhar a evolução do negócio, oferecemos suporte para atualizações, ajustes de conteúdo, melhorias visuais e novas funcionalidades sempre que você precisar.',
  },
  {
    id: 'cidades',
    question: 'Vocês atendem empresas de outras cidades?',
    answer:
      'Sim. Nosso atendimento é totalmente online e estruturado para atender empresas, comércios e empreendedores em diferentes cidades do Brasil, com comunicação direta em todas as etapas.',
  },
];
