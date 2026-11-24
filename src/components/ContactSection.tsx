import { useEffect, useMemo, useState, type FormEvent } from 'react';
import { motion } from 'motion/react';
import {
  ArrowUpRight,
  Calendar,
  CheckCircle2,
  Clock,
  Copy,
  FileText,
  MessageSquare,
} from 'lucide-react';
import { Button } from '@/src/components/ui/button';
import { Input } from '@/src/components/ui/input';
import { Textarea } from '@/src/components/ui/textarea';
import { Select } from '@/src/components/ui/select';
import {
  WHATSAPP_MESSAGES,
  WHATSAPP_DISPLAY,
  buildWhatsAppUrl,
  cn,
  formatBrazilPhone,
} from '@/src/lib/utils';

export type ContactMode = 'orcamento' | 'reuniao';

const PROJECT_TYPES = [
  'Site profissional',
  'Landing page',
  'Desenvolvimento de aplicativos',
  'Sistema personalizado',
  'Plataforma digital',
  'Outro projeto',
] as const;

const MEETING_TIME_SLOTS = [
  '09:00',
  '10:00',
  '11:00',
  '14:00',
  '15:00',
  '16:00',
  '17:00',
  '18:00',
] as const;

const WEEKDAY_SHORT = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'] as const;
const WEEKDAY_FULL = [
  'Domingo',
  'Segunda-feira',
  'Terça-feira',
  'Quarta-feira',
  'Quinta-feira',
  'Sexta-feira',
  'Sábado',
] as const;

interface DayOption {
  iso: string;
  weekdayShort: string;
  dayMonth: string;
  fullLabel: string;
}

function toLocalIsoDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function formatIsoDatePtBr(iso: string): string {
  const parts = iso.split('-').map(Number);
  if (parts.length !== 3 || parts.some(Number.isNaN)) return iso;
  const [year, month, day] = parts;
  const localDate = new Date(year, month - 1, day);
  const weekday = WEEKDAY_FULL[localDate.getDay()] ?? '';
  const dd = String(day).padStart(2, '0');
  const mm = String(month).padStart(2, '0');
  return `${weekday}, ${dd}/${mm}/${year}`;
}

function getUpcomingMeetingDays(count = 6): DayOption[] {
  const options: DayOption[] = [];
  const cursor = new Date();
  // Start from tomorrow so every listed time slot is always available ahead
  cursor.setDate(cursor.getDate() + 1);

  while (options.length < count) {
    const dayOfWeek = cursor.getDay();
    if (dayOfWeek !== 0) {
      const dd = String(cursor.getDate()).padStart(2, '0');
      const mm = String(cursor.getMonth() + 1).padStart(2, '0');
      const iso = toLocalIsoDate(cursor);
      options.push({
        iso,
        weekdayShort: WEEKDAY_SHORT[dayOfWeek],
        dayMonth: `${dd}/${mm}`,
        fullLabel: formatIsoDatePtBr(iso),
      });
    }
    cursor.setDate(cursor.getDate() + 1);
  }
  return options;
}

interface FormValues {
  name: string;
  company: string;
  whatsapp: string;
  projectType: string;
  description: string;
}

interface FormErrors {
  name?: string;
  whatsapp?: string;
  projectType?: string;
  description?: string;
}

interface ScheduleValues {
  name: string;
  company: string;
  whatsapp: string;
  date: string;
  time: string;
  subject: string;
}

interface ScheduleErrors {
  name?: string;
  whatsapp?: string;
  date?: string;
  time?: string;
}

interface ContactSectionProps {
  initialMode?: ContactMode;
  initialSubject?: string;
  intentKey?: number;
}

function openWhatsAppSafely(url: string) {
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.target = '_blank';
  anchor.rel = 'noopener noreferrer';
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
}

export function ContactSection({
  initialMode = 'orcamento',
  initialSubject = '',
  intentKey = 0,
}: ContactSectionProps) {
  const upcomingDays = useMemo(() => getUpcomingMeetingDays(6), []);
  const minDateIso = useMemo(() => toLocalIsoDate(new Date()), []);

  const [activeMode, setActiveMode] = useState<ContactMode>(initialMode);

  // Quote Form State
  const [values, setValues] = useState<FormValues>({
    name: '',
    company: '',
    whatsapp: '',
    projectType: '',
    description: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [compiledUrl, setCompiledUrl] = useState<string | null>(null);
  const [compiledMessage, setCompiledMessage] = useState<string>('');
  const [copied, setCopied] = useState(false);

  // Meeting Schedule Form State
  const [scheduleValues, setScheduleValues] = useState<ScheduleValues>({
    name: '',
    company: '',
    whatsapp: '',
    date: upcomingDays[0]?.iso ?? '',
    time: '',
    subject: initialSubject,
  });
  const [scheduleErrors, setScheduleErrors] = useState<ScheduleErrors>({});
  const [compiledMeetingUrl, setCompiledMeetingUrl] = useState<string | null>(
    null
  );
  const [compiledMeetingMessage, setCompiledMeetingMessage] =
    useState<string>('');
  const [copiedMeeting, setCopiedMeeting] = useState(false);

  useEffect(() => {
    setActiveMode(initialMode);
    if (initialSubject) {
      setScheduleValues((prev) => ({
        ...prev,
        subject: initialSubject,
      }));
    }
  }, [initialMode, initialSubject, intentKey]);

  const validateQuote = (): FormErrors => {
    const nextErrors: FormErrors = {};
    if (values.name.trim().length < 2) {
      nextErrors.name = 'Informe seu nome.';
    }
    const phoneDigits = values.whatsapp.replace(/\D/g, '');
    if (phoneDigits.length < 10) {
      nextErrors.whatsapp = 'Informe um WhatsApp válido com DDD.';
    }
    if (!values.projectType) {
      nextErrors.projectType = 'Selecione o tipo de projeto.';
    }
    if (values.description.trim().length < 10) {
      nextErrors.description =
        'Descreva brevemente o que você precisa (mínimo 10 caracteres).';
    }
    return nextErrors;
  };

  const handleQuoteSubmit = (e: FormEvent) => {
    e.preventDefault();
    const validationErrors = validateQuote();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    const companyLine = values.company.trim()
      ? `\n*Empresa:* ${values.company.trim()}`
      : '';

    const message = [
      'Olá! Gostaria de solicitar um orçamento com a Veras Developer.',
      '',
      `*Nome:* ${values.name.trim()}${companyLine}`,
      `*WhatsApp:* ${values.whatsapp.trim()}`,
      `*Tipo de projeto:* ${values.projectType}`,
      `*Necessidade:* ${values.description.trim()}`,
    ].join('\n');

    const url = buildWhatsAppUrl(message);
    setCompiledMessage(message);
    setCompiledUrl(url);
    setCopied(false);
    openWhatsAppSafely(url);
  };

  const validateSchedule = (): ScheduleErrors => {
    const nextErrors: ScheduleErrors = {};
    if (scheduleValues.name.trim().length < 2) {
      nextErrors.name = 'Informe seu nome.';
    }
    const phoneDigits = scheduleValues.whatsapp.replace(/\D/g, '');
    if (phoneDigits.length < 10) {
      nextErrors.whatsapp = 'Informe um WhatsApp válido com DDD.';
    }
    if (!scheduleValues.date) {
      nextErrors.date = 'Escolha um dia para a reunião.';
    }
    if (!scheduleValues.time) {
      nextErrors.time = 'Escolha um horário disponível.';
    }
    return nextErrors;
  };

  const handleScheduleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const validationErrors = validateSchedule();
    setScheduleErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    const formattedDate = formatIsoDatePtBr(scheduleValues.date);
    const companyLine = scheduleValues.company.trim()
      ? `\n*Empresa:* ${scheduleValues.company.trim()}`
      : '';
    const subjectLine = scheduleValues.subject.trim()
      ? `\n*Assunto:* ${scheduleValues.subject.trim()}`
      : '';

    const message = [
      'Olá! Gostaria de agendar uma reunião com a Veras Developer.',
      '',
      `*Nome:* ${scheduleValues.name.trim()}${companyLine}`,
      `*WhatsApp:* ${scheduleValues.whatsapp.trim()}`,
      `*Data desejada:* ${formattedDate}`,
      `*Horário:* ${scheduleValues.time} (Horário de Brasília)${subjectLine}`,
    ].join('\n');

    const url = buildWhatsAppUrl(message);
    setCompiledMeetingMessage(message);
    setCompiledMeetingUrl(url);
    setCopiedMeeting(false);
    openWhatsAppSafely(url);
  };

  const handleCopyMessage = async (text: string, isMeeting = false) => {
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      if (isMeeting) {
        setCopiedMeeting(true);
        window.setTimeout(() => setCopiedMeeting(false), 2500);
      } else {
        setCopied(true);
        window.setTimeout(() => setCopied(false), 2500);
      }
    } catch {
      if (isMeeting) {
        setCopiedMeeting(false);
      } else {
        setCopied(false);
      }
    }
  };

  const switchAndFocus = (mode: ContactMode) => {
    setActiveMode(mode);
    window.setTimeout(() => {
      const targetId = mode === 'reuniao' ? 'schedule-name' : 'lead-name';
      const input = document.getElementById(targetId);
      if (input) input.focus();
    }, 60);
  };

  return (
    <section
      id="contato"
      className="bg-navy-surface text-offwhite py-20 sm:py-28 border-b border-border-dark"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-14 items-start">
          {/* Left Conversion Pitch */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5"
          >
            <p className="text-xs font-medium tracking-[0.14em] uppercase text-mint">
              Contato comercial
            </p>
            <h2 className="mt-3 font-display text-[clamp(2rem,3.6vw,3.25rem)] font-semibold leading-[1.06] text-offwhite text-balance">
              Vamos tirar sua ideia do papel?
            </h2>
            <p className="mt-5 text-base sm:text-lg leading-relaxed text-offwhite/80">
              Conte um pouco sobre seu projeto ou agende uma reunião no dia e horário que preferir. Tudo é encaminhado diretamente para o nosso WhatsApp.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3.5">
              <Button asChild variant="primary" size="lg">
                <a
                  href={buildWhatsAppUrl(WHATSAPP_MESSAGES.contactDirect)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageSquare className="h-4 w-4" aria-hidden="true" />
                  <span>Conversar pelo WhatsApp</span>
                </a>
              </Button>

              <Button
                type="button"
                variant="outlineDark"
                size="lg"
                onClick={() => switchAndFocus('reuniao')}
                className={cn(
                  activeMode === 'reuniao' && 'border-mint text-mint'
                )}
              >
                <Calendar className="h-4 w-4" aria-hidden="true" />
                <span>Agendar uma reunião</span>
              </Button>

              <Button
                type="button"
                variant="outlineDark"
                size="lg"
                onClick={() => switchAndFocus('orcamento')}
                className={cn(
                  activeMode === 'orcamento' && 'border-mint text-mint'
                )}
              >
                <span>Solicitar orçamento</span>
              </Button>
            </div>

            <div className="mt-10 border-t border-border-dark pt-6 space-y-2 text-sm text-slate-light">
              <p>
                WhatsApp comercial:{' '}
                <a
                  href={buildWhatsAppUrl(WHATSAPP_MESSAGES.initial)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-offwhite hover:text-mint transition-colors tabular-nums"
                >
                  {WHATSAPP_DISPLAY}
                </a>
              </p>
              <p>Atendimento online para empresas em todo o Brasil.</p>
            </div>
          </motion.div>

          {/* Right Form / Meeting Scheduler Panel */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.06, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7"
          >
            <div className="rounded-2xl border border-border-dark bg-navy-elevated p-6 sm:p-8 text-offwhite shadow-studio-dark [color-scheme:dark]">
              {/* Mode Switcher Tabs */}
              <div
                role="tablist"
                aria-label="Escolha como prefere falar com a Veras Developer"
                className="grid grid-cols-2 gap-1.5 rounded-xl border border-border-dark bg-navy p-1 mb-6"
              >
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeMode === 'orcamento'}
                  onClick={() => setActiveMode('orcamento')}
                  className={cn(
                    'flex items-center justify-center gap-2 rounded-lg px-3 py-2.5 text-xs sm:text-sm font-semibold transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint',
                    activeMode === 'orcamento'
                      ? 'bg-mint text-navy shadow-sm'
                      : 'text-slate-light hover:text-offwhite'
                  )}
                >
                  <FileText className="h-4 w-4 shrink-0" aria-hidden="true" />
                  <span>Enviar orçamento</span>
                </button>

                <button
                  type="button"
                  role="tab"
                  aria-selected={activeMode === 'reuniao'}
                  onClick={() => setActiveMode('reuniao')}
                  className={cn(
                    'flex items-center justify-center gap-2 rounded-lg px-3 py-2.5 text-xs sm:text-sm font-semibold transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint',
                    activeMode === 'reuniao'
                      ? 'bg-mint text-navy shadow-sm'
                      : 'text-slate-light hover:text-offwhite'
                  )}
                >
                  <Calendar className="h-4 w-4 shrink-0" aria-hidden="true" />
                  <span>Agendar reunião</span>
                </button>
              </div>

              {activeMode === 'orcamento' ? (
                <>
                  <h3 className="font-display text-xl sm:text-2xl font-semibold text-offwhite">
                    Enviar detalhes do projeto
                  </h3>
                  <p className="mt-1.5 text-sm text-slate-light">
                    Preencha os campos abaixo para montar uma mensagem estruturada e continuar direto no WhatsApp.
                  </p>

                  <form
                    onSubmit={handleQuoteSubmit}
                    noValidate
                    className="mt-6 space-y-5"
                  >
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                      <div>
                        <label
                          htmlFor="lead-name"
                          className="block text-xs font-semibold uppercase tracking-wide text-offwhite mb-1.5"
                        >
                          Nome *
                        </label>
                        <Input
                          id="lead-name"
                          name="name"
                          type="text"
                          autoComplete="name"
                          placeholder="Seu nome completo"
                          className="border-border-dark bg-navy text-offwhite placeholder:text-slate-light/60 focus-visible:border-mint"
                          value={values.name}
                          onChange={(e) => {
                            setValues({ ...values, name: e.target.value });
                            if (errors.name)
                              setErrors({ ...errors, name: undefined });
                          }}
                          aria-invalid={Boolean(errors.name)}
                        />
                        {errors.name && (
                          <p
                            role="alert"
                            className="mt-1.5 text-xs font-medium text-mint"
                          >
                            {errors.name}
                          </p>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="lead-company"
                          className="block text-xs font-semibold uppercase tracking-wide text-offwhite mb-1.5"
                        >
                          Nome da empresa
                        </label>
                        <Input
                          id="lead-company"
                          name="company"
                          type="text"
                          autoComplete="organization"
                          placeholder="Nome do negócio (opcional)"
                          className="border-border-dark bg-navy text-offwhite placeholder:text-slate-light/60 focus-visible:border-mint"
                          value={values.company}
                          onChange={(e) =>
                            setValues({ ...values, company: e.target.value })
                          }
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                      <div>
                        <label
                          htmlFor="lead-whatsapp"
                          className="block text-xs font-semibold uppercase tracking-wide text-offwhite mb-1.5"
                        >
                          WhatsApp *
                        </label>
                        <Input
                          id="lead-whatsapp"
                          name="whatsapp"
                          type="tel"
                          inputMode="tel"
                          autoComplete="tel"
                          placeholder="(22) 99999-9999"
                          className="border-border-dark bg-navy text-offwhite placeholder:text-slate-light/60 focus-visible:border-mint"
                          value={values.whatsapp}
                          onChange={(e) => {
                            setValues({
                              ...values,
                              whatsapp: formatBrazilPhone(e.target.value),
                            });
                            if (errors.whatsapp) {
                              setErrors({ ...errors, whatsapp: undefined });
                            }
                          }}
                          aria-invalid={Boolean(errors.whatsapp)}
                        />
                        {errors.whatsapp && (
                          <p
                            role="alert"
                            className="mt-1.5 text-xs font-medium text-mint"
                          >
                            {errors.whatsapp}
                          </p>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="lead-type"
                          className="block text-xs font-semibold uppercase tracking-wide text-offwhite mb-1.5"
                        >
                          Tipo de projeto *
                        </label>
                        <Select
                          id="lead-type"
                          name="projectType"
                          className="border-border-dark bg-navy text-offwhite focus-visible:border-mint"
                          value={values.projectType}
                          onChange={(e) => {
                            setValues({
                              ...values,
                              projectType: e.target.value,
                            });
                            if (errors.projectType) {
                              setErrors({
                                ...errors,
                                projectType: undefined,
                              });
                            }
                          }}
                          aria-invalid={Boolean(errors.projectType)}
                        >
                          <option value="">Selecione uma opção</option>
                          {PROJECT_TYPES.map((type) => (
                            <option key={type} value={type}>
                              {type}
                            </option>
                          ))}
                        </Select>
                        {errors.projectType && (
                          <p
                            role="alert"
                            className="mt-1.5 text-xs font-medium text-mint"
                          >
                            {errors.projectType}
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="lead-description"
                        className="block text-xs font-semibold uppercase tracking-wide text-offwhite mb-1.5"
                      >
                        Descrição da necessidade *
                      </label>
                      <Textarea
                        id="lead-description"
                        name="description"
                        placeholder="Explique o que sua empresa precisa resolver, funcionalidades esperadas ou prazo desejado."
                        className="border-border-dark bg-navy text-offwhite placeholder:text-slate-light/60 focus-visible:border-mint"
                        value={values.description}
                        onChange={(e) => {
                          setValues({ ...values, description: e.target.value });
                          if (errors.description) {
                            setErrors({ ...errors, description: undefined });
                          }
                        }}
                        aria-invalid={Boolean(errors.description)}
                      />
                      {errors.description && (
                        <p
                          role="alert"
                          className="mt-1.5 text-xs font-medium text-mint"
                        >
                          {errors.description}
                        </p>
                      )}
                    </div>

                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      className="w-full"
                    >
                      <span>Preparar e abrir no WhatsApp</span>
                      <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                    </Button>
                  </form>

                  {/* Confirmation & Direct Fallback Box */}
                  {compiledUrl && (
                    <div
                      role="status"
                      className="mt-6 rounded-xl border border-mint/45 bg-navy p-4"
                    >
                      <div className="flex items-start gap-2.5">
                        <CheckCircle2
                          className="h-5 w-5 shrink-0 text-mint mt-0.5"
                          aria-hidden="true"
                        />
                        <div className="flex-1">
                          <p className="font-display text-sm font-semibold text-offwhite">
                            Mensagem pronta para envio no WhatsApp
                          </p>
                          <p className="mt-1 text-xs text-slate-light">
                            Caso a janela do WhatsApp não tenha aberto automaticamente, use o botão abaixo ou copie o resumo.
                          </p>
                          <div className="mt-3 flex flex-wrap items-center gap-2.5">
                            <Button asChild variant="primary" size="sm">
                              <a
                                href={compiledUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <span>Abrir conversa no WhatsApp</span>
                                <ArrowUpRight
                                  className="h-3.5 w-3.5"
                                  aria-hidden="true"
                                />
                              </a>
                            </Button>
                            <Button
                              type="button"
                              variant="outlineDark"
                              size="sm"
                              onClick={() =>
                                handleCopyMessage(compiledMessage, false)
                              }
                            >
                              <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                              <span>
                                {copied ? 'Resumo copiado' : 'Copiar mensagem'}
                              </span>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <>
                  <h3 className="font-display text-xl sm:text-2xl font-semibold text-offwhite">
                    Agendar uma reunião
                  </h3>
                  <p className="mt-1.5 text-sm text-slate-light">
                    Escolha o melhor dia e horário para conversarmos sobre o seu projeto. Ao confirmar, o agendamento é encaminhado direto para o nosso WhatsApp.
                  </p>

                  <form
                    onSubmit={handleScheduleSubmit}
                    noValidate
                    className="mt-6 space-y-5"
                  >
                    {/* Step 1: Day Selection */}
                    <div>
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                        <label className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-offwhite">
                          <Calendar className="h-3.5 w-3.5 text-mint" aria-hidden="true" />
                          <span>Escolha o dia *</span>
                        </label>
                        {scheduleValues.date && (
                          <span className="text-xs font-medium text-mint">
                            {formatIsoDatePtBr(scheduleValues.date)}
                          </span>
                        )}
                      </div>

                      <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                        {upcomingDays.map((day) => {
                          const selected = scheduleValues.date === day.iso;
                          return (
                            <button
                              key={day.iso}
                              type="button"
                              onClick={() => {
                                setScheduleValues({
                                  ...scheduleValues,
                                  date: day.iso,
                                });
                                if (scheduleErrors.date) {
                                  setScheduleErrors({
                                    ...scheduleErrors,
                                    date: undefined,
                                  });
                                }
                              }}
                              aria-pressed={selected}
                              className={cn(
                                'rounded-xl border px-2.5 py-2.5 text-center transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint',
                                selected
                                  ? 'border-mint bg-mint text-navy font-semibold shadow-sm'
                                  : 'border-border-dark bg-navy text-offwhite hover:border-mint/50 hover:text-mint'
                              )}
                            >
                              <span className="block text-[11px] uppercase tracking-wider opacity-80">
                                {day.weekdayShort}
                              </span>
                              <span className="mt-0.5 block text-sm font-semibold tabular-nums">
                                {day.dayMonth}
                              </span>
                            </button>
                          );
                        })}
                      </div>

                      <div className="mt-2.5 flex flex-col sm:flex-row sm:items-center gap-2">
                        <label
                          htmlFor="schedule-custom-date"
                          className="text-xs font-medium text-slate-light whitespace-nowrap"
                        >
                          Ou escolha outra data:
                        </label>
                        <Input
                          id="schedule-custom-date"
                          type="date"
                          min={minDateIso}
                          value={scheduleValues.date}
                          onChange={(e) => {
                            setScheduleValues({
                              ...scheduleValues,
                              date: e.target.value,
                            });
                            if (scheduleErrors.date) {
                              setScheduleErrors({
                                ...scheduleErrors,
                                date: undefined,
                              });
                            }
                          }}
                          className="h-9 sm:max-w-[200px] text-xs border-border-dark bg-navy text-offwhite focus-visible:border-mint"
                        />
                      </div>

                      {scheduleErrors.date && (
                        <p
                          role="alert"
                          className="mt-1.5 text-xs font-medium text-mint"
                        >
                          {scheduleErrors.date}
                        </p>
                      )}
                    </div>

                    {/* Step 2: Time Selection */}
                    <div>
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                        <label className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-offwhite">
                          <Clock className="h-3.5 w-3.5 text-mint" aria-hidden="true" />
                          <span>Escolha o horário *</span>
                        </label>
                        <span className="text-[11px] text-slate-light">
                          Horário de Brasília (BRT)
                        </span>
                      </div>

                      <div className="grid grid-cols-4 gap-2">
                        {MEETING_TIME_SLOTS.map((slot) => {
                          const selected = scheduleValues.time === slot;
                          return (
                            <button
                              key={slot}
                              type="button"
                              onClick={() => {
                                setScheduleValues({
                                  ...scheduleValues,
                                  time: slot,
                                });
                                if (scheduleErrors.time) {
                                  setScheduleErrors({
                                    ...scheduleErrors,
                                    time: undefined,
                                  });
                                }
                              }}
                              aria-pressed={selected}
                              className={cn(
                                'rounded-xl border py-2.5 text-sm font-medium tabular-nums transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint',
                                selected
                                  ? 'border-mint bg-mint text-navy font-semibold shadow-sm'
                                  : 'border-border-dark bg-navy text-offwhite hover:border-mint/50 hover:text-mint'
                              )}
                            >
                              {slot}
                            </button>
                          );
                        })}
                      </div>

                      {scheduleErrors.time && (
                        <p
                          role="alert"
                          className="mt-1.5 text-xs font-medium text-mint"
                        >
                          {scheduleErrors.time}
                        </p>
                      )}
                    </div>

                    {/* Step 3: Contact Info */}
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                        <label
                          htmlFor="schedule-name"
                          className="block text-xs font-semibold uppercase tracking-wide text-offwhite mb-1.5"
                        >
                          Nome *
                        </label>
                        <Input
                          id="schedule-name"
                          name="scheduleName"
                          type="text"
                          autoComplete="name"
                          placeholder="Seu nome completo"
                          className="border-border-dark bg-navy text-offwhite placeholder:text-slate-light/60 focus-visible:border-mint"
                          value={scheduleValues.name}
                          onChange={(e) => {
                            setScheduleValues({
                              ...scheduleValues,
                              name: e.target.value,
                            });
                            if (scheduleErrors.name) {
                              setScheduleErrors({
                                ...scheduleErrors,
                                name: undefined,
                              });
                            }
                          }}
                          aria-invalid={Boolean(scheduleErrors.name)}
                        />
                        {scheduleErrors.name && (
                          <p
                            role="alert"
                            className="mt-1.5 text-xs font-medium text-mint"
                          >
                            {scheduleErrors.name}
                          </p>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="schedule-whatsapp"
                          className="block text-xs font-semibold uppercase tracking-wide text-offwhite mb-1.5"
                        >
                          WhatsApp *
                        </label>
                        <Input
                          id="schedule-whatsapp"
                          name="scheduleWhatsapp"
                          type="tel"
                          inputMode="tel"
                          autoComplete="tel"
                          placeholder="(22) 99999-9999"
                          className="border-border-dark bg-navy text-offwhite placeholder:text-slate-light/60 focus-visible:border-mint"
                          value={scheduleValues.whatsapp}
                          onChange={(e) => {
                            setScheduleValues({
                              ...scheduleValues,
                              whatsapp: formatBrazilPhone(e.target.value),
                            });
                            if (scheduleErrors.whatsapp) {
                              setScheduleErrors({
                                ...scheduleErrors,
                                whatsapp: undefined,
                              });
                            }
                          }}
                          aria-invalid={Boolean(scheduleErrors.whatsapp)}
                        />
                        {scheduleErrors.whatsapp && (
                          <p
                            role="alert"
                            className="mt-1.5 text-xs font-medium text-mint"
                          >
                            {scheduleErrors.whatsapp}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                        <label
                          htmlFor="schedule-company"
                          className="block text-xs font-semibold uppercase tracking-wide text-offwhite mb-1.5"
                        >
                          Nome da empresa
                        </label>
                        <Input
                          id="schedule-company"
                          name="scheduleCompany"
                          type="text"
                          autoComplete="organization"
                          placeholder="Nome do negócio (opcional)"
                          className="border-border-dark bg-navy text-offwhite placeholder:text-slate-light/60 focus-visible:border-mint"
                          value={scheduleValues.company}
                          onChange={(e) =>
                            setScheduleValues({
                              ...scheduleValues,
                              company: e.target.value,
                            })
                          }
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="schedule-subject"
                          className="block text-xs font-semibold uppercase tracking-wide text-offwhite mb-1.5"
                        >
                          Assunto da reunião
                        </label>
                        <Input
                          id="schedule-subject"
                          name="scheduleSubject"
                          type="text"
                          placeholder="Ex: Projeto sob medida, sistema web..."
                          className="border-border-dark bg-navy text-offwhite placeholder:text-slate-light/60 focus-visible:border-mint"
                          value={scheduleValues.subject}
                          onChange={(e) =>
                            setScheduleValues({
                              ...scheduleValues,
                              subject: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>

                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      className="w-full"
                    >
                      <Calendar className="h-4 w-4" aria-hidden="true" />
                      <span>Agendar e enviar para o WhatsApp</span>
                      <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                    </Button>
                  </form>

                  {/* Meeting Confirmation & Direct Fallback Box */}
                  {compiledMeetingUrl && (
                    <div
                      role="status"
                      className="mt-6 rounded-xl border border-mint/45 bg-navy p-4"
                    >
                      <div className="flex items-start gap-2.5">
                        <CheckCircle2
                          className="h-5 w-5 shrink-0 text-mint mt-0.5"
                          aria-hidden="true"
                        />
                        <div className="flex-1">
                          <p className="font-display text-sm font-semibold text-offwhite">
                            Agendamento pronto para envio no WhatsApp
                          </p>
                          <p className="mt-1 text-xs text-slate-light">
                            Caso a janela do WhatsApp não tenha aberto automaticamente, clique abaixo para enviar os dados da reunião ou copie o resumo.
                          </p>
                          <div className="mt-3 flex flex-wrap items-center gap-2.5">
                            <Button asChild variant="primary" size="sm">
                              <a
                                href={compiledMeetingUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <span>Enviar agendamento no WhatsApp</span>
                                <ArrowUpRight
                                  className="h-3.5 w-3.5"
                                  aria-hidden="true"
                                />
                              </a>
                            </Button>
                            <Button
                              type="button"
                              variant="outlineDark"
                              size="sm"
                              onClick={() =>
                                handleCopyMessage(compiledMeetingMessage, true)
                              }
                            >
                              <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                              <span>
                                {copiedMeeting
                                  ? 'Agendamento copiado'
                                  : 'Copiar agendamento'}
                              </span>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
