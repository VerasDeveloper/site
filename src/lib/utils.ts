import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const WHATSAPP_NUMBER = '5522988259512';
export const WHATSAPP_DISPLAY = '(22) 98825-9512';
export const INSTAGRAM_HANDLE = '@verasdeveloper';
export const INSTAGRAM_URL = 'https://instagram.com/verasdeveloper';

export const WHATSAPP_MESSAGES = {
  initial:
    'Olá! Conheci a Veras Developer pelo site e gostaria de conversar sobre um projeto.',
  hero:
    'Olá! Vi o site da Veras Developer e quero começar um novo projeto digital para o meu negócio.',
  header:
    'Olá! Gostaria de solicitar um orçamento com a Veras Developer.',
  solution: (solutionName: string) =>
    `Olá! Tenho interesse na solução "${solutionName}" da Veras Developer e gostaria de entender como funciona.`,
  portfolio: (projectTitle: string) =>
    `Olá! Vi a arquitetura "${projectTitle}" no portfólio da Veras Developer e gostaria de desenvolver algo sob medida.`,
  contactDirect:
    'Olá! Estou na página de contato da Veras Developer e gostaria de conversar pelo WhatsApp sobre meu projeto.',
  planBasico:
    'Olá! Tenho interesse no Plano Básico (R$ 640,00) da Veras Developer. Gostaria de conversar sobre as opções de pagamento via Pix ou parcelado no cartão.',
  planPremium:
    'Olá! Tenho interesse no Plano Premium da Veras Developer. Gostaria de saber mais sobre as opções de pagamento parcelado no cartão.',
  planMensal:
    'Olá! Tenho interesse no Plano Mensal (R$ 89,90/mês + implantação de R$ 210,00) da Veras Developer e gostaria de entender os próximos passos.',
  planPersonalizado:
    'Olá! Quero um plano personalizado da Veras Developer. Gostaria de conversar sobre as necessidades do meu projeto e receber uma proposta sob medida.',
  planAplicativos:
    'Olá! Tenho interesse na opção de Desenvolvimento de Aplicativos do Plano Personalizado da Veras Developer e gostaria de conversar sobre meu projeto.',
} as const;

export function buildWhatsAppUrl(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function formatBrazilPhone(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 11);
  if (digits.length <= 2) return digits;
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (digits.length <= 10) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  }
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}
