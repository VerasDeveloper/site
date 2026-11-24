export interface SolutionItem {
  id: string;
  number: string;
  title: string;
  description: string;
  focusLabel: string;
  architecturePoints: string[];
  visualType:
    | 'website'
    | 'landing'
    | 'system'
    | 'platform'
    | 'evolution'
    | 'process';
}

export const SOLUTIONS: SolutionItem[] = [
  {
    id: 'sites-profissionais',
    number: '01',
    title: 'Sites profissionais',
    description:
      'Sites modernos, responsivos e desenvolvidos para fortalecer a presença digital e gerar oportunidades comerciais.',
    focusLabel: 'Presença institucional e credibilidade',
    architecturePoints: [
      'Estrutura responsiva para celular, tablet e desktop',
      'Velocidade de carregamento e SEO técnico estruturado',
      'Botões e caminhos pensados para contato comercial',
    ],
    visualType: 'website',
  },
  {
    id: 'landing-pages',
    number: '02',
    title: 'Landing Pages',
    description:
      'Páginas estratégicas projetadas para transformar visitantes em contatos e clientes.',
    focusLabel: 'Foco direto em conversão',
    architecturePoints: [
      'Hierarquia clara de proposta de valor e prova',
      'Formulários e integração imediata com WhatsApp',
      'Experiência direta para campanhas e tráfego pago',
    ],
    visualType: 'landing',
  },
  {
    id: 'sistemas-personalizados',
    number: '03',
    title: 'Sistemas personalizados',
    description:
      'Sistemas web desenvolvidos para organizar processos, administrar operações e resolver necessidades específicas.',
    focusLabel: 'Operação e organização interna',
    architecturePoints: [
      'Fluxos desenhados para a rotina real da empresa',
      'Cadastro, controle de etapas e relatórios claros',
      'Acesso seguro pelo navegador sem planilhas soltas',
    ],
    visualType: 'system',
  },
  {
    id: 'plataformas-digitais',
    number: '04',
    title: 'Plataformas digitais',
    description:
      'Soluções completas com funcionalidades personalizadas, usuários, banco de dados e painéis administrativos.',
    focusLabel: 'Produtos digitais sob medida',
    architecturePoints: [
      'Perfis de acesso, permissões e área do cliente',
      'Banco de dados estruturado e regras de negócio',
      'Painel administrativo para gestão completa',
    ],
    visualType: 'platform',
  },
  {
    id: 'manutencao-e-evolucao',
    number: '05',
    title: 'Manutenção e evolução',
    description:
      'Atualizações, melhorias, otimizações e suporte para soluções digitais existentes.',
    focusLabel: 'Continuidade e melhoria técnica',
    architecturePoints: [
      'Correções visuais, funcionais e de desempenho',
      'Implementação de novas seções e recursos',
      'Acompanhamento técnico para manter tudo estável',
    ],
    visualType: 'evolution',
  },
  {
    id: 'processo-de-trabalho',
    number: '06',
    title: 'Processo de trabalho',
    description: 'Do primeiro contato à entrega.',
    focusLabel: 'Etapas do desenvolvimento',
    architecturePoints: [
      'Comunicação direta desde o alinhamento inicial até a publicação',
      'Estrutura e solução definidas antes da etapa de código',
      'Acompanhamento próximo na entrega e conclusão do projeto',
    ],
    visualType: 'process',
  },
];
