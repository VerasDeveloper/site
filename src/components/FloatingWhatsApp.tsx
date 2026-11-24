import { MessageCircle } from 'lucide-react';
import { WHATSAPP_MESSAGES, buildWhatsAppUrl } from '@/src/lib/utils';

export function FloatingWhatsApp() {
  return (
    <a
      href={buildWhatsAppUrl(WHATSAPP_MESSAGES.initial)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Conversar com a Veras Developer pelo WhatsApp"
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-30 inline-flex h-12 sm:h-12 items-center gap-2.5 rounded-full bg-mint px-4 sm:px-5 text-sm font-semibold text-navy shadow-studio-dark border border-navy/10 transition-transform duration-200 hover:bg-mint-hover hover:-translate-y-0.5 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy"
    >
      <MessageCircle className="h-5 w-5 shrink-0" aria-hidden="true" />
      <span className="hidden sm:inline whitespace-nowrap">WhatsApp</span>
    </a>
  );
}
