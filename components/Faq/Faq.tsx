'use client';

import { useState } from 'react';
import { FiPlus } from 'react-icons/fi';

import styles from './Faq.module.css';

const faqItems = [
  {
    number: '01',
    question: 'Як відбувається оплата?',
    answer:
      'Для сайту спочатку погоджуємо задачу й обсяг роботи, потім готуємо концепцію першого екрану без оплати. Після її затвердження ви сплачуєте 50%. Решта 50% — після виконання всього погодженого обсягу завдань. Для лендінгу за $150 це два платежі по $75. Telegram-бот оплачується повністю після тестування погоджених функцій.',
  },
  {
    number: '02',
    question: 'Скільки коштує розробка?',
    answer:
      'Лендінг коштує $150 за погоджений базовий обсяг. Багатосторінковий сайт — від $300, Telegram-бот — від $80, сайт із рекламою — від $400. До початку роботи уточнюємо склад послуги та окремі витрати. Додаткові задачі погоджуємо окремо.',
  },
  {
    number: '03',
    question: 'Скільки часу займає проєкт?',
    answer:
      'Орієнтовний строк для лендінгу — 3–5 днів. Дату початку й завершення погоджуємо після обговорення задачі та перевірки готовності матеріалів. Багатосторінковий сайт — орієнтовно 7 днів. Для бота строк визначаємо за сценарієм; пакет реклами включає 14 днів ведення після запуску.',
  },
  {
    number: '04',
    question: 'Що потрібно від мене для старту?',
    answer:
      'На першому етапі достатньо розповісти про бізнес, продукт, цілі та приблизно показати, який результат ви хочете отримати. Якщо вже є логотип, тексти, фотографії чи приклади сайтів, які вам подобаються — вони допоможуть швидше визначити напрямок.',
  },
  {
    number: '05',
    question: 'А якщо мені не сподобається дизайн?',
    answer:
      'До першої оплати ви бачите концепцію першого екрану. Обговорюємо зауваження й погоджуємо напрямок перед продовженням роботи. Для пакетів сайтів включено два раунди правок у межах погодженого завдання.',
  },
  {
    number: '06',
    question: 'Чи зможу я надалі змінювати сайт?',
    answer:
      'Так. Структуру проєкту будуємо так, щоб сайт можна було розвивати: додавати сторінки, кейси, контент або новий функціонал. Формат подальшої підтримки залежить від самого проєкту та ваших потреб.',
  },
  {
    number: '07',
    question: 'Хто буде власником готового проєкту?',
    answer:
      'Після завершення роботи ви отримуєте готовий проєкт і всі матеріали, які передбачені домовленістю: код, доступи та необхідні дані для подальшої роботи із сайтом.',
  },
];

export function FAQ() {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  const toggleItem = (index: number) => {
    setActiveIndex((current) => (current === index ? null : index));
  };

  return (
    <section className={styles.section} id="faq">
      <div className="container">
        <div className={styles.inner}>
          {/* =========================
              INTRO
          ========================= */}

          <div className={styles.intro}>
            <div className={styles.kicker}>
              <span className={styles.kickerLine} aria-hidden />

              <span>FAQ</span>
            </div>

            <h2 className={styles.heading}>
              ПИТАННЯ,
              <br />
              ЯКІ МОЖУТЬ
              <br />
              <span>ВИНИКНУТИ.</span>
            </h2>

            <p className={styles.description}>
              Коротко про оплату, терміни, процес роботи та все, що варто знати
              перед стартом проєкту.
            </p>

            <div className={styles.note}>
              <span className={styles.noteDot} />

              <p>
                Не знайшли відповіді? Напишіть нам — без довгих брифів і
                формальностей.
              </p>
            </div>
          </div>

          {/* =========================
              ACCORDION
          ========================= */}

          <div className={styles.list}>
            {faqItems.map((item, index) => {
              const isOpen = activeIndex === index;

              return (
                <article
                  key={item.number}
                  className={`${styles.item} ${isOpen ? styles.itemOpen : ''}`}
                >
                  <button
                    type="button"
                    className={styles.question}
                    onClick={() => toggleItem(index)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${index}`}
                  >
                    <span className={styles.number}>{item.number}</span>

                    <span className={styles.questionText}>{item.question}</span>

                    <span className={styles.iconWrap}>
                      <FiPlus className={styles.icon} aria-hidden />
                    </span>
                  </button>

                  <div id={`faq-answer-${index}`} className={styles.answerGrid}>
                    <div className={styles.answerInner}>
                      <div className={styles.answer}>
                        <span className={styles.answerLine} aria-hidden />

                        <p>{item.answer}</p>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
