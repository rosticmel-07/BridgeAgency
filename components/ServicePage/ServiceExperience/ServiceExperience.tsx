'use client';
import { useId, useState } from 'react';
import type { ServiceSlug } from '@/data/serviceDetails';
import styles from './ServiceExperience.module.css';
import { FiArrowUpRight } from 'react-icons/fi';
const screens = [
  {
    label: 'Пропозиція',
    title: 'Ваш бізнес. Чітка пропозиція.',
    text: 'Що ви робите, для кого та як замовити.',
    action: 'Дізнатися більше',
  },
  {
    label: 'Довіра',
    title: 'Покажіть роботу в деталях.',
    text: 'Приклади, умови та відповіді на запитання.',
    action: 'Подивитися приклади',
  },
  {
    label: 'Звернення',
    title: 'Наступний крок — простий.',
    text: 'Зручна форма або прямий зв’язок.',
    action: 'Обговорити задачу',
  },
];
const companyPages = [
  {
    label: 'Головна',
    title: 'Компанія, з якою ви знайомі.',
    text: 'Коротка презентація та ваші основні напрями.',
  },
  {
    label: 'Послуги',
    title: 'Кожен напрям — у деталях.',
    text: 'Окремі сторінки під конкретні запити клієнтів.',
  },
  {
    label: 'Про нас',
    title: 'Досвід, якому є підтвердження.',
    text: 'Ваша історія, документи та реальні роботи.',
  },
  {
    label: 'Контакти',
    title: 'Легко знайти. Легко написати.',
    text: 'Канали зв’язку та форма звернення.',
  },
];
const botScenarios = [
  {
    label: 'Послуги',
    prompt: 'Що ви пропонуєте?',
    reply:
      'Оберіть потрібний напрям — покажу опис і допоможу залишити звернення.',
    tags: ['Консультація', 'Залишити контакт'],
  },
  {
    label: 'Заявка',
    prompt: 'Хочу обговорити проєкт.',
    reply:
      'Напишіть, будь ласка, ваше ім’я та зручний контакт. Передам запит відповідальному.',
    tags: ['Ім’я', 'Номер телефону'],
  },
  {
    label: 'AI-тексти',
    prompt: 'Допоможи описати квартиру.',
    reply:
      'Надішліть площу, район та особливості квартири — підготую чернетку опису.',
    tags: ['AI-функція', 'Окремий розрахунок'],
  },
];
const journey = [
  {
    label: 'Оголошення',
    title: 'Привертаємо увагу',
    text: 'Конкретна пропозиція для погодженої аудиторії.',
    icon: <FiArrowUpRight aria-hidden />,
  },
  {
    label: 'Сайт',
    title: 'Пояснюємо цінність',
    text: 'Оголошення й сторінка говорять про одну послугу.',
    icon: '▤',
  },
  {
    label: 'Звернення',
    title: 'З’єднуємо з бізнесом',
    text: 'Клієнт залишає контакт або пише напряму.',
    icon: '↳',
  },
];
export function ServiceExperience({ kind }: { kind: ServiceSlug }) {
  const [active, setActive] = useState(0);
  const id = useId();
  const items =
    kind === 'business-site'
      ? companyPages
      : kind === 'telegram-bot'
        ? botScenarios
        : kind === 'site-ads'
          ? journey
          : screens;
  return (
    <div className={styles.experience}>
      <div className={styles.top}>
        <span>
          <i /> BRIDGE /{' '}
          {kind === 'telegram-bot'
            ? 'BOT'
            : kind === 'site-ads'
              ? 'CONNECT'
              : 'WEB'}
        </span>
        <span>ІНТЕРАКТИВНИЙ ПРИКЛАД</span>
      </div>
      <div
        className={styles.controls}
        role="group"
        aria-label="Сценарій демонстрації"
      >
        {items.map((item, index) => (
          <button
            key={item.label}
            aria-pressed={active === index}
            aria-controls={id}
            onClick={() => setActive(index)}
          >
            {item.label}
          </button>
        ))}
      </div>
      <div id={id} className={styles.canvas} aria-live="polite">
        {kind === 'telegram-bot' ? (
          <div className={styles.chat} key={active}>
            <div className={styles.botTitle}>
              <span className={styles.avatar}>B</span>
              <div>
                <strong>Ваш бізнес / bot</strong>
                <small>Демонстрація сценарію</small>
              </div>
            </div>
            <p className={styles.userMessage}>{botScenarios[active].prompt}</p>
            <p className={styles.botMessage}>{botScenarios[active].reply}</p>
            <div className={styles.tags}>
              {botScenarios[active].tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
            <div className={styles.chatInput}>
              Повідомлення <span>↑</span>
            </div>
          </div>
        ) : kind === 'site-ads' ? (
          <div className={styles.funnel}>
            <svg
              viewBox="0 0 440 180"
              className={styles.bridge}
              aria-hidden="true"
            >
              <path
                d="M30 155 C90 10 145 10 220 155 C295 10 350 10 410 155"
                pathLength="1"
              />
              <circle cx="30" cy="155" r="5" />
              <circle cx="220" cy="155" r="5" />
              <circle cx="410" cy="155" r="5" />
            </svg>
            <div className={styles.stations}>
              {journey.map((item, index) => (
                <span key={item.label} data-active={active === index}>
                  {item.icon}
                  <small>{item.label}</small>
                </span>
              ))}
            </div>
            <div className={styles.funnelText} key={active}>
              <span className={styles.index}>0{active + 1} / ШЛЯХ КЛІЄНТА</span>
              <h3>{journey[active].title}</h3>
              <p>{journey[active].text}</p>
            </div>
          </div>
        ) : (
          <div className={styles.browser} key={active}>
            <div className={styles.browserBar}>
              <span>● ● ●</span>
              <span>ваш-бізнес.ua</span>
              <span>
                <FiArrowUpRight aria-hidden />
              </span>
            </div>
            <div className={styles.screen}>
              <div className={styles.brand}>
                ВАШ БІЗНЕС
                <span>
                  <FiArrowUpRight aria-hidden />
                </span>
              </div>
              <div className={styles.screenCopy}>
                <span className={styles.index}>
                  {kind === 'landing'
                    ? 'ОДНА СТОРІНКА'
                    : companyPages[active].label.toUpperCase()}
                </span>
                <h3>
                  {kind === 'landing'
                    ? screens[active].title
                    : companyPages[active].title}
                </h3>
                <p>
                  {kind === 'landing'
                    ? screens[active].text
                    : companyPages[active].text}
                </p>
              </div>
              {kind === 'landing' ? (
                <span className={styles.demoButton}>
                  {screens[active].action} <FiArrowUpRight aria-hidden />
                </span>
              ) : (
                <div className={styles.miniCards}>
                  <span>01 / Деталі</span>
                  <span>02 / Приклади</span>
                  <span>03 / Зв’язок</span>
                </div>
              )}
              <div className={styles.buildLines}>
                <i />
                <i />
                <i />
              </div>
            </div>
          </div>
        )}
      </div>
      <div className={styles.bottom}>
        <span>Натисніть на вкладку, щоб спробувати</span>
        <span aria-hidden>↔</span>
      </div>
    </div>
  );
}
