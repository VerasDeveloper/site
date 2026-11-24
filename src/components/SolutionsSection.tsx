import { useState } from 'react';
import { motion } from 'motion/react';
import { Check } from 'lucide-react';
import { SOLUTIONS, type SolutionItem } from '@/src/data/solutions';
import { cn } from '@/src/lib/utils';

function SolutionBlueprint({ solution }: { solution: SolutionItem }) {
  switch (solution.visualType) {
    case 'website':
      return (
        <div className="rounded-xl border border-border-dark bg-navy-deep p-4 sm:p-5">
          <div className="flex items-center justify-between border-b border-border-dark pb-3 mb-4">
            <span className="font-display text-xs font-semibold text-offwhite">
              Estrutura Institucional
            </span>
            <span className="text-xs text-mint">Desktop &amp; Mobile</span>
          </div>
          <div className="grid grid-cols-12 gap-3">
            <div className="col-span-8 rounded-lg border border-border-dark bg-navy p-4 text-offwhite">
              <div className="h-1.5 w-14 rounded bg-mint mb-3" />
              <div className="h-3 w-4/5 rounded bg-offwhite/90 mb-2" />
              <div className="h-2 w-3/5 rounded bg-offwhite/35 mb-4" />
              <div className="inline-block rounded bg-mint px-2.5 py-1 text-[11px] font-semibold text-navy">
                Contato direto
              </div>
            </div>
            <div className="col-span-4 rounded-lg border border-border-dark bg-navy-elevated p-3 flex flex-col justify-between">
              <div className="space-y-1.5">
                <div className="h-2 w-10 rounded bg-mint/60" />
                <div className="h-2 w-full rounded bg-offwhite/15" />
                <div className="h-2 w-4/5 rounded bg-offwhite/15" />
              </div>
              <div className="mt-4 h-7 rounded border border-mint/40 bg-navy flex items-center justify-center text-[10px] font-medium text-mint">
                Responsivo
              </div>
            </div>
          </div>
        </div>
      );

    case 'landing':
      return (
        <div className="rounded-xl border border-border-dark bg-navy-deep p-4 sm:p-5">
          <div className="flex items-center justify-between border-b border-border-dark pb-3 mb-4">
            <span className="font-display text-xs font-semibold text-offwhite">
              Fluxo de Conversão
            </span>
            <span className="text-xs text-mint">Página Estratégica</span>
          </div>
          <div className="space-y-3">
            <div className="rounded-lg border border-mint/30 bg-navy p-3.5 text-offwhite flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-medium text-mint">Promessa clara</p>
                <p className="text-xs text-offwhite/75 mt-0.5">
                  Atenção direcionada para ação única
                </p>
              </div>
              <span className="rounded bg-mint px-2.5 py-1 text-[11px] font-semibold text-navy whitespace-nowrap">
                CTA Principal
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2.5">
              <div className="rounded-lg border border-border-dark bg-navy-elevated p-3">
                <p className="text-[11px] font-semibold text-offwhite">Argumentos</p>
                <p className="text-[11px] text-slate-light mt-1">
                  Benefícios e solução sem ruído
                </p>
              </div>
              <div className="rounded-lg border border-border-dark bg-navy-elevated p-3">
                <p className="text-[11px] font-semibold text-offwhite">Captura</p>
                <p className="text-[11px] text-slate-light mt-1">
                  Formulário + WhatsApp imediato
                </p>
              </div>
            </div>
          </div>
        </div>
      );

    case 'system':
      return (
        <div className="rounded-xl border border-border-dark bg-navy-deep p-4 sm:p-5 text-offwhite">
          <div className="flex items-center justify-between border-b border-border-dark pb-3 mb-4">
            <span className="font-display text-xs font-semibold text-offwhite">
              Operação &amp; Controle Interno
            </span>
            <span className="text-xs text-mint">Sistema Web</span>
          </div>
          <div className="grid grid-cols-3 gap-2 mb-3">
            <div className="rounded-lg bg-navy-elevated border border-border-dark p-2.5">
              <span className="block text-[10px] text-slate-light">Etapa 01</span>
              <span className="text-xs font-medium text-offwhite">Cadastro</span>
            </div>
            <div className="rounded-lg bg-navy-elevated border border-mint/40 p-2.5">
              <span className="block text-[10px] text-slate-light">Etapa 02</span>
              <span className="text-xs font-medium text-mint">Processamento</span>
            </div>
            <div className="rounded-lg bg-navy-elevated border border-border-dark p-2.5">
              <span className="block text-[10px] text-slate-light">Etapa 03</span>
              <span className="text-xs font-medium text-offwhite">Relatório</span>
            </div>
          </div>
          <div className="rounded-lg bg-navy border border-border-dark p-3 space-y-2">
            <div className="flex items-center justify-between text-[11px] text-slate-light">
              <span>Registro operacional</span>
              <span className="text-mint font-medium">Organizado</span>
            </div>
            <div className="h-1.5 w-full rounded bg-navy-elevated overflow-hidden">
              <div className="h-full w-3/4 bg-mint rounded" />
            </div>
          </div>
        </div>
      );

    case 'platform':
      return (
        <div className="rounded-xl border border-border-dark bg-navy-deep p-4 sm:p-5 text-offwhite">
          <div className="flex items-center justify-between border-b border-border-dark pb-3 mb-4">
            <span className="font-display text-xs font-semibold text-offwhite">
              Ecossistema Completo
            </span>
            <span className="text-xs text-mint">Usuários &amp; Dados</span>
          </div>
          <div className="grid grid-cols-12 gap-3">
            <div className="col-span-4 rounded-lg border border-border-dark bg-navy-elevated p-2.5 space-y-2">
              <div className="h-2 w-12 rounded bg-mint" />
              <div className="h-2 w-full rounded bg-offwhite/15" />
              <div className="h-2 w-4/5 rounded bg-offwhite/15" />
              <div className="h-2 w-3/4 rounded bg-offwhite/15" />
            </div>
            <div className="col-span-8 rounded-lg border border-border-dark bg-navy p-3 text-offwhite space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold">Painel Administrativo</span>
                <span className="text-[10px] font-medium text-mint">Acesso seguro</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="rounded border border-border-dark bg-navy-elevated p-2">
                  <span className="block text-[10px] text-slate-light">Módulo</span>
                  <span className="text-xs font-semibold text-offwhite">Clientes</span>
                </div>
                <div className="rounded border border-border-dark bg-navy-elevated p-2">
                  <span className="block text-[10px] text-slate-light">Módulo</span>
                  <span className="text-xs font-semibold text-offwhite">Permissões</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      );

    case 'evolution':
      return (
        <div className="rounded-xl border border-border-dark bg-navy-deep p-4 sm:p-5">
          <div className="flex items-center justify-between border-b border-border-dark pb-3 mb-4">
            <span className="font-display text-xs font-semibold text-offwhite">
              Suporte &amp; Melhoria Contínua
            </span>
            <span className="text-xs text-mint">Ciclo evolutivo</span>
          </div>
          <div className="space-y-2.5">
            <div className="flex items-center justify-between rounded-lg border border-border-dark bg-navy px-3.5 py-2.5 text-xs">
              <span className="font-medium text-offwhite">Otimização de velocidade e SEO</span>
              <span className="text-slate-light">Contínuo</span>
            </div>
            <div className="flex items-center justify-between rounded-lg border border-border-dark bg-navy px-3.5 py-2.5 text-xs">
              <span className="font-medium text-offwhite">Novas páginas e integrações</span>
              <span className="text-slate-light">Sob demanda</span>
            </div>
            <div className="flex items-center justify-between rounded-lg border border-mint/40 bg-navy-elevated px-3.5 py-2.5 text-xs text-offwhite">
              <span className="font-medium">Atualizações e correções rápidas</span>
              <span className="text-mint font-medium">Acompanhamento</span>
            </div>
          </div>
        </div>
      );

    case 'process':
      return (
        <div className="rounded-xl border border-border-dark bg-navy-deep p-4 sm:p-5">
          <div className="flex items-center justify-between border-b border-border-dark pb-3 mb-4">
            <span className="font-display text-xs font-semibold text-offwhite">
              Do primeiro contato à entrega.
            </span>
            <span className="text-xs text-mint">4 etapas</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              {
                step: '01',
                title: 'Conversa',
                text: 'Entendemos a necessidade e os objetivos do negócio.',
              },
              {
                step: '02',
                title: 'Planejamento',
                text: 'Definimos a estrutura e a melhor solução.',
              },
              {
                step: '03',
                title: 'Desenvolvimento',
                text: 'Transformamos a ideia em um produto digital funcional.',
              },
              {
                step: '04',
                title: 'Entrega',
                text: 'Publicamos o projeto e acompanhamos sua conclusão.',
              },
            ].map((item) => (
              <div
                key={item.step}
                className="rounded-lg border border-border-dark bg-navy p-3.5"
              >
                <span className="font-display text-lg font-semibold text-mint tabular-nums leading-none">
                  {item.step}
                </span>
                <p className="mt-2 font-display text-sm font-semibold text-offwhite">
                  {item.title}
                </p>
                <p className="mt-1 text-xs leading-relaxed text-slate-light">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      );
  }
}

export function SolutionsSection() {
  const [selectedId, setSelectedId] = useState<string>(SOLUTIONS[0].id);
  const activeSolution =
    SOLUTIONS.find((item) => item.id === selectedId) ?? SOLUTIONS[0];

  return (
    <section
      id="solucoes"
      className="bg-navy-surface text-offwhite py-16 sm:py-24 border-b border-border-dark"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-xs font-medium tracking-[0.14em] uppercase text-mint">
            Soluções digitais
          </p>
          <h2 className="mt-3 font-display text-[clamp(2rem,3.4vw,3.1rem)] font-semibold leading-[1.08] text-offwhite text-balance">
            Tudo começa com coragem pra ampliar seu negócio.
          </h2>
        </div>

        {/* Interactive Split Showcase: Numbered Index + Dedicated Dark/Orange Blueprint */}
        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12 items-start">
          {/* Left: Interactive Editorial List (01–06) */}
          <div className="lg:col-span-6 border-t border-border-dark">
            {SOLUTIONS.map((item) => {
              const isSelected = item.id === activeSolution.id;
              return (
                <div key={item.id} className="border-b border-border-dark">
                  <button
                    type="button"
                    onClick={() => setSelectedId(item.id)}
                    aria-expanded={isSelected}
                    className={cn(
                      'w-full py-5 px-3 sm:px-4 text-left transition-colors duration-150 flex items-start justify-between gap-4 cursor-pointer rounded-xl my-1.5 border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint',
                      isSelected
                        ? 'bg-navy-elevated border-mint/60 text-offwhite'
                        : 'border-transparent hover:bg-navy-elevated/60 text-offwhite'
                    )}
                  >
                    <div className="flex items-start gap-4">
                      <span
                        className={cn(
                          'font-display text-sm font-semibold tabular-nums pt-0.5',
                          isSelected ? 'text-mint' : 'text-slate-light'
                        )}
                      >
                        {item.number}
                      </span>
                      <div>
                        <h3 className="font-display text-lg sm:text-xl font-semibold leading-snug text-offwhite">
                          {item.title}
                        </h3>
                        <p
                          className={cn(
                            'mt-1.5 text-sm leading-relaxed',
                            isSelected ? 'text-offwhite/85' : 'text-slate-light'
                          )}
                        >
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </button>

                  {/* Mobile inline blueprint reveal */}
                  {isSelected && (
                    <div className="lg:hidden pb-5 pt-2 px-1">
                      <SolutionBlueprint solution={item} />
                      <div className="mt-4 space-y-2 px-1">
                        {item.architecturePoints.map((point) => (
                          <div
                            key={point}
                            className="flex items-start gap-2.5 text-sm text-offwhite/85"
                          >
                            <Check
                              className="h-4 w-4 shrink-0 text-mint mt-0.5"
                              aria-hidden="true"
                            />
                            <span>{point}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Right: Desktop Sticky Visual Architectural Stage */}
          <motion.div
            key={activeSolution.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="hidden lg:block lg:col-span-6 lg:sticky lg:top-28"
          >
            <div className="rounded-2xl border border-border-dark bg-navy-elevated p-7 shadow-studio-dark">
              <div className="flex items-center justify-between gap-4 border-b border-border-dark pb-4 mb-6">
                <div className="flex items-center gap-2 text-xs text-slate-light">
                  <span className="font-display font-semibold text-mint tabular-nums">
                    {activeSolution.number}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>{activeSolution.focusLabel}</span>
                </div>
              </div>

              <h3 className="font-display text-2xl font-semibold text-offwhite">
                {activeSolution.title}
              </h3>
              <p className="mt-2.5 text-sm sm:text-base leading-relaxed text-offwhite/80">
                {activeSolution.description}
              </p>

              {/* Bespoke visual diagram for the active service */}
              <div className="mt-6">
                <SolutionBlueprint solution={activeSolution} />
              </div>

              <ul className="mt-6 space-y-2.5 border-t border-border-dark pt-5">
                {activeSolution.architecturePoints.map((point) => (
                  <li
                    key={point}
                    className="flex items-start gap-2.5 text-sm text-offwhite/90"
                  >
                    <Check
                      className="h-4 w-4 shrink-0 text-mint mt-0.5"
                      aria-hidden="true"
                    />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
