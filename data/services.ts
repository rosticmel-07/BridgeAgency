export type ServiceIcon = 'landing' | 'shop' | 'telegram' | 'advertising';

export type Service = {
  id: number;
  number: string;
  title: string;
  description: string;
  price: number;
  icon: ServiceIcon;
  href: string;
  fixedPrice?: boolean;
};

export const services: Service[] = [
  {
    id: 1,
    number: '01',
    title: 'Лендінг під ключ',
    description:
      'Односторінковий сайт для презентації товару або послуги. Орієнтовний строк — 3–5 днів.',
    price: 150,
    fixedPrice: true,
    icon: 'landing',
    href: '/services/landing',
  },
  {
    id: 2,
    number: '02',
    title: 'Багатосторінковий сайт',
    description:
      'Головна, сторінки послуг, про компанію, контакти та FAQ. Орієнтовно 7 днів.',
    price: 300,
    icon: 'shop',
    href: '/services/business-site',
  },
  {
    id: 3,
    number: '03',
    title: 'Telegram-бот',
    description:
      'Автоматично відповідає клієнтам, показує товари та приймає заявки цілодобово.',
    price: 80,
    icon: 'telegram',
    href: '/services/telegram-bot',
  },
  {
    id: 4,
    number: '04',
    title: 'Сайт + реклама',
    description:
      'Сайт і запуск реклами у Facebook та Instagram: від презентації послуги до приймання звернень.',
    price: 400,
    icon: 'advertising',
    href: '/services/site-ads',
  },
];
