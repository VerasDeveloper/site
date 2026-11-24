import { motion } from 'motion/react';
import { Clock, ArrowUpRight } from 'lucide-react';
import { WHATSAPP_MESSAGES, buildWhatsAppUrl } from '@/src/lib/utils';

const DIFFERENTIALS = [
  {
    number: '01',
    title: 'Personalização',
    description:
      'Cada projeto é desenvolvido considerando os objetivos e as necessidades do negócio.',
  },
  {
    number: '02',
    title: 'Design estratégico',
    description:
      'Interfaces pensadas para oferecer clareza, profissionalismo e uma boa experiência.',
  },
  {
    number: '03',
    title: 'Tecnologia moderna',
    description:
      'Soluções desenvolvidas com tecnologias atuais e arquitetura adequada ao projeto.',
  },
  {
    number: '04',
    title: 'Atendimento próximo',
    description:
      'Comunicação direta, acompanhamento e atenção durante o desenvolvimento.',
  },
];

export function DifferentialsSection() {
  return (
    <section
      id="diferenciais"
      className="bg-offwhite text-navy py-20 sm:py-28 border-b border-border"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left Editorial Summary */}
          <div className="lg:col-span-5">
            <p className="text-xs font-medium tracking-[0.14em] uppercase text-slate-blue">
              Diferenciais
            </p>
            <h2 className="mt-3 font-display text-[clamp(2rem,3.4vw,3.1rem)] font-semibold leading-[1.08] text-navy text-balance">
              Desenvolvimento com intenção.
            </h2>
            <p className="mt-5 text-base leading-relaxed text-slate-blue">
              Não entregamos páginas genéricas. Cada escolha visual e técnica tem o papel de tornar a sua operação mais confiável, rápida e preparada para crescer.
            </p>

            {/* Honest conditional 1-day delivery note */}
            <div className="mt-8 rounded-xl border border-border bg-offwhite-pure p-5">
              <div className="flex items-start gap-3">
                <Clock
                  className="h-5 w-5 shrink-0 text-navy mt-0.5"
                  aria-hidden="true"
                />
                <div>
                  <h3 className="font-display text-sm font-semibold text-navy">
                    Agilidade para escopos enxutos
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-blue">
                    Sites simples e páginas diretas podem ser entregues em até um dia, quando o escopo, os materiais e as aprovações permitirem.
                  </p>
                  <a
                    href={buildWhatsAppUrl(WHATSAPP_MESSAGES.initial)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-navy underline underline-offset-4 hover:text-slate-blue transition-colors"
                  >
                    <span>Consultar disponibilidade para o seu prazo</span>
                    <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right 4-Pillar Architectural Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-px bg-border rounded-2xl overflow-hidden border border-border shadow-studio">
            {DIFFERENTIALS.map((item, idx) => (
              <motion.div
                key={item.number}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.4,
                  delay: idx * 0.05,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="bg-offwhite-pure p-7 sm:p-8 flex flex-col justify-between"
              >
                <span className="font-display text-xs font-semibold tracking-widest text-slate-blue tabular-nums">
                  {item.number}
                </span>
                <div className="mt-8">
                  <h3 className="font-display text-xl font-semibold text-navy">
                    {item.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-slate-blue">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
