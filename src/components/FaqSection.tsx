import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/src/components/ui/accordion';
import { FAQ_ITEMS } from '@/src/data/faq';

export function FaqSection() {
  return (
    <section
      id="faq"
      className="bg-offwhite text-navy py-20 sm:py-24 border-b border-border"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16 items-start">
          <div className="lg:col-span-4">
            <p className="text-xs font-medium tracking-[0.14em] uppercase text-slate-blue">
              Dúvidas frequentes
            </p>
            <h2 className="mt-3 font-display text-[clamp(1.85rem,3vw,2.6rem)] font-semibold leading-[1.1] text-navy text-balance">
              Perguntas essenciais antes de começar.
            </h2>
            <p className="mt-4 text-sm sm:text-base leading-relaxed text-slate-blue">
              Respostas diretas sobre prazos, formatos de projeto, atendimento e suporte.
            </p>
          </div>

          <div className="lg:col-span-8">
            <Accordion
              type="single"
              collapsible
              defaultValue={FAQ_ITEMS[0].id}
              className="border-t border-border"
            >
              {FAQ_ITEMS.map((item) => (
                <AccordionItem key={item.id} value={item.id}>
                  <AccordionTrigger>{item.question}</AccordionTrigger>
                  <AccordionContent>{item.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
}
