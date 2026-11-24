import { useState } from 'react';
import { motion } from 'motion/react';
import {
  ArrowUpRight,
  Calendar,
  Check,
  ChevronDown,
  CreditCard,
  Play,
  QrCode,
  Repeat,
  SlidersHorizontal,
  Smartphone,
} from 'lucide-react';
import { Button } from '@/src/components/ui/button';
import { WHATSAPP_MESSAGES, buildWhatsAppUrl, cn } from '@/src/lib/utils';
import type { TabId } from '@/src/components/Navbar';
import type { ContactMode } from '@/src/components/ContactSection';

type PaymentHighlight = 'all' | 'pix' | 'card' | 'recurring';

interface PlanDetails {
  idealFor: string;
  included: string[];
  differentials: string[];
  termsTitle: string;
  terms: string[];
}

interface PlanOption {
  id: 'basico' | 'premium' | 'mensal' | 'personalizado';
  kicker: string;
  name: string;
  featured?: boolean;
  headlinePrice: string;
  priceSuffix?: string;
  subPriceLine: string;
  summary: string;
  paymentMethods: {
    kind: 'pix' | 'card' | 'recurring' | 'custom' | 'app';
    title: string;
    detail: string;
  }[];
  details?: PlanDetails;
  demoVideoUrl?: string;
  showScheduleMeeting?: boolean;
  showAppDevelopment?: boolean;
  footnote: string;
  ctaLabel: string;
  whatsappMessage: string;
}

const PAYMENT_FILTERS: { id: PaymentHighlight; label: string }[] = [
  { id: 'all', label: 'Todas as opções' },
  { id: 'pix', label: 'À vista no Pix' },
  { id: 'card', label: 'Parcelado no cartão' },
  { id: 'recurring', label: 'Assinatura mensal' },
];

const PLANS: PlanOption[] = [
  {
    id: 'basico',
    kicker: 'Entrada profissional',
    name: 'Plano Básico',
    headlinePrice: 'R$ 640,00',
    subPriceLine: 'À vista no Pix ou cartão de crédito',
    summary:
      'Para negócios que precisam colocar sua presença digital no ar com estrutura objetiva, responsiva e pagamento único.',
    paymentMethods: [
      {
        kind: 'pix',
        title: 'Pagamento à vista via Pix',
        detail: 'R$ 640,00 à vista',
      },
      {
        kind: 'card',
        title: 'Cartão de crédito',
        detail: 'Consultar número de parcelas com o vendedor',
      },
    ],
    details: {
      idealFor:
        'Pequenos negócios e profissionais autônomos que precisam marcar presença na internet e facilitar o contato com clientes.',
      included: [
        'Site de página única (Landing Page).',
        'Design personalizado para a identidade da empresa.',
        'Apresentação da empresa e dos serviços.',
        'Botão de contato direto pelo WhatsApp.',
        'Formulário de contato.',
        'Layout adaptado para celulares, tablets e computadores.',
        'SEO básico para mecanismos de busca.',
        'Publicação do site.',
      ],
      differentials: [
        'Investimento inicial acessível.',
        'Site profissional sem complexidade desnecessária.',
        'Informações organizadas em uma única página.',
        'Foco em apresentar o negócio e gerar contatos.',
      ],
      termsTitle: 'Formas de pagamento',
      terms: [
        'Pix à vista.',
        'Cartão de crédito: consultar número de parcelas com o vendedor.',
      ],
    },
    demoVideoUrl: '/assets/aistudio/gemini_generated_video_2d5af7b2_37aef037.mp4',
    footnote:
      'Parcelamento no cartão sujeito às condições e disponibilidade da operadora de pagamento.',
    ctaLabel: 'Escolher Básico',
    whatsappMessage: WHATSAPP_MESSAGES.planBasico,
  },
  {
    id: 'premium',
    kicker: 'Mais completo',
    name: 'Plano Premium',
    featured: true,
    headlinePrice: 'R$ 1.100,00',
    subPriceLine: 'À vista no Pix ou cartão de crédito',
    summary:
      'Para empresas que buscam maior profundidade visual, seções estratégicas e presença digital mais completa.',
    paymentMethods: [
      {
        kind: 'pix',
        title: 'Pagamento à vista via Pix',
        detail: 'R$ 1.100,00 à vista',
      },
      {
        kind: 'card',
        title: 'Cartão de crédito',
        detail: 'Consultar número de parcelas com o vendedor',
      },
    ],
    details: {
      idealFor:
        'Empresas que desejam transmitir mais autoridade, apresentar seus serviços com profundidade e construir uma presença digital mais completa.',
      included: [
        'Site com até 5 páginas.',
        'Design exclusivo e personalizado.',
        'Animações e interações modernas.',
        'Galeria de fotos, projetos ou portfólio.',
        'Integração com WhatsApp e Instagram.',
        'Formulários personalizados.',
        'SEO otimizado.',
        'Otimização de velocidade.',
        'Integração com Google Analytics.',
        'Publicação do site.',
        '30 dias de suporte após a publicação.',
      ],
      differentials: [
        'Maior liberdade para apresentar produtos e serviços.',
        'Mais espaço para demonstrar profissionalismo.',
        'Experiência visual mais sofisticada.',
        'Melhor organização das informações.',
        'Recursos para acompanhar o desempenho do site.',
        'Maior potencial para fortalecer a autoridade da marca.',
      ],
      termsTitle: 'Formas de pagamento',
      terms: [
        'Pix à vista.',
        'Cartão de crédito: consultar número de parcelas com o vendedor.',
      ],
    },
    demoVideoUrl: '/assets/aistudio/elegance-demo_23684b09.mp4',
    footnote:
      'Parcelamento no cartão sujeito às condições e disponibilidade da operadora de pagamento.',
    ctaLabel: 'Escolher Premium',
    whatsappMessage: WHATSAPP_MESSAGES.planPremium,
  },
  {
    id: 'mensal',
    kicker: 'Modelo recorrente',
    name: 'Plano Mensal',
    headlinePrice: 'R$ 89,90',
    priceSuffix: '/mês',
    subPriceLine: 'Taxa de implantação de R$ 210,00',
    summary:
      'Para quem prefere previsibilidade mensal com investimento inicial reduzido e acompanhamento contínuo.',
    paymentMethods: [
      {
        kind: 'recurring',
        title: 'Cobrança mensal recorrente',
        detail: 'R$ 89,90 por mês',
      },
      {
        kind: 'pix',
        title: 'Implantação e contrato',
        detail: 'Taxa de R$ 210,00 · Contrato sugerido de 12 meses',
      },
    ],
    details: {
      idealFor:
        'Empreendedores que querem ter um site profissional sem precisar investir um valor elevado no desenvolvimento logo no início.',
      included: [
        'Desenvolvimento do site.',
        'Design personalizado e responsivo.',
        'Hospedagem do site.',
        'Certificado de segurança SSL.',
        'Manutenção técnica.',
        'Atualizações simples de informações.',
        'Monitoramento básico.',
        'Suporte técnico.',
        'Pequenas melhorias mensais, dentro de um limite combinado.',
      ],
      differentials: [
        'Menor investimento inicial.',
        'Pagamento mensal previsível.',
        'Manutenção técnica incluída.',
        'Suporte contínuo.',
        'Atualizações simples sem precisar contratar um novo projeto a cada alteração.',
        'Acompanhamento da Veras Developer.',
      ],
      termsTitle: 'Condições',
      terms: [
        'Taxa de implantação.',
        'Cobrança mensal recorrente.',
        'Contrato sugerido de 12 meses.',
      ],
    },
    footnote:
      'Condições de implantação e recorrência detalhadas no atendimento comercial antes da contratação.',
    ctaLabel: 'Escolher Mensal',
    whatsappMessage: WHATSAPP_MESSAGES.planMensal,
  },
  {
    id: 'personalizado',
    kicker: 'Projeto sob medida',
    name: 'Plano Personalizado',
    headlinePrice: 'Sob medida',
    subPriceLine: 'Valor definido conforme o escopo do projeto',
    summary:
      'Para empresas com necessidades específicas, desenvolvimento de aplicativos, sistemas web, plataformas digitais ou funcionalidades exclusivas.',
    paymentMethods: [
      {
        kind: 'app',
        title: 'Desenvolvimento de aplicativos',
        detail: 'Apps Android, iOS e soluções mobile sob medida',
      },
      {
        kind: 'custom',
        title: 'Escopo e funcionalidades próprias',
        detail: 'Planejamento técnico dedicado ao seu negócio',
      },
      {
        kind: 'card',
        title: 'Formas de pagamento flexíveis',
        detail: 'Pix ou cartão combinados na proposta',
      },
    ],
    showScheduleMeeting: true,
    showAppDevelopment: true,
    footnote:
      'Proposta e condições de parcelamento apresentadas após o entendimento do projeto.',
    ctaLabel: 'Plano personalizado',
    whatsappMessage: WHATSAPP_MESSAGES.planPersonalizado,
  },
];

function PaymentIcon({
  kind,
}: {
  kind: 'pix' | 'card' | 'recurring' | 'custom' | 'app';
}) {
  if (kind === 'pix') {
    return <QrCode className="h-4 w-4 shrink-0" aria-hidden="true" />;
  }
  if (kind === 'card') {
    return <CreditCard className="h-4 w-4 shrink-0" aria-hidden="true" />;
  }
  if (kind === 'recurring') {
    return <Repeat className="h-4 w-4 shrink-0" aria-hidden="true" />;
  }
  if (kind === 'app') {
    return <Smartphone className="h-4 w-4 shrink-0" aria-hidden="true" />;
  }
  return <SlidersHorizontal className="h-4 w-4 shrink-0" aria-hidden="true" />;
}

interface PricingSectionProps {
  onNavigate: (
    tab: TabId,
    focusContact?: boolean,
    mode?: ContactMode,
    preSubject?: string
  ) => void;
}

export function PricingSection({ onNavigate }: PricingSectionProps) {
  const [highlightMode, setHighlightMode] = useState<PaymentHighlight>('all');
  const [expandedPlans, setExpandedPlans] = useState<Record<string, boolean>>({});
  const [expandedDemos, setExpandedDemos] = useState<Record<string, boolean>>({});

  const toggleDetails = (planId: string) => {
    setExpandedPlans((prev) => ({
      ...prev,
      [planId]: !prev[planId],
    }));
  };

  const toggleDemo = (planId: string) => {
    setExpandedDemos((prev) => ({
      ...prev,
      [planId]: !prev[planId],
    }));
  };

  return (
    <section
      id="planos"
      className="bg-navy-surface text-offwhite py-16 sm:py-24 border-b border-border-dark"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header + Interactive Payment Focus Control */}
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs font-medium tracking-[0.14em] uppercase text-mint">
              Planos exclusivos
            </p>
            <h2 className="mt-3 font-display text-[clamp(2rem,3.4vw,3.1rem)] font-semibold leading-[1.08] text-offwhite text-balance">
              Planos e formas de pagamento.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-light">
              Escolha o formato ideal para o seu momento: pagamento à vista via Pix, parcelamento no cartão de crédito, assinatura mensal ou projeto personalizado.
            </p>
          </div>

          <div
            role="group"
            aria-label="Destacar forma de pagamento"
            className="inline-flex flex-wrap items-center gap-1 rounded-xl border border-border-dark bg-navy-elevated p-1.5 self-start lg:self-end"
          >
            {PAYMENT_FILTERS.map((filter) => {
              const active = highlightMode === filter.id;
              return (
                <button
                  key={filter.id}
                  type="button"
                  onClick={() => setHighlightMode(filter.id)}
                  className={cn(
                    'rounded-lg px-3 py-2 text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint',
                    active
                      ? 'bg-mint text-navy font-semibold'
                      : 'text-slate-light hover:text-offwhite'
                  )}
                >
                  {filter.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* 4 Plans Grid */}
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4 items-start">
          {PLANS.map((plan, index) => {
            const isFeatured = Boolean(plan.featured);
            const isExpanded = Boolean(expandedPlans[plan.id]);
            const isDemoExpanded = Boolean(expandedDemos[plan.id]);
            const isDimmed =
              (highlightMode === 'card' && plan.id === 'mensal') ||
              (highlightMode === 'recurring' &&
                plan.id !== 'mensal' &&
                plan.id !== 'personalizado');

            return (
              <motion.article
                key={plan.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.05,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className={cn(
                  'rounded-2xl p-6 flex flex-col justify-between transition-opacity duration-200 shadow-studio-dark xl:min-h-[560px]',
                  isFeatured
                    ? 'bg-navy-deep text-offwhite border-2 border-mint'
                    : 'bg-navy-elevated text-offwhite border border-border-dark',
                  isDimmed && 'opacity-55'
                )}
              >
                <div>
                  <p className="text-xs font-medium tracking-[0.12em] uppercase text-mint">
                    {plan.kicker}
                  </p>

                  <h3 className="mt-2 font-display text-xl sm:text-2xl font-semibold text-offwhite leading-snug">
                    {plan.name}
                  </h3>

                  {/* Cash Price + Installment directly below */}
                  <div className="mt-5 border-t border-b border-border-dark py-4">
                    <div className="flex items-baseline gap-1">
                      <span className="font-display text-3xl sm:text-[2.15rem] font-semibold tracking-tight text-offwhite tabular-nums leading-none">
                        {plan.headlinePrice}
                      </span>
                      {plan.priceSuffix && (
                        <span className="text-sm font-medium text-slate-light">
                          {plan.priceSuffix}
                        </span>
                      )}
                    </div>
                    <p className="mt-2 text-xs sm:text-sm font-medium text-mint tabular-nums">
                      {plan.subPriceLine}
                    </p>
                  </div>

                  <p className="mt-4 text-sm leading-relaxed text-offwhite/80">
                    {plan.summary}
                  </p>

                  {/* Explicit Pix / Cartão / Recorrente / Personalizado Options */}
                  <div className="mt-5 space-y-2.5">
                    {plan.paymentMethods.map((method) => {
                      const methodHighlighted =
                        highlightMode !== 'all' &&
                        method.kind === highlightMode;

                      return (
                        <div
                          key={method.title}
                          className={cn(
                            'flex items-start gap-3 rounded-xl border p-3 transition-colors',
                            methodHighlighted
                              ? 'border-mint bg-navy'
                              : 'border-border-dark bg-navy'
                          )}
                        >
                          <div className="mt-0.5 text-mint">
                            <PaymentIcon kind={method.kind} />
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-offwhite">
                              {method.title}
                            </p>
                            <p className="mt-0.5 text-xs text-slate-light tabular-nums">
                              {method.detail}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Interactive "Detalhes" section (Básico, Premium, Mensal only) */}
                  {plan.details && (
                    <div className="mt-4">
                      <button
                        type="button"
                        onClick={() => toggleDetails(plan.id)}
                        aria-expanded={isExpanded}
                        aria-controls={`plan-details-${plan.id}`}
                        className={cn(
                          'w-full flex items-center justify-between rounded-xl border px-3.5 py-2.5 text-xs font-semibold transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint',
                          isExpanded
                            ? 'border-mint bg-navy text-mint'
                            : 'border-border-dark bg-navy/80 text-offwhite hover:border-mint/50 hover:text-mint'
                        )}
                      >
                        <span>Detalhes</span>
                        <ChevronDown
                          className={cn(
                            'h-4 w-4 transition-transform duration-200',
                            isExpanded && 'rotate-180'
                          )}
                          aria-hidden="true"
                        />
                      </button>

                      {isExpanded && (
                        <div
                          id={`plan-details-${plan.id}`}
                          className="mt-3 rounded-xl border border-border-dark bg-navy p-4 space-y-4 text-xs leading-relaxed"
                        >
                          <div>
                            <p className="font-display font-semibold uppercase tracking-wider text-mint text-[11px]">
                              Ideal para
                            </p>
                            <p className="mt-1.5 text-offwhite/85">
                              {plan.details.idealFor}
                            </p>
                          </div>

                          <div className="border-t border-border-dark pt-3">
                            <p className="font-display font-semibold uppercase tracking-wider text-mint text-[11px]">
                              O que está incluso
                            </p>
                            <ul className="mt-2 space-y-1.5 text-offwhite/85">
                              {plan.details.included.map((item) => (
                                <li key={item} className="flex items-start gap-2">
                                  <Check
                                    className="h-3.5 w-3.5 shrink-0 text-mint mt-0.5"
                                    aria-hidden="true"
                                  />
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div className="border-t border-border-dark pt-3">
                            <p className="font-display font-semibold uppercase tracking-wider text-mint text-[11px]">
                              Diferenciais
                            </p>
                            <ul className="mt-2 space-y-1.5 text-offwhite/85">
                              {plan.details.differentials.map((item) => (
                                <li key={item} className="flex items-start gap-2">
                                  <span
                                    aria-hidden="true"
                                    className="mt-1.5 h-1 w-2.5 shrink-0 bg-mint"
                                  />
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div className="border-t border-border-dark pt-3">
                            <p className="font-display font-semibold uppercase tracking-wider text-mint text-[11px]">
                              {plan.details.termsTitle}
                            </p>
                            <ul className="mt-2 space-y-1 text-slate-light">
                              {plan.details.terms.map((item) => (
                                <li key={item}>{item}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Interactive "Demonstração" video section (Plano Básico) */}
                  {plan.demoVideoUrl && (
                    <div className="mt-2.5">
                      <button
                        type="button"
                        onClick={() => toggleDemo(plan.id)}
                        aria-expanded={isDemoExpanded}
                        aria-controls={`plan-demo-${plan.id}`}
                        className={cn(
                          'w-full flex items-center justify-between rounded-xl border px-3.5 py-2.5 text-xs font-semibold transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint',
                          isDemoExpanded
                            ? 'border-mint bg-navy text-mint'
                            : 'border-border-dark bg-navy/80 text-offwhite hover:border-mint/50 hover:text-mint'
                        )}
                      >
                        <span className="inline-flex items-center gap-2">
                          <Play className="h-3.5 w-3.5 text-mint" aria-hidden="true" />
                          <span>Demonstração</span>
                        </span>
                        <ChevronDown
                          className={cn(
                            'h-4 w-4 transition-transform duration-200',
                            isDemoExpanded && 'rotate-180'
                          )}
                          aria-hidden="true"
                        />
                      </button>

                      {isDemoExpanded && (
                        <div
                          id={`plan-demo-${plan.id}`}
                          className="mt-3 rounded-xl border border-border-dark bg-navy p-3"
                        >
                          <p className="font-display font-semibold uppercase tracking-wider text-mint text-[11px]">
                            Demonstração
                          </p>
                          <video
                            src={plan.demoVideoUrl}
                            controls
                            playsInline
                            preload="metadata"
                            className="mt-2 w-full rounded-lg border border-border-dark bg-navy-deep aspect-video object-contain"
                          >
                            Seu navegador não suporta a reprodução de vídeo.
                          </video>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Action Button & Operator Availability Disclaimer */}
                <div className="mt-6 pt-5 border-t border-border-dark space-y-2.5">
                  <Button
                    asChild
                    variant={isFeatured ? 'primary' : 'outlineDark'}
                    size="md"
                    className={cn(
                      'w-full',
                      !isFeatured &&
                        'border-mint/45 hover:bg-mint hover:text-navy hover:border-mint'
                    )}
                  >
                    <a
                      href={buildWhatsAppUrl(plan.whatsappMessage)}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span className="truncate">{plan.ctaLabel}</span>
                      <ArrowUpRight className="h-4 w-4 shrink-0" aria-hidden="true" />
                    </a>
                  </Button>

                  {plan.showAppDevelopment && (
                    <Button
                      asChild
                      variant="outlineDark"
                      size="md"
                      className="w-full border-mint/45 hover:bg-mint hover:text-navy hover:border-mint"
                    >
                      <a
                        href={buildWhatsAppUrl(WHATSAPP_MESSAGES.planAplicativos)}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Smartphone className="h-4 w-4 shrink-0" aria-hidden="true" />
                        <span className="truncate">Desenvolvimento de aplicativos</span>
                      </a>
                    </Button>
                  )}

                  {plan.showScheduleMeeting && (
                    <Button
                      type="button"
                      variant="primary"
                      size="md"
                      className="w-full"
                      onClick={() =>
                        onNavigate(
                          'contato',
                          true,
                          'reuniao',
                          'Plano Personalizado (Projeto sob medida)'
                        )
                      }
                    >
                      <Calendar className="h-4 w-4 shrink-0" aria-hidden="true" />
                      <span className="truncate">Agendar uma reunião</span>
                    </Button>
                  )}

                  <p className="pt-0.5 text-xs leading-relaxed text-slate-light">
                    {plan.footnote}
                  </p>
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* Direct Form Option */}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-t border-border-dark pt-6 text-sm text-slate-light">
          <p>
            Prefere enviar os detalhes do projeto pelo formulário antes da conversa?
          </p>
          <button
            type="button"
            onClick={() => onNavigate('contato', true)}
            className="inline-flex items-center gap-1.5 font-medium text-mint hover:underline cursor-pointer self-start sm:self-auto"
          >
            <span>Preencher formulário de orçamento</span>
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  );
}
