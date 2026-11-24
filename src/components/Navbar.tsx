import { useState, useEffect } from 'react';
import { Menu, X, Instagram, ArrowUpRight } from 'lucide-react';
import { Button } from '@/src/components/ui/button';
import {
  cn,
  INSTAGRAM_URL,
  INSTAGRAM_HANDLE,
  WHATSAPP_MESSAGES,
  buildWhatsAppUrl,
} from '@/src/lib/utils';

export type TabId =
  | 'inicio'
  | 'solucoes'
  | 'planos'
  | 'sobre'
  | 'contato';

export const TAB_ITEMS: { id: TabId; label: string }[] = [
  { id: 'inicio', label: 'Início' },
  { id: 'solucoes', label: 'Soluções' },
  { id: 'planos', label: 'Planos' },
  { id: 'sobre', label: 'Sobre' },
  { id: 'contato', label: 'Contato' },
];

interface NavbarProps {
  activeTab: TabId;
  onNavigate: (tab: TabId, focusContact?: boolean) => void;
}

export function Navbar({ activeTab, onNavigate }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleTabSelect = (tab: TabId) => {
    setMobileOpen(false);
    onNavigate(tab);
  };

  const handleBudgetClick = () => {
    setMobileOpen(false);
    onNavigate('contato', true);
  };

  return (
    <header
      className={cn(
        'sticky top-0 z-40 w-full transition-colors duration-200',
        scrolled
          ? 'bg-navy/95 backdrop-blur-md border-b border-border-dark'
          : 'bg-navy border-b border-border-dark/60'
      )}
    >
      <div className="mx-auto flex h-16 sm:h-[72px] max-w-7xl items-center justify-between gap-8 px-4 sm:px-6 lg:px-8">
        {/* Zone 1: Single clean text wordmark */}
        <button
          type="button"
          onClick={() => handleTabSelect('inicio')}
          className="font-display text-lg sm:text-xl font-semibold tracking-tight text-offwhite whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint rounded-sm"
        >
          Veras Developer
        </button>

        {/* Zone 2: Concise single-line tab navigation */}
        <nav
          aria-label="Navegação principal por abas"
          role="tablist"
          className="hidden md:flex items-center gap-6 lg:gap-7 text-sm font-medium"
        >
          {TAB_ITEMS.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => handleTabSelect(item.id)}
                className={cn(
                  'relative py-1.5 whitespace-nowrap shrink-0 transition-colors duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint rounded-sm after:absolute after:bottom-0 after:left-0 after:h-[2px] after:bg-mint after:transition-all after:duration-200',
                  isActive
                    ? 'text-offwhite after:w-full'
                    : 'text-offwhite/70 hover:text-offwhite after:w-0 hover:after:w-full'
                )}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Instagram link + Primary CTA */}
        <div className="hidden md:flex items-center gap-3 shrink-0">
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Instagram ${INSTAGRAM_HANDLE}`}
            title={`Instagram ${INSTAGRAM_HANDLE}`}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border-dark text-offwhite/80 transition-colors hover:border-mint/50 hover:text-mint focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint"
          >
            <Instagram className="h-4 w-4" aria-hidden="true" />
          </a>

          <Button
            type="button"
            variant="primary"
            size="sm"
            onClick={handleBudgetClick}
            className="h-10 px-5 text-sm font-semibold"
          >
            Conversar
          </Button>
        </div>

        {/* Mobile menu trigger */}
        <button
          type="button"
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-expanded={mobileOpen}
          aria-controls="mobile-navigation"
          aria-label={mobileOpen ? 'Fechar menu' : 'Abrir menu'}
          className="inline-flex md:hidden h-11 w-11 items-center justify-center rounded-lg border border-border-dark text-offwhite transition-colors hover:border-mint/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint cursor-pointer"
        >
          {mobileOpen ? (
            <X className="h-5 w-5" aria-hidden="true" />
          ) : (
            <Menu className="h-5 w-5" aria-hidden="true" />
          )}
        </button>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileOpen && (
        <div
          id="mobile-navigation"
          className="md:hidden border-t border-border-dark bg-navy px-4 pb-6 pt-4"
        >
          <nav
            aria-label="Navegação mobile por abas"
            role="tablist"
            className="flex flex-col gap-1"
          >
            {TAB_ITEMS.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => handleTabSelect(item.id)}
                  className={cn(
                    'flex min-h-[44px] w-full items-center justify-between rounded-lg px-3 text-left text-base font-medium transition-colors cursor-pointer',
                    isActive
                      ? 'bg-navy-elevated text-mint'
                      : 'text-offwhite/90 hover:bg-navy-elevated hover:text-mint'
                  )}
                >
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          <div className="mt-4 flex flex-col gap-3 border-t border-border-dark pt-4">
            <Button
              type="button"
              variant="primary"
              size="lg"
              onClick={handleBudgetClick}
              className="w-full"
            >
              Conversar
            </Button>

            <div className="flex items-center justify-between gap-3 pt-1">
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[44px] items-center gap-2 text-sm text-offwhite/80 hover:text-mint transition-colors"
              >
                <Instagram className="h-4 w-4" aria-hidden="true" />
                <span>{INSTAGRAM_HANDLE}</span>
              </a>
              <a
                href={buildWhatsAppUrl(WHATSAPP_MESSAGES.header)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[44px] items-center gap-1 text-sm font-medium text-mint hover:underline"
              >
                <span>WhatsApp</span>
                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
