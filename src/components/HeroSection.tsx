import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, ArrowUpRight, Monitor, Layers } from 'lucide-react';
import { Button } from '@/src/components/ui/button';
import { WHATSAPP_MESSAGES, buildWhatsAppUrl, cn } from '@/src/lib/utils';
import type { TabId } from '@/src/components/Navbar';

type HeroMockupTab = 'site' | 'sistema';

const HERO_TABS: { id: HeroMockupTab; label: string; icon: typeof Monitor }[] = [
  { id: 'site', label: 'Site & Presença', icon: Monitor },
  { id: 'sistema', label: 'Sistema Web', icon: Layers },
];

interface HeroSectionProps {
  onNavigate: (tab: TabId, focusContact?: boolean) => void;
}

export function HeroSection({ onNavigate }: HeroSectionProps) {
  const [activeTab, setActiveTab] = useState<HeroMockupTab>('site');
  const [videoLoaded, setVideoLoaded] = useState(true);

  return (
    <section
      id="inicio"
      className="relative flex-1 flex flex-col justify-between overflow-hidden bg-black text-offwhite pt-10 pb-8 sm:pt-14 sm:pb-10 lg:pt-16 lg:pb-10"
    >
      {/* Full-section Background Video */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-black overflow-hidden"
      >
        {videoLoaded && (
          <video
            src="/assets/aistudio/gemini_generated_video_d9534322_89a21167.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            onError={() => setVideoLoaded(false)}
            className="h-full w-full object-cover object-center opacity-50 sm:opacity-55 select-none"
          />
        )}
        {/* Measured scrim to preserve WCAG AA text contrast over the background video */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/75" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-transparent to-black/80" />
      </div>

      <div className="relative my-auto mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-10">
          {/* Editorial Copy Column */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6"
          >
            <p className="font-display text-xs sm:text-[13px] font-medium tracking-[0.16em] uppercase text-mint">
              Estúdio de tecnologia e desenvolvimento
            </p>

            <h1 className="mt-4 font-display text-[clamp(2.35rem,4.4vw,4.15rem)] font-semibold leading-[1.06] tracking-[-0.03em] text-offwhite text-balance">
              Seu negócio merece mais do digital.
            </h1>

            <p className="mt-6 max-w-xl text-base sm:text-lg leading-relaxed text-offwhite/80">
              Desenvolvemos sites, sistemas e experiências digitais que ajudam empresas a crescer, conquistar clientes e trabalhar com mais facilidade.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3.5">
              <Button asChild variant="primary" size="lg">
                <a
                  href={buildWhatsAppUrl(WHATSAPP_MESSAGES.hero)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>Começar um projeto</span>
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </Button>

              <Button
                type="button"
                variant="outlineDark"
                size="lg"
                onClick={() => onNavigate('solucoes')}
              >
                <span>Conhecer nossas soluções</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Button>
            </div>
          </motion.div>

          {/* Visual Interface Composition Column */}
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6"
          >
            <div className="relative rounded-2xl border border-border-dark bg-navy-elevated/85 backdrop-blur-md p-4 sm:p-5 shadow-studio-dark">
              {/* Interactive System & Interface Architecture Bar */}
              <div className="rounded-xl border border-border-dark bg-navy/90 p-4 sm:p-5">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border-dark pb-3">
                  <span className="font-display text-xs font-medium tracking-wide text-offwhite/90">
                    Arquitetura de entrega
                  </span>
                  <div
                    role="tablist"
                    aria-label="Visualizar modelos de interface"
                    className="flex items-center gap-1 rounded-lg bg-navy-deep p-1"
                  >
                    {HERO_TABS.map((tab) => {
                      const Icon = tab.icon;
                      const isActive = activeTab === tab.id;
                      return (
                        <button
                          key={tab.id}
                          role="tab"
                          type="button"
                          aria-selected={isActive}
                          onClick={() => setActiveTab(tab.id)}
                          className={cn(
                            'inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer',
                            isActive
                              ? 'bg-mint text-navy'
                              : 'text-slate-light hover:text-offwhite'
                          )}
                        >
                          <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                          <span>{tab.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Live Interactive UI Preview Pane */}
                <div className="pt-3.5 min-h-[116px]">
                  {activeTab === 'site' && (
                    <div className="grid grid-cols-12 gap-3 items-center">
                      <div className="col-span-8 space-y-2">
                        <p className="font-display text-sm font-semibold text-offwhite">
                          Presença institucional &amp; páginas de conversão
                        </p>
                        <p className="text-xs leading-relaxed text-slate-light">
                          Estrutura editorial clara, responsiva do celular ao desktop e pensada para gerar contatos comerciais qualificados.
                        </p>
                      </div>
                      <div className="col-span-4 rounded-lg border border-border-dark bg-offwhite p-2.5 text-navy">
                        <div className="h-1.5 w-10 rounded bg-navy/20 mb-2" />
                        <div className="h-2 w-full rounded bg-navy mb-1.5" />
                        <div className="h-2 w-3/4 rounded bg-navy/30 mb-2.5" />
                        <div className="h-4 w-16 rounded bg-mint" />
                      </div>
                    </div>
                  )}

                  {activeTab === 'sistema' && (
                    <div className="grid grid-cols-12 gap-3 items-center">
                      <div className="col-span-8 space-y-2">
                        <p className="font-display text-sm font-semibold text-offwhite">
                          Sistemas web &amp; painéis operacionais
                        </p>
                        <p className="text-xs leading-relaxed text-slate-light">
                          Organização de processos internos, cadastros, banco de dados e controle administrativo sob medida para a rotina da empresa.
                        </p>
                      </div>
                      <div className="col-span-4 rounded-lg border border-border-dark bg-navy-elevated p-2.5">
                        <div className="flex items-center justify-between border-b border-border-dark pb-1.5 mb-2">
                          <span className="h-1.5 w-8 rounded bg-mint" />
                          <span className="h-1.5 w-4 rounded bg-offwhite/30" />
                        </div>
                        <div className="space-y-1.5">
                          <div className="h-2 w-full rounded bg-offwhite/15" />
                          <div className="h-2 w-5/6 rounded bg-offwhite/15" />
                          <div className="h-2 w-4/6 rounded bg-mint/40" />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Tagline Strip */}
      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 mt-12">
        <div className="border-t border-border-dark pt-5 flex flex-wrap items-center justify-center sm:justify-start gap-x-4 gap-y-1.5 text-xs sm:text-sm text-slate-light">
          <span>Transformamos ideias em negócios digitais</span>
          <span aria-hidden="true">·</span>
          <span>Atendimento online em todo o Brasil</span>
        </div>
      </div>
    </section>
  );
}
