'use client';

import { useEffect, useRef, useState, type CSSProperties } from 'react';

import { FiArrowUpRight } from 'react-icons/fi';

import styles from './Principles.module.css';

const principles = [
  {
    number: '01',
    title: 'Прямий контакт',
    text: 'Ви напряму спілкуєтесь із дизайнером і розробником. Менше зайвих ланок — швидші рішення та менше загублених деталей.',
  },
  {
    number: '02',
    title: 'Ваш бізнес — не шаблон',
    text: 'Структуру, дизайн і функції створюємо під ваші цілі, аудиторію та характер бізнесу — без готових універсальних рішень.',
  },
  {
    number: '03',
    title: 'Красиво — це тільки початок',
    text: 'Кожен екран має не просто виглядати добре, а привертати увагу, пояснювати цінність і вести користувача до дії.',
  },
];

export function Principles() {
  const sectionRef = useRef<HTMLElement>(null);

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);

          observer.disconnect();
        }
      },
      {
        threshold: 0.2,
      }
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="principles"
      className={`${styles.section} ${isVisible ? styles.visible : ''}`}
    >
      <div className="container">
        <div className={styles.inner}>
          {/* =========================
              LEFT SIDE
          ========================= */}

          <div className={styles.intro}>
            <div className={styles.kicker}>
              <span className={styles.kickerLine} aria-hidden />

              <span>НАШІ ПРИНЦИПИ</span>
            </div>

            <h2 className={styles.heading}>
              ТРИ ПРАВИЛА,
              <br />
              НА ЯКИХ МИ
              <br />
              <span>БУДУЄМО ПРОЄКТИ.</span>
            </h2>

            <p className={styles.description}>
              Не ускладнюємо процес. Не працюємо шаблонно. Не робимо дизайн
              заради дизайну.
            </p>
          </div>

          {/* =========================
              PRINCIPLES
          ========================= */}

          <div className={styles.principles}>
            <div className={styles.rail} aria-hidden>
              <span className={styles.railBackground} />

              <span className={styles.railProgress} />

              {principles.map((principle, index) => (
                <span
                  key={principle.number}
                  className={styles.railDot}
                  style={
                    {
                      '--dot-delay': `${0.4 + index * 0.25}s`,
                    } as CSSProperties
                  }
                />
              ))}
            </div>

            <div className={styles.list}>
              {principles.map((principle, index) => (
                <article
                  key={principle.number}
                  className={styles.item}
                  style={
                    {
                      '--item-delay': `${0.25 + index * 0.17}s`,
                    } as CSSProperties
                  }
                >
                  <span className={styles.number}>{principle.number}</span>

                  <div className={styles.itemContent}>
                    <h3>{principle.title}</h3>

                    <p>{principle.text}</p>
                  </div>

                  <FiArrowUpRight className={styles.arrow} aria-hidden />
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
