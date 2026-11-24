import { useState, useEffect, useCallback } from 'react';
import { AnimatePresence, MotionConfig, motion } from 'motion/react';
import { Navbar, TAB_ITEMS, type TabId } from '@/src/components/Navbar';
import { HeroSection } from '@/src/components/HeroSection';
import { AboutSection } from '@/src/components/AboutSection';
import { SolutionsSection } from '@/src/components/SolutionsSection';
import { DifferentialsSection } from '@/src/components/DifferentialsSection';
import { PricingSection } from '@/src/components/PricingSection';
import { ContactSection, type ContactMode } from '@/src/components/ContactSection';
import { FaqSection } from '@/src/components/FaqSection';
import { FloatingWhatsApp } from '@/src/components/FloatingWhatsApp';

function getTabFromHash(): TabId {
  if (typeof window === 'undefined') return 'inicio';
  const raw = window.location.hash.replace('#', '') as TabId;
  return TAB_ITEMS.some((t) => t.id === raw) ? raw : 'inicio';
}

export default function App() {
  const [activeTab, setActiveTab] = useState<TabId>(getTabFromHash);
  const [contactMode, setContactMode] = useState<ContactMode>('orcamento');
  const [contactPreSubject, setContactPreSubject] = useState<string>('');
  const [contactIntentKey, setContactIntentKey] = useState<number>(0);

  useEffect(() => {
    const onHashChange = () => {
      setActiveTab(getTabFromHash());
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const handleNavigate = useCallback(
    (
      tab: TabId,
      focusContact = false,
      mode?: ContactMode,
      preSubject?: string
    ) => {
      if (mode) {
        setContactMode(mode);
        setContactIntentKey((prev) => prev + 1);
      } else if (tab === 'contato' && focusContact) {
        setContactMode('orcamento');
        setContactIntentKey((prev) => prev + 1);
      }

      if (preSubject !== undefined) {
        setContactPreSubject(preSubject);
      } else if (mode !== 'reuniao') {
        setContactPreSubject('');
      }

      setActiveTab(tab);
      if (window.location.hash !== `#${tab}`) {
        window.history.pushState(null, '', `#${tab}`);
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });

      if (focusContact && tab === 'contato') {
        const targetId = mode === 'reuniao' ? 'schedule-name' : 'lead-name';
        window.setTimeout(() => {
          const input = document.getElementById(targetId);
          if (input) input.focus();
        }, 260);
      }
    },
    []
  );

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen flex flex-col bg-offwhite text-navy">
        <a
          href="#conteudo-principal"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-lg focus:bg-mint focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-navy"
        >
          Ir para o conteúdo principal
        </a>

        <Navbar activeTab={activeTab} onNavigate={handleNavigate} />

        <main id="conteudo-principal" className="flex-1 flex flex-col">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              role="tabpanel"
              aria-label={
                TAB_ITEMS.find((t) => t.id === activeTab)?.label ?? 'Seção'
              }
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="flex-1 flex flex-col"
            >
              {activeTab === 'inicio' && (
                <HeroSection onNavigate={handleNavigate} />
              )}

              {activeTab === 'solucoes' && <SolutionsSection />}

              {activeTab === 'planos' && (
                <PricingSection onNavigate={handleNavigate} />
              )}

              {activeTab === 'sobre' && (
                <>
                  <AboutSection />
                  <DifferentialsSection />
                </>
              )}

              {activeTab === 'contato' && (
                <>
                  <ContactSection
                    initialMode={contactMode}
                    initialSubject={contactPreSubject}
                    intentKey={contactIntentKey}
                  />
                  <FaqSection />
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </main>

        <FloatingWhatsApp />
      </div>
    </MotionConfig>
  );
}
