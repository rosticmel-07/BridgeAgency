const normalizeUrl = (value: string) => {
  const url = value.startsWith('http') ? value : `https://${value}`;

  return url.replace(/\/+$/, '');
};

const rawSiteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  process.env.VERCEL_PROJECT_PRODUCTION_URL ||
  'http://localhost:3000';

export const SITE_URL = normalizeUrl(rawSiteUrl);

export const SITE_NAME = 'Bridge Agency';

export const SITE_DESCRIPTION =
  'Створюємо лендінги, багатосторінкові сайти, Telegram-боти та запускаємо рекламу для бізнесу.';
