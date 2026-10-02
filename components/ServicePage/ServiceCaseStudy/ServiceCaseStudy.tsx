import Image from 'next/image';
import Link from 'next/link';

import { FiArrowUpRight, FiCheck, FiExternalLink } from 'react-icons/fi';

import type { PortfolioCase } from '@/types/types';

import { PrimaryButton } from '@/components/ui/PrimaryButton/PrimaryButton';
import { Reveal } from '../Reveal/Reveal';

import styles from './ServiceCaseStudy.module.css';

type Props = {
  caseStudy: PortfolioCase;
  isBot: boolean;
  slug: string;
};

type CaseDetail = {
  label: string;
  value: string;
};

type ServiceCaseConfig = {
  category: string;
  eyebrow: string;
  headline: string;
  accent: string;
  intro: string;
  task: string;
  solution: string;
  client: string;
  clientMeta: string;
  image: string;
  imageAlt: string;
  browserLabel: string;
  siteUrl?: string;
  metric: {
    value: string;
    label: string;
    note?: string;
  };
  benefitsTitle: string;
  benefits: string[];
  details: CaseDetail[];
  cta: string;
  imageFit?: 'cover' | 'contain';
};

const caseContent: Record<string, ServiceCaseConfig> = {
  landing: {
    category: 'ЛЕНДІНГ',
    eyebrow: '03 / ПРИКЛАД РОБОТИ',
    headline: 'Композитна сітка —',
    accent: 'лендінг під заявки.',
    intro:
      'Комерційний проєкт для виробника композитної сітки та арматури: посадкова сторінка, яка презентує продукцію й приймає заявки з реклами.',
    task: 'Потрібна була посадкова сторінка під рекламу, яка швидко показує продукт, асортимент і ціни та веде потенційного клієнта до заявки.',
    solution:
      'Зібрали структуру лендінгу: сильний перший екран, переваги, сфери застосування, прайс, блоки довіри та форму заявки. Окремо адаптували сторінку під мобільний трафік.',
    client: 'Виробник композитної сітки',
    clientMeta: 'Клієнт · лендінг',
    image: '/cases/composite-mesh.jpg',
    imageAlt: 'Лендінг виробника композитної сітки',
    browserLabel: 'rosticmel-07.github.io/KompoSite',
    siteUrl: 'https://rosticmel-07.github.io/KompoSite/',
    metric: {
      value: '≈100',
      label: 'звернень потенційних клієнтів',
      note: 'За 14 днів реклами, бюджет $60',
    },
    benefitsTitle: 'Що клієнт отримав',
    benefits: [
      'Ціни й асортимент на одній сторінці',
      'Заявка за один крок',
      'Сторінка, готова приймати рекламний трафік',
      'Зручна версія для телефона',
    ],
    details: [
      {
        label: 'Формат',
        value: 'Лендінг',
      },
      {
        label: 'Трафік',
        value: 'Meta Ads окремо',
      },
      {
        label: 'Термін',
        value: '3 дні',
      },
    ],
    cta: 'Обговорити схожий лендінг',
  },

  'business-site': {
    category: 'БАГАТОСТОРІНКОВИЙ САЙТ',
    eyebrow: '03 / ПРИКЛАД РОБОТИ',
    headline: 'Сайт для компанії —',
    accent: 'структура під довіру.',
    intro:
      'Корпоративний сайт для компанії з охорони праці. Завданням було системно показати послуги, сертифікацію та контакти в одному професійному цифровому просторі.',
    task: 'Компанії був потрібен сайт, який зрозуміло презентує напрямки роботи, формує відчуття серйозного підрядника та дає клієнту швидкий доступ до послуг, документів і контактів.',
    solution:
      'Побудували багатосторінкову структуру з окремими інформаційними блоками для послуг, сертифікації, інформації про компанію та контактів. Архітектуру залишили готовою до подальшого наповнення реальними документами.',
    client: 'Компанія з охорони праці',
    clientMeta: 'Корпоративний сайт',
    image: '/cases/safety-site.jpg',
    imageAlt: 'Корпоративний сайт компанії з охорони праці',
    browserLabel: 'корпоративний сайт клієнта',
    metric: {
      value: '4',
      label: 'ключові напрямки зібрані в одній структурі',
      note: 'Послуги · сертифікація · про компанію · контакти',
    },
    benefitsTitle: 'Що отримав бізнес',
    benefits: [
      'Професійна презентація компанії',
      'Послуги структуровані по сторінках',
      'Окремий простір для сертифікатів і документів',
      'Основа для подальшого розвитку сайту',
    ],
    details: [
      {
        label: 'Формат',
        value: 'Корпоративний сайт',
      },
      {
        label: 'Структура',
        value: 'Кілька сторінок',
      },
      {
        label: 'Термін',
        value: '≈7 днів',
      },
    ],
    cta: 'Обговорити корпоративний сайт',
  },

  'telegram-bot': {
    category: 'TELEGRAM-БОТ',
    eyebrow: '03 / ПРИКЛАД РОБОТИ',
    headline: 'AI-бот для рієлторів —',
    accent: 'менше щоденної рутини.',
    intro:
      'Telegram-бот, який допомагає рієлторам швидше створювати тексти для оголошень, відповідей клієнтам, follow-up повідомлень і реклами.',
    task: 'Рієлтори регулярно витрачають час на однотипні тексти. Потрібно було перенести ці сценарії в простий інструмент, яким можна користуватися безпосередньо в Telegram.',
    solution:
      'Розробили AI-бота з окремими командами для основних робочих сценаріїв. Користувач вводить короткі вихідні дані, а бот формує готовий текст під конкретну задачу.',
    client: 'AI-помічник для рієлторів',
    clientMeta: 'Telegram · автоматизація',
    image: '/cases/realtor-bot.jpg',
    imageAlt: 'Telegram AI-бот для рієлторів',
    browserLabel: 'Realtor_Ai_Bot',
    metric: {
      value: '4',
      label: 'готові сценарії для щоденних задач',
      note: '/listing · /reply · /followup · /ad',
    },
    benefitsTitle: 'Що автоматизовано',
    benefits: [
      'Описи квартир і об’єктів',
      'Відповіді потенційним клієнтам',
      'Follow-up повідомлення',
      'Рекламні тексти',
    ],
    details: [
      {
        label: 'Стек',
        value: 'TypeScript',
      },
      {
        label: 'Backend',
        value: 'Node.js',
      },
      {
        label: 'AI',
        value: 'OpenAI API',
      },
    ],
    cta: 'Обговорити Telegram-бота',
    imageFit: 'contain',
  },

  'site-ads': {
    category: 'САЙТ + РЕКЛАМА',
    eyebrow: '03 / ПРИКЛАД РОБОТИ',
    headline: 'Сайт і реклама —',
    accent: 'одна зв’язка під заявки.',
    intro:
      'Для виробника композитної сітки сайт став посадковою сторінкою, а Meta Ads — джерелом цільового трафіку на неї.',
    task: 'Потрібно було не тільки створити сайт, а побудувати повний шлях користувача: реклама → зрозуміла пропозиція → продукція та ціни → форма заявки.',
    solution:
      'Підготували лендінг під рекламний трафік, налаштували форму звернення та запустили Meta Ads на західні області України з ціллю Leads.',
    client: 'Виробник композитної сітки',
    clientMeta: 'Лендінг · Meta Ads',
    image: '/cases/composite-mesh.jpg',
    imageAlt: 'Сайт і рекламна кампанія виробника композитної сітки',
    browserLabel: 'rosticmel-07.github.io/KompoSite',
    siteUrl: 'https://rosticmel-07.github.io/KompoSite/',
    metric: {
      value: '≈100',
      label: 'звернень потенційних клієнтів',
      note: 'За 14 днів реклами, бюджет $60',
    },
    benefitsTitle: 'Що працювало у зв’язці',
    benefits: [
      'Лендінг під рекламний трафік',
      'Форма для збору звернень',
      'Meta Ads із ціллю Leads',
      'Єдиний шлях від реклами до заявки',
    ],
    details: [
      {
        label: 'Формат',
        value: 'Сайт + реклама',
      },
      {
        label: 'Канал',
        value: 'Meta Ads',
      },
      {
        label: 'Ведення',
        value: '14 днів',
      },
    ],
    cta: 'Обговорити сайт + рекламу',
  },
};

export function ServiceCaseStudy({ caseStudy, slug }: Props) {
  const config = caseContent[slug];

  if (!config) {
    return null;
  }

  const portfolioHref = `/?case=${caseStudy.id}#portfolio`;

  return (
    <section className={styles.section} id="case">
      <Reveal className={styles.header}>
        <div className={styles.topline}>
          <div className={styles.kicker}>
            <span className={styles.kickerLine} aria-hidden />

            <span>{config.eyebrow}</span>
          </div>

          <span className={styles.tag}>{config.category}</span>
        </div>

        <div className={styles.headingRow}>
          <h2 className={styles.heading}>
            {config.headline}
            <br />
            <span>{config.accent}</span>
          </h2>

          <p className={styles.introText}>{config.intro}</p>
        </div>
      </Reveal>

      <div className={styles.mainGrid}>
        <Reveal className={styles.visual} delay={80}>
          <div
            className={`${styles.browser} ${
              config.imageFit === 'contain' ? styles.browserContain : ''
            }`}
          >
            <div className={styles.browserBar}>
              <div className={styles.browserDots} aria-hidden>
                <span />
                <span />
                <span />
              </div>

              <div className={styles.browserAddress}>
                <span className={styles.addressDot} aria-hidden />

                <span>{config.browserLabel}</span>
              </div>

              {config.siteUrl ? (
                <a
                  href={config.siteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.browserIconLink}
                  aria-label="Відкрити проєкт у новій вкладці"
                >
                  <FiExternalLink aria-hidden />
                </a>
              ) : (
                <span className={styles.browserIconSpacer} aria-hidden />
              )}
            </div>

            <div className={styles.screen}>
              <Image
                src={config.image}
                alt={config.imageAlt}
                fill
                sizes="(max-width: 1000px) 100vw, 720px"
                className={`${styles.screenImage} ${
                  config.imageFit === 'contain' ? styles.screenImageContain : ''
                }`}
              />
            </div>
          </div>

          <div className={styles.visualFooter}>
            <div className={styles.projectStatus}>
              <strong>{config.client}</strong>
              <span>{config.clientMeta}</span>
            </div>

            {config.siteUrl && (
              <a
                href={config.siteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.liveLink}
              >
                Відкрити проєкт
                <FiArrowUpRight aria-hidden />
              </a>
            )}
          </div>
        </Reveal>

        <Reveal className={styles.caseInfo} delay={140}>
          <article className={styles.infoBlock}>
            <div className={styles.infoTop}>
              <span>01</span>
              <h3 className={styles.infoHead}>Задача</h3>
            </div>

            <p>{config.task}</p>
          </article>

          <article className={styles.infoBlock}>
            <div className={styles.infoTop}>
              <span>02</span>
              <h3 className={styles.infoHead}>Рішення</h3>
            </div>

            <p>{config.solution}</p>
          </article>

          <dl className={styles.details}>
            {config.details.map((item) => (
              <div key={item.label} className={styles.detail}>
                <dt>{item.label}</dt>
                <dd>{item.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>

      <Reveal className={styles.outcome} delay={200}>
        <div className={styles.result}>
          <span className={styles.resultLabel}>Що це дало бізнесу</span>

          <div className={styles.resultMain}>
            <strong>{config.metric.value}</strong>
            <p>{config.metric.label}</p>
          </div>

          {config.metric.note && (
            <small className={styles.resultNote}>{config.metric.note}</small>
          )}
        </div>

        <div className={styles.benefitsWrap}>
          <span className={styles.benefitsTitle}>{config.benefitsTitle}</span>

          <ul className={styles.benefits}>
            {config.benefits.map((item) => (
              <li key={item} className={styles.benefit}>
                <span className={styles.check}>
                  <FiCheck aria-hidden />
                </span>

                <p>{item}</p>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>

      <Reveal className={styles.actions} delay={240}>
        <PrimaryButton href="#contact">{config.cta}</PrimaryButton>

        <Link href={portfolioHref} className={styles.caseLink}>
          Дивитись у портфоліо
          <FiArrowUpRight aria-hidden />
        </Link>
      </Reveal>
    </section>
  );
}
