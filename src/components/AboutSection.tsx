import { motion } from 'motion/react';

const STUDIO_PRINCIPLES = [
  {
    label: 'Posicionamento',
    detail: 'Do site institucional à plataforma completa sob medida.',
  },
  {
    label: 'Foco comercial',
    detail: 'Clareza visual para apresentar valor e facilitar o contato.',
  },
  {
    label: 'Atuação',
    detail: 'Atendimento online estruturado para empresas em todo o Brasil.',
  },
];

export function AboutSection() {
  return (
    <section
      id="sobre"
      className="bg-offwhite text-navy py-20 sm:py-28 border-b border-border"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16 items-start">
          {/* Left Asymmetric Editorial Heading */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5"
          >
            <p className="text-xs font-medium tracking-[0.14em] uppercase text-slate-blue">
              Sobre a Veras Developer
            </p>
            <h2 className="mt-3 font-display text-[clamp(2rem,3.4vw,3.1rem)] font-semibold leading-[1.08] text-navy text-balance">
              Tecnologia que faz sentido.
            </h2>

            <div className="mt-6 flex items-center gap-2 text-xs sm:text-sm text-slate-blue">
              <span>Brasil</span>
              <span aria-hidden="true">·</span>
              <span>Atendimento digital sob medida</span>
            </div>
          </motion.div>

          {/* Right Narrative & Editorial Index */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.5, delay: 0.06, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7"
          >
            <p className="text-lg sm:text-xl leading-relaxed text-navy/90 font-normal">
              A Veras Developer é uma empresa de tecnologia especializada no desenvolvimento de soluções digitais para negócios que desejam evoluir. Unimos design, desenvolvimento e estratégia para criar experiências digitais que resolvem problemas reais, fortalecem marcas e abrem novas oportunidades. Cada projeto é pensado de acordo com as necessidades de quem contrata.
            </p>

            <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6 border-t border-border pt-8">
              {STUDIO_PRINCIPLES.map((item) => (
                <div key={item.label} className="space-y-1.5">
                  <h3 className="font-display text-sm font-semibold text-navy">
                    {item.label}
                  </h3>
                  <p className="text-sm leading-relaxed text-slate-blue">
                    {item.detail}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
