export type PortfolioPreview = 'safety' | 'composite' | 'realtor' | 'game';

export type PortfolioCase = {
  id: number;
  number: string;
  category: string;
  title: string;
  lead: string;
  task: string;
  solution: string;
  result?: string;
  stack: string[];
  preview: PortfolioPreview;
};

export const portfolioCases: PortfolioCase[] = [
  {
    id: 1,
    number: '01',
    category: 'Корпоративний сайт',
    title: 'Сайт для компанії з охорони праці',
    lead: 'Сайт-візитка з послугами компанії, розділом сертифікації та контактами для звернення.',
    task: 'Зібрати послуги, інформацію про сертифікацію та контакти компанії на одному зрозумілому сайті.',
    solution:
      'Зробив структурований сайт із блоками послуг, сертифікації, контактів та базою для подальшого наповнення реальними документами.',
    stack: ['HTML', 'CSS', 'JavaScript', 'GitHub Pages'],
    preview: 'safety',
  },
  {
    id: 2,
    number: '02',
    category: 'Лендінг + реклама',
    title: 'Композитна сітка — сайт і залучення лідів',
    lead: 'Односторінковий сайт із каталогом продукції, цінами та формою заявки плюс Meta Ads для залучення клієнтів у Західній Україні.',
    task: 'Сімейному бізнесу потрібен був сайт із чіткою подачею продукції та механікою отримання заявок, а також реклама для стабільного потоку лідів.',
    solution:
      'Побудував конверсійний landing із каталогом, формою ліда та інтеграцією в базу даних. Паралельно запустив і веду Meta Ads по західних областях.',
    stack: [
      'GitHub Pages',
      'Форма з інтеграцією в базу даних',
      'Meta Ads Manager',
    ],
    result: 'Близько 100 звернень потенційних клієнтів із реклами.',
    preview: 'composite',
  },
  {
    id: 3,
    number: '03',
    category: 'Telegram AI-бот',
    title: 'AI-бот для рієлторів',
    lead: 'Telegram-бот, який допомагає рієлторам швидко генерувати описи оголошень, відповіді клієнтам, follow-up повідомлення та рекламні тексти.',
    task: 'Рієлтори витрачають багато часу на рутинні тексти — від описів об’єктів до follow-up повідомлень і рекламних оголошень.',
    solution:
      'Розробив AI-бота з чотирма командами, які генерують потрібні тексти на основі короткого вводу прямо в Telegram.',
    stack: ['TypeScript', 'Node.js', 'Telegraf.js', 'OpenAI API'],
    preview: 'realtor',
  },
  {
    id: 4,
    number: '04',
    category: 'Промо-лендінг гри',
    title: 'Landing для Google Play',
    lead: 'Промо-сторінка, яка презентує гру, показує геймплей та веде користувача до встановлення через чіткий CTA в Play Market.',
    task: 'Потрібна була промо-сторінка, яка перетворює трафік із реклами та соцмереж у встановлення гри з Google Play.',
    solution:
      'Створив односторінковий landing зі скріншотами, геймплейною подачею, коротким описом механіки та чітким переходом у Play Market.',
    stack: ['HTML', 'CSS', 'JavaScript'],
    preview: 'game',
  },
];
